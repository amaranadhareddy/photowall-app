import React, { Component } from "react";
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
      return (<div>
        
          <h1 className="heading">
            <Link to="/">PhotoWall</Link>
            </h1>
      </div>);
  }
}

export default Header;