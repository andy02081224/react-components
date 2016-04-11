import React from 'react';

import './SearchBox.scss';

class SearchBox extends React.Component {
	static defaultProps = {
		availableEngines: {
			google: 'https://www.google.com/search',
			bing: 'https://www.bing.com/search',
			yahoo: 'https://tw.search.yahoo.com/search',
			wiki: 'https://zh.wikipedia.org/wiki/',
			duckduckgo: 'https://duckduckgo.com/'
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			defaultSearchEngine: this.getDefaultSearchEngine()
		};

		this.handleSearchEngineChange = this.handleSearchEngineChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	capitalizeFirstLetter(str) {
		return str.replace(/^(\w)/, (firstLetter) => firstLetter.toUpperCase());
	}

	getDefaultSearchEngine() {
		let defaultSearchEngine = localStorage.getItem('searchBoxDefaultEngine');

		return defaultSearchEngine ? defaultSearchEngine : 'google';
	}

	handleSearchEngineChange(event) {
		let selector = event.target;
		let selectedEngine = selector.options[selector.selectedIndex].text.toLowerCase();

		localStorage.setItem('searchBoxDefaultEngine', selectedEngine);

		this.setState({
			defaultSearchEngine: selectedEngine
		});
	}

	handleSubmit(event) {
		let queryEngine = event.target.getAttribute('action');
		let isWikipedia = /wikipedia.org\/wiki\//.test(queryEngine);

		if (isWikipedia) {
			event.preventDefault();

			let queryText = this.refs.searchBoxTextInput.value;
			let wikiQuery = `${this.props.availableEngines.wiki}${queryText}`;

			window.open(wikiQuery, '_blank', null);
		}
	}

	renderEngineOptions() {
		let engineOptions = Object.keys(this.props.availableEngines).map((engineName) => {
			return (
				<option key={this.props.availableEngines[engineName]} value={this.props.availableEngines[engineName]}>
					{this.capitalizeFirstLetter(engineName)}
				</option>
			);
		});

		return engineOptions;
	}

	render() {
		let activeSearchEngine = this.props.availableEngines[this.state.defaultSearchEngine];

		return (
			<div className="search-box">
				<form method="get" target="_blank" action={activeSearchEngine} onSubmit={this.handleSubmit}>
					<select className="search-box__engine-selector" value={activeSearchEngine} onChange={this.handleSearchEngineChange}>
						<option disabled>Search engine</option>
						{this.renderEngineOptions()}
					</select>
					<input type="text" className="search-box__query-input" name="q" ref="searchBoxTextInput" />
					<input type="submit" className="search-box__submit-btn" value="Search" />
				</form>
			</div>
		);
	}	
}

export default SearchBox;