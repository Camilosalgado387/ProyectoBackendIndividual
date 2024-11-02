import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type UserType = {
    name: string
    email: string
    password: string
    isActive: boolean
    reservations: {
        bookName: string
        reservedAt: Date
        returnAt: Date
    }[];
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    reservations: [{
        bookName: {
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
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
