namespace university_grades_app.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        //This function register a new user to the database
        public bool Register()
        {
            DBservices dbs = new DBservices();
            if (dbs.CheckUserExistEmail(this.Email) == 1) // if there is a user with this email will return 1, else return 0
            {
                return false;
            }
            else
            {
                dbs.AddUser(this.Email,this.Password);
                return true;
            }

        }
        public User Login()
        {
            DBservices dbs = new DBservices();
            int numCheck = dbs.LoginUser(this);

                return dbs.GetUserById(numCheck);
      

        }

        public static int UserRatesCourse(int userId, int courseId,float rating)
        {
            DBservices dbs = new DBservices();
            return dbs.UserRatesCourse(userId, courseId,rating);
        }

        public static float GetUserRating(int userId, int courseId)
        {
            DBservices dbs = new DBservices();
            return dbs.GetUserRating(userId,courseId);
        }
    }
}
