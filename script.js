const container = document.querySelector('.container');
const form = document.querySelector('form');
let str = "";
let categoryWiseData;
let allcategories;


const showRecipes = async() => {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php'); // -microTaskqueue
    let data = await response.json();
 
    categoryWiseData = data.categories;
    console.log(categoryWiseData)
    
    allcategories = ["Home",...new Set (categoryWiseData.map(ele=>ele.strCategory))];
    showCategories();
    // iterate categoryWiseData
    iterateCategoryItems(categoryWiseData);
}

showRecipes(); // async function return Promise.resolve(undefined);


function iterateCategoryItems(list) {
    str = "";
    list.forEach(element => {
        const { idCategory, strCategory, strCategoryDescription, strCategoryThumb } = element;
        str += `
        <div class="card mx-2 my-2 px-1" style="width: 18rem;">
            <img src=${strCategoryThumb} class="card-img-top" alt=${strCategoryThumb}>
            <div class="card-body">
                <h5 class="card-title">${strCategory}</h5>
                <p class="card-text">${strCategoryDescription}</p>
                <button  class="btn btn-primary">Go somewhere</button>
            </div>
        </div>
        `
    });
    container.innerHTML = str;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
   let searchByCategory = [...categoryWiseData].filter(ele=>ele.strCategory === input.value);   
   iterateCategoryItems(searchByCategory);
   input.value = "";
});

let str1 = ""
function showCategories(){
   str1 = "";
    allcategories.forEach(ele=>{
    str1 +=  `<li class="nav-item">
    <button onclick="showHome(this)" class="border-0 bg-danger-subtle " >${ele}</button>
</li>`
  })
  document.querySelector('.navbar-nav').innerHTML = str1
}


function showHome(is){
    if(is.innerText === "Home"){
        iterateCategoryItems(categoryWiseData);
    }
    else{
       let clickonCategory = [...categoryWiseData].filter(ele=>ele.strCategory === is.innerText);
       iterateCategoryItems(clickonCategory);
    }

}

