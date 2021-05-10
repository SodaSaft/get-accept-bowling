const PROTOCOL = 'http:';
const HOST = 'localhost';
const PORT = 3000;

const ORIGIN = `${PROTOCOL}//${HOST}`;

const POST_OPTIONS = {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
};

const CALCULATE_URL = `${ORIGIN}:${PORT}/calculate`;

const calculateRequest = (body) => new Request(CALCULATE_URL, { body, ...POST_OPTIONS });

export default async (body) => {
  let scores;
  const bodyJSON = JSON.stringify(body);
  try {
    const response = await fetch(calculateRequest(bodyJSON));
    const json = await response.json();

    scores = json.scores;
  } catch (e) {
    console.error(e);
  }

  return scores;
};
