import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'live-streaming-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

const produceMessage = async (message)=>{
    await producer.connect()
    await producer.send({
        topic: "livestream-events",
        messages:[
            {value: JSON.stringify(message)}
        ]
    })
    await producer.disconnect()
}

const startLiveStream = async () =>{
    try {
        const message = {
            event : "STARTED",
            userEmail: 'yasshu2013@gmail.com',
            timestamp : new Date().toISOString
        }
        await produceMessage(message)
        console.log("Message is sent : ",message);  
    } catch (error) {
        console.log(error);
    }
}

export default startLiveStream