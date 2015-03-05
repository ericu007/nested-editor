'use strict';


var Icon = require('react-fa');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var DocumentActions = require('../actions/DocumentActions');
var AppConstants = require('../constants/AppConstants');


var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;


var DocumentControls = React.createClass({
  addSpouse: function() {
    DocumentActions.addSpouse(this.props.focus.get('key'));
  },

  addChild: function() {
    DocumentActions.addChild(this.props.focus.get('key'),
                             AppConstants.Gender.Unknown);
  },

  addSon: function() {
    DocumentActions.addChild(this.props.focus.get('key'),
                             AppConstants.Gender.Male);
  },

  addDaughter: function() {
    DocumentActions.addChild(this.props.focus.get('key'),
                             AppConstants.Gender.Female);
  },

  undo: function() {
    DocumentActions.undo();
  },

  redo: function() {
    DocumentActions.redo();
  },

  render: function() {
    var buttons = {};
    var tooltip;

    if (this.props.undo !== undefined) {
      tooltip = <Tooltip>Undo: <strong>{this.props.undo}</strong></Tooltip>;
      buttons.undo = <OverlayTrigger placement="bottom" overlay={tooltip}>
                       <Button key="undo" onClick={this.undo}><Icon name="undo" /></Button>
                     </OverlayTrigger>;
    } else {
      buttons.undo = <Button key="undo" disabled><Icon name="undo" /></Button>;
    }

    if (this.props.redo !== undefined) {
      tooltip = <Tooltip>Redo: <strong>{this.props.redo}</strong></Tooltip>;
      buttons.redo = <OverlayTrigger placement="bottom" overlay={tooltip}>
                       <Button key="redo" onClick={this.redo}><Icon name="repeat" /></Button>
                     </OverlayTrigger>;
    } else {
      buttons.redo = <Button key="redo" disabled><Icon name="repeat" /></Button>;
    }

    if (this.props.focus !== undefined) {
      switch (this.props.focus.get('level')) {
        case AppConstants.FocusLevel.Member:
          buttons.addSpouse = <Button onClick={this.addSpouse}>Add spouse</Button>;
          break;

        case AppConstants.FocusLevel.Nest:
          buttons.addChild = <DropdownButton title="Add child">
                               <MenuItem eventKey="1" onClick={this.addSon}>Male</MenuItem>
                               <MenuItem eventKey="2" onClick={this.addDaughter}>Female</MenuItem>
                               <MenuItem eventKey="3" onClick={this.addChild}>Unknown</MenuItem>
                             </DropdownButton>;
          break;
      }
    }

    return (
      <ButtonToolbar>
        <ButtonGroup>
          {buttons.undo}
          {buttons.redo}
        </ButtonGroup>
        <ButtonGroup>
          {buttons.addSpouse}
          {buttons.addChild}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
});


module.exports = DocumentControls;