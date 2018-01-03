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
         "explanation": "Harry, Ron and Hermione create this code name to refer to Sirius Black while he is in Animagus form, that of a black dog.",
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
         "explanation": "First mentioned by Arthur Weasley in the Half-Blood Prince, these scam objects, far from helping the wearer metamorph, often backfire dramatically.",
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
         "explanation": "Luckily, after being bit by a Basilisk, Harry has quick access to the tears of sympathetic Phoenix raised by Albus Dumbledore.",
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
         "explanation": "A transparent metaphor for the bravery of this house's members, this symbol was personally chosen by Godric Gryffindor himself.",
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
         "explanation": "xxxxxxx",
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
         "explanation": "xxxxxxx",
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
         "explanation": "When Cedric Diggory accidentally falls into Voldemort's trap, ",
     },

 ];

 // Set our variables
 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

 // // do you need this? interesting trick
 //  function _(x) {
 //      return document.getElementById(x);
 //  }



 $(document).ready(function() {

     // hide the next question button
     $("#submitbutton").hide();


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }

     // create the different answer 'buttons'
     function addChoices(choices) {
        // empty out old buttons, is this needed?
         // $('#choice-block').empty();
         for (var i = 0; i < choices.length; i++) {
             $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
         }

     }

     function nextQuestion() {
         submt = true;
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);

         addChoices(quiz[currentquestion]['choices']);
         setupButtons();
         // new question triggers countdown reset, make sure
         cdreset();
         countdown("modal");
     }


     function processQuestion(choice) {

         currentquestion++;

         $("#submitbutton").hide();

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
                 $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                 score++;
                 $('#timer').empty();
                 $('#choice-block').empty();
                 // reset timer, trigger next question countdown
                 cdreset();
                 countdown();
                 timertype = "nextq";
             } else {
                 $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                 $('#timer').empty();
                 $('#choice-block').empty();
                 cdreset();
                 countdown();
                 timertype = "nextq";
             }
             $("#submitbutton").show();

             if (submt) {
                 submt = false;

                 $("#submitbutton").click(function() {
                     // alert("click");
                     $('.choice').off('click');
                     $(this).off('click');
                     processQuestion(choice);
                 });
             }
         })
     }


     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         $('#submitbutton').remove();
         $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
     }


     function init() {
         //add first question tracker and questions

         //add pager (question tracker)
         $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         // $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
         //add first question
         $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
         //add image if present
         // if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
         //     $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
         // }
         // $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

         //questions holder
         $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

         //add choices
         addChoices(quiz[0]['choices']);

         //add submit button
         $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Next Question').css({
             'font-weight': 700,
             'color': '#222',
             'padding': '30px 0',
         }).appendTo('#frame');

         $("#submitbutton").hide();

         setupButtons();
         // timer
         cdreset();
         countdown("modal");
         $('#myModal').modal({ show: false });
     }

     $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
     $(document.createElement('li')).addClass('begin choice choice-box').text("BEGIN GAME").appendTo('#choice-block');

     $('.begin').on('click', function() {
         $('#frame').empty();
         init();

     });


 });



 var CCOUNT = 30;

 var t, count, timertype;

 function cddisplay() {
     // displays time in span
     document.getElementById('timer').innerHTML = count + " secs";
 }

 function countdown(timertype) {

     cddisplay();
     if (count == 0 && timertype == "modal") {
         // time is up, trigger modal
         $('#myModal').modal('show');
     } else if (count == 26 && timertype == "nextq") {
         // figure out how to trigger next question
         console.log("switch to next q");
         timertype = "modal";
     } else {
         // countdown
         count--;
         console.log(timertype);
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