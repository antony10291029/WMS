﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Runbow.TWS.Entity.WMS.Report
{
    public class ReportSKUChangeSearchCondition : ReportSKUChange
    {
        public DateTime? StartCreateTime { get; set; }
        public DateTime? EndCreateTime { get; set; }

    }
}
