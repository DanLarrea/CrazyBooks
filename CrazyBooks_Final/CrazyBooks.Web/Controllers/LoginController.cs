using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrazyBooks.Web.Security;
using CrazyBooks.Web.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrazyBooks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IUserService UsersService { get; set; }

        public LoginController(IUserService usersService)
        {
            UsersService = usersService;
        }

        // POST: api/Login
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest request)
        {
            var user = UsersService.Authenticate(request.Email, request.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
    }
}
