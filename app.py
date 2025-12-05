from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from threading import Thread

load_dotenv()

app = Flask(__name__, static_url_path='/static', static_folder='static')

# Email Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "your-email@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "your-app-password")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "your-email@gmail.com")


@app.route("/")
def home():
    return render_template("index.html")


def send_email_async(name, email, subject, message):
    """Send email in background thread to prevent timeout"""
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

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"Email sent from {name} ({email})")
    except Exception as e:
        print(f"Error sending email: {e}")


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

    # Send email asynchronously to prevent timeout
    thread = Thread(target=send_email_async, args=(name, email, subject, message))
    thread.daemon = True
    thread.start()

    return jsonify(
        {
            "success": True,
            "message": "Thank you for your message! I will get back to you soon.",
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
