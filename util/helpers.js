const { weekdays } = require("./constants");

const getRandomItem = (arr = []) => {
  const randomIndex = Math.floor(Math.random() * (arr.length - 0)) + 0;

  return arr[randomIndex];
};

const getMatchDate = () =>
  new Date()
    .toLocaleDateString("pt-BR")
    .split("-")
    .reverse()
    .map((el) => el.padStart(2, "0"))
    .join("/");

const getMatchDay = () => {
  const dayIndex = new Date().getDay();

  return weekdays[dayIndex];
};

const getMatchTime = () => {
  const split = new Date().toLocaleTimeString().split(":").slice(0, 2);

  split[0] = split[0] !== "23" ? +split[0] + 1 : "00";

  return split.map((el) => el.toString().padStart(2, "0")).join(":");
};

const getFormation = () => {
  let defesa;
  let meio;
  let ataque;

  do {
    defesa = Math.floor(Math.random() * 4) + 3;
    meio = Math.floor(Math.random() * 4) + 2;
    ataque = Math.floor(Math.random() * 2) + 1;
  } while (defesa + meio + ataque != 10 || defesa > 5);

  return `${defesa}-${meio}-${ataque}`;
};

const getFormationPlayers = (formation, players) => {
  const goalkeeper = getRandomItem(players.goalkeepers);
  goalkeeper.class = "goalkeeper";

  let arr = [goalkeeper];

  try {
    const split = formation.split("-").map((el) => +el);

    const numOfCenterbacks = split[0] === 4 ? 2 : 3;

    for (var i = 0; i < numOfCenterbacks; i++) {
      let centerback;

      do {
        centerback = getRandomItem(players.centerbacks);
        centerback.class = "centerback";
      } while (arr.includes(centerback));

      arr.push(centerback);
    }

    if (split[0] !== 3) {
      const leftback = getRandomItem(players.leftbacks);
      leftback.class = "leftback";

      arr.push(leftback);

      const rightback = getRandomItem(players.rightbacks);
      rightback.class = "rightback";

      arr.push(rightback);
    }

    for (var i = 0; i < split[1]; i++) {
      let midfielder;

      do {
        midfielder = getRandomItem(players.midfielders);
        midfielder.class = "midfielder";
      } while (arr.includes(midfielder));

      arr.push(midfielder);
    }

    for (var i = 0; i < split[2]; i++) {
      let forward;

      do {
        forward = getRandomItem(players.forwards);
        forward.class = "forward";
      } while (arr.includes(forward));

      arr.push(forward);
    }
  } catch (err) {
    console.log("getFormationPlayers error", err);
  }

  return arr;
};

const getHour = (hour = 1) => {
  return 1000 * 60 * 60 * hour;
};

const statuses = [
  "📝INTER ESCALADO! #VamoInter ⚪️🔴",
  `Colorado escalado para confronto deste ${getMatchDay()}! #VamoInter ⚪️🔴`,
];

const getStatus = () => getRandomItem(statuses);

module.exports = {
  getRandomItem,
  getMatchDate,
  getMatchDay,
  getMatchTime,
  getFormation,
  getFormationPlayers,
  getHour,
  getStatus,
};
