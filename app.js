const { app } = require("./src/server");
const { PORT, APP_URI } = require("./src/config");


// start app express server
app.listen(PORT, ()=>{
    console.info(`APP running on: ${APP_URI}${PORT}`);
});