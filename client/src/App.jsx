import { useState, useEffect } from 'react'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'

const API = 'http://localhost:3000/api/tranzakciok'

function App() {
  const [tranzakciok, setTranzakciok] = useState([])

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => setTranzakciok(data))
  }, [])

  async function hozzaad(ujTranzakcio) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ujTranzakcio)
    })
    const mentett = await res.json()
    setTranzakciok([...tranzakciok, mentett])
  }

  async function torol(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setTranzakciok(tranzakciok.filter(t => t.id !== id))
  }

  const bevetel = tranzakciok
    .filter(t => t.tipus === 'bevetel')
    .reduce((sum, t) => sum + t.osszeg, 0)

  const kiadas = tranzakciok
    .filter(t => t.tipus === 'kiadas')
    .reduce((sum, t) => sum + t.osszeg, 0)

  return (
    <div>
      <h1 style={{ padding: '24px' }}>Kiadáskövető</h1>
      <Summary bevetel={bevetel} kiadas={kiadas} />
      <AddTransaction onAdd={hozzaad} />
      <TransactionList tranzakciok={tranzakciok} onDelete={torol} />
    </div>
  )
}

export default App