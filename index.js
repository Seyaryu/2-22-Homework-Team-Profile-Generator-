const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require('./people/engineer');
const Intern = require('./people/intern');
const Manager = require('./people/manager');
const { useLayoutEffect } = require("react");


function startHTML() {
    var HTMLstart = '';
    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter the team manager\'s name:",
            name: "name"
        },
        {
            type: 'input',
            message: 'What is their ID?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is their email address?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is their office phone number?',
            name: 'phoneNumber'
        },
    ])
    .then(({name, id, email, phoneNumber}) => {
        HTMLstart = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Employee Roster</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <section id = 'navbar'>
                <h1>My Team</h1>
            </section>
        
            <section class = content>
            <div class = 'card'>
                <section class = 'card-header'>
                    <h2>${name}</h2>
                    <h3>Manager</h3>
                </section>
                <ul class = 'card-list'>
                    <li>ID: ${id}</li>
                    <li>Email: <a href="mailto:${email}">${email}</li>
                    <li>Phone Number: ${phoneNumber}</li>
                </ul>
            </div>
        `;
        fs.writeFile('./generatedExample.html', HTMLstart, (err) => {
            if (err) {
                console.log(err);
            }
        })
         addEmployee();
    })
    
}
function generateHTML(newEmployee) {
    let name = newEmployee.getName();
    let role = newEmployee.getRole();
    let id = newEmployee.getID();
    let email = newEmployee.getEmail();
    let html = '';
    if (role == 'Engineer') {
        let github = newEmployee.getGithub();
        html = `<div class = 'card'>
        <section class = 'card-header'>
            <h2>${name}</h2>
            <h3>Engineer</h3>
        </section>
        <ul class = 'card-list'>
            <li>ID: ${id}</li>
            <li>Email: <a href="mailto:${email}">${email}</li>
            <li>Github: <a href="https://github.com/${github}">https://github.com/${github}</li>
        </ul>
        </div>`
    } else {
        let school = newEmployee.getSchool();
        html = `<div class = 'card'>
        <section class = 'card-header'>
            <h2>${name}</h2>
            <h3>Intern</h3>
        </section>
        <ul class = 'card-list'>
            <li>ID: ${id}</li>
            <li>Email: <a href="mailto:${email}">${email}</li>
            <li>School: ${school}</li>
        </ul>
        </div>`
    }
    fs.appendFile('generatedExample.html', html, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

function endHTML() {
    const endHTML = `</section> 
    </body>
    </html>`;

    fs.appendFile('generatedExample.html', endHTML, (err) =>
    err ? console.error(err) : console.log('HTML Generated!')
    );
}

function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please enter the team members name:',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is their ID?',
            name: 'id',
        },
        {
            type: 'list',
            message: 'What is their role?',
            choices: ['Engineer', 'Intern'],
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is their email address?',
            name: 'email'
        },
    ])
    .then(({name, role, id, email}) => {
        let roleType = '';
        if (role == 'Engineer') {
            roleType = 'GitHub username'
        } else if (role == 'Intern') {
            roleType = 'school name'
        }
        var roleCheck = role;
        inquirer.prompt([
            {
                type: 'input',
                message: `What is their ${roleType}?`,
                name: 'roleAnswer'
            },
            {                
                type: 'list',
                message: "Do you want to add another member?",
                choices: ["yes", "no"],
                name: "addMore"
            }
        ])
        .then(({roleCheck, roleAnswer, addMore}) => {
            let newEmployee;
            if (roleCheck == 'Engineer') {
                newEmployee = new Engineer(name, id, email, roleAnswer)
            } else {
                newEmployee = new Intern(name, id, email, roleAnswer)
            }
            generateHTML(newEmployee);
            if (addMore == "yes") {
                addEmployee();
            } else {
                endHTML();
            }
        })
    })
}

startHTML();