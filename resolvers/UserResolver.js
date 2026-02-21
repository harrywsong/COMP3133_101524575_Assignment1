import User from '../models/User.js';

export const userResolvers = {
    Query: {
        // Login - Allow user to access the system using username or email
        login: async (_, { username, password }) => {
            try {
                // Allow login with either username or email
                const user = await User.findOne({ 
                    $or: [{ username }, { email: username }] 
                });
                
                if (!user) {
                    throw new Error('User not found');
                }

                const isValidPassword = await user.comparePassword(password);
                
                if (!isValidPassword) {
                    throw new Error('Invalid password');
                }

                return {
                    user,
                    token: null
                };
            } catch (error) {
                throw new Error(`Login failed: ${error.message}`);
            }
        }
    },

    Mutation: {
        // Signup - Allow user to create new account
        signup: async (_, { username, email, password }) => {
            try {
                const existingUser = await User.findOne({ 
                    $or: [{ username }, { email }] 
                });

                if (existingUser) {
                    throw new Error('Username or email already exists');
                }

                const user = new User({
                    username,
                    email,
                    password
                });

                await user.save();

                return {
                    user,
                    token: null
                };
            } catch (error) {
                throw new Error(`Signup failed: ${error.message}`);
            }
        }
    }
};
