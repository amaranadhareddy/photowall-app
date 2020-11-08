import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Photo from "./Photo";

const PhotoWall = (props) => {
  
  return (
    <div>
      <Link className="addIcon" to="/add">
        {" "}
      </Link>
      <div className="photoGrid">
        {props.posts
          .sort((a, b) => b.id - a.id)
          .map((post, index) => (
            <Photo post={post} key={post.id} {...props} />
          ))}
      </div>
    </div>
  );
};

PhotoWall.propTypes = {
  posts: PropTypes.array.isRequired,
  
};
export default PhotoWall;
