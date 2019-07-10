import React, { Component } from "react";
import { Icon, Header, Input } from "semantic-ui-react";
import screenOptions from "../constants/Screens";

export class ScreensList extends Component {
  state = {
    query: "",
    selectedScreen: null
  };

  render() {
    const { query, selectedScreen } = this.state;
    const style = this.props.style || {};

    return (
      <div className="column" style={style}>
        <Header as="h3" style={{ marginTop: 10 }}>
          Screens List
        </Header>

        <Input
          icon
          placeholder="Search..."
          value={query}
          onChange={(e, { value: newQuery }) => {
            this.setState({ query: newQuery });
          }}
          style={{ width: "100%", padding: 4 }}
        >
          <input />
          <Icon name="search" />
        </Input>

        <div style={{ width: "100%" }}>
          {screenOptions.map((item, index) => {
            if (
              query.trim() &&
              !item.toLowerCase().includes(query.toLowerCase())
            ) {
              return null;
            }

            return (
              <div
                className={`column ${
                  item === selectedScreen ? "item-selected" : ""
                }`}
                key={index}
                onClick={() => {
                  this.props.handleScreenSelect(item);
                  this.setState({ selectedScreen: item });
                }}
              >
                <div className="screens-list-item">
                  <div>{item}</div>
                  <div>
                    <Icon name="edit" />
                  </div>
                </div>
                <div className="divider" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ScreensList;
