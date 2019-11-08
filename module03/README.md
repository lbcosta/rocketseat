# Module 03

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

## Sequelize configuration and project structure:

1) Inside */src* folder, create a */config* folder with a *database.js* file. This file will contain our database configuration.

2) Inside */src* folder, create a */database* folder with a */migrations* folder inside. The */database* folder will contain everything about the database.

3) Create a */src/app* folder with two folders inside: */src/app/controllers* and */src/app/models*. Basically every logic of our application will be in the */app* folder.
4) Install the sequelize and postgres dependencies:

```bash
yarn add sequelize pg pg-hstore
```

5) Install the sequelize-cli as a dev dependency:

```bash
yarn add -D sequelize-cli
```

6) Create a .sequelizerc file on the project root folder and fill it with the sequelize configuration content:

```javascript
const { resolve } = require('path');

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
};
```

7) Now fill the */src/config/database.js* file with the database configuration content:

```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // columns created_at and updated_at
    underscored: true, // tables and columns naming
    underscoredAll: true,
  },
};
```

## First Migration

1) Run the above command to create a migration file that will create a Users table

```bash
yarn sequelize migration:create --name=create-users
```

2) Fill the created file that is inside the */migrations* folder with the migration content:

```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
```

3) Run the migration

```bash
yarn sequelize db:migrate
```

4) Check the database inside the docker container. It should have a table "users".


## First Model

1) Inside */src/app/models*, create a file called *User.js* with the following content:

```javascript
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Table columns (Avoid primary keys, foreing keys or even created_at and updated_at)
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
```

## Model Loader

1) Inside */src/database* create a file called *index.js*:

```javascript
import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
```
