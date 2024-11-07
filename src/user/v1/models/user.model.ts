import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
// DECLARE MODEL TYPE
type UserType = {
    name: string
    email: string
    password: string
    isActive: boolean
    canCreate: boolean
    canDelete: boolean
    canEdit: boolean
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
    canCreate: {
        type: Boolean,
        default: false
    },
    canDelete: {
        type: Boolean,
        default: false
    },
    canEdit: {
        type: Boolean,
        default: false
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
