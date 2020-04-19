import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import DisplayStoredLinks from "./Components/DisplayStoredLinks";
import Loader from "./Components/Loader";

import { getUserID } from "./helpers/utils";
import * as api from "./helpers/api";
import "./app.css";

// mode -> create / result / list

class App extends React.Component {
  state = {
    value: "",
    error: null,
    errorDetails: "",
    loading: false,
    receivedShortenedLink: false,
    displayStoredShortenedLink: false,
    shortedLink: "",
    storedLinks: [],
  };

  componentDidMount() {
    this.setState({
      userID: getUserID(),
    });
  }

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  resetLoading() {
    this.setState({
      loading: false,
    });
  }

  submitTheLink = async (e) => {
    if (
      !((e.which == "13" || e.type == "click") && this.state.value.length > 0)
    ) {
      return;
    }

    this.setState({
      loading: true,
    });

    await api
      .createLink({ url: this.state.value, user: this.state.userID })
      .then((response) => {
        this.setState({
          value: "",
          shortedLink: response.data.slink,
        });
      })
      .catch((e) => {
        if (e) {
          this.setState({
            errorDetails: e.data.error,
          });
        }
        this.setState({
          error: true,
          shortedLink: "",
        });
      });

    this.resetLoading();
  };

  fetchStoredLinks = async () => {
    this.setState({
      value: "",
      loading: true,
    });

    await api
      .getLinks({
        user: this.state.userID,
      })
      .then((response) => {
        this.setState({
          displayStoredShortenedLink: true,
          storedLinks: [...response.data],
        });
      })
      .catch((e) => {
        this.setState({
          error: true,
        });
      });

    this.resetLoading();
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

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

        {this.state.shortedLink ? (
          <DisplayShortenedLink
            link={this.state.shortedLink}
            updateReceivedLink={() => {
              this.setState({ error: false, shortedLink: "" });
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
