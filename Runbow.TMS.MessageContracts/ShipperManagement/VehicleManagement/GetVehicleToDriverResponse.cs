﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Runbow.TWS.Entity.ShipperManagement.DriverManagement;
using Runbow.TWS.Entity.ShipperManagement.VehicleManagement;

namespace Runbow.TWS.MessageContracts.ShipperManagement.VehicleManagement
{
    public class GetVehicleToDriverResponse
    {
        public IEnumerable<VehicleToDriver> VehicleToDriverCollection { get; set; }

        public IEnumerable<CRMDriver> Driver { get; set; }

        public int PageCount { get; set; }

        public int PageIndex { get; set; }
    }
}
