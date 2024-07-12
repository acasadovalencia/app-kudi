// Importaciones
import './ModalAlert.css'

import { KudiContext } from '@context/Context'

import { useContext } from 'react'

export const ModalAlert = ()=>{

    // Contexto
    const { deleteAlert , setDeleteAlert , closeMenu , openAlert  } = useContext( KudiContext )
    
    const closeAlert = () =>{
        setDeleteAlert(false)
    }

    return(
        <>
        <div className={`Delete-alert ${deleteAlert ? `isActive` : ``}`}>
            <div className="Delete-wrapper">
                <div className="Delete-text">
                    <h3 className='Delete-h3 H3'>¿Está seguro?</h3>
                    <span className="Delete-span">Perderá todas sus listas de favoritos</span>
                </div>
                <div className="BtnDelete-wrapper">
                    <button className="Delete-btn Delete-btn--delete">Eliminar usuario</button>
                    <button onClick={closeAlert} className="Delete-btn Delete-btn--cancel">Cancelar</button>
                </div>
            </div>
        </div>
        </>
    )
}