const db = require("./conn");

class Presentation {
  constructor(id, lesson_name, instructor, lesson_href) {
    this.id = id;
    this.lesson_name = lesson_name;
    this.instructor = instructor;
    this.lesson_href = lesson_href;
  }

  static async getAllPresentations() {
    try {
      const response = await db.any(`SELECT * FROM test_lesson;`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async getPresentationByUserId(lesson_id) {
    try {
      const response = await db.any(
        `SELECT * FROM test_lesson WHERE id = ${lesson_id};`
      );
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async getHostedByUserEmail(user_email) {
    try {
      const response = await db.any(`select distinct test_lesson.lesson_name ,test_lesson.id, test_lesson.instructor
      from test_lesson   
      inner join users on test_lesson.instructor = users.id WHERE users.email = '${user_email}'`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async addLesson(lesson_name, email) {
    try {
      const response = await db.one(
        `INSERT INTO test_lesson (lesson_name, instructor)
                VALUES ($1,$2) RETURNING id`,
        [lesson_name, email]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  }
}

module.exports = Presentation;
