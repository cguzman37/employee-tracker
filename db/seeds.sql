INSERT INTO department (name)
VALUES ('president'),
       ('Corporate'),
      ('Feeder');

INSERT INTO role (title, salary, department_id)
VALUES 
        ("Chef", 90000.00, 1),
       ("Executive Assistant", 70000.00, 2),
       ("Bunny Walker", 50000.00, 3),
       ("Carrot Farmer", 40000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
      ('Cynthia', 'Guzman',4,1),
      ('Huckleberry', 'Finn', 7, NULL),
       ('Doja', 'cat', 5, NULL);
       