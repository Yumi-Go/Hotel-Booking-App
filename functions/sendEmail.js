const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: functions.config().email.user,
        pass: functions.config().email.password
    }
});

exports.sendBookingConfirmation = functions.https.onCall(async (data, context) => {
    try {
        const {
            email,
            bookingDetails,
            hotelName,
            checkInDate,
            checkOutDate,
            guestName,
            roomType,
            numberOfGuests
        } = data;

        const mailOptions = {
            from: functions.config().email.user,
            to: email,
            subject: "Booking Confirmation - Your Hotel Reservation",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50;">Booking Confirmation</h2>
                    <p>Dear ${guestName},</p>
                    <p>Thank you for choosing ${hotelName}. Your booking has been confirmed!</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #2c3e50;">Booking Details</h3>
                        <p><strong>Booking Reference:</strong> ${bookingDetails.id}</p>
                        <p><strong>Hotel:</strong> ${hotelName}</p>
                        <p><strong>Check-in:</strong> ${checkInDate}</p>
                        <p><strong>Check-out:</strong> ${checkOutDate}</p>
                        <p><strong>Room Type:</strong> ${roomType}</p>
                        <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
                    </div>

                    <p>If you have any questions or need to modify your booking, please contact our customer service.</p>
                    
                    <p>Best regards,<br>${hotelName} Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new functions.https.HttpsError("internal", "Error sending email", error);
    }
}); 