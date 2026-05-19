function AddTransaction({ onAdd }) {
  function handleSubmit(e) {
    e.preventDefault()

    const nev = e.target.nev.value
    const osszeg = parseInt(e.target.osszeg.value)
    const tipus = e.target.tipus.value
    const datum = e.target.datum.value

    if (!nev || !osszeg || !datum) return

    onAdd({ id: Date.now(), nev, osszeg, tipus, datum })
    e.target.reset()
  }

  return (
    <div style={{ padding: '0 24px', marginTop: '24px' }}>
      <h2>Új tranzakció</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="nev" placeholder="Megnevezés" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="osszeg" type="number" placeholder="Összeg (Ft)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <select name="tipus" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="kiadas">Kiadás</option>
          <option value="bevetel">Bevétel</option>
        </select>
        <input name="datum" type="date" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Hozzáadás
        </button>
      </form>
    </div>
  )
}

export default AddTransaction