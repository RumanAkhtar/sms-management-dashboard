import sys
from twilio.rest import Client

class SendSMS:
    def __init__(self, phone_number, proxy):
        self.phone_number = phone_number
        self.proxy = proxy
        self.account_sid = " "  # Replace with your Twilio account SID
        self.auth_token = " "  # Replace with your Twilio auth token
        self.from_number = " "  # Replace with your Twilio phone number
        self.client = Client(self.account_sid, self.auth_token)

    def send_otp(self):
        try:
            message = self.client.messages.create(
                body='Your OTP is 123456',  # Customize your message
                from_=self.from_number,
                to=self.phone_number
            )
            print(f"SMS sent successfully! Message SID: {message.sid}")
            return True
        except Exception as e:
            print(f"Error occurred: {e}")
            return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python send_sms.py <phone_number> <proxy>")
        sys.exit(1)

    phone_number = sys.argv[1]
    proxy = sys.argv[2]

    sms_sender = SendSMS(phone_number, proxy)
    sms_sender.send_otp()
