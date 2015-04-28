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
    var dl = document.createElement('dl');
    var entry = dlEntry('Description: ', JSON.stringify(gist.description));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = dlEntry('Link: ', JSON.stringify(gist.url));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    /*
       var entry = dlEntry('Description: ', gist.description);
       dl.appendCild(entry.dt);
       dl.appendCild(entry.dd);
       */ 
    return dl;
}

function dlEntry (term, definition) {
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.innerText = term;
    dd.innerText = definition;
    return {'dt':dt, 'dd':dd};
}

function createGistList(ul, gistData){
    for (var i = ul.childNodes.length - 1; i >=0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    var li = document.createElement('li');
    //for (var i = 0; i < gistData.length(); i++) {
    for (var i = 0; i < 30; i++) {
        li.appendChild(liGist(gistData[0]));
    }
    ul.appendChild(li);
}
//section for favorites

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
            console.log(JSON.parse(this.responseText));
            console.log(JSON.parse(this.responseText));
            console.log(JSON.stringify(gistData[0].description));
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


