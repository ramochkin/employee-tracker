const inquirer = require('inquirer')
const { addDepartment } = require('./db')
const db = require('./db')
const { listenerCount } = require('./db/config')
require('console.table')

function start() {
    mainPrompt()
};

function mainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Finish'
            ],
            name: 'initialQuestion'
        }
    ]).then((answer) => {
        switch (answer.initialQuestion) {
            case "View all departments":
                viewAllDepartments()
                break;
            case "View all roles":
                viewAllRoles()
                break;
            case 'View all employees':
                ViewAllEmployees()
                break;
            case 'Add a department':
                addADepartment()
                break;
            case 'Add a role':
                addARole()
                break;
            case 'Add an employee':
                addAnEmployee()
                break;
            case 'Update an employee role':
                updateAnEmplyeeRole()
                break;
            default:
                process.exit();
        }
    })
};

function viewAllDepartments() {
    db.findDepartments().then(([data]) => {
        console.table(data)
    }).then(() => mainPrompt())
}

function viewAllRoles() {
    db.findRoles().then(([data]) => {
        console.table(data)
    }).then(() => mainPrompt())
}

function ViewAllEmployees() {
    db.findEmployees().then(([data]) => {
        console.table(data)
    }).then(() => mainPrompt())
}

function addADepartment() {
    inquirer.prompt([{
        type: 'input',
        message: "What's the new department name?",
        name: 'name'
    }]).then((res) => {
        db.addDepartment(res).then(() => {
            console.log('New Department added!')
        }).then(() => {
            mainPrompt()
        })
    })
}

function addARole() {
    db.findDepartments().then(([depts]) => {
        const departmentChoices = depts.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'input',
                message: 'Whats the title of the role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Whats the salary of this role?',
                name: 'salary'
            },
            {
                type: 'list',
                messgae: 'What department does this role belong to?',
                choices: departmentChoices,
                name: 'department_id'
            }
        ]).then((res) => {
            db.addRole(res).then(() => {
                console.log('New role added!')
            }).then(() => mainPrompt())
        })

    })
}

function addAnEmployee() {
    db.findRoles().then(([roles]) => {
        const roleChoices = roles.map(({ title, id }) => ({
            name: title,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'last_name'
            },
            {
                type: 'list',
                message: 'What role does this employee have?',
                choices: roleChoices,
                name: 'role_id'
            }
        ]).then((res) => {
            const firstName = res.first_name
            const lastName = res.last_name
            const role = res.role_id

            db.findEmployees().then(([employees]) => {
                const managerChoices = employees.map(({ first_name, last_name, id }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                managerChoices.unshift({ name: "None", value: null });

                console.log(managerChoices)

                //console.log('Good Morning')
                inquirer.prompt([{
                    type: 'list',
                    message: 'Who is the manager',
                    choices: managerChoices,
                    name: 'manager_id'
                }])

                    .then((res) => {
                        console.log(res)
                        let newEmployee = {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: role,
                            manager_id: res.manager_id
                        }
                        db.addEmployee(newEmployee).then(() => console.log('New Employee added!')).then(() => mainPrompt())

                    })
            })
        })
    })
}

function updateAnEmplyeeRole(){
    db.findEmployees().then(([res])=>{
        const allEmployees = res.map(({ first_name, last_name, id }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'list',
                message: "Who's role would you like to update?",
                choices: allEmployees,
                name: 'employee_id'
            }
        ]).then((res)=>{
            //Employee to be changed
            const employee = res.employee_id

            db.findRoles().then(([res])=> {
                const allRoles = res.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));

                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which role would you like to update too?',
                        choices: allRoles,
                        name: 'role_id'
                    }
                ]).then((res)=>{
                    db.updateAnEmployee(employee , res.role_id)
                }).then(()=>console.log('Updated an Employee!')).then(()=> mainPrompt())
            })
        })
    })
}

start()


