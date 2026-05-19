import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#ef4444', '#22c55e']

function Chart({ tranzakciok }) {
  const kiadas = tranzakciok
    .filter(t => t.tipus === 'kiadas')
    .reduce((sum, t) => sum + t.osszeg, 0)

  const bevetel = tranzakciok
    .filter(t => t.tipus === 'bevetel')
    .reduce((sum, t) => sum + t.osszeg, 0)

  if (kiadas === 0 && bevetel === 0) return null

  const data = [
    { name: 'Kiadás', value: kiadas },
    { name: 'Bevétel', value: bevetel },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Összesítő</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()} Ft`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart