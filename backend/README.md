## Intro -- I'm Feeling Hungry backend specific README

Run `build_local.sh` to build a docker image and spin it up as a container. Note that `chmod +x build_local.sh` in case you cannot execute it.

When the container runs properly, you will see a successfully connection to MongoDB.
```
./build_local.sh 
Docker is installed, proceeding with the script...
[+] Building 1.0s (10/10) FINISHED                                  docker:desktop-linux
 => [internal] load .dockerignore                                                   0.0s
 => => transferring context: 2B                                                     0.0s
 => [internal] load build definition from Dockerfile                                0.0s
 => => transferring dockerfile: 222B                                                0.0s
 => [internal] load metadata for docker.io/library/node:latest                      0.9s
 => [1/5] FROM docker.io/library/node@sha256:c29271c7f2b4788fe9b90a7506d790dc8f2ff  0.0s
 => [internal] load build context                                                   0.0s
 => => transferring context: 1.51MB                                                 0.0s
 => CACHED [2/5] WORKDIR /app                                                       0.0s
 => CACHED [3/5] COPY package.json .                                                0.0s
 => CACHED [4/5] RUN npm install                                                    0.0s
 => [5/5] COPY . .                                                                  0.0s
 => exporting to image                                                              0.0s
 => => exporting layers                                                             0.0s
 => => writing image sha256:860ebb9f49b53fcca6c584d8ba0c9f917698e7310b24b0002af6e9  0.0s
 => => naming to docker.io/library/cs4050-backend                                   0.0s

What's Next?
  View summary of image vulnerabilities and recommendations → docker scout quickview

> nodejs-complete-guide@1.0.0 start
> nodemon app.js

[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
(node:32) [DEP0170] DeprecationWarning: The URL mongodb://cs4050-project:LBVL3KUfVmIe8BnJ@cluster0-shard-00-00.3hiee.mongodb.net:27017,cluster0-shard-00-01.3hiee.mongodb.net:27017,cluster0-shard-00-02.3hiee.mongodb.net:27017/?authSource=admin&replicaSet=atlas-zyzy9y-shard-0&retryWrites=true&w=majority&appName=Cluster0&ssl=true is invalid. Future versions of Node.js will throw an error.
(Use `node --trace-deprecation ...` to show where the warning was created)
connected to mongoDB successfully
```


If you wanna use your own MongoDB account, please change `MONGODB_USERNAME` and `MONGODB_PASSWORD` in the `Dockerfile`.

If you wanna delete all containers created from the image, run `docker stop $(docker ps -q --filter "ancestor=cs4050-backend")`

If you wanna delete the image, run `docker rmi cs4050-backend`

The container will map 8080 port to your host machine, then you can play around available http APIs using [Postman](https://www.postman.com/). Import `cs4050-http.postman_collection.json` in your postman to have all collections of http APIs loaded.

## Project structure:

- `controllers`: deal with user requests in HTTP
- `models`: data format used by MongoDB
- `routes`: define how a route is handled by a controller in `controllers`
- `app.js`: define a route accessed by fronted and correlate it to a route source file in `routes`
- `examples`: get access to backend by postman 
- `cs4050-http.postman_collection.json`: all http APIs for the testing of backend

  
