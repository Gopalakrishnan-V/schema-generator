import React, { Component } from "react";
import schemaMain from "../helpers/data";
import _ from "lodash";
import ScreensList from "../components/ScreensList";
import { Input, Icon, Button, Modal, Header } from "semantic-ui-react";
import MainScreenHeader from "../components/MainScreenHeader";
const ADD = "__add__";

export class MainScreen extends Component {
  state = {
    schema: { ...schemaMain },
    currentPath: "",
    showModalType: null,
    modalsData: {
      addItem: {
        itemKey: ""
      },
      addEvent: {
        name: "",
        eventKey: ""
      },
      addAttribute: {
        name: "",
        context: "",
        key: ""
      },
      delete: {
        deleteEntity: null,
        itemKey: null,
        eventKey: null,
        attributeKey: null
      }
    }
  };

  handleScreenSelect = selectedScreen => {
    const updatedSchema = this.state.schema;
    if (!updatedSchema[selectedScreen]) {
      updatedSchema[selectedScreen] = {};
    }
    this.setState({ currentPath: selectedScreen, schema: updatedSchema });
  };

  handleItemOnClick = item => {
    const currentPathSplitted = this.state.currentPath.split(".");
    const newCurrentPath =
      currentPathSplitted.slice(0, 1).join(".") + "." + item;
    this.setState({ currentPath: newCurrentPath });
  };

  handleEventOnClick = item => {
    const currentPathSplitted = this.state.currentPath.split(".");
    const newCurrentPath =
      currentPathSplitted.slice(0, 2).join(".") + "." + item + ".data";
    this.setState({ currentPath: newCurrentPath });
  };

  handleAttributesValueChange = (attributeKey, key, newValue) => {
    const { schema, currentPath } = this.state;
    const updatedSchema = _.cloneDeep(schema);
    _.set(updatedSchema, `${currentPath}.${attributeKey}.${key}`, newValue);
    this.setState({ schema: updatedSchema });
  };

  handleItemDelete = itemKey => {
    const { schema, currentPath } = this.state;
    const currentPathSplitted = currentPath.split(".");
    this.setState({
      schema: _.omit(schema, `${currentPathSplitted[0]}.${itemKey}`),
      currentPath: currentPathSplitted[0],
      showModalType: null
    });
  };

  handleEventDelete = eventKey => {
    const { schema, currentPath } = this.state;
    const currentPathSplitted = currentPath.split(".");
    this.setState({
      schema: _.omit(
        schema,
        `${currentPathSplitted[0]}.${currentPathSplitted[1]}.${eventKey}`
      ),
      currentPath: `${currentPathSplitted[0]}.${currentPathSplitted[1]}`,
      showModalType: null
    });
  };

  handleAttributeDelete = attributeKey => {
    const { schema, currentPath } = this.state;
    const currentPathSplitted = currentPath.split(".");
    this.setState({
      schema: _.omit(
        schema,
        `${currentPathSplitted[0]}.${currentPathSplitted[1]}.${
          currentPathSplitted[2]
        }.data.${attributeKey}`
      ),
      currentPath: `${currentPathSplitted[0]}.${currentPathSplitted[1]}.${
        currentPathSplitted[2]
      }.data`,
      showModalType: null
    });
  };

  onModalClose = () => {
    this.setState({ showModalType: null });
  };

  renderAddItemModal = () => {
    const { schema, currentPath, showModalType, modalsData } = this.state;
    const currentPathSplitted = currentPath.split(".");
    const { itemKey } = modalsData.addItem;
    if (showModalType === "addItem") {
      return (
        <Modal
          dimmer={"blurring"}
          size={"mini"}
          open={true}
          onClose={this.onModalClose}
        >
          <Modal.Header>Add Item</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="row" style={{ alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 14,
                    flex: 0.5
                  }}
                >
                  Key
                </span>

                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Key"
                  value={itemKey}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addItem: { ...modalsData.addItem, itemKey: newValue }
                      }
                    });
                  }}
                />
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" basic onClick={this.onModalClose}>
              Cancel
            </Button>
            <Button
              positive
              content="OK"
              onClick={() => {
                if (!itemKey.trim()) {
                  return;
                }
                const updatedSchema = _.set(
                  schema,
                  `${currentPathSplitted[0]}.${itemKey}`,
                  {
                    onclick: {
                      name: `${_.startCase(itemKey.trim())} On Click`,
                      data: {}
                    }
                  }
                );
                this.setState({ schema, updatedSchema, showModalType: null });
              }}
            />
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  };

  renderAddEventModal = () => {
    const { schema, currentPath, showModalType, modalsData } = this.state;
    const currentPathSplitted = currentPath.split(".");
    const { name, eventKey } = modalsData.addEvent;
    if (showModalType === "addEvent") {
      return (
        <Modal
          dimmer={"blurring"}
          size={"mini"}
          open={true}
          onClose={this.onModalClose}
        >
          <Modal.Header>Add Event</Modal.Header>
          <Modal.Content>
            <div className="column">
              <div
                className="row"
                style={{ alignItems: "center", width: "100%" }}
              >
                <span
                  style={{
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  Name
                </span>
                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Name"
                  value={name}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addEvent: { ...modalsData.addEvent, name: newValue }
                      }
                    });
                  }}
                />
              </div>

              <div
                className="row"
                style={{ alignItems: "center", width: "100%", marginTop: 10 }}
              >
                <span
                  style={{
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  Event
                </span>

                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Event Key"
                  value={eventKey}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addEvent: { ...modalsData.addEvent, eventKey: newValue }
                      }
                    });
                  }}
                />
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" basic onClick={this.onModalClose}>
              Cancel
            </Button>
            <Button
              positive
              content="OK"
              onClick={() => {
                if (!name.trim() || !eventKey.trim()) {
                  return;
                }

                const updatedSchema = _.set(
                  schema,
                  `${currentPathSplitted[0]}.${
                    currentPathSplitted[1]
                  }.${eventKey.trim()}`,
                  {
                    name,
                    data: {}
                  }
                );
                this.setState({ schema: updatedSchema, showModalType: null });
              }}
            />
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  };

  renderAddAttributeModal = () => {
    const { schema, currentPath, showModalType, modalsData } = this.state;
    const currentPathSplitted = currentPath.split(".");
    const { name, context, key } = modalsData.addAttribute;
    if (showModalType === "addAttribute") {
      return (
        <Modal
          dimmer={"blurring"}
          size={"mini"}
          open={true}
          onClose={this.onModalClose}
        >
          <Modal.Header>Add Attribute</Modal.Header>
          <Modal.Content>
            <div className="column">
              <div
                className="row"
                style={{ alignItems: "center", width: "100%" }}
              >
                <span
                  style={{
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  Name
                </span>
                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Name"
                  value={name}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addAttribute: {
                          ...modalsData.addAttribute,
                          name: newValue
                        }
                      }
                    });
                  }}
                />
              </div>

              <div
                className="row"
                style={{ alignItems: "center", width: "100%", marginTop: 10 }}
              >
                <span
                  style={{
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  Context
                </span>
                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Context"
                  value={context}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addAttribute: {
                          ...modalsData.addAttribute,
                          context: newValue
                        }
                      }
                    });
                  }}
                />
              </div>

              <div
                className="row"
                style={{ alignItems: "center", width: "100%", marginTop: 10 }}
              >
                <span
                  style={{
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  Key
                </span>

                <span style={{ flex: 0.2 }}>:</span>
                <Input
                  placeholder="Key"
                  value={key}
                  style={{ flex: 4 }}
                  onChange={(event, { value: newValue }) => {
                    this.setState({
                      modalsData: {
                        ...modalsData,
                        addAttribute: {
                          ...modalsData.addAttribute,
                          key: newValue
                        }
                      }
                    });
                  }}
                />
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" basic onClick={this.onModalClose}>
              Cancel
            </Button>
            <Button
              positive
              content="OK"
              onClick={() => {
                if (!name.trim() || !context.trim() || !key.trim()) {
                  return;
                }
                const updatedSchema = _.set(schema, `${currentPath}.${name}`, {
                  context,
                  key
                });
                this.setState({ schema: updatedSchema, showModalType: null });
              }}
            />
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  };

  renderDeleteModal = () => {
    const { showModalType } = this.state;
    const {
      deleteEntity,
      itemKey,
      eventKey,
      attributeKey
    } = this.state.modalsData.delete;

    let deleteEntityName = "";
    if (deleteEntity === "item") {
      deleteEntityName = _.startCase(itemKey);
    } else if (deleteEntity === "event") {
      deleteEntityName = _.startCase(eventKey);
    } else if (deleteEntity === "attribute") {
      deleteEntityName = _.startCase(attributeKey);
    }

    if (showModalType === "delete") {
      return (
        <Modal
          dimmer={"blurring"}
          size={"tiny"}
          open={true}
          onClose={this.onModalClose}
        >
          <Modal.Header>Delete</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>
                Are you sure you want to delete the item{" "}
                <b>{deleteEntityName}</b> ?
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" basic onClick={this.onModalClose}>
              Cancel
            </Button>
            <Button
              negative
              content="OK"
              onClick={() => {
                if (deleteEntity === "item") {
                  this.handleItemDelete(itemKey);
                } else if (deleteEntity === "event") {
                  this.handleEventDelete(eventKey);
                } else if (deleteEntity === "attribute") {
                  this.handleAttributeDelete(attributeKey);
                } else {
                  this.onModalClose();
                }
              }}
            />
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  };

  getLevelsCount = () => {
    let { currentPath } = this.state;
    const currentPathSplitted = currentPath ? currentPath.split(".") : [];
    return currentPathSplitted.length;
  };

  getPathUptoLevel = level => {
    let { currentPath } = this.state;
    const currentPathSplitted = currentPath.split(".").slice(0, level);
    return currentPathSplitted.join(".");
  };

  render() {
    let { schema, currentPath, modalsData } = this.state;
    const currentPathSplitted = currentPath ? currentPath.split(".") : [];

    const name = currentPathSplitted.length > 0 ? currentPathSplitted[0] : "";
    const levelsCount = this.getLevelsCount();

    return (
      <div className="column">
        <MainScreenHeader />
        <div className="row" style={{ width: "100%" }}>
          {this.renderAddItemModal()}
          {this.renderDeleteModal()}
          {this.renderAddEventModal()}
          {this.renderAddAttributeModal()}

          <div
            className="column"
            style={{
              flex: 7,
              paddingTop: 20,
              paddingLeft: 50,
              paddingRight: 50,
              overflowY: "scroll",
              height: "calc(100vh)"
            }}
          >
            {levelsCount === 0 ? (
              <div
                className="column"
                style={{
                  height: "100%",
                  justifyContent: "center",
                  paddingBottom: 200
                }}
              >
                <Header as="h2" icon>
                  <Icon name="settings" loading style={{ marginBottom: 40 }} />
                  UI Events Schema Genarator Tool
                  <Header.Subheader style={{ marginTop: 10 }}>
                    Select a screen from the options to continue...
                  </Header.Subheader>
                </Header>
              </div>
            ) : null}
            {levelsCount > 0 && (
              <div
                key={0}
                className="chip"
                style={{ paddingLeft: 12, paddingRight: 12 }}
                onClick={() => this.setState({ currentPath: name })}
              >
                <span>{name}</span>
              </div>
            )}

            {levelsCount > 0 ? (
              <div className="column section-title">
                <span className="span-title">Item Types</span>
                <img
                  width="20px"
                  height="20px"
                  src="https://image.flaticon.com/icons/svg/118/118738.svg"
                  className="down-arrow"
                  alt=""
                />
              </div>
            ) : null}

            <div className="items-container">
              {levelsCount >= 1 &&
                [
                  ...Object.keys(_.get(schema, this.getPathUptoLevel(1))),
                  ADD
                ].map((item, index) => {
                  const selected = currentPathSplitted.includes(item);
                  return item !== ADD ? (
                    <div
                      className={`chip chip-item ${
                        selected ? "highlighted" : "partially-visible"
                      }`}
                      key={index}
                    >
                      <span
                        className="chip-text-span"
                        onClick={() => {
                          this.handleItemOnClick(item);
                        }}
                      >
                        {_.startCase(item)}
                      </span>
                      <Icon
                        name="close"
                        className="chip-cross-icon"
                        circular
                        style={{ color: "#06be7f", fontSize: 12 }}
                        onClick={() => {
                          this.setState({
                            showModalType: "delete",
                            modalsData: {
                              ...modalsData,
                              delete: {
                                ...modalsData.delete,
                                deleteEntity: "item",
                                itemKey: item
                              }
                            }
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="chip chip-item-outlined"
                      key={index}
                      style={{
                        paddingLeft: 15,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10
                      }}
                      onClick={() => {
                        this.setState({
                          showModalType: "addItem",
                          modalsData: {
                            ...modalsData,
                            addItem: { itemKey: "" }
                          }
                        });
                      }}
                    >
                      <span style={{ marginTop: -2 }}>ADD</span>
                      <Icon
                        name="plus"
                        style={{ marginLeft: 5, marginTop: -5 }}
                      />
                    </div>
                  );
                })}
            </div>

            {levelsCount >= 2 && (
              <div className="column section-title">
                <span className="span-title">Event Types</span>
                <img
                  width="20px"
                  height="20px"
                  src="https://image.flaticon.com/icons/svg/118/118738.svg"
                  className="down-arrow"
                  alt=""
                />
              </div>
            )}

            <div className="items-container">
              {levelsCount >= 2 &&
                [
                  ...Object.keys(_.get(schema, this.getPathUptoLevel(2))),
                  ADD
                ].map((item, index) => {
                  const selected = currentPathSplitted.includes(item);
                  return item !== ADD ? (
                    <div
                      className={`chip chip-item ${
                        selected ? "highlighted" : "partially-visible"
                      }`}
                      style={{ backgroundColor: "#3c4852" }}
                      key={index}
                    >
                      <span
                        className="chip-text-span"
                        onClick={() => this.handleEventOnClick(item)}
                      >
                        {_.startCase(item)}
                      </span>
                      <Icon
                        name="close"
                        className="chip-cross-icon event-color"
                        circular
                        style={{ color: "#06be7f", fontSize: 12 }}
                        onClick={() => {
                          this.setState({
                            showModalType: "delete",
                            modalsData: {
                              ...modalsData,
                              delete: {
                                ...modalsData.delete,
                                deleteEntity: "event",
                                eventKey: item
                              }
                            }
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="chip chip-item-outlined event-color"
                      key={index}
                      style={{
                        paddingLeft: 15,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        border: "1px solid #3c4852"
                      }}
                      onClick={() => {
                        this.setState({
                          showModalType: "addEvent",
                          modalsData: {
                            ...modalsData,
                            addEvent: { name: "", eventKey: "" }
                          }
                        });
                      }}
                    >
                      <span style={{ marginTop: -2 }}>ADD</span>
                      <Icon
                        name="plus"
                        style={{ marginLeft: 5, marginTop: -5 }}
                      />
                    </div>
                  );
                })}
            </div>

            {levelsCount >= 3 && (
              <div className="row">
                <div className="column section-title">
                  <span className="span-title">Attributes</span>
                  <img
                    width="20px"
                    height="20px"
                    src="https://image.flaticon.com/icons/svg/118/118738.svg"
                    className="down-arrow"
                    alt=""
                  />
                </div>
              </div>
            )}

            <div className="items-container">
              {levelsCount >= 3 &&
                [
                  ...Object.keys(_.get(schema, this.getPathUptoLevel(4))),
                  ADD
                ].map((item, index) => {
                  return item !== ADD ? (
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        margin: 5,
                        border: "1px solid #d3d6dc",
                        borderRadius: 5
                      }}
                      className="column"
                      key={index}
                    >
                      <div
                        style={{
                          width: "100%",
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          paddingRight: 5,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <span className="m0 attribute-title">
                          {_.startCase(item).trim()}
                        </span>
                        <Icon
                          name="trash alternate"
                          style={{
                            color: "black",
                            marginRight: "-3px",
                            opacity: 0.6,
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            this.setState({
                              showModalType: "delete",
                              modalsData: {
                                ...modalsData,
                                delete: {
                                  ...modalsData.delete,
                                  deleteEntity: "attribute",
                                  attributeKey: item
                                }
                              }
                            });
                          }}
                        />
                      </div>

                      <div
                        className="divider"
                        style={{ marginTop: 5, marginBottom: 5 }}
                      />

                      <div
                        style={{ padding: 5, marginTop: 2 }}
                        className="column"
                      >
                        <span
                          style={{
                            fontSize: "smaller",
                            alignSelf: "flex-start",
                            marginLeft: 2
                          }}
                        >
                          Context
                        </span>
                        <Input
                          placeholder="Context"
                          value={_.get(schema, currentPath)[item].context}
                          onChange={(event, { value: newValue }) => {
                            this.handleAttributesValueChange(
                              item,
                              "context",
                              newValue
                            );
                          }}
                        />

                        <span
                          style={{
                            fontSize: "smaller",
                            alignSelf: "flex-start",
                            marginTop: 10,
                            marginLeft: 2
                          }}
                        >
                          Key
                        </span>
                        <Input
                          placeholder="Key"
                          value={_.get(schema, currentPath)[item].key}
                          onChange={(event, { value: newValue }) => {
                            this.handleAttributesValueChange(
                              item,
                              "key",
                              newValue
                            );
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        this.setState({
                          showModalType: "addAttribute",
                          modalsData: {
                            ...modalsData,
                            addAttribute: { name: "", context: "", key: "" }
                          }
                        });
                      }}
                      style={{
                        width: 200,
                        height: 200,
                        margin: 5,
                        border: "1px solid #d3d6dc",
                        borderRadius: 5,
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      className="column"
                      key={index}
                    >
                      <div>
                        <Icon name="plus" />
                        <span className="attribute-title">ADD &nbsp;</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <ScreensList
            style={{ flex: 1.5, overflowY: "scroll", height: "calc(100vh)" }}
            handleScreenSelect={this.handleScreenSelect}
          />
        </div>
      </div>
    );
  }
}

export default MainScreen;
