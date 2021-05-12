import Task from '../models/Task.mjs';
import { error, success } from '../responseApi.mjs';
import TaskResource from '../TaskResource.mjs';

export const listTask = (req, res) => {
    Task.find({}, (err, task) => {
        if (err) {
            res.status(400).json(error("Error", res.statusCode));
        }
        res.status(200).json(success("OK", { data: TaskResource.collection(task) }, res.statusCode));
    });
}

export const createTask = (req, res) => {
    const new_task = new Task(req.body);
    new_task.save((err, task) => {
        if (err) {
            res.status(400).json(error("Error", res.statusCode));
        }
        res.status(201).json(success("OK", { data: task }, res.statusCode));
    });
}

export const readTask = (req, res) => {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) {
            res.status(400).json(error("Error", res.statusCode));
        }
        res.status(200).json(success("OK", { data: task }, res.statusCode));
    });
}

export const updateTask = (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, task) => {
        if (err) {
            res.status(400).json(error("Error", res.statusCode));
        }
        res.status(200).json(success("Updated", { data: task }, res.statusCode));
    });
}

export const deleteTask = (req, res) => {
    Task.remove({
            _id: req.params.taskId,
        },
        (err, task) => {
            if (err) {
                res.status(400).json(error("Error", res.statusCode));
            }
            res.status(200).json(success("Deleted", {}, res.statusCode));
        }
    );
}