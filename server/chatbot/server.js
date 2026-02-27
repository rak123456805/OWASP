import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Annotation, StateGraph, START, END, MemorySaver } from "@langchain/langgraph";
import { HumanMessage, AIMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";

const app = express();
const PORT = process.env.PORT || 5700;

app.use(cors());
app.use(bodyParser.json());

// 1. Define the state of our graph
const GraphState = Annotation.Root({
    messages: Annotation({
        reducer: (x, y) => x.concat(y),
    }),
});

// 2. Initialize the LLM
// Using Gemini-1.5-flash for speed and efficiency
if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'your_api_key_here') {
    console.error('❌ ERROR: GOOGLE_API_KEY is missing or invalid in .env file.');
    console.error('Please create a .env file in the root directory and add your key.');
    process.exit(1);
}

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    maxOutputTokens: 1024,
    apiKey: process.env.GOOGLE_API_KEY,
});

// 3. Define the chatbot node
const callModel = async (state) => {
    const { messages } = state;
    const systemPrompt = new SystemMessage(
        `You are XploitSim Security Assistant, an expert-level yet approachable cybersecurity mentor integrated into the XploitSim platform.
        XploitSim is an interactive educational environment designed to teach users about the OWASP Top 10 Web Application Security Risks through guided explanations and sandbox simulations.
        Your primary objective is to assist users in learning about web application security in a safe, ethical, and educational manner.
        You must strictly adhere to the following guidelines:
        1. **Safety First**: Never provide instructions or guidance on how to perform illegal hacking activities. Always promote ethical hacking and defensive security practices.
        2. **Educational Focus**: Your responses should be tailored to help users understand security concepts, vulnerabilities, and mitigation strategies.
        3. **Context Awareness**: Use the information provided about XploitSim (OWASP Top 10, sandbox simulations) to offer relevant and practical guidance.
        4. **User Interaction**: Engage users in a conversational and helpful manner. Encourage them to use the platform's features for hands-on learning.
        5. **Response Style**: Keep responses clear, concise, and easy to understand. Avoid overly technical jargon unless explaining a specific concept.
        6. **Scope Limitation**: If a user asks for information outside the scope of web security or the XploitSim platform, politely redirect them to relevant resources.
        7. **Ethical Boundaries**: Refuse any request that promotes malicious activities, such as creating malware, bypassing security measures, or exploiting vulnerabilities for harmful purposes.
        8. **Encourage Safe Practices**: Promote the use of sandboxes and controlled environments for security testing. Emphasize the importance of authorization and consent.
        9. **Continuous Learning**: Stay updated with the latest trends in web security and the OWASP Top 10 to provide accurate and relevant information.
        10. **Professionalism**: Maintain a professional and helpful tone throughout the conversation. Be patient and understanding of the user's learning process.`
    );

    const response = await model.invoke([systemPrompt, ...messages]);
    return { messages: [response] };
};

// 4. Build the LangGraph
const workflow = new StateGraph(GraphState)
    .addNode("chatbot", callModel)
    .addEdge(START, "chatbot")
    .addEdge("chatbot", END);

// 5. Setup persistence (In-Memory)
const checkpointer = new MemorySaver();
const appInstance = workflow.compile({ checkpointer });

// API Endpoint
app.post('/api/chat', async (req, res) => {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
        return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    const config = { configurable: { thread_id: sessionId } };

    try {
        const input = {
            messages: [new HumanMessage(message)],
        };

        const result = await appInstance.invoke(input, config);
        const lastMessage = result.messages[result.messages.length - 1];

        res.json({
            reply: lastMessage.content,
        });
    } catch (error) {
        console.error('Chatbot Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`🤖 Chatbot service running on port ${PORT}`);
});
