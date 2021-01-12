// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

function Engineer(){}

Engineer.prototype = Object.create(Employee.prototype);

Engineer.prototype.getRole = function(){
    return "Engineer";
}

module.exports = Engineer;