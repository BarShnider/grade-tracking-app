using Microsoft.AspNetCore.Mvc;
using university_grades_app.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace university_grades_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        // GET: api/<CommentsController>
        [HttpGet]
        [Route("GetAllCommentsByCourseId/{courseId}")]
        public IEnumerable<Comment> GetAllCommentsByCourseId(int courseId)
        {
            return Comment.GetAllCommentsByCourseId(courseId);
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CommentsController>
        [HttpPost]
        [Route("CommentOnCourse/{courseId}")]
        public List<Comment> Post(int courseId,[FromBody] Comment comment)
        {
            return Comment.AddCommentToCourse(courseId, comment);
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
