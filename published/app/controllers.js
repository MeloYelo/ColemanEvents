(function (app) {
	'use strict';

	app.controller('EventListController', [
			'EventsService', 'NotificationService',
			function (eventsService, notificationService) {
				var vm = this;
				vm.makeDefaultEvent = function (event) {
					eventsService.setDefaultEventId(event.id).then(function() {
						notificationService.success('Default event has been updated');
					});
				};

				eventsService.getActiveEvents().then(function (data) {
					vm.events = data;
				}, function () {
					notificationService.error('There was a problem getting the events');
				});
			}
	])
		.controller('AddEventController', [
			'$location', 'EventsService',
			function ($location, eventsService) {
				var vm = this;
				vm.addEvent = addEvent;

				function addEvent(newEvent) {
					newEvent.assignments = [];
					eventsService.addEvent(newEvent).then(function (data) {
						$location.path('/assignments/' + data.id);
					});
				}
			}
		])
		.controller('EventDetailsController', [
			'$routeParams', 'EventsService', 'NotificationService',
			function ($routeParams, eventsService, notificationService) {
				var vm = this;
				vm.event = {};
				if ($routeParams.eventId) {
					eventsService.getEventById($routeParams.eventId).then(function (data) {
						vm.event = data;
					});
				} else {
					eventsService.getDefaultEvent().then(function (data) {
						vm.event = data;
					});
				}
				vm.takeAssignment = takeAssignment;

				function takeAssignment(assignment) {
					if (!assignment.assignedTo) {
						notificationService.error('You must enter your name before clicking the button to take the assignment');
					} else {
						eventsService.assign(vm.event.id, assignment).then(function (data) {
							vm.event = data;
						});
					}
				}
			}
		])
		.controller('AssignmentsController', [
			'$routeParams', 'EventsService', 'NotificationService',
			function ($routeParams, eventsService, notificationService) {
				var vm = this;
				vm.event = {};
				eventsService.getEventById($routeParams.eventId).then(function (data) {
					vm.event = data;
				});
				vm.addAssignment = addAssignment;

				function addAssignment(newAssignment) {
					if (!newAssignment || !newAssignment.name) {
						notificationService.error('The assignment must have a name');
					} else {
						if (!newAssignment.count) {
							newAssignment.count = 1;
						}
						eventsService.addAssignment(vm.event.id, newAssignment.name, newAssignment.count).then(function (data) {
							vm.event = data;
							vm.newAssignment = {};
						});
					}
				}
			}
		]);

})(angular.module('eventsApp'));