# Seniding the email to the user
from dotenv import load_dotenv
import os
import resend
# import smtplib
# from email.mime.text import MIMEText

resend.api_key=os.getenv("RESEND_API_KEY")
load_dotenv()

# THIS IS WHEN WE USE GMAIL AND WE HAVE AWS CLOUD AS BACKEND PLATFORM.
# def send_emails(to_email, subject , body):
#     sender_email=os.getenv("EMAIL_USER")
#     sender_password=os.getenv("EMAIL_PASS")

# # ✅ ensure everything is string
#     subject = str(subject)
#     body = str(body)


#     msg=MIMEText(body)
#     msg["Subject"]=subject
#     msg["From"]=sender_email
#     msg["To"]=to_email

#     with smtplib.SMTP("smtp.gmail.com",587) as server:
#         server.starttls()
#         server.login(sender_email,sender_password)
#         server.send_message(msg)

#  This is for resend the platfrom for poduction email
def send_emails(to_email, subject, body):
    try:
        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": to_email,
            "subject": subject,
            "html": body
        })

        print("✅ Email sent successfully")

    except Exception as e:
        print("❌ Email failed:", e)