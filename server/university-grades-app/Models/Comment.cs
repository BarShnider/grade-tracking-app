using System.Xml.Linq;

namespace university_grades_app.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int CommenterId { get; set; }

        public string WhoCommented { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public static List<Comment> GetAllCommentsByCourseId(int courseId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllCommentsByCourseId(courseId);
        }

        public static List<Comment> AddCommentToCourse(int courseId, Comment comment)
        {
            DBservices dbs = new DBservices();
            dbs.AddComment(courseId, comment);
            return GetAllCommentsByCourseId(courseId);
        }

        public static int EditCommentByUser(int commentID, int userId, string editComment)
        {
            DBservices dbs = new DBservices();
            return dbs.EditComment(commentID, userId, editComment);
        }

    }
}
