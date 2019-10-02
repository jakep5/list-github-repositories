function watchForm() {
    $('form').submit(function(e) {
        e.preventDefault();
        const userNameInput = $("#userName").val();
        getRepos(userNameInput);
    })
}

function getRepos(user) {
    const searchUrl = `https://api.github.com/users/${user}/repos`;
    console.log(searchUrl);
    fetch(searchUrl)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            else {
                alert("The desired username was not found")
            }
        })
        .then (responseJson => displayRepos(responseJson))
        .catch (err => {
            $('#js-error-message').text(`There was an error:${err.message}`);
        })
}

function displayRepos(responseJson) {
    console.log(responseJson);
    $("div.resultsHolder").empty();
    for (let i=0; i<=responseJson.length;i++){
        $("div.resultsHolder").append(`
            <p>${responseJson[i].name}</p>
            <a href="${responseJson[i].svn_url}" target="_blank">Link</a>
            <br>
            <br>
        `)
    }
}

$(function() {
    console.log('Form is ready! Waiting for submit');
    watchForm();
});