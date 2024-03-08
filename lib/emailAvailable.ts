
interface UserData {
    email: string;
    // Add any other properties if needed
}

export const emailAvailable = async (fieldValue: string): Promise<string | undefined> => {
    try {
        const response = await fetch(`http://localhost:4040/api/users?email=${fieldValue}`);
        const data: UserData[]  = await response.json();
        console.log('data', data)
        const result = data.filter(c => c.email === fieldValue)
        return result.length === 0 ? undefined : 'Email already exists';
    } catch (error) {
        // Handle fetch errors here
        console.error('Error checking email availability:', error);
        throw new Error('Failed to check email availability');
    }
};