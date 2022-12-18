const fs = require("fs");
// importing inquirer
const inquirer = require("inquirer");
// importing mysql2
const mysql2 = require("mysql2");
// import console.table
const consoleTable = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");
const { endianness } = require("os");

// connecting database to mysql2
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Employee_db",
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
          "update employee managers",
          "view employees by mangers",
          "view employees by department",
          "delete department",
          "delete role",
          "delete employee",
          "View the total utilized budget of a department",
          "end",
        ],
      },
    ])
    .then(async (choice) => {
      const { actions } = choice;
      if (choice === "view all departments") {
        await viewDepartments();
      } else if (choice === "view all roles") {
        await viewRoles();
      } else if (choice === "view all employees") {
        await viewEmployees();
      } else if (choice === "add a department") {
        await addDepartment();
      } else if (choice === "add a role") {
        await addRole();
      } else if (choice === "add an employee") {
        await addEmployee();
      } else if (choice === "update an employee role") {
        await updateEmployeeRole();
      } else if (choice === "update employee managers") {
        await updateEmployeeManagers();
      } else if (choice === "view employees by mangers") {
        await viewEmployeesbyManager();
      } else if (choice === "view employees by department") {
        await viewEmployeesbyDepartment();
      } else if (choice === "delete department") {
        await deleteDepartment();
      } else if (choice === "delete role") {
        await deleteRole();
      } else if (choice === "delete employee") {
        await deleteEmployee();
      } else if (choice === "View the total utilized budget of a department") {
        await viewBudgetbyDepartmet();
      } else {
        end();
      }
    });
};

// view all departments
viewDepartments = () => {};
// view all roles
viewRoles = () => {};
// view all employees
viewEmployees = () => {};
// to add a department
addDepartment = () => {};
// to add a role
addRole = () => {};
// to add an employee
addEmployee = () => {};
// to update an employee role
updateEmployeeRole = () => {};
// to update an employee manager
updateEmployeeManagers = () => {};
// to view employees by their manager
viewEmployeesbyManager = () => {};
// to view employyes by departments
viewEmployeesbyDepartment = () => {};
// to delete a department
deleteDepartment = () => {};
// to delete a role
deleteRole = () => {};
// to delete an employee
deleteEmployee = () => {};
// to view budget of a department
viewBudgetbyDepartmet = () => {};
// to stop the applictaion
end = () => {
  db.end
};
