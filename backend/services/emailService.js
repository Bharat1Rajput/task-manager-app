const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const User = require('../models/user')

// create an email transporter

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS

    }   
});


// define the email sending function

 const sendEmailReminder = async (email, task)=>{
    const user = await User.findOne({email: email});
const emailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: `Task Reminder: ${task.title}`,
    text: `Dear ${user.name}

This is a friendly reminder to complete your task "${task.title}" before the deadline ${task.dueDate.toLocaleDateString('en-GB')}.

🔹 Task: ${task.title}
🔹 Priority: ${task.priority}
🔹 Due Date: ${task.dueDate.toLocaleDateString('en-GB')}

Please ensure the task is completed on time to avoid any delays. If you need any assistance, feel free to reach out.

Let’s get this done! ✅

Best regards,
Task Manager Pro By Bharat
taskmanagerpro@gmail.com `
};



try { await transporter.sendMail(emailOptions);
    console.log(`Email sent to ${email}`)
    } catch (error) {
        console.log(`Error sending email: ${error.message}`)
    }
}



module.exports = sendEmailReminder;