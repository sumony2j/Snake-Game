function reload()
{
    location.reload();
}
var canvas=document.querySelector("canvas");
canvas.width=window.innerWidth-200;
canvas.height=window.innerHeight-200;
var c=canvas.getContext("2d");
window.addEventListener('resize',function(){
                                                canvas.width=window.innerWidth-200;
                                                canvas.height=window.innerHeight-200;
                                                location.reload();
                                            });
function randomint(min,max)
{
    return (Math.round(Math.random() * (max-min) + min));
}
function snake(x,y,w,h,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
    this.create=function() {
                              c.beginPath();
                              c.rect(this.x,this.y,this.w,this.h);
                              c.fillStyle=this.color;
                              c.fill();
                           }
    this.moveright=function(){
                               this.x+=16;
                             }                                                                                 
    this.movedown=function(){
                               this.y+=16;
                            }
    this.moveup=function(){
                               this.y-=16;
                          }
                             
    this.moveleft=function(){
                               this.x-=16;
                          }
                         
                       };
var s=[];
function createsnake()
{
    x=100;
    y=100;
    w=15;
    h=15;
    for(i=0;i<2;i++)
        {
              s[i]=new snake(x,y,w,h,"green");
              x=x+w+1;
        }
}
function show()
{
    for(i=0;i<s.length;i++)
        {
            s[i].create();
        }
}
var a,b,w,h;
var d=0;
function createfood()
{
     a=randomint(50,canvas.width-20);
     b=randomint(50,canvas.height-20);
     c.beginPath();
     c.rect(a,b,w,h);
     c.fillStyle="blue";
     c.fill();
}
function over()
{
   var img=document.getElementById("image");                                                                                
   c.drawImage(img,0,0,canvas.width,canvas.height);
   setTimeout(function(){location.reload();},15000);
   alert("Your Final Score Is :"+d);
}
var dr=0,dl=0,du=0,dd=0;  
     window.addEventListener('keydown',function(event)
                           {                                 
                               c.clearRect(0,0,canvas.width,canvas.height);
                               c.beginPath();
                               c.rect(a,b,w,h);
                               c.fillStyle="blue";
                               c.fill();
                               if(event.keyCode==39 && dl==0)
                                  { 
                                       dr=1;
                                       du=0;
                                       dd=0;
                                      for(i=0;i<s.length-1;i++)
                                         {
                                             s[i].x=s[i+1].x;
                                             s[i].y=s[i+1].y;
                                         }
                                      s[s.length-1].moveright();
                                      show();
                                  }
                                else if(event.keyCode==40 && du==0)
                                  { 
                                       dl=0;
                                       dd=1;
                                       dr=0;
                                           
                                      for(i=0;i<s.length-1;i++)
                                         {
                                             s[i].x=s[i+1].x;
                                             s[i].y=s[i+1].y;
                                         }
                                      s[s.length-1].movedown();
                                      show();
                                  }
                                else if(event.keyCode==38 && dd==0)
                                  { 
                                       dl=0;
                                       dr=0;
                                       du=1;
                                      for(i=0;i<s.length-1;i++)
                                         {
                                             s[i].x=s[i+1].x;
                                             s[i].y=s[i+1].y;
                                         }
                                      s[s.length-1].moveup();
                                      show();
                                  }
                                else if(event.keyCode==37 && dr==0)
                                  {
                                      dl=1;
                                      du=0;
                                      dd=0;
                                      for(i=0;i<s.length-1;i++)
                                         {
                                             s[i].x=s[i+1].x;
                                             s[i].y=s[i+1].y;
                                         }
                                      s[s.length-1].moveleft();
                                      show();
                                                                     
                                  }
                                else{
                                      alert("Press Right Keys Only");
                                      show();
                                    }
                                if(s[s.length-1].x<a+w && s[s.length-1].x+s[s.length-1].w>a && s[s.length-1].y<b+h && s[s.length-1].y+s[s.length-1].h>b)
                                   {   
                                        c.clearRect(a,b,w,h);
                                        if(event.keyCode==39)
                                            {
                                                var p=new snake(s[0].x-s[0].w-1,s[0].y,w,h,"white");
                                               
                                            }
                                        if(event.keyCode==40)
                                            {
                                                var p=new snake(s[0].x,s[0].y-s[0].w-1,w,h,"white");
                                               
                                            }
                                       if(event.keyCode==37)
                                           {
                                               var p=new snake(s[0].x+s[0].w+1,s[0].y,w,h,"white");
                                               
                                           }
                                       if(event.keyCode==38)
                                           {
                                               var p=new snake(s[0].x,s[0].y+s[0].h+1,w,h,"white");
                                           }
                                        s.unshift(p);
                                        show();
                                        createfood();
                                        d+=1;
                                        document.getElementById("Score").value=d;
                                    }
                                 for(j=0;j<s.length-1;j++)
                                     {
                                         if(s[s.length-1].x<s[j].x+s[j].w && s[s.length-1].x+s[s.length-1].w>s[j].x && s[s.length-1].y<s[j].y+s[j].h && s[s.length-1].y+s[s.length-1].h>s[j].y)
                                             { 
                                                over();                                             
                                             }
                                     }
                                if(s[s.length-1].x+s[s.length-1].w<=0 || s[s.length-1].y<=0 || s[s.length-1].x+s[s.length-1].w>=canvas.width || s[s.length-1].y>=canvas.height)
                                     { 
                                         over();
                                     }                                                                              
                                
                                
                           });
     

createsnake();
show();
createfood();

