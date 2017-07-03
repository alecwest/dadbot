#!/usr/bin/env node

var irc = require('./');
var request = require("request");
var fs = require('fs');

var bot = new irc.Client('localhost', 'dad', {
    debug: true,
    channels: ['#main']
});

bot.addListener('error', function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message#blah', function(from, message) {
    console.log('<%s> %s', from, message);
});

bot.addListener('message', function(from, to, message) {
    console.log('%s => %s: %s', from, to, message);

    // Hi _____, I'm dad
    if (message.match(/^[Ii][']?[Mm] \w+[^\s]*$/i)) {
        bot.say(to, 'Hi ' + message.split(" ")[1].replace('.', '') + ', I\'m dad');
    }

    if (to.match(/^[#&]/)) {
        // Dad joke!
        if (message.match(/dad\?/i)) {
            // bot.say(to, 'I should probably fill this in with some dad jokes...');
            var jokeArray = fs.readFileSync('dadJokes.txt').toString().split("\n");
            var randomInt = Math.floor(Math.random() * (jokeArray.length));
            console.log(jokeArray.length);
            console.log(randomInt);
            var line_one = jokeArray[randomInt].split('~')[0];
            var line_two = jokeArray[randomInt].split('~')[1];
            setTimeout(function() { bot.say(to, line_one) }, 0);
            setTimeout(function() { bot.say(to, line_two) }, 4000);
        }
    }
    else {
        // private message
        console.log('private message');
    }
});
bot.addListener('pm', function(nick, message) {
    console.log('Got private message from %s: %s', nick, message);
});
bot.addListener('join', function(channel, who) {
    console.log('%s has joined %s', who, channel);
});
bot.addListener('part', function(channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
});
bot.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});
