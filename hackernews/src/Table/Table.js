import { Component } from "react";
import { Button } from "../Button";
import { Sort } from "../Sort";
import PropTypes from 'prop-types';
import { sortBy } from "lodash";

const largeColumn = {
	width: '40%',
};
const midColumn = {
	width: '30%',
};
const smallColumn = {
	width: '10%',
}

export class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortKey: 'NONE'
		}

		this.sorts = {
			NONE: list => list,
			TITLE: list => sortBy(list, 'title'),
			AUTHOR: list => sortBy(list, 'author'),
			COMMENTS: list => sortBy(list, 'num_comments').reverse(),
			POINTS: list => sortBy(list, 'points').reverse(),
		};
	}

	onSort = (sortKey) => {
		this.setState({ sortKey });
	}

	render() {
		const { list, onDismiss } = this.props;
		const { sortKey } = this.state;
		return (
			<div className="table">
				<div className="table-header">
					<span style={largeColumn}>
						<Sort sortKey={"TITLE"} onSort={this.onSort}>
							Title
						</Sort>
					</span>
					<span style={midColumn}>
						<Sort sortKey={"AUTHOR"} onSort={this.onSort}>
							Author
						</Sort>
					</span>
					<span style={smallColumn}>
						<Sort sortKey={"COMMENTS"} onSort={this.onSort}>
							Comments
						</Sort>
					</span>
					<span style={smallColumn}>
						<Sort sortKey={"POINTS"} onSort={this.onSort}>
							Points
						</Sort>
					</span>
					<span style={smallColumn}>Archive</span>
				</div>
				{this.sorts[sortKey](list).map((item) => {
					return (
						<div key={item.objectID} className="table-row">
							<span style={largeColumn}>
								<a href={item.url}>{item.title}</a>
							</span>
							<span style={midColumn}>{item.author}</span>
							<span style={smallColumn}>{item.num_comments}</span>
							<span style={smallColumn}>{item.points}</span>
							<span style={smallColumn}>
								<Button
									onClick={() => onDismiss(item.objectID)}
									className="button-inline"
								>
									Dismiss
								</Button>
							</span>
						</div>
					);
				})}
			</div>
		);
	}
}

Table.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			objectID: PropTypes.string.isRequired,
			author: PropTypes.string,
			url: PropTypes.string,
			num_comments: PropTypes.number,
			points: PropTypes.number,
		})
	).isRequired,
	onDismiss: PropTypes.func.isRequired
};