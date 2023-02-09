using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ToDoListQuiz.Data;
using ToDoListQuiz.Models;

namespace ToDoListQuiz.Controllers
{
    [Authorize]
    public class ToDoItemsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;


        public ToDoItemsController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }

        // GET: ToDoItems
        public async Task<IActionResult> Index()
        {
            string userId = _userManager.GetUserId(User)!;

            List<ToDoItem> toDoItems = new List<ToDoItem>();

            toDoItems = await _context.ToDoItem.Where(t => t.AppUserId== userId && t.Completed == false).ToListAsync();




            return View(toDoItems);
        }        // GET: CompletedItems
        public async Task<IActionResult> CompletedItems()
        {
            string userId = _userManager.GetUserId(User)!;

            List<ToDoItem> toDoItems = new List<ToDoItem>();

            toDoItems = await _context.ToDoItem.Where(t => t.AppUserId== userId && t.Completed == true).ToListAsync();




            return View(toDoItems);
        }

        // GET: ToDoItems/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ToDoItem == null)
            {
                return NotFound();
            }

            var toDoItem = await _context.ToDoItem
                .FirstOrDefaultAsync(m => m.Id == id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            return View(toDoItem);
        }

        // GET: ToDoItems/Create
        public async Task<IActionResult> Create()
        {
            // Query and present the list of categories for the logged in user
            string? userId = _userManager.GetUserId(User);

            IEnumerable<Accessory> accessoriesList = await _context.Accessory
                                                                 .Where(a => a.AppUserId == userId)
                                                                 .ToListAsync();

            ViewData["AccessoriesList"] = new MultiSelectList(accessoriesList, "Id", "Name");

            return View();
        }

        // POST: ToDoItems/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,AppUserId,DateCreated,DueDate,Completed")] ToDoItem toDoItem)
        {

            ModelState.Remove("AppUserId");

            if (ModelState.IsValid)
            {
                toDoItem.AppUserId = _userManager.GetUserId(User);
                toDoItem.DateCreated = DateTime.UtcNow;

                toDoItem.DueDate = DateTime.SpecifyKind(toDoItem.DueDate, DateTimeKind.Utc);
                toDoItem.Completed = false;


                _context.Add(toDoItem);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(toDoItem);
        }

        // GET: ToDoItems/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ToDoItem == null)
            {
                return NotFound();
            }

            var toDoItem = await _context.ToDoItem.FindAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }
            return View(toDoItem);
        }

        // POST: ToDoItems/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,AppUserId,DateCreated,DueDate,Completed")] ToDoItem toDoItem)
        {
            if (id != toDoItem.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Reformat Created Date 
                    toDoItem.DateCreated = DateTime.SpecifyKind(toDoItem.DateCreated, DateTimeKind.Utc);
                    // Reformat DueDate
                    toDoItem.DueDate = DateTime.SpecifyKind(toDoItem.DueDate, DateTimeKind.Utc);

                    _context.Update(toDoItem);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ToDoItemExists(toDoItem.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(toDoItem);
        }

        // GET: ToDoItems/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ToDoItem == null)
            {
                return NotFound();
            }

            var toDoItem = await _context.ToDoItem
                .FirstOrDefaultAsync(m => m.Id == id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            return View(toDoItem);
        }

        // POST: ToDoItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ToDoItem == null)
            {
                return Problem("Entity set 'ApplicationDbContext.ToDoItem'  is null.");
            }
            var toDoItem = await _context.ToDoItem.FindAsync(id);
            if (toDoItem != null)
            {
                _context.ToDoItem.Remove(toDoItem);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ToDoItemExists(int id)
        {
            return (_context.ToDoItem?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}