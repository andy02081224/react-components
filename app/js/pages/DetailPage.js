import React from 'react';
import Ribbon from '../components/Ribbon';
import IntroHeader from '../components/IntroHeader';
import {SectionWrapper, ContentWrapper} from '../components/Layout';

// Demo components
import FilterableProductTable from '../components/FilterableProductTable';
import SiteHeader from '../components/SiteHeader';
import Login from '../components/Login';
import Weather from '../components/Weather';
import SearchBox from '../components/SearchBox';

import _ from 'lodash';
import $ from 'jquery';
import fullpage from 'fullpage.js';

// styles
import '../../../node_modules/fullpage.js/jquery.fullPage.scss';

// Image path
import loginBgImagePath from '../../img/login-cover-4.jpg';
import siteLogoPath from '../../img/site-logo.png';


class DetailPage extends React.Component {
	// Demo data
	static defaultProps = {
		siteLogoPath: siteLogoPath,
		navItems: [{
			id: 1,
			name: 'Item1',
			link: '#'
		}, {
			id: 2,
			name: 'Item2',
			link: '#'
		}, {
			id: 3,
			name: 'Item3',
			link: '#'
		}, {
			id: 4,
			name: 'Item4',
			link: '#'
		}, {
			id: 5,
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
		    		<FilterableProductTable url="/data/productData.json" />
	    		</ContentWrapper>
	    	</div>
	    	<div className="section">
	    		<Ribbon title="Proj1 - Responsive Header" color="green" />
	    		<ContentWrapper>
		    		<SiteHeader siteLogoPath={this.props.siteLogoPath} siteTitle="React Components" navItems={this.props.navItems} />
	    		</ContentWrapper>
	    	</div>
	    	<div className="section">
	    		<SectionWrapper fsImagePath={ loginBgImagePath }>
		    		<Ribbon title="Proj2 - Login (Basic flow)" color="green" />
		    		<ContentWrapper verticalCentered="true">
		    			<Login />
		    		</ContentWrapper>
	    		</SectionWrapper>
	    	</div>
	    	<div className="section">
	    	  <SectionWrapper fsImagePath={ loginBgImagePath }>
		    		<Ribbon title="Proj3 - Weather Widget" color="green" />
		    		<ContentWrapper verticalCentered="true">
			    		<Weather />
		    		</ContentWrapper>
	    		</SectionWrapper>
	    	</div>
	    	<div className="section">
	    		<Ribbon title="Proj4 - Search box" color="green" />
	    		<ContentWrapper verticalCentered="true">
		    		<SearchBox />
	    		</ContentWrapper>
	    	</div>
			</div>
		);
	}

	componentDidMount() {
		let sectionColors = [];
		let sectionColorMap = {
			wetAsphalt: '#34495e',
			peterRiver: '#3498db',
			carrot: '#e67e22',
			greenSea: '#16a085',
			midnightBlue: '#2c3e50'
		};

		let numOfSections = document.getElementsByClassName('section').length;

		for (let i = 0; i < numOfSections; i++) {
			let sectionColorSet = _.values(sectionColorMap);
			let index = i % sectionColorSet.length;
			
			sectionColors.push(sectionColorSet[index]);
		}

		$('#fullpage').fullpage({
			sectionsColor: sectionColors,
			verticalCentered: false
		});
	}

	shouldComponentUpdate() {
		return false;
	}
}

export default DetailPage;