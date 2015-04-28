'use strict';

var React = require('react');

var AppConstants = require('../../constants/AppConstants');
var LayoutUtils = require('../../layout/Utils');
var MemberSVG = require('./MemberSVG');
var NestSVG = require('./NestSVG');
var Structures = require('../../common/Structures');

var PedigreeSVG = React.createClass({

  propTypes: {
    data: React.PropTypes.instanceOf(Structures.Pedigree).isRequired,
    focus: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    scale: React.PropTypes.number.isRequired,
    symbol: React.PropTypes.instanceOf(Structures.Symbol).isRequired
  },

  getInitialState: function() {
    return {
      layout: LayoutUtils.getLayout(this.props.data)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.data.equals(nextProps.data)) {
      console.log('redo layout');
      this.setState({layout: LayoutUtils.getLayout(nextProps.data)});
    }
  },

  render: function() {
    var focus = this.props.focus;
    var pedigree = this.props.data;
    var layout = this.state.layout;
    var members;
    var nests;
    var leftmost;
    var rightmost;
    var shift;
    var transform;

    members = pedigree.members
      .map((member, memberKey) => {
        var isSelected = focus.level === AppConstants.FocusLevel.Member &&
                         focus.key === memberKey;
        return <MemberSVG data={member}
                          memberKey={memberKey}
                          location={layout.getIn(['members', memberKey])}
                          focused={isSelected}
                          symbolDef={this.props.symbol.mapping}
                          key={'member-' + memberKey}/>;
      })
      .toArray();

    nests = pedigree.nests
      .map((nest, nestKey) => {
        var isSelected = focus.level === AppConstants.FocusLevel.Nest &&
                         focus.key.equals(nestKey);
        return <NestSVG data={nest}
                        nestKey={nestKey}
                        layout={layout}
                        focused={isSelected}
                        key={'nest-' + nestKey.join(',')}/>;
      })
      .toArray();

    leftmost = layout.get('members')
      .minBy(member => member.get('x'))
      .get('x');

    rightmost = layout.get('members')
      .maxBy(member => member.get('x'))
      .get('x');

    shift = this.props.width / 2 - (leftmost + (rightmost - leftmost) / 2);
    transform = `translate(${shift},50) scale(${this.props.scale})`;

    return (
      <g transform={transform} key={'pedigree'}>
        {nests}
        {members}
      </g>
    );
  }
});

module.exports = PedigreeSVG;