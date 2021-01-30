import React from 'react'
import Trollface from '../Trollface.png'

function Header() {
    return (
        <header>
             <img src={Trollface} alt='Problem?'/>
            <p>Makeme Meme</p>
        </header>
    )
}

export default Header