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

//lesson_name, instructor
  static async addLesson(lesson_name, instructor) {
    try {
      const response = await db.one(
        `INSERT INTO test_lesson (name, instructor)
                VALUES ($1,$2) RETURNING id`,
        [lesson_name, instructor]
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