using System.Web.Http;
using Raven.Client.Document;
using Raven.Client.Document.Async;

namespace ColemanEvents
{
	public class WebApiApplication : System.Web.HttpApplication
	{
		public WebApiApplication()
		{
			BeginRequest += (sender, args) =>
			{
				Request.RequestContext.HttpContext.Items["DocSession"] = DocumentStore.OpenAsyncSession();
			};

			EndRequest += (sender, args) =>
			{
				var session = Request.RequestContext.HttpContext.Items["DocSession"] as AsyncDocumentSession;
				if (session != null)
				{
					session.Dispose();
				}
			};

		}

		public static DocumentStore DocumentStore { get; set; }
		protected void Application_Start()
		{
			GlobalConfiguration.Configure(WebApiConfig.Register);
			DocumentStore = new DocumentStore()
			{
				ConnectionStringName = "RavenDB"
			};
			DocumentStore.Conventions.IdentityPartsSeparator = "-";
			DocumentStore.Initialize();
		}
	}
}
