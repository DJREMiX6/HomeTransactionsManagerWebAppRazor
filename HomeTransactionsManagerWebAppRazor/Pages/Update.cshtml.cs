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
    public class UpdateModel : PageModel
    {

        private readonly ApplicationDbContext _db;

        public UpdateModel(ApplicationDbContext db)
        {
            _db = db;
        }

        [BindProperty]
        public Transaction Transaction { get; set; }

        public Person Person { get; set; }

        public List<Person> People { get; set; }

        public async Task<IActionResult> OnGet(int id)
        {
            if(id == 0)
            {
                return RedirectToPage("Index");
            }
            else
            {
                Transaction = await _db.Transactions.FirstOrDefaultAsync(x => x.Id == id);
                People = await _db.People.ToListAsync();
                if(Transaction == null)
                {
                    return RedirectToPage("Index");
                }
                else
                {
                    Person = await _db.People.FirstOrDefaultAsync(x => x.Id == Transaction.PeopleFK);

                    return Page();
                }
            }
        }
        
        public async Task<IActionResult> OnPost()
        {
            if(ModelState.IsValid)
            {
                Transaction trans = await _db.Transactions.FirstOrDefaultAsync(x => x.Id == Transaction.Id);
                trans.Amount = Transaction.Amount;
                trans.Date = Transaction.Date;
                trans.PeopleFK = Transaction.PeopleFK;
                await _db.SaveChangesAsync();
                return RedirectToPage("Index");
            }
            else
            {
                return RedirectToPage("Update", new { id = Transaction.Id }); 
            }
        }
    }
}
