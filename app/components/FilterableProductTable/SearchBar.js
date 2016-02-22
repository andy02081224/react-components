import React from 'react';

class SearchBar extends React.Component {
	render() {
		return (
			<form>
				<input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleChange.bind(this)} ref="filterTextInput" />
				<p>
					<input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleChange.bind(this)} ref="inStockOnlyInput" />
					Only show products in stock
				</p>
			</form>
		);
	}

	handleChange() {
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked
		);
	}
}

export default SearchBar;