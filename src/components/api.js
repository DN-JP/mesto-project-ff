export {config, fetchCards, fetchUserData};

const config = {
  mainUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/cards',
  myDataUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/users/me',
  headers: {
    authorization: '55dbdb8b-7c02-49e7-8458-8e349a330bef',
    'Content-Type': 'application/json'
  }
};

const fetchCards = async () => {
  const res = await fetch(config.mainUrl, {
    headers: config.headers
  });
  if (!res.ok) {
    throw new Error(`Error fetching cards! Status: ${res.status}`)
  }
  const cardsData = await res.json();
  return cardsData;
}

const fetchUserData = async () => {
  try {
    const res = await fetch(config.myDataUrl, {
    headers: config.headers
    });
    if (!res.ok) {
      throw new Error(`Error fetching user data! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Failed to fetch user data', error);
    throw error;
  }
}