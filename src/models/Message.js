import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String , required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Users' }
}, { timestamps: true });

let Message = mongoose.model("Messages", chatSchema);
export default Message;