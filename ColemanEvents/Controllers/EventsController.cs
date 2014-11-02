using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ColemanEvents.Models;
using Raven.Client;
using Raven.Client.Document.Async;
using Raven.Client.Linq;

namespace ColemanEvents.Controllers
{
	public class EventsController : ApiController
	{
		[HttpGet]
		[Route("Api/Event")]
		public async Task<IHttpActionResult> GetEvents()
		{
			var events = await DocumentSession.Query<Event>().Where(e => e.IsDeleted == false).ToListAsync();
			return Ok(events);
		}

		[HttpGet]
		[Route("Api/Event/{id}")]
		public async Task<IHttpActionResult> GetEventById(string id)
		{
			var evnt = await DocumentSession.LoadAsync<Event>(id);
			return Ok(evnt);
		}

		[HttpPost]
		[Route("Api/Event/")]
		public async Task<IHttpActionResult> AddEvent(Event newEvent)
		{
			await DocumentSession.StoreAsync(newEvent);
			await DocumentSession.SaveChangesAsync();
			return Created("Api/Event/" + newEvent.Id, newEvent);
		}

		[HttpPost]
		[Route("Api/Event/AddAssignment")]
		public async Task<IHttpActionResult> AddAssignment(EventAddAssignmentRequest request)
		{
			var evnt = await DocumentSession.LoadAsync<Event>(request.Id);
			for (int i = 0; i < request.Count; i++)
			{
				evnt.Assignments.Add(new Assignment(request.AssignmentName));
			}
			await DocumentSession.SaveChangesAsync();
			return Ok(evnt);
		}

		[HttpPost]
		[Route("Api/Event/Assign")]
		public async Task<IHttpActionResult> Assign(EventAssignRequest request)
		{
			var evnt = await DocumentSession.LoadAsync<Event>(request.Id);
			var assignment = evnt.Assignments.Single(r => r.Id == request.AssignmentId);
			assignment.AssignedTo = request.AssignedTo;
			assignment.IsAssigned = true;
			await DocumentSession.SaveChangesAsync();
			return Ok(evnt);
		}

		[HttpPost]
		[Route("Api/Event/Default")]
		public async Task<IHttpActionResult> SetDefault(EventSetDefaultRequest request)
		{
			var appSettings = new AppSettings();
			appSettings.DefaultEventId = request.Id;
			await DocumentSession.StoreAsync(appSettings);
			await DocumentSession.SaveChangesAsync();
			return Ok();
		}

		[HttpGet]
		[Route("Api/Event/Default")]
		public async Task<IHttpActionResult> GetDefaultEvent()
		{
			var appSettings = await DocumentSession.LoadAsync<AppSettings>(1.ToString(CultureInfo.InvariantCulture));
			var evnt = await DocumentSession.LoadAsync<Event>(appSettings.DefaultEventId);
			return Ok(evnt);
		}


		public AsyncDocumentSession DocumentSession
		{
			get
			{
				return HttpContext.Current.Items["DocSession"] as AsyncDocumentSession;
			}
		}
	}

	public class EventAddAssignmentRequest
	{
		public string Id { get; set; }
		public string AssignmentName { get; set; }
		public int Count { get; set; }
	}

	public class EventAssignRequest
	{
		public string Id { get; set; }
		public Guid AssignmentId { get; set; }
		public string AssignedTo { get; set; }
	}

	public class EventSetDefaultRequest
	{
		public string Id { get; set; }
	}
}