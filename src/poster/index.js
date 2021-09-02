const puppeteer = require("puppeteer");
const fs = require("fs");
const twit = require("twit");
const config = require("./config");
const { getStatus } = require("../util/helpers");

const t = new twit(config);

const tweet = () => {
  const base64 = fs.readFileSync("public/generated-lineup.png", {
    encoding: "base64",
  });

  t.post("media/upload", { media_data: base64 }, (err, data, res) => {
    const mediaIdStr = data.media_id_string;
    const altText = "Escalação aleatória gerada";
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

    t.post("media/metadata/create", meta_params, (err, data, response) => {
      if (!err) {
        const status = getStatus();

        const params = { status, media_ids: [mediaIdStr] };

        t.post("statuses/update", params, function (err, data, response) {
          console.log("Tweeted!");
          console.log(data);
        });
      }
    });
  });
};

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/match");

  page.setViewport({ width: 800, height: 1280 });

  await page.screenshot({ path: "public/generated-lineup.png" });

  await browser.close();

  tweet();
};
