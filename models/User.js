import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailRegEx = /^\S+@\S+\.\S+$/;

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            match: [emailRegEx, "Please enter a valid email"]
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
    },
    { 
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        } 
    }
)

// Hash password before saving
UserSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;