const cron = require('node-cron')
const sendEmailReminder = require('../services/emailService');
const User = require('../models/user');

const Task = require('../models/taskModels')

// cron.schedule('* * * * *', async () => {
//     console.log("running schedule task reminder");

//     try{

//         const tasks = await Task.findById('67c936defdf1675175b44bfc');

//         console.log(`task found and the title is ${tasks.title} `);
        
//         const user = await User.findById(tasks.user);

//         console.log(`the user email is ${user.email} `)
//         await sendEmailReminder(user.email,tasks);
//         console.log(`email sent successfully to ${user.email}`);
//         console.log("teri email check kar ");
// }
// catch(err){
//     console.log(err);
// }

