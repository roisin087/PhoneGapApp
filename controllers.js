var app = angular.module('starter.controllers', ['ionic']);



// A simple controller that fetches a list of data from a service
  app.controller('PetIndexCtrl', function($scope, StorageService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();


});

// A simple controller that shows a tapped item's data
  app.controller('PetDetailCtrl', function($scope, $stateParams, StorageService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = StorageService.get($stateParams.petId);


});

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



     //alert("Latitutude: " + position.coords.latitude + "Longitude:" + position.coords.longitude);

     }

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
  alert("Cannot display map your location is Latitutude: " + lat + "Longitude:" + lng);
  // $scope.device_location = "Cannot display map your location is Latitutude: " + lat + "Longitude:" + lng;

  //alert("Latitude" +position.coords.latitude);
  //alert("Cannot display map your location is Latitutude: " + lat + "Longitude:" + lng);
}


app.controller('fileCtrl', ['$scope', function ($scope) {


  $scope.members = [];  // Array that will hold all contacts
  $scope.failed = '';    // A message displayed if the form fails to submit

 if(window.localStorage.length>0) {
    // For each item in local storage...
    for (item in localStorage) {

      // Parse the JSON string and add it to contacts array
      var newItem = JSON.parse(localStorage[item]);

      $scope.members.push(newItem);

    }

 }
  else{
   $scope.error = "No Memebers";
 }



  // Submit new contact with values from the form fields, then reset values of the fields
  $scope.addMember = function() {


    // If all required fields are complete
    if( !$scope.addMemberForm.$error.required ) {

      // Remove warning
      $scope.failed = '';
      // Store member data in an object
      var newMember = {
        id: localStorage.length,    // id is used to identify this property when being delete from  storage
        name: $scope.name,
        UUID: $scope.UUID,
        requirements: $scope.requirements,
        NOKname: $scope.NOKname,
        NOKcontact: $scope.NOKcontact
      };

      // Add member object to localStorage as the value to a new property
      localStorage.setItem( 'item' + localStorage.length, JSON.stringify(newMember) );

      // Add new members object to the model by adding it to the contacts array
      $scope.members.push( newMember );

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

  };

  $scope.deleteMember = function(index, item) {

    // index param is an ngRepeat variable
    // Read more here: docs.angularjs.org/api/ng/directive/ngRepeat

    // Delete item from localStorage
    localStorage.removeItem( 'item' + item.id );

    // Remove item from the contacts array
    $scope.members.splice( index, 1 );

  }
}]);

