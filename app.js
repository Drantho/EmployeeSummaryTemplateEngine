const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = require("./questions/questions.json");
const managerQuestions = require("./questions/managerQuestions.json");
const engineerQuestions = require("./questions/engineerQuestions.json");
const internQuestions = require("./questions/internQuestions.json");

const employees = [];

getEmployees = () =>{
    inquirer.prompt(questions)
    .then(response => {
        switch (response.role){
            case "Manager" :
                if(managerExists()){
                    console.log(`Only 1 manager supported.`);
                    getEmployees();
                    break;
                }
                else{
                    inquirer.prompt(managerQuestions)
                    .then(employee => {
                        const manager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
                        employees.push(manager);
                        getEmployees();
                    })
                }
                break;
            case "Engineer" :
                inquirer.prompt(engineerQuestions)
                .then(employee => {
                    const engineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
                    employees.push(engineer);
                    getEmployees();
                })
                break;
            case "Intern" :
                inquirer.prompt(internQuestions)
                .then(employee => {
                    const intern = new Intern(employee.name, employee.id, employee.email, employee.school);
                    employees.push(intern);
                    getEmployees();
                })
                break;
            case "finished":
                renderEmployees(employees);
                break;
            default :
                renderEmployees(employees);
                break;
        }
    })
}

getEmployees();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const renderEmployees = employees => {
    const rendered = render(employees);    
    saveHTML(rendered);
}
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
const saveHTML = html => {
    fs.writeFile(outputPath, html, error => {
        if(error){
            throw(error)
        }
        
        console.log('file created successfully.');        
    })
}
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

const managerExists = () =>{
    return employees.find(element => element.getRole() === "Manager");
}
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
