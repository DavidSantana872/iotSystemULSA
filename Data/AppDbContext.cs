using Microsoft.EntityFrameworkCore;
using backendIotSystemUlsa.Models;

namespace backendIotSystemUlsa.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Metric> Metrics { get; set; }
        public DbSet<Sectors> Sectors { get; set; }
        public DbSet<MonitoringStations> MonitoringStations { get; set; }
        public DbSet<MetricData> MetricData {get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // relacionn uno a uno entre MonitoringStation y Sectors
            modelBuilder.Entity<MonitoringStations>()
                .HasOne(ms => ms.Sector)                // una estacion de monitoreo tiene un sector
                .WithOne(s => s.MonitoringStation)      // un sector tiene una estacion de monitoreo
                .HasForeignKey<MonitoringStations>(ms => ms.SectorId)  // la clave foranea es SectorId en MonitoringStation
                .OnDelete(DeleteBehavior.Restrict);     // no permitir eliminar un sector si hay una estacion asociada
        }
    }
}
