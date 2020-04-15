import React from "react";
import "../app.css";

class DisplayShortenedLink extends React.Component {
  render() {
    return (
      <div className="inputBox">
        <h3>{this.props.link}</h3>
        <button>View Analysis</button>
        <button onClick={this.props.updateReceivedLink}>Shorten Again</button>
      </div>
    );
  }
}

export default DisplayShortenedLink;
