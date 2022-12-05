const inquirer = require("inquirer");
const db = require("./lib/connection");

require("console.table");

const initialChoice = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View all Departments", "View all Roles", "View all Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"],
    name: "initialChoice",
  },
];

const newDepartment = [
  {
    type: "input",
    message: "What is the name of your Department?",
    name: "department",
  },
];

// this is where all my prompts go
function initialPrompt() {
  inquirer.prompt(initialChoice).then((answer) => {
    switch (answer.initialChoice) {
      case "View all Departments":
        getDepartments();
        break;
      case "View all Roles":
        getRoles();
        break;
      case "View all Employees":
        getEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployee();
        break;
      default:
        initialPrompt();
    }
  });
}

function getDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    console.table(res);
    initialPrompt();
  });
}

function getRoles() {
  db.query(
    `SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON department.id = role.department_id`,
    (err, res) => {
      console.table(res);
      initialPrompt();
    }
  );
}

function getEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, title, salary, name AS department, CONCAT(manager.first_name, " " , manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
    (err, res) => {
      console.table(res);
      initialPrompt();
    }
  );
}

function addDepartment() {
  inquirer.prompt(newDepartment).then((answer) => {
    db.query(`INSERT INTO department(name) VALUES (?)`, [answer.department], (err, res) => {
      console.log("Department Added");
      initialPrompt();
    });
  });
}

function addRole() {
  db.query("SELECT * FROM department", (err, res) => {
    const departments = res.map((dep) => {
      return {
        name: dep.name,
        value: dep.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the Role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary of the Role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which Department does this Role belong to?",
          choices: departments,
          name: "department",
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)",
          [answer.roleName, answer.salary, answer.department],
          (err, res) => {
            console.log("Role Added");
            initialPrompt();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM role", (err, res) => {
    const roles = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    db.query("SELECT * FROM employee", (err, res) => {
      const manager = res.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.role_id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the Employee's first name?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the Employee's last name?",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the Employee's role?",
            choices: roles,
            name: "employeeRole",
          },
          {
            type: "confirm",
            message: "Does this employee have a manager?",
            name: "managerConfirm",
          },
          {
            type: "list",
            message: "Who is the Employee's manager?",
            choices: manager,
            when(data) {
              return data.managerConfirm;
            },
            name: "employeeManager",
          },
        ])
        .then((answer) => {
          db.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [answer.firstName, answer.lastName, answer.employeeRole, answer.employeeManager],
            (err, res) => {
              console.log("Employee Added");
              initialPrompt();
            }
          );
        });
    });
  });
}

function updateEmployee() {
  db.query("SELECT * FROM employee", (err, res) => {
    const employee = res.map((employee) => {
      return {
        name: employee.first_name + employee.last_name,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM role", (err, res) => {
      const role = res.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "Please choose the Employee to update",
            choices: employee,
            name: "updateEmployee",
          },
          {
            type: "list",
            message: "What is the Employee's role?",
            choices: role,
            name: "employeeRole",
          },
        ])
        .then((answer) => {
          db.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)",
            [answer.firstName, answer.lastName, answer.employeeRole, answer.employeeManagernpm],
            (err, res) => {
              console.log("Updated Role");
              initialPrompt();
            }
          );
        });
    });
  });
}

initialPrompt();
