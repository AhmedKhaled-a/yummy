searchMeal('')


$('.menu-btn i').click(function () {
    let linksWidth = $('.links').innerWidth()
    let togglebarOffset = $('.toggle-bar').offset().left
    if (togglebarOffset == 0) {
        $('.side-menu').css({ 'transform': `translateX(${linksWidth}px)` })
        $('.menu-btn i').addClass(' fa-solid fa-xmark ').removeClass('fa fa-align-justify')
        function showLinks() {
            $('li').eq(0).animate({ padding: '.7rem', opacity: '1' }, 1000)
            $('li').eq(1).animate({ padding: '.7rem', opacity: '1' }, 1300)
            $('li').eq(2).animate({ padding: '.7rem', opacity: '1' }, 1600)
            $('li').eq(3).animate({ padding: '.7rem', opacity: '1' }, 1900)
            $('li').eq(4).animate({ padding: '.7rem', opacity: '1' }, 2200)
        }
        showLinks()
    }
    else {
        $('.menu-btn i').addClass('fa fa-align-justify ').removeClass(' fa-solid fa-xmark ')
        $('.side-menu').css({ 'transform': 'translateX(0)' })
        $('li').animate({ opacity: '0', paddingTop: '6rem' }, 500)
    }
})


async function getCategories() {
    let apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let result = await apiResponse.json()
    let categoriesList = result.categories
    // console.log(categoriesList);
    let box = ''
    for (let x of categoriesList) {
        box += `
        <div class="col-sm-6 col-md-3">
        <div class="item" onclick="getMeals('${x.strCategory}')">
            <img src="${x.strCategoryThumb}" alt="" class="w-100">
            <div class="layer text-center p-2">
                <h4>${x.strCategory}</h4>
                <p>${x.strCategoryDescription.split(" ").splice(0, 20).join(' ')}</p>
            </div>
        </div>
    </div>
            `
    }
    document.getElementById('box').innerHTML = box

}
async function getMeals(category) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let result = await apiResponse.json()
    let meals = result.meals.slice(0, 20)
    // console.log(meals);
    let box = ''
    for (let x of meals) {
        box += `
        <div class="col-md-3">
        <div class="item" onclick="mealDetail('${x.idMeal}')">
            <img src="${x.strMealThumb}" alt="" class="w-100">
            <div class="layer p-2 d-flex align-items-center justify-content-center">
                <h4>${x.strMeal}</h4>
            </div>
        </div>
    </div>`
    }
    document.getElementById('box').innerHTML = box


}

async function mealDetail(mealId) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    let result = await apiResponse.json()
    let currentMeal = result.meals
    let box = `
<div class="col-md-4">
                <div class="text-center">
                    <img src="${currentMeal[0].strMealThumb}" alt="" class="w-100">
        <h2> ${currentMeal[0].strMeal}</h2>
                </div>
            </div>
        <div class="col-md-8">
            <div>
                <h3>Instructions</h3>
                <p>${currentMeal[0].strInstructions}</p>
                <p><span class="fw-semibold"> Area : </span>${currentMeal[0].strArea}</p>
                <p><span class="fw-semibold">Category: </span>${currentMeal[0].strCategory}</p>
                <h3>Recipes :</h3>
                <span class="recipe">${currentMeal[0].strMeasure1} ${currentMeal[0].strIngredient1}</span>
                <span class="recipe">${currentMeal[0].strMeasure2} ${currentMeal[0].strIngredient2}</span>
                <span class="recipe">${currentMeal[0].strMeasure3} ${currentMeal[0].strIngredient3}</span>
                <span class="recipe">${currentMeal[0].strMeasure4} ${currentMeal[0].strIngredient4}</span>
                <span class="recipe">${currentMeal[0].strMeasure5} ${currentMeal[0].strIngredient5}</span>
                <span class="recipe">${currentMeal[0].strMeasure6} ${currentMeal[0].strIngredient6}</span>
                <span class="recipe">${currentMeal[0].strMeasure7} ${currentMeal[0].strIngredient7}</span>
                <span class="recipe">${currentMeal[0].strMeasure8} ${currentMeal[0].strIngredient8}</span>
                <span class="recipe">${currentMeal[0].strMeasure9} ${currentMeal[0].strIngredient9}</span>
                <span class="recipe">${currentMeal[0].strMeasure10} ${currentMeal[0].strIngredient10}</span>
                <span class="recipe">${currentMeal[0].strMeasure11} ${currentMeal[0].strIngredient11}</span>
                <span class="recipe">${currentMeal[0].strMeasure12} ${currentMeal[0].strIngredient12}</span>
                <span class="recipe">${currentMeal[0].strMeasure13} ${currentMeal[0].strIngredient13}</span>
                <span class="recipe">${currentMeal[0].strMeasure14} ${currentMeal[0].strIngredient14}</span>
                <span class="recipe">${currentMeal[0].strMeasure15} ${currentMeal[0].strIngredient15}</span>
                <span class="recipe">${currentMeal[0].strMeasure16} ${currentMeal[0].strIngredient16}</span>
                <span class="recipe">${currentMeal[0].strMeasure17} ${currentMeal[0].strIngredient17}</span>
                <span class="recipe">${currentMeal[0].strMeasure18} ${currentMeal[0].strIngredient18}</span>
                <span class="recipe">${currentMeal[0].strMeasure19} ${currentMeal[0].strIngredient19}</span>
                <span class="recipe">${currentMeal[0].strMeasure20} ${currentMeal[0].strIngredient20}</span>
                <h3>Tags : </h3>
                <span class="tag">${currentMeal[0].strTags}</span>
                <div class="my-4">
                    <a href="${currentMeal[0].strSource}" target="_blank"><button class="btn btn-info">Source</button></a>
                    <a href="${currentMeal[0].strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
                </div>
            </div>
        </div>`
    document.getElementById('box').innerHTML = box



}
async function area() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result = await apiResponse.json()
    let area = result.meals.slice(0, 20)

    let box = ''
    for (let x of area) {
        box += `<div class="col-md-3">
        <div class="text-center area-icon" onclick="areaFilter('${x.strArea}')">
            <i class="fa-solid fa-city fa-3x mb-1"></i>
            <h2>${x.strArea}</h2>
        </div>
    </div>
        `
        document.getElementById('box').innerHTML = box
    }
}

async function areaFilter(area) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let result = await apiResponse.json()
    let mealsFilter = result.meals
    let box = ''
    for (let x of mealsFilter) {
        box += `
        <div class="col-md-3">
        <div class="item" onclick="mealDetail('${x.idMeal}')">
            <img src="${x.strMealThumb}" alt="" class="w-100">
            <div class="layer p-2 d-flex align-items-center justify-content-center">
                <h4>${x.strMeal}</h4>
            </div>
        </div>
    </div>`
    }
    document.getElementById('box').innerHTML = box
}

async function ingredients() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result = await apiResponse.json()
    let ingredients = result.meals.slice(0, 20)
    console.log(ingredients);
    let box = ''
    for (let x of ingredients) {
        box += `
<div class="col-md-3">
<div class="ingredient text-center" onclick="iFilter('${x.strIngredient}')">
    <i class="fa-solid fa-bowl-food fa-3x mb-1"></i>
    <h2>${x.strIngredient}</h2>
    <p>${x.strDescription.split(' ').slice(0, 15).join(' ')}</p>
</div>
</div>
`
    }

    document.getElementById('box').innerHTML = box
}

async function iFilter(ingredient) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let result = await apiResponse.json()
    let ingFilter = result.meals
    let box = ''
    for (let x of ingFilter) {
        box += `
        <div class="col-md-3">
        <div class="item" onclick="mealDetail('${x.idMeal}')">
            <img src="${x.strMealThumb}" alt="" class="w-100">
            <div class="layer p-2 d-flex align-items-center justify-content-center">
                <h4>${x.strMeal}</h4>
            </div>
        </div>
    </div>`
    }
    document.getElementById('box').innerHTML = box
}


//           ***************               

$('.side-menu li').eq(0).click(function () {
    showInputs()

})
$('.side-menu li').eq(1).click(function () {
    $('#search').addClass('d-none')
    $('#form').addClass('d-none')
    getCategories()
})
$('.side-menu li').eq(2).click(function () {
    $('#search').addClass('d-none')
    $('#form').addClass('d-none')
    area()
})

$('.side-menu li').eq(3).click(function () {
    $('#search').addClass('d-none')
    $('#form').addClass('d-none')
    ingredients()
})
$('.side-menu li').eq(4).click(function () {
    showForm()
})

function showInputs() {
    $('#search').removeClass('d-none')
    $('#form').addClass('d-none')
    $('#box').empty()
}

function showForm() {
    $('#form').removeClass('d-none')
    $('#box').empty()
    $('#search').addClass('d-none')
}


//           ***************           SEARCH           *********************





$('.search').keyup(function () {
    let searchValue = $('.search').val()
    if (searchValue != '') {
        searchMeal(`${searchValue}`)
    } else {
        $('#box').empty()
    }
})
$('.search-letter').keyup(function () {
    let letter = $('.search-letter').val()
    if (letter != '') {
        searchFirst(`${letter}`)
    } else {
        $('#box').empty()
    }

})

async function searchMeal(key) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    let result = await apiResponse.json()
    let searchResult = result.meals
    let box = ''
    for (let x of searchResult) {
        box += `
        <div class="col-md-3">
        <div class="item" onclick="mealDetail('${x.idMeal}')">
            <img src="${x.strMealThumb}" alt="" class="w-100">
            <div class="layer p-2 d-flex align-items-center justify-content-center">
                <h4>${x.strMeal}</h4>
            </div>
        </div>
    </div> 
        `
    }

    document.getElementById('box').innerHTML = box
}

async function searchFirst(firstL) {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstL}`)
    let result = await apiResponse.json()
    let searchResult = result.meals
    let box = ''
    for (let x of searchResult) {
        box += `
        <div class="col-md-3">
        <div class="item" onclick="mealDetail('${x.idMeal}')">
            <img src="${x.strMealThumb}" alt="" class="w-100">
            <div class="layer p-2 d-flex align-items-center justify-content-center">
                <h4>${x.strMeal}</h4>
            </div>
        </div>
    </div> 
        `
    }

    document.getElementById('box').innerHTML = box
}












//           ***************           VALIDATION           *********************


let nameRegex = /^[a-zA-Z ]+$/
let emailRegex = /^\w+@\w+\.com/
let phoneRegex = /^01[0125][0-9]{8}$/
let ageRegex = /^[1-9][0-9]?$|^100$/
let passRegex = /^.{5,15}$/

$('#form input').eq(0).keyup(function () {
    if (nameValid()) {
        $('.alert-1').addClass('d-none')
        $('#form input').eq(0).removeClass('is-invalid')
        $('#form input').eq(0).addClass('is-valid')
    } else {
        $('.alert-1').removeClass('d-none')
        $('#form input').eq(0).removeClass('is-valid')
        $('#form input').eq(0).addClass('is-invalid')
    }
    check()

})
$('#form input').eq(1).keyup(function () {
    if (mailValid()) {
        $('.alert-2').addClass('d-none')
        $('#form input').eq(1).removeClass('is-invalid')
        $('#form input').eq(1).addClass('is-valid')
    } else {
        $('.alert-2').removeClass('d-none')
        $('#form input').eq(1).removeClass('is-valid')
        $('#form input').eq(1).addClass('is-invalid')
    }
    check()
})
$('#form input').eq(2).keyup(function () {

    if (phoneValid()) {
        $('.alert-3').addClass('d-none')
        $('#form input').eq(2).removeClass('is-invalid')
        $('#form input').eq(2).addClass('is-valid')

    } else {
        $('.alert-3').removeClass('d-none')
        $('#form input').eq(2).removeClass('is-valid')
        $('#form input').eq(2).addClass('is-invalid')
    }
    check()
})
$('#form input').eq(3).keyup(function () {

    if (ageValid()) {
        $('.alert-4').addClass('d-none')
        $('#form input').eq(3).removeClass('is-invalid')
        $('#form input').eq(3).addClass('is-valid')

    } else {
        $('.alert-4').removeClass('d-none')
        $('#form input').eq(3).removeClass('is-valid')
        $('#form input').eq(3).addClass('is-invalid')
    }
    check()
})
$('#form input').eq(4).keyup(function () {
    if (passValid()) {
        $('.alert-5').addClass('d-none')
        $('#form input').eq(4).removeClass('is-invalid')
        $('#form input').eq(4).addClass('is-valid')

    } else {
        $('.alert-5').removeClass('d-none')
        $('#form input').eq(4).removeClass('is-valid')
        $('#form input').eq(4).addClass('is-invalid')
    }
    check()
})

$('#form input').eq(5).keyup(function () {

    if (rePassValid()) {
        $('.alert-6').addClass('d-none')
        $('#form input').eq(5).removeClass('is-invalid')
        $('#form input').eq(5).addClass('is-valid')

    } else {
        $('.alert-6').removeClass('d-none')
        $('#form input').eq(5).removeClass('is-valid')
        $('#form input').eq(5).addClass('is-invalid')
    }
    check()
})

function nameValid() {
    return nameRegex.test($('#form input').eq(0).val())
}
function mailValid() {
    return emailRegex.test($('#form input').eq(1).val())
}
function phoneValid() {
    return phoneRegex.test($('#form input').eq(2).val())
}
function ageValid() {
    return ageRegex.test($('#form input').eq(3).val())
}
function passValid() {
    return passRegex.test($('#form input').eq(4).val())
}
function rePassValid() {
    return $('#form input').eq(4).val() == $('#form input').eq(5).val()
}

function check() {
    if (nameValid() == true && mailValid() == true && phoneValid() == true && ageValid() == true && passValid() == true && rePassValid() == true) {
        $('button').removeAttr('disabled')
    } else {
        $('button').attr('disabled', 'true')
    }
}




