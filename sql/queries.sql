select test_lesson.name , users.name , lights.green_light
                from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
                inner join users on lights.users_id = users.id WHERE users.id = 1