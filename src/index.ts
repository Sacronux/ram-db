import { Buffer } from 'buffer';

class DataBase {
    storage: Buffer;
    constructor() {
        this.storage = Buffer.from(JSON.stringify({}));
    }

    #getStorageSize() {
        return this.storage.length
    }

    #getIncomingDataSize(data: string) {
        return (new TextEncoder().encode(data)).length;
    }

    #fromBytes(data: Buffer) {
        return data.toString();
    }

    //removes trailing zero bytes \x00
    #removeTrailingEmptyBytes(str: string) {
        const lastIndex = str.lastIndexOf('}');
        const data = `${str.slice(0, lastIndex)}}`;
        return data;
    }

    #parseData(data: string) {
        try {
            return JSON.parse(this.#removeTrailingEmptyBytes(data))
        } catch (err) {
            return null;
        }
    }

    #writeToStore(data: string) {
        try {
            const dataLength = this.#getIncomingDataSize(data);

            if (dataLength > this.#getStorageSize()) {
                this.storage = Buffer.from(data)
                return true;
            }

            this.storage.fill('');
            this.storage.write(data)
            return true
        } catch (err) {
            return null;
        }
    }

    //for testing purpose only
    bulkGetForTesting() {
        const bufferData = this.#fromBytes(this.storage);
        const parsedBufferData = this.#parseData(bufferData);
        
        return parsedBufferData
    }

    findById(id: string | number) {
        const _id = id.toString();

        const bufferData = this.#fromBytes(this.storage);
        const parsedBufferData = this.#parseData(bufferData);


        const value = parsedBufferData[_id];

        if (value === undefined) {
            return null;
        }

        return value;
    }

    update(id: string | number, data: any) {
        const _id = id.toString();

        const bufferData = this.#fromBytes(this.storage);
        const parsedBufferData = this.#parseData(bufferData);

        const value = parsedBufferData[_id];

        if (value === undefined) {
            return null;
        }

        const dataToStore = JSON.stringify({
            ...parsedBufferData,
            [_id]: data
        })

        const result = this.#writeToStore(dataToStore) ? _id : null;

        return result;
    }

    insert(data: any) {
        try {
            const bufferData = this.#fromBytes(this.storage);
            const parsedBufferData = this.#parseData(bufferData);

            let lastId = Object.keys(parsedBufferData).sort().at(-1);

            if(!lastId) {
                lastId = '0';
            }

            const newRecordId = (Number(lastId) + 1).toString()
            const dataToStore = JSON.stringify({
                ...parsedBufferData,
                [newRecordId]: data
            })
            const result = this.#writeToStore(dataToStore) ? newRecordId : null;

            return result;
        } catch (err) {
            return null;
        }
    }

    upsert(id: string | number, data: any) {
        const _id = id.toString();

        const bufferData = this.#fromBytes(this.storage);
        const parsedBufferData = this.#parseData(bufferData);

        const value = parsedBufferData[_id];

        if (value === undefined) {
            return this.insert(data)
        }

        return this.update(id, data)
    }

    delete(id: string | number) {
        const _id = id.toString();

        const bufferData = this.#fromBytes(this.storage);
        const parsedBufferData = this.#parseData(bufferData);

        const value = parsedBufferData[_id];

        if (value === undefined) {
            return null;
        }

        delete parsedBufferData[_id];

        const stringifiedData = JSON.stringify(parsedBufferData);

        this.#writeToStore(stringifiedData)

        return _id;
    }

    bulkInsert(data: any[]) {
        const result = data.map(datum => {
            return this.insert(datum)
        })

        return result;
    }

    bulkDelete(ids: (string | number)[]) {
        const result = ids.map(id => {
            return this.delete(id)
        })

        return result;
    }
}

export { DataBase };