import { createConnection } from 'mysql2/promise'

// TODO: sanitize query
// TODO: ensure user is authenticated and readonly
export async function POST(request: Request): Promise<Response> {
  try {
    const _conn = await createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
    await _conn.connect()

    const body = await request.json()
    const results = await _conn.query(body.query)

    await _conn.end()

    return new Response(JSON.stringify(results[0]), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    let error = err as Error
    return new Response(JSON.stringify({ error: { name: error?.name, message: error?.message } }), {
      headers: { "content-type": "application/json" },
    })
  }
}