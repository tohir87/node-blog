// import packages
const expressEdge = require("express-edge"),
    express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    fileUpload = require("express-fileupload"),
    expressSession = require("express-session"),
    connectMongo = require("connect-mongo"),
    connectFlash = require("connect-flash"),
    edge = require("edge.js");

// import controllers
const homePageController = require("./controllers/homePage"),
    loginUserController = require("./controllers/loginUser"),
    postController = require("./controllers/postsController"),
    authController = require("./controllers/authController");

const app = new express();

//connection
const dbUrl = "mongodb://localhost/Projects";
// connect to mongoose DB
mongoose.connect(dbUrl, { useNewUrlParser: true }, () => {
    console.log('Mongo DB connected');
});

app.use(connectFlash());
const mongoStore = connectMongo(expressSession);

// sign and encrypt data with browser
app.use(
    expressSession({
        secret: "secret",
        store: new mongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);

app.set("views", `${__dirname}/views`);

//register global middleware
app.use("*", (req, res, next) => {
    edge.global("auth", req.session.userId);
    next();
})
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));


// import middleware
const auth = require("./middleware/auth");

app.use('/', homePageController);
app.use('/posts', postController);
app.use('/auth', authController);


app.listen(4000, () => {
    console.log("App listening on port 4000");
});