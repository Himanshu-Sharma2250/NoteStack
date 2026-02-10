import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['Pending', 'InProgress', 'Done'],
            default: 'Pending'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Low'
        }
    },
    {timestamps: true}
)

export const Note = mongoose.model("Note", noteSchema);