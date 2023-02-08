using System.ComponentModel.DataAnnotations;

namespace ToDoListQuiz.Models
{
    public class Accessory
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [Display(Name = "Accessory Name")]
        public string? Name { get; set; }
        [Required]
        public string? AppUserId { get; set; }

        // Navigation Properties
        public virtual AppUser? AppUser { get; set; }
        public virtual ICollection<ToDoItem> ToDoItem { get; set; } = new HashSet<ToDoItem>();
    }
}
