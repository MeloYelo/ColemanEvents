using System.Web;
using System.Web.Http;
using Raven.Client.Document.Async;

namespace ColemanEvents.Controllers
{
	public class EventsController:ApiController
	{
		public AsyncDocumentSession DocumentSession
		{
			get
			{
				return  HttpContext.Current.Items["DocSession"] as AsyncDocumentSession;
			}
		}
	}
}