import "./style.css"

export default function Header({switchPage}) {
    return (
        <header>
            <div className="title-wrapper">
                <span>Nu</span> Kenzie
            </div>

            <button onClick={() => {switchPage(false)}}>Inicio</button>
        </header>
    )
}