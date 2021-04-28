const courses = document.querySelector('#courses-list'),
 shoppingCartContent = document.querySelector('#cart-content tbody');
 clearCartbtn = document.querySelector('#clear-cart');
 
 loadEventListeners();
 
function loadEventListeners() {

courses.addEventListener('click', buyCourse);

shoppingCartContent.addEventListener('click', removeCourse);

clearCartbtn.addEventListener('click', clearCart);

document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

function buyCourse(e){

     e.preventDefault();
   if (e.target.classList.contains ('add-to-cart')){

    const course = e.target.parentElement.parentElement;
    
    getCourseInfo(course);
    }
}

function getCourseInfo(course){

   const courseInfo = {
     image: course.querySelector('img').src,
     title: course.querySelector('h4').textContent,
     price: course.querySelector('.price span').textContent,
     id: course.querySelector('a').getAttribute('data-id')
   }
   addIntoCart(courseInfo);
}
 function addIntoCart(course){
 
  const row = document.createElement('tr');
  
  row.innerHTML = `
   <tr>
        <td>
            <img  src ="${course.image}" width = 80>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a href="#" class="remove" data-id="${course.id}">X</a>
        </td> 
   </tr>
   `;
  shoppingCartContent.appendChild(row);
  
  saveInfoStorage(course);
}

  function saveInfoStorage(course){
     let courses = getCoursesFromStorage();
     
     courses.push(course);
     
     localStorage.setItem('courses', JSON.stringify(courses));
    
  }

 function getCoursesFromStorage(){
     let courses;
     
     if(localStorage.getItem('courses') === null){
        courses =[];
     }
     else{
       courses = JSON.parse(localStorage.getItem('courses'));
     }
     return courses;
 }


 function removeCourse(e){
 
     if(e.target.classList.contains('remove')){
         e.target.parentElement.parentElement.remove();
         course = e.target.parentElement.parentElement;
         courseid = course.querySelector('a'). getAttribute('data-id');
     }
     console.log(courseid);
     removeCourseLocalStorage(courseid);
 }
 
 function removeCourseLocalStorage(id){
         let courseLocal = getCoursesFromStorage();
         
         courseLocal.forEach(function(coursesLocal,index){
             if(coursesLocal,id === id){
               courseLocal.splice(index,1);
             }           
         });
         localStorage.setItem('courses',JSON.stringify(courseLocal));
 }
 
 function clearCart (){
    shoppingCartContent.innerHTML ='';
    
    clearLocalStorage();
 }
 
 function clearLocalStorage(){
      localStorage.clear();
 }
 
 function getFromLocalStorage(){
     let courseLocal = getCoursesFromStorage();
     
     courseLocal.foreach(function(course){
     
       const row = document.createElement('tr');
       
       row.innerHTML = `
        <tr>
            <td>
              <img  src ="${course.image}" width = 80>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
           <td>
             <a href="#" class="remove" data-id="${course.id}">X</a>
           </td> 
        </tr>
       
       `;  
     shoppingCartContent.appendChild(row); 
     });
 }
