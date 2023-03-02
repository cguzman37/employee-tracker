INSERT INTO department (name)
VALUES ('president'),
       ('IT'),
      ('accountant');

INSERT INTO role (title, salary, department_id)
VALUES 
        ("The Great Gatsby", 90000.00, 1),
       ("Huckleberry Finn", 70000.00, 2),
       ("100 Years of Solitude", 50000.00, 3),
       ("The Great Catsby", 40000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
       ('Huckleberry', 'Finn', 7, NULL),
       ('Doja', 'cat', 5, NULL),
       ('Cynthia', 'Guzman', 4, 1);

