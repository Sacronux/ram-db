# ram-db

Basic methods

`findById(id: string | number)`
`update(id: string | number, data: any)`
`insert(data: any)`
`upsert(id: string | number, data: any)`
`delete(id: string | number)`
`bulkInsert(data: any[])`
`bulkDelete(ids: (string | number)[])`

usage

```
import { DataBase } from "./index";
const db = new DataBase();

db.insert('test')

db.findById(1) // 'test'
```

