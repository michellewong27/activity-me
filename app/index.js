//get fetch for park info
// function getInfo(){
//   `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${key}`;
// }

function getActivities(){
  fetch(`http://localhost:3000/activities`)
  .then(function(body){return body.json()})
  .then(function(activities){
    //addActivity is acting as callback function
    activities.forEach(addActivity)
  })
}


const parentUl = document.getElementsByClassName("activities")[0];
const title = document.getElementsByClassName("title")[0];
const addActivityBtn = document.createElement('button');
addActivityBtn.dataset.purpose = "form";
addActivityBtn.innerText = "Add activity"
title.appendChild(addActivityBtn);

addActivityBtn.addEventListener("click", function(e){
  addActivityBtn.remove();
  createForm(e);
})

function createForm(e){
  const form = document.createElement('form')
  form.dataset.purpose = "addActivityForm";
  form.innerHTML = `
  <input type="text" placeholder="Activity" name="name"/>
  <input type="text" placeholder="Image" name="img"/>
  <input type="submit" data-purpose="submitActivity"/>
  `;
  title.appendChild(form);

  form.addEventListener("submit", function(e){
    e.preventDefault();
    let activity = {
      name: e.target.name.value,
      img: e.target.img.value,
      score: 0
    }
    addActivity(activity);
    form.remove();
    title.appendChild(addActivityBtn);
  });
}

function addActivity(activity) {
  let newLi = document.createElement("li");
  newLi.className = "activity";
  newLi.innerHTML = `
  <h3>${activity.name}</h3>
  <h4>Score: <span>${activity.score}</span> </h4>
  <img alt="" src=${activity.img} />
  <button class="upVote" data-purpose="increase">Up Vote</button>
  <button class="downVote" data-purpose="decrease">Down Vote</button>
`;
  parentUl.append(newLi);
}

activities.forEach(addActivity)

function changeScore(event) {
  let parentLi = event.target.parentNode;
  let span = parentLi.querySelector("span");
  let score = event.target.dataset.purpose === "increase" ? parseInt(span.innerText) + 1 : parseInt(span.innerText) - 1 ;
  span.innerText = score;
};

parentUl.addEventListener("click", function(event){
  if(event.target.dataset.purpose === "increase" || event.target.dataset.purpose === "decrease"){
    changeScore(event);
  }
});

