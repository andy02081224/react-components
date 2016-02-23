import React from 'react';
import FilterableProductTable from '../FilterableProductTable';

import _ from 'lodash';
import $ from 'jquery';
import fullpage from 'fullpage.js';

import '../../../node_modules/fullpage.js/jquery.fullPage.scss';


class FullPage extends React.Component {
	// Demo data
	static defaultProps = {
		filterableProductTableData:  [
		  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
		  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
		  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
		  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
		  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
		  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
		]
	};

	render() {
		return	(
			<div id="fullpage">
	    	<div className="section section-intro"><h1>Homepage</h1></div>
	    	<div className="section">

       			<div className="ribbon-green"><span>Filterable Table</span></div>

	    		<FilterableProductTable products={this.props.filterableProductTableData} />
	    	</div>
	    	<div className="section">
	    	  <div className="ribbon-wrapper-green">
       			<div className="ribbon-green"><span>NEWS</span></div>
       		</div>
	    		<div className="slide">Slide 1</div>
    			<div className="slide">Slide 2</div>
    			<div className="slide">Slide 3</div>
    		</div>
	    	<div className="section">Some section2</div>
			</div>
		);
	}

	componentDidMount() {
		let sectionColors = {
			wetAsphalt: '#34495e',
			peterRiver: '#3498db',
			carrot: '#e67e22',
			greenSea: '#16a085'
		};

		$('#fullpage').fullpage({
			sectionsColor: _.values(sectionColors),
			verticalCentered: false
		});
	}

	shouldComponentUpdate() {
		return false;
	}
}

export default FullPage;