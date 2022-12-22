import { render } from "@testing-library/react";
import App from "./App";
import { Search } from "./Search";
import { Button } from "./Button";
import { Sort } from "./Sort";
import { Table } from "./Table";

describe('App', () => {
	test('renders App without crashing', () => {
		const { asFragment } = render(<App />);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe('App.prototype.updateSearchTopStoriesState()', () => {
	test('sets state without errors', () => {
		var app = new App();
		app.state.results = {
			"react": { hits: [ { author: "Author", num_comments: "9", points: 100023 } ], page: 0 }
		};
		app.state.searchKey = "Test React";
		const newState = app.updateSearchTopStoriesState(
			[ { author: "Artyom", num_comments: "25", points: 2003 } ],
			2
		)(app.state);
		expect(newState).toEqual({
			results: {
				"react": { hits: [ { author: "Author", num_comments: "9", points: 100023 } ], page: 0 },
				"Test React": { hits: [ { author: "Artyom", num_comments: "25", points: 2003 } ], page: 2 },
			},
			isLoading: false
		});
	});
});

describe("Search", () => {
	it("renders Search without crashing", () => {
		const { asFragment } = render(
			<Search
				onChange={() => true}
				onSubmit={() => true}
			>
				Search
			</Search>);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("Button", () => {
	it("renders Button without crashing", () => {
		const { asFragment } = render(
			<Button
				onClick={() => true}
			>
				Give Me More
			</Button>);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("Sort", () => {
	it("renders Sort without crashing", () => {
		const { asFragment } = render(
			<Sort
				sortKey={"testSortKey1"}
				onSort={() => true}
				activeSortKey={"testSortKey2"}
			>
				Points
			</Sort>);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("Table", () => {
	const props = {
		list: [
			{
				title: "1",
				author: "1",
				num_comments: 1,
				points: 2,
				objectID: "y",
			},
			{
				title: "2",
				author: "2",
				num_comments: 1,
				points: 2,
				objectID: "z",
			},
		],
		onDismiss: () => true
	};
	it("renders Table without crashing", () => {
		const { asFragment } = render(<Table {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});
});