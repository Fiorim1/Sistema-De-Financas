// Importação do CSS
import '../components/stylesComponents/styleHeader.css'

// Importando Ícones
import iconeDinheiro from '../assets/iconeDinheiro.png'

function Header() {

    return (
        <div className="headerContainer">
            <div className="titleIcon">
                {/* Ícone */}
                <img src={iconeDinheiro} className='iconeDinheiro' />
                <h1 className='textTitle'>Finanças Pessoais</h1>
                {/* Ícone */}
                <img src={iconeDinheiro} className='iconeDinheiro' />
            </div>
        </div>
    )
}

export default Header
