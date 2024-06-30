import './DislikeBtn.css'

export const DislikeBtn = ()=>{

    return(
        <>
        <button className="Dislike-btn Small-btn" title='No me gusta'>
        <svg className='Dislike-svg Small-btn--svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4 0H3.7544C3.42889 0.00108072 3.11137 0.100927 2.84383 0.286338C2.57628 0.471749 2.37131 0.733993 2.256 1.0384L0.0504011 6.9192C0.0169127 7.00902 -0.000158685 7.10414 1.11152e-06 7.2V8.8C1.11152e-06 9.6824 0.717601 10.4 1.6 10.4H6.0896L5.192 13.0936C5.11197 13.3341 5.09012 13.5902 5.12822 13.8408C5.16632 14.0914 5.2633 14.3293 5.4112 14.5352C5.712 14.9512 6.1968 15.2 6.7104 15.2H8C8.2376 15.2 8.4624 15.0944 8.6152 14.912L12.3752 10.4H14.4C15.2824 10.4 16 9.6824 16 8.8V1.6C16 0.7176 15.2824 0 14.4 0ZM7.6248 13.6H6.7088L7.9584 9.8528C7.99844 9.7326 8.00935 9.60461 7.99024 9.47936C7.97114 9.35412 7.92256 9.2352 7.84851 9.1324C7.77446 9.0296 7.67705 8.94586 7.5643 8.88807C7.45155 8.83028 7.32669 8.8001 7.2 8.8H1.6V7.3448L3.7544 1.6H11.2V9.3104L7.6248 13.6ZM12.8 8.8V1.6H14.4L14.4008 8.8H12.8Z" fill="black"/>
        </svg>
        </button>
        </>
    )
}