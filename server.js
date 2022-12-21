const fs = require("fs");
// importing inquirer
const inquirer = require("inquirer");
// importing mysql2
const mysql2 = require("mysql2");
// import console.table
require("console.table");

// connecting database to mysql2
const db = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "Employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log(err);
  console.log("connected as id " + db.threadId);
});

const actions = async () => {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "actions",
        message: "would you like to",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "end",
        ],
      },
    ])
    .then(async (choice) => {
      const { actions } = choice;
      if (actions === "view all departments") {
        await viewDepartments();
      } else if (actions === "view all roles") {
        await viewRoles();
      } else if (actions === "view all employees") {
        await viewEmployees();
      } else if (actions === "add a department") {
        await addDepartment();
      } else if (actions === "add a role") {
        await addRole();
      } else if (actions === "add an employee") {
        await addEmployee();
      } else if (actions === "update an employee role") {
        await updateEmployeeRole();
      } else {
        end();
      }
    });
};

// view all departments
viewDepartments = async () => {
  db.query("SELECT * FROM Department", function (err, table) {
    console.table(table);
    actions();
  });
};
// view all roles
viewRoles = () => {
  db.query(
    "SELECT Role.id, Role.title AS role, Department.name AS department, Role.salary FROM Role JOIN Department ON Department.id = Role.department_id;",
    function (err, table) {
      console.table(table);
      actions();
    }
  );
};
// view all employees
viewEmployees = () => {
  db.query(
    "SELECT Employee.id,Employee.first_name,Employee.last_name,Role.title AS role,Department.name AS department, Role.salary ,manager.first_name AS manager FROM Employee JOIN Role ON Employee.role_id = Role.id JOIN Department ON Role.department_id = Department.id JOIN Employee manager ON Employee.manager_id = manager.id;",
    function (err, table) {
      console.table(table);
      actions();
    }
  );
};
// to add a department
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "enter the name of the department you want to add",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO Department (name) VALUES ("${answer.addDepartment}");`,
        function (err, table) {
          console.log("Department added");
          viewDepartments();
        }
      );
    });
};
// to add a role
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "enter the name of the role you want to add",
      },
      {
        type: "input",
        name: "salary",
        message: "enter the salary for this role",
      },
    ])
    .then((answer) => {
      const inputs = [answer.addRole, answer.salary];
      db.query("SELECT * FROM Department", function (err, table) {
        const departments = table.map(({ name, id }) => ({
          name: name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message:
                "What department do you want this role to be assigned to?",
              choices: departments,
            },
          ])
          .then((answer) => {
            const Department = answer.department;
            inputs.push(Department);
            db.query(
              `INSERT INTO role (title, salary, department_id)VALUES (?, ?, ?)`,
              inputs,
              function (err, table) {
                console.log("role has been added");
                viewRoles();
              }
            );
          });
      });
    });
};
// to add an employee
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "enter employees first name",
      },
      {
        type: "input",
        name: "lastname",
        message: "enter employees last name",
      },
    ])
    .then((answer) => {
      const inputs = [answer.firstname, answer.lastname];

      db.query("SELECT role.id, role.title FROM role", function (err, table) {
        const roles = table.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employees role?",
              choices: roles,
            },
          ])
          .then((answer) => {
            const role = answer.role;
            inputs.push(role);

            db.query(`SELECT * FROM Employee`, function (err, table) {
              const managers = table.map(({ id, first_name }) => ({
                name: first_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((answer) => {
                  const manager = answer.manager;
                  inputs.push(manager);
                  console.log(inputs);

                  db.query(
                    `INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
                    inputs,
                    function (err, table) {
                      console.log("Employee has been added!");
                      viewEmployees();
                    }
                  );
                });
            });
          });
      });
    });
};
// to update an employee role
updateEmployeeRole = () => {
  db.query(`SELECT * FROM employee`, function (err, table) {
    const employees = table.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((answer) => {
        const employee = answer.name;
        const inputs = [];
        inputs.push(employee);

        const roleSql = `SELECT * FROM role`;

        db.query(`SELECT * FROM role`, function (err, table) {
          const roles = table.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((answer) => {
              const role = answer.role;
              inputs.push(role);

              let employee = inputs[0];
              inputs[0] = role;
              inputs[1] = employee;

              db.query(
                `UPDATE Employee SET role_id = ? WHERE id = ?;`,
                inputs,
                (err, table) => {
                  console.log("Employee has been updated!");
                  viewEmployees();
                }
              );
            });
        });
      });
  });
};
// to stop the applictaion
end = () => {
  process.exit();
};

actions();
