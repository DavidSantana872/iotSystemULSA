
namespace backendIotSystemUlsa.Models{
    public class MonitoringStations{
        public int Id {set; get;}
        public int? SectorId { get; set; }  

        public required string Status {set; get;}
        public required Sectors Sector {get; set;}

        // Relación con MetricData
        public List<MetricData> Metrics { get; set; } = new List<MetricData>();

        internal object Include(Func<object, object> value)
        {
            throw new NotImplementedException();
        }

        internal object ThenInclude(Func<object, object> value)
        {
            throw new NotImplementedException();
        }
    }
}