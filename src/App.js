import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";

class App extends React.Component {
  state = {
    value: "",
    shortedLink: "",
    storedLinks: [],
  };

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  submitTheLink = (e) => {
    this.setState({
      shortedLink: "gotit",
    });
  };

  fetchStoredLinks = () => {
    this.setState({
      storedLinks: [
        /*Gets Items from the API*/
      ],
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.updateValue}
        ></input>
        <button name="submit" onClick={this.submitTheLink}>
          Submit
        </button>
        <button name="getLinks" onClick={this.fetchStoredLinks}>
          Get Stored Links
        </button>
        {this.state.shortedLink.length > 0 ? (
          <DisplayStoredLinks links={this.state.shortedLink} />
        ) : null}
        <DisplayShortenedLink link={this.state.shortedLink} />
      </div>
    );
  }
}

export default App;
