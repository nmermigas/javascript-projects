const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable-Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Pass Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '812b2512544f4864bc105157b13f4d9c',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        } 
        // call tellMe function
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch(error) {
        console.log('Error here!');
    }
}

// Event Listeners
button.addEventListener('click',getJokes)
audioElement.addEventListener('ended',toggleButton);