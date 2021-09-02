const fs = require("fs");

const fetchTeams = async () => {
  try {
    const res = fs.readFileSync("public/data/teams.json", "utf8");

    const data = JSON.parse(res);

    return data;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

const fetchStadiums = async () => {
  try {
    const res = fs.readFileSync("public/data/stadiums.json", "utf8");

    const data = JSON.parse(res);

    return data;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

const fetchPlayers = async () => {
  try {
    const res = fs.readFileSync("public/data/players.json", "utf8");

    const data = JSON.parse(res);

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
