 var quiz = [{
         "question": "What secret name do Harry, Ron and Hermione use to refer to Sirius Black?",
         "image": "",
         "choices": [
             "Scabbers",
             "Snuffles",
             "Griphook",
             "Prongs"
         ],
         "correct": "Snuffles",
         "explanation": "Albert Einstein drafted the special theory of relativity in 1905.",
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
         "explanation": "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note.",
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
         "explanation": "xxxxxxx",
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
         "explanation": "xxxxxxx",
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
         "explanation": "xxxxxxx",
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
         "explanation": "xxxxxxx",
     },

 ];

// Set our variables
 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

// do you need this? interesting trick
 function _(x) {
     return document.getElementById(x);
 }



 $(document).ready(function() {

// hide the next question button
     $("#submitbutton").hide();


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         // if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         // }
     }

     function nextQuestion() {
         submt = true;
         // alert("nQ");
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         // $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         // if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
         //     if ($('#question-image').length == 0) {
         //         $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
         //     } else {
         //         $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
         //     }
         // } else {
         //     $('#question-image').remove();
         // }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();
         timer();


     }


     function processQuestion(choice) {
         // alert(choice);
         currentquestion++;
         // alert(currentquestion);
         $("#submitbutton").hide();

         if (currentquestion == quiz.length) {
             endQuiz();
         } else {

             nextQuestion();
         }

     }


     function setupButtons() {
         // $('.choice').on('mouseover', function () {
         //     $(this).css({
         //         'background-color': '#e1e1e1'
         //     });
         // });
         // $('.choice').on('mouseout', function () {
         //     $(this).css({
         //         'background-color': '#fff'
         //     });
         // })
         $('.choice').on('click', function() {
             // alert("");
             choice = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             // $(this).css({
             //     'border-color': '#222',
             //     'font-weight': 700,
             //     'background-color': '#c1c1c1'
             // });
             if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
                 // $('.choice').eq(choice).css({
                 //     'background-color': '#50D943'
                 // });
                 $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                 score++;
                 $('#timer').empty();
                 counter = setInterval(timer, 0);
             } else {
                 // $('.choice').eq(choice).css({
                 //     'background-color': '#D92623'
                 // });
                 $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
             }
             $("#submitbutton").show();
             if (submt) {
                 // alert("submit");
                 submt = false;
                 // $('#submitbutton').css({
                 //     'color': '#000'

                 // });
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
         //add title
         // if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
         //     $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
         // } else {
         //     $(document.createElement('h1')).text("Quiz").appendTo('#frame');
         // }

         //add pager and questions

         //add pager (question tracker)
         $("#test_status").html('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         // $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
         //add first question
         $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
         //add image if present
         // if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
         //     $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
         // }
         $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

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
         counter = setInterval(timer, 1000);
     }

$(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
$(document.createElement('li')).addClass('begin choice choice-box').text("BEGIN GAME").appendTo('#choice-block');

$('.begin').on('click', function() {
$('#frame').empty(); 
 init();

});


    
 });

 // https://stackoverflow.com/questions/1191865/code-for-a-simple-javascript-countdown-timer

 var count = 30;
 // var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
 var counter;

 function timer() {
     count = count - 1;
     if (count <= -1) {
         clearInterval(counter);
         tries = 0;
         pos++;
         // alert("You've run out of time! Try this next question");
         // $(test).empty();     
         // renderQuestion();
         return;
     }

     //Do code for showing the number of seconds here
     document.getElementById("timer").innerHTML = count + " secs"; // watch for spelling

 }
