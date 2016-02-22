import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import './FilterableProductTable.scss';

class FilterableProductTable extends React.Component {
	static defaultProps = {
		products:  [
		  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
		  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
		  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
		  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
		  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
		  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
		]
	};

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