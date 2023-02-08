using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ToDoListQuiz.Models;

namespace ToDoListQuiz.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ToDoListQuiz.Models.Accessory> Accessory { get; set; } = default!;
        public DbSet<ToDoListQuiz.Models.ToDoItem> ToDoItem { get; set; } = default!;
    }
}