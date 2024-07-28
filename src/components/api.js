export {config, checkResponse, currentUserInfo};

const config = {
  mainUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/cards',
  myDataUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/users/me',
  headers: {
    authorization: '55dbdb8b-7c02-49e7-8458-8e349a330bef'
  }
};

const checkResponse = async (config) => {
  const res = await fetch(config.mainUrl, {
    headers: config.headers
  });
  const data = await res.json();
  console.log(data);
}

const currentUserInfo = async (config) => {
  const res = await fetch(config.myDataUrl, {
    headers: config.headers
  });
  const data = await res.json();
  console.log(data);
}