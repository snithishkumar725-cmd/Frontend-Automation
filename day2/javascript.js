document.querySelectorAll("progress").forEach((bar)=>{

let value=0;

const target=bar.value;

bar.value=0;

const interval=setInterval(()=>{

value++;

bar.value=value;

if(value>=target){

clearInterval(interval);

}

},20);

});