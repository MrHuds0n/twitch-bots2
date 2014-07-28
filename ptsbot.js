var irc = require('node-twitch-irc'),
	_ = require('underscore');

var config = {
	nickname: 'playtouhoubot',
	channels: ['#playtouhoubot', '#playtouhouscum'],
	oauth: 'oauth:e1u61mnwryuiq9s29yrk7bfjxfxphcd',
};

var mods = ['playtouhouscum'];

var rBirdtross = 'Budding YouTuber, Minecrafter, Space sim pilot and flightless kiwi. http://twitch.tv/birdtross';
var rDandefender = 'Avid gamer, Part time streamer, part time Mod. Dan the Man. http://twitch.tv/dandefender';

var gDiscovery = 'Discovery is a mod for a great space-sim Freelancer. Learn more: http://discoverygc.com/wiki/Freelancer';
var gTouhou = 'Touhou is a series of rock-hard bullet hell shoot-em-ups. Learn more: http://touhou.wikia.com/wiki/Touhou_Wiki';
var gOpenTTD = 'OpenTTD is a freeware tycoon based around building a transportation company. Learn more: http://openttd.org';

var client = new irc.connect(config, function(err, event) {
	if (!err) {
		event.on("connected", function() {
			console.log('CONNECTED');
			client.join('#playtouhoubot');
		});

		event.on("disconnected", function() {
			console.log('DISCONNECTED: ' +reason);
		});

		event.on("chat", function (user, channel, message) {
			var msg = message.toLowerCase();
			var args = msg.split(" ");

			//Logs the chat to console.
			console.log('['+channel+'] <'+user.color+'|'+user.username+'|'+user.special+'> '+message);

			//Joins the channel of the sender.
			if (msg === '+join') {
				client.join('#'+user.username);
				client.say(channel, 'Joined channel: ' + user.username);
				console.log('Joined (r) channel: #'+user.username);
			}

			//Parts the sender's channel.
			else if (msg === '+part') {
				client.part('#'+user.username);
				client.say(channel, 'Parted channel: ' + user.username);
				console.log('Parted (r) channel: #'+user.username);
			}

			else if (msg.indexOf('+ajoin ') === 0 && user.username == 'playtouhouscum') {
				if (typeof args[1] !== 'undefined' && args[1].trim() !== '') {
					client.join('#'+args[1]);
					console.log('Joined (a) channel: #'+args[1]);
				}
				else {
					console.log('Insufficient arguments');
				}
			}

			else if (msg.indexOf('+apart ') === 0 && user.username == 'playtouhouscum') {
				if (typeof args[1] !== 'undefined' && args[1].trim() !== '') {
					client.part('#'+args[1]);
					console.log('Parted (a) channel: #'+args[1]);
				}
				else {
					console.log('Insufficient arguments');
				}
			}

			else if (msg.indexOf('+r ') === 0 && _.indexOf(mods, user.username) >= 0) {
				if (typeof args[1] !== 'undefined' && args[1].trim() !== '') {
					if(args[1] === 'birdtross') {
						client.say(channel, rBirdtross);
					}
					else if (args[1] === 'dandefender') {
						client.say(channel, rDandefender);
					}
				}
			}

			else if (msg.indexOf('+g ') === 0 && _.indexOf(mods, user.username) >= 0) {
				if (typeof args[1] !== 'undefined' && args[1].trim() !== '') {
					if(args[1] === 'discovery') {
						client.say(channel, gDiscovery);
					}
					else if (args[1] === 'touhou') {
						client.say(channel, gTouhou);
					}
					else if (args[1] === 'openttd') {
						client.say(channel, gOpenTTD);
					}
				}
			}
	    });
	}
	else {
	console.log(err);
	}
});