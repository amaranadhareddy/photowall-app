import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Photowall from "./components/Photowall";
import AddPhoto from "./components/AddPhoto";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import { withRouter } from "react-router-dom";
import PhotoDetail from "./components/PhotoDetail";

class App extends Component {
  componentDidMount() {
    this.props.getPostsDB().then(() => {
      this.setState({ loading: false });
    });
    this.props.getCommentsDB();
  }
  state = { loading: true };
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Photowall {...this.props} />} />
          <Route
            exact
            path="/add"
            render={() => (
              <AddPhoto addPhoto={this.props.addPhoto} {...this.props} />
            )}
          />
          <Route
            exact
            path="/detail/:id"
            render={(params) => (
              <PhotoDetail
                loading={this.state.loading}
                {...this.props}
                {...params}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    posts: store.posts,
    comments: store.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
