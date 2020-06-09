import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Task = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        creatorEmail: { type: String, required: true },
        listId: { type: ObjectId, ref: 'Board', required: true }
    },

    { timestamps: true, toJSON: { virtuals: true } }
);

export default Value;
