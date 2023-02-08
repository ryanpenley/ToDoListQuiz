using System.ComponentModel.DataAnnotations;

namespace ToDoListQuiz.Models
{
    public class ToDoItem
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? AppUserId { get; set; }
        [Required]
        [Display(Name = "Date Created")]
        [DataType(DataType.Date)]
        public DateTime DateCreated { get; set; }
        [Display(Name = "Due Date")]
        [DataType(DataType.Date)]
        public DateTime? DueDate { get; set; }
        [Required]
        public bool Completed { get; set; }

        // Navigation Properties

        public virtual AppUser? AppUser { get; set; }
        public virtual ICollection<Accessory> Accessory { get; set; } = new HashSet<Accessory>();
    }
}
