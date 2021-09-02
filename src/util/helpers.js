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

const matchTimes = [
  "11:00",
  "16:00",
  "18:15",
  "19:00",
  "19:15",
  "19:30",
  "20:00",
  "20:15",
  "20:30",
  "21:00",
  "21:15",
  "21:30",
];

const getMatchTime = () => getRandomItem(matchTimes);

const championships = [
  `Pré Libertadores`,
  `Libertadores - Fase de grupos`,
  `Libertadores - Oitavas`,
  `Libertadores - Quartas`,
  `Libertadores - Semifinal`,
  `Libertadores - Final`,
  `Copa Sul-Americana - Fase de grupos`,
  `Copa Sul-Americana - Oitavas`,
  `Copa Sul-Americana - Quartas`,
  `Copa Sul-Americana - Semifinal`,
  `Copa Sul-Americana - Final`,
  `Copa do Brasil - 4a Fase`,
  `Copa do Brasil - Oitavas`,
  `Copa do Brasil - Oitavas`,
  `Copa do Brasil - Quartas`,
  `Copa do Brasil - Semifinal`,
  `Copa do Brasil - Final`,
  `Mundial de Clubes - Semifinal`,
  `Mundial de Clubes - Final`,
  `Mundial de Clubes - Disputa de 3o lugar`,
  `Gauchão - Fase de grupos`,
  `Gauchão - Quartas`,
  `Gauchão - Semifinal`,
  `Gauchão - Final`,
  `Recopa Sul-Americana - Ida`,
  `Recopa Sul-Americana - Volta`,
  `Supercopa do Brasil`,
];

const getChampionship = () => {
  const random = Math.floor(Math.random() * 40 + 1) <= 20;

  return random
    ? `Brasileirão - ${Math.floor(Math.random() * 38 + 1)}a Rodada`
    : getRandomItem(championships);
};

const getFormation = () => {
  let defesa;
  let meio;
  let ataque;

  do {
    defesa = Math.floor(Math.random() * 4) + 3;

    const meioFirst = Boolean(Math.floor(Math.random() * 2));

    if (meioFirst || defesa === 5) {
      meio = Math.floor(Math.random() * 4) + 2;
      ataque = Math.floor(Math.random() * 2) + 1;
    } else {
      ataque = Math.floor(Math.random() * 2) + 2;
      meio = Math.floor(Math.random() * 4) + 1;
    }
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
  getChampionship,
};
