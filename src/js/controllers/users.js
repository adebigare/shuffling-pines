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
