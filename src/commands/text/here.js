module.exports = {
  name: 'here',
  description: 'Creates a new embed',
  usage: '>embed_create "titel" "Description"',
  trigger: 'here',
  category: 'Stuff',
  async execute(_client, msg, _args) {
    msg.channel.send('hello :D');
  },
};
