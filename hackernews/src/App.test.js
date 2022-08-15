import { render } from '@testing-library/react';
import App, { Search, Button, Table } from './App';

describe('App', () => {
	test('renders App without crashing', () => {
		const { asFragment } = render(<App />);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("Search", () => {
	it("renders Search crashing", () => {
		const { asFragment } = render(<Search>Search</Search>);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("Button", () => {
	it("renders Button without crashing", () => {
		const { asFragment } = render(<Button>Give Me More</Button>);
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
	};
	it("renders Table without crashing", () => {
		const { asFragment } = render(<Table {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});
});