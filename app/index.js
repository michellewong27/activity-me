//get fetch for park info
// function getInfo(){
//   `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${key}`;
// }

function increaseScore(event){
    let parentLi = event.target.parentNode;
    let span = parentLi.querySelector("span");
    let score = parseInt(span.innerText) + 1;
    span.innerText = score;
  }

//identify upvote
let upVoteBtns = document.getElementsByClassName("upVote");
let upVotes = Array.from(upVoteBtns);

upVotes.forEach(function(button){
  button.addEventListener("click", increaseScore);
});







//get activities list
let activitiesList = document.getElementById("activities");
//create new activity
let newActivity = document.createElement("li");
// newActivity.innerHTML = `
//           <li class="activity" id="${id}">
//           <h3>${name}</h3>
//           <h4>Score: <span>${score}</span> </h4>
//           <img alt="" src="${img}" />
//           <button id="up-vote">Up Vote</button>
//           <button >Up Vote</button>
//           <button>Down Vote</button>
//         </li>
// `;
// newActivity.id = `${id}`;
// newActivity.className = "activity";
//append new activity to the list
// activitiesList.append(newActivity);



