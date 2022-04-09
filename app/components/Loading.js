import React from 'react'
import PropTypes from 'prop-types'

const styles = {
	content: {
		fontSize: '35px',
		position: 'absolute',
		left: '0',
		right: '0',
		marginTop: '20px',
		textAlign: 'center'
	}
}

//goal is to make your component reuseable
export default class Loading extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			content: props.text
		}
	}
	//set instance properties so we can access them elsewhere in component (unmount)
	componentDidMount () {
		const { speed, text } = this.props

		this.interval = window.setInterval(() =>  {
			this.state.content === text + '...'
				? this.setState({ content: text })
				: this.setState(({ content }) => ({ content: content + '.' }))
		}, speed)
	}
	//if we dont clearInterval on this.interval, it's a memory leak and will continue running the same function
	componentWillUnmount () {
		window.clearInterval(this.interval)
	}
	render() {
		return (
			<p style={styles.content}>
				{this.state.content}
			</p>
			)
	}
}


Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}
