using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{email}")]
        public void Get(string email)
        {

        }

        // GET api/<UserController>/5
        [HttpGet]
        [Route("GetUserRating/{courseId}/{userId}")]
        public float GetUserRating(int userId,int courseId)
        {
            return university_grades_app.Models.User.GetUserRating(userId,courseId);
        }

        // POST api/<UserController>
        [HttpPost]
        [Route("Register")]
        public bool Post([FromBody] User user)
        {
            return user.Register();
        }

        [HttpPost]
        [Route("UserRatesCourse/{userId}/{courseId}/{rating}")]
        public int UserRatesCourse(int userId,int courseId,float rating)
        {
            
            return university_grades_app.Models.User.UserRatesCourse(userId,courseId,rating);
        }

        [HttpPost]
        [Route("Login")]
        public User Login(User user
            )
        {
            try
            {
                return user.Login();
            }
            catch (Exception ex)
            {
                throw new Exception("User not found");
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
