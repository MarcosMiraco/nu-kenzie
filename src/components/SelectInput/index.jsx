import "./style.css"

export default function SelectInput({labelText, options, name, id, onChange}) {
    return (
        <>
            <label className="SelectInputLabel" htmlFor={name}>{labelText}</label>
            <select className="SelectInput" name={name} id={id} onChange={onChange}>
                {
                    options.map((option, index) => {
                        return <option key={index} value={option.value}>{option.name}</option>
                    })
                }
            </select>
        </>
    )
}