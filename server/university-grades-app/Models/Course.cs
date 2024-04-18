namespace university_grades_app.Models
{
    public class Course
    {

        public int CourseId { get; set; }
        public int CourseCode { get; set; }

        public string CourseName { get; set; }
        public string LecturerName { get; set; }
        public double avgGrade { get; set; }
        public double minGrade { get; set; }
        public double maxGrade { get; set; }

        public static List<Course> GetAllCourses()
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllCourses();
        }
        public static List<int> GetCoursesGrades(int courseID)
        {
            DBservices dbs = new DBservices();
            return dbs.GetCoursesGradesByCourseID(courseID);
        }

        public static List<Course> GetAllCoursesByString(string courseName)
        {
            DBservices dbs = new DBservices();
            return dbs.GetCoursesByName(courseName);
        }

        public static bool AddNewCourse(Course c, int degreeId)
        {
            DBservices dbs = new DBservices();
            int res = dbs.AddNewCourse(c, degreeId);
            if(res <= 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public static List<Course> GetAllCoursesByDegree(int degreeID)
        {
            DBservices dbs = new DBservices();
            return dbs.GetCourseByDegreeID(degreeID);
        }

        public static float GetCourseRating(int courseId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetCourseRating(courseId);
        }
        public static int DeleteCourse(int courseID)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteCourseByID(courseID);
        }


    }
}
