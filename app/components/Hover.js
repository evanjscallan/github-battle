import * as React from "react";

//HIGHER-ORDER FUNCTION: function that returns another component

export default class Hover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovering: false,
		};

		this.mouseOver = this.mouseOver.bind(this);
		this.mouseOut = this.mouseOut.bind(this);
	}

	mouseOver(id) {
		this.setState({
			hovering: true,
		});
	}

	mouseOut(id) {
		this.setState({
			hovering: false,
		});
	}
	render() {
		//hovering prop will be whatever the prop name currently is

		return (
			<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
				{this.props.children(this.state.hovering)}
			</div>
		);
	}
}