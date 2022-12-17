const fs = require("fs");
// importing inquirer
const inquirer = require("inquirer");
// importing mysql2
const mysql2 = require("mysql2");
// import console.table
const consoleTable = require("console.table");

// connecting database to mysql2
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
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

      } else if (choice === "view all roles") {

      } else if (choice === "view all employees") {

      } else if (choice === "add a department") {

      } else if (choice === "add a role") {

      }else if (choice === "add an employee") {

      }else if (choice === "update an employee role") {

      }else if (choice === "update employee managers") {

      }else if (choice === "view employees by mangers") {

      }else if (choice === "view employees by department") {

      }else if (choice === "delete department") {

      }else if (choice === "delete role") {
        
      }else if (choice === "delete employee") {

      }else if (choice ===  "View the total utilized budget of a department") {

      }else{

      }
    });
};
