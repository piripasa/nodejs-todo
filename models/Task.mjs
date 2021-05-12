import pkg from 'mongoose';
const { model, Schema } = pkg;

const TaskSchema = Schema({
    userID: {
        type: String
    },
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default model('Task', TaskSchema);