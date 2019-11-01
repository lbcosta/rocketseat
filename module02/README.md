# Module 02

## Goals
- Create a new (backend/server) application
- Connect to a SQL Database
- Learn ORM concepts
- Learn code patterns
- Work with user authentication
- Learn how to use Docker

## Sucrase + Nodemon configuration:
[Sucrase](https://github.com/alangpierce/sucrase) is a super-fast Babel alternative. It makes possible to use newer syntax such as Import/Export. On the other hand, [Nodemon](https://github.com/remy/nodemon) is a monitor that automatically restart the server when you make any change in your code. Here's how to use them both:

1) Install Sucrase and Nodemon

```bash
yarn add sucrase nodemon -D
```

2) Create a start script for development and a debug script in your *package.json*

```json
"scripts": {
    "dev": "nodemon src/server.js",
    "dev:debug": "nodemon --inspect src/server.js"
  }
```

3) Configure Nodemon to start using Sucrase

```json
{
  "execMap": {
    "js": "node -r sucrase/register"
  }
}
```

4) Your debugging file *(launch.json)* should look like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```
5) To start debugging, run ```yarn dev:debug``` and start the VSCode debugger.

## Docker configuration
After installing [Docker CE](https://github.com/docker/docker-ce), run the following command to create a postgreSQL container from *postgres* image:

```bash
docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
```

> **run**: creates a container from a image

> **--name database**:  names the container as "database"

> **-e POSTGRES_PASSWORD=docker**: sets the environment variable POSTGRES_PASSWORD as "docker"

> **-p 5432:5433**:  Redirects the host machine's port 5433 to docker container's port 5432 (postgres)

> **-d postgres**:  Image used to create the container

## ESLint, Prettier & EditorConfig configuration:
Explanation...

> Before following the below steps, you have to install some VSCode Extensions: **ESLint**, **Prettier** and **EditorConfig**.

1) Install the necessary packages as dev dependencies:

```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier
```

2) Initialize ESLint:

```bash
yarn eslint --init
```

3) The terminal will ask you some questions about your configuration. Choose the following options:
   1) **How would you like to use ESLint?** *To check syntax, find problems, and enforce code style*
   2) **What type of modules does your project use?** *JavaScript modules (import/export)*
   3) **Which framework does your project use?** *None of these*
   4) **Does your project use TypeScript?** *No*
   5) **Where does your code run?** *Node*
   6) **How would you like to define a style for your project?** *Use a popular style guide*
   7) **Which style guide do you want to follow?** *Airbnb (https://github.com/airbnb/javascript)*
   8) **What format do you want your config file to be in?** *JavaScript*
   9) **Would you like to install them now with npm?** *Yes*

4) Delete the created *package-lock.json* file (as we're not using npm) and run ```yarn``` to install the new dependencies via yarn (it'll update the yarn.lock file).

5) After the steps above, a *.eslintrc.js* file is created. Change it to look like this:

```javascript
module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
};
```

6) Create a *.prettierrc* file with this content:

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

> Note: If you want to correct all your files at once, you can run ```yarn eslint --fix src --ext .js```

7) In VSCode, right-click at the root folder and choose *Generate .editorconfig*. Then switch the two last lines to true. Your *.editorconfig* file should look like this:

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## Sequelize configuration:
