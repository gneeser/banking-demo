db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'banking',
    },
  ],
})

db = new Mongo().getDB("banking")

db.createCollection('users', { capped: false })
db.createCollection('query', { capped: false })

db.query.insert([
  {
    id: "f732709529d",
    type: 'raw',
    name: 'customers',
    query: 'SELECT * FROM customers',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "732709529d2",
    type: 'raw',
    name: 'transactions',
    query: 'SELECT * FROM transactions',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "32709529d24",
    type: 'raw',
    name: 'accounts',
    query: 'SELECT * FROM accounts',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
])