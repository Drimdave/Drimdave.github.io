document.querySelector(".command-btn").addEventListener("click", function () {
    document.querySelector(".command-list").classList.add("active");
    this.style.display = "none";
})

document.getElementById("close").addEventListener("click", function () {
    document.querySelector(".command-list").classList.remove("active");
    document.querySelector(".command-btn").style.display = "block"; 
})


if ("webkitSpeechRecognition" in window) {
    const d = new Date() // today, now

    // setInterval(function name1(){
    //     var time = d.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
    // }, 1000)
    

    // console.log(name1())


    //  time = d.toLocaleTimeString();
    // Timezone zero UTC offset
    var date = d.toISOString().slice(0, 10) // YYYY-MM-DD


    // Speech Recognition Stuff goes here
    const btn = document.querySelector(".sound-icon");
    // const content = document.querySelector(".content");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = function () {
        console.log("voice is activated, you can to microphone");
    }


    recognition.onresult = function (event) {
        const current = event.resultIndex;

        const transcript = event.results[current][0].transcript;

        // content.textContent = transcript;
        readOut(transcript);
        console.log(transcript)
    }

    // add the listener to the btn

    btn.addEventListener("click", () => {
        btn.classList.add("active");
        recognition.start();
    })
    var synth = window.speechSynthesis;
    function readOut(message) {
        btn.classList.remove("active");

        let speech = new SpeechSynthesisUtterance();

        if (message.includes("how are you")) {
            speech.text = "I'm very well, thanks for asking";
        }
        else if (message.includes("who are you")) {
            speech.text = "I am Joe, a virtual assistant ready to help you with your everyday tasks";
        }
        else if (message.includes("who made you")) {
            speech.text = "I was created by the team of RazorLabs, a subsidiary of Simsign.";
        }
        else if (message.includes("Hey") || message.includes("Joe")) {
            speech.text = "Greetings. How can I help you?";
        }
        else if (message.includes("who owns you")) {
            speech.text = "Joseph Mensah. He is a young enterprising enterpreneur setting the pace in the tech industry through in-genius creativity and innovation";
        }
        else if (message.includes("what are you doing")) {
            speech.text = "I am here to assist you";
        }
        else if (message.includes("when is your birthday")) {
            speech.text = "Everyday is my birthday because I celebrate when someone uses me";
        }
        else if (message.includes("goodnight")) {
            speech.text = "Good Night. Have a sweet dream";
        }
        else if (message.includes("good morning")) {
            speech.text = "Good Morning.";
        }
        else if (message.includes("thank you")) {
            speech.text = "You are most welcome. Do have a lovely day";
        }
        else if (message.includes("please tell me about your company")) {
            speech.text = "Welcome to Simsign. A space dedicated to every day simple minimal design that enhance functionality. Founded by Joseph Mensah";
        }
        else if (message.includes("take me to your company's page")) {
            speech.text = "ok, I will redirect you to our company page";
            window.open("https://www.instagram.com/simsignconcept/");
        }
        else if (message.includes("open Google")) {
            speech.text = "opening Google";
            window.open("https://google.com");
        }
        else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "This is what i found on regarding " + message;
            speech.text = finalText;
        }
        else if(message.includes('Wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("Wikipedia", "")}`, "_blank");
            const finalText = "This is what i found on Wikipedia regarding " + message;
            speech.text = finalText;
        }
        else if(message.includes('open calculator')) {
            window.open('Calculator:///')
            const finalText = "Opening Calculator";
            speech.text = finalText;
        }
        else if(message.includes('YouTube')) {
            window.open(`https://www.youtube.com/results?search_query=${message.replace("YouTube", "")}`, "_blank");
            const finalText = "This is what i found on youtube regarding " + message;
            speech.text = finalText;
        }
        else if (message.includes("the weather in my location")) {
            speech.text = "The weather in your location is";
            window.open("https://www.google.com/search?sxsrf=ACYBGNSQwMLDByBwdVFIUCbQqya-ET7AAA%3A1578847393212&ei=oUwbXtbXDN-C4-EP-5u82AE&q=weather&oq=weather&gs_l=psy-ab.3..35i39i285i70i256j0i67l4j0i131i67j0i131j0i67l2j0.1630.4591..5475...1.2..2.322.1659.9j5j0j1......0....1..gws-wiz.....10..0i71j35i39j35i362i39._5eSPD47bv8&ved=0ahUKEwiWrJvwwP7mAhVfwTgGHfsNDxsQ4dUDCAs&uact=5", "_blank");
        }
        else if (message.includes("where am I")) {
            speech.text = "You must be somewhere near here, according to Google maps";
            window.open("https://www.google.com/maps/search/Where+am+I+?/");
        }
        else if (message.includes("direction")) {
            let arr = message.split(" ");
            arr.splice(0, 2);
            let query = arr.join(" ");
            speech.text = (`Finding direction to ${query}`);
            window.open(
              `http://maps.google.com/maps/?q=directions to${query}`,
              "_blank"
            );
        }
        else if (
            message.includes("compose") ||
            message.includes("mail") ||
            message.includes("email")
        ) {
            let recipient = window.prompt("Enter the e-mail address of recipient");
            let subject = window.prompt("Enter the subject of the mail");
            let body = window.prompt("Enter the body of the mail");
            speech.text = (`Composing mail to ${recipient}`);
            window.open(
              `mailto:${recipient}?subject=${subject}&body=${body}`,
              "_blank"
            );
        }
        else if(message.includes("play ")){
            if(document.getElementById("audioPlayer")){
                document.getElementById("audioPlayer").remove();
            }
            const query = message.split("play ").pop();
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
        else if(message == "pause" || message == "mute"){
            document.getElementById("audioPlayer").pause();
        }
        else if(message == "play" || message == "unmute"){
            document.getElementById("audioPlayer").play();
        }
        else if(message.includes("volume")){
            const volumeValue = message.split("volume ").pop().replace("%", "");
            console.log(volumeValue);
            if(document.getElementById("audioPlayer")){
                document.getElementById("audioPlayer").volume = document.getElementById("audioPlayer").volume = volumeValue/100;
            }
        }
        else if (message.includes("what is today's date")) {
            speech.text = `${date}`;
        }
        // else if (massage.includes("time")) {
        //     speech.text = `${time}`;
        // }
        else {
            speech.text = "Sorry I didn't understand. Please repeat again.";
        }
          
        speech.pitch = 1;
        speech.volume = 1;
        speech.rate = 1;

        window.speechSynthesis.speak(speech);
        console.log(speech)
    }
} else {
    console.log("Speech Recognition Not Available")
}