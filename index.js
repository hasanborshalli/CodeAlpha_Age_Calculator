const resultElement = document.getElementById("fullAge");
const resultAge = document.getElementById("result-age");
const yearsCount = document.getElementById("yearsCount");
const monthsCount = document.getElementById("monthsCount");
const weeksCount = document.getElementById("weeksCount");
const daysCount = document.getElementById("daysCount");
const hoursCount = document.getElementById("hoursCount");
const minutesCount = document.getElementById("minutesCount");
const currentDateInput = document.getElementById("currentDate");
const bod = document.getElementById("birthDate");

function setCurrentDate() {
    var today = new Date();

    // Format date as yyyy-mm-dd for input type="date"
    var formattedDate =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

    // Set input value
    currentDateInput.value = formattedDate;
    bod.setAttribute("max", formattedDate);
}

// Call the function when the page loads
window.onload = function () {
    setCurrentDate();
};
function calculateAgeDifference() {
    // Get the input value (birth date)
    var birthDateInput = bod.value;
    // Create Date objects for birth date and current date
    var birthDate = new Date(birthDateInput);
    var currentDate = new Date(currentDateInput.value);
    if (birthDate > currentDate) {
        return alert("Remember, time moves forward! Choose your dates wisely.");
    }

    // Calculate difference in years, months, and days
    var yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    //display years Difference in years
    yearsCount.textContent = yearsDiff;
    var monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    //display months Difference in months
    var ageInMonths = yearsDiff * 12 + monthsDiff;
    // Adjust for cases where current day of month is less than birth day of month
    if (currentDate.getDate() < birthDate.getDate()) {
        ageInMonths--; // Subtract one month
    }
    monthsCount.textContent = ageInMonths;
    var daysDiff = currentDate.getDate() - birthDate.getDate();
    var timeDiff = currentDate.getTime() - birthDate.getTime();
    // Calculate difference in various units
    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    minutesCount.textContent = minutes;

    var hours = Math.floor(minutes / 60);
    hoursCount.textContent = hours;

    var days = Math.floor(hours / 24);
    daysCount.textContent = days;

    var weeks = Math.floor(days / 7);
    weeksCount.textContent = weeks;

    // Adjust for negative months or days difference
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        yearsDiff--;
        if (monthsDiff < 0) {
            monthsDiff += 12; // add 12 months to get the correct remaining months
        }
        if (daysDiff < 0) {
            // Calculate days remaining in the previous month
            var prevMonthLastDay = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            ).getDate();
            daysDiff += prevMonthLastDay;
            monthsDiff--; // subtract 1 month as well
        }
    }

    // Format the result
    var result =
        yearsDiff + " years " + monthsDiff + " months " + daysDiff + " days";

    // Display the result

    resultAge.style.display = "flex";
    resultElement.textContent = `Your Age: ${result}.`;
}
