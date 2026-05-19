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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '32px', borderRadius: '8px', width: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2>{mod === 'bejelentkezes' ? 'Bejelentkezés' : 'Regisztráció'}</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Jelszó"
          type="password"
          value={jelszo}
          onChange={e => setJelszo(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {hiba && <p style={{ color: 'red', fontSize: '14px' }}>{hiba}</p>}
        <button onClick={handleSubmit} style={{ padding: '10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {mod === 'bejelentkezes' ? 'Bejelentkezés' : 'Regisztráció'}
        </button>
        <p style={{ fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#4f46e5' }}
          onClick={() => setMod(mod === 'bejelentkezes' ? 'regisztracio' : 'bejelentkezes')}>
          {mod === 'bejelentkezes' ? 'Nincs fiókod? Regisztrálj' : 'Van már fiókod? Jelentkezz be'}
        </p>
      </div>
    </div>
  )
}

export default Auth