/* Filename: gists.js
 * Author: Andrew Weckwerth
 */

//////////////////////////////////////////////
//section for gist search settings
//////////////////////////////////////////////
//
function Gist(gist) {
    this.description = gist.description;
    //this.gistId = JSON.stringify(gist.id);
    this.gistId = gist.id;
    this.url = gist.url;
}

//////////////////////////////////////////////
//section for gist search display
//////////////////////////////////////////////
//
function liGist(gist) {
    console.log('beginning liGist');
    var dl = document.createElement('dl');
    dl.id = (gist.gistId);
    var entry = dlEntry('Description: ', (gist.description));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = dlEntry('Gist ID: ', (gist.gistId));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = aEntry((gist.url));
    dl.appendChild(entry);
    var entry = favEntryButton((gist.gistId));
    dl.appendChild(entry);
    console.log('ending liGist');
    return dl;
}

function liFavGist(gist) {
    console.log('beginning liGist');
    var dl = document.createElement('dl');
    dl.id = (gist.id);
    var entry = dlEntry('Description: ', (gist.description));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = dlEntry('Gist ID: ', (gist.id));
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = aEntry((gist.url));
    dl.appendChild(entry);
    var entry = unFavEntryButton((gist.id));
    dl.appendChild(entry);
    console.log('ending liGist');
    return dl;
}

//////////////////////////////////////////////
//Create buttons for each entry
//////////////////////////////////////

function favEntryButton(definition) {
    console.log('begin favEntryButton');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = "Fav!";
    button.setAttribute("gistID", definition);
    button.onclick = function() {
        var gistID = this.getAttribute("gistid");
        var newFavorite = addFave(gistID);
    }
    console.log('end favEntryButton');
    return button;
}

function unFavEntryButton(definition) {
    console.log('begin unfavEntryButton');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = "Un-Fav!";
    button.setAttribute("gistID", definition);
    button.onclick = function() {
        var gistID = this.getAttribute("gistid");
        var removeFavorite = removeFave(gistID);
    }
    console.log('end unfavEntryButton');
    return button;
}

//////////////////////////////////////////
//Function to add a favorite when button clicked
///////////////////////////////////////////

function addFave(id) {
    console.log('begin addFave');
    var normalGistList = document.getElementById('normal-list');
    var normalList = JSON.parse(localStorage.getItem('normals'));
    var targetGist = document.getElementById(id);
    //iterate through parsed list of normals, and when the ID of the gist
    //to be added to favorites matches, push that gist object onto a favorites
    //array
    for (var i = 0; i < normalList.length; i++) {
        if (normalList[i].id == id) {
            var faves = []; 
            var curFavorites = JSON.parse(localStorage.getItem('favorites'));
            if (curFavorites != null) {
                //if there are favorites in storage, add them one by one to the
                //current array
                for (var j = 0; j < curFavorites.length; j++) {
                    faves.push(curFavorites[j]);
                }
            }
            faves.push(normalList[i]);
            localStorage.setItem('favorites', JSON.stringify(faves));
            normalGistList.removeChild(targetGist);
            drawFavorites();
        }
    }
    console.log('end addFave');
}

function removeFave(id) {
    console.log('begin addFave');
    //var favoriteGistList = document.getElementById('favorite-gists');
    var favoriteGistList = document.getElementById('favorite-list');
    var faveList = JSON.parse(localStorage.getItem('favorites'));
    var targetGist = document.getElementById(id);
    //iterate through parsed list of favorites, and when the ID of the gist
    //to be removed from favorites matches, splice it off
    for (var i = 0; i < faveList.length; i++) {
        if (faveList[i].id == id) {
            var normals = []; 
            var curNormals = JSON.parse(localStorage.getItem('normals'));
            if (curNormals != null) {
                //if there are favorites in storage, add them one by one to the
                //current array
                for (var j = 0; j < curNormals.length; j++) {
                    normals.push(curNormals[j]);
                }
            }
            normals.push(faveList[i]);
            localStorage.setItem('normals', JSON.stringify(normals));
            favoriteGistList.removeChild(targetGist);
            createGistList(document.getElementById('normal-gists'), normals);
            //remove target from local storage list as well
            faveList.splice(i, 1);
            localStorage.setItem('favorites', JSON.stringify(faveList));
        }
    }
    console.log('end addFave');
}

/////////////////////////////////////////////////////////
//draw entries in the gist lists
//////////////////////////////////////////

function dlEntry (term, definition) {
    console.log('begin dlEntry');
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.innerText = term;
    dd.innerText = definition;
    console.log('end dlEntry');
    return {'dt':dt, 'dd':dd};
}

function aEntry (definition) {
    console.log('beg aEntry');
    var link = document.createElement('a');
    link.setAttribute('href', JSON.stringify(definition));
    console.log('mid aEntry');
    var linkText = document.createTextNode(definition);
    link.appendChild(linkText);
    console.log('end aEntry');
    return link;
}

function createGistList(ul, gistData){
    console.log('beginning create list');
    for (var i = ul.childNodes.length - 1; i >=0; i--) {
        ul.removeChild(ul.childNodes[i])
    }
    var li = document.createElement('li');
    li.id = "normal-list";
    for (var i = 0; i < gistData.length; i++) {
        var addingGist = new Gist(gistData[i]);
        li.appendChild(liGist(addingGist));
    }
    localStorage.setItem('normals', JSON.stringify(gistData));
    ul.appendChild(li);
    console.log('ending create list');
}

/////////////////////////////////////////////////
//section for onload details 
/////////////////////////////////////////////////

window.onload = function () {
    console.log('beg onload fxn');
    var favorite = localStorage.getItem('favorites');
    var normal = localStorage.getItem('normals');
    normal = {'normals':[]};
    localStorage.setItem('normals', JSON.stringify(normal));
    if (favorite === null) {
        favorite = {'favorites':[]};
        localStorage.setItem('favorites', JSON.parse(favorite));
    }
    else {
        drawFavorites();
    }
    console.log('end onload fxn');
}

/////////////////////////////////////////////////
//section for creating favorite list 
/////////////////////////////////////////////////

function drawFavorites(){
    console.log('begin drawFaves');
    var currentFavorites = JSON.parse(localStorage.getItem('favorites'));
    var ul = document.getElementById('favorite-gists');
    for (var i = ul.childNodes.length - 1; i >=0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    var li = document.createElement('li');
    li.id = 'favorite-list';
    for (var i = 0; i < currentFavorites.length; i++) {
        li.appendChild(liFavGist(currentFavorites[i]));
    }
    ul.appendChild(li);
    console.log('end drawFaves');
}


/////////////////////////////////////////////////
// AJAX call
/////////////////////////////////////////////////

function getGistList() {
    
    var req = new XMLHttpRequest();
    if (!req) {
        throw "Unable to create HttpRequest.";
    }
    var url = 'https://api.github.com/gists?mode=json';
    req.onreadystatechange = function(){
        if (this.readyState === 4) {
            console.log(this.status);
            var gistData = JSON.parse(this.responseText);
            console.log('getGistList, before createGistList');
            createGistList(document.getElementById('normal-gists'), gistData); 
        }
    };
    req.open('GET', url);
    req.send();
}

