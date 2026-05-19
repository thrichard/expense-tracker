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
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Új tranzakció</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="nev" placeholder="Megnevezés" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        <input name="osszeg" type="number" placeholder="Összeg (Ft)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        <select name="tipus" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="kiadas">Kiadás</option>
          <option value="bevetel">Bevétel</option>
        </select>
        <input name="datum" type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition">
          Hozzáadás
        </button>
      </form>
    </div>
  )
}

export default AddTransaction