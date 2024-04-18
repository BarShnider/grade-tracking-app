using MimeKit.Tnef;

namespace university_grades_app.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }   
        public string LastName { get; set; }

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
                dbs.AddUser(this);
                return true;
            }

        }
        public User Login()
        {
            DBservices dbs = new DBservices();
            if (dbs.CheckUserExistEmail(this.Email) == 0) {
                User newUser = new User()
                {
                    Id = -1,
                    Email = "",
                    Password = "",
                    FirstName = "",
                    LastName = ""
                };
                return newUser;
            }
            int numCheck = dbs.LoginUser(this);
            if(numCheck == 0)
            {
                User newUser = new User()
                {
                    Id = -2,
                    Email = "",
                    Password = "",
                    FirstName = "",
                    LastName = ""
                };
                return newUser;
            }
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

        public static int UserGradesCourse(int userId, int courseId, int grade)
        {
            DBservices dbs = new DBservices();
            return dbs.UserGradesCourse(userId,courseId, grade);
        }

        public int EditUser(User user)
        {
            DBservices dbs = new DBservices();
            return dbs.EditUserDetails(user);
        }

        public int DeleteUserByID(int id)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteUser(id);
        }
    }
}
