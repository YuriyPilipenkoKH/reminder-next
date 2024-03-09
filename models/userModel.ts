import { Document } from 'mongoose';

// Assuming your Mongoose user model is defined as follows
interface User extends Document {
  name: string;
  email: string;
  password: string;
  // Add other properties if needed
}

// Export the User type
export default User;