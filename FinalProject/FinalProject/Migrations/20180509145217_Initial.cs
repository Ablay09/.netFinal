using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FinalProject.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Raions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Nalog = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Arendas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Finish = table.Column<DateTime>(nullable: false),
                    RaionId = table.Column<int>(nullable: false),
                    Start = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arendas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Arendas_Raions_RaionId",
                        column: x => x.RaionId,
                        principalTable: "Raions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kvartiras",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Address = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    RaionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kvartiras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kvartiras_Raions_RaionId",
                        column: x => x.RaionId,
                        principalTable: "Raions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Details",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ArendaId = table.Column<int>(nullable: false),
                    KvartiraId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Details", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Details_Arendas_ArendaId",
                        column: x => x.ArendaId,
                        principalTable: "Arendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Details_Kvartiras_KvartiraId",
                        column: x => x.KvartiraId,
                        principalTable: "Kvartiras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arendas_RaionId",
                table: "Arendas",
                column: "RaionId");

            migrationBuilder.CreateIndex(
                name: "IX_Details_ArendaId",
                table: "Details",
                column: "ArendaId");

            migrationBuilder.CreateIndex(
                name: "IX_Details_KvartiraId",
                table: "Details",
                column: "KvartiraId");

            migrationBuilder.CreateIndex(
                name: "IX_Kvartiras_RaionId",
                table: "Kvartiras",
                column: "RaionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Details");

            migrationBuilder.DropTable(
                name: "Arendas");

            migrationBuilder.DropTable(
                name: "Kvartiras");

            migrationBuilder.DropTable(
                name: "Raions");
        }
    }
}
