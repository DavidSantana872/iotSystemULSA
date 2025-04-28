using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using backendIotSystemUlsa.Services; // Asegúrate de que el namespace sea correcto

namespace backendIotSystemUlsa.Controllers // Asegúrate de que este namespace coincida con la ubicación de tu controlador
{
    [ApiController]
    [Route("api/report")]    
    public class GenerateReportController : ControllerBase // Cambia el nombre de la clase si es diferente
    {
        private readonly PythonExecutionService _pythonService;
        private readonly string _pdfDirectory; // Usa una propiedad para el directorio

        public GenerateReportController(PythonExecutionService pythonService, IConfiguration configuration)
        {
            _pythonService = pythonService;
            // Obtén la ruta del directorio desde la configuración
            _pdfDirectory = configuration.GetValue<string>("PdfDirectory") ?? "/home/davidsantanag01/certificate_generator";  // Define una ruta por defecto si no está en la configuración
            if (!Directory.Exists(_pdfDirectory))
            {
                 Directory.CreateDirectory(_pdfDirectory); // Crea el directorio si no existe
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> ObtenerCertificado(string data)
        {
            string scriptPath = "/home/davidsantanag01/certificate_generator/certificate_generator.py";
            string pdfFileName = $"{data}";
            string fullPdfPath = Path.Combine(_pdfDirectory, pdfFileName);
            string arguments = $"--output \"{fullPdfPath}\""; 

            try
            {
                // Ejecutar el script Python que genera el PDF
                string result = await PythonExecutionService.RunPythonScriptAsync(scriptPath, arguments);
                Console.WriteLine($"Resultado del script Python: {result}");

                // Verificar si el archivo PDF se generó correctamente
                Console.WriteLine($"Ruta del PDF generado: {fullPdfPath}");
                if (System.IO.File.Exists($"{fullPdfPath}.pdf"))
                {
                    // Leer el archivo PDF como un array de bytes
                    byte[] pdfBytes = await System.IO.File.ReadAllBytesAsync($"{fullPdfPath}.pdf");

                    // Retornar el archivo PDF con el Content-Type correcto
                    return File(pdfBytes, "application/pdf", pdfFileName);
                }
                else
                {
                    return StatusCode(500, "Error: El script Python no generó el archivo PDF.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al ejecutar el script Python o leer el PDF: {ex.Message}");
            }
        }
          [HttpGet("validate")]
        public async Task<IActionResult> ValidarCertificado(string key)
        {
            string scriptPath = "/home/davidsantanag01/certificate_generator/certificate_validate.py";
            string pdfFileName = $"{key}";
            string fullPdfPath = Path.Combine(_pdfDirectory, pdfFileName);
            string arguments = $"--key \"{fullPdfPath}\""; 
            try
            {
                // Ejecutar el script Python que genera el PDF
                string result = await PythonExecutionService.RunPythonScriptAsync(scriptPath, arguments);
              
                if (!string.IsNullOrEmpty(result))
                {
        
                    // Retornar true or false 
                    return Ok(new { isValid = result.Replace("\n", "").Trim() });
                }
                else
                {
                    return StatusCode(500, "Error:  script Python no funciona.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al ejecutar el script Python : {ex.Message}");
            }
        }
    }
}

