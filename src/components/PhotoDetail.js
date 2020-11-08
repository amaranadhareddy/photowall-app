import React from "react";
import Photo from "./Photo";
import Comments from "./Comments";

const PhotoDetail = (props) => {
  const { match, posts } = props;
  const id = Number(match.params.id);
  const post = posts.find((post) => post.id === id);
  const comments = props.comments[id] || [];

  if (props.loading) {
    return <div className="loader">Loading...</div>;
  } else if (post) {
    return (
      <div className="single-photo">
        <Photo post={post} key={id} {...props} />
        <Comments
          id={id}
          addCommentDB={props.addCommentDB}
          comments={comments}
        />
      </div>
    );
    
  } else {
    return <div className="loader">No post found</div>;
  }
};

export default PhotoDetail;
