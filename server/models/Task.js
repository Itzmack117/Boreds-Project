import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema(
    {
        body: { type: String, required: true },
        creatorEmail: { type: String, required: true },
    }
)

const Task = new Schema(
    {
        title: { type: String, required: true },
        creatorEmail: { type: String, required: true },
        listId: { type: ObjectId, ref: 'Board', required: true },

        comments: [commentSchema]

    },

    { timestamps: true, toJSON: { virtuals: true } }
);

export default Task;
