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
    }
}
