﻿// <auto-generated />
using System;
using LibraryDAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LibraryDAL.Migrations
{
    [DbContext(typeof(LibraryContext))]
    [Migration("20201230105244_allBooks")]
    partial class allBooks
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("LibraryCommon.Models.AbstractBook", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Author")
                        .HasColumnType("TEXT");

                    b.Property<uint>("Discount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<uint>("InStock")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AllBooks");

                    b.HasDiscriminator<string>("Discriminator").HasValue("AbstractBook");
                });

            modelBuilder.Entity("LibraryCommon.Models.Magazine", b =>
                {
                    b.HasBaseType("LibraryCommon.Models.AbstractBook");

                    b.HasDiscriminator().HasValue("Magazine");
                });

            modelBuilder.Entity("LibraryCommon.Models.Novel", b =>
                {
                    b.HasBaseType("LibraryCommon.Models.AbstractBook");

                    b.HasDiscriminator().HasValue("Novel");
                });

            modelBuilder.Entity("LibraryCommon.Models.StudyBook", b =>
                {
                    b.HasBaseType("LibraryCommon.Models.AbstractBook");

                    b.HasDiscriminator().HasValue("StudyBook");
                });
#pragma warning restore 612, 618
        }
    }
}