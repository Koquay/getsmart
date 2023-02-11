const configureMiddleware = require('./app/middleware/server.middleware');
const configureServerRoutes = require('./app/routes/server.routes')
const configureMongodb = require('./app/database/mongodb');

const app = require('express')();
require('dotenv').config({ path: './app/.env' });
// const chalk = require('chalk')

// app.disable('etag');
configureMiddleware(app);
configureServerRoutes(app);
configureMongodb();

const PORT = process.env.PORT || process.env.LOCAL_PORT || '4200'

app.listen(PORT, () => {
    console.log(`getsmart listening on port ${PORT}`)
})
