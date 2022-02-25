USE employee_db;

INSERT INTO department (name)
    VALUES ('sales'),('service'),('parts'),('finance');

INSERT INTO role (title,salary,department_id)
    VALUES ('sales associate', 45000.00, 1),
    ('sales manager', 65000.00, 1),
    ('service associate', 45000.00, 2),
    ('service manager', 65000.00, 2),
    ('parts associate', 45000.00, 3),
    ('parts manager', 45000.00, 3),
    ('finance associate', 50000.00, 4),
    ('finance manager', 70000.00, 4);
    -- ('mechanics', 50000.00, 2),

INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES ('Mark', 'Rover', 2, NULL),
    ('Patrick', 'Smith', 1, 1),
    ('Jenna', 'Doe', 4, NULL),
    ('Bella', 'Dooey', 3, 3),
    ('Steven', 'Neal', 6, NULL),
    ('Nicholas', 'Green', 5, 5),
    ('Cindy', 'Lee', 8, NULL),
    ('Brock', 'Johnson', 7, 7);

