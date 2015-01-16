'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  changeFocus: function(id){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_FOCUS,
      focus: id
    });
  },

  addSpouse: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_SPOUSE
    });
  },

  updateMember: function(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_MEMBER,
      data: data
    });
  }
};

module.exports = AppActions;
