// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// Array of questions for user input
const questions = [{
  type: 'input',
  name: 'title',
  message: "What is your project's title?",
},
{
  type: 'input',
  name: 'description',
  message: 'Please provide a brief description of your project:',
},
{
  type: 'input',
  name: 'installation',
  message: 'Please provide installation instructions:',
},
{
  type: 'input',
  name: 'usage',
  message: 'Please provide usage information:',
},
{
  type: 'input',
  name: 'contributing',
  message: 'Please provide guidelines for contributing:',
},
{
  type: 'input',
  name: 'tests',
  message: 'Please provide testing instructions:',
},
{
  type: 'list',
  name: 'license',
  message: 'Please choose a license for your project:',
  choices: ['MIT', 'GPL', 'Apache', 'BSD', 'None'],
},
{
  type: 'input',
  name: 'username',
  message: 'What is your GitHub username?',
},
{
  type: 'input',
  name: 'email',
  message: 'What is your email address?',
},
];

// Function to write README file
function writeToFile(fileName, data) { fs.writeFile(fileName, data, (err) =>
  err ? console.error(err) : console.log('Success!')
);
}

// Function to initialize app
function init() {inquirer.prompt(questions).then((answers) => {
  const readmeData = generateReadmeData(answers);
  writeToFile('README.md', readmeData);
});
}

function generateReadmeData(answers) {
  const { title, description, installation, usage, contributing, tests, license, username, email } = answers;

  // Create a string that will contain the contents of the README file
  let readmeData = `# ${title}\n\n`;

  // Description section
  readmeData += `## Description\n\n${description}\n\n`;

  // Contents section
  readmeData += `## Table of Contents\n\n`;
  readmeData += `- [Installation](#installation)\n`;
  readmeData += `- [Usage](#usage)\n`;
  readmeData += `- [Contributing](#contributing)\n`;
  readmeData += `- [Tests](#tests)\n`;
  readmeData += `- [License](#license)\n`;
  readmeData += `- [Questions](#questions)\n\n`;

  // Installation section
  readmeData += `## Installation\n\n${installation}\n\n`;

  // Usage section
  readmeData += `## Usage\n\n${usage}\n\n`;

  // Contributing section
  readmeData += `## Contributing\n\n${contributing}\n\n`;

  // Tests section
  readmeData += `## Tests\n\n${tests}\n\n`;

  // License section
  let licenseText = '';
  switch (license) {
    case 'MIT':
      licenseText = '[MIT License](https://opensource.org/licenses/MIT)';
      break;
    case 'GPL':
      licenseText = '[GPL License](https://www.gnu.org/licenses/gpl-3.0.en.html)';
      break;
    case 'Apache':
      licenseText = '[Apache License](https://www.apache.org/licenses/LICENSE-2.0)';
      break;
    case 'BSD':
      licenseText = '[BSD License](https://opensource.org/licenses/BSD-3-Clause)';
      break;
    default:
      licenseText = 'No license';
  }
  readmeData += `## License\n\n${licenseText}\n\n`;

  // Questions section
  readmeData += `## Questions\n\n`;
  readmeData += `For questions about this project, please contact [${username}](https://github.com/${username}) at ${email}.\n\n`;

  // Returns completed README data
  return readmeData;
}

// Function call to initialize app
init();
