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
                .HasForeignKey<MonitoringStations>(ms => ms.SectorId) // la clave foranea es SectorId en MonitoringStation
                .OnDelete(DeleteBehavior.Restrict);       // si se elimina un sector, la estacion de monitoreo se pone en null

            // Configuración de la relación entre MetricData y MonitoringStations
            modelBuilder.Entity<MetricData>()
                .HasOne(md => md.Stations) // Una instancia de MetricData tiene una estación de monitoreo asociada
                .WithMany(ms => ms.Metrics)      // Una estación de monitoreo puede tener muchas instancias de MetricData
                .HasForeignKey(md => md.StationsId) // La clave foránea es StationsId en MetricData
                .OnDelete(DeleteBehavior.SetNull);  // Si se elimina la estación, StationsId se establece en null
        }
    }
}
