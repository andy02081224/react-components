import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import './FilterableProductTable.scss';

class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			filterText: '',
			inStockOnly: false
		};
	}

	componentDidMount() {
		fetch(this.props.url)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				this.setState({ data: json });
			})
			.catch((e) => {
				console.log('Parse json failed:', e);
			});
	}

	handleUserInput(filterText, inStockOnly) {
		this.setState({
			filterText: filterText,
			inStockOnly: inStockOnly
		});
	}

	render() {
		return (
			<div className="filterable-table">
				<SearchBar className="filterable-table" filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput.bind(this)} />
				<ProductTable filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} products={this.state.data}/>
			</div>
		);
	}

}

export default FilterableProductTable;