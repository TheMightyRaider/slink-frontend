import React from "react";

class Link extends React.Component {
  state = {
    url: "http://slink-staging.herokuapp.com/" + this.props.hash,
  };
  render() {
    return (
      <tr>
        <td>{this.props.originalUrl}</td>
        <td>
          <a href={this.state.url}>{this.state.url}</a>
        </td>
      </tr>
    );
  }
}

export default Link;
