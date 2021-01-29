﻿using System;

namespace Runbow.TWS.Exceptions
{
    [Serializable]
    public class DataAccessLayerException : Exception
    {
        public DataAccessLayerException(string message)
            : base(message)
        {
        }

        public DataAccessLayerException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}