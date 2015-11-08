describe('FormController', function(){

  var formController, users;
  var store = {};

  beforeEach(angular.mock.module('shuffling'));
  
  beforeEach(function() {
      module(function($provide){
      //mock localstorage()Storage
        $provide.value('Users', [{
            "name": "Mark Jarvon",
            "transition-date": "11/11/2013",
            "location":"Hell Wing", 
            "status" : "pick up"
          },
          {
            "name": "Frank Figura",
            "transition-date": "9/13/1978",
            "location":"Infirmiry",
            "status" : "drop off"
          }
        ]);  
      });

      inject(function($controller, $rootScope, $injector){

        scope = $rootScope.$new();
        users = $injector.get('UsersSvc');
        formController = $controller('FormController', {$scope: scope});

        //localStorage mock
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
          // by default sessionStorage will return a string of an empty array, not undefined
          return store[key] || '[]';
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
          // concatenating to an empty string will store it as a stringify()
          return store[key] =  value + '';
        });
        spyOn(localStorage, 'clear').and.callFake(function () {
            store = {};
        });
      });
  });//end BeforeEach

  it('should require guests to enter name, location if picking up, and transition date', function() {
    
  });

  //On submit, add the data to an array of JSON objects to be held in localStorage. 
    it('should call the user service and pass correct data when addUser is called', function () {
      spyOn(users, 'addToStorage');
      var date = new Date();
      formController.guestName = "something";
      formController.transitionDate = date;
      formController.pickupDropoff = "pick up";
      formController.location = "Mars";
      var data = {
        name: "something", 
        transitionDate : date, 
        status: "pick up", 
        location: "Mars"
      };
      formController.addUser();
      expect(users.addToStorage).toHaveBeenCalledWith(data);
    });

  // If there exists no data in localStorage, pre-populate the data with a few examples on application init.
    it('should pre-populate data in localStorage if no data exists on init', function () {
      // expect(store).not.toBe(null);
    });
});

describe('TabController', function(){
  var tabController;
  beforeEach(angular.mock.module('shuffling'));
  beforeEach(angular.mock.inject(function($controller){
    tabController = $controller('TabController');
  }));

  // After Submit, the user's tab will change to a list of all guests. 
  it('should change the view to a list of all guests when a user submits the form', function () {

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

}); // end TabController tests  

describe('UsersSvc', function () {
  // body...
});

/* Notes and Guidelines */
//right combination of elements is rendered 
//run through DOM to be sure all elements that should be there are, and the ones that shouldn't be there aren't 
//all services and controllers should have a "describe"
