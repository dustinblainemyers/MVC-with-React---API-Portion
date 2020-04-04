const db = require("./conn");

class Lights {
  constructor(id, lesson_name, instructor, lesson_href) {
    this.id = id;
    this.lesson_name = lesson_name;
    this.instructor = instructor;
    this.lesson_href = lesson_href;
  }

  static async getLightByUserId(user_id) {
    try {
      const response = await db.any(` select test_lesson.lesson_name , users.name , lights.green_light
      from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
      inner join users on lights.users_id = users.id WHERE users.id = ${user_id}; `);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async happyPath() {
    try {
      const response = await db.any(` select test_lesson.lesson_name , users.name , lights.green_light
      from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
      inner join users on lights.users_id = users.id `);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  
  

}

module.exports = Lights;