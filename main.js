const http = require('http');
const fs = require('fs');
const url = require('url');

var test = require('./db');
var output = []
function d (rec) {
    let dc = new TextDecoder()
    let res = []
    for (var i=0; i<rec.length; i++) {
        res.push(dc.decode(rec[i].get('q.title')))
    }
    return res
}

test.dbtest().then(
    rec => {
        // console.log(rec);
        return d(rec)
    }
).then(op => {
    console.log(op)
})

var app = http.createServer(function (request,response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    var template = {setFormat(){this.format = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${this.title}</title>
            <link href="styles/styles.css" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Noto+Serif+KR" rel="stylesheet">
        </head>
        <body>
            <div class='nav'>
                <a class="title" href="/">웹프로그래밍 기초</a>
                ${this.navList}
            </div>
            <div class='content'>
                <h1>${this.title}</h1>

                <h3>강의 소개</h3>
                <p>
                    ${this.description}
                </p>
            </div>
        </body>
    </html>
    `}, title: "Welcome", description: "hello, node.js", setTitle(title){this.title=title}, setDescription(description){this.description=description}, format:"",
    navList:"", setNavList (fileList) {
        for (var i=0; i<fileList.length; i++) {
            this.navList += `<a class="nav-item" href="/?id=${fileList[i]}">${fileList[i]}</a>
            `;
        }
    }};

    if (pathName=='/') {
        fs.readdir('data', function (err, fileList){

            template.setNavList(fileList);
            if (queryData.id) {

                title = queryData.id;
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, data) {

                    test.dbtest().then(
                        rec => {
                            // console.log(rec);
                            return d(rec)
                        }
                    ).then(op => {
                        template.setTitle(op);
                        // template.setTitle(queryData.id);
                        template.setDescription(data);
                        template.setFormat();
                        response.writeHead(200);
                        response.end(template.format) 
                    })
               
                });
            } else {

                template.setFormat();
                response.writeHead(200);
                response.end(template.format)
            }
        });
    
    } else {
        response.writeHead(404);
        response.end('Not found')
    }
 
});

app.listen(3000);