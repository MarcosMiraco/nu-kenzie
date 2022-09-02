import "./style.css"
import { useState } from "react"
import trash from "../../images/trash.svg"
import trashHover from "../../images/trashHover.svg"

export default function Card({description, type, value, index, removeTransaction}) {
    value = value.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    const [img, setImg] = useState(trash)
    return (
        <li>
            <div className={type}>
                <div className="description-wrapper">
                    <p>{description}</p>
                    <div className="card-value-wrapper">
                        <p>{value}</p>
                        <button 
                        onMouseEnter={() => {
                            setImg(trashHover)
                        }}
                        onMouseLeave={() => {
                            setImg(trash)
                        }}
                        onClick={removeTransaction}><img src={img} alt="fechar card" /></button>
                    </div>
                </div>
                <small>{type}</small>
            </div>
        </li>
    )
}