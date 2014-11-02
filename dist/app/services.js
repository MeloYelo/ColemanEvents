
(function (app) {
	'use strict';

	app.factory('EventsService', [
			'$http',
			function ($http) {

				//var events = [
				//	{
				//		id: 1,
				//		name: 'Thanksgiving 2014',
				//		date: '11/27/2014 @ 2:00PM',
				//		addressLine1: '12200 S 3600 W',
				//		addressLine2: 'Riverton, UT 84065',
				//		mapUrl: 'http://goo.gl/QhWc61',
				//		assignments: [
				//			{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
				//			{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
				//			{ isAssigned: false, assignedTo: null, name: '3 dozen rolls and 1 cube butter' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pie and topping' },
				//			{ isAssigned: false, assignedTo: null, name: 'Large pan of sweet potato casserole' },
				//			{ isAssigned: false, assignedTo: null, name: 'Green bean casserole' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pot of mashed potatoes' },
				//			{ isAssigned: false, assignedTo: null, name: 'Pot of mashed potatoes' },
				//			{ isAssigned: false, assignedTo: null, name: 'Turkey, dressing and gravy' },
				//			{ isAssigned: false, assignedTo: null, name: 'Turkey, dressing and gravy' },
				//			{ isAssigned: false, assignedTo: null, name: 'Veggie tray and olives' },
				//			{ isAssigned: false, assignedTo: null, name: 'Cranberry sauce' }
				//		]
				//	}
				//];

				return {
					getActiveEvents: getActiveEvents,
					addEvent: addEvent,
					getEventById: getEventById,
					getDefaultEvent: getDefaultEvent,
					setDefaultEventId: setDefaultEventId,
					assign: assign,
					addAssignment: addAssignment
				};

				function assign(eventId, assignment) {
					return $http.post('/Api/Event/Assign', { id: eventId, assignmentId: assignment.id, assignedTo: assignment.assignedTo }).then(function (response) {
						return response.data;
					});

				}

				function getEventById(eventId) {
					return $http.get('/Api/Event/' + eventId).then(function (data) {
						return data.data;
					});
				}

				function getDefaultEvent() {
					return $http.get('/Api/Event/Default').then(function (data) {
						return data.data;
					});
				}

				function setDefaultEventId(eventId) {
					return $http.post('/Api/Event/Default', { id: eventId });
				}

				function addEvent(newEvent) {
					if (newEvent) {
						return $http.post('/Api/Event', newEvent).then(function (response) {
							return response.data;
						});
					}
					return null;
				}

				function addAssignment(eventId, assignmentName, count) {
					if (eventId && assignmentName) {
						return $http.post('/Api/Event/AddAssignment', { id: eventId, assignmentName: assignmentName, count: count }).then(function (response) {
							return response.data;
						});
					}
				}

				function getActiveEvents() {
					return $http.get('/Api/Event').then(function (data) {
						return data.data;
					});
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
		]);
})(angular.module('eventsApp'));