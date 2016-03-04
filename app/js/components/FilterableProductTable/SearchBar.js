import React from 'react';

class SearchBar extends React.Component {
	render() {
		return (
			<form className={this.props.className + '__search-bar'}>
				<input type="text" placeholder=" Search..." value={this.props.filterText} onChange={this.handleChange.bind(this)} ref="filterTextInput" />
				<p  className={this.props.className + '__search-bar-options'}>
					<label><input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleChange.bind(this)} ref="inStockOnlyInput" />&nbsp;Only show products in stock</label>
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