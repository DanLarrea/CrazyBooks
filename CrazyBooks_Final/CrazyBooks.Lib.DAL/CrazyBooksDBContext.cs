using CrazyBooks.Lib.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CrazyBooks.Lib.DAL
{
    public class CrazyBooksDBContext : DbContext
    {
        public CrazyBooksDBContext(DbContextOptions<CrazyBooksDBContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomReservation> RoomReservations { get; set; }
        public DbSet<Lend> Lends { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lend>()
                .HasKey(bc => new
                {
                    bc.BookId,
                    bc.UserId
                });
            modelBuilder.Entity<Lend>()
                .HasOne(bc => bc.Books)
                .WithMany(b => b.Lends)
                .HasForeignKey(bc => bc.BookId);
            modelBuilder.Entity<Lend>()
                .HasOne(bc => bc.Users)
                .WithMany(c => c.Lends)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<RoomReservation>()
                .HasKey(bc => new
                {
                    bc.RoomId,
                    bc.UserId
                });
            modelBuilder.Entity<RoomReservation>()
                .HasOne(bc => bc.Rooms)
                .WithMany(b => b.RoomReservations)
                .HasForeignKey(bc => bc.RoomId);
            modelBuilder.Entity<RoomReservation>()
                .HasOne(bc => bc.Users)
                .WithMany(c => c.RoomReservations)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
