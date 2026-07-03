const courses = [

{
title:"React Masterclass",
category:"Web",
price:99,
rating:4.8,
image:"https://i.ytimg.com/vi/3YMG472VZEc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEYgGCh_MA8=&rs=AOn4CLAO3NQjArh9LSQVpgC3_JpQdYSgog"
},

{
title:"Artificial Intelligence",
category:"AI",
price:149,
rating:4.9,
image:"https://www.bing.com/images/search?view=detailV2&ccid=htUlQtzf&id=DE721E22C2087E0B629AE9613D67A1B063F21CB1&thid=OIP.htUlQtzfubN4lwj9das75gHaHa&mediaurl=https%3a%2f%2falitech.io%2fwp-content%2fuploads%2f2023%2f01%2fA-beginners-guide-to-Artificial-Intelligence-Understanding-the-fundamentals-of-Machine-Learning-Deep-Learning-NLP-and-Computer-Vision.jpg&exph=1024&expw=1024&q=Artificial+Intelligence&FORM=IRPRST&ck=D10DB93FC9069ADA42AA47237A6BD2E7&selectedIndex=3&itb=0"
},

{
title:"Python Data Science",
category:"Data",
price:120,
rating:4.7,
image:"https://picsum.photos/400/200?3"
},

{
title:"Flutter Bootcamp",
category:"Mobile",
price:89,
rating:4.6,
image:"https://picsum.photos/400/200?4"
},

{
title:"JavaScript Complete Guide",
category:"Web",
price:79,
rating:4.5,
image:"https://picsum.photos/400/200?5"
}

];

const container=document.getElementById("courses");
const search=document.getElementById("search");
const category=document.getElementById("category");

function display(){

const text=search.value.toLowerCase();
const cat=category.value;

container.innerHTML="";

courses
.filter(course=>{

return(
course.title.toLowerCase().includes(text)&&
(cat==="All"||course.category===cat)

);

})
.forEach(course=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${course.image}">

<div class="content">

<span class="category">${course.category}</span>

<h2>${course.title}</h2>

<div class="rating">
⭐ ${course.rating}
</div>

<div class="price">
$${course.price}
</div>

<div class="bottom">

<button class="enroll">
Enroll
</button>

<i class="fa-solid fa-heart favorite"></i>

</div>

</div>

`;

const heart=card.querySelector(".favorite");

heart.onclick=()=>{

heart.classList.toggle("active");

};

container.appendChild(card);

});

}

display();

search.onkeyup=display;

category.onchange=display;

document.getElementById("theme").onclick=()=>{

document.body.classList.toggle("dark");

};