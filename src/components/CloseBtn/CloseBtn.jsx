import './CloseBtn.css'

import { useNavigate } from 'react-router-dom'

export const CloseBtn = ()=>{
    
    const navigate = useNavigate()

    return(
        <>
        <button onClick={()=> navigate(-1)} className="Close-btn Small-btn" title='Volver'>
            <svg className='Close-svg Small-btn--svg' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Menu / Close_LG">
                <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
        </button>
        </>
    )
}