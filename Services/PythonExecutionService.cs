using System;
using System.Diagnostics;
using System.Threading.Tasks;
namespace backendIotSystemUlsa.Services;
public class PythonExecutionService
{
    public static async Task<string> RunPythonScriptAsync(string scriptPath, string arguments = "")
    {
        ProcessStartInfo start = new ProcessStartInfo
        {
            FileName = "python3", // O "python" dependiendo de tu configuración
            Arguments = $"{scriptPath} {arguments}",
            UseShellExecute = false, // Necesario para redirigir la salida
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true // O false si quieres que se muestre la ventana del proceso
        };

        using (Process process = new Process())
        {
            process.StartInfo = start;
            process.Start();

            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            if (!string.IsNullOrEmpty(error))
            {
                // Log del error o lanzar una excepción
                Console.WriteLine($"Error al ejecutar Python: {error}");
                throw new Exception($"Error al ejecutar Python: {error}");
            }

            return output;
        }
    }
}