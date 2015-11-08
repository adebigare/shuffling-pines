angular.module('shuffling')

.service('Users', [ function (Users) {
	// initialize local storage 
	var storage = [];

	//check that storage is available
	var _storageAvailable = function (type) {
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
	};

	//Push the users table to local storage if it is empty
	var populateStorage = function (UsersInit) {
		
		storage.push(JSON.parse(localStorage.getItem('session')));
		localStorage.setItem('session', JSON.stringify(UsersInit));
		console.log(JSON.parse( localStorage.getItem( 'UsersInit' )));
	};

	this.addToStorage = function (index) {
		if (_storageAvailable('localStorage')) {
			// Yippee! We can use localStorage awesomeness
			if (localStorage.length === 0) {
				populateStorage(Users);
			} else {	
				console.log(storage);
				storage = JSON.parse(localStorage.getItem('session'));
				storage.push(index);
				localStorage.setItem('session', JSON.stringify(storage));
			}
		}
		else {
			alert('No session data for you!');
		}
	};
}])

.value('UsersInit', [
	{
		"name": "Freida Callo",
		"transition-date": "11/11/2013",
		"location":"East Wing"
	},
	{
		"name": "Frank Reynolds",
		"transition-date": "4/13/1978",
		"location":"Unknown"
	},

])