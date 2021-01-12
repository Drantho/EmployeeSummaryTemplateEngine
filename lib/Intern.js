// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

function Intern(){
    
}

Intern.prototype = Object.create(Employee.prototype);

Intern.prototype.getRole = function(){
    return "Intern";
}

module.exports = Intern;