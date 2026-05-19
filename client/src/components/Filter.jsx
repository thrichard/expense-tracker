function Filter({ szuro, setSzuro }) {
  const honapok = [
    { ertek: '', nev: 'Összes' },
    { ertek: '2026-01', nev: 'Január' },
    { ertek: '2026-02', nev: 'Február' },
    { ertek: '2026-03', nev: 'Március' },
    { ertek: '2026-04', nev: 'Április' },
    { ertek: '2026-05', nev: 'Május' },
    { ertek: '2026-06', nev: 'Június' },
    { ertek: '2026-07', nev: 'Július' },
    { ertek: '2026-08', nev: 'Augusztus' },
    { ertek: '2026-09', nev: 'Szeptember' },
    { ertek: '2026-10', nev: 'Október' },
    { ertek: '2026-11', nev: 'November' },
    { ertek: '2026-12', nev: 'December' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Szűrés</h2>
      <div className="flex flex-wrap gap-2">
        {honapok.map(h => (
          <button
            key={h.ertek}
            onClick={() => setSzuro(h.ertek)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              szuro === h.ertek
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {h.nev}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter