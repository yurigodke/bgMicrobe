(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define([],b):'object'==typeof exports?exports.bgMicrobe=b():a.bgMicrobe=b()})('undefined'==typeof self?this:self,function(){var a=Math.PI,b=Math.floor;return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)}([function(c,d,e){'use strict';Object.defineProperty(d,'__esModule',{value:!0});var f=e(1),g=e(2);d['default']=class{constructor(a,b={}){this.microbes=[],this.food=[],this.container=a,this.options=Object.assign(b,{microbes:100,food:50,margins:{top:10,bottom:10,left:10,right:10}}),this.initialize()}initialize(){this.setCanvasContext();let a=this.options.microbes,b=this.options.food;for(var c=0;c<a;c++)this.createMicrobes();for(var c=0;c<b;c++)this.createFood();this.container.addEventListener('click',this.addClickFood.bind(this)),this.animate()}addClickFood(a){let c=20,d=a.offsetX-c,e=a.offsetX+c,f=a.offsetY-c,h=a.offsetY+c;for(var j=0;10>j;j++){let a=b(Math.random()*(e-d+1))+d,c=b(Math.random()*(h-f+1))+f;this.food.push(new g.a(this.canvas,{posX:a,posY:c}))}}setCanvasContext(){this.canvas={ctx:this.container.getContext('2d'),width:this.container.clientWidth,height:this.container.clientHeight,margins:this.options.margins}}createMicrobes(){this.microbes.push(new f.a(this.canvas))}createFood(){this.food.push(new g.a(this.canvas))}clearCanvas(){this.canvas.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}checkProximityFood(b){let c=this.microbes[b].props.posX,d=this.microbes[b].props.posY;this.food.forEach((e,f)=>{let g=e.props.posX-c,h=e.props.posY-d;if(-1<g&&1>g&&-1<h&&1>h)this.microbes[b].eat(),this.food.splice(f,1);else if(-50<g&&50>g&&-50<h&&50>h){let c=Math.atan(h/g),d=180*c/a;0>g?d+=180:0>h&&0<=g&&(d+=360),this.microbes[b].props.foodAng=d}})}animate(){if(this.clearCanvas(),this.microbes.forEach((a,b)=>{if(a.props.dead)this.microbes.splice(b,1);else{if(this.checkProximityFood(b),a.checkClone()){let b=Object.assign({},a.props);b.rotate=(b.rotate+45)%360,this.microbes.push(new f.a(this.canvas,b))}a.setNextPosition()}a.reload()}),this.food.forEach((a)=>{a.drawFoods()}),this.food.length<.8*this.options.food){let a=Math.round(Math.random());a&&this.createFood()}setTimeout(this.animate.bind(this),40)}}},function(c,d){'use strict';d.a=class{constructor(a,c={}){this.canvas=a,this.param={minSize:6,maxSize:9,minRotate:0,maxRotate:360,minPosX:this.canvas.margins.left,maxPosX:this.canvas.width-(this.canvas.margins.left+this.canvas.margins.right),minPosY:this.canvas.margins.top,maxPosY:this.canvas.height-(this.canvas.margins.top+this.canvas.margins.bottom),lifeTime:1e3};let d={width:b(Math.random()*(this.param.maxSize-this.param.minSize+1))+this.param.minSize,rotate:b(Math.random()*(this.param.maxRotate-this.param.minRotate+1))+this.param.minRotate,posX:b(Math.random()*(this.param.maxPosX-this.param.minPosX+1))+this.param.minPosX,posY:b(Math.random()*(this.param.maxPosY-this.param.minPosY+1))+this.param.minPosY,speed:.5,life:this.param.lifeTime,dead:!1,colors:['rgba(0, 0, 0, 0.3)','rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 0.7)']};d.height=d.width/2,this.props=Object.assign(d,c),this.draw()}eat(){this.props.width++,this.props.height=this.props.width/2,this.props.life=this.param.lifeTime,this.props.foodAng=null}draw(){let c=this.props.width/2,d=this.props.height/2,e=this.props.rotate*a/180,f=this.props.posX,g=this.props.posY,h=this.props.colors[b(Math.random()*this.props.colors.length)];this.props.color||(this.props.color=h),this.canvas.ctx.beginPath(),this.canvas.ctx.strokeStyle=this.props.color,this.canvas.ctx.ellipse(f,g,c,d,e,0,2*a),this.canvas.ctx.stroke()}checkClone(){let a=!1;return this.props.width>this.param.maxSize&&(a=!0,this.props.width=this.param.minSize,this.props.height=this.props.width/2,this.props.life=this.param.lifeTime),a}reload(){this.props.life--;let b=this.props.width/2,c=this.props.height/2,d=this.props.rotate*a/180,e=this.props.posX,f=this.props.posY,g=this.props.color;this.canvas.ctx.beginPath(),this.canvas.ctx.strokeStyle=g,this.canvas.ctx.ellipse(e,f,b,c,d,0,2*a),this.canvas.ctx.stroke()}getDirectionProps(){let a={x:0,y:0,xLine:'',yLine:'',rotate:this.props.rotate};return 90>=this.props.rotate?(a.x=1,a.y=1,a.xLine='B',a.yLine='C'):180>=this.props.rotate?(a.x=-1,a.y=1,a.xLine='C',a.yLine='B',a.rotate-=90):270>=this.props.rotate?(a.x=-1,a.y=-1,a.xLine='B',a.yLine='C',a.rotate-=180):360>=this.props.rotate&&(a.x=1,a.y=-1,a.xLine='C',a.yLine='B',a.rotate-=270),a}getPosition(b){var c=Math.pow;let d=b.rotate*(a/180),e=Math.cos(d),f={};f.A=this.props.speed,f.B=e*f.A,f.C=Math.sqrt(c(f.A,2)-c(f.B,2));let g={x:f[b.xLine]*b.x,y:f[b.yLine]*b.y};return g}getRotation(){let a,c=2,d=b(Math.random()*(c- -c+1)+-c),e=this.canvas.margins.left,f=this.canvas.width-(this.canvas.margins.left+this.canvas.margins.right),g=this.canvas.margins.top,h=this.canvas.height-(this.canvas.margins.top+this.canvas.margins.bottom);if(this.props.posX<e)d=180<this.props.rotate?2:-2;else if(this.props.posX>f)d=0<this.props.rotate&&180>this.props.rotate?2:-2;else if(this.props.posY<g)d=270<this.props.rotate||90>this.props.rotate?2:-2;else if(this.props.posY>h)d=90<this.props.rotate&&270>this.props.rotate?2:-2;else if(this.props.foodAng){let d=this.props.foodAng-this.props.rotate,e=b(Math.random()*(2*c));(180<d||-180>d)&&(d*=-1),a=-1>d?(this.props.rotate-e)%360:1<d?(this.props.rotate+e)%360:this.props.foodAng}let i=a||(this.props.rotate+d)%360;return 0>i?360:i}setNextPosition(){if(0<this.props.life){let a=this.getDirectionProps(),b=this.getPosition(a);this.props.posX+=b.x,this.props.posY+=b.y;let c=this.getRotation();this.props.rotate=c}else{let a=0;0<=200+this.props.life&&(a=('000'+(200+this.props.life)).slice(-3)),0<+a?this.props.color=`rgba(0, 0, 0, 0.${a})`:this.props.dead=!0}}}},function(c,d){'use strict';d.a=class{constructor(a,c={}){this.canvas=a;const d={size:3,minPosX:this.canvas.margins.left,maxPosX:this.canvas.width-(this.canvas.margins.left+this.canvas.margins.right),minPosY:this.canvas.margins.top,maxPosY:this.canvas.height-(this.canvas.margins.top+this.canvas.margins.bottom)};let e={radius:d.size,posX:b(Math.random()*(d.maxPosX-d.minPosX+1))+d.minPosX,posY:b(Math.random()*(d.maxPosY-d.minPosY+1))+d.minPosY,color:'rgba(0, 0, 0, 0.4)'};this.props=Object.assign(e,c),this.drawFoods()}drawFoods(){let b=this.props.radius/2,c=this.props.posX,d=this.props.posY,e=this.props.color;this.canvas.ctx.beginPath(),this.canvas.ctx.fillStyle=e,this.canvas.ctx.arc(c,d,b,0,2*a),this.canvas.ctx.fill()}}}])});