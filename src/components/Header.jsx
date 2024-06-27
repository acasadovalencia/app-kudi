import './Header.css'

export const Header = ()=>{

    return(
        <>
        <header className="Header">
            <div className="Header-wrapper">
                <a href="" className="Header-a Logo">
                    <h1 className="Logo-h1">KUDI</h1>
                </a>
                <nav className="Header-nav">
                    <ul className="Header-ul Nav">
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Inicio</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Categorias</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Películas</a>
                        </li>
                        <li className="Nav-li">
                            <a href="" className="Nav-a">Series</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}