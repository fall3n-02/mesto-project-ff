function getProfileInfo() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: "GET",
    headers: {
      authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5'
    }
  })
    .then(handleResponse);
}

function getInitialCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: "GET",
    headers: {
      authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5'
    }
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
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(handleResponse);
}

function addNewCard(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'POST',
    headers: {
      authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(handleResponse);
} 

function likeCard(data) {
  return fetch(`https://nomoreparties.co/v1/cohortId/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: {
      authorization: '2c41fd0f-ee02-4fdc-a11f-a842e627ead5',
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse);
}

export { getInitialCards, getProfileInfo, setProfileInfo, addNewCard, likeCard}