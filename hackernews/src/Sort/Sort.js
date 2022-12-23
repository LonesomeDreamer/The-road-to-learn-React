import { Button } from "../Button";
import classNames from "classnames";
import PropTypes from "prop-types";

export const Sort = ({ sortKey, isSortReverse, onSort, activeSortKey, children }) => {
	const sortClass = classNames(
		"button-inline",
		{ "button-active": sortKey === activeSortKey }
	);

	const imageHolderClass = classNames(
		"imageHolder",
		{ "reverse": isSortReverse }
	)

	return (
	<Button onClick={() => onSort(sortKey)} className={sortClass}>
		{sortClass.includes("button-active") && <div className={imageHolderClass}></div>}
		{children}
	</Button>
	)
};

Sort.propTypes = {
	sortKey: PropTypes.string.isRequired,
	onSort: PropTypes.func.isRequired,
	activeSortKey: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};
