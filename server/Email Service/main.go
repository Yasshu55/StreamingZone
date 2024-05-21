package main

import (
	"fmt"
	"os"

	"gopkg.in/gomail.v2"
)

func sendMail() {
	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("SMTP_USERNAME"))
	m.SetHeader("To", "yashwanthsaichennupalli@gmail.com")
	m.SetHeader("Subject", "Test Mail from GO")
	m.SetBody("text/plain", "This is a test email sent from a Go application.")

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"))

	if err := d.DialAndSend(m); err != nil {
		fmt.Println("Error sending email:", err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}

func main() {
	sendMail()
}
