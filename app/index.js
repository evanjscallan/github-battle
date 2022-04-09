import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

//component aspects:
//state
//lifecycle
//UI (render)

//storing toggle theme in state for context

export default class App extends React.Component {
	constructor(props){
		super(props)
		//allows toggling of theme in any component
		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light'
				}))
				}
			}
		}

		//wrapped in additional div for styling abilities when we added Nav
	render() {
		return (
			<ThemeProvider value={this.state}>
			<div className={this.state.theme}>
			<div className='container'>
				<Nav/>
				<Battle />
				</div>
			</div>
			</ThemeProvider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))