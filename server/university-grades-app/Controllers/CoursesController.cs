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
        public List<dynamic> GetCoursesByString(string CourseName)
        { 
            return Course.GetAllCoursesByString(CourseName);
        }

        [HttpGet]
        [Route("GetCourseRating/{courseId}")]
        public float GetCourseRating(int courseId)
        {
            return Course.GetCourseRating(courseId);
        }

        [HttpGet]
        [Route("GetAllCoursesWithUniversityFacultyDegree")]
        public List<dynamic> GetAllCoursesWithUniversityFacultyDegree()
        {
            return Course.GetAllCoursesWithUniversityFacultyDegree();
        }

        // POST api/<CoursesController>
        [HttpPost]
        [Route("AddNewCourse/{degreeId}")]
        public bool Post(int degreeId, [FromBody] Course c)
        {
            return Course.AddNewCourse(c, degreeId);
        }

        // PUT api/<CoursesController>/5
        [HttpPut("EditCourse")]
        public int Put([FromBody] Course course)
        {
            return course.EditCourse();
        }

        // DELETE api/<CoursesController>/5
        [HttpDelete("{courseID}")]
        public int Delete(int courseID)
        {
            return Course.DeleteCourse(courseID);
        }
    }
}
