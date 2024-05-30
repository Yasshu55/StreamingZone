# Streaming Zone

## Description
  Streaming Zone is  a microservices-based live streaming platform where users may livestream their video or screen across multiple platforms simultaneously.

## Features


## Setup
### Kafka setup - 
```
  - docker run -p 2181:2181 zookeeper
```
```
  - docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP_ADDRESS> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP_ADDRESS> -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
  and change the brokers url in consumer and producer to <PRIVATE_IP_ADDRESS>:9092 or localhost:9092
```
