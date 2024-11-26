import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendConfirmationEmail(userEmail) {
    const msg = {
        to: userEmail,
        from: 'n.rowczenio1@nhs.net', // Replace with your verified sender email on SendGrid
        subject: 'Confirmation of Attendance',
        html: '<strong>Here is your confirmation of attendance.</strong>',
    };

    try {
        await sgMail.send(msg);
        console.log(`Confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error(`Error sending email: ${error.toString()}`);
        throw new Error('Failed to send email');
    }
}
