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

