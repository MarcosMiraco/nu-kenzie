import "./style.css"

export default function TotalMoney({initialTransactions}) {
    return (
        <section className="totalMoney">
            <div className="total-wrapper">
                <h3>Valor Total:</h3>
                <span>{initialTransactions.reduce((total, transaction) => total + transaction.value, 0).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>
            </div>
            <small>O valor se refere ao saldo</small>
        </section>
    )
}