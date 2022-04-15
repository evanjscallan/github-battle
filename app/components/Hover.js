import * as React from "react";

//HIGHER-ORDER FUNCTION: function that returns another component

export default class Hover extends React.Component {
	state = {
		hovering: false,
	};

	mouseOver = () => this.setState({ hovering: true });
	mouseOut = () => this.setState({ hovering: false });

	render() {
		//hovering prop will be whatever the prop name currently is

		return (
			<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
				{this.props.children(this.state.hovering)}
			</div>
		);
	}
}
