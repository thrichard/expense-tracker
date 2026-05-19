const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('tranzakciok.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS tranzakciok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nev TEXT NOT NULL,
    osszeg INTEGER NOT NULL,
    tipus TEXT NOT NULL,
    datum TEXT NOT NULL
  )
`)

// Összes tranzakció lekérése
app.get('/api/tranzakciok', (req, res) => {
  const tranzakciok = db.prepare('SELECT * FROM tranzakciok').all()
  res.json(tranzakciok)
})

// Új tranzakció hozzáadása
app.post('/api/tranzakciok', (req, res) => {
  const { nev, osszeg, tipus, datum } = req.body
  const result = db.prepare('INSERT INTO tranzakciok (nev, osszeg, tipus, datum) VALUES (?, ?, ?, ?)').run(nev, osszeg, tipus, datum)
  res.json({ id: result.lastInsertRowid, nev, osszeg, tipus, datum })
})

// Tranzakció törlése
app.delete('/api/tranzakciok/:id', (req, res) => {
  db.prepare('DELETE FROM tranzakciok WHERE id = ?').run(parseInt(req.params.id))
  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log('Szerver fut: http://localhost:3000')
})