using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemestersController : ControllerBase
    {
        // GET: api/<SemestersController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("GetAllSemestersByYearId/{yearId}")]
        public IEnumerable<object> GetAllSemestersByYearId(int yearId)
        {
            return Semester.GetAllSemestersByYearId(yearId);
        }

        // GET api/<SemestersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SemestersController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SemestersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SemestersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
