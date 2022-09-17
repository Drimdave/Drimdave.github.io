const synth = window.speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    const command = event.results[0][0].transcript.toLowerCase();

    if(command.includes("how are you")){
        speak("I'm very well, thanks for asking");
    }
    else if(command.includes("who are you")){
        speak("I am Joe, a virtual assistant ready to help you with your everyday tasks");
    }
    else if(command.includes("who made you")){
        speak("I was created by the team of RazorLabs, a subsidiary of Simsign.");
    }
    else if (command.includes("hey") || command.includes("Joe")) {
        speak ("Greetings. How can I help you?");
    }
    else if (command.includes("who owns you")) {
        speak ("Joseph Mensah. He is a young enterprising enterpreneur setting the pace in the tech industry through in-genius creativity and innovation");
    }
    else if (command.includes("what are you doing")) {
        speak ("I am here to assist you");
    }
    else if (command.includes("when is your birthday")) {
        speak ("Everyday is my birthday because I celebrate when someone uses me");
    }
    else if (command.includes("goodnight")) {
        speak ("Good Night. Have a sweet dream");
    }
    else if (command.includes("good morning")) {
        speak ("Morning. It's a brand-new day. It's time to wake up, smell the coffee, and make it a beautiful one.");
    }
    else if (command.includes("thank you")) {
        speak ("You are most welcome. Do have a lovely day");
    }
    else if (command.includes("please tell me about your company")) {
        speak ("Welcome to Simsign. A hub created to hold entities driven by problem solving. Founded by Joseph Mensah");
    }
    else if (command.includes("take me to your company's page")) {
        speak ("ok, I will redirect you to our company page");
        window.open("https://www.instagram.com/simsignconcept/");
    }
    else if (command.includes("open google")){
        speak ("opening Google");
        window.open("https://google.com");
    }
    else if(command.includes('what is') || command.includes('who is') || command.includes('what are')) {
        window.open(`https://www.google.com/search?q=${command.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on regarding " + command;
        speak (finalText);
    }
    else if(command.includes('Wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${command.replace("Wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on Wikipedia regarding " + command;
        speak (finalText);
    }
    else if(command.includes('open calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak (finalText);
    }
    else if(command.includes('youtube')) {
        window.open(`https://www.youtube.com/results?search_query=${command.replace("youtube", "")}`, "_blank");
        const finalText = "This is what i found on regarding " + command;
        speak (finalText);
    }
    else if (command.includes("the weather in my location")) {
        speak ("The weather in your location is");
        window.open("https://www.google.com/search?sxsrf=ACYBGNSQwMLDByBwdVFIUCbQqya-ET7AAA%3A1578847393212&ei=oUwbXtbXDN-C4-EP-5u82AE&q=weather&oq=weather&gs_l=psy-ab.3..35i39i285i70i256j0i67l4j0i131i67j0i131j0i67l2j0.1630.4591..5475...1.2..2.322.1659.9j5j0j1......0....1..gws-wiz.....10..0i71j35i39j35i362i39._5eSPD47bv8&ved=0ahUKEwiWrJvwwP7mAhVfwTgGHfsNDxsQ4dUDCAs&uact=5", "_blank");
    }
    else if (command.includes("where am i")) {
        speak("You must be somewhere near here, according to Google maps");
        window.open("https://www.google.com/maps/search/Where+am+I+?/");
    }
    else if (command.includes("direction")) {
        let arr = command.split(" ");
        arr.splice(0, 2);
        let query = arr.join(" ");
        speak (`Finding the best way to ${query}`);
        window.open(
          `http://maps.google.com/maps/?q=directions to${query}`,
          "_blank"
        );
    }
    else if (
        command.includes("compose") ||
        command.includes("mail") ||
        command.includes("email")
    ) {
        let recipient = window.prompt("Enter the e-mail address of recipient");
        let subject = window.prompt("Enter the subject of the mail");
        let body = window.prompt("Enter the body of the mail");
        speak (`Composing mail to ${recipient}`);
        window.open(
          `mailto:${recipient}?subject=${subject}&body=${body}`,
          "_blank"
        );
    }
    else if(command.includes("tell me about")){
        const query = command.split("tell me about ").pop();
        console.log(query);
        fetch("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=" + query)
        .then(response => response.json())
        .then(formattedQuery => {
            console.log(formattedQuery);
            fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=2&explaintext=1&format=json&origin=*&titles=" + formattedQuery[1][0])
            .then(response => response.json())
            .then(data => {
                const dataPageId = Object.getOwnPropertyNames(data.query.pages);
                if(data.query.pages[dataPageId].extract.endsWith("may refer to:")){
                    fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=2&explaintext=1&format=json&origin=*&titles=" + formattedQuery[1][1])
                    .then(response => response.json())
                    .then(data2 => {
                        const dataPageId = Object.getOwnPropertyNames(data2.query.pages);
                        console.log(data2.query.pages[dataPageId].extract);
                        speak(data2.query.pages[dataPageId].extract);
                    })
                }
                else{
                    console.log(data.query.pages[dataPageId].extract);
                    speak(data.query.pages[dataPageId].extract);
                }
            })
        })
    }
    else if(command.includes("play ")){
        if(document.getElementById("audioPlayer")){
            document.getElementById("audioPlayer").remove();
        }
        const query = command.split("play ").pop();
        fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCk4DztX4RNPfT_QPrFoXNlsugabfg78mY&part=snippet&type=video&q=" + query)
        .then(response => response.json())
        .then(data => {
            const data2 = null;
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(JSON.parse(this.response).link);
                    const audio = document.createElement("audio");
                    audio.id = "audioPlayer";
                    audio.autoplay;
                    audio.src = JSON.parse(this.response).link;
                    document.body.appendChild(audio);
                    document.getElementById("audioPlayer").play();
                }
            });
            xhr.open("GET", "https://youtube-mp36.p.rapidapi.com/dl?id=" + data.items[0].id.videoId);
            xhr.setRequestHeader("x-rapidapi-host", "youtube-mp36.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "da4b723be6msha2b57cbd3339f2ap17c0c6jsn33b74a15587f");
            xhr.send(data2);
        });
    }
    else if(command == "pause" || command == "mute"){
        document.getElementById("audioPlayer").pause();
    }
    else if(command == "play" || command == "unmute"){
        document.getElementById("audioPlayer").play();
    }
    else if(command.includes("volume")){
        const volumeValue = command.split("volume ").pop().replace("%", "");
        console.log(volumeValue);
        if(document.getElementById("audioPlayer")){
            document.getElementById("audioPlayer").volume = document.getElementById("audioPlayer").volume = volumeValue/100;
        }
    }
    else if(command == "stop"){
        speechSynthesis.cancel();
    }
    else if(command == "go to sleep"){
        sleep("true");
    }
    else if(command == "wake up"){
        sleep("false");
    }
    else if(command.includes("show me ")){
        const query = command.split("show me ").pop().replace(" ", "+");
        fetch("https://api.unsplash.com/search/photos?client_id=8MAfFBgzOMLotDDrdodQCQygJFYpdUOFJwB3qf3OGMM&query=" + query)
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0].urls.full);
        });
    }
}

        speak.pitch = 1;
        speak.volume = 1;
        speak.rate = 1;

recognition.onend = function() {
    console.log("Ended")
    recognition.start();
}

function speak(input){
    document.querySelector(".joeBot").src = "./animations/talkAnim.mp4";
    var utterance = new SpeechSynthesisUtterance(input);
    speechSynthesis.speak(utterance);
    utterance.onend = function(){
        document.querySelector(".joeBot").src = "./animations/idleAnim.mp4";
    }
}

function sleep(input){
    if(input == "true") {
        document.querySelector(".joeBot").style.display = "none";
    }
    else {
        document.querySelector(".joeBot").style.display = "block";
    }
}

function start(){
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".joeBot").style.display = "block";
    recognition.start()
}