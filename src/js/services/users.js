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