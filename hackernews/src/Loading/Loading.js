export const Loading = () => 
	(<div className='loading'>
		<div className='spinner'></div>
		<div>Loading..</div>
	</div>)

export const withLoading = (Component) => ({ isLoading, ...rest }) =>
	isLoading ?
	<Loading/> :
	<Component { ...rest } />