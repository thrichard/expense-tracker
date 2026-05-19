import { useState } from 'react'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'

const kezdoAdatok = [
  { id: 1, nev: 'Fizetés', osszeg: 250000, tipus: 'bevetel', datum: '2026-05-01' },
  { id: 2, nev: 'Bolt', osszeg: 15000, tipus: 'kiadas', datum: '2026-05-03' },
  { id: 3, nev: 'Számlák', osszeg: 45000, tipus: 'kiadas', datum: '2026-05-05' },
  { id: 4, nev: 'Freelance munka', osszeg: 80000, tipus: 'bevetel', datum: '2026-05-10' },
]

function App() {
  const [tranzakciok, setTranzakciok] = useState(kezdoAdatok)

  function hozzaad(ujTranzakcio) {
    setTranzakciok([...tranzakciok, ujTranzakcio])
  }

  function torol(id) {
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