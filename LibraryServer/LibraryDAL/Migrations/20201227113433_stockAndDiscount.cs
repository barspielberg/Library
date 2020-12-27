using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryDAL.Migrations
{
    public partial class stockAndDiscount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<uint>(
                name: "Discount",
                table: "StudyBooks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "InStock",
                table: "StudyBooks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "Discount",
                table: "Novels",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "InStock",
                table: "Novels",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "Discount",
                table: "Magazines",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "InStock",
                table: "Magazines",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "StudyBooks");

            migrationBuilder.DropColumn(
                name: "InStock",
                table: "StudyBooks");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Novels");

            migrationBuilder.DropColumn(
                name: "InStock",
                table: "Novels");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Magazines");

            migrationBuilder.DropColumn(
                name: "InStock",
                table: "Magazines");
        }
    }
}
