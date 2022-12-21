-- Drops the Employee_db if it exists currently --
DROP DATABASE IF EXISTS Employee_db;
-- Creates the Employee_db database --
CREATE DATABASE Employee_db;
-- use Employee_db database --
USE Employee_db; 

-- Creates the table "Department" within Employee_db --
CREATE TABLE Department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creates the table "Role" within Employee_db --
CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) 
    REFERENCES Department(id)
    ON DELETE SET NULL
);

-- Creates the table "Employee" within Employee_db --
CREATE TABLE Employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (Role_id)
    REFERENCES Role(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) 
    REFERENCES Employee(id) 
);
