const db = require("./conn");

class Users {
  constructor(id, lesson_name, instructor, lesson_href) {
    this.id = id;
    this.lesson_name = lesson_name;
    this.instructor = instructor;
    this.lesson_href = lesson_href;
  }

  static async getAllUsers() {
    try {
      const response = await db.any(`SELECT * FROM users;`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  
  

}

module.exports = Users;