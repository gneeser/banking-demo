import _ from 'lodash'
import { MongoClient } from 'mongodb'


export async function GET(request: Request, { params }: { params: { query: string } }): Promise<Response> {
  try {
    const id = params.query
    if (!id) throw new Error('Validation Error: query is required')

    if (!process.env.MONGO_URL) throw new Error('MONGO_URL not found')
    const _conn = await MongoClient.connect(process.env?.MONGO_URL)
    const _db = _conn.db('banking')

    const query = await _db.collection('query').findOne({ id }, { projection: { _id: 0 } })

    await _conn.close()

    return new Response(JSON.stringify(query), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    let error = err as Error
    return new Response(JSON.stringify({ error: { name: error?.name, message: error?.message } }), {
      headers: { "content-type": "application/json" },
    })
  }
}

export async function PATCH(request: Request, { params }: { params: { query: string } }): Promise<Response> {
  try {
    const id = params.query
    if (!id) throw new Error('Validation Error: query is required')

    if (!process.env.MONGO_URL) throw new Error('MONGO_URL not found')
    const _conn = await MongoClient.connect(process.env?.MONGO_URL)
    const _db = _conn.db('banking')

    const body = await request.json()
    const query = await _db.collection('query').updateOne({ id }, { $set: { ...body, updated_at: new Date().toISOString() } })

    await _conn.close()

    return new Response(JSON.stringify({ id, ...body }), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    let error = err as Error
    return new Response(JSON.stringify({ error: { name: error?.name, message: error?.message } }), {
      headers: { "content-type": "application/json" },
    })
  }
}