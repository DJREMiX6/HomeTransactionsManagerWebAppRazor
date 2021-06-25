using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeTransactionsManagerWebAppRazor.Models
{
    public class SingletonTestDataHolder
    {

        private static SingletonTestDataHolder _instance;

        public static SingletonTestDataHolder Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new SingletonTestDataHolder();
                return _instance;
            }
        }

        private SingletonTestDataHolder() {}

        public string Data { get; set; }

        public bool Available { get; set; }
    }
}
