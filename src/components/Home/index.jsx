import decorationImg from "../../images/decoration.svg"
import "./style.css"

export default function Home({switchPage}) {
    return (
        <div id='homePage'>
            <div className='homePage-wrapper'>
                <div className="title-wrapper">
                    <span>Nu</span> Kenzie
                </div>
                <p>Centralize o controle das suas finanças</p>
                <small>de forma rápida e segura</small>
                <button onClick={() => {switchPage(true)}}>Iniciar</button>
            </div>
            <img src={decorationImg} alt='' />
        </div>
    )
}