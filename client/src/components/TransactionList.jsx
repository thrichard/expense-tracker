function TransactionList({ tranzakciok, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Tranzakciók</h2>
      {tranzakciok.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">Még nincs tranzakció</p>
      )}
      <div className="flex flex-col gap-2">
        {tranzakciok.map(t => (
          <div key={t.id} className={`flex justify-between items-center p-3 rounded-lg border-l-4 bg-gray-50 ${t.tipus === 'bevetel' ? 'border-green-400' : 'border-red-400'}`}>
            <div>
              <p className="font-medium text-gray-700">{t.nev}</p>
              <p className="text-xs text-gray-400">{t.datum}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className={`font-bold ${t.tipus === 'bevetel' ? 'text-green-500' : 'text-red-500'}`}>
                {t.tipus === 'bevetel' ? '+' : '-'}{t.osszeg.toLocaleString()} Ft
              </p>
              <button onClick={() => onDelete(t.id)} className="text-gray-300 hover:text-red-400 transition text-lg">
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