import './FavBtn.css'

export const FavBtn = ()=>{

    return(
        <>
        <button className="Fav-btn Small-btn" title='Añadir a la lista'>
            <svg className='Fav-svg Small-btn--svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.85708H9.14286V-6.10352e-05H6.85714V6.85708H0V9.1428H6.85714V15.9999H9.14286V9.1428H16V6.85708Z" fill="black"/>
            </svg>
        </button>
        </>
    )
}