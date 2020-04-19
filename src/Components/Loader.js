import React from "react";
import { generateRandomColor, clearBackgroundColor } from "../helpers/utils";

class Loader extends React.Component {
  intervalID = null;

  componentDidMount() {
    this.intervalID = setInterval(generateRandomColor, 10);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearBackgroundColor();
  }

  render() {
    return <div></div>;
  }
}

export default Loader;
