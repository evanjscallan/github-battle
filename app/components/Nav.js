import React from 'react';
import { ThemeConsumer } from './../contexts/theme'



export default function Nav () {
	//
	//JSX function inside of ThemeConsumer
	//going to pass whatever was passed to Provider value 
	//(in this case state)
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
				<nav className='row space-between'>
					<button
						style={{fontSize:30}}
						className='btn-clear'
						onClick={toggleTheme}
						>
						{theme === 'light' ? '🔦' : '💡'}
					</button>
					</nav>
				)}
		</ThemeConsumer>
		)
}