-- Show all a users lights/presentations

select test_lesson.name , users.name , lights.green_light
                from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
                inner join users on lights.users_id = users.id WHERE users.id = 1


-- Show all presentations that a user isn't a part of

select distinct test_lesson.lesson_name 
      from test_lesson   inner join  lights on test_lesson.id = lights.lesson_id
      inner join users on lights.users_id = users.id WHERE users.id != 2

-- show all presentations of which you are the host

select distinct test_lesson.lesson_name 
      from test_lesson   
      inner join users on test_lesson.instructor = users.id WHERE users.email = 'test@test.com';


-- toggle user light

UPDATE lights
SET green_light = NOT green_light
WHERE id = 11
