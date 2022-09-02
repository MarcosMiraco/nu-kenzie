import "./style.css"

export default function TextInput({text, labelText, name, id, onChange, type='text'}) {
    return (
        <>
            <label className="TextInputLabel" htmlFor={name}>{labelText}</label>
            <input className="TextInput" onChange={onChange} type={type} name={name} id={id} placeholder={text} />
        </>
    )
}