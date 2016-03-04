import React from 'react';

class ProductRow extends React.Component {
	render() {
		let name;

		if (this.props.product.stocked) {
			name = this.props.product.name;
		}
		else {
			name = <span style={{color: 'red'}}>{this.props.product.name}</span>;
		}

		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
}

export default ProductRow;