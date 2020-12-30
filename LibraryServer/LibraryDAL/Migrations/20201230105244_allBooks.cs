using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryDAL.Migrations
{
    public partial class allBooks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Magazines");

            migrationBuilder.DropTable(
                name: "Novels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudyBooks",
                table: "StudyBooks");

            migrationBuilder.RenameTable(
                name: "StudyBooks",
                newName: "AllBooks");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AllBooks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AllBooks",
                table: "AllBooks",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AllBooks",
                table: "AllBooks");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AllBooks");

            migrationBuilder.RenameTable(
                name: "AllBooks",
                newName: "StudyBooks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudyBooks",
                table: "StudyBooks",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Magazines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Author = table.Column<string>(type: "TEXT", nullable: true),
                    Discount = table.Column<uint>(type: "INTEGER", nullable: false),
                    InStock = table.Column<uint>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    PublishDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Magazines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Novels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Author = table.Column<string>(type: "TEXT", nullable: true),
                    Discount = table.Column<uint>(type: "INTEGER", nullable: false),
                    InStock = table.Column<uint>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    PublishDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Novels", x => x.Id);
                });
        }
    }
}
