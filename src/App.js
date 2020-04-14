import React from "react";
import axios from "axios";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";
import "./app.css";

class App extends React.Component {
  state = {
    value: "",
    randomColor: null,
    receivedShortedLink: false,
    displayStoredShortenedLink: false,
    shortedLink: "",
    storedLinks: [],
  };

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms * 1000);
    });
  }

  generateRandomColor(generate = true) {
    if (generate) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = "#" + randomColor;
    } else {
      document.body.style.backgroundColor = "";
    }
  }

  componentDidMount() {
    let newUserId;
    let userID = parseInt(localStorage.getItem("ID"));
    if (!userID) {
      newUserId = new Date().getTime();
      localStorage.setItem("ID", newUserId);
    }
    this.setState({
      userID: newUserId || userID,
    });
  }

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  submitTheLink = async (e) => {
    const randomColorValue = setInterval(this.generateRandomColor, 10);

    const params = {
      url: this.state.value,
      user: 12345,
    };

    await axios
      .put(
        "https://cors-anywhere.herokuapp.com/http://slink-staging.herokuapp.com/api/links",
        params
      )
      .then((response) => {
        clearInterval(randomColorValue);
        this.generateRandomColor(false);
        this.setState({
          value: "",
          receivedShortedLink: true,
          displayStoredShortenedLink: false,
          shortedLink: [...response.data.data.slink],
        });
      })
      .catch((err) => {
        this.setState({
          receivedShortedLink: false,
        });
        clearInterval(randomColorValue);
        this.generateRandomColor(false);
        console.log(err);
      });
  };

  fetchStoredLinks = async () => {
    const randomBackground = setInterval(this.generateRandomColor, 10);

    const params = {
      user: 12345,
    };
    await axios
      .get("http://slink-staging.herokuapp.com/api/links", { params })
      .then((response) => {
        clearInterval(randomBackground);
        this.generateRandomColor(false);
        this.setState({
          displayStoredShortenedLink: true,
          storedLinks: [...response.data.data],
        });
      })
      .catch((err) => {
        clearInterval(randomBackground);
        this.generateRandomColor(false);
        console.log(err);
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
        <br></br>
        <br></br>
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
          <DisplayStoredLinks
            links={this.state.storedLinks}
            id={this.state.userID}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
