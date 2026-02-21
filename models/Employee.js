import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        last_name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },

        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },

        salary: {
            type: Number,
            required: true,
            min: [1000, 'Salary must be at least 1000']
        },

        date_of_joining: {
            type: Date,
            required: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        designation: {
            type: String,
            required: true,
            trim: true
        },

        employee_photo: {
            type: String,
            trim: true
        }
    },
    { 
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        } 
    }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
