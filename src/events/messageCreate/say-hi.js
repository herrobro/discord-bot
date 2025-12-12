module.exports = (message, client, handler) => {
  if (message.content === "hey") {
    if (!message.author.bot) {
      message.reply("hey");
    }
  }
};
