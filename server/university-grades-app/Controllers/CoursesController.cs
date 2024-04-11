using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        // GET: api/<CoursesController>
        [HttpGet]
        [Route("GetAllCoursesByDegree/{degreeID}")]
        public List<Course> GetAllCoursesByDeg(int degreeID)
        {
            return Course.GetAllCoursesByDegree(degreeID);
        }

        [HttpGet]
        [Route("GetAllCoursesByYear/{yearID}")]
        public List<Course> GetAllCoursesByYear(int yearID)
        {
            return Course.GetAllCoursesYear(yearID);
        }

        // GET api/<CoursesController>/5
        [HttpGet]
        public List<Course> GetAllCourses()
        {
            return Course.GetAllCourses();
        }

        [HttpGet]
        [Route("GetAllCoursesBySemesterId/{semesterId}")]
        public List<Object> GetAllCoursesBySemesterId(int semesterId)
        {
            return Course.GetAllCoursesBySemesterId(semesterId);
        }

        // POST api/<CoursesController>
        [HttpPost]
        [Route("AddNewCourse/{semesterId}")]
        public void Post([FromBody] Course course, int semesterId)
        {
            Course.AddNewCourse(course, semesterId);
        }

        // PUT api/<CoursesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CoursesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
