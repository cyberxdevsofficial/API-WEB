app.post("/api/ai", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.json({ reply: "Please send a message!" });

    const lowerMsg = message.toLowerCase();

    // Owner info
    if(lowerMsg.includes("owner") || lowerMsg.includes("who")) {
        return res.json({ reply: "Owner: Anuga Senithu, Country: Sri Lanka" });
    }

    try {
        const fetch = (await import("node-fetch")).default; // make sure node-fetch installed
        const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }]
            })
        });
        const data = await openaiResp.json();
        const reply = data?.choices?.[0]?.message?.content || "I couldn't understand that!";
        res.json({ reply });
    } catch(e) {
        console.error(e);
        res.json({ reply: "Error connecting to OpenAI API." });
    }
});
