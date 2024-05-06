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
        [Route("GetAllUsers")]
        public List<User> GetAllUsers()
        {
            return university_grades_app.Models.User.GetAllUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("{email}")]
        public int Get(string email)
        {
            return university_grades_app.Models.User.CheckEmail(email);
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
        [Route("UserForgotPass/{mail}/{password}")]
        public int UserForgotPass(String mail, String password)
        {

            return university_grades_app.Models.User.UserForgotPassword(mail, password);
        }

        [HttpPost]
        [Route("UserGradesCourse/{userId}/{courseId}/{grade}")]
        public int UserGradesCourse(int userId, int courseId, int grade)
        {

            return university_grades_app.Models.User.UserGradesCourse(userId, courseId, grade);
        }

        [HttpPost]
        [Route("Login")]
        public User Login(User user)
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
        [HttpPut("EditUser")]
        public int Put([FromBody] User user)
        {
            return user.EditUser();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{userid}")]
        public int Delete(int userid)
        {
            User user=new User();
            return user.DeleteUserByID(userid);
        }
    }
}
