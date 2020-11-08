import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Photo = (props) => {
  const { post, comments } = props;
  return (
    <div className="figure">
      <Link to={`/detail/${post.id}`}>
        <img className="photo" src={post.imageLink} alt={post.description} />
      </Link>
      <p>{post.description}</p>
      <div className="button-container">
        <button
          onClick={() => {
            props.removePhotoDB(post.id);
            props.history.push("/");
          }}
        >
          Delete
        </button>
        <Link className="button" to={`/detail/${post.id}`}>
          <div className="comment-count">
            <div className="speech-bubble"> </div>
            {comments[post.id] ? comments[post.id].length : 0}
          </div>
        </Link>
      </div>
    </div>
  );
};

Photo.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Photo;
