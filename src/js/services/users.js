angular.module('shuffling').service('UsersSvc', ['UsersInit', '$rootScope', function(UsersInit, $rootScope) {
	// initialize local storage 
	var svc = this;
	var users = [];
	var user;

	if (localStorage.length === 0) {
		localStorage.setItem('session', angular.toJson(UsersInit));
	} 
	if (_storageAvailable('localStorage')) {
		users = JSON.parse(localStorage.getItem('session'));
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

		if (status === 'pick up' || status === "drop off") {
			status = "arrived";
		} else {
			status = "pick up";
		}
		user.status = status;
		users[index] = user;
		_saveUsers();

	};

	svc.deleteUser = function(index) {
		users.splice(index, 1);
		if (users.length === 0) {
			localStorage.clear();
		}
		// svc.getUsers();
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
			var storage = window[type],
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

angular.module('shuffling').controller('UsersController', ['UsersSvc', '$rootScope', function(UsersSvc, $rootScope){
	uc = this; 
	var tempIndex;

	uc.storeIndex = function(index) {
		 tempIndex = index;
	};

	uc.cycleStatus = function(index) {
		UsersSvc.cycleStatus(index);
	};

	uc.deleteUser = function(tempIndex) {
		UsersSvc.deleteUser(tempIndex);
		tempIndex = '';
	};

	$rootScope.$on('Users Updated', function() {
		uc.usersData = UsersSvc.getUsers();
	});

	uc.usersData = UsersSvc.getUsers();
}]);


angular.module('shuffling').value('UsersInit', [
	{
		"name": "Freida Callo",
		"transitionDate": "11/11/2013",
		"location":"East Wing",
		"status": "pick up"
	},
	{
		"name": "Frank Reynolds",
		"transitionDate": "4/13/1978",
		"location":"Unknown", 
		"status": "drop off"
	},

]);