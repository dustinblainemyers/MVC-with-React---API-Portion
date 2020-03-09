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

//   static async getById(id) {
//     try {
//       const response = await db.any(`SELECT * FROM albums WHERE id = ${id} `);
//       return response;
//     } catch (error) {
//       console.error("Error", error);
//     }
//   }

//   static async addReview(lesson_name, instructor) {
//     try {
//       const response = await db.one(
//         `INSERT INTO reviews (users_id, album_id, title, review, stars)
//                 VALUES ($1,$2,$3,$4,$5) RETURNING id`,
//         [1, lesson_name, instructor, 5]
//       );
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.log("Error:", error);
//       return error;
//     }
//   }

//   static async getAllReviewsByID(albumID) {
//     // get all the reviews for a given restaurant given a specific restaurant id .
//     try {
//       const response = await db.any(
//         `select albums.name_album , reviews.title , reviews.stars, reviews.review, users.first_name 
//                 from albums   inner join  reviews on albums.id = reviews.album_id 
//                 inner join users on users.id = reviews.users_id WHERE reviews.album_id = ${albumID}`
//       );
//       return response;
//     } catch (error) {
//       console.error("ERROR:", error);
//       return error;
//     }
//   }
}

module.exports = Presentation;