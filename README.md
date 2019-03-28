+++
title = "Documents client (Angular)"
+++

# Documents client (Angular)

## Summary

This is the frontend client for the [Documents module](https://docs.walhall.io/marketplace/documents-module/). 

<!-- ## Dependencies

### npm libraries

-  _List of npm packages used_
-  _List of npm packages used_ -->

## Develop this client

-  To **build** the project: `ng build {name-of-module}`  
  -  The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
-  To **run tests** using [Karma](https://karma-runner.github.io/0.13/index.html): `ng test {name-of-module}`
-  To **run end-to-end tests** using [Protractor](https://www.protractortest.org/#/): `ng e2e {name-of-module}`

## File structure

-  `/components`: Components that do not have roots assigned to them.
-  `/helpers`: The client's helper classes.
-  `/pages`: Components that have roots assigned to them.
-  `/services`: Classes that provide data.
-  `/state`: State-related files and data models.
-  `/styles`: Contains styles specific to the client.
-  `routing.module.ts`: Where the client's routes are defined.
-  `ngModule`: Where components, services, pipes, etc. are defined.

## Services

This client connects to the following services:

-  [Documents service (Django)](https://docs.walhall.io/marketplace/documents-module/documents-service)

<!-- Document the ways in which this client connects to the service. Methods used, data models used, endpoints used, etc. -->

## API documentation (Compodoc)

Run `npm run compodoc` to generate [Compodoc](https://compodoc.github.io/compodoc/) documentation to the `/documentation` directory.

## License

Copyright &#169;2019 Humanitec GmbH.

This code is released under the Humanitec Affero GPL. See the **LICENSE** file for more information.