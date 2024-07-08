    import './Category.css'

    import { KudiContext } from '@context/Context'
    import { PlayBtn } from '@components/PlayBtn/PlayBtn'
    import { DeleteFavMovieBtn } from '@components/DeleteFavMovieBtn/DeleteFavMovieBtn'
    import { DeleteFavTvshowBtn } from '@components/DeleteFavTvshowBtn/DeleteFavTvshowBtn'

    import { useContext , useState , useEffect } from 'react'
    import { useNavigate , NavLink, useParams } from 'react-router-dom'


    export const Category = ()=>{

        const { VITE_API , user , setUser , users , setCurrentUser , movies , tvshows } = useContext( KudiContext )

        const { category } = useParams


        return(
            <>
            <main className="Main">
            <section className="Section Categories">
                <h2 className="Section-h2 H2">Categoría {category}</h2>
                <ul className="Section-ul Categories-ul">
                    
                </ul>
            </section>
            </main>
            </>
        )
    }

