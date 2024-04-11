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
    // This method Reads all Songs
    //--------------------------------------------------------------------------------------------------
    public List<University> GetUniversities()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
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
            con = connect("DefaultConnection"); // create the connection
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

    public List<Object> GetAllCoursesBySemsterId(int semesterId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@semesterId", semesterId);
        cmd = CreateCommandWithStoredProcedure("GetCoursesBySemsterId", con, paramDic);             // create the command


        List<Object> courseList = new List<Object>();

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

    public List<Object> GetAllDegreesByFacultyId(int facultyId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
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

    public List<Object> GetAllYearsByDegreeId(int degreeId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@degreeId", degreeId);
        cmd = CreateCommandWithStoredProcedure("SP_GetYearsByDegreeId", con, paramDic);             // create the command


        List<Object> yearList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                Year y = new Year();


                y.YearId = Convert.ToInt32(dataReader["yearId"].ToString());
                y.YearNumber = Convert.ToInt32(dataReader["yearNumber"].ToString());


                yearList.Add(y);
            }
            return yearList;
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

    public List<Object> GetAllSemestersByYearId(int yearId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@yearId", yearId);
        cmd = CreateCommandWithStoredProcedure("SP_GetAllSemestersByYearId", con, paramDic);             // create the command


        List<Object> semesterList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                Semester s = new Semester();


                s.SemesterId = Convert.ToInt32(dataReader["semesterId"].ToString());
                s.SemesterNumber = Convert.ToInt32(dataReader["semesterNumber"].ToString());


                semesterList.Add(s);
            }
            return semesterList;
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

    public List<Comment> GetAllCommentsByCourseId(int courseId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DefaultConnection"); // create the connection
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
                c.Title = dataReader["CommentTitle"].ToString();
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
        paramDic.Add("@title", comment.Title);
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

    public int AddNewCourse(Course c, int semesterId)
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
        paramDic.Add("@semesterId", semesterId);

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
    public int AddUser(string email, string password)
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
        paramDic.Add("@UserName", email);
        paramDic.Add("@Password", password);

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
    // This method deletes comment by userID and commentId 
    //--------------------------------------------------------------------------------------------------
    public int DeleteCommentByID(int commentID, int userId)
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

}





