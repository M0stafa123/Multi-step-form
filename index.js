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
const imgInput = document.querySelector('input[type = "file"]');
const imgPreview = document.querySelector(".part-preview");
const partInfo = document.querySelector(".part-info");
const filler = document.querySelector(".filler");
const addPart = document.querySelector(".add");
const orders = document.querySelector(".orders");
const partsRepeater = document.querySelector(".parts-repeater");
let img;

let orderArray = [];
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
  stepIndicators.forEach((step) => {
    step.classList.remove("active");
    step.classList.remove("completed");
  });
  orderArray = [];
  orders.innerHTML = "";
  stepIndicators[step].classList.add("active");
  clear.style.display = "none";
  showStep(step);
});
//

// show the current step
const showStep = (number) => {
  if (step === 0) {
    form[25].style.display = "none";
  } else {
    form[25].style.display = "block";
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
  if (step !== 4) {
    form[26].innerHTML = "next";
  }
  stepIndicators[step].classList.add("active");
  err.innerHTML = "";
  showStep(step);
};
//

// show the next step and hide the previous
const next = () => {
  if (step === 1 && orders.innerHTML === "") {
    err.innerHTML = "please order a part";
    return false;
  }
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
    form[26].innerHTML = "Submit";
    clear.style.display = "block";
  } else {
    form[26].innerHTML = "next";

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

  name.innerHTML = form[11].value;
  email.innerHTML = form[12].value;
  phone.innerHTML = "+" + countryCode.dataset.value + parseInt(form[13].value);
  deliver.innerHTML = form[16].value;
  arabicName.innerHTML = form[17].value;
  englishName.innerHTML = form[18].value;
  country.innerHTML = form[20].value;
  city.innerHTML = form[21].value;
  street.innerHTML = form[22].value;
  ZIP.innerHTML = form[23].value;
  address.innerHTML = form[24].value;
  if (partInfo.children.length !== orderArray.length) {
    partInfo.innerHTML = "";
    orderArray.forEach((order) => {
      const div = document.createElement("div");
      const section = document.createElement("section");
      partInfo.appendChild(div);
      div.dataset.id = order.id;
      const partName = document.createElement("p");
      const seialNumber = document.createElement("p");
      const howMany = document.createElement("p");
      const carNumber = document.createElement("p");
      const partImg = document.createElement("img");
      div.appendChild(section);
      section.appendChild(partName);
      section.appendChild(howMany);
      section.appendChild(seialNumber);
      section.appendChild(carNumber);
      div.appendChild(partImg);
      partName.innerHTML = `part name: <span>${order.partName}</span>`;
      howMany.innerHTML = ` number: <span>${order.howMany}</span>`;
      seialNumber.innerHTML = `serial number: <span>${order.seialNumber}</span>`;
      console.log(partImg);
      if (order.carNumber) {
        carNumber.innerHTML = `car number: <span>${order.carNumber}</span>`;
      }
      if (order.preview) {
        partImg.src = order.preview;
      }
    });
    if (filler) {
      filler.remove();
    }
    console.log(orderArray);
  }
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
  if (step === 1) {
    return true;
  } else {
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
    if (step === 2 && !form[12].value.match(/\w+@\w+.\w+/)) {
      err.innerHTML = "Please write a valid email";
      return false;
    }
    if (step === 0)
      fields.forEach((field) => {
        field.classList.remove("empty");
        err.innerHTML = "";
      });
  }
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

addPart.addEventListener("click", () => {
  const fields = Array.from(steps[1].querySelectorAll("*[required]")).every(
    (field) => field.value !== ""
  );

  if (fields) {
    const order = document.createElement("div");
    const div = document.createElement("div");
    const orederImg = document.createElement("img");
    orders.appendChild(order);
    order.className = "order";

    const partName = document.createElement("p");
    const seialNumber = document.createElement("p");
    const howMany = document.createElement("p");
    const carNumber = document.createElement("p");
    const deleteorder = document.createElement("span");
    deleteorder.className = "delete-order";
    deleteorder.innerHTML = "delete";
    order.appendChild(div);
    div.appendChild(partName);
    div.appendChild(howMany);
    div.appendChild(seialNumber);
    div.appendChild(carNumber);
    order.appendChild(orederImg);
    const id = Math.ceil(Math.random() * 10000);

    const orderobj = {
      id: id,
      partName: form[4].value,
      howMany: form[5].value,
      seialNumber: form[6].value,
      carNumber: form[7].value,
    };
    if (img) {
      orederImg.src = img;
      orderobj.preview = img;
    }
    order.appendChild(deleteorder);
    order.dataset.id = id;
    partName.innerHTML = `part name: <span>${form[4].value}</span>`;
    howMany.innerHTML = ` number: <span>${form[5].value}</span>`;
    seialNumber.innerHTML = `serial number: <span>${form[6].value}</span>`;
    if (form[7].value) {
      carNumber.innerHTML = `car number: <span>${form[7].value}</span>`;
    }
    orderArray.push(orderobj);
    deleteorder.addEventListener("click", () => {
      const selected = orderArray.findIndex((order) => order.id === id);
      orderArray.splice(selected, 1);
      order.remove();
    });
    form[4].value = "";
    form[5].value = "";
    form[6].value = "";
    form[7].value = "";
    form[8].value = "";
    form[9].value = "";
    imgPreview.innerHTML = "";
    err.innerHTML = "";
  } else {
    err.innerHTML = "please fill the required fields";
  }
});
imgInput.addEventListener("change", (e) => {
  const files = e.currentTarget.files[0];
  if (files) {
    const fileReader = new FileReader();
    // console.log(fileReader.readAsDataURL(files));
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      img = this.result;
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });
  }
});
showStep(step);
