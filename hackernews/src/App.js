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

	updateSearchTopStoriesState = (hits, page) => (prevState) => {
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
	}

	setSearchTopStories = (result) => {
		const { hits, page } = result;

		this.setState(this.updateSearchTopStoriesState(hits, page));
	}

	onSearchChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	}

	updateSearchKey = (prevState) => ({ searchKey: prevState.searchTerm })

	onSearchSubmit = (event) => {
		this.setState(this.updateSearchKey, () => {
			const { searchTerm } = this.state;
			if (this.needsToSearchTopStories(searchTerm)) {
				this.fetchSearchTopStories(searchTerm);
			}
			event.preventDefault();
		});
	}

	updateResultsOnDismiss = (id) => (prevState) => {
		const { searchKey, results } = prevState;
		const { hits, page } = results[searchKey];
		const updatedHits = hits.filter(item => item.objectID !== id);

		return {
			results: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			}
		}
	}

	onDismiss = (id) => {
		this.setState(this.updateResultsOnDismiss(id));
	}

	componentDidMount = () => {
		this.setState(this.updateSearchKey, () => {
			this.fetchSearchTopStories(this.state.searchTerm)
		});
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
						What do you want to find?
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

