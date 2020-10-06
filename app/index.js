//get fetch for park info
// function getInfo(){
//   `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${key}`;
// }

let activities = [
  {
    id: 1,
    name: "Swimming",
    img: "https://i.insider.com/5d3b4de936e03c29354a8d38?width=600&format=jpeg&auto=webp",
    score: 0
  },
  {
    id: 2,
    name: "Hiking",
    img: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg?w=1155&h=1528",
    score: 0
  },
  {
    id: 3,
    name: "Shopping",
    img: "https://img2.10bestmedia.com/static/img/placeholder-shopping.jpg",
    score: 0
  },
  {
    id: 4,
    name: "Golfing",
    img: "https://rothmanortho.com/images/stories/flexicontent/l_shutterstock_331295318_optimized.jpg" ,
    score: 0
  }
]

const parentUl = document.getElementsByClassName("activities")[0];

function changeScore(event) {
  let parentLi = event.target.parentNode;
  let span = parentLi.querySelector("span");
  let score = event.target.dataset.purpose === "increase" ? parseInt(span.innerText) + 1 : parseInt(span.innerText) - 1 ;
  span.innerText = score;
}

parentUl.addEventListener("click", function(event){
  console.log(event.target)
  if(event.target.dataset.purpose === "increase" || event.target.dataset.purpose === "decrease"){
    changeScore(event);
  }
})

activities.forEach(function (activity) {
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
})

let upVoteBtns = document.getElementsByClassName("upVote");
let upVotes = Array.from(upVoteBtns);

