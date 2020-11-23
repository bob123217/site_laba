const http = require('http')
const fs = require('fs')
const path = require('path')
const mysql = require("mysql2");
const Stream = require('stream').Transform;


let login=false;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "site",
    password: "zombi400"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


const server = http.createServer((req, res) =>{
    res.writeHead(200,{'Content-Type':'application/json'})
    //ответ с сервера
    var json;

    if (req.method == 'POST')
    {
        // POST
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

         req.on('end', () => {
            console.log(body);
            let params
                try {
                    params = JSON.parse(body);
                } catch (err) {
                    console.log("упс...");
                }
            if (params != undefined) {
                if (params.type === 1) {


                    const user = [params.login, params.password];
                    const sql = "select * from users where email like ? and pass like ?"

                    connection.query(sql, user, function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);




                        if (results[0] === undefined) {
                            console.log("пользователь не найден");
                            json = {
                                login: false,

                            }

                        } else {
                            console.log("такой пользователь есть");
                            json = {
                                nickname: results[0].login,
                                login: true,

                            }

                        }
                        res.end(JSON.stringify(json));
                    });
                }
                if (params.type === 2) {
                    const user = [params.email, params.login];
                    const sql = "select * from users where email like ? or login like ?"

                    connection.query(sql, user, function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);


                        if (results[0] === undefined) {
                            console.log("такого пользователя нет");
                            const user2 = [params.login, params.email, params.password];
                            const sql2 = "insert into users (login, email, pass) values (?,?,?)"
                            connection.query(sql2, user2, function (err, results) {
                                if (err) console.log(err);
                                else console.log(results);
                                json = {
                                    nickname: params.login,
                                    login: true,
                                    code: "OK"
                                }
                            })

                        } else {
                            console.log("такой пользователь есть");
                            json = {
                                login: false,
                                code: "OK"
                            }

                        }
                        res.end(JSON.stringify(json));
                    });
                }
                if (params.type === 3) {

                   console.log(params.game)
                    const user = [params.game];
                    const sql = "select * from games where game like ?"

                    connection.query(sql, user, function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);


                            const params_genre=[results[0].id_genre]
                            const sql_genre ="select * from genre where id like ?"

                            const params_platform=[results[0].id_platform]
                            const sql_platform ="select * from platform where id like ?"



                            connection.query(sql_genre,params_genre, function (err,result) {
                               let genre = result[0].genre

                                connection.query(sql_platform,params_platform, function (err,result) {
                                    let platform = result[0].platform

                            json = {
                                game_name: results[0].game,
                                game_annotation: results[0].annotation,
                                poster: results[0].poster,
                                pict1: results[0].pict1,
                                pict2: results[0].pict2,
                                pict3: results[0].pict3,
                                platform: platform,
                                genre: genre
                            }

                        console.log(JSON.stringify(json))
                        res.end(JSON.stringify(json))
                                })
                            })
                    });
                }
                if (params.type === 4) {


                    const sql = "select * from games"

                    connection.query(sql, "", function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);


                            var session = {
                                'game_name':[],
                                'info_prevue':[],
                                'poster':[]
                            }

                            console.log("такой пользователь есть");
                            for (let i=0; i<results.length; i++) {

                                session.game_name.push(results[i].game);
                                session.info_prevue.push(results[i].info_prevue);
                                session.poster.push(results[i].poster);
                            }
                                res.end(JSON.stringify(session));
                        console.log(JSON.stringify(session));
                    });
                }
                if (params.type === 5) {

                    let sql; let parametrs;
                    if (params.type_priznak === "platform") {
                        sql= "select * from games where id_platform like ?"
                        parametrs = [params.priznak]
                    } else
                    {
                        parametrs =[params.priznak]
                        sql= "select * from games where id_genre like ?"
                    }
                    {
                        console.log(sql);
                        console.log(parametrs);
                        connection.query(sql, parametrs, function (err, results) {
                                if (err) console.log(err);
                                else console.log(results);

                                var session = {
                                    'game_name': [],
                                    'info_prevue': [],
                                    'poster': []
                                }

                                console.log("такой пользователь есть");
                                for (let i = 0; i < results.length; i++) {

                                    session.game_name.push(results[i].game);
                                    session.info_prevue.push(results[i].info_prevue);
                                    session.poster.push(results[i].poster);
                                }
                                res.end(JSON.stringify(session));
                                console.log(JSON.stringify(session));
                            }
                        );
                    }
                }
                if (params.type === 6) {

                    let sql; let parametrs;

                        sql= "select * from games where game like "+ "'%"+params.game.toString()+"%'";
                        parametrs = [params.game]

                    {
                        console.log(sql);
                        console.log(parametrs);
                        connection.query(sql, "", function (err, results) {
                                if (err) console.log(err);
                                else console.log(results);

                                var session = {
                                    'game_name': [],
                                    'info_prevue': [],
                                    'poster': []
                                }

                                console.log("такой пользователь есть");
                                for (let i = 0; i < results.length; i++) {

                                    session.game_name.push(results[i].game);
                                    session.info_prevue.push(results[i].info_prevue);
                                    session.poster.push(results[i].poster);
                                }
                                res.end(JSON.stringify(session));
                                console.log(JSON.stringify(session));
                            }
                        );
                    }
                }
            }
        });
    }

    // if (req.url === '/')
    // {
    //     fs.readFile(path.join(__dirname,'public','index.html'), (err,data) =>{
    //         if (err) {
    //             throw err
    //         }
    //
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         })
    //         res.end(data)
    //     })
    // }
    // if (req.url === '/contact')
    // {
    //     fs.readFile(path.join(__dirname,'public','contact.html'), (err,data) =>{
    //         if (err) {
    //             throw err
    //         }
    //
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         })
    //         res.end(data)
    //     })
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url)
    const ext = path.extname(filePath)
    let contentType = 'text/html'

    switch (ext) {
        case '.svg':
            contentType='application/image/svg+xml'
            break
        case '.css':
            contentType='text/css'
            break
        case '.woff':
            contentType='application/font-woff'
            break
        case '.js':
            contentType='text/javascript'
            break
        case '.png':
            contentType='image/png'
            break
        case '.jpg':
            contentType='image/jpg'
            break
        default:
            contentType='text/html'
    }

    if (!ext) {
        filePath += '.html'
    }

    console.log(filePath)

    fs.readFile(filePath, (err,content) => {
        if (err) {
            fs.readFile(path.join(__dirname,'public', 'error.html'), (err,data) => {
                if (err)
                {
                    res.writeHead((500))
                    res.end('ERROR')
                } else
                {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })

                    res.end(data)
                }
            })
        }
        else {
            res.writeHead(200, {
                'Content-Type': contentType
            })

            res.end(content)
        }
    })

})

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{
    console.log(`Server has been started ON ${PORT}...`)
})
