# Nectar Community

[nectar.community](nectar.community)

## Prerequisites / First time setup

- Copy frontend config `src/constants/config.dist.json` to `src/constants/config.json` and 
edit if needed

- Copy server config `server/config.dist.js` to `server/config.js` and edit if needed

- Run `yarn` to install dependencies

- Run `yarn prod` to build frontend

- Create sqlite database used for backup and create table by running `server/create.sql`. 
Set the database location in `server/config.js`

- Make sure to have a `grenache-grape` node running and set it's url in `server/config.js` 
and `src/constants/config.json`

- Run the Grenache service by running `node server/crud-service.js`

- Run the backend by running `node server/index.js`

## CLI commands

To start the website development build locally run ```yarn dev```

To start the website production build locally run ```yarn prod-serve```

To build production files in the dist directory run ```yarn prod```
