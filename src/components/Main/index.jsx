import Form from "../Form";
import List from "../List";
import TotalMoney from "../TotalMoney";
import "./style.css"

export default function Main({listTransactions, addTransaction, removeTransaction, filterTransaction, initialTransactions}) {
    return (
        <main>
            <div className="form-wrapper">
                <Form addTransaction={addTransaction}/>
                {
                    initialTransactions.length > 0 ? 
                        <TotalMoney initialTransactions={initialTransactions} /> :
                        null
                }
            </div>
            <List listTransactions={listTransactions} removeTransaction={removeTransaction} filterTransaction={filterTransaction}/>
        </main>
    )
}