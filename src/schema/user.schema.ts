import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {

    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ optional: true })
    password: string;

    @Prop( {default: 'LOCAL'} )
    authType: string;

}

export const UserSchema = SchemaFactory.createForClass(User);