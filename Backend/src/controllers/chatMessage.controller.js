// controllers/chatController.js
import asyncHandler from "../utils/asyncHandler.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { sender, receiver, contentType } = req.body;
  let content;

  if (contentType === "Image" || contentType === "Video") {
    const filePath = req.file.path;
    const uploadedFile = await uploadOnCloudinary(filePath);
    content = uploadedFile.secure_url;
  } else {
    content = req.body.content;
  }

  const message = new Message({ sender, receiver, contentType, content });
  await message.save();

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: message._id }, lastMessageAt: Date.now() },
    { new: true }
  );

  res.status(200).json(message);
});

// Create chat
export const createChat = asyncHandler(async (req, res) => {
  const { participants } = req.body;
  const chat = new Chat({ participants });
  await chat.save();
  res.status(201).json(chat);
});
