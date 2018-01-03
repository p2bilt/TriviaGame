var q1 = {
question:"What magical object causes people to turn orange or sprout tentacle-like warts?", 
ans1:"Metamorph-Medals", 
ans2:"The Mirror or Erised", 
ans3:"Decoy Detonators",
ans4:"U-No-Poo",
truAns:"ans1"};


document.getElementById("questionBit").innerHTML=q1.question; 
// document.getElementById("answer1").innerHTML=q1.ans1; 
// document.getElementById("answer2").innerHTML=q1.ans2; 
// document.getElementById("answer3").innerHTML=q1.ans3; 
// document.getElementById("answer4").innerHTML=q1.ans4; 

elems = Object.keys(q1);

for (var i = 0; i < elems.length; i++) {
  document.write(`Key: ${elems[i]}, Value: ${q1[elems[i]]}<br>`);
}

for (var i = 1; i < 5; i++) {
  document.write(`${q1[elems[i]]}<br>`);
}

for (var i = 1; i < 5; i++) {
	document.getElementById("answer[i]").innerHTML=(`${q1[elems[i]]}<br>`);
}

// https://stackoverflow.com/questions/1191865/code-for-a-simple-javascript-countdown-timer

var count=30;

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{
  count=count-1;
  if (count <= -1)
  {
     clearInterval(counter);
     //counter ended, do something here
     return;
  }

  //Do code for showing the number of seconds here
   document.getElementById("timer").innerHTML=count + " secs"; // watch for spelling

}