// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

function Manager(){}

Manager.prototype = Object.create(Employee.prototype);

Manager.prototype.getRole = function(){
    return "Manager";
}

module.exports = Manager;