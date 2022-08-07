const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const chalk = require('chalk');
const config = require(`./botconfig.js`)
const prefix = config.prefix;
const fs = require('fs'); 
const ms = require('ms')
const { voiceID, parentID } = require("./config.json");

const client = new Discord.Client({
   intents : [
     Discord.Intents.FLAGS.GUILDS ,
     Discord.Intents.FLAGS.GUILD_MEMBERS ,
     Discord.Intents.FLAGS.GUILD_BANS ,
     Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS ,
     Discord.Intents.FLAGS.GUILD_INTEGRATIONS ,
     Discord.Intents.FLAGS.GUILD_WEBHOOKS ,
     Discord.Intents.FLAGS.GUILD_INVITES ,
     Discord.Intents.FLAGS.GUILD_VOICE_STATES ,
     Discord.Intents.FLAGS.GUILD_PRESENCES ,
     Discord.Intents.FLAGS.GUILD_MESSAGES ,
     Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS ,
     Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING ,
     Discord.Intents.FLAGS.DIRECT_MESSAGES , 
     Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS ,
     Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING ,
  ],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});
require("dotenv").config()

const randomstring = require("randomstring");



const sfatsembed = new Discord.MessageEmbed()
    .setDescription(`Не указан стафф в БД`)
    .setColor("#2f3136")

const channelsetup = new Discord.MessageEmbed()
    .setDescription(`Не указана категория в БД`)
    .setColor("#2f3136")

    const colldown1 = new Discord.MessageEmbed()
        .setDescription(`Сейчас будет закрыт канал`)
        .setColor("#2f3136")



client.on('ready', async () => {
  console.log(chalk.greenBright(`Рабочий токен... Выполняю вход...`))
  
  console.log(chalk.bgRed(chalk.greenBright(`Успешно! Опознан бот ${client.user.username}`)))

  client.user.setActivity(config.status.name, { type: config.status.type.toUpperCase() })
});
  
  client.on("guildMemberAdd", (member) => {
	const memberCount = member.guild.memberCount
const { MessageEmbed } = require('discord.js')
  const channel = member.guild.channels.cache.get('994302054161989764')
  
  const joinUserEmbed = new MessageEmbed()
  .setTitle('RuHypixel Network')
  .setURL('https://ruhypixel.net')
  .setAuthor(`После твоего захода, на сервере теперь целых ${memberCount} участника(-ов)!`, client.user.displayAvatarURL)
  .setDescription(`Поприветствуем нового участника на нашем сервере - <@${member.user.id}>! На нашем сервере ты можешь найти много нового и интересного, задавать вопросы персоналу, общаться с коммьюнити, стать частью команды и просто хорошо провести время!`)
  .setThumbnail(member.guild.iconURL())
  .addFields({
    name: 'Ниже, ты можешь увидеть все наши социальные сети и информацию!',
    value: 'Подпишись на наши соц.сети, чтобы быть в курсе всех новостей...'
  }, {
    name: '\u200B',
    value: '\u200B'
  }, {
    name: 'Официальная группа ВКонтакте',
    value: 'https://vk.com/ruhypixel',
    inline: true
  }, {
    name: 'IP сервера',
    value: 'ruhypixel.net',
    inline: true
  }, {
    name: 'Официальный сайт проекта',
    value: 'https://ruhypixel.net',
    inline: true
  }, )
  .setImage('https://psv4.userapi.com/c505536/u226880793/docs/d12/e244f94ac0e6/pod_banner.png?extra=8kPKkfYrKofASPrKb1kJfY00fPOnOGa9AbLYTpBg9KpP-3TRw5JS0a3vYL2rn8KsvbmI2nPfTY9wysrPLCdHqWFs8cySYlvpjThkCT0asJZkF88OHPmZ9zDbvr5z7SzTaoi5bJ1RwDC2WV0ElDKODS8')
  .setColor("#2f3136")
  .setTimestamp()
  .setFooter('Надеюсь, что ты не заскучаешь!', member.guild.iconURL());

  channel.send({ content: `<@${member.user.id}>`, embeds: [joinUserEmbed]})
});

client.on("messageCreate", async(message) =>{
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");
  let command = args.shift()
 
       let nomember = new Discord.MessageEmbed()
     .setDescription(`Вы не указали пользователя.`)
 
 if (command == prefix + 'ban'){
	 	  let ban_himself = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** забанить самого себя, кукуха поехала?`)
	  .setColor("#2f3136")
	 
	  let ban_owner = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** забанить основателя сервера.`)
	  .setColor("#2f3136")
	  
	  let ban_higher = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** забанить пользователя, потому что указанный Вами пользователь является **Администратором**.`)
	  .setColor("#2f3136")
	 
	 let ban_perms = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`У Вас **нет прав**.`)
	  .setColor("#2f3136")
	 
	 if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply ({ embeds: [mute_perms] })
		 
	 const member = message.mentions.members.first()
	 if(!member) return message.reply ({ content: `Укажите пользователя!` })
	 const channel = message.guild.channels.cache.find(ch => ch.name === '︰📚・moderation'); 	 
 
	 if(member.id === message.author.id) return message.reply ({ embeds: [ban_himself] })
	 if(member.id === '653187508380631041') return message.reply ({ embeds: [ban_owner] })
     if (member.permissions.has('ADMINISTRATOR')) return message.reply ({ embeds: [ban_higher] })

	 const reason = message.content.split(" ").slice(2).join(" ") || 'Причина не указана'
	 
	 	  let ban_given = new Discord.MessageEmbed()
      .setTitle("Наказание успешно выдано! <:anim_yes:1001788957912215612>")
      .setDescription(`Нарушитель: **<@${member.id}>**\nПричина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	 let ban_given_log = new Discord.MessageEmbed()
      .setTitle("Участнику был выдан бан! 📚")
      .setDescription(`Нарушитель: **<@${member.id}>**\nПричина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	let ban_got = new Discord.MessageEmbed()
      .setTitle("Привет! 👋 Ты забанен")
      .setDescription(`Причина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setImage('https://img.gifmagazine.net/gifmagazine/images/32423/original.gif')
	  .setColor("#2f3136")
	  
	let notagree = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Я не согласен с выданным наказанием')
	.setEmoji('<:anim_no:1001788940166111272>')
    .setCustomId("notagree")
	let trow = new Discord.MessageActionRow().addComponents(notagree)
	  
	 message.channel.send({ embeds: [ban_given] })
	 channel.send({ embeds: [ban_given_log] })
	 member.ban({ reason: reason })
	 member.send({ embeds: [ban_got], components: [trow] })
	 
 }
 
  if (command == prefix + 'unban'){
	 
	 let ban_perms = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`У Вас **нет прав**.`)
	  .setColor("#2f3136")
	 
	 if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply ({ embeds: [mute_perms] })
		 
	 const member = args[0]
	 if(!member) return message.reply ({ content: `Укажите пользователя!` })
	 const channel = message.guild.channels.cache.find(ch => ch.name === '︰📚・moderation');
	 
	 	  let ban_given = new Discord.MessageEmbed()
      .setTitle("Бан успешно снят! <:anim_yes:1001788957912215612>")
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	 let ban_given_log = new Discord.MessageEmbed()
      .setTitle(`Участник ${member} был разбанен! 📚`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	 message.channel.send({ embeds: [ban_given] })
	 channel.send({ embeds: [ban_given_log] })
	 message.guild.bans.remove(member)
     .catch(console.error);
	 
 }
 
 if (command == prefix + 'mute'){
	 
	  let mute_himself = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** замутить самого себя, кукуха поехала?`)
	  .setColor("#2f3136")
	 
	  let mute_owner = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** замутить основателя сервера.`)
	  .setColor("#2f3136")
	  
	  let mute_higher = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** замутить пользователя, потому что указанный Вами пользователь является **Администратором**.`)
	  .setColor("#2f3136")
	  
	  let mute_already = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** замутить пользователя, потому что он **уже замучен**.`)
	  .setColor("#2f3136")
	 
	 let mute_perms = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`У Вас **нет прав**.`)
	  .setColor("#2f3136")
	 
	 if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply ({ embeds: [mute_perms] })
	 
	 const member = message.mentions.members.first()
	 if(!member) return message.reply ({ content: `Укажите пользователя!` })
	 const channel = message.guild.channels.cache.find(ch => ch.name === '︰📚・moderation'); 	 
 
	 if(member.id === message.author.id) return message.reply ({ embeds: [mute_himself] })
	 if(member.id === '653187508380631041') return message.reply ({ embeds: [mute_owner] })
     if (member.permissions.has('ADMINISTRATOR')) return message.reply ({ embeds: [mute_higher] })
     if(member.isCommunicationDisabled() === true) return message.reply ({ embeds: [mute_already] })

	 const time = args[1]
	 if(!time) return message.reply ({ content: `Укажите время!\nПример: **1m - 1 минута**, **6h - 6 часов** и т.д..` })
	 const reason = message.content.split(" ").slice(3).join(" ") || 'Причина не указана'
	 
	  let mute_given = new Discord.MessageEmbed()
      .setTitle("Наказание успешно выдано! <:anim_yes:1001788957912215612>")
      .setDescription(`Нарушитель: **<@${member.id}>**\nВремя наказания: **${time}**\nПричина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	 let mute_given_log = new Discord.MessageEmbed()
      .setTitle("Участнику был выдан мут! 📚")
      .setDescription(`Нарушитель: **<@${member.id}>**\nВремя наказания: **${time}**\nПричина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	let mute_got = new Discord.MessageEmbed()
      .setTitle("Привет! 👋 Ты получил мут")
      .setDescription(`Время наказания: **${time}**\nПричина наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setImage('https://img.gifmagazine.net/gifmagazine/images/32423/original.gif')
	  .setColor("#2f3136")
	  
	let notagree = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Я не согласен с выданным наказанием')
	.setEmoji('<:anim_no:1001788940166111272>')
    .setCustomId("notagree")
	let trow = new Discord.MessageActionRow().addComponents(notagree)
	  
	 message.channel.send({ embeds: [mute_given] })
	 channel.send({ embeds: [mute_given_log] })
	 await member.timeout(ms(time), reason)
	 member.send({ embeds: [mute_got], components: [trow] })
	 
 }

  if (command == prefix + 'unmute'){
	 
	  let mute_already = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`Вы **не можете** размутить пользователя, потому что он **не в муте**.`)
	  .setColor("#2f3136")
	  
	  	 let mute_perms = new Discord.MessageEmbed()
      .setTitle("Вышла ошибка! <:anim_no:1001788940166111272>")
      .setDescription(`У Вас **нет прав**.`)
	  .setColor("#2f3136")
	 
	 if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply ({ embeds: [mute_perms] })
	 
	 const member = message.mentions.members.first()
	 const channel = message.guild.channels.cache.find(ch => ch.name === '︰📚・moderation'); 
	 if(member.isCommunicationDisabled() === false) return message.reply ({ embeds: [mute_already] })
	 const reason = message.content.split(" ").slice(2).join(" ") || 'Причина не указана'
	 
	 let mute_taken = new Discord.MessageEmbed()
      .setTitle("Мут отменён! <:anim_yes:1001788957912215612>")
      .setDescription(`Участник: **<@${member.id}>**\nПричина снятия наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	 
	let mute_taken_log = new Discord.MessageEmbed()
      .setTitle("С участника был снят мут! 📚")
      .setDescription(`Участник: **<@${member.id}>**\nПричина снятия наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setColor("#2f3136")
	  
	 let mute_expired = new Discord.MessageEmbed()
      .setTitle("Привет снова! 👋 Ты был размучен")
      .setDescription(`\nПричина снятия наказания: **${reason}**`)
	  .setAuthor(`Модератор: ${message.author.tag}`)
	  .setImage('https://i.gifer.com/embedded/download/ZO82.gif')
	  .setColor("#2f3136")
	
	await member.timeout(null)
	  message.channel.send({ embeds: [mute_taken] })
	  channel.send({ embeds: [mute_taken_log] })
	  member.send({ embeds: [mute_expired] })
	 
	 
 }
 
if(message.channel.name == '┊︰📷・медиа') {
  message.react("👍")
  message.react("👎")
}

if(message.channel.name == '┊💡〢・идеи') {
  message.react("👍")
  message.react("👎")
}

//if(message.channel.name == '╭︰💬・общий-чат') {
//if(message.author.id !== "335416744212693002") return;
 // message.channel.send(message)
  //message.delete()
  //}

  if (command == prefix + 'roles'){
if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
let target = message.mentions.members.first();

    let red = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Красный цвет')
	.setEmoji('❤️')
    .setCustomId("red")

    let orange = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Оранжевый цвет')
	.setEmoji('🧡')
    .setCustomId("orange")
	
	let yellow = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Жёлтый цвет')
	.setEmoji('💛')
    .setCustomId("yellow")

	let green = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Зелёный цвет')
	.setEmoji('💚')
    .setCustomId("green")

	let blue = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Голубой цвет')
	.setEmoji('💙')
    .setCustomId("blue")
	
	let purple = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Фиолетовый цвет')
	.setEmoji('💜')
    .setCustomId("purple")
  
  	let white = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Белый цвет')
	.setEmoji('🤍')
    .setCustomId("white")

  	let black = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Чёрный цвет')
	.setEmoji('🖤')
    .setCustomId("black")

	let boy = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Мужской пол')
	.setEmoji('<:mangender:960174686803722240>')
    .setCustomId("boy")
	
	let girl = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Женский пол')
	.setEmoji('<:girlgender:960174687000883330>')
    .setCustomId("girl")

	let staffnews = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Новости о персонале')
	.setEmoji('📢')
    .setCustomId("staffnews")
	
	let news = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Новости о боте')
	.setEmoji('📰')
    .setCustomId("news")

    let infoembed = new Discord.MessageEmbed()
      .setTitle("Получить роль по цвету")
      .setDescription(`Не нравится роль, из-за высокого местоположения которого у тебя высвечивается не тот цвет, который ты хотел бы? Исправь ситуацию здесь. Выбери нужный тебе цвет.`)
	  .setColor("#2f3136")

    let infoembed_2 = new Discord.MessageEmbed()
    .setDescription(`Чувствуешь себя черникой? Или ты из этих, ZXC? dead inside? Выбирай подходящие для тебя цвета поскорее.`)
  .setColor("#2f3136")

    let genderembed = new Discord.MessageEmbed()
      .setTitle("Получить гендерную роль")
      .setDescription(`Иногда не понятно, как к тебе обращаться. Для этого нужно показать, кто ты - мальчик или девочка.`)
	  .setColor("#2f3136")
	  
    let pingembed = new Discord.MessageEmbed()
      .setTitle("Получить роль для оповещений")
      .setDescription(`Всегда интересно узнать новости одним из первым? Тогда получи роль, чтобы тебе приходило уведомление!`)
	  .setColor("#2f3136")

	  message.delete()

let trow = new Discord.MessageActionRow().addComponents(red, orange, yellow, green, blue)
let trow_color_2 = new Discord.MessageActionRow().addComponents(purple, white, black)
let trow2 = new Discord.MessageActionRow().addComponents(boy, girl)
let trow3 = new Discord.MessageActionRow().addComponents(staffnews, news)
message.channel.send({ embeds: [infoembed], components: [trow], ephemeral: true})
message.channel.send({ embeds: [infoembed_2], components: [trow_color_2], ephemeral: true})
message.channel.send({ embeds: [genderembed], components: [trow2], ephemeral: true})
message.channel.send({ embeds: [pingembed], components: [trow3], ephemeral: true})

}

if(command == prefix + 'test') {
	const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Ничего не выбрано')
					.setMaxValues(1)
					.addOptions([
						{
							label: 'Выбери меня',
							description: 'Описание',
							value: 'first',
						},
						{
							label: 'Ты можешь выбрать меня тоже',
							description: 'Это тоже описание',
							value: 'second',
						},
					]),
			);
			message.channel.send({ content: "Тест", components: [row], ephemeral: true})
}

  if (command == prefix + 'send' || command == prefix + 'ticket') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
    let idd = randomstring.generate({ length: 20 })
    let args = message.content.split(' ').slice(1).join(' ');
    if (!args) args = `Тикет`

    let specialbtn = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Получить помощь')
    .setEmoji("👨‍💼")
    .setCustomId("ss")

    let prizebtn = new Discord.MessageButton()
    .setStyle(`SECONDARY`)
    .setLabel('Заявка на донат-роль')
    .setEmoji("🎁")
    .setCustomId("gc")
	
    let balance = new Discord.MessageButton()
    .setStyle(`SUCCESS`)
    .setLabel('Перенос баланса')
    .setCustomId("balance")

    let trow = new Discord.MessageActionRow().addComponents(specialbtn, prizebtn, balance)

    message.delete()
    
    let embed = new Discord.MessageEmbed()
      .setTitle(config.ticketembed.title)
      .setDescription(config.ticketembed.description)
      .setImage("https://media.discordapp.net/attachments/838848278858039336/993880891371823156/uwp357160.gif")
      .setThumbnail(message.guild.iconURL())
      .setColor("#2f3136")
      .setFooter(`${config.ticketembed.footer}`, message.guild.iconURL())
    let msg = await message.channel.send({ 
      embeds: [embed], 
      components: [trow] 
      })
  }
  
    if (command == prefix + 'noa') {
if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
	message.delete()
    let noanswer = new Discord.MessageButton()
    .setStyle(`DANGER`)
    .setLabel('Сейчас невозможно обратиться к персоналу')
    .setEmoji("👨‍💼")
    .setCustomId("noanswer")
	.setDisabled(true);

let trow = new Discord.MessageActionRow().addComponents(noanswer)

    let embed1 = new Discord.MessageEmbed()
      .setTitle(config.ticketembed.title)
      .setDescription(config.ticketembed.description)
      .setImage("https://media.discordapp.net/attachments/838848278858039336/993880891371823156/uwp357160.gif")
      .setThumbnail(message.guild.iconURL())
      .setColor("#2f3136")
      .setFooter(`${config.ticketembed.footer}`, message.guild.iconURL())
    let msg = await message.channel.send({ 
      embeds: [embed1], 
      components: [trow] 
      })
  }
  
  if (command == prefix + 'close') {
	  if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
	  message.channel.send({ content: "Обращение будет закрыто через 5 секунд..." })
	                   setTimeout(async () => {
              try {
                    message.channel.delete()
              } catch (e) {
                console.log(e)
                
              }
                  }, 4000)
  }
  
    if (command == prefix + 'verify') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
    
    let smth = new Discord.MessageButton()
    .setStyle(`SUCCESS`)
    .setLabel('Получить доступ к серверу')
    .setEmoji("<a:anim_yes:605779059905003520>")
    .setCustomId("verify")

    message.delete()
    let trow = new Discord.MessageActionRow().addComponents(smth)
	
    let embed = new Discord.MessageEmbed()
      .setTitle("Добро пожаловать на RaidMine")
      .setDescription("Приветствую тебя на дискорд сервере **RaidMine**. Ты находишься в начальном канале верификации.\nЧтобы пройти верификацию, тебе нужно нажать на кнопку внизу этого сообщения, и тогда ты получишь доступ к серверу.")
      .setImage("https://images-ext-2.discordapp.net/external/Jfxag0CnyRcTrYavSBJjgNn1spLAL2YZk7WB4BsruBU/https/pa1.narvii.com/6972/7727fe6a7c9952ada1580f228c3472f6782ea90fr1-500-281_hq.gif")
      .setThumbnail(message.guild.iconURL())
      .setColor("#2f3136")
    let msg = await message.channel.send({ 
      embeds: [embed], 
      components: [trow] 
      })
  }
  
      if (command == prefix + 'verifyticket') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: 'У Вас нет на это полномочий.' })
    
    let smth = new Discord.MessageButton()
    .setStyle(`SUCCESS`)
    .setLabel('Получить доступ к тикетам')
    .setEmoji("<a:anim_yes:605779059905003520>")
    .setCustomId("verifyticket")

    message.delete()
    let trow = new Discord.MessageActionRow().addComponents(smth)
	
    let embed = new Discord.MessageEmbed()
      .setTitle("Тикеты")
      .setDescription("Получить доступ к тикетам?")
      .setThumbnail(message.guild.iconURL())
      .setColor("#2f3136")
    let msg = await message.channel.send({ 
      embeds: [embed], 
      components: [trow] 
      })
  }
  

if (command == prefix + 'kiss') {
	var rand = [
        'https://i.imgur.com/i1PIph3.gif',
        'https://i.imgur.com/So3TIVK.gif',
        'https://i.imgur.com/q340AoA.gif',
        'https://i.imgur.com/SeCRpPp.gif'
    ];
	let gotGif = rand[Math.floor(Math.random() * rand.length)];
	const personTagged = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(" ") || 'просто любовь восторжествовала';
 
   if(!personTagged) {
        return message.reply({ 
          content: "Вы не указали пользователя!"
          })
    }
    
	   const action = new Discord.MessageEmbed()
    .setTitle('Тут кого-то поцеловали... 👀')
    .setDescription(`${message.author} поцеловал(-а) ${personTagged}.\n**Потому что** ${reason}.`)
    .setImage(gotGif)
	  .setColor("#2f3136")
    .setFooter('Любви все возрасты покорны...', message.author.avatarURL());
    message.channel.send({ 
      content: `<@${message.author.id}>, <@${personTagged.id}>`,
      embeds: [action]
      })
}

if (command == prefix + 'kill') {
	var rand = [
        'https://i.imgur.com/cBp3EsS.gif',
        'https://i.imgur.com/Tra6zBW.gif',
        'https://i.imgur.com/Y9FsSXa.gif',
        'https://i.imgur.com/7et8lYx.gif'
    ];
	let gotGif = rand[Math.floor(Math.random() * rand.length)];
	const personTagged = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(" ") || 'это была месть';
 
    if(!personTagged) {
      return message.reply({ 
        content: "Вы не указали пользователя!"
        })
  }
    
	   const action = new Discord.MessageEmbed()
    .setTitle('Убийство!')
    .setDescription(`${message.author} убил(-а) ${personTagged}.\n**Потому что** ${reason}.`)
    .setImage(gotGif)
	.setColor("#2f3136")
    .setFooter('Такое никто никогда не простит.', message.author.avatarURL());
    message.channel.send({ 
      content: `<@${message.author.id}>, <@${personTagged.id}>`,
      embeds: [action]
      })
	    
}
})
//ephemeral
client.on("interactionCreate", async (interaction) => {
if(!interaction.isButton()) return;

if (interaction.customId == `balance`) {
	
	  await interaction.reply({ content: `<a:Waiting:881247738208079932> Создаём заявку, ожидайте...`, ephemeral: true})
	  
	  
   interaction.guild.channels.create(interaction.user.id, {
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
          },
          {
            id: interaction.member.id,
            allow: [`VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          },
        ], parent: `1005769027383214090`, position: 1, topic: `Ожидание ответа...`, reason: "Открытие заявления"
      }).then(async channel => {
        channel = channel
	  
        await interaction.editReply(`
  **Заявление открыто!** Оно находится в канале <#${channel.id}>.`, true)
            
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Перенос баланса")
          .setColor("#2f3136")
          .setDescription("***Форма подачи:***\n1. Баланс на момент написания заявки\n(пропишите -bal в <#985897993569984552>)\n2. Скрин прописанной команды")
          
    channel.send({ 
      embeds: [embedticket], 
	  content: `<@335416744212693002>, <@${interaction.member.id}>`
      })   
	
})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// РОЛИ ////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const vip_ok = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle("<:anim_yes:1001788957912215612> Ваша заявка на донат-роль была проверена")
  .setColor("#2f3136")
  .setDescription(`Поздравляем, заявка одобрена и Вы получили роль **VIP**!\nЖелаем удачи и хорошего времяпровождения на сервере.`)
  
  const vipp_ok = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle("<:anim_yes:1001788957912215612> Ваша заявка на донат-роль была проверена")
  .setColor("#2f3136")
  .setDescription(`Поздравляем, заявка одобрена и Вы получили роль **VIP+**!\nЖелаем удачи и хорошего времяпровождения на сервере.`)
  
  const mvp_ok = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle("<:anim_yes:1001788957912215612> Ваша заявка на донат-роль была проверена")
  .setColor("#2f3136")
  .setDescription(`Поздравляем, заявка одобрена и Вы получили роль **MVP**!\nЖелаем удачи и хорошего времяпровождения на сервере.`)
  
  const mvpp_ok = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle("<:anim_yes:1001788957912215612> Ваша заявка на донат-роль была проверена")
  .setColor("#2f3136")
  .setDescription(`Поздравляем, заявка одобрена и Вы получили роль **MVP+**!\nЖелаем удачи и хорошего времяпровождения на сервере.`)
  
  const mvppp_ok = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle("<:anim_yes:1001788957912215612> Ваша заявка на донат-роль была проверена")
  .setColor("#2f3136")
  .setDescription(`Поздравляем, заявка одобрена и Вы получили роль **MVP++**!\nЖелаем удачи и хорошего времяпровождения на сервере.`)

if (interaction.customId == `red`) {
	if(interaction.member.roles.cache.has("997823246302982144")) {
	interaction.member.roles.remove('997823246302982144')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823246302982144')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `orange`) {
	if(interaction.member.roles.cache.has("997823286228557885")) {
	interaction.member.roles.remove('997823286228557885')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823286228557885')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `yellow`) {
	if(interaction.member.roles.cache.has("997823316213649408")) {
	interaction.member.roles.remove('997823316213649408')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823316213649408')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `green`) {
	if(interaction.member.roles.cache.has("997823326242213888")) {
	interaction.member.roles.remove('997823326242213888')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823326242213888')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `blue`) {
	if(interaction.member.roles.cache.has("997823339487825940")) {
	interaction.member.roles.remove('997823339487825940')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823339487825940')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `purple`) {
	if(interaction.member.roles.cache.has("998332082499620894")) {
	interaction.member.roles.remove('998332082499620894')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('998332082499620894')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `white`) {
	if(interaction.member.roles.cache.has("998332098479935539")) {
	interaction.member.roles.remove('998332098479935539')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('998332098479935539')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `black`) {
	if(interaction.member.roles.cache.has("998332108533682286")) {
	interaction.member.roles.remove('998332108533682286')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('998332108533682286')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `staffnews`) {
	if(interaction.member.roles.cache.has("997823442055352432")) {
	interaction.member.roles.remove('997823442055352432')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823442055352432')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `news`) {
	if(interaction.member.roles.cache.has("997823460371877928")) {
	interaction.member.roles.remove('997823460371877928')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	} else {
	interaction.member.roles.add('997823460371877928')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}

if (interaction.customId == `boy`) {
	
	if(interaction.member.roles.cache.has("997823386313035877")) {
		
	interaction.member.roles.remove('997823386313035877')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	
	} else {
	if (interaction.member.roles.cache.has("997823397671215215")) {

await interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас уже есть роль <@&997823397671215215>!`, ephemeral: true})

} else {
		interaction.member.roles.add('997823386313035877')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}
}

if (interaction.customId == `girl`) {
	
	if(interaction.member.roles.cache.has("997823397671215215")) {
		
	interaction.member.roles.remove('997823397671215215')
	await interaction.reply({ content: `<a:anim_no:605779090821218314> Роль успешно забрана.`, ephemeral: true})
	
	} else {
	if (interaction.member.roles.cache.has("997823386313035877")) {

await interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас уже есть роль <@&997823386313035877>!`, ephemeral: true})

} else {
		interaction.member.roles.add('997823397671215215')
	await interaction.reply({ content: `<a:anim_yes:605779059905003520> Роль успешно выдана!`, ephemeral: true})
}
}
}

		  let noa = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('Нет, не закрывать')
          .setCustomId(`no`)
		  .setEmoji(`<a:anim_no:605779090821218314>`)
	      let yesa = new Discord.MessageButton()
          .setStyle(`DANGER`)
          .setLabel('Да, закрыть')
          .setCustomId(`yes`)
		  .setEmoji(`<a:anim_yes:605779059905003520>`)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ТИКЕТЫ ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (interaction.customId == `noanswer`) {

interaction.reply({ content: `Discord допустил сбой, в следствие чего невозможно создать тикет. Подробнее: <#997488329174032414>.`, ephemeral: true })

}

if (interaction.customId == `notagree`) {
	
	interaction.reply(`Обратись в канал <#994326968470343750> после истечения наказания, либо же обратись к <@335416744212693002>, чтобы решить вопрос.`)
	
}

if (interaction.customId == `ss`) {
	
	  await interaction.reply({ content: `<a:Waiting:881247738208079932> Создаём тикет, ожидайте...`, ephemeral: true})
	  
	  
   interaction.guild.channels.create(interaction.user.id, {
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
          },
		  {
            id: "997228895394877540",
            allow: ['VIEW_CHANNEL'],
			deny: ['SEND_MESSAGES'],
          },
          {
            id: interaction.member.id,
            allow: [`VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          },
        ], parent: `997229030820565073`, position: 1, topic: `Ожидание модератора...`, reason: "Открытие тикета"
      }).then(async channel => {
        channel = channel
        
          let claim = new Discord.MessageButton()
    .setStyle(`SUCCESS`)
    .setLabel('Взять обращение')
    .setEmoji("<a:anim_yes:605779059905003520>")
    .setCustomId("claimticket")
	
	    let remove = new Discord.MessageButton()
    .setStyle(`DANGER`)
    .setLabel('Закрыть обращение')
    .setEmoji("<a:anim_no:605779090821218314>")
    .setCustomId("closeticket")
	  


	  
	  
        await interaction.editReply(`
  **Тикет успешно открыт!** Ваше обращение находится в канале <#${channel.id}>.`, true)
            
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Обращение")
          .setColor("#2f3136")
          .setDescription(`Пожалуйста, напишите свой вопрос и ожидайте ответ от модерации.`)
          
	      let trow = new Discord.MessageActionRow().addComponents(claim, remove)
    channel.send({ 
      embeds: [embedticket], 
      components: [trow],
	  content: `<@&997228895394877540>, <@${interaction.member.id}>`
      })   
	
})
}

////

if (interaction.customId == `gc`) {
		
		  await interaction.reply({ content: `<a:Waiting:881247738208079932> Создаём заявку, ожидайте...`, ephemeral: true})

   interaction.guild.channels.create(interaction.user.id, {
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      },
  {
        id: "997228895394877540",
        allow: ['VIEW_CHANNEL'],
	    deny: ['SEND_MESSAGES'],
      },
      {
        id: interaction.member.id,
        allow: [`VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
      },
	  {
        id: "335416744212693002",
        allow: [`VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
      },
    ], parent: `1001967290335645708`, position: 1, topic: `Ожидание модератора...`, reason: "Открытие тикета"
      }).then(async channel => {
        channel = channel
        
        let give = new Discord.MessageButton()
          .setStyle(`SUCCESS`)
          .setLabel('Взять обращение')
          .setCustomId(`gv_pre`)
		  .setEmoji(`<a:anim_yes:605779059905003520>`)
	       let del = new Discord.MessageButton()
          .setStyle(`DANGER`)
          .setLabel('Удалить канал')
          .setCustomId(`deleteroleticket`)
		  .setEmoji(`<a:anim_no:605779090821218314>`)
      
        await interaction.editReply(`
  **Заявка успешно открыта!** Форма находится в канале <#${channel.id}>.`, true)
            
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Заявка на донат-роль")
          .setColor("#2f3136")
          .setDescription(`**Форма подачи заявки на получение донат-роли:**\n1. Ваш игровой никнейм.
2. Ваша привилегия.
3. Полный скриншот, где сбоку видна ваша статистика и соответственно привилегия, а также сообщение в чате, в котором указано ваше имя и тэг в Discord.

**Пример:**
1. Danielouse
2. MVP++
3. Скрин!`)

    channel.send({ 
      embeds: [embedticket], 
      components: [new Discord.MessageActionRow().addComponents(give, del)],
	  content: `<@&997228895394877540>, <@${interaction.member.id}>`
      })    
        })
}
	

	
	if (interaction.customId == `gv_pre`) {
		
		   let therole = new Discord.MessageButton()
          .setStyle(`SUCCESS`)
          .setLabel('Выдать донатную роль')
          .setCustomId(`gv`)
		  .setEmoji(`<a:anim_yes:605779059905003520>`)
	       let delthe = new Discord.MessageButton()
          .setStyle(`DANGER`)
          .setLabel('Удалить канал, форма не отправлена/участник ошибся')
          .setCustomId(`deleteroleticket`)
		  .setEmoji(`<a:anim_no:605779090821218314>`)
		
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
interaction.channel.permissionOverwrites.edit(interaction.user.id, { READ_MESSAGE_HISTORY: true, ATTACH_FILES: true, SEND_MESSAGES: true });
interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });

interaction.channel.setTopic(`${interaction.member.id}`)

interaction.update({ components: [new Discord.MessageActionRow().addComponents(therole, delthe)] })

interaction.channel.send({ content: `Ваш саппорт — <@${interaction.user.id}>. Удачи!` })
			} else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
	}
	
if (interaction.customId == `gv`) {
	
if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
	if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {

	    let donate1 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('VIP')
          .setCustomId(`vip`)
	    let donate2 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('VIP+')
          .setCustomId(`vipp`)
		let donate3 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP')
          .setCustomId(`mvp`)
		let donate4 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP+')
          .setCustomId(`mvpp`)
		let donate5 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP++')
          .setCustomId(`mvppp`)

await interaction.update({ content: `**Выберите донат...**`, components: [new Discord.MessageActionRow().addComponents(donate1, donate2, donate3, donate4, donate5)], content: `🟠 Саппорт уже работает над выдачей роли, ожидайте!`, embeds: [] })
	} else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}
			if (interaction.customId == `vip`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {

if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
let row = new Discord.MessageActionRow().addComponents(noa, yesa)	
	let intuse = interaction.guild.members.cache.get(interaction.channel.name)
	if(intuse.roles.cache.has("985800651978199071")) {
		intuse.roles.remove('985800651978199071')
		intuse.roles.remove('994352621005578322')
  interaction.reply({ content: `Так как **у пользователя уже была донат-роль VIP**, роль **VIP** была снята! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
	} else {
	intuse.roles.add('985800651978199071')
	intuse.roles.add('994352621005578322')
  interaction.reply({ content: `Роль **VIP** выдана! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
 intuse.send({ embeds: [vip_ok] })
 }
 
 } else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}

			if (interaction.customId == `vipp`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
let row = new Discord.MessageActionRow().addComponents(noa, yesa)	
	let intuse = interaction.guild.members.cache.get(interaction.channel.name)
	if(intuse.roles.cache.has("985800550383759400")) {
		intuse.roles.remove('985800550383759400')
		intuse.roles.remove('994352621005578322')
  interaction.reply({ content: `Так как **у пользователя уже была донат-роль VIP+**, роль **VIP+** была снята! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
	} else {
	intuse.roles.add('985800550383759400')
	intuse.roles.add('994352621005578322')
  interaction.reply({ content: `Роль **VIP+** выдана! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
  intuse.send({ embeds: [vipp_ok] })
 }
  } else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}

			if (interaction.customId == `mvp`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
let row = new Discord.MessageActionRow().addComponents(noa, yesa)	
	let intuse = interaction.guild.members.cache.get(interaction.channel.name)
	if(intuse.roles.cache.has("985800534650925066")) {
		intuse.roles.remove('985800534650925066')
		intuse.roles.remove('994352621005578322')
  interaction.reply({ content: `Так как **у пользователя уже была донат-роль MVP**, роль **MVP** была снята! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
	} else {
	intuse.roles.add('985800534650925066')
	intuse.roles.add('994352621005578322')
  interaction.reply({ content: `Роль **MVP** выдана! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
  intuse.send({ embeds: [mvp_ok] })
 }
  } else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}

			if (interaction.customId == `mvpp`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
let row = new Discord.MessageActionRow().addComponents(noa, yesa)	
	let intuse = interaction.guild.members.cache.get(interaction.channel.name)
	if(intuse.roles.cache.has("985800518578360322")) {
		intuse.roles.remove('985800518578360322')
		intuse.roles.remove('994352621005578322')
  interaction.reply({ content: `Так как **у пользователя уже была донат-роль MVP+**, роль **MVP+** была снята! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
	} else {
	intuse.roles.add('985800518578360322')
	intuse.roles.add('994352621005578322')
  interaction.reply({ content: `Роль **MVP+** выдана! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
  intuse.send({ embeds: [mvpp_ok] })
 }
  } else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}

			if (interaction.customId == `mvppp`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
if(interaction.user.id !== interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Не Вы взяли обращение!`, ephemeral: true})
let row = new Discord.MessageActionRow().addComponents(noa, yesa)	
	let intuse = interaction.guild.members.cache.get(interaction.channel.name)
	if(intuse.roles.cache.has("985800470729719868")) {
		intuse.roles.remove('985800470729719868')
		intuse.roles.remove('994352621005578322')
  interaction.reply({ content: `Так как **у пользователя уже была донат-роль MVP++**, роль **MVP++** была снята! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
	} else {
	intuse.roles.add('985800470729719868')
	intuse.roles.add('994352621005578322')
  interaction.reply({ content: `Роль **MVP++** выдана! Закрыть канал? Если нет - нажмите тогда, когда это будет нужно.`, components: [row], ephemeral: true}) 
  intuse.send({ embeds: [mvppp_ok] })
 }
  } else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
}
		
		 if (interaction.customId == `yes`) {
let intuse = interaction.guild.members.cache.get(interaction.channel.name)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`<:anim_yes:1001788957912215612> Закрытие заявки на донат-роль`)
  .setDescription(`**Саппорт:** <@${interaction.member.id}>\nВызвал обращение: ${intuse}`)
  .setColor(`#2f3136`)
			 
const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
channel.send({ embeds: [theembed], ephemeral: false}) 
			 
  const closemebed = new Discord.MessageEmbed()
                .setDescription(`Обращение будет закрыто через 5 секунд...`)
                .setColor(`#2f3136`)
              interaction.channel.send({ embeds: [closemebed], content: `Обращение закрыто.` })

                 setTimeout(async () => {
              try {
                    interaction.channel.delete()
              } catch (e) {
                interaction.editReply({ content: `Произошла ошибка!`, ephemeral: true})
                console.log(e)
                
              }
                  }, 4000)
}

		 if (interaction.customId == `no`) {
              	    let donate1 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('VIP')
          .setCustomId(`vip`)
	    let donate2 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('VIP+')
          .setCustomId(`vipp`)
		let donate3 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP')
          .setCustomId(`mvp`)
		let donate4 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP+')
          .setCustomId(`mvpp`)
		let donate5 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('MVP++')
          .setCustomId(`mvppp`)

interaction.reply({ content: `**Выберите донат...**`, components: [new Discord.MessageActionRow().addComponents(donate1, donate2, donate3, donate4, donate5)], embeds: [], ephemeral: true})
}
	
if (interaction.customId == `claimticket`) {
		
	let claim = new Discord.MessageButton()
    .setStyle(`SUCCESS`)
    .setLabel('Взять обращение')
    .setEmoji("<a:anim_yes:605779059905003520>")
    .setCustomId("claimticket")
	.setDisabled(true);
	
	    let remove = new Discord.MessageButton()
    .setStyle(`DANGER`)
    .setLabel('Закрыть обращение')
    .setEmoji("<a:anim_no:605779090821218314>")
    .setCustomId("closeticket")
let row = new Discord.MessageActionRow().addComponents(claim, remove)	

if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {

interaction.channel.permissionOverwrites.edit(interaction.user.id, { READ_MESSAGE_HISTORY: true, ATTACH_FILES: true, SEND_MESSAGES: true });
interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });

interaction.channel.setTopic(`${interaction.member.id}`)

interaction.update({ components: [row] })
interaction.channel.send({ content: `Ваш саппорт — <@${interaction.user.id}>. Удачи!` })
//interaction.reply({ content: `<a:anim_yes:605779059905003520> Обращение успешно взято! Приятного разговора.`, ephemeral: true}) 	

} else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}

}
	
	if (interaction.customId == `closeticket`) {
if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
interaction.reply({ content: `Можете быть свободны! Обращение закроется само по себе, если участник сам не ответит на сообщение. Удачи!`, ephemeral: true}) 


	     let st2 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('2')
          .setCustomId(`stars2`)
		  .setEmoji(`⭐`)

	     let st3 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('3')
          .setCustomId(`stars3`)
		  .setEmoji(`⭐`)
		  
	     let st4 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('4')
          .setCustomId(`stars4`)
		  .setEmoji(`⭐`)
		  
	     let st5 = new Discord.MessageButton()
          .setStyle(`SECONDARY`)
          .setLabel('5')
          .setCustomId(`stars5`)
		  .setEmoji(`⭐`)

	      let close = new Discord.MessageButton()
          .setStyle(`DANGER`)
          .setLabel('Не хочу оценивать, закройте тикет')
          .setCustomId(`deleteticket_player`)
		  .setEmoji(`<a:anim_no:605779090821218314>`)

          let row = new Discord.MessageActionRow().addComponents(st2, st3, st4, st5, close)

let intuse = interaction.guild.members.cache.get(interaction.channel.name)

  const theembed = new Discord.MessageEmbed()
  .setTitle(`⭐ Оценка работы персонала Discord ⭐`)
  .setDescription(`${intuse}, спасибо, что связались с нами. Нам важна оценка сотрудника(-ов), который(-ые) помог(-ли) Вам в решении вопроса. Можете, пожалуйста, оценить работу персонала, по нажатию кнопки ниже?\n***Внимание! Канал будет удалён автоматически, если вы не нажмёте на кнопку.***`)
  .setColor(`#2f3136`)

interaction.channel.send({ embeds: [theembed], components: [row], content: `${intuse}`, ephemeral: false}) 

} else {
 interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет на это прав.`, ephemeral: true})
}
		
	}
	
		if (interaction.customId == `stars2`) {
		const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
if(interaction.user.id === interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Только игрок может оценить **твою** работу!`, ephemeral: true})
	
if(interaction.channel.name === interaction.user.id) {

interaction.channel.send({ content: `**Вы оценили работу сотрудника(-ов) на 2⭐**. Обращение закрыто! Спасибо ещё раз, что связались с нами. Удаляем канал...`, ephemeral: false}) 
let intuse = interaction.guild.members.cache.get(interaction.channel.name)
let moder = interaction.guild.members.cache.get(interaction.channel.topic)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`⭐ Оценка работы персонала Discord`)
  .setDescription(`**Модератор:** ${moder}\n${intuse} оценил обращение на **2⭐**.\nСлишком плохо. Надеемся, вы исправитесь.`)
  .setColor(`#2f3136`)
  
channel.send({ embeds: [theembed], ephemeral: false}) 

                 setTimeout(async () => {
              try {
				  
                    interaction.channel.delete()
					
              } catch (e) {
                 interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                console.log(e)
                
              }
                  }, 4000)
		
	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> Вы не можете оценить работу коллеги.`, ephemeral: true})
	}
		}
	
			if (interaction.customId == `stars3`) {
		const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
if(interaction.user.id === interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Только игрок может оценить **твою** работу!`, ephemeral: true})
	
if(interaction.channel.name === interaction.user.id) {
interaction.channel.send({ content: `**Вы оценили работу сотрудника(-ов) на 3⭐**. Обращение закрыто! Спасибо ещё раз, что связались с нами. Удаляем канал...`, ephemeral: false}) 
let intuse = interaction.guild.members.cache.get(interaction.channel.name)
let moder = interaction.guild.members.cache.get(interaction.channel.topic)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`⭐ Оценка работы персонала Discord`)
  .setDescription(`**Модератор:** ${moder}\n${intuse} оценил обращение на **3⭐**.\n Неудовлетворительно. Надеемся, вы исправитесь.`)
  .setColor(`#2f3136`)
  
channel.send({ embeds: [theembed], ephemeral: false}) 

                 setTimeout(async () => {
              try {
				  
                    interaction.channel.delete()
					
              } catch (e) {
                 interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                console.log(e)
                
              }
                  }, 4000)
		
	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> Вы не можете оценить работу коллеги.`, ephemeral: true})
	}
			}
	
				if (interaction.customId == `stars4`) {
		const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
if(interaction.user.id === interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Только игрок может оценить **твою** работу!`, ephemeral: true})
	
if(interaction.channel.name === interaction.user.id) {
interaction.channel.send({ content: `**Вы оценили работу сотрудника(-ов) на 4⭐**. Обращение закрыто! Спасибо ещё раз, что связались с нами. Удаляем канал...`, ephemeral: false}) 
let intuse = interaction.guild.members.cache.get(interaction.channel.name)
let moder = interaction.guild.members.cache.get(interaction.channel.topic)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`⭐ Оценка работы персонала Discord`)
  .setDescription(`**Модератор:** ${moder}\n${intuse} оценил обращение на **4⭐**.\nЭто хорошо! Продолжайте в том же духе!`)
  .setColor(`#2f3136`)
  
channel.send({ embeds: [theembed], ephemeral: false}) 

                 setTimeout(async () => {
              try {
				  
                    interaction.channel.delete()
					
              } catch (e) {
                 interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                console.log(e)
                
              }
                  }, 4000)
		
	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> Вы не можете оценить работу коллеги.`, ephemeral: true})
	}
				}
	
					if (interaction.customId == `stars5`) {
		const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
if(interaction.user.id === interaction.channel.topic) return interaction.reply({ content: `<a:anim_no:605779090821218314> Только игрок может оценить **твою** работу!`, ephemeral: true})
	
if(interaction.channel.name === interaction.user.id) {
interaction.channel.send({ content: `**Вы оценили работу сотрудника(-ов) на 5⭐**. Обращение закрыто! Спасибо ещё раз, что связались с нами. Удаляем канал...`, ephemeral: false}) 

let intuse = interaction.guild.members.cache.get(interaction.channel.name)
let moder = interaction.guild.members.cache.get(interaction.channel.topic)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`⭐ Оценка работы персонала Discord`)
  .setDescription(`**Модератор:** ${moder}\n${intuse} оценил обращение на **5⭐**.\nОтлично! Вы молодцы!`)
  .setColor(`#2f3136`)
  
channel.send({ embeds: [theembed], ephemeral: false}) 

                 setTimeout(async () => {
              try {
				  
                    interaction.channel.delete()
					
              } catch (e) {
                 interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                console.log(e)
                
              }
                  }, 4000)
		
	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> Вы не можете оценить работу коллеги.`, ephemeral: true})
	}
					}
	
	if (interaction.customId == `deleteticket_player`) {
		if(interaction.channel.name === interaction.user.id) {
			const channel = interaction.guild.channels.cache.find(ch => ch.name === '┊︰🌏・оценки-тикеты'); 
			let intuse = interaction.guild.members.cache.get(interaction.channel.name)
let moder = interaction.guild.members.cache.get(interaction.channel.topic)
  const theembed = new Discord.MessageEmbed()
  .setTitle(`Закрытие обращения`)
  .setDescription(`**Модератор:** ${moder}\n${intuse} **не захотел оценивать работу персонала**.`)
  .setColor(`#2f3136`)
			
channel.send({ embeds: [theembed], ephemeral: false}) 
			
interaction.channel.send({ content: `Обращение закрыто! Спасибо ещё раз, что связались с нами. Удаляем канал...`, ephemeral: false}) 

                 setTimeout(async () => {
              try {
				  
                    interaction.channel.delete()
					
              } catch (e) {
                 interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                console.log(e)
                
              }
                  }, 4000)
		
	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> Только игрок может закрыть обращение.`, ephemeral: true})
	}
	}
		

if (interaction.customId == `deleteroleticket`) {
	  if(interaction.member.roles.cache.has("997228895394877540") || interaction.member.roles.cache.has("1002278009681739906")) {
  interaction.reply({ content: `Удаляю канал через 5 секунд...`, ephemeral: true}) 
  interaction.channel.send({ content: `Обращение закрыто! Спасибо, что связались с нами. Удаляем канал...`, ephemeral: false}) 
  
                   setTimeout(async () => {
                try {
            
                      interaction.channel.delete()
            
                } catch (e) {
                   interaction.reply({ content: `Произошла ошибка!`, ephemeral: true}) 
                  console.log(e)
                  
                }
                    }, 4000)
	  
  	} else {
		interaction.reply({ content: `<a:anim_no:605779090821218314> У Вас нет прав.`, ephemeral: true})
	}
}
		
				 if (interaction.customId == `verify`) {
interaction.member.roles.add('967832979793653833')
interaction.member.roles.add('789528389740527656')
interaction.member.roles.remove('995013040971989152')
 interaction.reply({ content: `Добро пожаловать!`, ephemeral: true}) 
}

if (interaction.customId == `verifyticket`) {
	if(!interaction.member.roles.cache.has("997228895394877540")) {
	interaction.member.roles.add('997228895394877540')
	await interaction.reply({ content: `<a:Yes_Check:877264845504917565> Готово, доступ к тикетам получен`, ephemeral: true})
	} else {
	interaction.member.roles.remove('997228895394877540')
	await interaction.reply({ content: `<a:No_Check:877264845366517770> Доступ к тикетам забран`, ephemeral: true})
}
}

});

  client.login("токен")