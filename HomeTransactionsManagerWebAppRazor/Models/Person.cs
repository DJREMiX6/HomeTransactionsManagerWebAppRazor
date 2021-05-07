using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.Models
{
    public class Person
    {
        //VARS
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        //CTORS

        public Person() { }

        public Person(string name)
        {
            Name = name;
        }
    }
}
