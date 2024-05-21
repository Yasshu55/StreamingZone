package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/Shopify/sarama"
	gomail "gopkg.in/gomail.v2"
)

type LivestreamEvent struct {
	Event     string `json:"event"`
	UserEmail string `json:"userEmail"`
	Timestamp string `json:"timestamp"`
}

func sendMail(userMail string) {
	m := gomail.NewMessage()
	// m.SetHeader("From", os.Getenv("SMTP_USERNAME"))
	m.SetHeader("From", "ysgaming2003@gmail.com")
	m.SetHeader("To", userMail)
	m.SetHeader("Subject", "Test Mail from GO")
	m.SetBody("text/plain", "This is a test email sent from a Go application.")

	d := gomail.NewDialer("smtp.gmail.com", 587, "ysgaming2003@gmail.com", "lvbq koun arsl tpln")

	if err := d.DialAndSend(m); err != nil {
		fmt.Println("Error sending email:", err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}

func main() {
	// Set up the Sarama configuration
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Initialize the Sarama consumer
	consumer, err := sarama.NewConsumer([]string{"localhost:9092"}, config)
	if err != nil {
		log.Fatal("Error creating consumer:", err)
	}
	defer consumer.Close()

	// Consume the "livestream-events" topic
	partitionConsumer, err := consumer.ConsumePartition("livestream-events", 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatal("Error creating partition consumer:", err)
	}

	defer partitionConsumer.Close()

	fmt.Println("Kafka consumer has started, waiting for messages...")

	for {
		select {
		case msg := <-partitionConsumer.Messages():
			var event LivestreamEvent
			err := json.Unmarshal(msg.Value, &event)
			if err != nil {
				log.Println("Error unmarshalling event:", err)
				continue
			}

			if event.Event == "STARTED" {
				sendMail(event.UserEmail)
			}

		case err := <-partitionConsumer.Errors():
			log.Println("Error in partition consumer:", err)
		}
	}
}
