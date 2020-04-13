import React from "react";
import axios from "axios";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";
import "./app.css";

class App extends React.Component {
  state = {
    value: "",
    receivedShortedLink: false,
    displayStoredShortenedLink: false,
    shortedLink: "",
    storedLinks: [],
  };

  componentDidMount() {
    let userID = parseInt(localStorage.getItem("ID"));
    if (userID) {
      this.setState({
        userID,
      });
    } else {
      let newUserId = new Date().getTime();
      localStorage.setItem("ID", newUserId);
    }
  }

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  submitTheLink = async (e) => {
    const params = {
      url: this.state.value,
      user: 12345,
    };

    const shortenLink = await axios.put(
      "https://cors-anywhere.herokuapp.com/http://slink-staging.herokuapp.com/api/links",
      params
    );

    this.setState({
      receivedShortedLink: true,
      displayStoredShortenedLink: false,
      shortedLink: shortenLink.data.data.slink,
    });
  };

  fetchStoredLinks = () => {
    this.setState({
      displayStoredShortenedLink: true,
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

        {this.state.storedLinks.length > 0 &&
        this.state.displayStoredShortenedLink ? (
          <DisplayStoredLinks links={this.state.storedLinks} />
        ) : null}
      </div>
    );
  }
}

export default App;
