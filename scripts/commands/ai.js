module.exports = {
  config: {
    name: "ai",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "",
    prefix: false,
    category: "user",
    usages: "query",
    cooldowns: 5,
    dependencies: {
      "nayan-server": ""
    }
  },

  start: async function({ nayan, events, args, Users, NAYAN }) {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs-extra");
    const id = nayan.getCurrentUserID()
    const uid = events.senderID;
    const nn = await Users.getNameUser(uid);
    const np = args.join(" ");
    const { gpt } = require("nayan-server");

    try {
      gpt({
        messages: [
          {
            role: "assistant",
            content: "Hello! Im heaven bestbot "
          },
          {
            role: "user",
            content: `Hello, im heaven bot ${nn}.`
          },
          {
            role: "assistant",
            content: `Hello, ${nn}! Im heaven bot`
          }
        ],
        prompt: `${np}`,
        model: "GPT-4",
        markdown: false
      }, async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
console.log(data)
        const answer = data.gpt;
        await NAYAN.sendContact(answer, id, events.threadID);
      });
    } catch (error) {
      console.error("Error while processing GPT request:", error);
    }
  }
};
