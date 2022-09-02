import "./style.css"
import emptyCard from "../../images/NoCard.svg"
import Card from "../Card"
import { useState } from "react"

export default function List({listTransactions, removeTransaction, filterTransaction}) {
    const [activeButton, setActiveButton] = useState(0)
    return (
        <section className="transactionsList">
            <div className="filters-wrapper">
                <p>Resumo financeiro</p>
                <ul className="filters">
                    <li>
                        <button 
                            onClick={Event => {
                                setActiveButton(0)
                                filterTransaction(Event.target.innerText)
                            }} 
                            id={activeButton === 0 ? 'Active' : null}>Todos</button>
                    </li>
                    <li>
                        <button 
                            onClick={Event => {
                                setActiveButton(1)
                                filterTransaction(Event.target.innerText)
                            }} 
                            id={activeButton === 1 ? 'Active' : null}>Entradas</button>
                    </li>
                    <li>
                        <button 
                            onClick={Event => {
                                setActiveButton(2)
                                filterTransaction(Event.target.innerText)
                            }} 
                            id={activeButton === 2 ? 'Active' : null}>Despesas</button>
                    </li>
                </ul>
            </div>
            {
                listTransactions.length === 0 ? 
                    <div className="cards-wrapper">
                        <h2>Você ainda não possui nenhum lançamento</h2>
                        <img src={emptyCard} alt=""/>
                        <img src={emptyCard} alt=""/>
                        <img src={emptyCard} alt=""/>
                    </div> :
                    <ul className="cards-wrapper">
                        {                        
                            listTransactions.map((transaction, index) => {
                                return <Card 
                                            description={transaction.description} 
                                            type={transaction.type} 
                                            value={transaction.value}
                                            removeTransaction={() => {removeTransaction(index)}}
                                            key={index}/>
                            })
                        }
                    </ul>
            }
        </section>
    )
}