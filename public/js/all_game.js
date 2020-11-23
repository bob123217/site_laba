function all_games() {
        let body = {
            type:4
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/text'
            }
        }).then(response => response.json())
            .then(data => {
                localStorage.setItem("data",JSON.stringify(data));
                 })
            .catch(console.error);

}

function main() {
    all_games();
    document.location.href="/";
}

function all_games_html()
{
    all_games();
    let object = JSON.parse (localStorage.getItem ("data"));
    let insert_in_html = "";

    for (let i=0; i<object.game_name.length; i++){
       insert_in_html = insert_in_html + "<div class=\"column\">\n" +
                "            <div class=\"content\" >\n" +
                "                <a onclick=\"single_game("+ i +")\">\n" +
                "                <img src=\""+object.poster[i]+"\" alt=\"Горы\" style=\"width:100%\">\n" +
                "                <p class=\"head-game\" name=\"game_name\">"+ object.game_name[i] +"</p>\n" +
                "                <p class=\"other_information\"> "+ object.info_prevue[i] +"</p>\n" +
                "                </a>\n" +
                "            </div>\n" +
                "        </div>"
    }
    if (object.game_name.length === 0) document.write("<h1> Игры не найдены </h1>")
    document.write(insert_in_html);
}

function other_game() {

    let object = JSON.parse (localStorage.getItem ("data2"));
    let insert_in_html = "";

    for (let i=0; i<object.game_name.length; i++){
        insert_in_html = insert_in_html + "<div class=\"column\">\n" +
            "            <div class=\"content\">\n" +
            "                <a onclick=\"single_game("+i.toString()+")\">\n" +
            "                <img src=\""+object.poster[i]+"\" alt=\"Горы\" style=\"width:100%\">\n" +
            "                <p class=\"head-game\" name=\"game_name\">"+ object.game_name[i] +"</p>\n" +
            "                <p class=\"other_information\"> "+ object.info_prevue[i] +"</p>\n" +
            "                </a>\n" +
            "            </div>\n" +
            "        </div>"
    }

    if (object.game_name.length === 0) document.write("<h1 class=\"game-not-found\"> Игры не найдены </h1>")
    document.write(insert_in_html);

}

function other_games_request(type,val) {
    let body = {
        type:5,
        type_priznak:type,
        priznak:val
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/text'
        }
    }).then(response => response.json())
        .then(data => {
            localStorage.setItem("data2",JSON.stringify(data));
            document.location.href = ("/index_choice.html");

        })
        .catch(console.error);
}

function found_game()
{
    let body = {
        type:6,
        game: document.getElementById("search_input").value,
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/text'
        }
    }).then(response => response.json())
        .then(data => {
            localStorage.setItem("data2",JSON.stringify(data));
            document.location.href = ("/index_choice.html");

        })
        .catch(console.error);
}

function single_game(i) {
    let body = {
        game: document.getElementsByName("game_name")[i].innerHTML,
        type:3
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/text'
        }
    }).then(response =>{response.json()})
        .then(data => {
            alert(data.game_name)
            localStorage.setItem("game", data.game_name);
            localStorage.setItem("game_annotation", data.game_annotation);
            localStorage.setItem("poster", data.poster);
            localStorage.setItem("pict1", data.pict1);
            localStorage.setItem("pict2", data.pict2);
            localStorage.setItem("pict3", data.pict3);
            localStorage.setItem("platform", data.platform);
            localStorage.setItem("genre", data.genre);
            document.location.href = ("/single.html"); })
        .catch(console.error);
}

function game_name() {
    document.write(localStorage.getItem("game"))
}

function game_annotation() {
    document.write(localStorage.getItem("game_annotation"))
}

function game_platform() {
    document.write(localStorage.getItem("platform"))
}

function game_genre() {
    document.write(localStorage.getItem("genre"))
}

function game_screen(index)
{

    if (index === 1) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict1")  +"\" onclick=\"openModal();currentSlide(1)\" class=\"hover-shadow\">")
    if (index === 2) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict2")  +"\" onclick=\"openModal();currentSlide(2)\" class=\"hover-shadow\">")
    if (index === 3) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict3")  +"\" onclick=\"openModal();currentSlide(3)\" class=\"hover-shadow\">")
}

function game_poster() {
    document.write("<img src=\"" +  localStorage.getItem("poster")  +"\" alt=\"\">")
}

function game_screen_modal(index) {
    if (index === 1) document.write("   <img alt=\"\" src=\"" +  localStorage.getItem("pict1")  +"\" >")
    if (index === 2) document.write("    <img alt=\"\" src=\"" +  localStorage.getItem("pict2")  +"\">")
    if (index === 3) document.write("    <img alt=\"\" src=\"" +  localStorage.getItem("pict3")  +"\">")
}