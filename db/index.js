const connection = require('./config')

class allMethods{
    constructor(connection) {
        this.connection = connection;
    }

    findDepartments(){
        return this.connection.promise().query('SELECT * FROM department;')
    }

    findRoles(){
        return this.connection.promise().query('SELECT role.title, role.id, department.name as department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    //first names, last names, job titles, departments, salaries, and managers that the employees report to
    findEmployees(){
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }

    addDepartment(department){
        return this.connection.promise().query('INSERT INTO department SET ?', department);
    }

    addRole(role){
        return this.connection.promise().query('INSERT INTO role SET ?', role)
    }
    
    addEmployee(employee){
        return this.connection.promise().query('INSERT INTO employee SET ?', employee)
    }

    updateAnEmployee(x,y){
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [y,x])
    }
}

module.exports = new allMethods(connection)