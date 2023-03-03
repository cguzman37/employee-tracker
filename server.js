const mysql = require('mysql2');
const question = require('./questions');
const inquirer = require('inquirer');
const { mutateExecOptions } = require('nodemon/lib/config/load');

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
   
    user: 'root',
    password: 'rootroot',
    database: 'employee_db'
    
  },
  console.log(`Connected to the employee_db database.`)
  );
  
  function initialQ () {
  inquirer.prompt(question)
  .then(ans=>{
      console.log(ans);
     
      switch (ans.option) {
          case "Want to try again?":
              initialQ()
              break;
          case "View All Employees":
              allEmployees();
              break;
          case "View All Roles":
              allRoles();
              break; 
          case "View All Departments":
              allDepartments();
              break;   
          case "Update Employee Role":
              updateEmployeeRole();
              break;    
          case "Add Employee":
              addEmployee();
              break;
          case "Add Role":
            addRole();
  
              break;
          case "Add Department":
              addDepartment();
              break;
  
          case "Quit":
          db.end();
          process.exit(0);
      }
  });
  }
  
  init();
  function init(){
    initialQ();
  }
  
  function allEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
    console.table(res);
    initialQ();
    })
};

function allRoles() {
    db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    initialQ();
    })
};

function allDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQ();
    })
};
function addDepartment() {
  inquirer
  .prompt({
    type: "input",
    name: "name",
    message: "What is the name of the department?",
  })
  .then(({ name }) => {
    // Build the SQL insert statement
    const sql = "INSERT INTO department SET ?";

    // Execute the insert statement with the provided parameters
    db.query(sql, { name }, (error, results, fields) => {
      if (error) {
        // Display an error message to the user if the insert statement fails
        console.error(error);
        console.log("Failed to add department");
      } else {
        // Display a success message to the user if the insert statement succeeds
        console.log(`Added department ${name}`);
        initialQ();
      }
    });
  });
}

function addEmployee() {
  let managerList, roleList;

  db.query("SELECT * FROM employee WHERE manager_id IS NULL", (err, results) => {
    if (err) throw err;

    managerList = results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    db.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;

      roleList = results.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      promptUser();
    });
  });

  function promptUser() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter employee last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "Enter employee role ID:",
          choices: roleList,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Enter employee manager ID:",
          choices: managerList,
        },
      ])
      .then((answers) => {
        console.log(answers);
        const { first_name, last_name, role_id, manager_id } = answers;
        const sql =
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        db.query(sql, [first_name, last_name, role_id, manager_id], (error, results) => {
          if (error) {
            console.error(error);
            console.log("Failed to add employee");
          } else {
            console.log("Employee added successfully!");
            initialQ();
          }
        });
      });
  }
}
  
function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    const employeeList = results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          name: "employeeId",
          choices: employeeList,
        },
        {
          type: "input",
          message: "Enter the new role ID:",
          name: "newRoleId",
        },
      ])
      .then((answers) => {
        const { employeeId, newRoleId } = answers;
        db.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [newRoleId, employeeId],
          (err, results) => {
            if (err) throw err;
            console.log(`Employee's role updated successfully!`);
            initialQ();
          }
        );
      });
  });
}
        
function addRole() {
    let departmentList = [];
  
    db.query("SELECT * FROM department ;", (err, results) => {
      if (err) throw err;
      departmentList = results.map((department) => ({
        name: `${department.name} department`,
        value: department.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary?",
          },
          {
            type: "list",
            name: "department",
            choices: departmentList,
            message: "What is the department?",
          }
         ] )
        .then(({ title, salary, department }) => {
          const sql =
            "insert into role(title,salary,department_id)values (?,?,?);";
          db.query(sql, [title, salary, department], (error, results, fields) => {
            if (error) {
              console.error(error);
              console.log("Failed to add role");
            } else {
              console.log(`Added role ${title}}`);
              initialQ();
            }
          });
        });
    });
  }
 