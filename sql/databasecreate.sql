CREATE table test_lesson (
    id serial primary key,
    name TEXT,
    instructor TEXT,
    lesson_href VARCHAR
    
);
CREATE TABLE students (
    id serial primary key,
    name TEXT,
    email TEXT,
    

   
);
CREATE TABLE lights (
    id serial primary key,
    students_id INT REFERENCES students(id),
    lesson_id INT REFERENCES test_lesson(id),
    green_light boolean 
);