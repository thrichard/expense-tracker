import Summary from './components/Summary'
import TransactionList from './components/TransactionList'

function App() {
  return (
    <div>
      <h1 style={{ padding: '24px' }}>Kiadáskövető</h1>
      <Summary />
      <TransactionList />
    </div>
  )
}

export default App