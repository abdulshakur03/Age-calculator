const dayField = document.querySelector("#day");
const monthField = document.querySelector("#month");
const yearField = document.querySelector("#year");
const errors = document.querySelectorAll(".error");
const calculateBtn = document.querySelector(".calculate");

const displayDay = document.querySelector(".display-day");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");

const yearString = document.querySelector(".year-string");
const monthString = document.querySelector(".month-string");
const dayString = document.querySelector(".day-string");

// const removeAllErrorStyles = () => {
//   dayField.classList.remove("errColor");
//   monthField.classList.remove("errColor");
//   yearField.classList.remove("errColor");
// };

const showError = (field, errorElement, message) => {
  errorElement.textContent = message;
  field.classList.add("errColor");
};

const clearError = (field, errorElement) => {
  errorElement.textContent = "";
  field.classList.remove("errColor");
};

const validateInputs = (day, month, year) => {
  let isValid = true;
  const today = new Date();

  //Reset all error messages
  errors.forEach((error) => (error.textContent = ""));

  if (!day) {
    showError(dayField, errors[0], "This field is required");
    isValid = false;
  } else if (isNaN(day) || day < 1 || day > 31) {
    showError(dayField, errors[0], "Must be a valid day");
    isValid = false;
  } else {
    clearError(dayField, errors[0]);
  }
  if (!month) {
    showError(monthField, errors[1], "This field is required");
    isValid = false;
  } else if (isNaN(month) || month < 1 || month > 12) {
    showError(monthField, errors[1], "Must be a valid month");
    isValid = false;
  } else {
    clearError(monthField, errors[1]);
  }
  if (!year) {
    showError(yearField, errors[2], "This field is required");
    isValid = false;
  } else if (isNaN(year) || year < 1 || year > today.getFullYear()) {
    showError(yearField, errors[2], "Must be in the past");
    isValid = false;
  } else {
    clearError(yearField, errors[2]);
  }

  const userDate = new Date(year, month - 1, day);
  // This check is the final validation for leap years
  if (
    userDate.getFullYear() !== year ||
    userDate.getMonth() + 1 !== month ||
    userDate.getDate() !== day
  ) {
    errors[0].textContent = "Must be a valid date";
    isValid = false;
  }

  return isValid;
};

const handleCalculation = () => {
  // removeAllErrorStyles();

  const userDay = Number(dayField.value);
  const userMonth = Number(monthField.value);
  const userYear = Number(yearField.value);

  displayYear.textContent = "--";
  displayMonth.textContent = "--";
  displayDay.textContent = "--";

  if (!validateInputs(userDay, userMonth, userYear)) {
    return;
  }

  const userBirthDate = new Date(userYear, userMonth - 1, userDay);
  const today = new Date();

  let years = today.getFullYear() - userBirthDate.getFullYear();
  let months = today.getMonth() - userBirthDate.getMonth();
  let days = today.getDate() - userBirthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    const lastDayOfPrevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += lastDayOfPrevMonth;
    months--;
  }
  // if (months < 0) {
  //   months += 12;
  //   years--;
  // }
  displayYear.textContent = years;
  displayMonth.textContent = months;
  displayDay.textContent = days;

  yearString.textContent = years === 1 ? "year" : "years";
  monthString.textContent = months === 1 ? "month" : "months";
  dayString.textContent = days === 1 ? "day" : "days";
};

calculateBtn.addEventListener("click", handleCalculation);
