const port = 8433;
const url = `https://kackydev.dingens.me:${port}`;

export async function login(username, password) {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      pwd: password,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function registerUser(username, password, mailadress) {
  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      pwd: password,
      mail: mailadress,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getDashboardData() {
  const response = await fetch(`${url}/data.json`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export function getMapImageUrl(mapNumber) {
  const imageUrl = `https://kackydev.dingens.me/static/media/images/${mapNumber}.jpg`;
  return imageUrl;
}
