using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarWarehouseAPI.Data;
using CarWarehouseAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Dodaj DbContext do kontenera usług
builder.Services.AddDbContext<CarWarehouseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); // Zmieniono na PostgreSQL

// Dodaj usługi kontrolerów
builder.Services.AddControllers();

// Dodaj usługę CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
            //.AllowCredentials();
        });
});

var app = builder.Build();

// Użyj polityki CORS
app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Użyj migracji przy uruchamianiu aplikacji
using (var serviceScope = app.Services.CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<CarWarehouseContext>();
    dbContext.Database.Migrate();
}

app.Run();
