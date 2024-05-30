# Streaming Zone

## Description
  Streaming Zone is  a microservices-based live streaming platform where users may livestream their video or screen across multiple platforms simultaneously.

## Features
  - Live Streaming on Youtube and Twitch
  - Email Notification to the user when the live stream starts
  - User Authentication 
  - API Gateway

<div align="center">
  <h1 align="center">Demo Video</h1>
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/95294297/335137927-cc12d0b7-1122-479b-8a0e-068bae3c04ba.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240530%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240530T100954Z&X-Amz-Expires=300&X-Amz-Signature=5ac7eb18be6b1c4a7838f7da0e62ff92baef1deb4463e37c2458903f7b77b5c3&X-Amz-SignedHeaders=host&actor_id=95294297&key_id=0&repo_id=799974153">
</div>

checkout full demo here - https://youtu.be/myzZmjsX87U

## Setup
### Kafka setup - 
```
  - docker run -p 2181:2181 zookeeper
```
```
  - docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP_ADDRESS> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP_ADDRESS> -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```
  and change the brokers url in consumer and producer to <PRIVATE_IP_ADDRESS>:9092 or localhost:9092
