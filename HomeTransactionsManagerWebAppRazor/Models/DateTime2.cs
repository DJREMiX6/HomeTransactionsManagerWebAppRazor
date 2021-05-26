using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.ObjectModel
{
    public struct DateTime2
    {
        private int _day;
        private int _month;
        private int _year;
        private int _hour;
        private int _minute;
        private int _second;

        public readonly int Day => _day;
        public readonly int Month => _month;
        public readonly int Year => _year;
        public readonly int Hour => _hour;
        public readonly int Minute => _minute;
        public readonly int Second => _second;

        public static DateTime2 Now => new DateTime2(DateTime.Now);

        public DateTime2(DateTime dateTime)
        {
            _day = dateTime.Day;
            _month = dateTime.Month;
            _year = dateTime.Year;
            _hour = dateTime.Hour;
            _minute = dateTime.Minute;
            _second = dateTime.Second;
        }

        public DateTime ToDateTime()
        {
            return DateTime.Parse(this.ToString());
        }

        public override string ToString()
        {
            return $"{DateTime.Now.Day}/{DateTime.Now.Month}/{DateTime.Now.Year} {DateTime.Now.Hour}:{DateTime.Now.Minute}:{DateTime.Now.Second}";
        }
    }
}
