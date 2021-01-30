import React, {useEffect, useState} from 'react'

function MemeGenerator() {
    const [text, setText] = useState({topText: '', bottomText: ''})
    const [allMemes, setAllMemes] = useState([])
    const [randomMeme, setRandomMeme] = useState('http://i.imgflip.com/1bij.jpg')
    const [randomTopText, setRandomTopText] = useState('')
    const [randomBottomText, setRandomBottomText] = useState('')

    const randomTextData = {
        "0": "Kawabunga!",
        "1": "Andaleee",
        "2": "Bingo"
    }

    const values = Object.values(randomTextData)
    const randomTextValue = values[parseInt(Math.random()* values.length)]

    function handleTopText(event) {
        event.preventDefault()
        setRandomTopText(randomTextValue)
    }
    function handleBottomText(event) {
        event.preventDefault()
        setRandomBottomText(randomTextValue)
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(res => {
                const {memes} = res.data
                setAllMemes(memes)
            })
    }, [])

    function generateRandomMeme(event) {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * allMemes.length)
        setRandomMeme(allMemes[randomNum].url)
        setText({topText: '', bottomText: ''})
        setRandomTopText('')
        setRandomBottomText('')
    }

    function handleChange(event) {
        const {name, value} = event.target
        setText(prevText => ({
            ...prevText,
            [name]: value
        }))
    }
    
    return (
        <div>
            <form className='meme-form'>
                <input
                    type='text'
                    name='topText'
                    placeholder='Top Text'
                    value={text.topText}
                    onChange={handleChange}
                />
                <button className='random-top-text-button' onClick={handleTopText}>Random</button>
                <br/>
                <input
                    type='text'
                    name='bottomText'
                    placeholder='Bottom Text'
                    value={text.bottomText}
                    onChange={handleChange}
                />
                <button className='random-bottom-text-button' onClick={handleBottomText}>Random</button>
                <div className='meme'>
                    <img src={randomMeme} alt='Random Meme' />
                    <h2 className='top'>{text.topText.length > 0 ? text.topText : randomTopText}</h2>
                    <h2 className='bottom'>{text.bottomText.length > 0 ? text.bottomText : randomBottomText}</h2>
                </div>
                <button className='generate-new-button'onClick={generateRandomMeme}>Generate New Meme</button>
            </form>
        </div>
    )
}

export default MemeGenerator