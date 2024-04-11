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

        public static List<Object> GetAllCoursesBySemesterId(int semesterId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllCoursesBySemsterId(semesterId);
        }

        public static bool AddNewCourse(Course c, int semesterId)
        {
            DBservices dbs = new DBservices();
            int res = dbs.AddNewCourse(c, semesterId);
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

    }
}
