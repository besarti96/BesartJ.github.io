const chatbotResponse = {
    "hallo": "Grüezi!",
    "Wie alt bist du": "Oh.. Ihnen interessiert sicher Wie alt Besart Jashari ist. Besart Ist 26 Jahre alt.!",
    "was kannst du": "I'm a chatbot, ich kann dir alles über Besart Jashari sagen",
    "was kannst du mir über besart sagen": "Besart is cool",
    "wo wohnst du": "Melde dich doch bei mir um ein Vorstellungsgespräch um uns besser Kennenzulernen.",
    "wo wohnt besart": "Melde dich doch bei mir um ein Vorstellungsgespräch um uns besser Kennenzulernen.",
    "woher ist besart": "Besart ist Schweizer, doch um zu wissen wo er wohnt müsst ihr euch besser kennenlernen. Ich schlage ein vorstellungsgespräch vor.",
    "was sind besarts stärken": "Keine du spasst.",
    "was sind besarts schwächen": "keine du opfer",
    "wie alt ist besart": "Besart ist 26 Jahre alt.",
    "hi": "halluhii, was willst du über Besart Jashari wissen.",
    "was macht besart in seiner freizeit": "Er chillt",
    "wie gehts":"Gut und ihnen?",
    "wie gross ist er": "Besart ist 1.76m Auch Short King genannt.",
    "zeig mir besarts lebenslauf" : "https://www.besart-jashari.ch/besart.pdf",
    "lebenslauf" : "https://www.besart-jashari.ch/besart.pdf",
    "grüezi" : "Grüezi! Für ein besseres erlebniss mit mir, Schreibe auf Hochdeutsch",
    "Wann wurde Besart geboren" : "Besart Wurde am 31.07.1996 in Uznach Geboren.",
    "was ist besarts lieblings essen" : "Döner!",
    "welche Hobbies hat besart" : "Besart Geht gerne ins Gym und spielt Volleyball, Projekte wie diese machen ihm aber genauso spass.",
    "hobbies" : "Besart Geht gerne ins Gym und spielt Volleyball, Projekte wie diese machen ihm aber genauso spass.",
    "wie geht es besart": "besart geht es Gut, Er hofft ihnen geht es auch gut",
    "wie alt" : "Besart ist 26 jahre alt",
    "hallo besart": "Grüezi! nun ich bin nicht Besart, sondern Besarts Chatbot",
    "besart ist dumm" : "Tatsächlich eben nicht, hast du sonst noch fragen :)",
    "english" : "Leider nicht, Aber daran arbeitet Besart gerade."


    };
    
    const input = document.getElementById("chatinput");
    const submit = document.getElementById("chatform");
    const chatlogs = document.getElementById("chatlogs");
    
    let counter = 0;
    
    function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
    return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    
    function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
    if (i == 0) costs[j] = j;
    else {
    if (j > 0) {
    let newValue = costs[j - 1];
    if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(newValue, lastValue, costs[j]) + 1;
    costs[j - 1] = lastValue;
    lastValue = newValue;
    }
    }
    }
    if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
    }
    
    submit.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = input.value;
    input.value = "";
    
    let closestMatch = null;
    let highestSimilarity = 0;
    for (const [key, value] of Object.entries(chatbotResponse)) {
    const similarityValue = similarity(message, key);
    if (similarityValue > highestSimilarity && similarityValue >= 0.6) {
    closestMatch = value;
    highestSimilarity = similarityValue;
    }
    }
    
    const response = closestMatch || (++counter === 3 ? 
        "Wie es aussieht klappt da etwas nicht.\n"+
        "Fragen sie mich doch:\n" +
        "Zeige mir Besart Jasharis Lebenslauf.\n" +
        "Wie alt ist besart.\n" +
        "was kannst du mir über besart sagen.\n" +
        "was sind besarts schwächen\n" +
        "was sind besarts stärken?" 
        : 
        "Es tut mir leid das verstehe ich nicht.");
      
//Ausgabe frage und antwort

        const chat = document.createElement("div");
        chat.classList.add("chat");
        chat.classList.add("frage");
        chat.innerHTML = `<p>${message}</p>`;
        chatlogs.appendChild(chat);
        
        const chatResponse = document.createElement("div");
        chatResponse.classList.add("chat");
        chatResponse.classList.add("antwort");
        chatResponse.innerHTML = `<p>${response.replace(/\n/g, "<br>")}</p>`; //Zeilenunbrücke
        chatlogs.appendChild(chatResponse);
        
        // Auto-scroll nach unten
        chatlogs.scrollTop = chatlogs.scrollHeight;
        
        });
