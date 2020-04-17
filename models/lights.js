const db = require("./conn");

class Lights {
  constructor(id, lesson_name, instructor, lesson_href) {
    this.id = id;
    this.lesson_name = lesson_name;
    this.instructor = instructor;
    this.lesson_href = lesson_href;
  }

  static async getLightByUserId(user_email) {
    try {
      const response = await db.any(` select test_lesson.lesson_name , users.name , lights.green_light, lights.id
      from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
      inner join users on lights.users_id = users.id WHERE users.email = '${user_email}'; `);
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

  static async addLight() {
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


  static async viewUnjoined(users_id) {
    try {
      const response = await db.any(` select distinct test_lesson.lesson_name 
      from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
      inner join users on lights.users_id = users.id WHERE users.id != ${users_id}`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async toggleLight(light_id) {
    try {
      const response = await db.any(` UPDATE lights
      SET green_light = NOT green_light
      WHERE id = ${light_id}`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async aggregateCountAll(lesson_id) {
    try {
      const response = await db.any(`select COUNT(lights.green_light)
      from lights 
       WHERE lights.lesson_id =  ${lesson_id}`);             
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async aggregateCountGreen(lesson_id) {
    try {
      const response = await db.any(`select COUNT(lights.green_light)
      from lights 
      WHERE lights.lesson_id =  ${lesson_id} lights.green_light = TRUE`);             
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }
  

}

module.exports = Lights;