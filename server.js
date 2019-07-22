var express = require("express");

var app = express();

var PORT = process.env.PORT || 7001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});