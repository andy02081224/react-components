import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import './FilterableProductTable.scss';

class FilterableProductTable extends React.Component {
	constructor() {
		super();

		this.state = {
			filterText: '',
			inStockOnly: false
		};
	}

	render() {
		return (
			<div className="filterable-table">
				<SearchBar className="filterable-table" filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput.bind(this)} />
				<ProductTable filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} products={this.props.products}/>
			</div>
		);
	}

	handleUserInput(filterText, inStockOnly) {
		this.setState({
			filterText: filterText,
			inStockOnly: inStockOnly
		});
	}
}

export default FilterableProductTable;