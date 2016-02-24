README
===========================
press.js提供长按事件，依赖 Zepto || JQuery 和 [kungfu.js](https://github.com/Lucas-Zeng/kungfu.js)
****
###　　　　　　　　　　　　Author:Lucas-Zeng
###　　　　　　　　　 E-mail:247934556@qq.com

===========================

##<a name="index"/>目录
* [基本用法](#basic)
* [options详解](#options)
* [元素长按效果](#press)
* [实例](#eg)


    
##<a name="basic"/>基本用法
	//$().on( 'press' , optinos );
    $( '.testDiv' ).on( 'press' , {
    	onpress: function(e){
        	console.log( 'press start' );
        },
        onpresscancel: function(e){
        	console.log( 'press cancel, reason ' + e.reason );
        },
        onpressed: function(e){
        	console.log( 'press complete' );
        },
        delay: 200,
        duration: 1000,
        moveArea: 5    
    });
    
##<a name="options"/>options详解
####onpress [function] 长按开始时执行的函数
####onpresscancel [function] 长按取消时执行的函数, 其中e参数提供取消原因, e.reason为moved表示长按期间移动了，e.reason为left表示长按结束前松手了。
####onpressed [function] 长按完成时执行的函数
####delay [number] 接触屏幕delay毫秒后才是press事件的开始（出发onpress）。若在delay毫秒前松手，则执行click事件。默认值为0（安卓为300）
####duration [number] 事件长度，长按开始后duration毫秒后结束。默认值为0.
####moveArea [number] 容动圈。长按开始后在半径为moveArea像素内移动不算取消长按。默认值为7.

##<a name="press"/>元素长按效果
	<html>
        <head>
            <style>
            	.clickBox {
                    width: 100%;
                    height: 100px;
                    background: red;
                }
                .press {
                    -webkit-animation: press 1s linear forwards;
                            animation: press 1s linear forwards;
                }
                @-webkit-keyframes press
                {
                  0% { opacity: 1;  -webkit-transform: scale(1);}
                  85% { opacity: .5;  -webkit-transform: scale(.98);}
                  90% {opacity: .7 ; -webkit-transform:scale(1.02);}
                  100% {opacity: 1; -webkit-transform:scale(1);}
                }
                @keyframes press
                {
                  0% { opacity: 1;  -webkit-transform: scale(1);}
                  85% { opacity: .5;  -webkit-transform: scale(.98);}
                  90% {opacity: .7 ; -webkit-transform:scale(1.02);}
                  100% {opacity: 1; -webkit-transform:scale(1);}
                }
           </style>
       </head>
       <body>
			<div class="clickBox"></div>
			<script src="./YBase.js"></script>
            <script src="./kungfu.js"></script>
            <script src="./press.js"></script>
            <script>
				$(".clickBox").on('press', {
                    delay: 100,
                    duration: 1000,
                    onpress: function(e){
                    	//长按开始时播放动画效果
                        this.classList.add( 'press' );
                    },
                    onpresscancel: function(e){	
                    	//长按取消时播放动画效果
                        this.classList.remove( 'press' );
                    },
                    onpressed: function(e){
                    	//长按取消时播放动画效果
                        this.classList.remove( 'press' );
                    }
                });
            </script>
       </body>
	</html>
    
##<a name="eg"/>实例：详见example/press.html