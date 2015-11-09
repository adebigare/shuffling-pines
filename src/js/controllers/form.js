angular.module('shuffling')

.controller('FormController', ['UsersSvc',  function(UsersSvc){
	vm = this;
	_resetModel();

	vm.addUser = function(){
		vm.data = {name:vm.guestName, transitionDate : vm.transitionDate, status: vm.pickupDropoff, location: vm.location};
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