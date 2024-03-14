import Task from "./TaskTypes";

type CollectionTypes = {
    id: string;
    name: string;
    color: string;
    userId: string;
    createdAt: Date;
    tasks: Task[]
}
export default CollectionTypes
