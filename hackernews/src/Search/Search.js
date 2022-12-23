import { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
	componentDidMount() {
		if (this.input) {
			this.input.focus();
		}
	}

	render() {
		const {
			value,
			onChange,
			onSubmit,
			children
		} = this.props;

		return (
			<form onSubmit={onSubmit}>
				<p>{children}</p>
				<input
					type="text"
					value={value}
					onChange={onChange}
					ref={el => this.input = el}
				/>
				<button type="submit">Search</button>
			</form>
		);
	}
}

Search.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};