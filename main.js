const posts = [
  {
    id: 1,
    content:
      "Prova1 libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Prova2 libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Prova3 libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Prova4 libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Prova5 libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

const cont = document.getElementById("container");

// ciclo per creare i post
posts.forEach((element) => {
  let post = document.createElement("div");
  element.created = element.created.split("-");
  element.created = getPostDate(element.created) 
  let avatar = "";

  // if else per gestire la foto profilo
  if (element.author.image == null) {
    avatar = `<div class="profile-pic-default">
                <span>${getInitials(element.author.name)}</span>
              </div>`
  } else {                    
    avatar = `<img class="profile-pic" src=${element.author.image} alt=${element.author.name}></img>`
  }
  post.innerHTML = `
  <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon profile-pic-default">
                ${avatar}                 
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${element.author.name}</div>
                <div class="post-meta__time">${element.created}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${element.content}</div>
    <div class="post__image">
        <img src=${element.media} alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" data-postid="${element.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
            </div>
        </div> 
    </div>            
</div>`;
post.classList.add("post");
cont.appendChild(post);
});

// aggiungo la funzione likePost a tutti i bottoni
likeBtnArr = document.querySelectorAll(".like-button");
likeBtnArr.forEach((element) => {
  element.addEventListener("click", likePost);
});

let likedPosts = [];

// Definisco le funzioni per gestire i like
function likePost() {
  let id = this.getAttribute("data-postid");
  let likeCounter = document.getElementById(`like-counter-${id}`);
  this.classList.toggle("like-button--liked");
  // operatore ternario
  !likedPosts.includes(id) ? addLike(id, likeCounter) : subtractLike(id, likeCounter);
}

// funzioni che aggiungono e tolgono il like
function addLike(id, likeCounter) {
  likedPosts.push(id);
  posts[id - 1].likes++;
  likeCounter.innerText = posts[id - 1].likes;
}

function subtractLike(id, likeCounter) {
  posts[id - 1].likes--;
  likedPosts = likedPosts.filter((x) => x !== id);
  likeCounter.innerText = posts[id - 1].likes;
}

// ricava le iniziali del nome
function getInitials(name) {
  name = name.split(" ");
  return name[0][0] + name[1][0];
}

// ricava gli anni e i giorni passati dalla data del post
function getPostDate(date) {
  const postDate = new Date(date[0], date[1]-1, date[2])
  const days = 1000*60*60*24;
  const years = days * 365;
  const currentTime = new Date();
  let diff = currentTime.getTime() - postDate.getTime();
  const diffYears = Math.floor(diff / years)
  const diffDays = Math.floor(diff / days)
  let yearString = "";
  diffYears>1 ? yearString="years" : yearString="year";
  diff = (`${diffYears} ${yearString} and ${diffDays - diffYears*365} days ago`)
  return (diff)
}