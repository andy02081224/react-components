import React from 'react';

class CommentBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			newCommentAuthor: '',
			newCommentText: ''
		};
	}

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<div className="comment-list">
					{this.renderComments()}
				</div>
				<div className="comment-form">
					<form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        		<input type="text" placeholder="Your name" value={this.state.newCommentAuthor} onChange={this.handleAuthorChange.bind(this)} />
        		<input type="text" placeholder="Say something..." value={this.state.newCommentText} onChange={this.handleTextChange.bind(this)} />
        		<input type="submit" value="Post" />
      		</form>
				</div>
			</div>
		);
	}

	renderComments() {
		let comments = this.state.comments.map((comment) => {
			return (
				<div className="comment" key={comment.id}>
					<h2 className="comment-author">{comment.author}</h2>
					{comment.text}
				</div>
			);
		});

		return comments;
	}

	handleAuthorChange(e) {
		this.setState({ 
			newCommentAuthor: e.target.value
		});
	}

	handleTextChange(e) {
		this.setState({ 
			newCommentText: e.target.value 
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		var author = this.state.newCommentAuthor.trim();
		var text = this.state.newCommentText.trim();

		if (!text || !author) {
			return;
		}

		var newComment = [{
			id: ++this.state.comments.length,
			author: author,
			text: text
		}];

		this.setState({
			comments: this.state.comments.concat(newComment)
		});

		this.setState({
			newCommentAuthor: '',
			newCommentText: ''
		});

	}

}

export default CommentBox;