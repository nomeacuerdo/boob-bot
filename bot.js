/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
          \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
           \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit is has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('./lib/Botkit.js');
var os = require('os');
var googleImages = require('google-images');
var client = googleImages('017897337011875483977:s-lyijxb62i', 'AIzaSyCYGn2FMevGh5oEdcglCM-Le-4PrSCd0pM');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: "xoxb-20154603604-SECxPakn6vWlKPStbCHINj8d"
}).startRTM();


//BOOB BOT!
controller.hears(['boob(.*)'], 'message_received', function(bot, message) {
    var toggle = false,
        imagePage = Math.floor(Math.random() * 5);

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'metal',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });

    client.search('Boobs', { page: imagePage })
        .then(function (images) {
            var min = 0,
                max = images.length,
                index = Math.floor(Math.random() * (max - min + 1)) + min,
                image = images[index];

            if (!toggle) {
                bot.reply(message, {
                    "type": "message",
                    "username": "Boobinator",
                    "icon_emoji": ":wow:",
                    "attachments": [
                        {
                            "fallback": "Beeewbs!",
                            "color": "#36a64f",
                            "image_url": image.url,
                            "thumb_url": image.thumbnail.url
                        }
                    ]
                });

                toggle = true;
            }
            /*
            [{
                "url": "http://steveangello.com/boss.jpg",
                "type": "image/jpeg",
                "width": 1024,
                "height": 768,
                "size": 102451,
                "thumbnail": {
                    "url": "http://steveangello.com/thumbnail.jpg",
                    "width": 512,
                    "height": 512
                }
            }]
            */
        });
});

//END BOOB BOT
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});