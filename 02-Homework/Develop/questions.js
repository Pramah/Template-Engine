const employeeQuestions = [
    {
      type: "input",
      message: "Please enter your Name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter your employee ID:",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "list",
      message: "Enter your role:",
      choices: ["Manager", "Engineer", "Intern"],
      name: "role",
    },
    {
      type: "input",
      message: "Enter your number:",
      name: "officeNumber",
      when: function (answers) {
        return answers.role === "Manager";
      },
      validate: function (value) {
        var pass = value.match(
          /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid phone number";
      },
    },
    {
      type: "input",
      message: "Enter your GitHub ID:",
      name: "github",
      when: function (answers) {
        return answers.role === "Engineer";
      },
    },
    {
      type: "input",
      message: "Enter your School information:",
      name: "school",
      when: function (answers) {
        return answers.role === "Intern";
      },
    },
    {
      type: "confirm",
      name: "addEmp",
      message: "Other:",
      default: true,
    },
  ];
  
  module.exports = employeeQuestions;