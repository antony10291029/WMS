﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Runbow.TWS.Entity.InventoryApi;

namespace Runbow.TWS.MessageContracts.Inventory
{
   public class SampleStockResponses
    {
       public IEnumerable<SampleStockSelect> SampleSS;
       public int RowCount { get; set; }
    }
}
