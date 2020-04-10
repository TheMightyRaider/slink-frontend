import React from "react";

class DisplayShortenedLink extends React.Component {
  render() {
    return <h3>{this.props.link}</h3>;
  }
}

export default DisplayShortenedLink;
