(function($){

    function SpriteAnimator(param) {
        var SA = this;
        /*
            param {
                id  : "name"
                fps : "frames per second"
                dir : "direction basic: ltr/rtl
                stop: "stop second"
            }
        */

        SA.config = {//defaults
            id   :  '',
            fps  :  30,
            dir  : 'ltr',
            stop : {frame:null, callback:null},
            loop : false,
            startFrame : 0,
            endFrame   : -1,
            state      : 'play',
            settings   : {

            }
        };

        for(var x in param)//if different add new
        {
                if(param[x] !== SA.config[x])
                {
                    SA.config[x] = param[x];
                }
        }

        SA.sprite = {// Sprite object holder this is a temp spot
            spriteWidth  : null,
            spriteHeight : null,
            state        : SA.config.statet,
            curFrame     : SA.config.startFrame,
            endFrame     : SA.config.endFrame,
            spriteID     : null

        };

        this.init();
    }

    SpriteAnimator.prototype = {
        init: function(){
            var SA = this;
            log(SA.config.stop);
            SA.getCSS();
            SA.setAnimate();
        },
        getCSS: function()
        {
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;

            sprite.spriteWidth = parseInt($(cfg.id).css('width'),10), sprite.spriteHeight = parseInt($(cfg.id).css('height'),10);
            log(sprite.spriteWidth);
            log(sprite.spriteHeight);
        },
        setAnimate: function(){
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;

            //if(sprite.state == 'stop' || sprite.state == null)
            //{
                SA.animation();
            //}

        },
        animation: function()
        {
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;

                if(SA.sprite.state !== 'stop'){
                    sprite.spriteID =    setInterval(looper,1000/cfg.fps);
                }

            

            function looper()
            {
                var direction;
                //log(sprite.curFrame);
                if(cfg.dir === 'ltr' || cfg.dir === 'rtl')
                {
                    (cfg.dir !== 'ltr') ? direction = '-' : direction = '';

                    $(cfg.id).css('background-position' , direction+(sprite.curFrame * sprite.spriteWidth)+'px 0px');

                }else if (cfg.dir === 'utb' || cfg.dir === 'btu')
                {
                    (cfg.dir !== 'utb') ? direction = '' : direction = '-';

                    $(cfg.id).css('background-position' , '0px '+ direction+(sprite.curFrame * sprite.spriteHeight)+'px');

                }

                SA.sprite.state = 'play';
                sprite.curFrame = sprite.curFrame + 1;
                clearInterval(sprite.spriteID);
                if(cfg.stop.frame !==sprite.curFrame)
                {
                    if(sprite.curFrame == sprite.endFrame && !cfg.loop)
                    {
                        //alert('asd');
                        clearInterval(sprite.spriteID);
                        SA.sprite.state = 'stop';
                    }else if(sprite.curFrame == sprite.endFrame && cfg.loop)
                    {
                        sprite.curFrame = 0;
                    }
                }else if (cfg.stop.frame === sprite.curFrame){

                    //clearInterval(sprite.spriteID);
                    if($.isFunction(cfg.stop.callback))
                    {
                        //log(sprite.spriteID);
                        //sprite.curFrame = cfg.stop.callback();
                        
                        //SA.setAnimate();


                    }
                }
                //log(sprite.curFrame+' '+cfg.stop.frame);
                SA.setAnimate();
            }
        }
    };

    function log(str){
        console.log(str);
    }

    $(document).ready(function(){

        var mySprite = new SpriteAnimator({id:'#test',fps:'12',dir:'utb',endFrame:66,loop:true, stop:{frame:66, callback:function(){
            //return 118;
        }}});
/*
        var mySprite1 = new SpriteAnimator({id:'#test1',fps:'30',dir:'ltr',endFrame:91,loop:true, stop:{frame:30, callback:function(){
            log('callback2');
        }}});

        var mySprite2 = new SpriteAnimator({id:'#test',fps:'30',dir:'rtl',endFrame:91,loop:true, stop:{frame:30, callback:function(){
            log('callback2');
        }}});
                
*/
        //log(mySprite.config.id);
    });

})(jQuery);


