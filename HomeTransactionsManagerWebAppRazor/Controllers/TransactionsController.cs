using HomeTransactionsManagerWebAppRazor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace HomeTransactionsManagerWebAppRazor.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private readonly ApplicationDbContext _db;

        public TransactionsController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int month, int year, bool all)
        {
            var data = _db.Transactions.Join(_db.People, t => t.PeopleFK, p => p.Id, (t, p) => new TransactionPersonJoined()
            {
                Id = t.Id,
                Person = p.Name,
                Amount = t.Amount,
                Date = t.Date,
                Day = t.Date.Day
            });

            if (!all)
            {
                data = _db.Transactions.Join(_db.People, t => t.PeopleFK, p => p.Id, (t, p) => new TransactionPersonJoined()
                {
                    Id = t.Id,
                    Person = p.Name,
                    Amount = t.Amount,
                    Date = t.Date,
                    Day = t.Date.Day
                }).Where(x => x.Date.Month == month && x.Date.Year == year && x.Amount < 0);
            }

            return Json(new { data = await data.OrderByDescending(x => x.Date).ToListAsync() }, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            bool error = false;
            Transaction transactionToDelete = await _db.Transactions.FirstOrDefaultAsync(x => x.Id == id);
            if(transactionToDelete != null)
            {
                _db.Remove(transactionToDelete);
                await _db.SaveChangesAsync();
            }
            else
            {
                error = true;
            }

            return Json(new { error = error });
        }
    }
}
