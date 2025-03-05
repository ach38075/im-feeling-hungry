## Refresher

Run `build_local.sh` to build a docker image and spin it up as a container. Note that `chmod +x build_local.sh` in case you cannot execute it.

If you wanna use your own MongoDB account, please change user and password in the `Dockerfile`.

If you wanna delete all containers created from the image, run `docker stop $(docker ps -q --filter "ancestor=cs4050-backend")`

If you wanna delete the image, run `docker rmi cs4050-backend`

The container will map 8080 port to your host machine, then you can play around http routes using [Postman](https://www.postman.com/). Import `cs4050-http.postman_collection.json` in your postman to have all collections of http APIs loaded.

## Project structure:

- `controllers`: deal with user requests in HTTP
- `models`: data format used by MongoDB
- `routes`: define how a route is handled by a controller in `controllers`
- `app.js`: define a route accessed by fronted and correlate it to a route source file in `routes`
- `examples`: get access to backend by postman 
- `cs4050-http.postman_collection.json`: all http APIs for the testing of backend

## Progress Control
### Done:
- Auth: user + hash(password) in MongoDB
- Feed: add/find/del/update a recipe 

### TODO
Be aware that if you wanna contribute to backend development, there are a few options:
- create a new filter option
- think of what data is stored in MongoDB
- how to fetch data by Google API
- ...
  