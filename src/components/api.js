export {config, fetchCards, fetchUserData, patchProfile, postCard};

const config = {
  cardsUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/cards',
  myDataUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/users/me',
  headers: {
    authorization: '55dbdb8b-7c02-49e7-8458-8e349a330bef',
    'Content-Type': 'application/json'
  }
};

const fetchCards = async () => {
  const res = await fetch(config.cardsUrl, {
    headers: config.headers
  });
  if (!res.ok) {
    throw new Error(`Error fetching cards! Status: ${res.status}`)
  }
  const cardsData = await res.json();
  return cardsData;
};

const fetchUserData = async () => {
  try {
    const res = await fetch(config.myDataUrl, {
    headers: config.headers
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    };
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Failed to fetch user data', error);
    throw error;
  };
};

const patchProfile = async (name, about) => {
  try {
    const res = await fetch(config.myDataUrl, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    } 
    const data = await res.json();
  } catch (error) {
    console.log('Failed to fetch user data', error);
  };
};

const postCard = async (cardData) => {
  try {
    const res = await fetch(config.cardsUrl, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(cardData)
    });
  } catch (error) {
    console.log('Failed to fetch user data', error);
  };
};