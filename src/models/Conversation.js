import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({  
  participants: [{ type: Schema.Types.ObjectId, ref: 'Users'}],
});

let Conversation = mongoose.model('Conversations', ConversationSchema);
export default Conversation;