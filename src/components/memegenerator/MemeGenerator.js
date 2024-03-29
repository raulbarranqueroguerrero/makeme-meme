import React, { useEffect, useState } from 'react';
import randomTextDataFile from './randomTextDataFile';

const MemeGenerator = () => {
	const [text, setText] = useState({ topText: '', bottomText: '' });
	const [allMemes, setAllMemes] = useState([]);
	const [randomMeme, setRandomMeme] = useState('https://i.imgflip.com/8p0a.jpg');
	const [randomText, setRandomText] = useState({ top: '', bottom: '' });

	const generateRandomMeme = (e) => {
		e.preventDefault();
		const randomNum = Math.floor(Math.random() * allMemes.length);
		setRandomMeme(allMemes[randomNum].url);
		setText({ topText: '', bottomText: '' });
		setRandomText('');
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setText(prevText => ({
			...prevText,
			[name]: value
		}));
	};

	const handleRandomText = (e) => {
		e.preventDefault();
		setText({ topText: '', bottomText: '' });
		const { name } = e.target;
		const values = Object.values(randomTextDataFile);
		const randomTextValue = values[parseInt(Math.random() * values.length)];
		setRandomText(prevText => ({ ...prevText, [name]: randomTextValue }));
	};

	useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then(res => res.json())
			.then(res => {
				const { memes } = res.data;
				setAllMemes(memes);
			});
	}, []);

	useEffect(() => {
		setRandomText('');
	}, []);

	return (
		<form className='meme-form'>
			<div className='top-text'>
				<input
					type='text'
					name='topText'
					placeholder='Insert Top Text'
					value={text.topText}
					onChange={handleInput}
					className='input'
				/>
				<button
					name='top'
					className='random-text'
					onClick={handleRandomText}
				>
					Random
				</button>
			</div>
			<div className='bottom-text'>
				<input
					type='text'
					name='bottomText'
					placeholder='Insert Bottom Text'
					value={text.bottomText}
					onChange={handleInput}
					className='input'
				/>
				<button
					name='bottom'
					className='random-text'
					onClick={handleRandomText}
				>
					Random
				</button>
			</div>
			<div className='meme'>
				<img src={randomMeme} alt='Random Meme' />
				<h2 className='top'>{text.topText.length > 0 ? text.topText : randomText.top}</h2>
				<h2 className='bottom'>{text.bottomText.length > 0 ? text.bottomText : randomText.bottom}</h2>
			</div>
			<div className='bottom-buttons'>
				<button className='generate-new' onClick={generateRandomMeme}>New</button>
				<a
					className='git-button'
					href='https://github.com/raulbarranqueroguerrero/makeme-meme'
					target="_blank"
					rel='noreferrer'
				>
					Git
				</a>
			</div>
		</form>
	);
};

export default MemeGenerator;