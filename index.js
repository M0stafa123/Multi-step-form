const form = document.querySelector("form");
const inputformType = document.getElementById("type");
const howMany = document.querySelector('input[type = "number"]');
const serial = document.getElementById("serial");
const carNumber = document.getElementById("car-number");
const passwords = document.querySelectorAll('input[type = "password"]');
const type = document.querySelector("span.type");
const manufacturer = document.querySelector(".manufacturer");
const carModel = document.querySelector(".carModel");
const modelYear = document.querySelector(".modelYear");
const noOfParts = document.querySelector("span.howMany");
const sNumber = document.querySelector("span.serial");
const cNumber = document.querySelector("span.carNumber");
const partName = document.querySelector(".partName");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phone = document.querySelector("span.phone");
const deliver = document.querySelector(".deliver");
const country = document.querySelector(".country");
const city = document.querySelector(".city");
const street = document.querySelector(".street");
const ZIP = document.querySelector(".ZIP");
const address = document.querySelector(".address");
const steps = document.querySelectorAll("form > section");
const orderNumber = document.querySelector(".order-number");
const err = document.querySelector(".err");
const car = document.querySelector(".car");
const randomCar = ["Images/car1.webp", "Images/car2.webp", "Images/car3.webp"];
const clear = document.querySelector(".delete");
const arabicName = document.querySelector(".arabic-name");
const englishName = document.querySelector(".english-name");
const stepIndicators = document.querySelectorAll(".step-indicator");
const codeContainer = document.querySelectorAll(".code-container");
const codes = document.querySelectorAll(".code li");
const downArrow = document.querySelector(".down");

// if all of the first step fields are not empty show the car image
for (i = 0; i <= 3; i++) {
  form[i].addEventListener("change", () => {
    showCar();
  });
}
//

// begin at step 1
var step = 0;
//
stepIndicators[step].classList.add("active");
// reset the form if the user click on the delete button
clear.addEventListener("click", () => {
  form.reset();
  steps[step].style.display = "none";
  step = 0;
  car.src = "";
  car.alt = "";
  clear.style.display = "none";
  showStep(step);
});
//

// show the current step
const showStep = (number) => {
  if (step === 0) {
    form[24].style.display = "none";
  } else {
    form[24].style.display = "block";
  }
  if (step === 5) {
    document.querySelector(".control").style.display = "none";
    document.querySelector(".indicator").style.display = "none";
  }
  steps[number].style.display = "block";
};
//

// show the previous step and hide the current
const back = () => {
  stepIndicators[step].classList.remove("active");

  if (step > 0) {
    steps[step].style.display = "none";
    step -= 1;
  }
  stepIndicators[step].classList.add("active");

  showStep(step);
};
//

// show the next step and hide the previous
const next = () => {
  if (!validateFields(step)) {
    return false;
  }
  if (!validatePassword()) {
    return false;
  }
  individualOrCompany();
  stepIndicators[step].classList.add("completed");
  stepIndicators[step].classList.remove("active");

  if (step < steps.length - 1) {
    steps[step].style.display = "none";
    step += 1;
  }
  if (step <= 4) {
    stepIndicators[step].classList.add("active");
  }

  if (step === 4) {
    orderNumber.innerHTML = Math.ceil(Math.random() * 1000000 + 1);
    form[25].innerHTML = "Submit";
    clear.style.display = "block";
  } else {
    clear.style.display = "none";
  }

  displayOrder();
  showStep(step);
};
//

// content in fifth step

const displayOrder = () => {
  const countryCode = document.getElementById("code");
  type.innerHTML = form[0].value;
  manufacturer.innerHTML = form[1].value;
  carModel.innerHTML = form[2].value;
  modelYear.innerHTML = form[3].value;
  partName.innerHTML = form[4].value;
  noOfParts.innerHTML = form[5].value;
  sNumber.innerHTML = form[6].value;
  cNumber.innerHTML = form[7].value;
  name.innerHTML = form[10].value;
  email.innerHTML = form[11].value;
  phone.innerHTML = "+" + countryCode.dataset.value + parseInt(form[12].value);
  deliver.innerHTML = form[15].value;
  arabicName.innerHTML = form[16].value;
  englishName.innerHTML = form[17].value;
  country.innerHTML = form[19].value;
  city.innerHTML = form[20].value;
  street.innerHTML = form[21].value;
  ZIP.innerHTML = form[22].value;
  address.innerHTML = form[23].value;
};
//

// validate if the password match in both fields and the length of the password
const validatePassword = () => {
  if (passwords[0].value !== passwords[1].value) {
    err.innerHTML = "Password doens't match";
    return false;
  } else if (step === 2 && passwords[0].value.length < 6) {
    err.innerHTML = "Password must be more than 6 letters";
    return false;
  } else {
    err.innerHTML = "";
    return true;
  }
};
//

// check if the user picked individual or company form type
const individualOrCompany = () => {
  if (inputformType.value === "individual") {
    howMany.min = 1;
    serial.required = true;
    carNumber.style.display = "block";
    carNumber.required = true;
    carNumber.previousElementSibling.style.display = "block";
  } else {
    howMany.min = 10;
    serial.required = false;
    carNumber.style.display = "none";
    carNumber.required = false;
    carNumber.previousElementSibling.style.display = "none";
  }
};
//

// check if all the required fields are not empty and validating the email
const validateFields = (step) => {
  const steps = document.querySelectorAll("form > section");
  const fields = steps[step].querySelectorAll("*[required]");
  let isEmpty = Array.from(fields).some((field) => field.value === "");
  if (isEmpty) {
    fields.forEach((field) => {
      if (field.value === "") {
        field.classList.add("empty");
        err.innerHTML = "Please fill all required fields";
      }
    });
    return false;
  }
  if (step === 2 && !form[11].value.match(/\w+@\w+.\w+/)) {
    err.innerHTML = "Please write a valid email";
    return false;
  }
  if (step === 0)
    fields.forEach((field) => {
      field.classList.remove("empty");
      err.innerHTML = "";
    });
  return true;
};

const showCar = () => {
  const fields = steps[0].querySelectorAll("label + *[required]");
  if (Array.from(fields).every((field) => field.value !== "")) {
    const random = Math.floor(Math.random() * 3);
    car.src = randomCar[random];
    car.alt = randomCar[random];
  }
};
//  phone input
const chooseCountry = (e) => {
  const flag = e.currentTarget.parentElement.nextElementSibling;
  flag.style.backgroundImage = `url(${e.currentTarget.lastElementChild.src})`;
  e.currentTarget.parentElement.dataset.value = e.currentTarget.value;
};
codes.forEach((code) => {
  code.addEventListener("click", chooseCountry);
});
codeContainer.forEach((container) => {
  container.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("open-menu");
  });
});
//
showStep(step);
