angular.module('starter.services', [])


.factory('StorageService', function() {
  var members = [];
  return {
    all: function () {
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

.factory('Camera', ['$q', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }]);


