using Microsoft.EntityFrameworkCore;
using backendIotSystemUlsa.Data;


var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registra tu PythonExecutionService aquí
builder.Services.AddScoped<backendIotSystemUlsa.Services.PythonExecutionService>();


// Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()  // Permite cualquier origen
                  .AllowAnyMethod()  // Permite cualquier método (GET, POST, etc.)
                  .AllowAnyHeader(); // Permite cualquier cabecera
        });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


// Agregar servicio 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);


var app = builder.Build();

app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();
if (!app.Environment.IsDevelopment()){
    app.UseHttpsRedirection();
}
app.UseAuthorization();

app.MapControllers();

app.Run();
