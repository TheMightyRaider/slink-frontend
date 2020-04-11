import React from "react";

class DisplayStoredLinks extends React.Component {
  render() {
    return (
      <div>
        {this.props.links.map((item) => {
          return (
            <div>
              <h1>{item}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayStoredLinks;
