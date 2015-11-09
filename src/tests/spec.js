describe('FormController', function(){

  var formController, users;
  var store = {};

  beforeEach(angular.mock.module('shuffling'));
  
  beforeEach(function() {
      module(function($provide){
      //mock localstorage()Storage
        $provide.value('UsersInit', [{
            'name': 'Mark Jarvon',
            'transition-date': '11/11/2013',
            'location':'Hell Wing', 
            'status' : 'pick up',
            'archived' : false
          },
          {
            'name': 'Frank Figura',
            'transition-date': '9/13/1978',
            'location':'Infirmiry',
            'status' : 'drop off',
            'archived' : false
          }
        ]);  
      });

      inject(function($controller, $rootScope, $injector){

        var scope = $rootScope.$new();
        users = $injector.get('UsersSvc');
        formController = $controller('FormController', {$scope: scope});

        //localStorage mock
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
          // by default sessionStorage will return a string of an empty array, not undefined
          return store[key] || '[]';
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
          // concatenating to an empty string will store it as a stringify()
          store[key] = value + '';
        });
        spyOn(localStorage, 'clear').and.callFake(function () {
            store = {};
        });
      });
  });//end BeforeEach


  //On submit, add the data to an array of JSON objects to be held in localStorage. (all fields submit and add to a json object)
  it('should call the user service and pass correct data when addUser is called', function () {
    spyOn(users, 'addToStorage');
    var date = new Date();
    formController.guestName = 'something';
    formController.transitionDate = date;
    formController.pickupDropoff = 'pick up';
    formController.location = 'Mars';
    formController.archived = false;
    var data = {
      name: 'something', 
      transitionDate : date, 
      status: 'pick up', 
      location: 'Mars',
      archived: false
    };
    formController.addUser();
    expect(users.addToStorage).toHaveBeenCalledWith(data);
  });

  // If there exists no data in localStorage, pre-populate the data with a few examples on application init.
  it('should pre-populate data in localStorage if no data exists on init', function () {
    expect(users).not.toBe(null);
    });

});

describe('UsersSvc', function () {

  var UsersSvc, Users;
  
  beforeEach(angular.mock.module('shuffling'));
  
  beforeEach(function() {
    module(function($provide){
        var store = {};
      //provide init data to test w/no data in svc
      $provide.value('UsersInit', []);  

      spyOn(localStorage, 'getItem').and.callFake(function (key) {
        // by default sessionStorage will return a string of an empty array, not undefined
        return store[key] || '[]';
      });
      spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        // concatenating to an empty string will store it as a stringify()
         store[key] =  value + '';
      });
      spyOn(localStorage, 'clear').and.callFake(function () {
          store = {};
      });
    });
    inject(function($injector){
          UsersSvc = $injector.get('UsersSvc');
    });
  }); //end beforeeach

  // An option should exist for each to edit their status, following the rules of:

  // 'pick up' to 'arrived'
  it('should allow a user to change their status from "pick up" to arrived', function() {
    var date = new Date();
    var data = {
      name: 'something', 
      transitionDate : date, 
      status: 'pick up', 
      location: 'Mars'
    };
    UsersSvc.addToStorage(data);
    UsersSvc.cycleStatus(0);
    var usersarray = UsersSvc.getUsers();
    expect(usersarray[0].status).toBe('arrived');

  });

  // 'drop off' to 'arrived'
  it('should allow a user to change their status from "drop off" to arrive', function() {
    var date = new Date();
    var data = {
      name: 'something', 
      transitionDate : date, 
      status: 'drop off', 
      location: 'Mars'
    };
    UsersSvc.addToStorage(data);
    UsersSvc.cycleStatus(0);
    var usersarray = UsersSvc.getUsers();
    expect(usersarray[0].status).toBe('arrived');

  });

  // 'arrived' to 'pick up'. 
  it('should allow a user to change their status from "arrived" to pick up', function() {
    var date = new Date();
    var data = {
      name: 'something', 
      transitionDate : date, 
      status: 'arrived', 
      location: 'Mars'
    };
    UsersSvc.addToStorage(data);
    UsersSvc.cycleStatus(0);
    var usersarray = UsersSvc.getUsers();
    expect(usersarray[0].status).toBe('pick up');
  });

    // There should also be a delete option that removes a guest from the list, but keeps the record in localStorage. 
  it('should allow a user to delete a guest from the list', function() {
    var date = new Date();
    var data = {
      name: 'something', 
      transitionDate : date, 
      status: 'arrived', 
      location: 'Mars', 
      archived : false
    };
    UsersSvc.addToStorage(data);
    var usersarray = UsersSvc.getUsers();
    expect(usersarray[0].archived).toBe(false); //be sure no parse errors occured in upload to LS
    UsersSvc.deleteUser(0);
    expect(usersarray[0].archived).toBe(true); //when true, filter will prevent view in users' list
  });
});
