import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type bookType = {
    title: string
    author: string
    genre: string
    publisher: boolean
    publishedDate: Date
    isAvailable: boolean
    isActive: boolean
    reservations: {
        userName: string
        reservedAt: Date
        returnAt: Date
    }[];

};

// DECLARE MONGOOSE SCHEMA
const bookSchema = new Schema<bookType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: Boolean,
        default: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    reservations: [{
        userName: {
            type: String,
            required: true
        },
        reservedAt: {
            type: Date,
            required: true
        },
        returnAt: {
            type: Date,
            required: true
        }
    }]
    
}, {
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const bookModel = model<bookType>("book", bookSchema);

// EXPORT ALL
export { bookModel, bookSchema, bookType };
