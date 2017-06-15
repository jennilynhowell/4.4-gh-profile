(function(){
  'use strict';

  //3 requests: get repos,


  //use github api token for development only; will not be present in production
  let headers = {};
  let urlUser = 'https://api.github.com/users/jennilynhowell';
  let urlRepos = 'https://api.github.com/users/jennilynhowell/repos';

  let mainNode = document.getElementById('mainSection');
  let sidebarNode = document.createElement('aside');
  let repoNode = document.createElement('section');
  sidebarNode.setAttribute('class', 'sidebar');
  repoNode.setAttribute('class', 'repoSection');
  mainNode.appendChild(sidebarNode);
  mainNode.appendChild(repoNode);


  // if (GIT_TOKEN) {
    //set AJAX header to send token
    headers['Authorization'] = 'token ' + GIT_TOKEN;

    fetch(urlUser, {headers: headers}).then(function(response) {
      response.json().then(function(data){
        console.log(data);

          let name = data.name;
          console.log(name);
          let bio = data.bio;
          console.log(bio);
          let loc = data.location;
          console.log(loc);
          let email = data.email;
          console.log(email);
          let photo = data.avatar_url;
          console.log(photo);
          let web = data.html_url;
          console.log(web);

        console.log(name, bio, loc, email, photo, web);
        buildSidebar(name, bio, loc, email, photo, web);
      })

    })


    fetch(urlRepos, {headers: headers}).then(function(response){
      response.json().then(function(data){
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          let repoName = data[i].name;
          console.log(repoName);
          let repoLink = data[i].html_url;
          console.log(repoLink);
          let repoDesc = data[i].description;
          console.log(repoDesc);
          let repoLang = data[i].language;
            if (data[i].language === null){
              repoLang = 'language';
            };
          console.log(repoLang);
          let repoUpdate = data[i].updated_at;
          console.log(repoUpdate);

          buildRepoSection(repoName, repoLink, repoDesc, repoLang, repoUpdate);
        };
      })
    })
  // }

  //Create HTML structure for sidebar

  function buildSidebar(name, bio, loc, email, photo, web) {

    let photoDiv = document.createElement('div');
    photoDiv.setAttribute('id', 'photoDiv');
    sidebarNode.appendChild(photoDiv);
    photoDiv.innerHTML = '<img src="' + photo + '">';

    let nameDiv = document.createElement('h1');
    nameDiv.setAttribute('id', 'nameDiv');
    sidebarNode.appendChild(nameDiv);
    nameDiv.textContent = name;

    let bioDiv = document.createElement('p');
    bioDiv.setAttribute('id', 'bioDiv');
    sidebarNode.appendChild(bioDiv);
    bioDiv.textContent = bio;

    let locDiv = document.createElement('div');
    locDiv.setAttribute('id', 'locDiv');
    let locIcon = document.createElement('span');
    let locText = document.createElement('p');
    locIcon.setAttribute('class', 'octicon octicon-location');
    sidebarNode.appendChild(locDiv);
    locDiv.appendChild(locIcon);
    locDiv.appendChild(locText);
    locText.textContent = loc;

    let emailDiv = document.createElement('p');
    emailDiv.setAttribute('id', 'emailDiv');
    sidebarNode.appendChild(emailDiv);
    emailDiv.textContent = email;

    let webDiv = document.createElement('div');
    webDiv.setAttribute('id', 'webDiv');
    sidebarNode.appendChild(webDiv);
    webDiv.textContent = web;

  }

  //Create HTML structure for repo section

  function buildRepoSection (name, link, desc, lang, updated){
    let repoBox = document.createElement('div');
    repoBox.setAttribute('class', 'repoBox');
    repoNode.appendChild(repoBox);

    let repoTitle = document.createElement('h1');
    repoTitle.setAttribute('class', 'repoTitle');
    repoTitle.innerHTML = '<a href="' + link + '">' + name + '</a>';
    repoBox.appendChild(repoTitle);

    let repoDesc = document.createElement('p');
    repoDesc.setAttribute('class', 'repoDesc');
    repoDesc.textContent = desc;
    repoBox.appendChild(repoDesc);

    let repoLang = document.createElement('div');
    repoLang.setAttribute('class', 'repoLang');
    lang = lang.toLowerCase();
    repoLang.innerHTML = '<a href="#">' + lang + '</a>';
    repoBox.appendChild(repoLang);

    let repoUpdate = document.createElement('p');
    repoUpdate.setAttribute('class', 'repoUpdate');
    repoUpdate.textContent = updated;
    repoBox.appendChild(repoUpdate);

  }



}());
