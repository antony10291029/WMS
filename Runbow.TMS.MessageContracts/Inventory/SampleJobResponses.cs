﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Runbow.TWS.Entity.InventoryApi;

namespace Runbow.TWS.MessageContracts.Inventory
{
   public class SampleJobResponses
    {
        public IEnumerable<SampleJobSelect> SampleJob { get; set; }
        public int RowCount { get; set; }
    }
}
