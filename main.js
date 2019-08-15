var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id

    console.log(url.parse(_url, true))
    if (pathName=='/') {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {

            var template = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>${title}</title>
                    <link href="styles/styles.css" rel="stylesheet" type="text/css">
                    <link href="https://fonts.googleapis.com/css?family=Noto+Serif+KR" rel="stylesheet">
                </head>
                <body>
                    <div class='nav'>
                        <a class="title" href="/">웹프로그래밍 기초</a>
                        <a class="nav-item" href="/?id=html">HTML</a>
                        <a class="nav-item" href="/?id=css">CSS</a>
                        <a class="nav-item" href="/?id=javascript">실습</a>
                    </div>
                    <div class='content'>
                        <h1>${title}</h1>
    
                        <h3>강의 소개</h3>
                        <p>
                            ${description}
                        </p>
                        
                        <h3>목차</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>실습</li>
                        </ul>
                    </div>
                </body>
            </html>
            `
            response.writeHead(200);
            response.end(template)
        });
    
    } else {
        response.writeHead(404);
        response.end('Not found')
    }

    
    // response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);