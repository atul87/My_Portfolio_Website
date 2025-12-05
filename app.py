from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Email Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = "atulverma15704@gmail.com"  # Replace with your Gmail
SENDER_PASSWORD = "bkpu fqbc xblx jwvo"  # Replace with Gmail App Password
RECEIVER_EMAIL = "atulverma15704@gmail.com"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/contact", methods=["POST"])
def handle_contact():
    if not request.is_json:
        return jsonify({"success": False, "message": "Invalid request"}), 400

    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not all([name, email, subject, message]):
        return jsonify({"success": False, "message": "Please fill in all fields."}), 400

    if len(message) < 10:
        return (
            jsonify(
                {"success": False, "message": "Message must be at least 10 characters."}
            ),
            400,
        )

    # Send Email
    try:
        msg = MIMEMultipart()
        msg["From"] = SENDER_EMAIL
        msg["To"] = RECEIVER_EMAIL
        msg["Subject"] = f"Portfolio Contact: {subject}"

        body = f"""
        New message from your portfolio:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        """

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"Email sent from {name} ({email})")

        return jsonify(
            {
                "success": True,
                "message": "Thank you for your message! I will get back to you soon.",
            }
        )
    except Exception as e:
        print(f"Error sending email: {e}")
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Failed to send message. Please try again.",
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(debug=True)
