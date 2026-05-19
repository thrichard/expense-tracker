const tranzakciok = [
  { id: 1, nev: 'Fizetés', osszeg: 250000, tipus: 'bevetel', datum: '2026-05-01' },
  { id: 2, nev: 'Bolt', osszeg: 15000, tipus: 'kiadas', datum: '2026-05-03' },
  { id: 3, nev: 'Számlák', osszeg: 45000, tipus: 'kiadas', datum: '2026-05-05' },
  { id: 4, nev: 'Freelance munka', osszeg: 80000, tipus: 'bevetel', datum: '2026-05-10' },
]

function TransactionList() {
  return (
    <div style={{ padding: '0 24px' }}>
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
            <p style={{ fontWeight: 'bold', color: t.tipus === 'bevetel' ? 'green' : 'red' }}>
              {t.tipus === 'bevetel' ? '+' : '-'}{t.osszeg.toLocaleString()} Ft
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList