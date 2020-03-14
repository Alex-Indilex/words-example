import Test from "./classes/Test";
import Service from "./classes/Service";
import UIController from "./classes/UIController";



const test = new Test({
       service: new Service("./data.json"),
       ui: new UIController(),
});



// const tasks = taskData.map(data => Task.create(data));

