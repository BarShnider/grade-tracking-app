using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DegreesController : ControllerBase
    {
        // GET: api/<DegreesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("GetAllDegreesByFacultyId/{facultyId}")]
        public IEnumerable<object> GetAllDegreesByFacultyId(int facultyId)
        {
            return Degree.GetAllDegreesByFacultyId(facultyId);
        }

        // GET api/<DegreesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DegreesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DegreesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DegreesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
