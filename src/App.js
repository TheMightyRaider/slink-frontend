import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import CreateCard from "./Components/CreateCard";
import DisplayStoredLink from "./Components/DisplayStoredLinks";

import { getUserID } from "./helpers/utils";
import "./app.css";

// mode -> create / result / list

class App extends React.Component {
  state = {
    mode: "create",
    userID: getUserID(),
    resultLink: "",
    storedLinks: [],
  };

  updateResult = (link) => {
    this.setState({
      resultLink: link,
      mode: "result",
    });
  };

  createMode = () => {
    this.setState({
      mode: "create",
    });
  };

  updateStoredLinks = (links) => {
    this.setState({
      mode: "list",
      storedLinks: [...links],
    });
  };

  renderCard() {
    const { createMode, updateResult, updateStoredLinks } = this;
    switch (this.state.mode) {
      case "create":
        return (
          <CreateCard
            user={this.state.userID}
            updateResult={updateResult}
            updateStoredLinks={updateStoredLinks}
          />
        );
      case "result":
        return (
          <DisplayShortenedLink
            link={this.state.resultLink}
            updateReceivedLink={createMode}
          />
        );
      case "list":
        return (
          <DisplayStoredLink
            links={this.state.storedLinks}
            updateMode={createMode}
          />
        );
    }
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}

export default App;
