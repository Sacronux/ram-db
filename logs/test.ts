import { writeFileSync } from "fs";
import { DataBase } from "../src/index";



// db.insert(34)

// db.bulkInsert([{a: 3}, 'b', 6])

// console.log(db.bulkGetForTesting())

// db.update(1, 'aboba')

// console.log(db.bulkGetForTesting())

// db.bulkDelete([1, 3])

// console.log(db.bulkGetForTesting())

const result: {[key: string]: boolean} = {

}

const testInsert = () => {
    const db = new DataBase();

    db.insert(34)
    
    console.log(db.bulkGetForTesting())

    console.log(db.findById(1))

    result['insert'] = db.findById(1) === 34
}

const testBulkInsert = () => {
    const db = new DataBase();

    db.bulkInsert([{a: 3}, 'b', 6])

    console.log(JSON.stringify(db.bulkGetForTesting()))

    result['bulkInsert'] = JSON.stringify(db.bulkGetForTesting()) === '{"1":{"a":3},"2":"b","3":6}'
}

const testDelete = () => {
    const db = new DataBase();

    db.bulkInsert([{a: 3}, 'b', 6])

    db.delete(1)

    result['delete'] = db.findById(1) === null
}

const testBulkDelete = () => {
    const db = new DataBase();

    db.bulkInsert([{a: 3}, 'b', 6])

    db.bulkDelete([1, 3])

    result['bulkDelete'] = db.findById(1) === null && db.findById(2) === 'b' && db.findById(3) === null
}

const testUpdate = () => {
    const db = new DataBase();

    db.bulkInsert([{a: 3}, 'b', 6])

    db.update(1, 'aboba')

    result['update'] = db.findById(1) === 'aboba' && db.findById(2) === 'b'
}

const testUpsert = () => {
    const db = new DataBase();

    db.bulkInsert([{a: 3}, 'b', 6])

    db.upsert(1, 'aboba')

    db.upsert(5, 'aboba5')


    result['update'] = db.findById(1) === 'aboba' && db.findById(4) === 'aboba5'
}

[testInsert, testBulkInsert, testDelete, testBulkDelete, testUpdate, testUpsert].forEach(f => f())

writeFileSync('./logs/logs.json', JSON.stringify(result))


