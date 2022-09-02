import {useState} from "react"
import SelectInput from "../SelectInput"
import TextInput from "../TextInput"
import "./style.css"

export default function Form({addTransaction}) {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [valueType, setValueType] = useState('entrada')
    const [showModal, setShowModal] = useState('displayNone')
    return (
        <>
            <form onSubmit={Event => {
                Event.preventDefault()
                addTransaction(description, valueType, value)
            }} className="addNewValue" id={showModal}>
                <button type="button" id="closeModal" onClick={closeModal}></button>
                <div className="form-description-wrapper">
                    <TextInput
                        text="Digite aqui sua descrição" 
                        labelText="Descrição" 
                        id="newValue-description" 
                        name="descricao" 
                        onChange={Event => {setDescription(Event.target.value)}}/>
                    <small>Ex: Compra de roupas</small>
                </div>
                <div className="form-value-wrapper">
                    <div className="value-wrapper">
                        <TextInput 
                            text="1" 
                            labelText="Valor" 
                            id="newValue-quantity" 
                            name="quantidade" 
                            onChange={Event => {setValue(Number(Event.target.value))}}/>
                    </div>
                    <div className="type-wrapper">
                        <SelectInput 
                            labelText="Tipo de valor" 
                            name="tipo de valor" 
                            id="newValue-valueType" 
                            options={[{value: 'entrada', name: 'Entrada'}, {value: 'despesa', name: 'Despesas'}]}
                            onChange={Event => {setValueType(Event.target.value)}}/>
                    </div>
                </div>
                <button>Inserir valor</button>

            </form>

            <button onClick={() => {
                setShowModal('')
                document.body.addEventListener('keydown', closeModal)
            }} id="openNewValueModal"></button>

            <div className="addNewValueModalBackdrop" id={showModal}>
            </div>
        </>
    )
    
    function closeModal(Event) {
        if (Event.key) {
            if (Event.key === 'Escape') {
                setShowModal('displayNone')
                document.body.removeEventListener('keydown', closeModal)
            }    
        }
        else {
            setShowModal('displayNone')
            document.body.removeEventListener('keydown', closeModal)
        }
    }
}