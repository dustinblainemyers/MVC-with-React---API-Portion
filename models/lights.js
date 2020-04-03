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
      const response = await db.any(`SELECT * FROM lights WHERE users_id = ${user_id};`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  
  

}

module.exports = Lights;