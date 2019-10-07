This is a mirror of an application my wife (a front-end developer) and I are working on for my dad. He works as a marriage counselor, and we're (slowly) building him a CRUD app to help take in new folks, track their progress, and report on them.


## MVP checklist
- [ ] Registration, login
  - [x] Back-end logic
  - [x] Front-end view
  - [ ] Front-end hooked to back-end
- [x] Deployable via Docker to AWS
- [x] Serve statically generated bundle
- [x] Vue impl
  - [ ] Form validation
  - [x] Design system
  - [x] Webpack bundled
    - [x] Dynamic bundles based on env
- [ ] Basic reporting
  - [ ] Current users and case status


## Config
#### Webpack
#### Env

## Client
#### Server
#### `npm start`
Runs server on port 8080. Must have a `/dist/` with bundled resources.

## Root NPM Scripts
#### `npm run develop`
Uses webpack-dev-server to serve on port 8080.

#### `npm run build-develop`
Bundles a develop version of the app to be served via Node/Express.
