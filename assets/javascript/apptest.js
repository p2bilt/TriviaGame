   	var questions = [

["mc", "What secret name do Harry, Ron and Hermione use to refer to Sirius Black?", "Scabbers", "Snuffles", "Griphook", "Prongs", "B"],
["mc", "What magical object causes people to turn orange or sprout tentacle-like warts?", "Metamorph-Medals", "The Mirror or Erised", "Decoy Detonators", "U-No-Poo", "A"],
["mc", "What is the only antidote to Basilisk venom?", "Phoenix Tears", "Mandrake Draught", "Dragon's Blood", "A Bezoar", "A"],
["mc", "What is the Symbol for Gryffindor House?", "A Badger", "An Eagle", "A Lion", "An Elk", "C"],
["mc", "Dumbledore is famous for single-handedly defeating and imprisoning which Dark wizard before Voldemort goes on to kill him?", "Lucius Malfoy", "Igor Karkaroff", "Gellert Grindelwald", "Amycus Carrow", "C"],
["mc", "When is Harry Potter's birthday?", "30th July", "31st August", "31st July", "30th June", "C"],
["mc", "Which item is enchanted to help a student cheat on an exam?", "A Pocket Sneakoscope", "A Deluminator", "A Howler", "Detachable Cribbing Cuff", "D"],
["mc", "When Harry Potter reaches the end of the Triwizard Tournament, who sadly dies?", "Viktor Krum", "Fleur Delacour", "Cedric Diggory", "Colin Creevey", "C"]
];


      var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0; 
      var tries = 0; //keeps track of how many times student attempts problem
      // var type = ""; 
      function _(x) {
        return document.getElementById(x);
      }

      //create a multiple-choice function
      function renderQuestion() {
        test = _("baraja-el");
        // once all questions answered, print student results to screen
        if (pos >= questions.length) {
          test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
          _("test_status").innerHTML = "O.W.L.s Completed";
          // reset game variables
          pos = 0;
          correct = 0;
          return false;
        }
        _("test_status").innerHTML = "Question " + (pos+1) + " of " + questions.length;
        question = questions[pos][1];
        chA = questions[pos][2];
        chB = questions[pos][3];
        chC = questions[pos][4];
        chD = questions[pos][5];
        // $(test).append("<h3>"+question+"</h3>");
        // $(test).append("<input type='radio' name = 'choices' value='A'> "+chA+"<br>");
        // $(test).append("<input type='radio' name = 'choices' value='B'> "+chB+"<br>");
        // $(test).append("<input type='radio' name = 'choices' value='C'> "+chC+"<br>");
        // $(test).append("<input type='radio' name = 'choices' value='D'> "+chD+"<br><br>");
        // $(test).append("<button onclick='checkAnswer()'>Submit</button>");
            $(test).append("<li name='choices' data-value='A'><h4>"+chA+"</li></h4>");
            $(test).append("<li name='choices' data-value='B'><h4>"+chB+"</li></h4>");
            $(test).append("<li name='choices' data-value='C'><h4>"+chC+"</li></h4>");
            $(test).append("<li name='choices' data-value='D'><h4>"+chD+"</li></h4>");
        console.log("current question = " + (pos+1));
        count=30;
        timer(); 
      }

      // renderQuestion();

      // //create a diagram question
      // function renderDiagram() {
      //   console.log("we're in renderDiagram");
      //   _("test_status").innerHTML = "Question " + (pos+1) + " of " + questions.length;
      //   question = questions[pos][1];
      //   test.innerHTML = "<h3>"+question+"</h3>";
      //   test.innerHTML += "<img id = 'q_diagram' src =" + questions[pos][2] + " alt='Sorry, could not load image.' usemap = 'ponytail' usemap = 'frontalCortex' ></img>";
      //   test.innerHTML += "<map name = 'ponytail'> <area shape='poly' coords='427,33, 456,12, 506,5, 573,38, 578,219, 576,330, 599,377, 618,517, 598,560, 539,446, 459,371, 467,290, 463,104, 423,26' alt='ponytail face' href='javascript: alert(\"Yes you can!\")'> <area shape = 'poly' coords='167,232, 116,193, 113,135, 162,84, 231,65, 324,74, 267,182' href='javascript: alert(\"No, idiot that is the frontal cortex!\")'> ";
      // }

      function checkAnswer(){

        choices = document.getElementsByName("choices");//get all the choices
        console.log(choices.dataset);
        for (var i=0; i<choices.length; i++) { //traverse through the choices
          if (choices[i].checked) {            //check which choice the student chose
            choice = choices[i].value;         //set student's choice to var choice
            if (choice == questions[pos][6]) { //check if student's choice is correct
              alert("Correct");
              correct++;  
              tries = 0;
              pos++;
              $(test).empty();      
            } else if (choice != questions[pos][6] && tries < 1) {
              tries++;
              console.log("tries = " + tries);
              alert("Try again");
              $(test).empty();
              //need to somehow display the same question again 
            } else if (choice != question[pos][6] && tries >= 1) {
              tries = 0;
              pos++;
              alert("Incorrect");
              $(test).empty();
            }
            renderQuestion();
          }
        }
      }


      window.addEventListener("load", renderQuestion, false);


      // https://stackoverflow.com/questions/1191865/code-for-a-simple-javascript-countdown-timer

var count=30;
// var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
var counter=setInterval(timer, 1000); 

function timer()
{
  count=count-1;
  if (count <= -1)
  {
     clearInterval(counter);
              tries = 0;
              pos++;
              alert("You've run out of time! Try this next question");
              $(test).empty();     
              renderQuestion();
              return;
  }

  //Do code for showing the number of seconds here
   document.getElementById("timer").innerHTML=count + " secs"; // watch for spelling

}



      