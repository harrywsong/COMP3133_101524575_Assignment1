// This file contains all GraphQL types for Employee
import { gql } from "graphql-tag";

const employeeSchema = gql`
    # Object type - represents the Employee model
    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String!
        updated_at: String!
    }

    # Query type - represents the collection of operations to fetch data
    type Query {
        getAllEmployees: [Employee!]!
        searchEmployeeById(eid: ID!): Employee
        searchEmployeeByDeptOrDesignation(department: String, designation: String): [Employee!]!
    }

    # Mutation type - represents the operations to modify data
    type Mutation {
        addNewEmployee(
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            designation: String!
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employee!
        
        updateEmployeeById(
            eid: ID!
            first_name: String
            last_name: String
            email: String
            gender: String
            designation: String
            salary: Float
            date_of_joining: String
            department: String
            employee_photo: String
        ): Employee!
        
        deleteEmployeeById(eid: ID!): Employee!
    }
`;

export default employeeSchema;
