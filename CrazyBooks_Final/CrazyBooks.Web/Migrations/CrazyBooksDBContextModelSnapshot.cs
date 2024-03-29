﻿// <auto-generated />
using System;
using CrazyBooks.Lib.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CrazyBooks.Web.Migrations
{
    [DbContext(typeof(CrazyBooksDBContext))]
    partial class CrazyBooksDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CrazyBooks.Lib.Models.Book", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<int>("Edition");

                    b.Property<DateTime?>("PublicationDate");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.Lend", b =>
                {
                    b.Property<Guid>("BookId");

                    b.Property<Guid>("UserId");

                    b.Property<Guid>("Id");

                    b.Property<DateTime>("LendedOn");

                    b.Property<DateTime>("ReturnDate");

                    b.HasKey("BookId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("Lends");
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.Room", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Accessible");

                    b.Property<string>("Capacity");

                    b.Property<string>("Code");

                    b.Property<string>("Color");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.RoomReservation", b =>
                {
                    b.Property<Guid>("RoomId");

                    b.Property<Guid>("UserId");

                    b.Property<DateTime?>("Date");

                    b.Property<Guid>("Id");

                    b.Property<DateTime?>("TimeIn");

                    b.Property<DateTime?>("TimeOut");

                    b.HasKey("RoomId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("RoomReservations");
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Dni");

                    b.Property<string>("Email");

                    b.Property<string>("Lastname");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<int>("Phone");

                    b.Property<string>("Token");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.Lend", b =>
                {
                    b.HasOne("CrazyBooks.Lib.Models.Book", "Books")
                        .WithMany("Lends")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CrazyBooks.Lib.Models.User", "Users")
                        .WithMany("Lends")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CrazyBooks.Lib.Models.RoomReservation", b =>
                {
                    b.HasOne("CrazyBooks.Lib.Models.Room", "Rooms")
                        .WithMany("RoomReservations")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CrazyBooks.Lib.Models.User", "Users")
                        .WithMany("RoomReservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
