import React from "react";
import DisplayShortenedLink from "./Components/DisplayShortenedLink";

class App extends React.Component {
  state = {
    value: "",
    shortedLink: "",
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
        <DisplayShortenedLink link={this.state.shortedLink} />
      </div>
    );
  }
}

export default App;
