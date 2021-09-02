const express = require("express");
const fs = require("fs");
const {
  getRandomItem,
  getMatchTime,
  getMatchDay,
  getMatchDate,
  getFormation,
  getFormationPlayers,
  getHour,
} = require("./util/helpers");
const { fetchTeams, fetchStadiums, fetchPlayers } = require("./services");
const postTweet = require("./poster");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const PORT = 3000;

app.get("/match", async (_, res) => {
  try {
    const teams = await fetchTeams();
    const stadiums = await fetchStadiums();
    const players = await fetchPlayers();

    const team = getRandomItem(teams);
    const stadium = getRandomItem(stadiums);
    const formation = getFormation();
    const formationPlayers = getFormationPlayers(formation, players);
    const manager = getRandomItem(players.managers);
    manager.class = "manager";

    const obj = {
      team,
      stadium,
      matchDate: getMatchDate(),
      matchDay: getMatchDay(),
      matchTime: getMatchTime(),
      formationPlayers,
      manager,
    };

    fs.writeFileSync("public/generated-lineup-data.json", JSON.stringify(obj));

    res.render("./match/index.ejs", obj);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(PORT);

postTweet();

setInterval(() => {
  postTweet();
}, getHour(2));
