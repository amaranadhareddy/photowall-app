import React, { Component } from "react";
import PropTypes from "prop-types";

class AddPhoto extends Component {
  constructor() {
    super();
    this.postAdded = this.postAdded.bind(this);
  }

  static propTypes = {
    addPhoto: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div className="form">
        <form onSubmit={this.postAdded}>
          <input type="text" placeholder="Link" name="link" />
          <input type="text" placeholder="Desciption" name="description" />
          <button> Post </button>
        </form>
      </div>
    );
  }

  postAdded(e) {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const imageLink = e.target.elements.link.value;

    const post = {
      id: Number(new Date()),
      description: description,
      imageLink: imageLink,
    };

    if (description && imageLink) {
      this.props.addPhotoDB(post);
      this.props.history.push("/");
    }
  }
}

export default AddPhoto;
