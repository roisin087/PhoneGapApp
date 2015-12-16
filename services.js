angular.module('starter.services', [])


.factory('StorageService', function() {
  var members = [];
  return {
    all: function () {
      //clear the array and update
      if(members.length >0){
        members = [];
      }
      if (window.localStorage.length > 0) {
        // For each item in local storage...
        for (item in localStorage) {

          // Parse the JSON string and add it to members array
          var newItem = JSON.parse(localStorage[item]);

          members.push(newItem);

        }
        return members;
      }

    },

    get: function (memberId) {
      // Simple index lookup
      return members[memberId];
    },
    add: function (newMember) {

     newMember.id = localStorage.length;    // id is used to identify this property when being delete from  storage
      // Add member object to localStorage as the value to a new property
      localStorage.setItem('item' + localStorage.length, JSON.stringify(newMember));

      // Add new members object to the model by adding it to the members array
      members.push(newMember);

    }
  }
})
  .factory('Bluetooth', ['$scope', function($scope) {
  return {
    pair: function() {
      window.bluetooth.pair(
        function () {
          console.log('Pairing Successful');
        },
        function (err) {
          console.log('There was an error Pairing to a device' + JSON.stringify(err));
        }, deviceaddress);
    }
  }
  }])
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);


