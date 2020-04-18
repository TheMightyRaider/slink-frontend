export function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  document.body.style.backgroundImage = "none";
}

export function clearBackgroundColor() {
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "";
}

export function getUserID() {
  let newUserId;
  let userID = parseInt(localStorage.getItem("ID"));
  if (!userID) {
    newUserId = Math.floor(new Date().getTime() / 1000);
    localStorage.setItem("ID", newUserId);
  }

  return userID || newUserId;
}
