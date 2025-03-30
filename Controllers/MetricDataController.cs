using backendIotSystemUlsa.Data;
using backendIotSystemUlsa.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendIotSystemUlsa.Controllers{
    [ApiController]
    [Route("api/metrics")]
    public class MetricsDataController: ControllerBase{
        private readonly AppDbContext context;
        public MetricsDataController(AppDbContext context){
            this.context = context;
        }
      /*  public class MetricDataDto{
            public int Id { get; set; }
            public int StationsId { get; set; }
            public int MetricId { get; set; }
            public int Value { get; set; }
            public DateTime RegistrationDate { get; set; }
        }*/
        public class SectorDto{
            public int Id { get; set; }
            public string ?Name { get; set; }
        }

        [HttpGet]
        public async Task<IEnumerable<object>> Get() { // Cambiamos el tipo de retorno a IEnumerable<object> o un DTO específico para MetricData
            /*var orders = await context.MetricData
                .Select(o => new MetricDataDto {
                    Id = o.Id,
                    StationsId = o.StationsId,
                    MetricId = o.MetricId,
                    Value = o.Value,
                    RegistrationDate = o.RegistrationDate
                })
                .ToListAsync();*/

           /* var orders = await context.MetricData
                .Include(o => o.Stations)
                .ThenInclude(s => s.Sector)
                .Include(o => o.Metric)
                .Select(o => new
                {
                    o.Id,
                    o.StationsId,
                    o.MetricId,
                    o.Value,
                    o.RegistrationDate,
                    Stations = o.Stations == null ? null : new
                    {
                        o.Stations.Id,
                        o.Stations.SectorId,
                        o.Stations.Status,
                        Sector = o.Stations.Sector == null ? null : new SectorDto
                        {
                            Id = o.Stations.Sector.Id,
                            Name = o.Stations.Sector.Name
                        }
                    },
                    Metric = o.Metric
                })
                .ToListAsync();
                */
            var orders = await context.Sectors.Select(
                s => new {
                    Id = s.Id,
                    Name = s.Name,
                    MonitoringStations = context.MonitoringStations
                        .Where(ms => ms.SectorId == s.Id)
                        .Select(ms => new {
                            Id = ms.Id,
                            Status = ms.Status
                        }).FirstOrDefault(),
                    Data = context.Metrics.Select(
                        m => new {
                            Name = m.Name,
                            MetricData = context.MetricData
                                .Where(md => md.MetricId == m.Id && md.StationsId == 
                                    context.MonitoringStations
                                        .Where(ms => ms.SectorId == s.Id)
                                        .Select(ms => ms.Id)
                                        .FirstOrDefault())
                                .Select(md => new {
                                    Value = md.Value,
                                    RegistrationDate = md.RegistrationDate
                                })
                                .OrderByDescending(md => md.RegistrationDate)
                                .FirstOrDefault()
                        }
                    ).ToList()

                }
            ).ToListAsync();
            return orders;
        }
       
    }

}