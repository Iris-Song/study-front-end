var name="out"
var obj={
    name:"inObj"
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
    let result = obj.fn([...args])
    delete obj.fn;
    return result
}

function fn(){
    console.log(this.name)
}

fn();          //out
fn.call(obj);  //inObj
fn.callES5(obj);//inObj
fn.callES6(obj);//inObj