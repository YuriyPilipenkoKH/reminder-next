type Task = {
    id: string;
    collectionId: string;
    content: string;
    expiresAt: Date | null;
    createdAt: Date;
    done: boolean;
}
export default Task