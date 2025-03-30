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
                                        .FirstOrDefault()
                                )
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



        [HttpGet("sector/{sectorName}")]
        public async Task<IActionResult> GetMetricsBySector(string sectorName) {
            object? Data = null;
            int? idSector = await context.Sectors
                .Where(Sectr => Sectr.Name == sectorName)
                .Select(Sectr => Sectr.Id)
                .FirstOrDefaultAsync();
            if (idSector == null) {
                return NotFound();
            }else{
                // obtener el id de la estacion 
                int? idStation = await context.MonitoringStations
                    .Where(ms => ms.SectorId == idSector)
                    .Select(ms => ms.Id)
                    .FirstOrDefaultAsync();
                if (idStation == null) {
                    return NotFound();
                }else{
                    // obtener de data metrica los ultimos registro un maximo de 10 
                    Data = await context.Metrics
                        .Select(m => new {
                            Name = m.Name,
                            Data = context.MetricData
                                .Where(md => md.MetricId == m.Id && md.StationsId == idStation)
                                .Select(md => new {
                                    Value = md.Value,
                                    RegistrationDate = md.RegistrationDate
                                })
                                .OrderByDescending(md => md.RegistrationDate)
                                .Take(5)
                                .ToList()
                        })
                        .ToListAsync();
                    if (Data == null) {
                        return NotFound();
                    }else{
                        return Ok(Data);
                    }
                }
            }
        }
       
    }

}