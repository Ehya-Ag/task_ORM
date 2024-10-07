import {sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
const Task = sequelize.define("tasks", {
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   start_date: {
    type: DataTypes.DATEONLY,
   },
   end_date: {
     type: DataTypes.DATEONLY,
   }
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
sequelize.sync().then(() => {
   console.log('Task table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
export {Task};