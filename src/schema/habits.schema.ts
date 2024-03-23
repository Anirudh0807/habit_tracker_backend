import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

@Schema({
    timestamps: true
})
export class Habit {

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    emoji: string;

    @Prop()
    days: string[];

    @Prop()
    doOrDont: boolean;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);