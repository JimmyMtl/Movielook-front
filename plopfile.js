module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a component', // User input prompts provided as arguments to the template
        prompts: [{
            type: 'list',
            name: 'atomicPath',
            message: 'What is the atomic path?',
            choices: ['00-Base', '01-Atoms', '02-Molecules', '03-Organisms', '04-Templates', '05-Pages']
        }, {
            // Raw text input
            type: 'input', // Variable name for this input
            name: 'name', // Prompt to display on command line
            message: 'What is your component name?'
        },],

        actions: [

            {
                type: 'add', // Plop will create directories for us if they do not exist
                // so it's okay to add files in nested locations.
                path: 'src/components/{{atomicPath}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Component/Component.tsx.hbs',
            // }, {
            //     type: 'add',
            //     path: 'src/components/{{atomicPath}}/{{pascalCase name}}/{{pascalCase name}}.test.js',
            //     templateFile: 'plop-templates/Component/Component.test.js.hbs',
            }, {
                type: 'add',
                path: 'src/components/{{atomicPath}}/{{pascalCase name}}/{{pascalCase name}}.module.scss',
                templateFile: 'plop-templates/Component/Component.module.scss.hbs',
            }],
    });
};
