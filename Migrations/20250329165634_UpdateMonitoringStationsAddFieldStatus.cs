using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendIotSystemUlsa.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMonitoringStationsAddFieldStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "MonitoringStations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "MonitoringStations");
        }
    }
}
