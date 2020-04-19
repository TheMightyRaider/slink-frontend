import React from "react";
import Link from "./Link";
import "../app.css";

class DisplayStoredLinks extends React.Component {
  render() {
    return (
      <div>
        <div className="afterStoredLinkIsDisplayed">
          <h3>Shorten a New Link?</h3>
          <button
            name="submit"
            className="enableInput"
            onClick={this.props.updateMode}
          >
            Yeah !
          </button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Original Url</th>
              <th>Shortened Url</th>
            </tr>
            {this.props.links.map((item, index) => {
              return (
                <Link key={index} hash={item.hash} originalUrl={item.url} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayStoredLinks;
