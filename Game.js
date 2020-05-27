
        function drawTable()
        {
             for(var i=0;i<8;i++)
            {
                 $("table").append("<tr id='tr"+i+"'></tr>")
                for(var j=0;j<7;j++)
                {
                    $("tr[id='tr"+i+"']").append("<td id='td"+j+"'></td>")
                }
            }
        }
        function getRandom()
        {
          return Math.floor(Math.random()*7);
        
        }
        function getTargetTr(td)
       {
        var targetTr=0;   
        var tds=$("tr #td"+td) ;
         for(var i=1;i<8;i++)
         {
            if(tds[i].className == _class1 || tds[i].className == _class2)
            {
                break;
            }
            targetTr=i;
         } 
         return targetTr;
        }  
        function checkVertical(_class,_td,_tr)
        {   
         if(_tr>4) return false;
         
         var counter=0;
         for(var i=_tr;i<=(_tr+3);i++)
         {   
            if($("#tr"+i+" #td"+_td)[0].className ==_class)
             {
                counter++;
             }
             else 
             return false;
         }//for end
          if(counter==4)
          return true;

          else
           return false;
        }//checkVertical end
        function checkHorizontal(_class,_tr)
        {   
            var counter=0;
         for(var i=0;i<=6;i++)
         {   
            if($("#tr"+_tr+" #td"+i)[0].className ==_class)
             {
                counter++;
                if(counter==4)
                 return true;

             }
             else 
                counter=0;
         }//for end
          if(counter==4)
          return true;

          else
           return false;
        }//checkHorizontal end

        function checkDiagonal(_class,_td,_tr)
        {
          var oldtd=_td;
          var oldtr=_tr;
          var counter=0;
        //check Diagonal like \
          while(_tr!=0 && _td!=0 )
          {
            
              _td--;_tr--;
            //  console.log("td : "+_td+"tr : "+_tr);
              
            }
            while(_tr!=8 && _td!=7)
            {
                if($("#tr"+_tr+" #td"+_td)[0].className ==_class)
                {
               counter++;
                }
           else 
           counter=0;

           _tr++;
           _td++;
          }
          if(counter==4)
          return true;
          //check Diagonal like /
          else
          {
                while(oldtr!=7 && oldtd!=0 )
                 {
                    oldtd--;oldtr++;
                 }
                 counter=0;
                 while(oldtr!=0 && oldtd!=7)
                {
                   if($("#tr"+oldtr+" #td"+oldtd)[0].className ==_class)
                     {
                      counter++;
                      if(counter==4)
                         return true;
                
                     }
                     else 
                     counter=0;

                     oldtr--;
                     oldtd++;
                 }
                 if(counter==4)
                 return true;
                 else 
                 return false;

          }          
        }//checkDiagonal end        
        
         function  checkWin(_class,_td,_tr)
        {
            if(_class=="yellow" && (checkVertical(_class,_td,_tr) || checkHorizontal(_class,_tr) || checkDiagonal(_class,_td,_tr)))
            {
            
                if(confirm("Congratulations...you win!..Do you want to play again??"))
                  location.reload();
                else
                location.href = "Welcome.html";
              
            }         
            else if(_class=="red" && (checkVertical(_class,_td,_tr) || checkHorizontal(_class,_tr) || checkDiagonal(_class,_td,_tr)))
            {
              if(confirm("Oops...Time is up...Game Over! ..Do you want to play again?"))

              location.reload();
            else
            location.href = "Welcome.html";
                
              
                   
            }  
        }//checkWin end
        //load
        $(function(){
          
          $("#user").text(localStorage.getItem("username"));//using local storage
          //start
          $("#btnstart").click(function(){
            $("#btnstart").hide();  
          //timer
          var timer=60;
          $("#couter").text(timer);
          var id=setInterval(function(){
            timer--;
            $("#couter").text(timer);
            if(timer<=0) 
            {
              if(timer<=0) 
            {
           
              if(confirm("Oops...Time is up...Game Over! ..Do you want to play again?"))
                  location.reload();
              else
                  location.href = "Welcome.html";  

            }
                clearInterval(id);
            }
          }, 1000);
           
               _class1="yellow";
               _class2="red";
               drawTable();
                $("#tr0 #td3").addClass(_class1).css({'visibility': 'visible'});
               td=3;
           $(document).keydown(function(e) {
           switch (e.which) {
           case 37://move left
               if(td>0)
              {
               $("#tr0 #td"+td).removeClass(_class1).css({'visibility': 'hidden'});
               td--;
               $("#tr0 #td"+td).addClass(_class1).css({'visibility': 'visible'});
              }
               break;
           case 39://move right
           if(td<6)
              {
               $("#tr0 #td"+td).removeClass(_class1).css({'visibility': 'hidden'});
               td++;
               $("#tr0 #td"+td).addClass(_class1).css({'visibility': 'visible'});
              }
               break;
            case 32 : 
                // your turn
                targetTr1=getTargetTr(td);
                if(targetTr1==0 ) //is full
                   break;
              //drop ball
      
                $("#tr0 #td"+td).removeClass(_class1);
                $("#tr"+targetTr1+" #td"+td).addClass(_class1); 
                $("#tr0 #td"+td).addClass(_class1);
              //check win
              checkWin(_class1,td,targetTr1);
              //computer turn
              tdrandom=getRandom();
              targetTr2=getTargetTr(tdrandom);
              while(targetTr2 ==0)
               {
                   tdrandom=getRandom();
                  
                   targetTr2=getTargetTr(tdrandom);
               }
               $("#tr"+targetTr2+" #td"+tdrandom).addClass(_class2);
                
                setTimeout(function(){
           
               checkWin(_class2,tdrandom,targetTr2);
             },3000)    
          
               break;
            }
       })//end of space
      })
               })//end of load
       