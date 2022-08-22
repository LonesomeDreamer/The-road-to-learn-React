import PropTypes from 'prop-types';

export const Search = ({ value, onChange, onSubmit, children }) =>
	(<form onSubmit={onSubmit}>
		{children}
		<input
			type="text"
			value={value}
			onChange={onChange}
		/>
		<button type="submit">
			Search
		</button>
	</form>)

Search.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};