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

  fileTypes = ["image/png", "image/jpeg", "image/jpg"];
  render() {
    return (
      <div className="form">
        <form onSubmit={this.postAdded}>
          <select
            name="uploadType"
            className="dropdown"
            onChange={this.handleChange}
          >
            <option>Select Upload type</option>
            <option value="upload">Upload</option>
            <option value="link">Image link</option>
          </select>
          <input type="file" name="file" hidden />
          <input type="text" placeholder="Link" name="link" hidden />
          <input type="text" placeholder="Desciption" name="description" />
          <button> Post </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    let linkUI = document.querySelector("input[name='link']");
    let fileUI = document.querySelector("input[name='file']");
    if (e.target.value === "link") {
      linkUI.style.display = "block";
      fileUI.style.display = "none";
    } else if (e.target.value === "upload") {
      linkUI.style.display = "none";
      fileUI.style.display = "block";
    } else {
      linkUI.style.display = "none";
      fileUI.style.display = "none";
    }
  }

  postAdded(e) {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const uploadType = e.target.elements.uploadType.value;
    let imageLink;
    let error = "please fill all the fields";
    if (uploadType === "link") imageLink = e.target.elements.link.value;
    else if (uploadType === "upload") {
      console.log();
      const file = document.querySelector("input[name='file']").files[0];
      if (file && this.fileTypes.includes(file.type)) {
        imageLink = file;
      } else {
        error = "please select only image files";
      }
    }

    const post = {
      id: Number(new Date()),
      description: description,
      imageLink: imageLink,
    };

    if (description && imageLink) {
      if (uploadType === "link") this.props.addPhotoDB(post);
      else if (uploadType === "upload") {
        this.props.uploadPhotoDB(post);
      }

      this.props.history.push("/");
    } else {
      alert(error);
    }
  }
}

export default AddPhoto;
