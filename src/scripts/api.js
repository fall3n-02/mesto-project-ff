function getProfileInfo() {
  return fetch(`${apiConfig.url}users/me`, {
    method: "GET",
    headers: apiConfig.headers
  })
    .then(handleResponse);
}

function getInitialCards() {
  return fetch(`${apiConfig.url}cards`, {
    method: "GET",
    headers: apiConfig.headers
  })
    .then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
}

function setProfileInfo(data) {
  return fetch(`${apiConfig.url}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(handleResponse);
}

function addNewCard(data) {
  return fetch(`${apiConfig.url}cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
      likes: []
    })
  })
    .then(handleResponse);
} 

function likeCard(data) {
  return fetch(`${apiConfig.url}cards/likes/${data._id}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then(handleResponse);
}

function removeLikeFromCard(data) {
  return fetch(`${apiConfig.url}cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(handleResponse);
}

function deleteCardFromList(data) {
  return fetch(`${apiConfig.url}cards/${data._id}`, {
    method: "DELETE",
    headers: apiConfig.headers
  })
    .then(handleResponse);
}

function changeAvatar(data) {
  return fetch(`${apiConfig.url}users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: data
    })
  })
    .then(handleResponse);
}

const apiConfig = {
  url: "https://nomoreparties.co/v1/wff-cohort-35/",
  headers: {
    authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5',
    'Content-Type': 'application/json'
  }
}

export { getInitialCards, 
  getProfileInfo, 
  setProfileInfo, 
  addNewCard, 
  likeCard,
  removeLikeFromCard,
  deleteCardFromList,
  changeAvatar
}