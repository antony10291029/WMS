﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Runbow.TWS.Entity
{
    public class SettledPodConfigs
    {
        [XmlElement("SettledPodConfig")]
        public List<SettledPodConfig> SettledPodConfigCollection { get; set; }
    }
}
