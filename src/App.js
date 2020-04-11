import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";
import "./app.css";

class App extends React.Component {
  state = {
    value: "",
    receivedShortedLink: false,
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
      receivedShortedLink: true,
    });
  };

  fetchStoredLinks = () => {
    this.setState({
      storedLinks: [
        1,
        2,
        3,
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
          className={
            this.state.receivedShortedLink ? "hideInput" : "enableInput"
          }
        ></input>
        <button
          name="submit"
          onClick={this.submitTheLink}
          className={
            this.state.receivedShortedLink ? "hideInput" : "enableInput"
          }
        >
          Submit
        </button>
        <button
          name="getLinks"
          onClick={this.fetchStoredLinks}
          className={
            this.state.receivedShortedLink ? "hideInput" : "enableInput"
          }
        >
          Get Stored Links
        </button>
        {this.state.receivedShortedLink ? (
          <DisplayShortenedLink
            link={this.state.shortedLink}
            updateReceivedLink={() => {
              console.log("clicked");
              this.setState({ receivedShortedLink: false });
            }}
          />
        ) : null}

        {this.state.storedLinks.length > 0 ? (
          <DisplayStoredLinks links={this.state.storedLinks} />
        ) : null}
      </div>
    );
  }
}

export default App;
