import { useState, useEffect } from 'react'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import Auth from './components/Auth'
import Chart from './components/Chart'
import Filter from './components/Filter'

const API = 'http://localhost:3000/api/tranzakciok'

function App() {
  const [tranzakciok, setTranzakciok] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [szuro, setSzuro] = useState('')

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

  const szurtTranzakciok = szuro
    ? tranzakciok.filter(t => t.datum.startsWith(szuro))
    : tranzakciok

  const bevetel = szurtTranzakciok
    .filter(t => t.tipus === 'bevetel')
    .reduce((sum, t) => sum + t.osszeg, 0)

  const kiadas = szurtTranzakciok
    .filter(t => t.tipus === 'kiadas')
    .reduce((sum, t) => sum + t.osszeg, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">💸 Kiadáskövető</h1>
          <button onClick={kijelentkezes} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
            Kijelentkezés
          </button>
        </div>
        <Summary bevetel={bevetel} kiadas={kiadas} />
        <Chart tranzakciok={szurtTranzakciok} />
        <Filter szuro={szuro} setSzuro={setSzuro} />
        <AddTransaction onAdd={hozzaad} />
        <TransactionList tranzakciok={szurtTranzakciok} onDelete={torol} />
      </div>
    </div>
  )
}

export default App