angular.module('shuffling')

.controller('FormController', ['Users', function(Users){
	vm = this;
	vm.data = {};
	vm.users = Users;
	vm.addUser = function(isValid,index){
		Users.addToStorage(index);
	};


}]);