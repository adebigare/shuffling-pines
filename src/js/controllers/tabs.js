angular.module('shuffling')

.controller('TabController', [ '$window', function($window){
	var tc = this;
	tc.showGuestsTab = function () {
		$window.$('#guestsTab').tab('show');
	};
	
}]);

