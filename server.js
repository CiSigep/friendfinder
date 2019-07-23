var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 7001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "app", "public", "assets")));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});