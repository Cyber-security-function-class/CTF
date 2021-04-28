import { Table, Column, Model, HasMany, PrimaryKey, DataType, BelongsTo, HasOne, IsUUID, Unique, AllowNull, IsEmail, Default, ForeignKey } from 'sequelize-typescript'
import { Solved } from './Solved'
import { Team } from './Team'
import { EmailVerified } from './EmailVerified'
@Table
export class User extends Model<User> {
    
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    id: string

    @Unique
    @AllowNull(false)
    @Column
    nickname: string

    
    @AllowNull(false)
    @Column
    password : string

    
    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    email : string
    
    @HasOne(() => EmailVerified)
    emailVerified : EmailVerified
    
    @BelongsTo(() => Team)
    team : Team
    
    @ForeignKey(() => Team)
    @Default(null)
    @Column
    teamId : string

    
    @Default(false)
    @Column
    isAdmin : boolean

    @HasMany(()=>Solved)
    solveds: Solved[]
    

}