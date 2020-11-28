import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class TodoService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("todoDB");

    db.version(1).stores({
      tasks: "++id,description",
    });

    db.on("populate", async () => {
      await db.tasks.bulkPut([
        { description: "Learn JavaScript", done: true },
        { description: "Learn TypeScript", done: false },
        { description: "Learn PWA", done: false },
        { description: "Learn HTML5 APIs", done: false },
      ]);
    });

    db.open();
  }
}
