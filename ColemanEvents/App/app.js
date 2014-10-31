(function () {
	'use strict';

	angular.module('eventsApp', ['ngRoute'])
		.controller('EventListController', ['EventsService',
			function (eventsService) {
				var vm = this;
				vm.events = eventsService.getActiveEvents();
			}
		])
		.controller('AddEventController', ['$location', 'EventsService',
			function ($location, eventsService) {
				var vm = this;
				vm.addEvent = addEvent;

				function addEvent(newEvent) {
					eventsService.addEvent(newEvent);
					$location.path('/');
				}
			}
		])
		.controller('EventDetailsController', ['$routeParams', 'EventsService', 'NotificationService',
			function ($routeParams, eventsService, notificationService) {
				var vm = this;
				vm.event = eventsService.getEventById($routeParams.eventId);
				vm.takeAssignment = takeAssignment;

				function takeAssignment(assignment) {
					if (!assignment.assignedTo) {
						notificationService.error('You must enter your name before clicking the button to take the assignment');
					} else {
						eventsService.assign(assignment);
					}
				}
			}
		])
		.factory('EventsService', ['$http',
			function ($http) {

				var events = [
					{
						id: 1,
						name: 'Thanksgiving 2014',
						date: '11/27/2014 @ 2:00PM',
						imageUrl: '/images/turkey.jpg',
						addressLine1: '12200 S 3600 W',
						addressLine2: 'Riverton, UT 84065',
						mapUrl: 'http://goo.gl/QhWc61',
						assignments: [
							{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
							{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
							{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
							{ isAssigned: false, assignedTo: null, name: 'Large pan of sweet potato casserole' },
							{ isAssigned: false, assignedTo: null, name: 'Green bean casserole' },
							{ isAssigned: false, assignedTo: null, name: 'Pot of mashed potatoes' },
							{ isAssigned: false, assignedTo: null, name: 'Pot of mashed potatoes' },
							{ isAssigned: false, assignedTo: null, name: 'Turkey, dressing and gravy' },
							{ isAssigned: false, assignedTo: null, name: 'Turkey, dressing and gravy' },
							{ isAssigned: false, assignedTo: null, name: 'Veggie tray and olives' },
							{ isAssigned: false, assignedTo: null, name: 'Cranberry sauce' }
						]
					}
				];

				return {
					getActiveEvents: getActiveEvents,
					addEvent: addEvent,
					getEventById: getEventById,
					assign: assign
				};

				function assign(assignment) {
					assignment.isAssigned = true;
				}

				function getEventById(eventId) {
					if (eventId) {
						for (var i = 0; i < events.length; i++) {
							if (events[i].id == eventId) {
								return events[i];
							}
						}
					}
					return null;
				}

				function addEvent(newEvent) {
					if (newEvent) {
						events.push(newEvent);
					}
				}

				function getActiveEvents() {
					return events;
				}
			}
		])
		.factory('NotificationService', [
			function () {

				toastr.options = {
					"closeButton": true,
					"positionClass": "toast-top-full-width",
					"showDuration": "300",
					"hideDuration": "1000",
					"timeOut": "5000",
					"extendedTimeOut": "1000",
					"showEasing": "swing",
					"hideEasing": "linear",
					"showMethod": "fadeIn",
					"hideMethod": "fadeOut"
				};

				return {
					error: error,
					info: info,
					success: success,
					warning: warning
				};

				function error(message) {
					toastr.error(message);
				}

				function info(message) {
					toastr.info(message);
				}

				function success(message) {
					toastr.success(message);
				}

				function warning(message) {
					toastr.warning(message);
				}
			}
		])
		.config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '/App/event-list.html',
					controller: 'EventListController',
					controllerAs: 'vm'
				})
				.when('/add', {
					templateUrl: '/App/add-event.html',
					controller: 'AddEventController',
					controllerAs: 'vm'
				})
				.when('/details/:eventId', {
					templateUrl: '/App/event-details.html',
					controller: 'EventDetailsController',
					controllerAs: 'vm'
				})
				.otherwise('/');
		});
})();