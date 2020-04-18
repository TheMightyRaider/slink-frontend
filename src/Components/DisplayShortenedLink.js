import React from "react";
import "../app.css";

class DisplayShortenedLink extends React.Component {
  state = {
    copied: false,
  };

  copyLink = () => {
    const el = document.createElement("input");
    document.body.appendChild(el);
    el.value = this.props.link;
    el.select();
    var copiedLink = document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({
      copied: true,
    });
    return copiedLink;
  };

  render() {
    return (
      <div className="inputBox">
        <h3>
          <a href={this.props.link}>{this.props.link}</a>
          {"  "}{" "}
          <button onClick={this.copyLink} disabled={this.state.copied}>
            Copy
          </button>
        </h3>
        <button>View Analysis</button>
        <button onClick={this.props.updateReceivedLink}>Shorten Again</button>
      </div>
    );
  }
}

export default DisplayShortenedLink;
