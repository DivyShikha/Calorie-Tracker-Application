
function maleBMR(a, h, w) {
    let bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
    return bmr
}
function femaleBMR(a, h, w) {
    let bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)
    return bmr
}


function calculateBmr(e) {
    let age = parseInt(document.getElementById("bmrAge").value)
    let height = parseInt(document.getElementById("bmrHeight").value)
    let weight = parseInt(document.getElementById("bmrWeight").value)
    let gender = parseInt(document.querySelector('input[name="gender"]:checked').value)
    let result = document.getElementById("bmrResult")
    if (gender == 1) {
        result.innerText = `BMR = ${maleBMR(age, height, weight)} Calories/day`
    }
    else {
        result.innerText = `BMR = ${femaleBMR(age, height, weight)} Calories/day`
    }
}

function calculateTdee() {
    let age = parseInt(document.getElementById("bmrAge").value)
    let height = parseInt(document.getElementById("bmrHeight").value)
    let weight = parseInt(document.getElementById("bmrWeight").value)
    let gender = parseInt(document.querySelector('input[name="gender"]:checked')?.value)
    let result = document.getElementById("bmrResult")
    let tdeeType = parseFloat(document.getElementById("selecttype").value)
    if (gender == 1) {
        result.innerText = `TDEE = ${maleBMR(age, height, weight) * tdeeType} Calories/day`
    }
    else {
        result.innerText = `TDEE = ${femaleBMR(age, height, weight) * tdeeType} Calories/day`
    }
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
        }
    }
    return cookieValue;
}

// Function to calculate total protein, carbs, fat, and calories
function calculateCalories() {
    // Get all food items
    const foodItems = document.querySelectorAll('.food-item');

    // Initialize totals
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;

    // Loop through each food item
    foodItems.forEach((foodItem) => {
        // Check if the checkbox is checked
        const checkbox = foodItem.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            // Get protein, carbs, fat, and calories for the selected food item
            const protein = parseFloat(foodItem.querySelector('.protein').textContent);
            const carbs = parseFloat(foodItem.querySelector('.carbs').textContent);
            const fat = parseFloat(foodItem.querySelector('.fat').textContent);
            // const calories = protein * 4 + carbs * 4 + fat * 9;
            const calories = parseFloat(foodItem.querySelector('.calorie').textContent);

            // Update totals
            totalProtein += protein;
            totalCarbs += carbs;
            totalFat += fat;
            totalCalories += calories;
        }
    });
    const url = "/tracker/saveCalorie";




    const data = {
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        calorie: totalCalories
    };
    console.log(data)

    // Display the totals
    console.log('Total Protein:', totalProtein.toFixed(1), 'g');
    console.log('Total Carbs:', totalCarbs.toFixed(1), 'g');
    console.log('Total Fat:', totalFat.toFixed(1), 'g');
    console.log('Total Calories:', totalCalories.toFixed(1));
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);
            if(data.message == "JSON data processed successfully"){
                window.location.assign("/tracker");
            }
        })
        .catch(error => {
            console.log(error)
        });
}

// Add event listener to the button
const calculateButton = document.querySelector('.btn-info');
calculateButton.addEventListener('click', calculateCalories);
