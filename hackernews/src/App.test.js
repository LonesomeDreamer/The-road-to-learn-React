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