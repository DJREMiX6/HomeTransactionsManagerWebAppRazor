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
    public class CreateModel : PageModel
    {

        private ApplicationDbContext _db;

        public CreateModel(ApplicationDbContext db)
        {
            _db = db;
        }

        [BindProperty]
        public Transaction Transaction { get; set; }

        public List<Person> People { get; set; }

        public async Task<IActionResult> OnGet()
        {
            People = await _db.People.ToListAsync();
            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if(ModelState.IsValid)
            {
                if(_db.People.FirstOrDefault(x => x.Id == Transaction.PeopleFK).Name == "Everyone")
                {
                    foreach(Person p in _db.People)
                    {
                        if (p.Name != "Everyone")
                        {
                            await _db.Transactions.AddAsync(new Transaction(Transaction.Amount, p.Id, Transaction.Date));
                        }
                    }
                    await _db.SaveChangesAsync();
                }
                else
                {
                    await _db.Transactions.AddAsync(Transaction);
                    await _db.SaveChangesAsync();
                }
                return RedirectToPage("Index");
            }
            else
            {
                return RedirectToPage("/Transactions/Create");
            }
        }
    }
}
