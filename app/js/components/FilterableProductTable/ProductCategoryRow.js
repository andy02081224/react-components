import React from 'react';

class ProductCategoryRow extends React.Component {
	render() {
		return(
			<tr><th colSpan="2">Category:&nbsp;{this.props.category}</th></tr>
		);
	}
}

export default ProductCategoryRow;