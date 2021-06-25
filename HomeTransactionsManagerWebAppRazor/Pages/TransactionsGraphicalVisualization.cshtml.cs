using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeTransactionsManagerWebAppRazor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace HomeTransactionsManagerWebAppRazor.Pages
{
    public class TransactionsGraphicalVisualizationModel : PageModel
    {

        private ApplicationDbContext _db;

        public TransactionsGraphicalVisualizationModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public List<Transaction> Transactions { get; set; }

        public List<Person> People { get; set; }

        public async Task<IActionResult> OnGet(int month, int year)
        {
            if(month == 0 && year == 0)
            {   
                DateTime today = DateTime.Now;
                month = today.Month;
                year = today.Year;
                return RedirectToPage(new { month = month - 1, year = year });
            }
            Transactions = await _db.Transactions.Where(x => x.Date.Month == month + 1 && x.Date.Year == year).ToListAsync();
            People = await _db.People.ToListAsync();
            return Page();
        }
    }
}
