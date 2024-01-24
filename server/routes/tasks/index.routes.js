module.exports = {
    configure(app) {
      app.use('/api/tasks', require("./tasks.routes"));
    }
};