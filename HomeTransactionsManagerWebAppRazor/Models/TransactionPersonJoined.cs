using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.Models
{
    public class TransactionPersonJoined
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public string Person { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime Date { get; set; }
        public int Day { get; set; }
    }
}
