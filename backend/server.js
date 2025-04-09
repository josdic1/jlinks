require('dotenv').config()
console.log('🔍 ENV TEST:', process.env.PGPASSWORD)

const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
  })

const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,DELETE,PUT,PATCH',
  allowedHeaders: 'Content-Type,Authorization'
}));


const { v4: uuid } = require('uuid')

app.post('/links', async (req, res) => {
    const { title, url, type, description, paid, starred } = req.body
    const id = uuid()
  
    try {
      const result = await pool.query(
        `INSERT INTO links (id, title, url, type, description, paid, starred)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [id, title, url, type, description, paid, starred]
      )
      res.status(201).json(result.rows[0])
    } catch (err) {
      console.error('❌ Error inserting link:', err)
      res.status(500).json({ error: 'Failed to add link' })
    }
  })

  app.delete('/links/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      await pool.query('DELETE FROM links WHERE id = $1', [id])
      res.status(204).end()
    } catch (err) {
      console.error('❌ Error deleting link:', err)
      res.status(500).json({ error: 'Failed to delete link' })
    }
  })

  app.patch('/links/:id', async (req, res) => {
    const { id } = req.params
    const { title, url, type, description, paid, starred } = req.body
  
    try {
      const result = await pool.query(
        `UPDATE links
         SET title = $1, url = $2, type = $3, description = $4, paid = $5, starred = $6
         WHERE id = $7
         RETURNING *`,
        [title, url, type, description, paid, starred, id]
      )
      res.json(result.rows[0])
    } catch (err) {
      console.error('❌ Error updating link:', err)
      res.status(500).json({ error: 'Failed to update link' })
    }
  })

app.get("/links", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM links ORDER BY starred DESC, title ASC")
      res.json(result.rows)
    } catch (error) {
      console.error("❌ Error fetching links:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  })
  

app.get("/", (req, res) => {
  res.send("🧠 Backend is working!")
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server listening at http://0.0.0.0:${PORT}`)
  })
