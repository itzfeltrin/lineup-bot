const express = require("express");
const fs = require("fs");
const {
  getRandomItem,
  getMatchTime,
  getMatchDay,
  getMatchDate,
  getFormation,
  getFormationPlayers,
  getChampionship,
} = require("../util/helpers");
const { fetchTeams, fetchStadiums, fetchPlayers } = require("../services");

const router = express.Router();

router.get("/", async (_, res) => {
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
    const championship = getChampionship();

    const obj = {
      team,
      stadium,
      matchDate: getMatchDate(),
      matchDay: getMatchDay(),
      matchTime: getMatchTime(),
      formationPlayers,
      manager,
      championship,
    };

    fs.writeFileSync("public/generated-lineup-data.json", JSON.stringify(obj));

    res.render("../src/views/match/index.ejs", obj);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
