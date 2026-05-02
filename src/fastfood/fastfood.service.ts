import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TelegramBot = require('node-telegram-bot-api');
import { Fastfood, BotUser } from './entities/fastfood.entity';

@Injectable()
export class FastfoodService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    @InjectModel(Fastfood.name) private fastfoodModel: Model<Fastfood>,
    @InjectModel(BotUser.name) private userModel: Model<BotUser>,
  ) {}

  onModuleInit() {
    this.bot = new (TelegramBot as any)(process.env.BOT_TOKEN, { polling: true });
    this.botHandler();
  }

  async botHandler() {
    this.bot.on('message', async (msg: TelegramBot.Message) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (text === '/start') {
        let user = await this.userModel.findOne({ chatId });
        if (!user) {
          await this.userModel.create({
            chatId,
            name: msg.from?.first_name || 'Mijoz', 
          });
        }
        return this.askPhone(chatId);
      }

      if (text && ['Ichimliklar', 'Yeguliklar', 'Shirinliklar'].includes(text)) {
        const products = await this.fastfoodModel.find({ category: text });
        if (products.length === 0) {
          return this.bot.sendMessage(chatId, "Hozircha mahsulot yo'q.");
        }

        for (const prod of products) {
          await this.bot.sendPhoto(chatId, prod.image, {
            caption: ` **${prod.name}**\n Narxi: ${prod.price} so'm\n Tarkibi: ${prod.description}`,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: " Buyurtma berish", callback_data: `order_${prod._id}` }]
              ]
            }
          });
        }
      }
    });

    this.bot.on('contact', async (msg: TelegramBot.Message) => {
      if (msg.contact) {
        await this.userModel.updateOne({ chatId: msg.chat.id }, { phone: msg.contact.phone_number });
        this.askLocation(msg.chat.id);
      }
    });

    this.bot.on('location', async (msg: TelegramBot.Message) => {
      if (msg.location) {
        await this.userModel.updateOne({ chatId: msg.chat.id }, { location: msg.location });
        this.showMainMenu(msg.chat.id);
      }
    });
  }

  async askPhone(chatId: number) {
    await this.bot.sendMessage(chatId, "Botdan foydalanish uchun telefon raqamingizni yuboring:", {
      reply_markup: {
        keyboard: [[{ text: "Raqamni yuborish", request_contact: true }]],
        resize_keyboard: true, 
        one_time_keyboard: true
      }
    });
  }

  async askLocation(chatId: number) {
    await this.bot.sendMessage(chatId, "Endi yetkazib berish manzilingizni yuboring:", {
      reply_markup: {
        keyboard: [[{ text: " Lokatsiyani yuborish", request_location: true }]],
        resize_keyboard: true, 
        one_time_keyboard: true
      }
    });
  }

  async showMainMenu(chatId: number) {
    await this.bot.sendMessage(chatId, "Menyuni tanlang:", {
      reply_markup: {
        keyboard: [
          [{ text: "Ichimliklar" }, { text: "Yeguliklar" }],
          [{ text: "Shirinliklar" }]
        ],
        resize_keyboard: true
      }
    });
  }
}