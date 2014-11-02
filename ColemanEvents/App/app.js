(function () {
	'use strict';

	angular.module('eventsApp', ['ngRoute'])
		.config(function ($routeProvider) {
			$routeProvider
				.when('/list', {
					templateUrl: '/App/event-list.html',
					controller: 'EventListController',
					controllerAs: 'vm'
				})
				.when('/add', {
					templateUrl: '/App/add-event.html',
					controller: 'AddEventController',
					controllerAs: 'vm'
				})
				.when('/assignments/:eventId', {
					templateUrl: '/App/assignments.html',
					controller: 'AssignmentsController',
					controllerAs: 'vm'
				})
				.when('/details/:eventId', {
					templateUrl: '/App/event-details.html',
					controller: 'EventDetailsController',
					controllerAs: 'vm'
				})
				.when('/', {
					templateUrl: '/App/event-details.html',
					controller: 'EventDetailsController',
					controllerAs: 'vm'
				})
				.otherwise('/');
		});
})();