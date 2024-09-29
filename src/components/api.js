export {
  fetchCards,
  fetchUserData,
  patchProfile,
  postCard,
  deleteCard,
  addLike,
  removeLike,
  changeAvatar,
  handleResponse,
};

const config = {
  cardsUrl: "https://nomoreparties.co/v1/pwff-cohort-1/cards",
  userDataUrl: "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
  headers: {
    authorization: "55dbdb8b-7c02-49e7-8458-8e349a330bef",
    "Content-Type": "application/json",
  },
};

const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Error fetching data! Status: ${res.status}`);
  }
  return await res.json();
};

// User data

const fetchUserData = async () => {
  const res = await fetch(config.userDataUrl, {
    headers: config.headers,
  });
  return await handleResponse(res);
};

const patchProfile = async (name, about) => {
  const res = await fetch(config.userDataUrl, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
  return await handleResponse(res);
};

// Card data

const fetchCards = async () => {
  const res = await fetch(config.cardsUrl, {
    headers: config.headers,
  });
  return await handleResponse(res);
};

const postCard = async (cardData) => {
  const res = await fetch(config.cardsUrl, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  });
  return await handleResponse(res);
};

const deleteCard = async (cardId) => {
  const res = await fetch(`${config.cardsUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return await handleResponse(res);
};

// Like handlers

const addLike = async (cardId) => {
  return await fetch(`${config.cardsUrl}/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  });
};

const removeLike = async (cardId) => {
  return await fetch(`${config.cardsUrl}/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  });
};

// Update avatar

const changeAvatar = async (imgLink) => {
  const res = await fetch(`${config.userDataUrl}/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({ avatar: imgLink }),
  });
  return await handleResponse(res);
};
