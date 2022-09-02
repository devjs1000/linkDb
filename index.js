import fs from 'fs'
import { isNull, isNumber, isObject, isArray, isDate, isBoolean, isFunction, isString } from 'util'
import * as types from './constants/types.js'

const { ID, NAN, NUMBER, NULL, DATE, OBJECT, STRING, ARRAY } = types
let dbName = './db.json'

const getFile = async () => {
    let db = await fs.readFileSync(dbName)
    let parsedData = JSON.parse(db)
    return parsedData
}

const writeFile = async (data) => {
    await fs.writeFileSync(dbName, data)
}

const isCollectionExists = (db, collectionName) => Boolean(db[collectionName])

const createCollection = async (collectionName) => {
    let db = await getFile()
    if (isCollectionExists(db, collectionName)) {
        return 0
    } else {
        db[collectionName] = []
        let stringified = JSON.stringify(db)
        await writeFile(stringified)
        return 1
    }
}

createCollection('orders')

const isID = (el1) => el1.startsWith(ID)

const checkSchema = (schema, data, key) => {
    let schemaKeys = Object.keys(schema)
    const makeError = (el, type) => {
        throw new Error(`el ${el} of ${type} schema error`)
    }
    let newData = schema;
    console.log(schema)
    schemaKeys.map(key => {
        let type = schema[key]
        let el = data[key]
        switch (type) {
            case ID:
                if (isID(el)) {
                    newData[key] = el
                } else {
                    makeError(el, type)
                }
                break;
            case STRING:
                if (isString(el)) {
                    newData[key] = el
                } else {
                    makeError(el, type)
                }
            default:
                return;
            // makeError(el, type)
        }
    })
    return newData;
}

let obj = checkSchema(
    {
        $id: ID,
        name: STRING
    }
    , {
        $id: 'ID1',
        name: 'anand'
    })


console.log(obj)

class Model {
    constructor(name, structure) {
        this.name = name;
        this.structure = structure;
        this.data = {}
    }
    create(data) {

    }
}

const animalSchema = new Model('Animal', {
    $id: ID,
    name: STRING,
})




// animalSchema.create({
//     name: 'jerry',
//     $id: ID + '1'
// })