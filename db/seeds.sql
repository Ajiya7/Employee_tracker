INSERT INTO Department (name)
VALUES ("sales"),
       ("finance"),
       ("legal"),
       ("Engineering");


INSERT INTO Role (title, department_id, salary )
VALUES ("Lawyer",3, 200000),
       ("Accountant",2, 80000),
       ("Account manager",2, 155000),
       ("Software engineer",4, 95000),
       ("salesperson",1, 50000),
       ("Lead engineer",4,150000),
       ("sales Lead",1, 75000);


INSERT INTO Employee (first_name, last_name, role_id, manager_id )
VALUES ("Elliot","Sadcfv",1,null),
       ("Amira","sadvb", 4,1),
       ("Christoper","QEWRGHN", 5,2),
       ("Verónica","wqdefrbgr", 3,3),
       ("Igor","aeregtyht", 2,4);