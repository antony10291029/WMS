﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Runbow.TWS.Entity.WMS.Product
{
    public class UpdateSearchCondition
    {
        public IEnumerable<ProductStorer> SearchCondition { get; set; }

        public int typeid { get; set; }
    }
}