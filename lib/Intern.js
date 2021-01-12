// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

function Intern(name, id, email, school){
    this.name = name;
    this.id = id;
    this.email = email;
    this.school = school;
}

Intern.prototype = Object.create(Employee.prototype);

Intern.prototype.getRole = function(){
    return "Intern";
}

Intern.prototype.getSchool = function(){
    return this.school;
}

module.exports = Intern;