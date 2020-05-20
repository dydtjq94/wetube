import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentRemove = document.querySelectorAll(`.comment-remove`);

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

// fake 댓글 기능
const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = comment;
  button.innerHTML = "❌";
  li.appendChild(span);
  li.appendChild(button);
  // prepend는 객체를 앞에 추가
  commentList.prepend(li);
  increaseNumber();
};

// api로 보내는 기능
const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];

  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      commentttt: comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function removeComment(comment) {
  console.log(comment);
  comment.remove();
  decreaseNumber();
}

const removeSendComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];

  const response = await axios({
    url: `/api/${commentId}/comment/remove`,
    method: "POST",
    data: {
      videoId,
    },
  });
};

function handleRemove(event) {
  const commentId = event.target.parentElement.id;
  const comment = event.target.parentElement;
  removeComment(comment);
  removeSendComment(commentId);
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  commentRemove.forEach((e) => e.addEventListener("click", handleRemove));
}

if (addCommentForm) {
  init();
}
