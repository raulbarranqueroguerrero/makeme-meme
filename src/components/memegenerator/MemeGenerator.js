import React, {useEffect, useState} from 'react'
import randomTextDataFile from './randomTextDataFile'

function MemeGenerator() {
    const [text, setText] = useState({topText: '', bottomText: ''})
    const [allMemes, setAllMemes] = useState([])
    const [randomMeme, setRandomMeme] = useState('http://i.imgflip.com/1bij.jpg')
    const [randomText, setRandomText] = useState({top: '', bottom: ''})    
    
    function generateRandomMeme(e) {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * allMemes.length)
        setRandomMeme(allMemes[randomNum].url)
        setText({topText: '', bottomText: ''})
        setRandomText('')
    }
    
    function handleInput(e) {
        const {name, value} = e.target
        setText(prevText => ({
            ...prevText,
            [name]: value
        }))
    }
    
    function handleRandomText(e) {
        e.preventDefault()
        const {name} = e.target
        const values = Object.values(randomTextDataFile)
        const randomTextValue = values[parseInt(Math.random()* values.length)]
        setRandomText(prevText => ({...prevText, [name]: randomTextValue}))
    }
    
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(res => {
            const {memes} = res.data
            setAllMemes(memes)
        })
    }, [])
    
    useEffect(() => {
        setRandomText('')
    }, [])

    return (
        <div>
            <form className='meme-form'>
                <input
                    type='text'
                    name='topText'
                    placeholder='Insert Top Text'
                    value={text.topText}
                    onChange={handleInput}
                />
                <button name='top' className='random-top-text-button' onClick={handleRandomText}>Random</button>
                <br/>

                <input
                    type='text'
                    name='bottomText'
                    placeholder='Insert Bottom Text'
                    value={text.bottomText}
                    onChange={handleInput}
                />
                <button name='bottom' className='random-bottom-text-button' onClick={handleRandomText}>Random</button>
                
                <div className='meme'>
                    <img src={randomMeme} alt='Random Meme' />
                    <h2 className='top'>{text.topText.length > 0 ? text.topText : randomText.top}</h2>
                    <h2 className='bottom'>{text.bottomText.length > 0 ? text.bottomText : randomText.bottom}</h2>
                </div>
                
                <button className='generate-new-button'onClick={generateRandomMeme}>Generate</button>
                <a
                    className='git-button'
                    href='https://github.com/raulbarranqueroguerrero/makeme-meme'
                    target="_blank"
                    rel='noreferrer'
                >Git
                </a>
            </form>
        </div>
    )
}

export default MemeGenerator