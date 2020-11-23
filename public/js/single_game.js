const url='http://localhost:3000';

function single_game() {
    alert('dont work')
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
    }).then(response => response.json())
        .then(data => {
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

// function game_name() {
//     document.write(localStorage.getItem("game"))
// }
//
// function game_annotation() {
//     document.write(localStorage.getItem("game_annotation"))
// }
//
// function game_platform() {
//     document.write(localStorage.getItem("platform"))
// }
//
// function game_genre() {
//     document.write(localStorage.getItem("genre"))
// }
//
// function game_screen(index)
// {
//
//     if (index === 1) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict1")  +"\" onclick=\"openModal();currentSlide(1)\" class=\"hover-shadow\">")
//     if (index === 2) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict2")  +"\" onclick=\"openModal();currentSlide(2)\" class=\"hover-shadow\">")
//     if (index === 3) document.write("  <img alt=\"\" src=\"" +  localStorage.getItem("pict3")  +"\" onclick=\"openModal();currentSlide(3)\" class=\"hover-shadow\">")
// }
//
// function game_poster() {
//     document.write("<img src=\"" +  localStorage.getItem("poster")  +"\" alt=\"\">")
// }
//
// function game_screen_modal(index) {
//     if (index === 1) document.write("   <img alt=\"\" src=\"" +  localStorage.getItem("pict1")  +"\" >")
//     if (index === 2) document.write("    <img alt=\"\" src=\"" +  localStorage.getItem("pict2")  +"\">")
//     if (index === 3) document.write("    <img alt=\"\" src=\"" +  localStorage.getItem("pict3")  +"\">")
// }