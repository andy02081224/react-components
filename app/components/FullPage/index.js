import React from 'react';
import CommentBox from '../CommentBox/index';

import _ from 'lodash';
import $ from 'jquery';
import fullpage from 'fullpage.js';
import '../../../node_modules/fullpage.js/jquery.fullPage.scss';


class FullPage extends React.Component {
	render() {
		return	(
			<div id="fullpage">
	    	<div className="section"><CommentBox /></div>
	    	<div className="section">Some section1</div>
	    	<div className="section">
	    		<div className="slide"> Slide 1 </div>
    			<div className="slide"> Slide 2 </div>
    			<div className="slide"><CommentBox /></div>
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
			sectionsColor: _.values(sectionColors)
		});
	}

	shouldComponentUpdate() {
		return false;
	}
}

export default FullPage;