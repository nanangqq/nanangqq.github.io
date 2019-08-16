const http = require('http');
const fs = require('fs');
const url = require('url');
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
            this.navList += `<a class="nav-item" href="/?id=${fileList[i]}">${fileList[i]}</a>`;
        }
    }};

    // var title
    // var description = {value:"", setValue(string){this.value = string}}
    // console.log(url.parse(_url, true))
    if (pathName=='/') {
        fs.readdir('data', function (err, fileList){
            console.log(fileList)
            template.setNavList(fileList);
            console.log(template.navList)
            if (queryData.id) {
                title = queryData.id;
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, data) {
                    // console.log(data);
                    // description.setValue(data);
                    template.setTitle(queryData.id);
                    template.setDescription(data);
                    // console.log(template);
                    template.setFormat();
                    response.writeHead(200);
                    response.end(template.format)                
                });
            } else {
                // title = "Welcome";
                // description.setValue("hello, node.js");
                template.setFormat();
                response.writeHead(200);
                response.end(template.format)
            }
        });
            
        // var template = `
        // <!DOCTYPE html>
        // <html>
        //     <head>
        //         <meta charset="utf-8">
        //         <title>${title}</title>
        //         <link href="styles/styles.css" rel="stylesheet" type="text/css">
        //         <link href="https://fonts.googleapis.com/css?family=Noto+Serif+KR" rel="stylesheet">
        //     </head>
        //     <body>
        //         <div class='nav'>
        //             <a class="title" href="/">웹프로그래밍 기초</a>
        //             <a class="nav-item" href="/?id=html">HTML</a>
        //             <a class="nav-item" href="/?id=css">CSS</a>
        //             <a class="nav-item" href="/?id=javascript">실습</a>
        //         </div>
        //         <div class='content'>
        //             <h1>${title}</h1>

        //             <h3>강의 소개</h3>
        //             <p>
        //                 ${description.value}
        //             </p>
                    
        //             <h3>목차</h3>
        //             <ul>
        //                 <li>HTML</li>
        //                 <li>CSS</li>
        //                 <li>실습</li>
        //             </ul>
        //         </div>
        //     </body>
        // </html>
        // `
        // response.writeHead(200);
        // response.end(template)
        
    
    } else {
        response.writeHead(404);
        response.end('Not found')
    }
 
});

app.listen(3000);