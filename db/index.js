const fs = require("fs");

let dbInit = false;
let db = {};

module.exports.initDatabase = (tables) => {
    let dbPath = __dirname + "/db.json"

    if (!fs.existsSync(dbPath)) {
        db = {};
        fs.writeFileSync(dbPath, JSON.stringify(db));
    }
    db = JSON.parse(fs.readFileSync(dbPath, {encoding: "utf8"}));

    tables.forEach(table => {
        if (!db[table]) {
            db[table] = [];
        }
    })

    dbInit = true;
    module.exports.saveDb();
}

module.exports.getTable = (table) => {
    if (!dbInit) {
        throw new Error("Database not initialized");
    }

    return JSON.parse(fs.readFileSync(__dirname + "/db.json", {encoding: "utf8"}))[table];
}

module.exports.saveDb = () => fs.writeFileSync(__dirname + "/db.json", JSON.stringify(db));

module.exports.addItem = (table, item) => {
    if (!dbInit) {
        throw new Error("Database not initialized");
    }

    let id = db[table].length;

    db[table].push({...item, id});

    this.saveDb();
    return this.getItem(table, id);
}

module.exports.removeItem = (table, id) => {
    if (!dbInit) {
        throw new Error("Database not initialized");
    }

    db[table].splice(db[table].findIndex(item => item.id === id), 1);

    this.saveDb();
    return true;
}

module.exports.updateItem = (table, id, update) => {
    if (!dbInit) {
        throw new Error("Database not initialized");
    }

    let item_index = db[table].findIndex(item => item.id === id);
    let updated = {...db[table][item_index], ...update};
    db[table][item_index] = updated;

    this.saveDb();
    return this.getItem(table, id);
}

module.exports.getItem = (table, id) => {
    if (!dbInit) {
        throw new Error("Database not initialized");
    }

    return db[table].find(item => item.id === id);
}