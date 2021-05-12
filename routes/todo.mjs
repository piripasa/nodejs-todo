import { createTask, deleteTask, listTask, readTask, updateTask } from "../controllers/TaskController.mjs";

export function todoRoute(app) {
    app.route('/tasks')
        .get(listTask)
        .post(createTask);

    app.route('/tasks/:taskId')
        .get(readTask)
        .put(updateTask)
        .delete(deleteTask);
}