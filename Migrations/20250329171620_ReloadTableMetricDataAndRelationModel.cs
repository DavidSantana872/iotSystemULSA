using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendIotSystemUlsa.Migrations
{
    /// <inheritdoc />
    public partial class ReloadTableMetricDataAndRelationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MetricData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StationsId = table.Column<int>(type: "int", nullable: false),
                    MetricId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetricData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetricData_Metrics_MetricId",
                        column: x => x.MetricId,
                        principalTable: "Metrics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetricData_MonitoringStations_StationsId",
                        column: x => x.StationsId,
                        principalTable: "MonitoringStations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MetricData_MetricId",
                table: "MetricData",
                column: "MetricId");

            migrationBuilder.CreateIndex(
                name: "IX_MetricData_StationsId",
                table: "MetricData",
                column: "StationsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MetricData");
        }
    }
}
