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
      const response = await db.any(` select test_lesson.lesson_name ,test_lesson.access_key, users.name , lights.green_light, lights.id
      from test_lesson   inner join  lights on test_lesson.access_key = lights.access_key
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
      from test_lesson   inner join  lights on test_lesson.access_key = lights.access_key
      inner join users on lights.users_id = users.id `);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async addLight(users_id, access_key) {
    try {
      const response = await db.any(` INSERT INTO lights (users_id,access_key, green_light)

      VALUES (${users_id}, '${access_key}', TRUE);
      
       `);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async viewUnjoined(user_email) {
    try {
      const response = await db.any(` select distinct test_lesson.lesson_name 
      from test_lesson   inner join  lights on test_lesson.access_key = lights.access_key
      inner join users on lights.users_id = users.id WHERE users.email != '${user_email}'`);
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
       WHERE lights.access_key =  ${lesson_id}`);
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
      WHERE lights.access_key =  ${lesson_id} AND lights.green_light = TRUE`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async leaveLesson(access_key, users_id) {
    try {
      const response = await db.one(
        `DELETE FROM lights 
        WHERE access_key = '${access_key}' AND users_id = ${users_id}`,
        [lesson_id]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  }
}

module.exports = Lights;
