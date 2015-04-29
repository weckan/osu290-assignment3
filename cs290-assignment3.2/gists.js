/* Filename: gists.js
 * Author: Andrew Weckwerth
 */

//section for gist search settings
function gistSearch(numPages, languages) {
    this.numPages = numPages;
    this.languages = languages;
}

//section for gist search display

function liGist (gist) {
    //var div = document.createElement('div');
    var dl = document.createElement('dl');
    var entry = dlEntry('Description: ', JSON.stringify(gist.description));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = aEntry((gist.url));
    dl.appendChild(entry);
    //div.appendChild(dl);
    var entry = favEntry();
    dl.appendChild(entry);
    //return div;
    return dl;
}

function favEntry() {
    var button = document.createElement('input');
    button.type = 'button';
    button.name = 'favoriteAdd';
    button.value = "Fav!";
    button.onclick = "addFavorite()";
    return button;
}

function dlEntry (term, definition) {
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.innerText = term;
    dd.innerText = definition;
    return {'dt':dt, 'dd':dd};
}

function aEntry (definition) {
    var link = document.createElement('a');
    link.setAttribute('href', definition);
    var linkText = document.createTextNode(definition);
    link.appendChild(linkText);
    return link;
}

function createGistList(ul, gistData){
    for (var i = ul.childNodes.length - 1; i >=0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    var li = document.createElement('li');
    for (var i = 0; i < gistData.length; i++) {
    //for (var i = 0; i < 30; i++) {
        li.appendChild(liGist(gistData[i]));
    }
    ul.appendChild(li);
}


//section for favorites

function addFavorite();

// AJAX call
//

function getGistList() {
    
    var req = new XMLHttpRequest();
    if (!req) {
        throw "Unable to create HttpRequest.";
    }
    var url = 'https://api.github.com/gists?mode=json';
    /*
       var params = {
       mode: 'json';
       };
       url += '?'+urlStringify(params);
       */
    req.onreadystatechange = function(){
        if (this.readyState === 4) {
            //need a semicolon after this line?
            console.log(this.status);
            var gistData = JSON.parse(this.responseText)
            //console.log(JSON.parse(this.responseText));
            //console.log(JSON.parse(this.responseText));
            //console.log(JSON.stringify(gistData[0].description));
            createGistList(document.getElementById('normal-gists'), gistData); 
        }
    };
    req.open('GET', url);
    req.send();
}

function urlStringify(obj){
    var str = []
        for (var prop in obj){
            var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
            str.push(s);
        }
    return str.join('&');
}


