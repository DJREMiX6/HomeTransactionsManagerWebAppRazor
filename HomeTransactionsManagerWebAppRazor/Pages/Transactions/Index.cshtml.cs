using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeTransactionsManagerWebAppRazor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace HomeTransactionsManagerWebAppRazor.Pages.Transactions
{
    public class Index : PageModel
    {

        private ApplicationDbContext _db;

        public List<Transaction> Transactions { get; set; }

        public List<Person> People { get; set; }

        public Index(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task OnGet()
        {
            Transactions = await _db.Transactions.OrderByDescending(x => x.Date).ToListAsync();
            People = await _db.People.OrderBy(x => x.Name).ToListAsync();
        }
    }
}
