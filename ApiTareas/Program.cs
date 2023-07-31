using CapaDato;
using CapaNegocio.Implementacion;
using CapaNegocio.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Configuro el acceso a los datos a traves de mi contexto con entityframework
builder.Services.AddDbContext<FitGroupContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("FitGroupConection"));
} );


//Configuro la interfaz para que el controlador las pueda usar
builder.Services.AddScoped<ITarea, LogicaTarea>();


//Creo mi nueva politica para habilitar el cors a la aplicacion front de react
builder.Services.AddCors(options => {

    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin();
        app.AllowAnyHeader();
        app.AllowAnyMethod();
    });

});

var app = builder.Build();



using (var scope = app.Services.CreateScope()) //Al momento de que se ejecute la api se genera la migracion
{
    var Context = scope.ServiceProvider.GetRequiredService<FitGroupContext>();
    Context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Uso la nueva politica cors
app.UseCors("NuevaPolitica");
app.UseAuthorization();

app.MapControllers();

app.Run();
