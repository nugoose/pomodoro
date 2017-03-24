//http://www.ziiiro.com/
//modal code from here - http://inspirationalpixels.com/tutorials/custom-popup-modal
//https://www.audioblocks.com/stock-audio/creepy-reversed-glass-sound.html
//sounds from https://notificationsounds.com/

$(document).ready(function(){
  var randomNum, timerStuff, breakStuff, theHours, theMins, theSecs, timeCounter, resetMe;
  var colorChange = 0; //0 is green, 1 is red
  
  //break button
  //add break mins - add limit?
  $('#addBreakMins').click(function(){
    randomNum = document.getElementById('breakMins').innerHTML;
    randomNum = Number(randomNum) + 1;
    $('#breakMins').html(randomNum);
  });
  //remove break mins
  $('#removeBreakMins').click(function(){
    randomNum = document.getElementById('breakMins').innerHTML;
    if(randomNum > 1){
      randomNum = Number(randomNum) - 1;
      $('#breakMins').html(randomNum);
    }
    else{
      openPopup('popup-1');
    }
  });
  
  //timer button
  //add timer mins - add limit?
  $('#addTimerMins').click(function(){
    randomNum = document.getElementById('timerMins').innerHTML;
    randomNum = Number(randomNum) + 1;
    $('#timerMins').html(randomNum);
  });
  //remove timer mins
  $('#removeTimerMins').click(function(){
    randomNum = document.getElementById('timerMins').innerHTML;
    if(randomNum > 1){
      randomNum = Number(randomNum) - 1;
      $('#timerMins').html(randomNum);
    }
    else{
      openPopup('popup-2');
    }
  });
  
  //main timer frame
  $('#mainFrame').click(function(){
    clearInterval(resetMe);
    //if color is green, reset as timer mins, else, as break mins
    if(colorChange === 0){
      timerStuff = document.getElementById('timerMins').innerHTML;
    }
    else{
      timerStuff = document.getElementById('breakMins').innerHTML;
    }
    
    timerStuff = Number(timerStuff);
    theHours = Math.floor(timerStuff / 60);
    theMins = timerStuff % 60;
    theSecs = 0;
    setTimer(theSecs, theMins, theHours);
    resetMe = setInterval(countdown, 1000);
  });
  
  //countdown
  function countdown(){
    if($('#theHours').length)
      theHours = document.getElementById('theHours').innerHTML;
    else
      theHours = 0;
    if($('#theMins').length)
      theMins = document.getElementById('theMins').innerHTML;
    else
      theMins = 0;
    if($('#theSecs').length)
      theSecs = document.getElementById('theSecs').innerHTML;
    else
      theSecs = 0;
    theHours = Number(theHours);
    theMins = Number(theMins);
    theSecs = Number(theSecs);
    
    if(theSecs === 0){
      if(theMins === 0){
        if(theHours === 0){
          clearInterval(resetMe);
          
          //color change with corresponding popup and new timer/break
          if(colorChange === 0){        
            $('#timeLeft').css('color', '#ff3333');
            colorChange = 1;
            openPopup('popup-3');
            breakStuff = document.getElementById('breakMins').innerHTML;
          }
          else{
            $('#timeLeft').css('color', '#47d147');
            colorChange = 0;
            openPopup('popup-4');
            breakStuff = document.getElementById('timerMins').innerHTML;
          }
          
          //audio
          //https://notificationsounds.com/wake-up-tones/early-sunrise-517/download/mp3
          var audio = new Audio('https://notificationsounds.com/wake-up-tones/soft-bells-495/download/mp3');
          audio.play();
          
          breakStuff = Number(breakStuff);
          theHours = Math.floor(breakStuff / 60);
          theMins = breakStuff % 60;
          theSecs = 0;
          setTimer(theSecs, theMins, theHours);
          resetMe = setInterval(countdown, 1000);
        }
        else{
          theHours -= 1;
          theMins = 59;
          theSecs = 59;
        }
      }
      else{
        theMins -= 1;
        theSecs = 59;
      }
    }
    else{
      theSecs -= 1;
    }
      
    setTimer(theSecs, theMins, theHours);
  }//countdown function
  
  //setTimer
  function setTimer(s,m,h){
    if(h > 0){
    if(h > 0 && m < 10 && s < 10){
      timeCounter = '<span id="theHours">' + h + '</span> : <span id="theMins">0' + m + '</span> : <span id="theSecs">0' + s + '</span>';
    }
    else if(h > 0 && m < 10 && s >= 10){
      timeCounter = '<span id="theHours">' + h + '</span> : <span id="theMins">0' + m + '</span> : <span id="theSecs">' + s + '</span>';
    }
    else if(h > 0 && m >= 10 && s < 10){
      timeCounter = '<span id="theHours">' + h + '</span> : <span id="theMins">' + m + '</span> : <span id="theSecs">0' + s + '</span>';
    }
    else if(h > 0 && m >= 10 && s >= 10){
      timeCounter = '<span id="theHours">' + h + '</span> : <span id="theMins">' + m + '</span> : <span id="theSecs">' + s + '</span>';
    }
    }
    else if(m > 0){
    if(m < 10 && s >= 10){
      timeCounter = '<span id="theMins">0' + m + '</span> : <span id="theSecs">' + s +'</span>';
    }
    else if(m >= 10 && s < 10){
      timeCounter = '<span id="theMins">' + m + '</span> : <span id="theSecs">0' + s +'</span>';
    }
    else if(m < 10 && s < 10){
      timeCounter = '<span id="theMins">0' + m + '</span> : <span id="theSecs">0' + s +'</span>';
    }
    else if(m >= 10 && s >= 10){
      timeCounter = '<span id="theMins">' + m + '</span> : <span id="theSecs">' + s +'</span>';
    }
    }
    else{
    if(s >= 10){
      timeCounter = '<span id="theSecs">' + s +'</span>';
    }
    else{
      timeCounter = '<span id="theSecs">0' + s +'</span>';
    }
    }
    
    //display the timer
    $('#timeLeft').html(timeCounter);  
    
  }//set timer function
  
  //modal stuff
  //----- OPEN
  function openPopup(thisGuy){
        $('[data-popup="' + thisGuy + '"]').fadeIn(350);
  }

    //----- CLOSE
    $('[data-popup-close]').click(function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
  
});