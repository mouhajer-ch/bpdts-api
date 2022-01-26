# bpdts API Project

List of users who are either living in London, or whose current coordinates are within 50 miles of London.

## Technologies

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Swagger](https://swagger.io/)

## Run with Docker

- docker build . -t <docker_image_name_tbd>
- docker run -p 8080:8080 -d <docker_image_name_tbd>
- docker logs --tail 1000 -f <container_name>

## Dev mode

- npm install   //  Install Dependencies
- npm run build //  To build
- npm run test  //  To Test
- npm run lint  //  Linting
- npm start     //  To exec

## Swagger BPDTS API Link

- localhost:8080/api-docs

## Endpoints

Method | Path | Description
--- | --- | ---
GET | `/api/users/london` | Returns result(s) for users who are either living in London, or whose current coordinates are within 50 miles of London

## TO DO

- User 266, 322 and 554 for example, dubius city ("L’govskiy", "Rokiciny" and 'Surup')
- Data types returned for Users contains discrepancies.
- Check/confirm London coordinate
- Improve `arePointsNear` to a certen margin error
