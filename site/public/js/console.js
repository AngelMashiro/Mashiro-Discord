document.body.onload = async () => {
    setCookie('ws_token', 'z2qN8KoPgn', 1);
    const socket = new WebSocket('ws://localhost:8080');
    const consoleBody = document.getElementById('console');

    socket.addEventListener('open', () => {
        consoleBody.innerHTML += "(Mashiro-Discord) Succesfully established connection.";
    })

    // Listen for messages
    socket.addEventListener('message', event => {
        const data = event.data.replace(/\n/g, "<br>");

        consoleBody.innerHTML += "<br>" + data;
    });

    //oAuth stuff
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setCookie('oauth_token', token, 7);

    const data = await fetch('http://discordapp.com/api/users/@me', {headers: { Authorization: "Bearer " + token}});
    console.log(await data.json());
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}