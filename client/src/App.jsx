import { useState, useEffect } from 'react'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import Auth from './components/Auth'

const API = 'http://localhost:3000/api/tranzakciok'

function App() {
  const [tranzakciok, setTranzakciok] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (!token) return
    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setTranzakciok(data))
  }, [token])

  async function hozzaad(ujTranzakcio) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(ujTranzakcio)
    })
    const mentett = await res.json()
    setTranzakciok([...tranzakciok, mentett])
  }

  async function torol(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setTranzakciok(tranzakciok.filter(t => t.id !== id))
  }

  function kijelentkezes() {
    localStorage.removeItem('token')
    setToken(null)
    setTranzakciok([])
  }

  if (!token) return <Auth onLogin={setToken} />

  const bevetel = tranzakciok
    .filter(t => t.tipus === 'bevetel')
    .reduce((sum, t) => sum + t.osszeg, 0)

  const kiadas = tranzakciok
    .filter(t => t.tipus === 'kiadas')
    .reduce((sum, t) => sum + t.osszeg, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
        <h1>Kiadáskövető</h1>
        <button onClick={kijelentkezes} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Kijelentkezés
        </button>
      </div>
      <Summary bevetel={bevetel} kiadas={kiadas} />
      <AddTransaction onAdd={hozzaad} />
      <TransactionList tranzakciok={tranzakciok} onDelete={torol} />
    </div>
  )
}

export default App