const story1 = (`A teacher's professional duties may extend beyond formal teaching. Outside of the classroom teachers may accompany students on field trips, supervise study halls, help with the organization of school functions, and serve as supervisors for extracurricular activities. In some education systems, teachers may have responsibility for student discipline.`);
const story2 = (`Some people combine touch typing and hunt and peck by using a buffering method. In the buffer method, the typist looks at the source copy, mentally stores one or several sentences, then looks at the keyboard and types out the buffer of sentences. This eliminates frequent up and down motions with the head and is used in typing competitions in which the typist is not well versed in touch typing. Not normally used in day-to-day contact with keyboards, this buffer method is used only when time is of the essence. (Wikipedia)`)
const story3 = (`Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake. Many experienced typists can feel or sense when they have made an error and can hit the Backspace key and make the correction with no increase in time between keystrokes.`);
const story4 = (`The Temple of Apollo Palatinus was a temple to the god Apollo in Rome, constructed on the Palatine Hill on the initiative of Augustus between 36 and 28 BCE. It was associated with Augustus's victories at the battles of Naulochus and Actium; the latter was extensively memorialised through its decoration. The temple represented the restoration of Rome's golden age and Augustus's devotion to religious and political duty. `);
const story5 = (`Lancelot du Lac (French for Lancelot of the Lake), also written as Launcelot and other variants, is a character in some versions of Arthurian legend where he is typically depicted as King Arthur's close companion and one of the greatest Knights of the Round Table. In the French-inspired Arthurian chivalric romance tradition, Lancelot is an orphaned son of King Ban of the lost kingdom of Benoic, raised in a fairy realm by the Lady of the Lake.`);
const story6 = (`Photosynthesis is a biological process used by many cellular organisms to convert light energy into chemical energy, which is stored in organic compounds that can later be metabolized through cellular respiration to fuel the organism's activities. The term usually refers to oxygenic photosynthesis, where oxygen is produced as a byproduct and some of the chemical energy produced is stored in carbohydrate molecules such as sugars, starch, glycogen and cellulose, which are synthesized from endergonic reaction of carbon dioxide with water.`);
const story7 = (`Matrices are used to represent linear maps and allow explicit computations in linear algebra. Therefore, the study of matrices is a large part of linear algebra, and most properties and operations of abstract linear algebra can be expressed in terms of matrices. For example, matrix multiplication represents the composition of linear maps.`);
const story8 = (`The raspberry is the edible fruit of a multitude of plant species in the genus Rubus of the rose family, most of which are in the subgenus Idaeobatus. The name also applies to the plant itself. Raspberry plants are perennial with woody stems. It is an aggregate fruit, developing from the numerous distinct carpels of a single flower. Originally occurring in East Asia, the raspberry is now cultivated across northern Europe and North America and is eaten in a variety of ways including as a whole fruit and in preserves, cakes, ice cream and liqueurs. Raspberries are a rich source of vitamin C, manganese, and dietary fiber.`);
const story9 = (`Alligators and caimans split in North America during the early Tertiary or late Cretaceous (about 53 million to about 65 million years ago). The Chinese alligator split from the American alligator about 33 million years ago and probably descended from a lineage that crossed the Bering land bridge during the Neogene. The modern American alligator is well represented in the fossil record of the Pleistocene. The alligator's full mitochondrial genome was sequenced in the 1990s. The full genome, published in 2014, suggests that the alligator evolved much more slowly than mammals and birds.`);

const inputText = document.getElementById("text");
const textToDisplay = document.getElementById("displayStory");
const randomStory = getStory();

let count = 30;

window.onload = function() {
    randomStory.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        textToDisplay.appendChild(characterSpan);
        document.getElementById('text').readOnly = true;
    });
}

inputText.addEventListener('input', () => {
    const test = textToDisplay.querySelectorAll('span');
    const verify = inputText.value.split('');
    test.forEach((characterSpan, index) => {
        const character = verify[index];
        if (character == null) {
            characterSpan.classList.remove('invalid');
            characterSpan.classList.remove('valid');
        } else if(character === characterSpan.innerText) {
            characterSpan.classList.add('valid');
            characterSpan.classList.remove('invalid');
        } else {
            characterSpan.classList.add('invalid');
            characterSpan.classList.remove('valid');
        }
    })
})

function start() {
    document.getElementById('text').readOnly = false;
    document.getElementById('next').style = "visibility: hidden";
    document.getElementById('start').style = "visibility: hidden";
    blankInput();
    position = 0;
    setInterval(start_cuntdown, 1000);
}

function getRandomNumber() {
    return Math.ceil(Math.random() * 9);
}

function start_cuntdown() {
    if (count > 0) {
        --count;
        document.getElementById("count").innerHTML =  count;
    } else {
        document.getElementById('text').readOnly = true;
        countCharactersByColor();
        countWordsByColour();
        document.getElementById("count").style= "visibility: hidden";
    }
}

function changeStory() {
    location.reload();
}
function getStory() {
    return eval("story" + getRandomNumber());
}

function blankInput() {
    document.getElementById("text").focus();
    document.getElementById("text").value = "";
}

function countCharactersByColor() {
    const test = textToDisplay.querySelectorAll('span');
    let validChar = 0;
    let invalidChar = 0;

    test.forEach((characterSpan) => {
        if (characterSpan.classList.contains('valid')) {
            ++validChar;
        } else if (characterSpan.classList.contains('invalid')) {
            ++invalidChar;
        }
    });
    let accuracyChar = (Number(validChar) * 100) / (Number(validChar) + Number(invalidChar));
    document.getElementById("charactersOnMin").innerText = "Characters / min : " + (Number(validChar) + Number(invalidChar));
    document.getElementById("misedCharacters").innerText = "Missed Characters: " + invalidChar;
    document.getElementById("correctCharacters"). innerText = "Correct characters: " + validChar;
    document.getElementById("accuracy").innerText = "Accuracy: " + (accuracyChar.toFixed(2)) + "%";
    document.getElementById("restart").style = "visibility: visible";
}

function countWordsByColour() {
    const spans = Array.from(textToDisplay.querySelectorAll('span'));
    const inputTextValue = inputText.value.trim();
    const inputWords = inputTextValue.split(" ");
    
    let validWords = 0;
    let invalidWords = 0;

    inputWords.forEach((word, index) => {
        const wordSpans = spans.slice(index * word.length, (index + 1) * word.length);
        const isValidWord = wordSpans.every(span => !span.classList.contains('invalid'));

        if (isValidWord) {
            ++validWords;
        } else {
            ++invalidWords;
        }
    });

    let wordAccuracy = (Number(validWords) * 100) / (Number(validWords) + Number(invalidWords));

    document.getElementById("wordsOnMin").innerText = "Words / min : " + (Number(validWords) + Number(invalidWords));
    document.getElementById("misedWords").innerText = "Missed Words: " + invalidWords;
    document.getElementById("correctWords").innerText = "Correct Words: " + validWords;
    document.getElementById("wordsAccuracy").innerText = "Word Accuracy: " + (wordAccuracy.toFixed(2)) + "%";
}