var app = angular.module('starter.controllers', ['ionic']);

var newMember = [];
var lat;
var lng;
var imgPath;

app.controller('MapCtrl', ['$scope', function ($scope) {

  function alertGeoLocation() {
    var onSuccess = function (position) {


      lat = position.coords.latitude;
      lng = position.coords.longitude;


      try {
        userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        user1 = new google.maps.LatLng(position.coords.latitude - 0.001, position.coords.longitude + 0.001);
        user2 = new google.maps.LatLng(position.coords.latitude - 0.002, position.coords.longitude + 0.0005);
        var myOptions = {
          zoom: 15,
          center: userLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Draw the map
        var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        // Place the marker
        new google.maps.Marker({
          map: mapObject,
          position: userLatLng,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
        });
        var marker1 = new google.maps.Marker({
          position: user1,
          map: mapObject,
          animation: google.maps.Animation.DROP,
          label: 'Harry',
          icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
        });
        var marker2 = new google.maps.Marker({
          position: user2,
          map: mapObject,
          animation: google.maps.Animation.DROP,
          label: 'Ted',
          icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
        });

      }
      catch (err) {
        $scope.device_location = "Cannot display map your location is Latitutude: " + lat + "\nLongitude:" + lng;
      }


    };

    var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy: true};
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

function onError(PositionError) {
  alert(PositionError.message);
  $scope.device_location = "Cannot display map your location is Latitutude: " + lat + "Longitude:" + lng;

}




app.controller('MemberIndexCtrl', function ($scope, StorageService) {

  $scope.members = StorageService.all();

});

app.controller('AddMemberCtrl', function ($scope, StorageService) {
  $scope.lastPhoto = "img/avatar.png";


  $scope.addMember = function () {

    if (!$scope.addMemberForm.$error.required) {

      // Remove warning
      $scope.failed = '';
      // Store member data in an object

      var newMember = {
        id: 0,    // id is used to identify this property when being delete from  storage
        image: imgPath,
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
app.controller('MemberDetailCtrl', function ($scope, $stateParams, StorageService) {

  $scope.member = StorageService.get($stateParams.memberId);
});

app.controller('addImageCtrl', function ($scope, Camera) {
  $scope.getPhoto = function () {
    console.log('Getting camera');

    Camera.getPicture({
      quality: 75,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(function (imageURI) {
      $scope.lastPhoto = imageURI;
      imgPath = imageURI;
    }, function (err) {
      console.err(err);
    });
    console.log('Got camera');
  }

});


app.controller('BluetoothCtrl', function ($scope, Bluetooth) {
  $scope.findDevices = function () {
    Bluetooth.pair();
  }

});
