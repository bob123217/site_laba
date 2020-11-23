const url='http://localhost:3000';
let login;

// async function sendRequest(method, url, body) {
//     return new Promise((resolve,reject)=>{
//         const xhr = new XMLHttpRequest()
//         xhr.open(method,url)
//         xhr.responseType='json'
//         xhr.onload = async () => {
//             if (xhr.status >= 400) {
//                 await reject(xhr.response)
//             } else {
//                 await (xhr.response).login
//             }
//         }
//
//         xhr.onerror = () => {
//             reject(xhr.response)
//         }
//
//         xhr.send(JSON.stringify(body))
//     })
// }
// async function RequestLogin() {
//     body = {
//         login: document.getElementById("mail").value,
//         password: document.getElementById("password").value,
//         type: 1
//     }
//
//     await sendRequest('POST', url, body).then(data => {
//
//         alert(data.login)
//         if (data.login === true) {
//             alert("вход выполнен")
//             localStorage.setItem("login", "1");
//             localStorage.setItem("user_name", data.nickname);
//             document.location.href = ("/");
//         } else {
//
//             alert("Неправильный пароли или логин");
//         }
//     })
//         .catch(err => console.log(err))
// }

function RequestLogin(){
    body = {
        login: document.getElementById("mail").value,
        password: document.getElementById("password").value,
        type:1
    }

   fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
       .then(data => {
       if (data.login === true) {
           alert("вход выполнен")
           localStorage.setItem("login", "1");
           localStorage.setItem("user_name", data.nickname);
           document.location.href = ("/");
       } else {
           alert("Неправильный пароли или логин");
       }})
       .catch(console.error);
}

function RequestRegister(){
    body = {
        login: document.getElementById("nickname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        type:2
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
        if (data.login === true) {
            alert("вход выполнен")
            localStorage.setItem("login", "1");
            localStorage.setItem("user_name", data.nickname);
            document.location.href = ("/");
        } else {
            alert("Email или Никнейм уже занят другим пользователем");
        }})
        .catch(console.error);
}

function login_exit() {
    localStorage.setItem("login","0");
    document.location.href = ("/");
}

function nickname() {
    document.write(localStorage.getItem("user_name"))
}

function user() {
    if (login === undefined) {
        login=parseInt(localStorage.getItem("login"));
    }
    if (login === 0) {
        document.write(user_not);
    }
    else {
        document.write(user_yes);
    }

}




let user_not = "<div class=\"navbar\">\n" +
    "    <div class=\"logo\">\n" +
    "        <img src=\"img/logo.png\" alt=\"\">\n" +
    "    </div>\n" +
    "    <a onclick=\"main()\">Главная</a>\n" +
    "    <div class=\"dropdown\">\n" +
    "        <button class=\"dropbtn\">Жанр\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <div class=\"dropdown-content\">\n" +
    "            <a onclick=\"other_games_request('genre',1)\"> FPS </a>\n" +
    "           <a onclick=\"other_games_request('genre',2)\"> Action </a>\n" +
    "            <a onclick=\"other_games_request('genre',3)\"> Racing </a>\n" +
    "            <a onclick=\"other_games_request('genre',4)\"> Logic </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"dropdown\">\n" +
    "        <button class=\"dropbtn\">Платформа\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <div class=\"dropdown-content\">\n" +
    "            <a onclick=\"other_games_request('platform',1)\"> ПК </a>\n" +
    "            <a onclick=\"other_games_request('platform',2)\"> PlayStation </a>\n" +
    "            <a onclick=\"other_games_request('platform',3)\"> XBOX </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "    <input id=\"search_input\" type=\"text\" placeholder=\"Поиск..\">\n" +
    "    <button class=\"find\" onclick=\"found_game()\"> <i class=\"fa fa-home\"></i> Поиск </button>\n" +
    "    </div>\n" +
    "    \n" +
    "\n" +
    "    \n" +
    "    <div class=\"login\">\n" +
    "\n" +
    "        <button class=\"button-modal\" onclick=\"document.getElementById('id01').style.display='block'\" style=\"width:auto;\">Вход</button>\n" +
    "        <button class=\"button-modal\" onclick=\"document.getElementById('id02').style.display='block'\" style=\"width:auto;\">Регистрация</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div>\n" +
    "    <div id=\"id01\" class=\"modal\">\n" +
    "\n" +
    "        <form name=\"login\" class=\"modal-content animate\" action=\"index.html\" method=\"#\">\n" +
    "            <div class=\"container\">\n" +
    "                <label for=\"uname\"><b>Email</b></label>\n" +
    "                <input id=\"mail\" type=\"text\" placeholder=\"Введите Email\" name=\"uname\" required>\n" +
    "\n" +
    "                <label for=\"psw\"><b>Пароль</b></label>\n" +
    "                <input id=\"password\" type=\"password\" placeholder=\" Ведите пароль\" name=\"psw\" required>\n" +
    "\n" +
    "                <button id=\"btn_login\" onclick=\"RequestLogin()\" type=\"button\">Вход</button>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"id02\" class=\"modal\">\n" +
    "\n" +
    "        <form class=\"modal-content animate\" action=\"index.html\" method=\"#\">\n" +
    "            <div class=\"container\">\n" +
    "                <label for=\"name\"><b>Имя</b></label>\n" +
    "                <input id=\"nickname\" type=\"text\" placeholder=\"Введите ваш никнейм\" name=\"nickname\" required>\n" +
    "\n" +
    "                <label for=\"email\"><b>Email</b></label>\n" +
    "                <input id=\"email\" type=\"text\" placeholder=\"Введите вашу почту\" name=\"email\" required>\n" +
    "\n" +
    "                <label for=\"psw\"><b>Пароль</b></label>\n" +
    "                <input id=\"password\" type=\"password\" placeholder=\"Введите пароль\" name=\"psw\" required>\n" +
    "\n" +
    "                <button type=\"button\" onclick=\"RequestRegister()\">Регистрация</button>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <script src=\"js/request.js\"></script>\n" +
    "\n" +
    "    <script>\n" +
    "        // Получить модальное окно\n" +
    "        var modal = document.getElementById('id01');\n" +
    "        var modal2 = document.getElementById('id02');\n" +
    "        // Когда пользователь щелкает в любом месте за пределами модального, закройте его\n" +
    "        window.onclick = function(event) {\n" +
    "            if (event.target == modal) {\n" +
    "                modal.style.display = \"none\";\n" +
    "            }\n" +
    "            if (event.target == modal2) {\n" +
    "                modal2.style.display = \"none\";\n" +
    "            }\n" +
    "        }\n" +
    "    </script>\n" +
    "</div>"

let user_yes= "<div class=\"navbar\">\n" +
    "    <div class=\"logo\">\n" +
    "        <img src=\"img/logo.png\" alt=\"\">\n" +
    "    </div>\n" +
    "    <a onclick=\"main()\">Главная</a>\n" +
    "    <div class=\"dropdown\">\n" +
    "        <button class=\"dropbtn\">Жанр\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <div class=\"dropdown-content\">\n" +
    "            <a onclick=\"other_games_request('genre',1)\"> FPS </a>\n" +
    "           <a onclick=\"other_games_request('genre',2)\"> Action </a>\n" +
    "            <a onclick=\"other_games_request('genre',3)\"> Racing </a>\n" +
    "            <a onclick=\"other_games_request('genre',4)\"> Logic </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"dropdown\">\n" +
    "        <button class=\"dropbtn\">Платформа\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <div class=\"dropdown-content\">\n" +
    "            <a onclick=\"other_games_request('platform',1)\"> ПК </a>\n" +
    "            <a onclick=\"other_games_request('platform',2)\"> PlayStaion </a>\n" +
    "            <a onclick=\"other_games_request('platform',3)\"> XBOX</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "    <input id=\"search_input\" type=\"text\" placeholder=\"Поиск..\">\n" +
    "    <button class=\"find\" onclick=\"found_game()\"> <i class=\"fa fa-home\"></i> Поиск </button>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"login\">\n" +
    "\n" +
    "        <button class=\"button-modal\" onclick=\"login_exit()\">Выйти</button>\n" +
    "        <p> <script type=\"text/javascript\"> nickname() </script> </p>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"



