//Not Implemented
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