var quiz = [{
        "question": "What secret name is used to refer to Sirius Black?",
        "image": "",
        "choices": [
            "Scabbers",
            "Snuffles",
            "Griphook",
            "Prongs"
        ],
        "correct": "Snuffles",
        "explanation": "Harry, Ron and Hermione create the code name \"Snuffles\" to refer to Sirius Black while he is in his Animagus form, that of a black dog.",
    },
    {
        "question": "What magical object causes people to turn orange or sprout tentacle-like warts?",
        "image": "",
        "choices": [
            "Metamorph-Medals",
            "The Mirror or Erised",
            "Decoy Detonators",
            "U-No-Poo"
        ],
        "correct": "Metamorph-Medals",
        "explanation": "First mentioned by Arthur Weasley in the HALF-BLOOD PRINCE, \"Metamorph-Medals\" are magical scam objects, and far from helping the wearer metamorph, often backfire dramatically.",
    },
    {
        "question": "What is the only antidote to Basilisk venom?",
        "image": "",
        "choices": [
            "Phoenix Tears",
            "Mandrake Draught",
            "Dragon's Blood",
            "A Bezoar"
        ],
        "correct": "Phoenix Tears",
        "explanation": "Luckily, after being bit by a Basilisk, Harry has quick access to the tears of sympathetic Phoenix, hand-raised by Albus Dumbledore.",
    },
    {
        "question": "What is the Symbol for Gryffindor House?",
        "image": "",
        "choices": [
            "A Badger",
            "An Eagle",
            "A Lion",
            "An Elk"
        ],
        "correct": "A Lion",
        "explanation": "A lion is a transparent metaphor for the bravery of this house's members, this symbol was personally chosen by Godric Gryffindor himself.",
    },
    {
        "question": "In his youth, prior to the troubles with You-Know-Who, Dumbledore is famous for single-handedly defeating and imprisoning which Dark wizard?",
        "image": "",
        "choices": [
            "Lucius Malfoy",
            "Igor Karkaroff",
            "Gellert Grindelwald",
            "Amycus Carrow"
        ],
        "correct": "Gellert Grindelwald",
        "explanation": "A former student of Durmstrang, Gellert Grindelwald ultimately aimed to create a 'benevolent' world order led by wizards, with a subjugated muggle underclass.",
    },
    {
        "question": "When is Harry Potter's birthday?",
        "image": "",
        "choices": [
            "30th July",
            "31st August",
            "31st July",
            "30th June"
        ],
        "correct": "31st July",
        "explanation": "Little known fact: Harry Potter was in fact not born on July 31st, but hatched from an egg! His first word was reportedly \"CRIKEY\""
    },
    {
        "question": "Which item is enchanted to help a student cheat on an exam?",
        "image": "",
        "choices": [
            "A Pocket Sneakoscope",
            "A Deluminator",
            "A Howler",
            "Detachable Cribbing Cuff"
        ],
        "correct": "Detachable Cribbing Cuff",
        "explanation": "First mentioned in ORDER OF THE PHOENIX, \"Detachable Cribbing Cuffs\" were banned from the examination hall while the fifth years took their Ordinary Wizarding Levels. All results of this quiz are considered null and void if the taker is in possession of such objects.",
    },
    {
        "question": "When Harry Potter reaches the end of the Triwizard Tournament, who sadly dies?",
        "image": "",
        "choices": [
            "Viktor Krum",
            "Fleur Delacour",
            "Cedric Diggory",
            "Colin Creevey"
        ],
        "correct": "Cedric Diggory",
        "explanation": "When Cedric, along with Harry, falls into Voldemort's trap at the end of THE GOBLET OF FIRE, He-Who-Shall-Not-Be-Named orders Peter Pettigrew to \"Kill the spare\" -- Peter then murders Cedric with the Killing Curse.",
    },
];

// variables
var currentquestion,
    score;

function htmlEncode(value) {
    return $(document.createElement('div')).text(value).html();
}

// create the different answer 'buttons'
function addChoices(choices) {

    for (var i = 0; i < choices.length; i++) {
        $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
    }
}

function nextQuestion() {
    $('#explanation').empty();
    $('#question').text(quiz[currentquestion]['question']);
    $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);

    addChoices(quiz[currentquestion]['choices']);
    setupButtons();
    cdreset();
    countdown();
}


function processQuestion(choice) {

    currentquestion++;

    if (currentquestion == quiz.length) {
        endQuiz();
    } else {
        nextQuestion();
    }
}


function setupButtons() {

    $('.choice').on('click', function() {

        choice = $(this).attr('data-index');
        $('.choice').removeAttr('style').off('mouseout mouseover');
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
            timertype = "nextq";
            $('#timer').empty();
            $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            score++;
            $('#choice-block').empty();
            // reset timer, trigger next question countdown
            cdreset();
            countdown();

        } else {
            timertype = "nextq";
            $('#timer').empty();
            $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            $('#choice-block').empty();
            cdreset();
            countdown();
        }
    });
}


function endQuiz() {
    $('#explanation').empty();
    $('#question').empty();
    $('#choice-block').empty();
    $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
    $(document.createElement('h2')).css({
        'text-align': 'center',
        'font-size': '4em'
    }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
    beginbutton("RESTART");
}


function init() {
    // initialize variables
    currentquestion = 0;
    score = 0;
    //add question tracker and questions. How much can I jquery? Alot jquery.
    //add pager (question tracker)
    $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
    //add first question
    $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');

    $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').appendTo('#frame');

    //questions holder
    $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

    //add choices
    addChoices(quiz[0]['choices']);

    setupButtons();

    // timer
    cdreset();
    countdown("modal");
    $('#myModal').modal({ show: false });
}

function beginbutton(startend) {
    $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
    $(document.createElement('li')).addClass('begin choice choice-box').text(startend + " GAME").appendTo('#choice-block');
}

// create a begin button at start of game
beginbutton("BEGIN");

// wait for click of begin button to initialize game

$(document).on('click', '.begin', function() {
    console.log("begin button clicked");
    $('#frame').empty();
    init();
});

// timer and coundown functions

var CCOUNT = 30;

var timertype = "modal";

var t, count;

function cddisplay() {
    // displays time in span
    if (timertype == "modal") {
        $("#timer").html(count + " secs");
        console.log(timertype);

    } else if (timertype == "nextq") {
        // I should figure out the proper thing here
        console.log(timertype);

    }
}

function countdown() {

    cddisplay();
    if (count == 0 && timertype == "modal") {
        // time is up, trigger modal
        $('#myModal').modal('show');
        $('#timer').empty();
        $('.modal-body').empty();
        // these next two duplicate each other in a way, but i like it
        $('#explanation').html('<strong>No Answer! But FYI:</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        $('#myModal').find('.modal-body').prepend('<strong>No Answer! But FYI:</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        $('#choice-block').empty();
        // after modal launch, trigger countdown until it's cleared
        timertype = "nextq";
        cdreset();
        countdown();

    } else if (count == 22 && timertype == "nextq") {
        // abbrieviated coundown to modal close and next question
        $('#choice-block').empty();
        processQuestion();
        timertype = "modal";
        $('#myModal').modal('hide');

    } else {
        // normal countdown
        count--;
        t = setTimeout("countdown()", 1000);
    }
}

function cdpause() {
    // pauses countdown
    clearTimeout(t);
}

function cdreset() {
    // resets countdown
    cdpause();
    count = CCOUNT;
    cddisplay();
}
