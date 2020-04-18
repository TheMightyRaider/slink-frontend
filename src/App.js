import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";
import CreateCard from "./Components/CreateCard";
import Loader from "./Components/Loader";

import { getUserID } from "./helpers/utils";
import "./app.css";

// mode -> create / result / list

class App extends React.Component {
  state = {
    mode: "create",
    userID: getUserID(),
    resultLink: "",
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

  renderCard() {
    switch (this.state.mode) {
      case "create":
        return (
          <CreateCard
            user={this.state.userID}
            updateResult={this.updateResult}
          />
        );
      case "result":
        return (
          <DisplayShortenedLink
            link={this.state.resultLink}
            updateReceivedLink={this.createMode}
          />
        );
    }
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}

export default App;
