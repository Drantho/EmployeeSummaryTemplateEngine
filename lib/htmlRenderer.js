const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];
  console.log(...employees);
  html.push(
    wrapSection(employees
      .filter(employee => employee.getRole() === "Manager")
      .map(manager => renderManager(manager))
      , "Manager")
  );
  html.push(wrapSection(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
    , "Engineers"));
  html.push(wrapSection(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
    , "Interns"));

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  // template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  // template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  // template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

const wrapSection = (arr, label) => {
  let tempStr = "";
  // let tempArr = [...arr];
  const topWrapper = `<div class="card">
  <div class="card-header">
    <a class="card-link" data-toggle="collapse" href="#${label}">
      <h2>${getIcon(label)} ${label}</h2>
    </a>
  </div>
  <div id="${label}" class="collapse${label === "Manager" ? " show" : ""}" data-parent="#accordion">
    <div class="card-body">`;


  const bottomWrapper = `
    </div>
  </div>
</div>`;

  tempStr += topWrapper;


  // tempStr += "<div class='row'>"
  tempStr += arr.join("");
  // tempStr += "</div>"
  tempStr += bottomWrapper;

  return tempStr;
}

const getIcon = role => {
  switch (role) {
    case "Manager":
      return `<i class="fas fa-mug-hot mr-2"></i>`;
    case "Engineers":
      return `<i class="fas fa-glasses mr-2"></i>`;
    case "Interns":
      return `<i class="fas fa-user-graduate mr-2"></i>`;
  }
  return "";
}

module.exports = render;
