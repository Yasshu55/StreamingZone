import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'live-streaming-service',
    brokers: ['192.168.29.12:9092']
})

const producer = kafka.producer();

const runProducer = async () => {
  try {
    console.log("Entered runproducer function in kafka producer!");
    await producer.connect();
    let userEmail = 'yasshu2013@gmail.com' // hardcoded for now later on get the user's email from database
    
    // Sample function to send a message to Kafka
    const sendMessage = async (userEmail) => {
        console.log("Sending msg from sendMessage function in kafka producer! and email : ",userEmail);
      await producer.send({
        topic: 'livestream-events',
        messages: [
          { value: JSON.stringify({ event: 'STARTED', userEmail, timestamp: new Date().toISOString() }) },
        ],
      });
    };
  
    // Send a message when the stream starts
    sendMessage(userEmail);
    
    } catch (error) {
      console.log(error);
    }
  };


  export { runProducer }