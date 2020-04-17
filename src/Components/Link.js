import React from "react";

class Link extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.originalUrl}</td>
        <td>
          <a href={"http://slink-staging.herokuapp.com/" + this.props.hash}>
            {"http://slink-staging.herokuapp.com/" + this.props.hash}
          </a>
        </td>
      </tr>
    );
  }
}

export default Link;
