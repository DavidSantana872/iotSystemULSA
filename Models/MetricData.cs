namespace backendIotSystemUlsa.Models{
    public class MetricData{
        public int Id {set; get;}
        public int StationsId {set; get;}
        public int MetricId {set; get;}
        public int Value {set; get;}
        public DateTime RegistrationDate {set; get;} = DateTime.Now;

        // Relaciones 
        public required MonitoringStations Stations {get; set;}
        public required Metric Metric {get; set;}
    }
}