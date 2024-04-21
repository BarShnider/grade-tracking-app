using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversitiesController : ControllerBase
    {
        // GET: api/<TestController>
        [HttpGet]
        public IEnumerable<University> Get()
        {
            DBservices dbs = new DBservices();
            return dbs.GetUniversities();
             
        }

        // GET api/<TestController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TestController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TestController>/5
        [HttpPut("EditUniversity")]
        public int Put([FromBody] University university)
        {
            return university.EditUniversity();
        }

        // DELETE api/<TestController>/5
        [HttpDelete("{universityID}")]
        public int Delete(int universityID)
        {
            return University.DeleteUniversity(universityID);
        }
    }
}
