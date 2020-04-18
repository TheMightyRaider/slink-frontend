import React from "react";

import Loader from "./Loader";
import * as api from "../helpers/api";

class CreateCard extends React.Component {
  state = {
    value: "",
    error: "",
    loading: false,
  };

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
      .createLink({ url: this.state.value, user: this.props.user })
      .then((response) => {
        this.setState({
          value: "",
          shortedLink: response.data.slink,
        });
      })
      .catch((e) => {
        if (e) {
          this.setState({
            error: e.data.error,
          });
        } else {
          this.setState({
            error: "Some Error occured.",
          });
        }
      });

    this.setState({
      loading: false,
    });
  };

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value, loading } = this.state;
    const { updateValue, submitTheLink } = this;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="inputBox">
        <h1>SLINK!</h1>
        <input
          placeholder="Enter your URL"
          type="text"
          value={value}
          onChange={updateValue}
          onKeyPress={submitTheLink}
        ></input>
        <button
          className={value ? "enableInput" : "hideInput"}
          name="submit"
          onClick={submitTheLink}
        >
          Submit
        </button>
        <br></br>
        <br></br>
        <span>Want your previous shortened Links? </span>
        <button name="getLinks" onClick={() => null}>
          Click here
        </button>
      </div>
    );
  }
}

export default CreateCard;
