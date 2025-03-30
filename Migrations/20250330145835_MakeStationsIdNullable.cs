using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendIotSystemUlsa.Migrations
{
    /// <inheritdoc />
    public partial class MakeStationsIdNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MetricData_MonitoringStations_StationsId",
                table: "MetricData");

            migrationBuilder.DropIndex(
                name: "IX_MonitoringStations_SectorId",
                table: "MonitoringStations");

            migrationBuilder.AlterColumn<int>(
                name: "SectorId",
                table: "MonitoringStations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StationsId",
                table: "MetricData",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringStations_SectorId",
                table: "MonitoringStations",
                column: "SectorId",
                unique: true,
                filter: "[SectorId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_MetricData_MonitoringStations_StationsId",
                table: "MetricData",
                column: "StationsId",
                principalTable: "MonitoringStations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MetricData_MonitoringStations_StationsId",
                table: "MetricData");

            migrationBuilder.DropIndex(
                name: "IX_MonitoringStations_SectorId",
                table: "MonitoringStations");

            migrationBuilder.AlterColumn<int>(
                name: "SectorId",
                table: "MonitoringStations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StationsId",
                table: "MetricData",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringStations_SectorId",
                table: "MonitoringStations",
                column: "SectorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MetricData_MonitoringStations_StationsId",
                table: "MetricData",
                column: "StationsId",
                principalTable: "MonitoringStations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
