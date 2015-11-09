var app = angular.module('shuffling', []);


angular.module('shuffling')

.controller('FormController', ['UsersSvc',  function(UsersSvc){
	var vm = this;
	_resetModel();

	vm.addUser = function(){
		vm.data = {name:vm.guestName, transitionDate : vm.transitionDate, status: vm.pickupDropoff, location: vm.location, archived : false};
		UsersSvc.addToStorage(vm.data);
		_resetModel();
	};

	// An option should exist for each to edit their status, following the rules of:

	// "pick up" to "arrived"
	// "drop off" to "arrived"
	// "arrived" to "pick up". 
	// There should also be a delete option that removes a guest from the list. The delete should have a confirm dialog. 

	 function _resetModel() {
		vm.guestName = '';
		vm.transitionDate = '';
		vm.pickupDropoff = 'drop off';
		vm.location = ''; //To do, set location to "On site" if no location is added

	}

}]);
angular.module('shuffling')

.controller('TabController', [ '$window', function($window){
	var tc = this;
	tc.showGuestsTab = function () {
		$window.$('#guestsTab').tab('show');
	};
	
}]);


angular.module('shuffling').controller('UsersController', ['UsersSvc', '$rootScope', function(UsersSvc, $rootScope){
	var uc = this; 
	var tempIndex;

	uc.storeIndex = function(index) {
		 tempIndex = index;
	};

	uc.cycleStatus = function(index) {
		UsersSvc.cycleStatus(index);
	};

	uc.deleteUser = function() {
		UsersSvc.deleteUser(tempIndex);
		tempIndex = null;
	};

	$rootScope.$on('Users Updated', function() {
		uc.usersData = UsersSvc.getUsers();
	});

	uc.usersData = UsersSvc.getUsers();
}]);

angular.module('shuffling').filter('showHideGuest', function(){
	return function (input) {
		var users = [];
		angular.forEach(input, function(user) {
			if (user.archived === false) {
				users.push(user);
			}
		}); 
		return users;
	};
});
angular.module('shuffling').service('UsersSvc', ['UsersInit', '$rootScope', '$window', function(UsersInit, $rootScope, $window) {
	// initialize local storage 
	var svc = this;
	var users = [];
	var user;

	if (localStorage.length === 0) {
		localStorage.setItem('session', angular.toJson(UsersInit));
	} 
	if (_storageAvailable('localStorage')) {
		users = JSON.parse(localStorage.getItem('session'));
		console.log(users);
	} else {
		console.log('Error: Local Storage Unavailable. Are you Incognito?');
	}	


	svc.addToStorage = function (userdata) {
		users.push(userdata);
		console.log(users);
		_saveUsers();
	};

	svc.getUsers = function() {
		return users;
	};

	svc.cycleStatus = function (index) {
		 _getUser(index);
		var status = user.status;		

		if (status === 'pick up' || status === 'drop off') {
			status = 'arrived';
		} else {
			status = 'pick up';
		}
		user.status = status;
		users[index] = user;
		_saveUsers();

	};

	svc.deleteUser = function(index) {
		user = _getUser(index);
		user.archived = true;
		users[index] = user;
		_saveUsers();
	};

	function _getUser(index) {
		user = users[index];
		return user; 
	}
	
	//delete function by index 
	//once deleted, needs to update the controller (emit again once deleted)

	function _saveUsers() {
		localStorage.setItem('session', angular.toJson(users));
		$rootScope.$emit('Users Updated');
	} 
	//check that storage is available
	function _storageAvailable (type) {
		try {
			//Is storage available? Yes, return true, else return false
			var storage = $window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}
}]);



angular.module('shuffling').value('UsersInit', [
	{
		'name': 'Freida Callo',
		'transitionDate': '11/11/2013',
		'location':'East Wing',
		'status': 'pick up',
		'archived' : false
	},
	{
		'name': 'Frank Reynolds',
		'transitionDate': '4/13/1978',
		'location':'Unknown', 
		'status': 'drop off',
		'archived' : false
	},

]);