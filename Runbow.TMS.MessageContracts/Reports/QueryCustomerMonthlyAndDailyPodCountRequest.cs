﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Runbow.TWS.MessageContracts
{
    public class QueryCustomerMonthlyAndDailyPodCountRequest : QueryCustomerYearPodCountRequest
    {
        public long CustomerID { get; set; }
    }
}
