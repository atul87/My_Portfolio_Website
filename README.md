# ATUL - Portfolio Website

A modern, responsive portfolio website built with Flask, featuring a fully functional contact form that allows visitors to send messages via email.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-2.0+-green)

## 🌟 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Contact Form** - Functional email integration allowing visitors to send messages
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Multiple Sections:**
  - Home/Hero section with typing animation
  - About section with statistics
  - Education timeline
  - Technical skills showcase
  - Featured projects gallery
  - Certifications and achievements
  - Coding profiles
  - Work experience
  - Contact information

## 🚀 Technologies Used

### Frontend

- HTML5
- CSS3 (with modern features like Flexbox, Grid, and animations)
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.4.0
- Google Fonts (Poppins, Inter)

### Backend

- Python 3.8+
- Flask 2.0+
- smtplib (for email functionality)

## 📋 Prerequisites

Before running this project, make sure you have:

- Python 3.8 or higher installed
- A Gmail account for sending emails
- Gmail App Password (for email functionality)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/atul87/My_Protfolio_Website.git
   cd My_Protfolio_Website
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure email settings** (Optional but recommended for contact form)

   Open `app.py` and update the email configuration:

   ```python
   SMTP_SERVER = "smtp.gmail.com"
   SMTP_PORT = 587
   SENDER_EMAIL = "your-email@gmail.com"  # Your Gmail address
   SENDER_PASSWORD = "your-app-password"   # Gmail App Password
   RECEIVER_EMAIL = "your-email@gmail.com" # Where you want to receive messages
   ```

   **Note:** To get a Gmail App Password:
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Go to Security > App Passwords
   - Generate a new app password for "Mail"

## 🏃‍♂️ Running the Application

1. **Start the Flask development server**

   ```bash
   python app.py
   ```

2. **Open your browser**

   Navigate to: `http://127.0.0.1:5000`

3. **Test the contact form**
   - Scroll to the Contact section
   - Fill in your details
   - Click "Send Message"
   - You should receive an email at your configured receiver email address

## 📁 Project Structure

```
atul-portfolio/
├── app.py                 # Flask application entry point
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── style.css         # Main stylesheet
    └── app.js            # JavaScript functionality
```

## 🎨 Customization

### Updating Personal Information

1. **Edit `templates/index.html`** to update:
   - Name and personal details
   - Education history
   - Skills and technologies
   - Projects
   - Certifications
   - Work experience
   - Social media links

2. **Edit `static/style.css`** to customize:
   - Colors and theme
   - Fonts
   - Spacing and layout
   - Animations

3. **Edit `static/app.js`** to modify:
   - Typing animation phrases
   - Form validation rules
   - Interactive behaviors

### Changing Colors

The main color scheme is defined in CSS variables at the top of `style.css`:

```css
:root {
    --primary-color: #00abf0;
    --secondary-color: #0066ff;
    --text-color: #ededed;
    --bg-color: #081b29;
    /* ... */
}
```

## 📧 Contact Form

The contact form sends emails using Gmail's SMTP server. When a visitor submits the form:

1. JavaScript validates the input
2. Data is sent to the `/contact` Flask endpoint via POST request
3. Flask processes the data and sends an email
4. User receives success/error feedback

### Form Fields

- **Name** (minimum 2 characters)
- **Email** (valid email format)
- **Subject** (required)
- **Message** (minimum 10 characters)

## 🛡️ Security Notes

- **Never commit your Gmail App Password** to the repository
- The `.gitignore` file is configured to exclude sensitive files
- Consider using environment variables for production deployment
- For production, use a proper email service like SendGrid or Mailgun

## 🚢 Deployment

### Deploying to Heroku

1. Create a `Procfile`:

   ```
   web: python app.py
   ```

2. Update `app.py` to use environment port:

   ```python
   if __name__ == "__main__":
       port = int(os.environ.get("PORT", 5000))
       app.run(host='0.0.0.0', port=port)
   ```

3. Deploy:

   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Deploying to Other Platforms

This Flask application can be deployed to:

- PythonAnywhere
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean App Platform

## 📝 License

This project is open source and available for personal and educational use.

## 👤 Author

**Atul Varma**

- GitHub: [@atul87](https://github.com/atul87)
- LinkedIn: [Atul Varma](https://www.linkedin.com/in/atul-varma-102b5b2a9)
- Email: <atulverma15704@gmail.com>

## 🙏 Acknowledgments

- Bootstrap for the responsive framework
- Font Awesome for icons
- Google Fonts for typography
- Flask community for excellent documentation

## 📞 Support

If you have any questions or need help with the portfolio, feel free to:

- Open an issue on GitHub
- Contact me via the contact form on the website
- Email me directly at <atulverma15704@gmail.com>

---

**Made with ❤️ by Atul**
