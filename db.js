var driver = require('./graph');

function dbtest() {
    var session = driver.session();
    return session
        .run(
            "match (q:QA) where q.datetime starts with '2019-08-16' return q.comments, q.title"
        )
        .then(result => {
        session.close();
        return result.records
        })
        .catch(error => {
        session.close();
        throw error;
        });
}

exports.dbtest = dbtest