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

        public static int DeleteDegree(int degreeId)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteDegreeById(degreeId);
        }


        public static List<dynamic> GetDegreesWithUniversityFaculty()
        {
            DBservices dbs = new DBservices();
            return dbs.GetDegreesWithUniversityFaculty();
        }

        public int EditDegree()
        {
            DBservices dbs = new DBservices();
            return dbs.EditDegreeDBS(this);
        }
    }
}
