import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HPP,
} from "./constants";
import { Button } from "./Button";
import { Table } from "./Table";
import { Search } from './Search';
import { withLoading } from './Loading';
const ButtonWithLoading = withLoading(Button);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: null,
			isLoading: false
		}
	}

	needsToSearchTopStories = (searchTerm) => {
		return !this.state.results[searchTerm];
	}

	fetchSearchTopStories = (searchTerm, page = 0) => {
		this.setState({ isLoading: true });
		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(result => this.setSearchTopStories(result.data))
		.catch(error => this.setState( { error } ));
	}

	setSearchTopStories = (result) => {
		const { hits, page } = result;

		this.setState((prevState) => {
			const { searchKey, results } = prevState;

			// error handling for duplicate or outdated API requests
			if (results && results[searchKey] && results[searchKey].page >= page) {
				return;
			}

			const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

			const updatedHits = [
				...oldHits,
				...hits
			];

			return {
				results: {
					...results,
					[searchKey]: { hits: updatedHits, page }
				},
				isLoading: false
			}
		});
	}

	onSearchChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	}

	onSearchSubmit = (event) => {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		if (this.needsToSearchTopStories(searchTerm)) {
			this.fetchSearchTopStories(searchTerm);
		}
		event.preventDefault();
	}

	onDismiss = (id) => {
		const { searchKey, results } = this.state;
		const { hits, page } = results[searchKey];
		const updatedHits = hits.filter(item => item.objectID !== id);
		this.setState({
			results: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			}
		});
	}

	componentDidMount = () => {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { searchTerm, results, searchKey, error, isLoading } = this.state;
		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = (results && results[searchKey] && results[searchKey].hits) || [];

		return (
			<div className="page">
				<div className="interactions">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Search term
					</Search>
				</div>
				{ error ?
					<div className="interactions">
						<p>Something went wrong.</p>
					</div> :
					(
						<>
							<Table
								list={list}
								onDismiss={this.onDismiss}
							/>
							<div className="interactions">
								<ButtonWithLoading
									isLoading={isLoading}
									onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
								>
									More
								</ButtonWithLoading>
							</div>
						</>
					)
				}
			</div>
			);
	}
}

export default App;

