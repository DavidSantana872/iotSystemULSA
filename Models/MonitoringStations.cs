namespace backendIotSystemUlsa.Models{
    public class MonitoringStations{
        public int Id {set; get;}
        public int SectorId {set; get;}
        public required string Status {set; get;}
        public required Sectors Sector {get; set;}
    }
}