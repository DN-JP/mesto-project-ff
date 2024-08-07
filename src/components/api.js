export {
  config,
  fetchCards,
  fetchUserData,
  patchProfile,
  postCard,
  deleteCard,
  addLike,
  removeLike,
  changeAvatar,
};

const config = {
  cardsUrl: "https://nomoreparties.co/v1/pwff-cohort-1/cards",
  userDataUrl: "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
  headers: {
    authorization: "55dbdb8b-7c02-49e7-8458-8e349a330bef",
    "Content-Type": "application/json",
  },
};

// User data

const fetchUserData = async () => {
  try {
    const res = await fetch(config.userDataUrl, {
      headers: config.headers,
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch user data", error);
    throw error;
  }
};

const patchProfile = async (name, about) => {
  try {
    const res = await fetch(config.userDataUrl, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    const data = await res.json();
  } catch (error) {
    console.log("Failed to fetch user data", error);
  }
};

// Cards data

const fetchCards = async () => {
  const res = await fetch(config.cardsUrl, {
    headers: config.headers,
  });
  if (!res.ok) {
    throw new Error(`Error fetching cards! Status: ${res.status}`);
  }
  const cardsData = await res.json();
  return cardsData;
};

const postCard = async (cardData) => {
  try {
    const res = await fetch(config.cardsUrl, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(cardData),
    });
  } catch (error) {
    console.log("Failed to fetch user data", error);
  }
};

const deleteCard = async (cardId) => {
  try {
    const res = await fetch(`${config.cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch user data", error);
  }
};

// Card like/dislike

const addLike = async (cardId) => {
  try {
    const res = await fetch(`${config.cardsUrl}/likes/${cardId}`, {
      headers: config.headers,
      method: "PUT",
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    return res;
  } catch {
    console.log("Failed to add like", error);
  }
};

const removeLike = async (cardId) => {
  try {
    const res = await fetch(`${config.cardsUrl}/likes/${cardId}`, {
      headers: config.headers,
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    return res;
  } catch {
    console.log("Failed to remove like:", error);
  }
};

// Update user avatar

const changeAvatar = async (imgLink) => {
  try {
    const res = await fetch(`${config.userDataUrl}/avatar`, {
      headers: config.headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: imgLink }),
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Failed to change avatar:", error);
    throw error;
  }
};
