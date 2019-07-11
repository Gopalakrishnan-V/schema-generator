import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export class MainScreenHeader extends Component {
  render() {
    return (
      <header
        style={{
          width: "100%",
          height: 55,
          alignItems: "center"
        }}
        className="column"
      >
        <div
          className="row"
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: "space-between"
          }}
        >
          <div className="row" style={{ alignItems: "center" }}>
            <img
              src="https://lh3.googleusercontent.com/EpxCc8RAR9AvA_JD_5x9iDll7MmiZ3IIGzjvqCL-aO_OqAeyZGiuhwE_DcAidwxG4aw78g=s85"
              style={{ height: 30 }}
            />
            <span className="header-text">Schema Generator Tool</span>
          </div>

          <Button primary disabled style={{fontSize: 12}}>Save</Button>
        </div>

        <div className="divider" style={{ opacity: 0.25 }} />
      </header>
    );
  }
}

export default MainScreenHeader;
