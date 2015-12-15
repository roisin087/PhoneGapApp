var app = angular.module('starter.controllers', ['ionic']);

var newMember =[];
var lat;
var lng;
  app.controller('MapCtrl',['$scope', function ($scope) {

    function alertGeoLocation() {
     var onSuccess = function (position) {


       lat = position.coords.latitude;
       lng = position.coords.longitude;


         try{
         userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         var myOptions = {
           zoom : 15,
           center : userLatLng,
           mapTypeId : google.maps.MapTypeId.ROADMAP
         };

         // Draw the map
         var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
         // Place the marker
         new google.maps.Marker({
           map: mapObject,
           position: userLatLng
         });
       }
       catch(err){
         $scope.device_location = "Cannot display map your location is Latitutude: " + lat + "\nLongitude:" + lng;
       }


     };

      var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    }
//map listeners
    window.load = alertGeoLocation();
  //  document.addEventListener("deviceready", onDeviceReady, false);

   // function onDeviceReady() {
      // Now safe to use the PhoneGap API
    //  alertGeoLocation();
    //}


  }]);

function onError(PositionError){
  alert(PositionError.message);
  $scope.device_location = "Cannot display map your location is Latitutude: " + lat + "Longitude:" + lng;

}


/*

    $scope.deleteMember = function(index, item) {

      // index param is an ngRepeat variable
      // Read more here: docs.angularjs.org/api/ng/directive/ngRepeat

      // Delete item from localStorage
      localStorage.removeItem( 'item' + item.id );

      // Remove item from the contacts array
      $scope.members.splice( index, 1 );

    }

*/



  app.controller('MemberIndexCtrl', function($scope, StorageService) {

  $scope.members = StorageService.all();
});

app.controller('AddMemberCtrl', function($scope, StorageService) {



  $scope.addMember = function() {

    if (!$scope.addMemberForm.$error.required) {

      // Remove warning
      $scope.failed = '';
      // Store member data in an object

      var newMember = {
        id: 0,    // id is used to identify this property when being delete from  storage
        image: '' ,
        name: $scope.name,
        UUID: $scope.UUID,
        requirements: $scope.requirements,
        NOKname: $scope.NOKname,
        NOKcontact: $scope.NOKcontact
      };

      StorageService.add(newMember);

      // Reset the inputs values for the form

      $scope.name = '';
      $scope.UUID = '';
      $scope.requirements = '';
      $scope.NOKname = '';
      $scope.NOKcontact = '';
    } else {
      // Add warning
      $scope.failed = 'All fields must be filled.';
    }
  }

});

// A simple controller that shows a tapped item's data
  app.controller('MemberDetailCtrl', function($scope, $stateParams, StorageService) {

    $scope.member = StorageService.get($stateParams.memberId);
  });

app.controller('addImageCtrl', function($scope, Camera) {
  $scope.getPhoto = function () {
    console.log('Getting camera');

   Camera.getPicture({
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      }).then(function (imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;

      }, function (err) {
        console.err(err);
      });
      console.log('Got camera');
    }

})


/*

 function getPhoto() {

   function onSuccess(imageData) {
     var image = document.getElementById('myImage');
     image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
     alert('Failed because: ' + message);
   }
   navigator.camera.getPicture(onSuccess, onFail, {
     quality: 50,
     destinationType: Camera.DestinationType.DATA_URL
   });
 }


*/
