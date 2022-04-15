import React from 'react';
import Card from './Card'
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api.js';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Loading from './Loading'
import Tooltip from './Tooltip'

//separated from original component as its own standalone function
//takes destructured argument
function LanguagesNav ({ selected, onUpdateLanguage }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
	//map each language to a list item
	return(
		<ul className='flex-center'>
		{languages.map((language) => (
			<li key={language}>
			<button 
			className='btn-clear nav-link'
			style={language === selected ? { color: 'rgb(187, 46, 31)' } : null } 
					
					//arrow function waits for function to be invoked
					onClick={() => onUpdateLanguage(language)}>
				{language}
			</button>
			</li>
			))}
		</ul>
	)
}

//requires a language to be selected
//requires update of language
LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired,
}


function ReposGrid ({ repos }) {
	return(
		<ul className='grid space-around'>
		{repos.map((repo, index) => {
			const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
			const { login, avatar_url } = owner

			return (
				<li key={html_url}>
				<Card
				header={`#${index + 1}`}
				avatar={avatar_url}
				html={html_url}
				name={login}
				>
								
				<ul className='card-list'>
					<li>
						<Tooltip text="Github Username">
							<FaUser color='rgb(255,191,116)' size={22}/>
							<a href={`https://github.com/${login}`}>
							{login}
							</a>
						</Tooltip>
					</li>
					<li>
						<FaStar color='rgb(255,215,0)' size={22}/>
						{stargazers_count.toLocaleString()} stars
					</li>
					<li>
						<FaCodeBranch color='rgb(129,195,245)' size={22}/>
					{forks.toLocaleString()} forks
				
					</li>						
					<li>
						<FaExclamationTriangle color='rgb(241,138,147)' size={22}/>
					{open_issues.toLocaleString()} open issues
					
					</li>						
				</ul>
				

				</Card>

					
	
				</li>
				)

			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
	state = {
		selectedLanguage: 'All',
			repos: {},
			error: null,
	}
	//when the component mounts,
	//update the language (updateLanguage function)
	//this.state.selectedLanguage = 'All' (ln 40)
	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage = (selectedLanguage) => {
		//changes language state based on selectedLanguage
		//tied to updateLanguage on the params in LanguagesNav
		this.setState({
			selectedLanguage,
			error: null,
			repos: {},
		})
		//if the repos selected
		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then((data) => {
				this.setState(({ repos }) => ({
					repos: {
						...repos,
						[selectedLanguage]: data,
					}
				}))				
			})
					.catch(() => {
				console.warn('Error fetching repos: ', error)

				this.setState({
					error: 'There was an error fetching the repositories.'
				})
			})
		}			

	}


	isLoading = () => {
		const { selectedLanguage, repos, error } = this.state 

		return !repos[selectedLanguage] && error === null
	}
	render() {
		const { selectedLanguage, repos, error } = this.state
		
	return(
		<React.Fragment>
			<LanguagesNav
			selected={selectedLanguage}
			onUpdateLanguage={this.updateLanguage}
			/>

		{this.isLoading() &&  <Loading text='Fetching Repos'/>}

		{error && <p className='center-text error'>{error}</p>}

		{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
		</React.Fragment>
		)
	}
}