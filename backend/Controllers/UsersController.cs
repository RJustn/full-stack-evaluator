using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManager.DTOs;
[Route("users")]
[ApiController]
public class UsersControllers : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public UsersControllers(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /users
    // Returns all users along with their associated tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> Get()
    {
        var users = await _context.Users
            .Include(u => u.Tasks)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                Tasks = u.Tasks.Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    IsDone = t.IsDone
                }).ToList()
            })
            .ToListAsync();

        return Ok(users);
    }

    // POST /users
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }

    // DELETE /users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _context.Users
        .Include(u => u.Tasks) // include tasks
        .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)

            return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }


}