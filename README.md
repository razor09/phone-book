## Description

This is a very simple phone book like application that allows to create, edit and delete contacts after login. API and clients written in `TypeScript` and used database `MySQL`. Also, to run application in an isolated environment used `Docker`.

## Requirements

- docker
- make
- node

## Instruction

The easiest and fastest way to launch the application is to run:

```
make up
```

This will create five containers with database, API and three clients, located at the following addresses:

`express-api` - **localhost:3000**

`angular-client` - **localhost:4000**

`vue-client` - **localhost:4200**

`react-client` - **localhost:4400**

On the login page enter the following credentials:

```
User: root
Password: root
```

To run application locally on the host machine run container with a database:

```
make database-up
```

install node modules and build production dist for each project:

```
npm run update

npm run prod
```

and run node processes:

```
make on
```

**It's important!** In this case, the `pm2` utility is used, which creates processes by the name of the directory.

To stop the application completely running inside containers run:

```
make down
```

To stop all applications running locally on the host machine and container with database run:

```
make off
```

## Development

Run container with a database:

```
make database-up
```

To start development mode, need to go to the directory with the project and run:

```
npm run dev
```
