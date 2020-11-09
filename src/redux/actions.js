import { db, storage } from "../data/config";

export function getPostsDB() {
  return (dispatch) => {
    return db
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((post) => {
          posts.push(post.data());
        });
        dispatch(getPosts(posts));
      })
      .catch((err) => console.log(err));
  };
}

export function uploadPhotoDB(post) {
  return (dispatch) => {
    const file = post.imageLink;
    const storageRef = storage.ref(file.name);
    storageRef.put(file).then(async () => {
      post.imageLink = await storageRef.getDownloadURL();
      console.log(post);

      dispatch(addPhotoDB(post));
    });
  };
}

export function addPhotoDB(post) {
  return (dispatch) => {
    return db
      .collection("posts")
      .doc(String(post.id))
      .set(post)
      .then(() => {
        dispatch(addPhoto(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removePhotoDB(index) {
  return (dispatch) => {
    return db
      .collection("posts")
      .doc(String(index))
      .delete()
      .then(() => {
        db.collection("comments").doc(String(index)).delete();
        dispatch(removePhoto(index));
      })
      .catch((err) => console.log(err));
  };
}
export function addCommentDB(id, comment) {
  return (dispatch) => {
    const docRef = db.collection("comments").doc(String(id));
    docRef
      .get()
      .then(function (doc) {
        let comments = [comment];
        if (doc.exists) {
          comments = [...doc.data()["value"], comment];
        }
        docRef.set({ value: comments });
        dispatch(addComment(id, comment));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export function getCommentsDB() {
  return (dispatch) => {
    return db
      .collection("comments")
      .get()
      .then((querySnapshot) => {
        let comments = {};
        querySnapshot.forEach((post) => {
          comments[post.id] = post.data()["value"];
        });
        dispatch(getComments(comments));
      })
      .catch((err) => console.log(err));
  };
}

export function getPosts(posts) {
  return {
    type: "GET_POSTS",
    posts,
  };
}

export function getComments(comments) {
  return {
    type: "GET_COMMENTS",
    comments,
  };
}

export function addPhoto(post) {
  return {
    type: "ADD_PHOTO",
    post,
  };
}

export function removePhoto(index) {
  return {
    type: "REMOVE_PHOTO",
    index,
  };
}

export function addComment(id, comment) {
  return {
    type: "ADD_COMMENT",
    id,
    comment,
  };
}
