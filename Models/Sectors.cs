namespace backendIotSystemUlsa.Models{
    public class Sectors{
        public int Id {set; get;}
        public required string Name {set; get;}
        public required MonitoringStations MonitoringStation {get; set;}
    }
}