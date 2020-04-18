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

  render() {
    const { mode } = this.state;
    return (
      <div>
        {mode === "create" ? <CreateCard user={this.state.userID} /> : null}
      </div>
    );
  }
}

export default App;
