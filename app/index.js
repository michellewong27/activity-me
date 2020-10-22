//get fetch for park info
// function getInfo(){
//   `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${key}`;
// }

// const e = require("express");

function getActivities() {
  fetch(`http://localhost:3000/activities`)
    .then(function (body) {
      return body.json();
    })
    .then(function (activities) {
      activities.forEach(addActivity);
    });
}
getActivities();

function persistScore(event) {
  fetch(`http://localhost:3000/activities/${event.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
    },
    body: JSON.stringify({ score: event.target.dataset.score }),
  });
  //for pessimistic rendering ->
  // .then(function(response){return response.json})
  // .then(function(data){changeScore(event)})
}

function addToActivities(activity) {
  fetch(`http://localhost:3000/activities`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
    },
    body: JSON.stringify({
      id: activity.id,
      name: activity.name,
      img: activity.img,
      score: activity.score,
      description: activity.description
    }),
  });
  addActivity(activity);
}

const parentUl = document.getElementsByClassName("activities")[0];
const title = document.getElementsByClassName("title")[0];
const addActivityBtn = document.createElement("button");
addActivityBtn.dataset.purpose = "form";
addActivityBtn.innerText = "Add activity";
title.appendChild(addActivityBtn);

addActivityBtn.addEventListener("click", function (e) {
  addActivityBtn.remove();
  createForm(e);
});

function createForm(e) {
  const form = document.createElement("form");
  form.dataset.purpose = "addActivityForm";
  form.innerHTML = `
  <input type="text" placeholder="Activity" name="name"/>
  <input type="text" placeholder="Image" name="img"/>
  <input type="text" placeholder="Description" name="description" />
  <input type="submit" data-purpose="submitActivity"/>
  `;
  title.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let liCount = document.querySelectorAll("#activities li").length;
    let id = liCount + 1;
    let activity = {
      id: id,
      name: e.target.name.value,
      img: e.target.img.value,
      score: 0,
      description: e.target.description.value
    };
    addToActivities(activity);
    form.remove();
    title.appendChild(addActivityBtn);
  });
}

function addActivity(activity) {
  console.log(activity);
  let newLi = document.createElement("li");
  newLi.className = "activity";
  newLi.innerHTML = `
  <h3>${activity.name}</h3>
  <h4>${activity.description}</h4>
  <h4>Score: <span>${activity.score}</span> </h4>
  <img alt="" src=${activity.img} />
  <button class="upVote" data-purpose="increase" data-id=${activity.id} data-score=${activity.score}>Up Vote</button>
  <button class="downVote" data-purpose="decrease" data-id=${activity.id} data-score=${activity.score}>Down Vote</button>
`;
  parentUl.append(newLi);
}

function changeScore(event) {
  let parentLi = event.target.parentNode;
  let span = parentLi.querySelector("span");
  let score =
    event.target.dataset.purpose === "increase"
      ? parseInt(span.innerText) + 1
      : parseInt(span.innerText) - 1;
  event.target.dataset.score = score;
  span.innerText = score;
}

parentUl.addEventListener("click", function (event) {
  if (
    event.target.dataset.purpose === "increase" ||
    event.target.dataset.purpose === "decrease"
  ) {
    changeScore(event);
    persistScore(event);
  }
});
