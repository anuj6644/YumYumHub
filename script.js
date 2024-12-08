// JavaScript for AI Chatbot
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const chatbotSection = document.getElementById("ai-chatbot");
    const chatbotToggleBtn = document.querySelector(".chatbot-toggle-btn");
    const chatbotCloseBtn = document.querySelector("#chatbot-header .close-btn");
    const chatOutput = document.getElementById("chat-output");
    const chatInput = document.getElementById("chat-input");
    const sendMessageBtn = document.getElementById("send-message");

    // Food menu with prices
    const menu = {
        "burger": 50,
        "pasta": 100,
        "lasagna": 150,
        "sandwich": 40,
        "pizza": 150,
        "hot dog": 60,
        "biryani": 100,
        "cake": 250,
        "mausambi ka juice": 40,
        "chocolate drink": 60,
        "ice cream": 40,
        "chocolate": 50,
    };

    // Mood-based food suggestions
    const moodToFoodMap = {
        "tense": "a hot dog or pasta to calm you down",
        "excited": "a pizza or lasagna to match your mood",
        "cheerful": "ice cream or a shake to celebrate",
        "relaxed": "a biryani or sandwich to keep the vibe",
        "neutral": "a burger or cake for a balanced treat",
        "calm": "a slice of lasagna or a refreshing shake",
        "bored": "chocolate or a hot dog to energize you",
        "sad": "a comforting bowl of biryani or chocolate",
        "happy": "a pizza or a slice of cake to savor the moment",
        "mood off": "mausambi ka juice for a refreshing boost",
    };

    // Toggle chatbot visibility
    chatbotToggleBtn.addEventListener("click", () => {
        chatbotSection.style.display = chatbotSection.style.display === "none" ? "flex" : "none";
        chatbotSection.style.zIndex ="20000";
    });

    chatbotCloseBtn.addEventListener("click", () => {
        chatbotSection.style.display = "none";
    });

    // Handle user input and provide suggestions
    const handleUserInput = () => {
        const userInput = chatInput.value.trim().toLowerCase();
        if (!userInput) return;

        // Display user message
        const userMessage = document.createElement("p");
        userMessage.textContent = `You: ${userInput}`;
        userMessage.style.background = "#ffdb4d"; // Match user messages
        userMessage.style.marginTop ="115px";
        chatOutput.appendChild(userMessage);

        let response = "";

        // Check if input is a mood
        if (moodToFoodMap[userInput]) {
            response = `AI: Based on your mood "${userInput}", I suggest you try ${moodToFoodMap[userInput]}.`;
        } 
        // Check if input is a budget (numeric)
        else if (!isNaN(userInput)) {
            const budget = parseInt(userInput);
            const affordableItems = Object.keys(menu)
                .filter((item) => menu[item] <= budget)
                .map((item) => `${item} (₹${menu[item]})`)
                .join(", ");
            
            if (affordableItems) {
                response = `AI: Based on your budget of ₹${budget}, you can enjoy: ${affordableItems}.`;
            } else {
                response = `AI: Sorry, no items match your budget of ₹${budget}.`;
            }
        } 
        // Invalid input or unsupported mood
        else {
            response = `AI: Sorry, I didn't understand that. You can either provide a mood or your budget.`;
        }

        // Display AI response
        const aiMessage = document.createElement("p");
        aiMessage.textContent = response;
        aiMessage.style.background = "#fff"; // Match AI messages
        chatOutput.appendChild(aiMessage);

        // Clear the input field and scroll to the bottom
        chatInput.value = "";
        chatOutput.scrollTop = chatOutput.scrollHeight;
    };

    // Event listeners
    sendMessageBtn.addEventListener("click", handleUserInput);
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") handleUserInput();
    });
});
