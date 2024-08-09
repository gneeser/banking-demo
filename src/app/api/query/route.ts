import { MongoClient } from 'mongodb'
import { uid } from 'uid'

// TODO: mongo connection utils
// TODO: request utils
// TODO: request schemas
// TODO: auth utils
export async function GET(request: Request): Promise<Response> {
  try {
    if (!process.env.MONGO_URL) throw new Error('MONGO_URL not found')
    const _conn = await MongoClient.connect(process.env?.MONGO_URL)
    const _db = _conn.db('banking')

    const queries = await _db.collection('query').find({}, { projection: { _id: 0 } }).toArray()

    await _conn.close()

    return new Response(JSON.stringify(queries), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    let error = err as Error
    return new Response(JSON.stringify({ error: { name: error?.name, message: error?.message } }), {
      headers: { "content-type": "application/json" },
    })
  }
}

export async function POST(request: Request): Promise<Response> {
  console.log(uid())
  console.log(uid())
  console.log(uid())
  try {
    if (!process.env.MONGO_URL) throw new Error('MONGO_URL not found')
    const _conn = await MongoClient.connect(process.env?.MONGO_URL)
    const _db = _conn.db('banking')

    const body = await request.json()
    const obj = { ...body, id: uid(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    const query = await _db.collection('query').insertOne(obj)
    console.log(query)

    await _conn.close()

    return new Response(JSON.stringify(obj), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    let error = err as Error
    return new Response(JSON.stringify({ error: { name: error?.name, message: error?.message } }), {
      headers: { "content-type": "application/json" },
    })
  }
}