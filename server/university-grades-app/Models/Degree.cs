namespace university_grades_app.Models
{
    public class Degree
    {
        public int DegreeId { get; set; }
        public string Name { get; set; }

        public static List<Object> GetAllDegreesByFacultyId(int facultyId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllDegreesByFacultyId(facultyId);
        }
    }
}
