INSERT INTO department(name)
VALUES ("Engineering"), 
("Finance"), 
("Legal"), 
("Sales");

INSERT INTO role (title, salary, department_id)   
VALUES ("Software Engineer", 120000, 1),
("Lead Engineer", 150000, 1)
("Accountant", 125000, 2),
("Account Manager", 160000, 2),
("Legal Team Lead", 250000, 3)
("Lawyer", 190000, 3),
("Salesperson", 80000, 4),
("Sales Lead", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Mac", "Software Engineer", 1, 2)
("Ashley", "Dell", 2, NULL),
("Nick", "Money", 3, 4),
("Sarah", "Rich", 4, NULL),
("Tom", "Smart", 5, 6),
("Frank", "Genius", 6, NULL),
("Shauna", "Sweet", 7, 8),
("Courtney", "Sells", 8, NULL)

