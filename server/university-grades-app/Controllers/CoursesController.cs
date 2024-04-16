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
        [Route("GetAllCoursesGradesByCourseID/{courseID}")]
        public List<int> GetAllCoursesByCourseID(int courseID)
        {
            return Course.GetCoursesGrades(courseID);
        }

        // GET api/<CoursesController>/5
        [HttpGet]
        public List<Course> GetAllCourses()
        {
            return Course.GetAllCourses();
        }

        // GET api/<CoursesController>/5
        [HttpGet]
        [Route("GetAllCoursesByName/{CourseName}")]
        public List<Course> GetCoursesByString(string CourseName)
        { 
            return Course.GetAllCoursesByString(CourseName);
        }

        [HttpGet]
        [Route("GetCourseRating/{courseId}")]
        public float GetCourseRating(int courseId)
        {
            return Course.GetCourseRating(courseId);
        }

        // POST api/<CoursesController>
        [HttpPost]
        [Route("AddNewCourse/{degreeId}/{course}")]
        public bool Post(int degreeId, [FromBody] Course c)
        {
            return Course.AddNewCourse(c, degreeId);
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
