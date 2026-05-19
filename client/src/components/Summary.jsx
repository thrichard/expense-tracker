function Summary({ bevetel, kiadas }) {
  const egyenleg = bevetel - kiadas

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Bevétel</p>
        <p className="text-xl font-bold text-green-500">+{bevetel.toLocaleString()} Ft</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Kiadás</p>
        <p className="text-xl font-bold text-red-500">-{kiadas.toLocaleString()} Ft</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Egyenleg</p>
        <p className={`text-xl font-bold ${egyenleg >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
          {egyenleg.toLocaleString()} Ft
        </p>
      </div>
    </div>
  )
}

export default Summary