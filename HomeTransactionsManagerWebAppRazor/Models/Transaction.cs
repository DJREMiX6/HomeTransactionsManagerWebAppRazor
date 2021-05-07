using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.Models
{
    public class Transaction
    {
        //VARS
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        [ForeignKey("People")]
        public int PeopleFK { get; set; }

        [Required]
        public DateTime Date { get; set; }

        //CTORS
        public Transaction() { }

        public Transaction(double amount, int peopleFK, DateTime date)
        {
            Amount = amount;
            PeopleFK = peopleFK;
            Date = date;
        }
    }
}
