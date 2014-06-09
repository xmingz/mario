
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
	this.spriteSheetAnim2;
    this.back;
    this.turning="";
    this.forward=false;//move forward
    this.backward=false;//move backward
    this.x = 1;
    this.y = 1;
    this.dx = 4;
    this.dy = 4;
   
   this.start = new TGE.Button().setup({
         
            text: "Press Start ",    
            x:1100,
            y:100,
            pressFunction:this.startgame.bind(this),
    });

    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:2,
        rows:1,
        totalFrames:2,
        fps:5,
        x: 320,
        y: 240,
    });
	
	 this.spriteSheetAnim2 = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg2",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:20,
        x: Math.random()*this.width,
        y: Math.random()*this.height,
    });

  
    
    this.back = new TGE.Sprite().setup({
		image:"back",
		x:640,
		y:320,
		width:this.width+200,
		height:this.height+200,
	});

	this.addChild(this.back);
    this.addChild(this.start);
    //add the start button
    this.addChild(this.spriteSheetAnim);
    this.addChild(this.spriteSheetAnim2);
   

    
}


GameScreen.prototype =
{
    playAnim: function(){
        this.spriteSheetAnim.play();
		this.spriteSheetAnim2.play();
        
    },

    startgame: function(){
    this.spriteSheetAnim.addEventListener("keydown",this.SetStatusofSpider.bind(this));
    this.spriteSheetAnim.addEventListener("keyup",this.resetStatusofSpider.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.upDateSpider.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.collision.bind(this));
    this.spriteSheetAnim2.addEventListener("update",this.Move.bind(this)); 
		//start the game after the start button is press
    },

    SetStatusofSpider:function(event){
        var spider=event.currentTarget;
        
     	if(event.keyCode == 37){
     		this.turning="left"
        }
          
     	if(event.keyCode == 39){
     		this.turning="right"
        }
          
        if(event.keyCode == 38){
            this.forward=true;
        }

         if(event.keyCode == 40){
            this.backward=true;
        }
     },

     resetStatusofSpider:function(event){
        if(event.keyCode==37 || event.keyCode==39){
            this.turning="";
        }
        if(event.keyCode==38){
            this.forward=false;
        }
        if(event.keyCode==40){
            this.backward=false;
        }
     },

     upDateSpider:function(event){
        var spider=event.currentTarget;
        if(this.turning=="left")
            spider.rotation-=6;
        if(this.turning=="right")
            spider.rotation+=6;
        if(this.forward){
            var distance=6;
            var theta=(spider.rotation-90)*Math.PI/180;
            spider.x+=distance*Math.cos(theta);
            spider.y+=distance*Math.sin(theta);
        }
        if(this.backward){
            var d=6;
            var t=(spider.rotation-90)*Math.PI/180;
            spider.x-=d*Math.cos(t);
            spider.y-=d*Math.sin(t);
        }
        //mario's turn

        if(this.turning != "" || this.forward||this.backward){
            spider.play();
        }else{
            spider.stop();
        }
        //move of the mario


        if(spider.x <= 0){
            spider.x=0
        } else if (spider.x >= this.width){
            spider.x=this.width;
        }
        if(spider.y <= 0){
            spider.y=0
        } else if (spider.y >= this.height){
            spider.y=this.height;
        }  
        //the bounce of the mario in the screen
     },

     

    

     collision:function(event){
        if((this.spriteSheetAnim.x<=(this.spriteSheetAnim2.x+55)&&this.spriteSheetAnim.x>=(this.spriteSheetAnim2.x-55))&&(this.spriteSheetAnim.y<=(this.spriteSheetAnim2.y+55)&&this.spriteSheetAnim.y>=(this.spriteSheetAnim2.y-55))){
           //collision
           this.spriteSheetAnim2.x= Math.random()*this.width,
           this.spriteSheetAnim2.y= Math.random()*this.height,
            this.dx++;
            this.dy++;
            //incresase the speed whenever the two spritesheet collide
         }
    },


     

     Move:function(event){
        //move of the mushroom 
        var mushroom = event.currentTarget;
        mushroom.x += this.dx;
        mushroom.y += this.dy;
        if(mushroom.x <= 0 || mushroom.x >= this.width)
            this.dx *= -1;
        if(mushroom.y <= 0 || mushroom.y >= this.height)
            this.dy *= -1;
        
    }

    
}
    
extend(GameScreen,TGE.Window);