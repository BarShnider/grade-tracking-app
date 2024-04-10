namespace university_grades_app.Models
{
    public class Semester
    {
        public int SemesterId { get; set; }
        public int SemesterNumber { get; set; }


        public static List<Object> GetAllSemestersByYearId(int yearId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllSemestersByYearId(yearId);
        }
    }
}
