import { useState } from 'react'

const API = 'http://localhost:3000/api'

function Auth({ onLogin }) {
  const [mod, setMod] = useState('bejelentkezes')
  const [email, setEmail] = useState('')
  const [jelszo, setJelszo] = useState('')
  const [hiba, setHiba] = useState('')

  async function handleSubmit() {
    setHiba('')
    const url = mod === 'bejelentkezes' ? `${API}/bejelentkezes` : `${API}/regisztracio`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, jelszo })
    })
    const data = await res.json()
    if (data.hiba) return setHiba(data.hiba)
    if (mod === 'regisztracio') {
      setMod('bejelentkezes')
      setHiba('Sikeres regisztráció! Jelentkezz be.')
      return
    }
    localStorage.setItem('token', data.token)
    onLogin(data.token)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {mod === 'bejelentkezes' ? '👋 Bejelentkezés' : '📝 Regisztráció'}
        </h2>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          placeholder="Jelszó"
          type="password"
          value={jelszo}
          onChange={e => setJelszo(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        {hiba && <p className="text-red-500 text-sm text-center">{hiba}</p>}
        <button onClick={handleSubmit} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition">
          {mod === 'bejelentkezes' ? 'Bejelentkezés' : 'Regisztráció'}
        </button>
        <p
          className="text-sm text-center text-indigo-500 cursor-pointer hover:underline"
          onClick={() => setMod(mod === 'bejelentkezes' ? 'regisztracio' : 'bejelentkezes')}
        >
          {mod === 'bejelentkezes' ? 'Nincs fiókod? Regisztrálj' : 'Van már fiókod? Jelentkezz be'}
        </p>
      </div>
    </div>
  )
}

export default Auth