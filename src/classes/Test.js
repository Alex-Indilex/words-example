import Service from "./Service";
import { Task } from "./Task";

export default class Test {
    constructor() {
        this._service = new Service("./data.json");
        this._service.getTask().then(data => this._createTasks(data));
        this._tasks = [];
        this._current = -1;
    }

    _createTasks() {
        this._tasks = data.map(Task.create);
        this._current = 0;
    }

    get task() {
        if (this._current >= 0) {
            return this._tasks[this._current];
        }
        return null;
    }
}

