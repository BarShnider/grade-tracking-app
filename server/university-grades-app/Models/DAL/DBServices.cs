using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using university_grades_app.Models;
using System.Text;
using System.Globalization;
using System.ComponentModel.Design;
using System.Xml.Linq;
using System.Dynamic;


/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, Dictionary<string, object> paramDic)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        if (paramDic != null)
            foreach (KeyValuePair<string, object> param in paramDic)
            {
                cmd.Parameters.AddWithValue(param.Key, param.Value);

            }


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method returns all universities
    //--------------------------------------------------------------------------------------------------
    public List<University> GetUniversities()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        cmd = CreateCommandWithStoredProcedure("SP_GetAllUniversities", con, null);             // create the command
        List<University> univList = new List<University>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                University u = new University();
                u.UniversityId = Convert.ToInt32(dataReader["UniversityID"].ToString());
                u.Name = dataReader["Name"].ToString();
                u.Location = dataReader["Location"].ToString();
                u.EstablishedYear = Convert.ToInt32(dataReader["EstablishedYear"].ToString());
                u.Website = dataReader["Website"].ToString();
                u.imageUrl = dataReader["Image"].ToString();


                univList.Add(u);
            }
            return univList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method gets all faculties by universityId
    //--------------------------------------------------------------------------------------------------
    public List<Faculty> GetAllFacultiesByUniversityId(int universityId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@universityId", universityId);


        cmd = CreateCommandWithStoredProcedure("SP_GetAllFacultiesByUniversity", con, paramDic);             // create the command
        List<Faculty> facList = new List<Faculty>();
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Faculty f = new Faculty();
                f.FacultyId = Convert.ToInt32(dataReader["facultyId"].ToString());
                f.Name = dataReader["Name"].ToString();



                facList.Add(f);
            }
            return facList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public List<Course> GetAllCourses()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        cmd = CreateCommandWithStoredProcedure("SP_GetAllCourses", con, null);             // create the command
        List<Course> courseList = new List<Course>();
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Course c = new Course();
                c.CourseId = Convert.ToInt32(dataReader["courseId"].ToString());
                c.CourseCode = Convert.ToInt32(dataReader["courseCode"].ToString());
                c.CourseName = dataReader["courseName"].ToString();
                c.LecturerName = dataReader["lecturerName"].ToString();
                c.avgGrade = Convert.ToDouble(dataReader["avgGrade"].ToString());
                c.minGrade = Convert.ToDouble(dataReader["minGrade"].ToString());
                c.maxGrade = Convert.ToDouble(dataReader["maxGrade"].ToString());


                courseList.Add(c);
            }
            return courseList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    
    //--------------------------------------------------------------------------------------------------
    // This method gets all degrees by facultyId
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetAllDegreesByFacultyId(int facultyId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@facultyId", facultyId);
        cmd = CreateCommandWithStoredProcedure("SP_GetAllDegreesByFacultyId", con, paramDic);             // create the command


        List<Object> degreeList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Degree d = new Degree();
                d.DegreeId = Convert.ToInt32(dataReader["DegreeId"].ToString());
                d.Name = dataReader["name"].ToString();
                degreeList.Add(d);
            }
            return degreeList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method gets all comments by courseId
    //--------------------------------------------------------------------------------------------------
    public List<Comment> GetAllCommentsByCourseId(int courseId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseId", courseId);
        cmd = CreateCommandWithStoredProcedure("SP_GetAllCommentsByCourseId", con, paramDic);             // create the command


        List<Comment> commentsList = new List<Comment>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                Comment c = new Comment();

                c.CommentId = Convert.ToInt32(dataReader["commentId"].ToString());
                c.Text = dataReader["CommentText"].ToString();
                c.Date = Convert.ToDateTime(dataReader["DateAdded"]);
                c.WhoCommented = dataReader["UserName"].ToString();
                c.CommenterId= Convert.ToInt32(dataReader["UserID"].ToString());


                commentsList.Add(c);
            }
            return commentsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method adds new comment to data
    //--------------------------------------------------------------------------------------------------
    public int AddComment(int courseId,Comment comment)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseId", courseId);
        paramDic.Add("@userId", comment.CommenterId);
        paramDic.Add("@text", comment.Text);


        cmd = CreateCommandWithStoredProcedure("SP_AddCommentToCourse", con, paramDic);             // create the command

        try
        {
            //int numEffected = cmd.ExecuteNonQuery(); // execute the command
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method adds new course
    //--------------------------------------------------------------------------------------------------
    public int AddNewCourse(Course c, int degreeId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseCode", c.CourseCode);
        paramDic.Add("@courseName", c.CourseName);
        paramDic.Add("@lecturerName", c.LecturerName);
        paramDic.Add("@avgGrade", c.avgGrade);
        paramDic.Add("@maxGrade", c.maxGrade);
        paramDic.Add("@minGrade", c.minGrade);
        paramDic.Add("@degreeId", degreeId);

        cmd = CreateCommandWithStoredProcedure("SP_AddNewCourse", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method adds new user to data
    //--------------------------------------------------------------------------------------------------
    public int AddUser(User user)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@UserName", user.Email);
        paramDic.Add("@Password", user.Password);
        paramDic.Add("@FirstName", user.FirstName);
        paramDic.Add("@LastName", user.LastName);

        cmd = CreateCommandWithStoredProcedure("Final_Add_New_User", con, paramDic);
        try
        {
            //int numEffected = cmd.ExecuteNonQuery(); // execute the command
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method checks if user is already exist by email 
    //--------------------------------------------------------------------------------------------------
    public int CheckUserExistEmail(string email)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@email", email);

        cmd = CreateCommandWithStoredProcedure("Final_Check_User", con, paramDic);             // create the command

        try
        {
            //int numEffected = cmd.ExecuteNonQuery(); // execute the command
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method edits comment by user 
    //--------------------------------------------------------------------------------------------------
    public int EditComment(int commentID, int userId, string editComment)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@userID", userId);
        paramDic.Add("@commentID", commentID);
        paramDic.Add("@comment", editComment);

        cmd = CreateCommandWithStoredProcedure("Edit_Comment", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method add rating to course by user
    //--------------------------------------------------------------------------------------------------
    public int UserRatesCourse(int userId, int courseId,float rating)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@UserID", userId);
        paramDic.Add("@courseId", courseId);
        paramDic.Add("@Rating", rating);


        cmd = CreateCommandWithStoredProcedure("SP_UserRatingCourse", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method deletes comment by userID and commentId 
    //--------------------------------------------------------------------------------------------------
    public int DeleteCommentByID(int commentID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@commentID", commentID);

        cmd = CreateCommandWithStoredProcedure("Delete_Comment", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This all courses by degree 
    //--------------------------------------------------------------------------------------------------
    public List<Course> GetCourseByDegreeID(int degreeID)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@degreeID", degreeID);
        cmd = CreateCommandWithStoredProcedure("Get_Course_By_Degree", con, paramDic);             // create the command


        List<Course> coursesList = new List<Course>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Course c = new Course();

                c.CourseId = Convert.ToInt32(dataReader["courseId"].ToString());
                c.CourseCode = Convert.ToInt32(dataReader["courseCode"].ToString());
                c.CourseName = dataReader["courseName"].ToString();
                c.LecturerName = dataReader["lecturerName"].ToString();
                c.avgGrade = Convert.ToInt32(dataReader["avgGrade"].ToString());
                c.minGrade = Convert.ToInt32(dataReader["maxGrade"].ToString());
                c.maxGrade = Convert.ToInt32(dataReader["minGrade"].ToString());
                coursesList.Add(c);
            }
            return coursesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method checks if user exists 
    //--------------------------------------------------------------------------------------------------
    public int LoginUser(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@userMail", user.Email);
        paramDic.Add("@userPassword", user.Password);




        cmd = CreateCommandWithStoredProcedure("CheckUser", con, paramDic);             // create the command

        try
        {
            //int numEffected = cmd.ExecuteNonQuery(); // execute the command
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }


    public User GetUserById(int userId)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@userId", userId);
        cmd = CreateCommandWithStoredProcedure("SP_GetUserById", con, paramDic);             // create the command


        List<Course> coursesList = new List<Course>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                User u = new User();

            while (dataReader.Read())
            {
                u.Id = Convert.ToInt32(dataReader["UserId"].ToString());
                u.Email = dataReader["UserName"].ToString();
                u.FirstName = dataReader["FirstName"].ToString();
                u.LastName = dataReader["LastName"].ToString();


            }
            return u;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // Get Course Rating 
    //--------------------------------------------------------------------------------------------------

    public float GetCourseRating(int courseId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseId", courseId);

        cmd = CreateCommandWithStoredProcedure("SP_GetCourseRating", con, paramDic);             // create the command


        
        
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            float rating = 0;
            while (dataReader.Read())
            {
                rating = float.Parse(dataReader["AverageRating"].ToString());

            }
                return rating;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    public float GetUserRating(int userId,int courseId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@userID", userId);
        paramDic.Add("@courseId", courseId);


        cmd = CreateCommandWithStoredProcedure("SP_GetUserRating", con, paramDic);             // create the command




        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            float rating = 0;
            while (dataReader.Read())
            {
                rating = float.Parse(dataReader["UserRating"].ToString());

            }
            return rating;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method add grade to course by user
    //--------------------------------------------------------------------------------------------------
    public int UserGradesCourse(int userId, int courseId, int grade)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@UserID", userId);
        paramDic.Add("@courseId", courseId);
        paramDic.Add("@grade", grade);


        cmd = CreateCommandWithStoredProcedure("SP_UserGradesCourse", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method add grades to course by courseID
    //--------------------------------------------------------------------------------------------------

    public List<int> GetCoursesGradesByCourseID(int courseID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseID", courseID);


        cmd = CreateCommandWithStoredProcedure("SP_GetGradesByCourseID", con, paramDic);             // create the command
        List<int> grades = new List<int>();
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                int grade = Convert.ToInt32(dataReader["grade"].ToString());
                grades.Add(grade);
            }
            return grades;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method edits users details
    //--------------------------------------------------------------------------------------------------
    public int EditUserDetails(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@UserID", user.Id);
        paramDic.Add("@Email", user.Email);
        paramDic.Add("@userFirstName", user.FirstName);
        paramDic.Add("@userLastName", user.LastName);
        paramDic.Add("@userPassword", user.Password);


        cmd = CreateCommandWithStoredProcedure("SP_EditUser", con, paramDic);             // create the command

        try
        {
            //int numEffected = cmd.ExecuteNonQuery(); // execute the command
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method deletes user by id
    //--------------------------------------------------------------------------------------------------
    public int DeleteUser(int userID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@UserID", userID);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteUserById", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This all courses by degree 
    //--------------------------------------------------------------------------------------------------
    public List<Course> GetCoursesByName(string courseName)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseName", courseName);
        cmd = CreateCommandWithStoredProcedure("SP_Get_Course_By_Name", con, paramDic);             // create the command


        List<Course> coursesList = new List<Course>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Course c = new Course();

                c.CourseId = Convert.ToInt32(dataReader["courseId"].ToString());
                c.CourseName = dataReader["courseName"].ToString();
                coursesList.Add(c);
            }
            return coursesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method deletes course by id
    //--------------------------------------------------------------------------------------------------
    public int DeleteCourseByID(int courseID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@courseID", courseID);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteCourseById", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method deletes degree by id
    //--------------------------------------------------------------------------------------------------
    public int DeleteDegreeById(int degreeID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@degreeID", degreeID);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteDegreeById", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method deletes university by id
    //--------------------------------------------------------------------------------------------------
    public int DeleteUniversityByID(int universityID)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@universityID", universityID);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteUniversityById", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method deletes faculty by id
    //--------------------------------------------------------------------------------------------------
    public int DeleteFacultyByID(int facultyId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@facultyId", facultyId);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteFacultyById", con, paramDic);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            //int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // returning the id/
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public List<dynamic> GetAllCoursesWithUniversityFacultyDegree()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        cmd = CreateCommandWithStoredProcedure("SP_GetALLCoursesWithDegreeFacultyUniversity", con, null);             // create the command
        List<dynamic> courseList = new List<dynamic>();
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                dynamic course = new ExpandoObject();
                course.CourseId = Convert.ToInt32(dataReader["courseId"]);
                course.CourseCode = dataReader["courseCode"].ToString();
                course.CourseName = dataReader["courseName"].ToString();
                course.LecturerName = dataReader["lecturerName"].ToString();
                course.UniversityName = dataReader["UnivName"].ToString();
                course.FacultyName = dataReader["FacName"].ToString();
                course.DegreeName = dataReader["DegName"].ToString();




                courseList.Add(course);
            }
            return courseList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
}





