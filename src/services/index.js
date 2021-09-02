const fetch = require("node-fetch");

const fetchTeams = async () => {
  try {
    const res = await fetch("http://localhost:3000/public/data/teams.json");

    const data = await res.json();

    return data;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

const fetchStadiums = async () => {
  try {
    const res = await fetch("http://localhost:3000/public/data/stadiums.json");

    const data = await res.json();

    return data;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

const fetchPlayers = async () => {
  try {
    const res = await fetch("http://localhost:3000/public/data/players.json");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw JSON.stringify(err);
  }
};

module.exports = {
  fetchTeams,
  fetchStadiums,
  fetchPlayers,
};
