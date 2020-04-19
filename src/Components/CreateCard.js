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
        this.props.updateResult(response.data.slink);
      })
      .catch((e) => {
        let errMsg = "";
        if (e.response) {
          errMsg = e.response.data.error;
        } else {
          errMsg = "Some error occured.";
        }

        this.setState({
          error: errMsg,
          loading: false,
        });
      });
  };

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  fetchStoredLinks = async () => {
    this.setState({
      loading: true,
    });

    await api
      .getLinks({
        user: this.props.user,
      })
      .then((response) => {
        this.props.updateStoredLinks(response.data);
      })
      .catch((e) => {
        let errMsg;
        if (e.response) {
          errMsg = e.response.error;
        } else {
          errMsg = "Some error occured.";
        }
        this.setState({
          error: errMsg,
          loading: false,
        });
      });
  };

  removeError = () => {
    this.setState({
      error: false,
    });
  };

  render() {
    const { value, loading, error } = this.state;
    const { updateValue, submitTheLink, fetchStoredLinks, removeError } = this;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="inputBox" onClick={removeError}>
        <h1>SLINK!</h1>
        <input
          placeholder="Enter your URL"
          type="text"
          value={value}
          onChange={updateValue}
          onKeyPress={submitTheLink}
        ></input>

        {error ? <div className="displayError">{error}</div> : null}

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
        <button name="getLinks" onClick={fetchStoredLinks}>
          Click here
        </button>
      </div>
    );
  }
}

export default CreateCard;
