import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class SupermarketService {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        // starts database
        db = new Dexie('supermarketDB');

        db.version(1).stores({
            tasks: '++id,description'
        });

        db.on("populate", async () => {
            await db.tasks.bulkPut([
                { description: "farofa", price: "5", done: true },
                { description: "arroz", price: "999", done: false },
                { description: "feijão", price: "6", done: false }
            ]);
        });

        db.open();
    }
}