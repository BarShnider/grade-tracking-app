namespace university_grades_app.Models
{
    public class University
    {
        public int UniversityId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int EstablishedYear { get; set; }
        public string Website { get; set; }
        public string imageUrl { get; set; }

        public static List<University> GetUniversities()
        {
            DBservices dbs = new DBservices();
            return dbs.GetUniversities();
        }
        public static int DeleteUniversity(int universityId)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteUniversityByID(universityId);
        }


    }
}
