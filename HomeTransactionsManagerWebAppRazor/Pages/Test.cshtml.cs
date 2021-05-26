using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace HomeTransactionsManagerWebAppRazor.Pages
{
    public class TestModel : PageModel
    {

        public IConfiguration Configuration { get; set; }

        public TestModel(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IActionResult OnGet()
        {
            if(Configuration.GetValue<bool>("Development"))
            {
                return Page();
            }
            return RedirectToPage("Index");
        }
    }
}
