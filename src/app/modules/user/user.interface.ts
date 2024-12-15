// Creating user interface with their fields and data type
interface User {
    username: string;
    email: string;
    password?: string;
    role?: string;
    status?: string;
}

export default User;