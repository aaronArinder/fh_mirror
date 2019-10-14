### Overview
This is a mirror of an application my wife (a front-end developer), and I are working on for my dad. He works as a marriage counselor, and we're (slowly) building him a CRUD app. Eventually, we (or whoever takes it on) will expand it to for homework, assessments, and online classes.

The technology used is Node, Vue, and Webpack. So far, we have the scaffolding in place for bundling and statically serving the app, as well as backend logic and frontend views for registration and login. We haven't connected the backend and frontend for registration and login, but will do so shortly. Hopefully you're not reading this before that part is connected. If you are, there's a markdown file in `/app/server` called `auth-notes.md` with notes on how to hit the registration and login routes with curl.

To play with the app, see the sections (4) and (5) below: configuring and running the app.

It's very much a work in progress, and there's a bit of dust on the ground. I've made a mirror of it for applying to jobs; I figure a real-world application (or at least the beginning of one) is useful to see. If you find any bugs, open an issue! This is a mirror, but I'll transfer it to the actual (private) repo where I organize the work for this app.


### <a name="ToC"></a>Table of Contents
1. [MVP Checklist](#mvp)
2. [Immediate post-MVP](#post-mvp)
3. [Long-term goals](#long-term-goals)
4. [App config](#config)
5. [Running the app](#running-app)

### <a name="mvp"></a> MVP checklist
- Build/deployment
  - [x] Deployable via Docker to AWS
  - [x] Serve statically generated bundle
  - [x] Webpack bundled
    - [x] Dynamic bundles based on env
- General
  - Frontend
    - [x] Comment store actions
    - [x] Vue impl
      - [ ] Form validation library
        - [x] Hooked in
        - [ ] All forms validated
      - [x] Design system
  - Backend
    - [ ] Comment auth middleware/routes
  - [ ] Tests!
    - [ ] Pick/setup assertion library/runner
      - [ ] FE
      - [ ] BE
    - [ ] Test coverage acceptable
      - [ ] FE
      - [ ] BE
- Features
  - [x] Registration
    - [x] Back-end logic
    - [x] Front-end view
    - [x] Front-end hooked to back-end
  - [x] Login
    - [x] Back-end logic
    - [x] Front-end view
    - [x] Front-end hooked to back-end
  - [x] Intake form
  - [ ] Basic reporting
    - [ ] Current users and case status
- Housekeeping
  - [ ] effing eslintrc in place

### <a name="post-mvp"></a> Immediate post-MVP ideas
- [ ] PWA
- [ ] Node Cluster (or pm2) for a multi-threaded server
- [ ] Periodic assessments
- [ ] OAuth2 for at least gmail

### <a name="long-term-goals"></a> Long-term goals
- [ ] Online class homework
- [ ] Online classes/tutorials


### <a name="config"></a>App config
The bundling of the app is controlled via `app/config`. You'll find a webpack config in there modularized by environment. There is also a git-ignored directory, `config/env`. You'll need what's in it to run the app. I'll describe it below.

#### <a name="webpack"></a> Webpack
The webpack config is fairly straightforward apart from being modularized. Start with the `common` config file and move to the `dev` config file. If you're not interested in the bundling aspects of the app, you can ignore these files altogether.

#### <a name="env"></a> Env
There is a git-ignored directory in `config` called `env`. It has the following file structure.

```
 config
   |
   +-> env
        |   --
        +-> |  common.env.js
            |  dev.env.js
            |  prod.env.js
            --
```

We'll concern ourselves only with `common.env.js` and `dev.env.js`, with `prod.env.js` just being the prod version of what's in `dev.env.js`. For your `common.env.js`, you'll need the following:

```
const pe = process.env;

/* db settings: used by node-postgres */

// username
pe.PGUSER = '';

// dat password
pe.PGPASSWORD = '';

// postgres host: usually 0.0.0.0
pe.PGHOST = '';

// database name: call it family_hope or whatever you want
pe.PGDATABASE = '';

// standard postgres port
pe.PGPORT = 5432; // standard postgres port


/* server config */
// can be whatever: 8080, 7777, and so on, of type number
pe.PORT = ;


/* JWT config */
pe.secret = ''; // can be whatever--used for JWTs
pe.JWT_EXPIRATION_MS = 60 * 60 * 1000; // minutes/seconds/ms
```

And for `dev.env.js`, you'll need:

```
module.exports = {
  NODE_ENV: 'development'
}
```

This sets the environment to `development`. Eventually, it (and `prod.env.js`) will have separate secrets for local/remote databases. Until then, we're using it only to set the environment.


### <a name="running-app"></a> Running the app
- First, run `nvm use`. That'll get you on the same version of Node I'm currently running (yes, yes, I'll update it soon).
- Get the dependencies: from `app/`, run `npm install && cd server && npm install && cd ..`.
- To run the app, you'll need a database. Open `psql` or `pgcli` or however you do these things, and run `create database <insert_db_name_here>`. You might as well go with `family_hope` as your db name. Make sure whatever your db name is, you put it in `common.env.js` along with your postgres username, host, and password. See the `config` section above.
- Once you've a database, from the `app/` directory (or wherever, so long as you get the path right), open pgcli, psql, or whatever, and run`\i server/database-scripts/create-tables.sql`. Once done, type `commit` and hit enter. You now have tables!

#### Client-only
To use the webpack-dev-server, run `npm run develop`. This is useful when working on frontend views, but otherwise isn't terribly useful; in general, it's better to run the server and statically serve the bundled files to get closer to how the app will actually be served.

#### Server and bundled client
To run the server and statically serve a bundled files, you first need to bundle the files!

- `npm run build-develop`
- `cd server && npm start`

