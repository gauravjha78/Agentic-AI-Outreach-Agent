# Seniding the email to the user
import smtplib
from email.mime.text import MIMEText


def send_emails(to_email, subject , body):
    sender_email="gaurav0592005@gmail.com"
    sender_password="ompzzsdtmofttuvc"

# ✅ ensure everything is string
    subject = str(subject)
    body = str(body)


    msg=MIMEText(body)
    msg["Subject"]=subject
    msg["From"]=sender_email
    msg["To"]=to_email

    with smtplib.SMTP("smtp.gmail.com",587) as server:
        server.starttls()
        server.login(sender_email,sender_password)
        server.send_message(msg)