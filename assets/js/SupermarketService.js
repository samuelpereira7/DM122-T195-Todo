import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class SupermarketService {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie('supermarketDB');

        db.version(1).stores({
            tasks: '++id,name,price,done'
        });

        db.on("populate", async () => {
            await db.tasks.bulkPut([
                { name: "farofa", price: "5", done: true },
                { name: "arroz", price: "999", done: false },
                { name: "feijão", price: "6", done: false },
                { name: "macarrão", price: "4", done: false },
                { name: "gengibre", price: "2.5", done: false },
                { name: "pinga", price: "1", done: false },
                { name: "nescau", price: "10", done: false }
            ]);
        });

        db.open();
    }

    getAll() {
        return db.tasks.toArray();
    }

    get(id) {
        return db.tasks.get(id);
    }

    save(task) {
        return db.tasks.put(task);
    }

    delete(id) {
        return db.tasks.delete(id);
    }
}