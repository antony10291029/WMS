﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Runbow.TWS.Entity;

namespace Runbow.TWS.MessageContracts.WMS.Report
{
    public class GetSkuInAndOutBySearchConditionRequest
    {
        public ReportSkuInAndOutSearchCondition SkuInAndOutSearchCondition { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }
    }
}
