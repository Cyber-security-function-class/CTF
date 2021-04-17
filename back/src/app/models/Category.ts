'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";


export interface CategoryAttributes {
    id?: number
    category : string
    createdAt?: Date
    updatedAt?: Date
}
export interface CategoryModel extends Model<CategoryAttributes>, CategoryAttributes {}
export class Category extends Model<CategoryModel, CategoryAttributes> {
    
}

export type CategoryStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CategoryModel
};

// Category.hasOne(Project, {     // model category 와 hasMany
//     sourceKey: "id",
//     foreignKey: "category",
//     as: "projects", // this determines the name in `associations`!
// });

export function CategoryFactory (sequelize: Sequelize): CategoryStatic {
    return <CategoryStatic>sequelize.define("category", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category : {
            type : DataTypes.STRING,
            primaryKey: true,
        }
    });
}