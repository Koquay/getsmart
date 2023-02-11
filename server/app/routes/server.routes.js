const indexRoutes = require('../index/index.routes');
const subjectsRoutes = require('../subjects/subjects.routes');
const topicsRoutes = require('../topics/topics.routes');
const userRoutes = require('../user/user.routes');

module.exports = (app) => {
    app.use('/api/subjects', subjectsRoutes)
    app.use('/api/topics', topicsRoutes)
    app.use('/api/user', userRoutes)
    
    app.use('/*', indexRoutes);
}

