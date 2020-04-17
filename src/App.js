import React from "react";
import axios from "axios";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";
import "./app.css";

/* 

  Add keypress validation submit !

*/
class App extends React.Component {
  state = {
    value: "",
    error: null,
    errorDetails: "",
    loading: false,
    randomColor: null,
    receivedShortenedLink: false,
    displayStoredShortenedLink: false,
    shortedLink: "",
    storedLinks: [],
  };

  generateRandomColor(generate = true) {
    if (generate) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = "#" + randomColor;
      document.body.style.backgroundImage = "none";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
    }
  }

  componentDidMount() {
    let newUserId;
    let userID = parseInt(localStorage.getItem("ID"));
    if (!userID) {
      newUserId = Math.floor(new Date().getTime() / 1000);
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
    if (e.which == "13" || e.type == "click") {
      const randomColorValue = setInterval(this.generateRandomColor, 10);
      this.setState({
        loading: true,
      });

      const params = {
        url: this.state.value,
        user: this.state.userID,
      };

      await axios
        .put("https://slink-staging.herokuapp.com/api/links", params)
        .then((response) => {
          clearInterval(randomColorValue);
          this.generateRandomColor(false);
          this.setState({
            value: "",
            error: false,
            loading: false,
            receivedShortenedLink: true,
            displayStoredShortenedLink: false,
            shortedLink: response.data.data.slink,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              errorDetails: error.response.data.error,
            });
          }
          this.setState({
            error: true,
            loading: false,
            displayStoredShortenedLink: false, // Hiding the storedURL details, Happens  When the user has first requests storedURL and then request for a new shortenedURL.
          });
          clearInterval(randomColorValue);
          this.generateRandomColor(false);
        });
    }
  };

  fetchStoredLinks = async () => {
    const randomBackground = setInterval(this.generateRandomColor, 10);
    this.setState({
      value: "",
      loading: true,
    });
    const params = {
      user: this.state.userID,
    };
    await axios
      .get("http://slink-staging.herokuapp.com/api/links", { params })
      .then((response) => {
        clearInterval(randomBackground);
        this.generateRandomColor(false);
        this.setState({
          loading: false,
          displayStoredShortenedLink: true,
          storedLinks: [...response.data.data],
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: true,
        });
        clearInterval(randomBackground);
        this.generateRandomColor(false);
      });
  };

  render() {
    return (
      <div>
        <div
          className={
            !this.state.loading && this.state.displayStoredShortenedLink
              ? "afterStoredLinkIsDisplayed"
              : "hideInput"
          }
        >
          <h3>Shorten a New Link?</h3>
          <input
            type="text"
            value={this.state.value}
            onChange={this.updateValue}
          ></input>
          <button
            className={this.state.value ? "enableInput" : "hideInput"}
            name="submit"
            onClick={this.submitTheLink}
          >
            Submit
          </button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        {this.state.displayStoredShortenedLink && !this.state.loading ? (
          this.state.storedLinks.length > 0 ? (
            <DisplayStoredLinks
              links={this.state.storedLinks}
              id={this.state.userID}
            />
          ) : (
            <p class="inputBox">No history of ShortenedLinks</p>
          )
        ) : null}
        <div
          className={
            this.state.error ||
            this.state.displayStoredShortenedLink ||
            this.state.receivedShortenedLink ||
            this.state.loading
              ? "hideInput"
              : "inputBox"
          }
        >
          <h1>SLINK!</h1>
          <input
            placeholder="Enter your URL"
            type="text"
            value={this.state.value}
            onChange={this.updateValue}
            onKeyPress={this.submitTheLink}
          ></input>
          <button
            className={this.state.value ? "enableInput" : "hideInput"}
            name="submit"
            onClick={this.submitTheLink}
            disabled={!this.state.value}
          >
            Submit
          </button>
          <br></br>
          <br></br>
          <span>Want your previous shortened Links? </span>
          <button name="getLinks" onClick={this.fetchStoredLinks}>
            Click here
          </button>
        </div>

        <div className={this.state.error ? "displayError" : "hideInput"}>
          <h3>Sorry Bruh, {this.state.errorDetails} :(</h3>
          <button
            name="tryAgain"
            onClick={() => {
              this.setState({ value: "", error: false });
            }}
          >
            Try Again
          </button>
        </div>

        {this.state.receivedShortenedLink ? (
          <DisplayShortenedLink
            link={this.state.shortedLink}
            updateReceivedLink={() => {
              this.setState({ error: false, receivedShortenedLink: false });
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
