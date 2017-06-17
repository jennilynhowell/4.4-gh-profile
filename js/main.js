(function(){
  'use strict';

  //3 requests: get repos,


  //use github api token for development only; will not be present in production
  let headers = {};
  let urlUser = 'https://api.github.com/users/jennilynhowell';
  let urlRepos = 'https://api.github.com/users/jennilynhowell/repos';
  let urlOrgs = 'https://api.github.com/user/orgs';

  let mainNode = document.getElementById('mainSection');
  let sidebarNode = document.createElement('aside');
  let repoNode = document.createElement('section');
  sidebarNode.setAttribute('class', 'sidebar row-fluid col-md-3');
  repoNode.setAttribute('class', 'repoSection col-md-9');
  mainNode.appendChild(sidebarNode);
  mainNode.appendChild(repoNode);


  // // if (GIT_TOKEN) {
  //     // set AJAX header to send token
  //     try {
  //     headers['Authorization'] = 'token ' + GIT_TOKEN;
  //   } catch (e) {
  //     //ignore error
  //   }

    // fetch(urlOrgs, {headers: headers}).then(function(response) {
    //   response.json().then(function(data){
    //       console.log(data);
    //
    //       let orgs = '';
    //     })
    //
    //   })
    // }

    fetch(urlUser, {headers: headers}).then(function(response) {
      response.json().then(function(data){
          console.log(data);

          //sidebar
          let name = data.name;
          let bio = data.bio;
          let loc = data.location;
          let email = data.email;
          let photo = data.avatar_url;
          let web = data.html_url;

          //subheader
          let repos = data.repos_url;
          let numRepos = data.public_repos;
          let stars = data.starred_url;
          let numFollowers = data.followers;
          let followers = data.followers_url;
          let numFollowing = data.following;
          let following = data.following_url;


        buildSidebar(name, bio, loc, email, photo, web);
        buildSubHeader(repos, numRepos, stars, numFollowers, followers, numFollowing, following);
      })

    })


    fetch(urlRepos, {headers: headers}).then(function(response){
      response.json().then(function(data){
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          let repoName = data[i].name;
          let repoLink = data[i].html_url;
          let repoDesc = data[i].description;
          let repoLang = data[i].language;
            if (data[i].language === null){
              repoLang = 'language';
            };
          let repoUpdate = data[i].updated_at;

          buildRepoSection(repoName, repoLink, repoDesc, repoLang, repoUpdate);
        };
      })
    })
  // }

  //Create HTML structure for sidebar

  function buildSidebar(name, bio, loc, email, photo, web) {

    let photoDiv = document.createElement('div');
    photoDiv.setAttribute('class', 'photoDiv col-md-3');
    photoDiv.setAttribute('id', 'photoDiv');
    sidebarNode.appendChild(photoDiv);
    photoDiv.innerHTML = '<img class="img-rounded img-responsive" src="' + photo + '">';

    let nameDiv = document.createElement('h3');
    nameDiv.setAttribute('class', 'nameDiv');
    sidebarNode.appendChild(nameDiv);
    nameDiv.textContent = name;

    let bioDiv = document.createElement('p');
    bioDiv.setAttribute('class', 'bioDiv');
    sidebarNode.appendChild(bioDiv);
    bioDiv.textContent = bio;

    let locDiv = document.createElement('div');
    locDiv.setAttribute('class', 'locDiv');
    let locIcon = document.createElement('span');
    let locText = document.createElement('p');
    locIcon.setAttribute('class', 'octicon octicon-location');
    sidebarNode.appendChild(locDiv);
    locDiv.appendChild(locIcon);
    locDiv.appendChild(locText);
    locText.textContent = loc;

    let emailDiv = document.createElement('p');
    emailDiv.setAttribute('class', 'emailDiv');
    sidebarNode.appendChild(emailDiv);
    emailDiv.textContent = email;

    let webDiv = document.createElement('div');
    webDiv.setAttribute('class', 'webDiv');
    sidebarNode.appendChild(webDiv);
    webDiv.innerHTML = `<a href="${web}">https://github.com/jennilynhowell</a>`;

    let orgsDiv = document.createElement('div');
    orgsDiv.setAttribute('class', 'orgsDiv');
    sidebarNode.appendChild(orgsDiv);
    let orgsHead = document.createElement('h5');
    let orgsLinks = document.createElement('span');
    orgsDiv.appendChild(orgsHead);
    orgsDiv.appendChild(orgsLinks);
    orgsHead.textContent = 'Organizations';

  }

  //Create subheader above repos
  function buildSubHeader(repos, numRepos, stars, numFollowers, followers, numFollowing, following){
    let subHeader = document.createElement('div');
    subHeader.setAttribute('class', 'subHeader');
    repoNode.appendChild(subHeader);

    let subheadList = document.createElement('ul');
    subheadList.setAttribute('class', 'subheadList list-unstyled list-inline');
    subHeader.appendChild(subheadList);
    subheadList.innerHTML = `
                            <li class="profileNav"><a href="#">Overview</a></li>
                            <li class="profileNav"><a href="${repos}">Repositories</a><span>${numRepos}</span></li>
                            <li class="profileNav"><a href="${stars}">Stars</a><span>7</span></li>
                            <li class="profileNav"><a href="${followers}">Followers</a><span>${numFollowers}</span></li>
                            <li class="profileNav"><a href="${following}">Following</a><span>${numFollowing}</span></li>
                            `;

    let subheadForm = document.createElement('form');
    subheadForm.setAttribute('class', 'subheadForm form-inline');
    subHeader.appendChild(subheadForm);
    let subheadSearchField = document.createElement('input');
    subheadSearchField.setAttribute('type', 'search');
    subheadSearchField.setAttribute('class', 'form-control');
    subheadSearchField.setAttribute('id', 'subheadSearchField');
    subheadSearchField.setAttribute('placeholder', 'Search repositories...');
    subheadForm.appendChild(subheadSearchField);
    let subheadSelectType = document.createElement('select');
    subheadSelectType.setAttribute('class', 'subheadSelectType form-control');
    subheadSelectType.setAttribute('class', 'form-control');
    subheadForm.appendChild(subheadSelectType);
    subheadSelectType.innerHTML = `
                                  <option value='all'>Type: All</option>
                                  <option value='public'>Type: Public</option>
                                  <option value='private'>Type: Private</option>
                                  <option value='sources'>Type: Sources</option>
                                  <option value='forks'>Type: Forks</option>
                                  <option value='mirrors'>Type: Mirrors</option>
                                  `;
    let subheadSelectLang = document.createElement('select');
    subheadSelectLang.setAttribute('class', 'subheadSelectLang form-control');
    subheadForm.appendChild(subheadSelectLang);
    subheadSelectLang.innerHTML = `
                                  <option value='all'>Language: All</option>
                                  <option value='html'>Language: HTML</option>
                                  <option value='css'>Language: CSS</option>
                                  <option value='js'>Language: JavaScript</option>
                                  `;
    let newRepoBtn = document.createElement('div');
    let newRepoIcon = document.createElement('span');
    let newRepoTxt = document.createElement('span');
    newRepoBtn.setAttribute('class', 'newRepoBtn btn btn-success');
    newRepoIcon.setAttribute('class', 'octicon octicon-repo btn btn-success form-control');
    newRepoTxt.textContent = ' New';
    newRepoBtn.appendChild(newRepoIcon);
    newRepoBtn.appendChild(newRepoTxt);
    subheadForm.appendChild(newRepoBtn);

  }

  //Create HTML structure for repo section

  function buildRepoSection (name, link, desc, lang, updated){
    let repoBox = document.createElement('div');
    repoBox.setAttribute('class', 'repoBox');
    repoNode.appendChild(repoBox);

    let repoTitle = document.createElement('h3');
    repoTitle.setAttribute('class', 'repoTitle');
    repoTitle.innerHTML = `<a href="${link}">${name}</a>`;
    repoBox.appendChild(repoTitle);

    let repoDesc = document.createElement('p');
    repoDesc.setAttribute('class', 'repoDesc');
    repoDesc.textContent = desc;
    repoBox.appendChild(repoDesc);

    let repoLangDiv = document.createElement('div');
    let repoColor = document.createElement('span');
    let repoLang = document.createElement('span');
    repoLangDiv.setAttribute('class', 'repoLangDiv');
    repoBox.appendChild(repoLangDiv);

    repoColor.setAttribute('class', 'repoColor');
    lang = lang.toLowerCase();
    if (lang === 'html') {
      repoColor.style.backgroundColor = '#e34c26';
    } else if (lang === 'css') {
      repoColor.style.backgroundColor = '#563d7c'
    } else if (lang === 'javascript') {
      repoColor.style.backgroundColor = '#f1e05a'
    };

    repoLang.innerHTML = `<a href="#">${lang}</a>`;
    repoLangDiv.appendChild(repoColor);
    repoLangDiv.appendChild(repoLang);


    let repoUpdate = document.createElement('p');
    repoUpdate.setAttribute('class', 'repoUpdate');
    updated = moment(updated, moment.ISO_8601).fromNow();
    repoUpdate.textContent = updated;
    repoBox.appendChild(repoUpdate);

  }






}());
