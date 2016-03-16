import React from 'react';
import Ribbon from '../components/Ribbon';
import IntroHeader from '../components/IntroHeader';
import {SectionWrapper, ContentWrapper} from '../components/Layout';

import FilterableProductTable from '../components/FilterableProductTable';
import Login from '../components/Login';
import SiteHeader from '../components/SiteHeader';

import _ from 'lodash';
import $ from 'jquery';
import fullpage from 'fullpage.js';

import '../../../node_modules/fullpage.js/jquery.fullPage.scss';

import siteLogoPath from '../../img/site-logo.png';


class DetailPage extends React.Component {
	// Demo data
	static defaultProps = {
		filterableProductTableData:  [
		  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
		  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
		  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
		  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
		  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
		  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
		],
		siteLogoPath: siteLogoPath,
		navItems: [{
			name: 'Item1',
			link: '#'
		}, {
			name: 'Item2',
			link: '#'
		}, {
			name: 'Item3',
			link: '#'
		}, {
			name: 'Item4',
			link: '#'
		}, {
			name: 'Item5',
			link: '#'
		}]
	};

	render() {
		return	(
			<div id="fullpage">
	    	<div className="section">
	    		<IntroHeader title="學習如何撰寫React元件" subtitle="Learning how to build react components" />
	    	</div>
	    	<div className="section">
	    		<Ribbon title="Warming up - Official tutorial" color="green" />
	    		<ContentWrapper verticalCentered="true">
		    		<FilterableProductTable products={this.props.filterableProductTableData} />
	    		</ContentWrapper>
	    	</div>
	    	<div className="section">
	    		<SectionWrapper fsImagePath="../../../img/login-cover-4.jpg">
		    		<Ribbon title="Proj1 - Login (UI only)" color="green" />
		    		<ContentWrapper verticalCentered="true">
		    			<Login />
		    		</ContentWrapper>
	    		</SectionWrapper>
	    	</div>
	    	<div className="section">
	    		<Ribbon title="Proj2 - Responsive Header" color="green" />
	    		<ContentWrapper>
		    		<SiteHeader siteLogoPath={this.props.siteLogoPath} siteTitle="React Components" navItems={this.props.navItems} />
	    		</ContentWrapper>
	    	</div>
	    	<div className="section">
	    		<Ribbon title="Proj3 - Login (Basic flow)" color="green" />
	    	</div>
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

export default DetailPage;