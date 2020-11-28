import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class TodoService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("todoDB");

    db.version(2).stores({
      tasks: "++id,userId,title,completed",
    });

    db.on("populate", async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const jsonData = await response.json();
      await db.tasks.bulkPut(jsonData);
    });

    db.open();

    db.tasks
      .where("userId")
      .equals(10)
      .filter(item => !item.completed)
      .each((item) => console.log(item));
  }
}
