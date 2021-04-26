//Search Button Event
document.getElementById('search-button').addEventListener('click', function () {
    const userInput = document.getElementById('customer-input').value;
    showFoodList(userInput);
    document.getElementById('customer-input').value = ' ';

})

//Call TheMealDb api By ingredient
const showFoodList = name => {
    if (name > ' ') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
            .then(res => res.json())
            .then(data => {
                const meals = data.meals;
                foodLists(meals);
            })
            .catch(error => {
                alert('please Enter Right Meal Name')
                document.getElementById('customer-input').value = ' ';
            })
    }
    else (showFoodList(userInput));
}

//Matching meal Display in HTML 
const foodLists = food => {
    const mealDisplayArea = document.getElementById('meals-list-area')
    food.forEach(mealInfo => {
        const mealArea = document.createElement('div');
        mealArea.id = 'meal-show';

        const mealDisplay = `
            <img onclick="mealIngredient(${mealInfo.idMeal})" width="220px" src= "${mealInfo.strMealThumb}">
            <h3> ${mealInfo.strMeal} </h3>
        `;
        mealArea.innerHTML = mealDisplay;
        mealDisplayArea.appendChild(mealArea);
    })
}

//call MealDb api by Id
const mealIngredient = id => {
    document.getElementById('meals-list-area').style.display = "none";
    document.getElementById('search-bar-section').style.display = 'none';
    document.getElementById('single-meal-details').style.display = 'block';

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const foodDetails = data.meals
            foodDetails.forEach(name => {
                ingredientList(name);
            })
        })
}

//Display Meal Ingredients (it's not perfect but iam trying to do something)
const ingredientList= name => {
    const singleMealDetails = document.getElementById('single-meal-details');

    const foodIngredient = `
    <img width="450px" height= "300px" src= "${name.strMealThumb}">
    <h2> ${name.strMeal}</h2>
    <h4> Ingredients </h4>
    <ul>
        <h5>${name.strMeasure1} ${name.strIngredient1}</h5>
        <h5>${name.strMeasure2} ${name.strIngredient2}</h5>
        <h5>${name.strMeasure3} ${name.strIngredient3}</h5>
        <h5>${name.strMeasure4} ${name.strIngredient4}</h5>
        <h5>${name.strMeasure5} ${name.strIngredient5}</h5>
        <h5>${name.strMeasure6} ${name.strIngredient6}</h5>
        <h5>${name.strMeasure7} ${name.strIngredient7}</h5>
        <h5>${name.strMeasure8} ${name.strIngredient8}</h5>
        <h5>${name.strMeasure9} ${name.strIngredient9}</h5>
        <h5>${name.strMeasure10} ${name.strIngredient10}</h5>
    </ul>
   `;

    singleMealDetails.innerHTML = foodIngredient;
}
