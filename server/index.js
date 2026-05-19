const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('tranzakciok.db')
const JWT_SECRET = 'titkos_kulcs_123'

db.exec(`
  CREATE TABLE IF NOT EXISTS felhasznalok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    jelszo TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tranzakciok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    felhasznalo_id INTEGER NOT NULL,
    nev TEXT NOT NULL,
    osszeg INTEGER NOT NULL,
    tipus TEXT NOT NULL,
    datum TEXT NOT NULL
  )
`)

// Token ellenőrzés middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ hiba: 'Nincs token' })
  try {
    req.felhasznalo = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ hiba: 'Érvénytelen token' })
  }
}

// Regisztráció
app.post('/api/regisztracio', async (req, res) => {
  const { email, jelszo } = req.body
  const hash = await bcrypt.hash(jelszo, 10)
  try {
    const result = db.prepare('INSERT INTO felhasznalok (email, jelszo) VALUES (?, ?)').run(email, hash)
    res.json({ ok: true, id: result.lastInsertRowid })
  } catch {
    res.status(400).json({ hiba: 'Ez az email már foglalt' })
  }
})

// Bejelentkezés
app.post('/api/bejelentkezes', async (req, res) => {
  const { email, jelszo } = req.body
  const felhasznalo = db.prepare('SELECT * FROM felhasznalok WHERE email = ?').get(email)
  if (!felhasznalo) return res.status(400).json({ hiba: 'Hibás email vagy jelszó' })
  const egyezik = await bcrypt.compare(jelszo, felhasznalo.jelszo)
  if (!egyezik) return res.status(400).json({ hiba: 'Hibás email vagy jelszó' })
  const token = jwt.sign({ id: felhasznalo.id, email }, JWT_SECRET)
  res.json({ token })
})

// Összes tranzakció lekérése
app.get('/api/tranzakciok', authMiddleware, (req, res) => {
  const tranzakciok = db.prepare('SELECT * FROM tranzakciok WHERE felhasznalo_id = ?').all(req.felhasznalo.id)
  res.json(tranzakciok)
})

// Új tranzakció hozzáadása
app.post('/api/tranzakciok', authMiddleware, (req, res) => {
  const { nev, osszeg, tipus, datum } = req.body
  const result = db.prepare('INSERT INTO tranzakciok (felhasznalo_id, nev, osszeg, tipus, datum) VALUES (?, ?, ?, ?, ?)').run(req.felhasznalo.id, nev, osszeg, tipus, datum)
  res.json({ id: result.lastInsertRowid, nev, osszeg, tipus, datum })
})

// Tranzakció törlése
app.delete('/api/tranzakciok/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM tranzakciok WHERE id = ? AND felhasznalo_id = ?').run(parseInt(req.params.id), req.felhasznalo.id)
  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log('Szerver fut: http://localhost:3000')
})