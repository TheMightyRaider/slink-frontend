import React from "react";
import Link from "./Link";
import "../app.css";

class DisplayStoredLinks extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Original Url</th>
              <th>Shortened Url</th>
            </tr>
            {this.props.links.map((item, index) => {
              return (
                <Link
                  key={this.props.id + index}
                  hash={item.hash}
                  originalUrl={item.url}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayStoredLinks;
