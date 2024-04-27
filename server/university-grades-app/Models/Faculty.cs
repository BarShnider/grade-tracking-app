namespace university_grades_app.Models
{
    public class Faculty
    {
        public int FacultyId { get; set; }
        public string Name { get; set; }

        public static List<Faculty> GetFacultiesByUniversityId(int universityId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllFacultiesByUniversityId(universityId);
        }

        public static int DeleteFaculty(int facultyId)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteFacultyByID(facultyId);
        }

        public static List<dynamic> GetAllFacultiesWithUniversity()
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllFacultiesWithUniversity();
        }

        public int EditFaculty()
        {
            DBservices dbs = new DBservices();
            return dbs.EditFacultyDBS(this);
        }

        public static int AddFaculty(int univID,String facultyName)
        {
            DBservices dbs = new DBservices();
            return dbs.AddNewFaculty(facultyName, univID);
        }
    }
}
