INSERT INTO department (name)
VALUES ('president'),
       ('IT'),
      ('accountant')

INSERT INTO role (title, salary, department_id)
VALUES ("The Great Gatsby", true, 1),
       ("Huckleberry Finn", true, 3),
       ("100 Years of Solitude", false, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cynthia', 'Guzman','president'),
       ('Huckleberry', 'Finn', 'IT'),
       ('Doja','cat','accountant')
