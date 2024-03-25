import { GatewayIntentBits, Message, EmbedBuilder } from "discord.js";
import DiscordJS from 'discord.js';
import dotenv from 'dotenv';
import prettyMilliseconds from 'pretty-ms';
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});
const prefix = ">"
const footer = {text: 'TDC Calculator bot made by Kasp'}

client.on('ready', () =>{
    console.log('bot is running');
    client.user.setActivity(`my prefix is "${prefix}"`);
})

client.on('messageCreate', async (message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const embedColor = '#6fa7bd'

    switch(command){
        case 'help':

            const embed = new EmbedBuilder()
            .setAuthor({name:'Avaliable Commands And Syntax'})
            .setColor(embedColor)
            .setFooter(footer)
            .setTimestamp()
            .addFields(
                {name:`${prefix}Speed`,value:'Syntax: (Mesured Length) (Seconds From Stopwatch)'},
                {name:`${prefix}Range`,value:'Syntax: (Height) (Angle)'}

            )
            message.channel.send({embeds:[embed]});
            break;

        case 'speed':
            let Length = parseFloat(args[0]);
            let Seconds = parseFloat(args[1]);
            let Speed = (Length / Seconds * 1.94).toFixed(2);

            message.channel.send(`Target Speed Equals ${String(Speed)}`);
            break;
        
        case 'range':
            let Height = parseFloat(args[0]);
            let Angle = parseFloat(args[1]);
            let Range = (Height / (Angle /10) * 4).toFixed(2);

            message.channel.send(`Target Range Equals ${String(Range)}`)
        




    }
})
client.login(process.env.token)