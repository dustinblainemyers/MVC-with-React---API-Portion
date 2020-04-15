const db = require("./conn");

class Users {
  constructor(id, email) {
    this.id = id;
    this.email = email;
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

  async addUser() {
    try {
      const response = await db.one(
        `INSERT INTO users (email) VALUES ($1) RETURNING id;`,
        [this.email]
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getUser() {
    try {
      const response = await db.one(`SELECT * FROM users WHERE email = '${email}'`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  
  

}

module.exports = Users;