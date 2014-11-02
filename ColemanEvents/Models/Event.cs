using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;

namespace ColemanEvents.Models
{
	public class Event
	{
		private ICollection<Assignment> _assignments;
		public string Id { get; set; }
		public string Name { get; set; }
		public string Date { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string MapUrl { get; set; }

		public ICollection<Assignment> Assignments
		{
			get { return _assignments ?? (_assignments = new Collection<Assignment>()); }
			set { _assignments = value; }
		}

		public bool IsDeleted { get; set; }
	}

	public class Assignment
	{
		public Assignment(string name)
		{
			Name = name;
			Id = Guid.NewGuid();
		}

		public Guid Id { get; set; }
		public bool IsAssigned { get; set; }
		public string AssignedTo { get; set; }
		public string Name { get; set; }
	}

	public class AppSettings
	{
		public string Id
		{
			get { return 1.ToString(CultureInfo.InvariantCulture); }
			set { }
		}

		public string DefaultEventId { get; set; }
	}
}