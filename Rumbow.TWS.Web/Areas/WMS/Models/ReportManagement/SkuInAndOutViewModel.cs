﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Runbow.TWS.Entity;
using Runbow.TWS.Web.Common;

namespace Runbow.TWS.Web.Areas.WMS.Models.ReportManagement
{
    [Serializable]
    public class SkuInAndOutViewModel
    {
        public Table Config { get; set; }
        public bool ShowCustomerOrShipperDrop { get; set; }
        public bool IsInnerUser { get; set; }
        public long ProjectRoleID { get; set; }
        public ReportSkuInAndOutSearchCondition SearchCondition { get; set; }
        public IEnumerable<ReportSkuInAndOut> ReportSkuInAndOutCollection { get; set; }
        public int PageIndex { get; set; }
        public int PageCount { get; set; }
        public IEnumerable<SelectListItem> InventoryTypes
        {
            get
            {
                IEnumerable<WMSConfig> wms = ApplicationConfigHelper.GetWMS_Config("");
                List<SelectListItem> st = new List<SelectListItem>();
                foreach (WMSConfig w in wms)
                {
                    st.Add(new SelectListItem() { Value = w.Code, Text = w.Name });
                }
                return st;
            }
        }
    }
}