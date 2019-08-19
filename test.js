var driver = require('./graph');
var session = driver.session()

let d = new TextDecoder()
let e = new TextEncoder()

const resultPromise = session.writeTransaction(tx =>
  tx.run(
    "match (q:QA) where q.datetime starts with '2019-08-16' return q.comments, q.title"
  )
)


var output = {setData(input){
    this.data = input
}}

function exp(input) {
    exports.list = input
}

// exports.list = 1

resultPromise.then(result => {
    session.close()

    const singleRecord = result.records[0]
    const greeting = singleRecord.get(0)
    var tmp = []
    for (var i=0; i<result.records.length; i++) {
        tmp.push(d.decode(result.records[i].get('q.title')))
    }
    console.log(tmp)

    // output.setData(tmp)
    // exp(tmp)    
    // 
    // console.log(output)
    driver.close()
    // return tmp
})

