using backendIotSystemUlsa.Data;
using backendIotSystemUlsa.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendIotSystemUlsa.Controllers
{

    [ApiController]
    [Route("api/stations")]
    public class StationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Stations
        [HttpGet]
        //public async Task<ActionResult<IEnumerable>> GetStations()
        public async Task<IEnumerable<object>> Get(){
            return await _context.MonitoringStations.Where(
                Station => Station.Status == "Online"
            )
            .Select(Station => new {
                Station.Id,
                Station.Status,
                Station.SectorId,
                Sector = Station.Sector == null ? null : new {
                    Station.Sector.Id,
                    Station.Sector.Name
                }
            })
            .ToListAsync();
        }
    }
}