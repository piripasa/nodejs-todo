import Resource from 'resources.js';

class TaskResource extends Resource {
    toArray() {
        return {
            id: this._id,
            name: this.name,
            status: this.status,
            created_date: this.created_date,
        }
    }
}

export default TaskResource;