namespace backendIotSystemUlsa.Models{
    public class MetricData{
        public int Id {set; get;}
        public int ?StationsId {set; get;}
        public int MetricId {set; get;}
        public double Value {set; get;}
        public DateTime RegistrationDate {set; get;} = DateTime.Now;

        // Relaciones 
        public  MonitoringStations ?Stations {get; set;}
        public  Metric ?Metric {get; set;}
    }
}