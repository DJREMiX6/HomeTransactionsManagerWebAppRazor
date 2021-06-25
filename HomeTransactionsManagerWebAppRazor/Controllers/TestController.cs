using HomeTransactionsManagerWebAppRazor.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : Controller
    {

        public SingletonTestDataHolder singletonTestDataHolder => SingletonTestDataHolder.Instance;

        [HttpPost]
        public async Task<IActionResult> OnPost()
        {
            if(singletonTestDataHolder.Available)
            {
                singletonTestDataHolder.Available = false;
                return Json(new { data = singletonTestDataHolder.Data });
            }
            else
            {
                return null;
            }
        }

        [HttpPut]
        public async Task<IActionResult> OnPut(string data)
        {
            singletonTestDataHolder.Data = data;
            singletonTestDataHolder.Available = true;
            return Json(new { status = "ok" });
        }
    }
}
