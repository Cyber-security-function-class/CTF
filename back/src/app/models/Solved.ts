import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, AllowNull, AutoIncrement, BelongsTo} from 'sequelize-typescript'
import { User } from './User'
import { Challenge } from './Challenge'
import belongsTo from 'sequelize/types/lib/associations/belongs-to'

@Table
export class Solved extends Model<Solved> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number

    @AllowNull(false)
    @Column
    score : number
    
    @BelongsTo(() => Challenge)
    challenge : Challenge

    @ForeignKey(() =>Challenge)
    @AllowNull(false)
    @Column
    challengeId : number

    @BelongsTo(() => User)
    user : User
    
    @ForeignKey(() =>User)
    @AllowNull(false)
    @Column
    userId : string // uuid

    @AllowNull(false)
    @Column
    teamId : string // uuid
}