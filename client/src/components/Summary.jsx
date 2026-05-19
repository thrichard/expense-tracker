function Summary() {
  const bevetel = 250000
  const kiadas = 180000
  const egyenleg = bevetel - kiadas

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', flex: 1 }}>
        <p>Bevétel</p>
        <h2 style={{ color: 'green' }}>{bevetel.toLocaleString()} Ft</h2>
      </div>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', flex: 1 }}>
        <p>Kiadás</p>
        <h2 style={{ color: 'red' }}>{kiadas.toLocaleString()} Ft</h2>
      </div>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', flex: 1 }}>
        <p>Egyenleg</p>
        <h2 style={{ color: 'blue' }}>{egyenleg.toLocaleString()} Ft</h2>
      </div>
    </div>
  )
}

export default Summary