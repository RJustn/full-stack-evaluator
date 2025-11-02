using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _context.Users.ToListAsync();
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

}