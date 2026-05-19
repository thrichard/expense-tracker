function TransactionList({ tranzakciok, onDelete }) {
  return (
    <div style={{ padding: '0 24px', marginTop: '24px' }}>
      <h2>Tranzakciók</h2>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tranzakciok.map(t => (
          <div key={t.id} style={{
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderLeft: `4px solid ${t.tipus === 'bevetel' ? 'green' : 'red'}`
          }}>
            <div>
              <p style={{ fontWeight: 'bold' }}>{t.nev}</p>
              <p style={{ fontSize: '12px', color: '#888' }}>{t.datum}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontWeight: 'bold', color: t.tipus === 'bevetel' ? 'green' : 'red' }}>
                {t.tipus === 'bevetel' ? '+' : '-'}{t.osszeg.toLocaleString()} Ft
              </p>
              <button
                onClick={() => onDelete(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList