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
const questions = require("./questions");

const employeeResponse = async (inputs = []) => {
    const empQuestions = questions;
    const { addEmp, ...response } = await inquirer.prompt(empQuestions);
    const newInputs = [...inputs, response];
    return addEmp ? empInputs(newInputs) : newInputs;
  };


const empResponse = async () => {
    const inputs = await getEmployeeInputsFromCli();
    console.log(inputs);
  
    let employees = createArrayOfEmployeeObjects(inputs);
  
    renderEmployeeHtml(employees);
  };

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function renderEmployeeHtml(employees) {
    //
    let output = render(employees);
    fs.writeFile("./output/team.html", output, (err) => {
      if (err) console.log(err);
      else {
        console.log("File Created Successfully \n");
        console.log("Contents of the file:");
      }
    });
  }
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

function createArrayOfEmployeeObjects(inputs) {
    let employees = []; 
  
    inputs.forEach((response) => {
      if (response.role === "Manager") {
        let manager = new Manager(
          response.name,
          response.id,
          response.email,
          response.officeNumber
        );
        employees.push(manager);
      } else if (response.role === "Engineer") {
        let engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        employees.push(engineer);
      } else if (response.role === "Intern") {
        let intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        employees.push(intern);
      }
    });  
    return employees;
  }
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
employeeResponse();