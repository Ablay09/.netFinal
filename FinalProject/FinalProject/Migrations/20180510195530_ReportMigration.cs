using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FinalProject.Migrations
{
    public partial class ReportMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Report",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ArendaId = table.Column<int>(nullable: false),
                    KvartiraId = table.Column<int>(nullable: false),
                    RaionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Report", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Report_Arendas_ArendaId",
                        column: x => x.ArendaId,
                        principalTable: "Arendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Report_Kvartiras_KvartiraId",
                        column: x => x.KvartiraId,
                        principalTable: "Kvartiras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Report_Raions_RaionId",
                        column: x => x.RaionId,
                        principalTable: "Raions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Report_ArendaId",
                table: "Report",
                column: "ArendaId");

            migrationBuilder.CreateIndex(
                name: "IX_Report_KvartiraId",
                table: "Report",
                column: "KvartiraId");

            migrationBuilder.CreateIndex(
                name: "IX_Report_RaionId",
                table: "Report",
                column: "RaionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Report");
        }
    }
}
