import Employee from '../models/Employee.js';
import { GraphQLError } from 'graphql';

// This file contains all GraphQL Resolvers for Employee operations
// Resolver performs the operations to complete types defined in typedefs
const employeeResolvers = {
    Query: {
        // Get all employees - User can get all employee list
        getAllEmployees: async () => {
            console.log(`Fetching all employees....`);
            const emps = await Employee.find({});
            
            if (!emps || emps.length === 0) {
                throw new GraphQLError("Employees not found", {
                    extensions: {
                        code: "EMPLOYEES_NOT_FOUND",
                        field: 'all',
                        http: { status: 404 }
                    }
                });
            }
            
            console.log(`${emps.length} employees found`);
            return emps;
        },

        // Search employee by eid - User can get employee details by employee id
        searchEmployeeById: async (_, { eid }) => {
            if (!eid) {
                throw new GraphQLError("Employee ID parameter is required", {
                    extensions: {
                        code: "MISSING_ID_PARAM",
                        field: 'eid',
                        http: { status: 400 }
                    }
                });
            }

            console.log(`Fetching employee by id: ${eid}....`);
            const emp = await Employee.findById(eid);
            
            if (!emp) {
                throw new GraphQLError("Employee not found", {
                    extensions: {
                        code: "EMPLOYEE_NOT_FOUND",
                        field: 'eid',
                        http: { status: 404 }
                    }
                });
            }

            console.log(`Employee found: ${emp.first_name} ${emp.last_name}`);
            return emp;
        },

        // Search Employee by designation or department
        searchEmployeeByDeptOrDesignation: async (_, { department, designation }) => {
            const query = {};
            
            if (department) {
                query.department = new RegExp(department, "i");
            }
            
            if (designation) {
                query.designation = new RegExp(designation, "i");
            }

            if (Object.keys(query).length === 0) {
                throw new GraphQLError("Please provide department or designation", {
                    extensions: {
                        code: "MISSING_PARAMS",
                        field: 'department/designation',
                        http: { status: 400 }
                    }
                });
            }

            console.log(`Searching employees by department/designation....`);
            const emps = await Employee.find(query);
            
            if (!emps || emps.length === 0) {
                throw new GraphQLError("No employees found matching criteria", {
                    extensions: {
                        code: "EMPLOYEES_NOT_FOUND",
                        field: 'department/designation',
                        http: { status: 404 }
                    }
                });
            }

            console.log(`${emps.length} matching employees found`);
            return emps;
        }
    },

    Mutation: {
        // Add New employee - User can create new employee
        addNewEmployee: async (_, args) => {
            if (!args.first_name || !args.last_name || !args.email || !args.gender || 
                !args.designation || !args.salary || !args.date_of_joining || !args.department) {
                throw new GraphQLError("All required parameters must be provided", {
                    extensions: {
                        code: "MISSING_PARAMS",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }

            console.log(`Adding new employee: ${args.first_name} ${args.last_name}....`);
            
            const newEmp = new Employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                designation: args.designation,
                salary: args.salary,
                date_of_joining: args.date_of_joining,
                department: args.department,
                employee_photo: args.employee_photo
            });

            const emp = await newEmp.save();
            
            if (!emp) {
                throw new GraphQLError("Employee not added", {
                    extensions: {
                        code: "EMPLOYEE_NOT_ADDED",
                        field: 'all',
                        http: { status: 500 }
                    }
                });
            }

            console.log(`Employee added successfully. ID: ${emp._id}`);
            return emp;
        },

        // Update employee by eid - User can update employee details
        updateEmployeeById: async (_, { eid, ...updateFields }) => {
            if (!eid) {
                throw new GraphQLError("Employee ID parameter is required", {
                    extensions: {
                        code: "MISSING_ID_PARAM",
                        field: 'eid',
                        http: { status: 400 }
                    }
                });
            }

            if (Object.keys(updateFields).length === 0) {
                throw new GraphQLError("At least one field to update is required", {
                    extensions: {
                        code: "MISSING_UPDATE_FIELDS",
                        field: 'all',
                        http: { status: 400 }
                    }
                });
            }

            console.log(`Trying to update employee with id ${eid}....`);
            
            const emp = await Employee.findByIdAndUpdate(
                eid,
                updateFields,
                { returnDocument: 'after', runValidators: true }
            );

            if (!emp) {
                throw new GraphQLError("Employee not found or not updated", {
                    extensions: {
                        code: "EMPLOYEE_NOT_UPDATED",
                        field: 'eid',
                        http: { status: 404 }
                    }
                });
            }

            console.log(`Employee with email ${emp.email} updated. ID: ${emp._id}`);
            return emp;
        },

        // Delete employee by eid - User can delete employee by employee id
        deleteEmployeeById: async (_, { eid }) => {
            if (!eid) {
                throw new GraphQLError("Employee ID parameter is required", {
                    extensions: {
                        code: "MISSING_ID_PARAM",
                        field: 'eid',
                        http: { status: 400 }
                    }
                });
            }

            console.log(`Trying to delete employee with id ${eid}....`);
            
            const emp = await Employee.findByIdAndDelete(eid);

            if (!emp) {
                throw new GraphQLError("Employee not found or not deleted", {
                    extensions: {
                        code: "EMPLOYEE_NOT_DELETED",
                        field: 'eid',
                        http: { status: 404 }
                    }
                });
            }

            console.log(`Employee with email ${emp.email} deleted. ID: ${emp._id}`);
            return emp;
        }
    }
};

export default employeeResolvers;
