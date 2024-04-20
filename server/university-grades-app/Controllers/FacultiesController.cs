using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultiesController : ControllerBase
    {
        // GET: api/<FacultiesController>
        [HttpGet]
        [Route("GetFacultiesByUniversityId/{UniversityId}")]
        public IEnumerable<Faculty> GetFacultiesByUniversityId(int UniversityId)
        {
            return Faculty.GetFacultiesByUniversityId(UniversityId);
        }

        [HttpGet]
        [Route("GetAllFacultiesWithUniversity")]
        public IEnumerable<dynamic> GetAllFacultiesWithUniversity()
        {
            return Faculty.GetAllFacultiesWithUniversity();
        }

        // GET api/<FacultiesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FacultiesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FacultiesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FacultiesController>/5
        [HttpDelete("{facultyId}")]
        public int Delete(int facultyId)
        {
            return Faculty.DeleteFaculty(facultyId);
        }
    }
}
