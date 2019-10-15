### <a name="ToC"></a>Table of Contents
1. [Overview](#overview)
2. [MVP Checklist](#mvp)
3. [Immediate post-MVP](#post-mvp)
4. [Long-term goals](#long-term-goals)
5. [App config](#config)
6. [Running the app](#running-app)

### <a name="overview"></a>Overview
#### Purpose
This is a mirror of an application my wife (a front-end developer), brother (someone hoping to get into web development), and I are working on for my dad. So far, I've been the principal developer. My hope is to get them more involved as their schedules free up. So, this README is as much for them as it is to anyone who found themselves here from a link on my resume.

My dad is a marriage counselor who handles a lot of court-appointed counseling, and this app is a CRUD app with two purposes: to ease the pain of onboarding new clients and to report on those clients to the court system. After MVP, whoever takes this app on will likely expand it to handle homework, online classes, and so on.

#### Design decisions
One goal for the app is to be dynamic as possible. So, the forms folks fill out are from questions in the database collected into materialized views. A request is made to the backend for each form, and then iterated over in the relevant frontend component (`QuestionnaireModule` for general forms and the `RegistrationModule` for registering new users). One practical benefit is that forms can be updated without re-deploying the app: just make the change in the database. Apart from this, it's a fairly standard CRUD app.


### <a name="mvp"></a> MVP checklist
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
    - [ ] Using Cluster (or pm2)
  - Tests
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
- Build/deployment
  - [x] Deployable via Docker to AWS
  - [x] Serve statically generated bundle
  - [x] Webpack bundled
    - [x] Dynamic bundles based on env
  - [ ] Figure out a continuous integration pipeline
- Housekeeping
  - [ ] effing eslintrc in place
  - [ ] Get webpack-dev-server running on some other port, to let both the webpack-dev-server (for hot reloading) and the actual server (for real data) run at the same time

### <a name="post-mvp"></a> Immediate post-MVP ideas
- [ ] PWA
- [ ] Periodic assessments (time-based forms; dynamic expiry)
- [ ] OAuth2, WebAuthn, MFA?!

### <a name="long-term-goals"></a> Long-term goals
- [ ] Online class homework
- [ ] Online classes/tutorials
- [ ] Obviously a marriage crypto coin


### <a name="config"></a>App config
The bundling of the app is controlled via `app/config`. In that directory, you'll find a webpack config modularized by environment. There is also a git-ignored directory, `config/env`. You'll need what's in it to run the app. I'll describe each in turn below.

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

// database name: if you run the script below, it'll be family_hope
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
- Get the dependencies: from within `app/`, run `npm install && cd server && npm install && cd ..`.
- To run the app, you'll need a database.
  - `cd server/database-scripts`
  - Open `psql` or `pgcli` or whatever you prefer.
  - Run `\i create-database.sql`
    - Note: _it's crucial you run this from within app/server/database-scripts_. There are relative paths pointing to other sql scripts in the `database-scripts` directory.


#### Client-only
To use the webpack-dev-server, run `npm run develop`. This is useful when working on frontend views, but since this app's forms come from the database, it isn't terribly useful. I'll eventually switch the webpack-dev-server port to one other than port 8080 (which is what I have the server using). That way, you can run both the webpack-dev-server (for hot reloads) and the actual server (for proper data).

#### Server and bundled client
To bundle and then serve the bundled file, from within `app/server`, run:
```
npm run develop
```
To test bundling without serving, from within `app/`, run:

```
npm run bundle-develop
```
There's also a prod bundling script:
```
npm run bundle-production
```

