var name="out"
var obj={
    name:"inObj"
}
function fn(a,b,c){
    console.log(a+b+c+this.name)
}



//ES5 call
Function.prototype.callES5=function(obj){
    //judge null or undefined
    obj = obj? Object(obj) : window
    obj.fn = this;
    let args=[];
    for(let i=1; i< arguments.length;i++){
        args.push("arguments["+i+"]");
    }
    let result = eval("obj.fn("+args+")")
    delete obj.fn;
    return result;
}

//ES6 call
Function.prototype.callES6=function(obj){
    //judge null or undefined
    obj = obj? Object(obj):window;
    obj.fn = this;
    let args = [...arguments].slice(1);
    let result = obj.fn(...args)
    delete obj.fn;
    return result
}

fn("please ","call ","me ");          //please call me out
fn.call(obj,"please ","call ","me ");  //please call me inObj
fn.callES5(obj,"please ","call ","me ");//please call me inObj
fn.callES6(obj,"please ","call ","me ");//please call me inObj


//ES5 apply
Function.prototype.applyES5=function(obj,arr){
    //judge null or undefined
    obj = obj? Object(obj) : window
    obj.fn = this;
    let result;
    if(!arr){
        result=obj.fn();
    }else{
        let args=[];
        for(let i=0; i< arr.length;i++){
            args.push("arr["+i+"]");
        }
        result = eval("obj.fn("+args+")");
    }
    delete obj.fn;
    return result;
}

//ES6 apply
Function.prototype.applyES6=function(obj,arr){
    //judge null or undefined
    obj = obj? Object(obj) : window
    obj.fn = this;
    let result;
    if(!arr){
        result=obj.fn();
    }else{
        result = obj.fn(...arr);
    }
    delete obj.fn;
    return result;
}

fn("please ","apply ","me ");          //please apply me out
fn.apply(obj,["please ","apply ","me "]);  //please apply me inObj
fn.applyES5(obj,["please ","apply ","me "]);//please apply me inObj
fn.applyES6(obj,["please ","apply ","me "]);//please apply me inObj

//bind 不会立即执行，而是返回一个新函数，且新函数的this无法被修改
//功能：1.修改函数this指向 2.bind返回一个绑定了this的新函数boundFunction，例子中用bind表示
//3.支持函数柯里化 4.boundFunction的this无法修改 
//5.boundFunction函数也能通过new构造, 只是在构造中，boundFunction已经确定的this会被忽略
//ES5 ES6 bind
Function.prototype.bindES56=function(obj){
    if(typeof this !== "function"){
        throw new Error("Function.prototype.bind - what is tring to be bound is not callable");
    }
    let args = Array.prototype.slice.call(arguments,1);
    let fn = this;//如果不提前保存，执行bound时内部this会指向window
    //创建中介函数
    let fn_ = function(){}
    let bound = function(){
        //函数柯里化
        let params = Array.prototype.slice.call(arguments);
        //通过三元判断，是否是通过new构造的
        fn.apply(this.constructor === fn? this : obj, args.concat(params));//new构造：普通构造
        // console.log(this)
    }
    //原型链继承
    fn_.prototype = fn.prototype;
    bound.prototype = new fn_();
    return bound;
}

let bound1 = fn.bindES56(obj,"please ")
let nfnb = new bound1("bind ","me ") //please call me undefined
let bound2 = fn.bindES56(obj,"please ","bind ","me ")
bound2(); //please call me inObj