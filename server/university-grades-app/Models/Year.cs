namespace university_grades_app.Models
{
    public class Year
    {
        public int YearId { get; set; }
        public int YearNumber { get; set; }


        public static List<Object> GetAllYearsByDegreeId(int degreeId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllYearsByDegreeId(degreeId);
        }

    }
}
