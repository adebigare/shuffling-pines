describe('FormController', function(){

  var formController;

  beforeEach(angular.mock.module('shuffling'));
  beforeEach(angular.mock.inject(function($controller){
    formController = $controller('FormController');
  }));

//On submit (not submit the page HTML style), add the data to an array of JSON objects to be held in localStorage. 
  it('should add user-entered data on form submit to a JSON array in localstorage', function () {
    expect(formController)
  });

// If there exists no data in localStorage, pre-populate the data with a few examples on application init.
  it('should pre-populate data in localStorage if no data exists on init', function () {

  });

// An option should exist for each to edit their status, following the rules of:

// "pick up" to "arrived"
  it('should allow a user to change their status from "pick up" to arrived"', function() {

  });

// "drop off" to "arrived"
  it('should allow a user to change their status from "drop off" to arrive"', function() {

  });

// "arrived" to "pick up". 
  it('should allow a user to change their status from "arrived" to pick up"', function() {

  });


// There should also be a delete option that removes a guest from the list. 
  it('should allow a user to delete a guest from the list', function() {

  });

// The delete should have a confirm dialog. 
  it('should warn the user of a delete action with a dialog box', function () {

  });

}); //end FormController tests 

describe('TabController', function(){
    var tabController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject(function($controller){
      tabController = $controller('TabController');
    }));

    // After Submit, the user's tab will change to a list of all guests. 
    it('should change the view to a list of all guests when a user submits the form', function () {

    });

}); // end TabController tests  
