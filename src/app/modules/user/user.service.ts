import User from "./user.interface"
import userModel from "./user.model"

// Creating new user
// User service to check if the user already exists
const createUserToDB = async (user: User) => {
    // Check if the user with the same email already exists
    const existingUser = await userModel.findOne({ email: user.email });

    if (existingUser) {
        throw new Error('User already exists');
    }

    // If no existing user, create the new user
    const result = await userModel.create(user);
    return result;
}

// Getting all users
const getAllUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const users = await userModel
        .find({}, { password: 0, role: 0 })
        .sort({ createdAt: -1 }) // Exclude password and role fields
        .skip(skip)
        .limit(limit);
    const totalUsers = await userModel.countDocuments(); // Get total number of users
    return { users, totalUsers, totalPages: Math.ceil(totalUsers / limit) };
};

// Update user in the database
const updateUserInDB = async (userId: string, updatedData: Partial<User>) => {
    const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
    
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

// Delete user from the database
const deleteUserFromDB = async (userId: string) => {
    const user = await userModel.findByIdAndDelete(userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}



export const UserService = {
    createUserToDB,
    getAllUsers,
    updateUserInDB,
    deleteUserFromDB
}