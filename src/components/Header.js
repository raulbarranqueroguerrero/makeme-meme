import React from 'react'
import Trollface from '../Trollface.png'

function Header() {
    return (
        <div className='header'>
             <img src={Trollface} alt='Problem?'/>
            <p>Makeme Meme</p>
        </div>
    )
}

export default Header