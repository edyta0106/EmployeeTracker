INSERT INTO department(name)
VALUES ("Engineering"), 
("Finance"), 
("Legal"), 
("Sales");

INSERT INTO role(title, salary, department_id)   
VALUES ("Software Engineer", 120000, 1),
("Lead Engineer", 150000, 1)
("Accountant", 125000, 2),
("Account Manager", 160000, 2),
("Legal Team Lead", 250000, 3)
("Lawyer", 190000, 3),
("Salesperson", 80000, 4),
("Sales Lead", 100000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
("Ashley", "Dell", 2, NULL),
("Sarah", "Rich", 4, NULL),
("Frank", "Genius", 6, NULL),
("Courtney", "Sells", 8, NULL),
("Bob", "Mac", 1, 1),
("Nick", "Money", 3, 2),
("Tom", "Smart", 5, 3),
("Shauna", "Sweet", 7, 4);


