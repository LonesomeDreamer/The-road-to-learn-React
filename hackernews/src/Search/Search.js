export const Search = ({ value, onChange, onSubmit, children }) =>
	(<form onSubmit={onSubmit}>
		{children}
		<input
			type="text"
			value={value}
			onChange={onChange}
		/>
		<button type="submit">
			{children}
		</button>
	</form>)