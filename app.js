
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('member-details', {
      url: '/member/:memberId',
      templateUrl: 'templates/member_details.html',
      controller: 'MemberDetailCtrl'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'templates/add.html',
      controller: 'AddMemberCtrl',

    })
    .state('edit', {
      url: '/edit/:memberId',
      templateUrl: 'templates/edit.html',
      controller: 'MemberIndexCtrl'
    })

  //changed layout from tabbed to linked
    // setup an abstract state for the tabs directive
   /* .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })




    .state('tab.map', {
      url: '/map',
      views: {
        'map-tab': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl',
          controller: 'fileCtrl'
        }
      }
    })



    .state('tab.add', {
      url: '/add',
      views: {
        'add-tab': {
          templateUrl: 'templates/add.html',
          controller: 'fileCtrl'
        }
      }
    })

    .state('tab.edit', {
      url: '/edit',
      views: {
        'edit-tab': {
          templateUrl: 'templates/edit.html'
        }
      }
    })
/*
  .state('tab.member', {
    url: '/member/:memberId',
    views: {
      'member-tab': {
        templateUrl: 'templates/member_details.html',
        controller: 'MemberDetailCtrl'
      }
    }
  })
  */



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/map');

});


