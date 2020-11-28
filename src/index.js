import './styles.css';
import refs from "./js/refs";
import setUsers from "./js/setUsers";
import setPosts from "./js/setPosts";

import DEFAULT_PHOTO from "./images/avatar.jpeg"

let menuToggle = document.querySelector("#menu-toggle");
let menu = document.querySelector(".sidebar");
menuToggle.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.toggle("visible");
});




const toggleAutDom = () => {
  const user = setUsers.user;
  console.log("user =>", user);
  if (user) {
    refs.loginElem.style.display = "none";
    refs.userElem.style.display = "";
    refs.userName.textContent = user.displayName;
    refs.userAvatar.src = user.photoURL ? user.photoURL : DEFAULT_PHOTO;
    refs.btnNewPost.classList.add("visible");
  } else {
    refs.loginElem.style.display = "";
    refs.userElem.style.display = "none";
    refs.btnNewPost.classList.remove("visible");
    refs.addPostElem.classList.remove("visible");
    refs.postsWrapper.classList.add("visible");
  }
};

const showAddPost = () => {
  refs.addPostElem.classList.add("visible");
  refs.postsWrapper.classList.remove("visible");
};

const showAllPost = () => {
  refs.addPostElem.classList.remove("visible");
  refs.postsWrapper.classList.add("visible");

  let postsHTML = "";

  setPosts.allPosts.forEach((item) => {
    postsHTML += `
  <section class="post">
          <div class="post-body">
            <h2 class="post-title">${item.title}</h2>
            <p class="post-text">
              ${item.text}
            </p>

            <div class="tags">
            ${item.tags.map((tag) => `<a href="#" class="tag"># ${tag}</a>`)}


            </div>
            <!-- /.tags -->
          </div>
          <!-- /.post-body -->
          <div class="post-footer">
            <div class="post-buttons">
              <button class="post-button likes">
                <svg width="19" height="20" class="icon icon-like">
                  <use xlink:href="images/icons.svg#like"></use>
                </svg>
                <span class="likes-counter">${item.like}</span>
              </button>
              <button class="post-button comments">
                <svg width="21" height="21" class="icon icon-comment">
                  <use xlink:href="images/icons.svg#comment"></use>
                </svg>
                <span class="comments-counter">${item.coment}</span>
              </button>
              <button class="post-button save">
                <svg width="19" height="19" class="icon icon-save">
                  <use xlink:href="images/icons.svg#save"></use>
                </svg>
              </button>
              <button class="post-button share">
                <svg width="17" height="19" class="icon icon-share">
                  <use xlink:href="images/icons.svg#share"></use>
                </svg>
              </button>
            </div>
            <!-- /.post-buttons -->
            <div class="post-author">
              <div class="author-about">
                <a href="#" class="author-username">${
      item.author.displayName
    }</a>
                <span class="post-time">${item.date}</span>
              </div>
              <a href="#" class="author-link"
                ><img src="${
      item.author.photo || DEFAULT_PHOTO
    }" alt="avatar" class="author-avatar"
              /></a>
            </div>
            <!-- /.post-author -->
          </div>
          </section>
`;
  });

  refs.postsWrapper.innerHTML = postsHTML;
  refs.addPostElem.classList.remove('visible');
  refs.postsWrapper.classList.add('visible');
};
refs.loginForget.addEventListener('click',(event)=>{
  event.preventDefault();
  setUsers.sendForget(refs.emailInput.value);
  refs.emailInput.value = ''
})

const init = () => {
  refs.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.logIn(
      refs.emailInput.value,
      refs.passwordInput.value,
      toggleAutDom
    );
    refs.loginForm.reset();
  });

  refs.loginSingUplink.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.signUp(
      refs.emailInput.value,
      refs.passwordInput.value,
      toggleAutDom
    );
    refs.loginForm.reset();
  });

  refs.exitElem.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAutDom);
  });

  refs.editElem.addEventListener("click", (event) => {
    event.preventDefault();
    refs.editConteiner.classList.toggle("visible");
    refs.editUserName.value = setUsers.user.displayName;
  });

  refs.editConteiner.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.editUser(
      refs.editUserName.value,
      refs.editFotoURL.value,
      toggleAutDom
    );
    refs.editConteiner.classList.remove("visible");
  });

  refs.btnNewPost.addEventListener("click", (event) => {
    event.preventDefault();
    showAddPost();
  });

  refs.addPostElem.addEventListener("submit", (event) => {
    event.preventDefault();
    const { title, text, tags } = refs.addPostElem.elements;

    if (title.value.length < 6) {
      alert("short title");
      return;
    }
    if (text.value.length < 50) {
      alert("short your post");
      return;
    }
    setPosts.addPosts(title.value, text.value, tags.value, showAllPost);

    refs.addPostElem.classList.remove("visible");
    refs.addPostElem.reset();
  });

  setUsers.initUser(toggleAutDom);

  setPosts.getPost(showAllPost)

};

document.addEventListener("DOMContentLoaded", init);

