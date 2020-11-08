import React, { Component } from "react";

class Comments extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="comment">
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add Comment" name="comment" />
          <input type="submit" hidden />
        </form>

        {this.props.comments
          .slice(0)
          .reverse()
          .map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    this.props.addCommentDB(this.props.id, comment);
    e.target.elements.comment.value = "";
  }
}

export default Comments;
