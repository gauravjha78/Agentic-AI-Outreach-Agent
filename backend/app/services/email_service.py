import os
import sib_api_v3_sdk # ✅ New Brevo SDK
from sib_api_v3_sdk.rest import ApiException
from dotenv import load_dotenv

# load_dotenv() # Local development ke liye useful hai

def send_emails(to_email, subject, body):
    """
    Sends an email using Brevo (formerly Sendinblue) API.
    This bypasses port blocking issues on Render/Railway.
    """
    
    # 1. Setup Configuration
    configuration = sib_api_v3_sdk.Configuration()
    # Ensure BREVO_API_KEY is set in Render/Railway Env Variables
    configuration.api_key['api-key'] = os.getenv("BREVO_API_KEY")

    # 2. Initialize API Client
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

    # 3. Define the Email Content
    # NOTE: 'sender' email wahi rakho jo tumne Brevo dashboard me verify kiya hai.
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": to_email}],
        sender={"email": "gauravemail35@gmail.com", "name": "Pillai College Agent"}, 
        subject=str(subject),
        html_content=f"<html><body><p>{body}</p></body></html>"
    )

    try:
        # API Call (Uses Port 443 - Standard Web Traffic)
        api_response = api_instance.send_transac_email(send_smtp_email)
        print(f"✅ Email sent successfully via Brevo! Message ID: {api_response.message_id}")
    except ApiException as e:
        print(f"❌ Brevo API Error: {e}")

# ==============================================================================
# OLD SMTP METHOD (Commented out because Render/Railway block Port 587)
# ==============================================================================
# from email.mime.text import MIMEText
# import smtplib
#
# def send_emails_old_smtp(to_email, subject, body):
#     sender_email = os.getenv("EMAIL_USER")
#     sender_password = os.getenv("EMAIL_PASS")
#     msg = MIMEText(body)
#     msg["Subject"] = subject
#     msg["From"] = sender_email
#     msg["To"] = to_email
#     with smtplib.SMTP("smtp.gmail.com", 587) as server:
#         server.starttls()
#         server.login(sender_email, sender_password)
#         server.send_message(msg)

# ==============================================================================
# RESEND METHOD (Commented out - Switching to Brevo)
# ==============================================================================
# import resend
# resend.api_key = os.getenv("RESEND_API_KEY")
# def send_emails_resend(to_email, subject, body):
#     try:
#         resend.Emails.send({
#             "from": "onboarding@resend.dev",
#             "to": to_email,
#             "subject": subject,
#             "html": body
#         })
#     except Exception as e:
#         print("❌ Resend failed:", e)