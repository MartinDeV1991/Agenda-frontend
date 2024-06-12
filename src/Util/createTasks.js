import { ObjectId } from "bson";

export const createTasks = () => {
    const task = {
        _id: new ObjectId().toString(),
        name: "",
        time: "",
        date: "",
        shortDescription: "",
        label: "",
    }
    return task;
}