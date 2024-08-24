import Task from "./TaskTypes";

type CollectionTypes = {
    _id: string;
    name: string;
    color: string;
    userId: string;
    createdAt: Date | null;
    tasks: Task[]
}
export default CollectionTypes

export interface collectionsInfoTypes  {
    _id: string;
    name: string;
    color: string;
}
 
