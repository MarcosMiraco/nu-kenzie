import { useState } from 'react' 
import Header from "./components/Header"
import Main from "./components/Main"
import Home from './components/Home'
import Toast from "./models/toast_model.js"
import warningImage from "./images/icons/warning.svg"

export default function App() {
  const [initialTransactions, setInitialTransactions] = useState([])
  const [listTransactions, setListTransactions] = useState(initialTransactions)
  const [page, setPage] = useState(false)
  if (page) {
    return (
      <>
        <Header switchPage={switchPage}/>
        <Main 
          listTransactions={listTransactions} 
          addTransaction={addTransaction}
          removeTransaction={removeTransaction}
          filterTransaction={filterTransaction}
          initialTransactions={initialTransactions}/>
      </>
    )
  }
  else {
    return (
      <Home switchPage={switchPage}/>
    )
  }

  function switchPage(value) {
    setPage(value)
  }

  function addTransaction(description, type, value) {
    const conversion = {
      description: 'Descrição é um campo obrigatório!',
      type: 'Tipo de valor é um campo obrigatório!',
      value: 'Valor é um campo obrigatório!'
    }
    const data = {description, type, value}

    let negated = []
    for (const [chave, valueData] of Object.entries(data)) {
      if (!valueData) {
        negated.push(conversion[chave])
        new Toast(conversion[chave], {type: 'warning', showIcon: warningImage})
      }
    }

    if (negated.length === 0) {
      value = type === 'despesa' && value > 0 ? value = -value : type === 'entrada' && value < 0 ? Math.abs(value) : value
      setListTransactions([...listTransactions, {description, type, value}])
      setInitialTransactions([...listTransactions, {description, type, value}])
    }
  }

  function removeTransaction(transactionId) {
    let listTransactionsTemp = [...listTransactions]
    listTransactionsTemp.splice(transactionId, 1)
    setListTransactions(listTransactionsTemp)
    setInitialTransactions(listTransactionsTemp)
  }

  function filterTransaction(filter) {
    filter = filter.toLowerCase().slice(0, -1)
    if (filter === 'todo') {
      setListTransactions(initialTransactions)
    }
    else {
      setListTransactions(initialTransactions.filter(transaction => transaction.type.toLowerCase() === filter))
    }
  }
}