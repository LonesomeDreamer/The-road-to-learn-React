import { Component } from "react";
import { Button } from "../Button";
import { Sort } from "../Sort";
import PropTypes from "prop-types";
import { sortBy } from "lodash";

export class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortKey: 'NONE',
			isSortReverse: false
		}

		this.sorts = {
			NONE: list => list,
			TITLE: list => sortBy(list, 'title'),
			AUTHOR: list => sortBy(list, 'author'),
			COMMENTS: list => sortBy(list, 'num_comments').reverse(),
			POINTS: list => sortBy(list, 'points').reverse(),
		};
	}

	onSortUpdate = (sortKey) => (prevState) => {
		const isSortReverse = prevState.sortKey === sortKey && !prevState.isSortReverse;
		return { sortKey, isSortReverse };
	}

	onSort = (sortKey) => {
		this.setState(this.onSortUpdate(sortKey));
	}

	render() {
		const { list, onDismiss } = this.props;
		const { sortKey, isSortReverse } = this.state;
		const sortedList = isSortReverse ? this.sorts[sortKey](list).reverse() : this.sorts[sortKey](list);
		return (
			<div className="table">
				<div className="table-header">
					<span className="span-title">
						<Sort sortKey={"TITLE"} isSortReverse={isSortReverse} onSort={this.onSort} activeSortKey={sortKey}>
							Title
						</Sort>
					</span>
					<span className="span-author">
						<Sort sortKey={"AUTHOR"} isSortReverse={isSortReverse} onSort={this.onSort} activeSortKey={sortKey}>
							Author
						</Sort>
					</span>
					<span className="span-comments">
						<Sort sortKey={"COMMENTS"} isSortReverse={isSortReverse} onSort={this.onSort} activeSortKey={sortKey}>
							Comments
						</Sort>
					</span>
					<span className="span-points">
						<Sort sortKey={"POINTS"} isSortReverse={isSortReverse} onSort={this.onSort} activeSortKey={sortKey}>
							Points
						</Sort>
					</span>
					<span className="span-archive">Archive</span>
				</div>
				{sortedList.map((item) => {
					return (
						<div key={item.objectID} className="table-row">
							<span className="span-title">
								<a href={item.url}>{item.title}</a>
							</span>
							<span className="span-author">{item.author}</span>
							<span className="span-comments">{item.num_comments}</span>
							<span className="span-points">{item.points}</span>
							<span className="span-archive">
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