package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

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
	m.SetHeader("From", os.Getenv("SMTP_USERNAME"))
	log.Printf("SMTP_USERNAME: %s", os.Getenv("SMTP_USERNAME"))
	log.Printf("SMTP_PASSWORD: %s", os.Getenv("SMTP_PASSWORD"))

	m.SetHeader("To", userMail)
	m.SetHeader("Subject", "Stream has started!")
	m.SetBody("text/plain", "Your stream has successfully started streaming!")

	// d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"))

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"))

	if err := d.DialAndSend(m); err != nil {
		fmt.Println("Error sending email:", err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	// Set up the Sarama configuration
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Initialize the Sarama consumer
	consumer, err := sarama.NewConsumer([]string{"192.168.29.12:9092"}, config)
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
