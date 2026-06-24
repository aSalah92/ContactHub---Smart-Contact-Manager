// inputs selection
let addContactBtn = document.getElementById("add-contact");
let inputsParent = new bootstrap.Modal(document.getElementById("exampleModal"));
let newContactTitle = document.getElementById("add-contact-title");
let editContactTitle = document.getElementById("edit-contact-title");
let fullName = document.getElementById("full-name");
let phoneNumber = document.getElementById("phone-number");
let email = document.getElementById("email-address");
let address = document.getElementById("address");
let groupSelect = document.getElementById("group");
let notes = document.getElementById("notes");
let favCheckbox = document.getElementById("fav");
let emergencyCheckbox = document.getElementById("emergency");

// error msg
let errorMsg = document.getElementById("error-msg");
let mainErrorMsg = document.getElementById("main-error");
let secondaryErrorMsg = document.getElementById("secondary-error");
let okErrorBtn = document.getElementById("ok-error");
let fullNameError = document.getElementById("full-name-error-msg");
let phoneError = document.getElementById("phone-error-msg");

// add contact box's buttons
let saveContact = document.getElementById("save-btn");
let editContactBtn = document.getElementById("edit-btn");
let cancelContact = document.getElementById("cancel-btn");
// numbers boxes
let numberArr = Array.from(document.getElementsByClassName("numTxt"));
let [totalNum, favNum, emergencyNum] = numberArr;

// all contacts selection
let searchBar = document.getElementById("search-inp");

// no contacts box
let savedContactsContainer = document.getElementById(
  "saved-contacts-container",
);
let noContactsMsg = document.getElementById("no-contacts");

// no favorites message
let favBody = document.getElementById("fav-body");
let noFav = document.getElementById("no-fav");

// no emergencies message
let emergencyBody = document.getElementById("emergency-body");
let noEmergency = document.getElementById("no-emergency");

// update contact msg box
let contactUpdated = document.getElementById("exampleModal-update");
let contactUpdatedModal = new bootstrap.Modal(contactUpdated);

// delete part
let delSmallMsg = document.getElementById("delete-small-msg");

let allContacts = [];
let newContact;
let fullNameForm = /^[a-zA-Z\s]{2,500}$/;
let phoneNumberForm = /^01[0125]\d{8}$/;
let favoriteContacts = 0;
let emergencyContacts = 0;
let deletedContact;
let deletedContactIndex;
let editedContact = "";
let editedContactIndex;
let editedContactArr;

// All functions

function addNewContactBtn() {
  newContactTitle.classList.remove("d-none");
  editContactTitle.classList.add("d-none");
  saveContact.classList.remove("d-none");
  editContactBtn.classList.add("d-none");
  fullName.value = "";
  phoneNumber.value = "";
  email.value = "";
  address.value = "";
  groupSelect.value = "";
  notes.value = "";
}

// getting data from localStorage if it has data while opening the page or reload it
function gettingData() {
  if (localStorage.getItem("allContacts") === "[]") {
    localStorage.removeItem("allContacts");
    localStorage.removeItem("favoriteContacts");
    localStorage.removeItem("emergencyContacts");
  }
  if (localStorage.getItem("allContacts") !== null) {
    allContacts = JSON.parse(localStorage.getItem("allContacts"));
    localStorage.getItem("favoriteContacts") === null
      ? (favoriteContacts = 0)
      : (favoriteContacts = JSON.parse(
          localStorage.getItem("favoriteContacts"),
        ));
    localStorage.getItem("emergencyContacts") === null
      ? (emergencyContacts = 0)
      : (emergencyContacts = JSON.parse(
          localStorage.getItem("emergencyContacts"),
        ));
    definingNumbers();

    noContactsMsg.classList.add("d-none");
    allContacts.forEach((ele) => {
      let HTMLNewContact = `
                <div id="${ele.id}" class="saved-contact-box">
                  <div class="name-number-box">
                    <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                    <div class="text-box">
                      <h4 id= "contact-name">${ele.fullName}</h4>
                      <div class="number-box">
                        <div class="logo-box"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></div>
                        <p id= "contact-number">${ele.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div class="email-box ${ele.email === "" ? "d-none" : ""}">
                    <div class="logo-box"><svg class="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg></div>
                    <p id= "contact-email">${ele.email}</p>
                  </div>
                  <div class="address-box ${ele.address === "" ? "d-none" : ""}">
                    <div class="logo-box"><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></div>
                    <p id= "contact-address">${ele.address}</p>
                  </div>
                  <div class="group-box ${ele.group === "Select a group" ? "d-none" : ""}">
                    <p id= "contact-group">${ele.group}</p>
                  </div>
                  <div class="links-box">
                    <div class="two-sides-links contact-box">
                      <a class="call-box" href="tel:${ele.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                      <a class="msg-box" href="mailto:${ele.mail}"><svg class="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg></a>
                    </div>
                    <div class="two-sides-links defining-links">
                      <div id="fav-${ele.phoneNumber}" class="def-links fav-box" onclick="applyFav(this.id)">
                      <svg class="${ele.favStatus === true ? "d-none" : ""} svg-inline--fa fa-star" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg>
                      <svg class="${ele.favStatus === false ? "d-none" : ""}" style="fill: rgb(255, 169, 0);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                      </div>
                      <div id="emergency-${ele.phoneNumber}" class="def-links emergency-box" onclick="applyEmergency(this.id)">
                        <svg class="${ele.emergencyStatus === true ? "d-none" : ""} svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg>
                        <svg class="${ele.emergencyStatus === false ? "d-none" : ""} svg-inline--fa fa-heart-pulse" style="color: red;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart-pulse" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"></path></svg>
                      </div>
                      <div id= "edit-${ele.phoneNumber}" class="def-links edit-box" onclick="editContact(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg class="svg-inline--fa fa-pen" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg></div>
                      <div id= "del-${ele.phoneNumber}" class="def-links delete-box" onclick="delMsg(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal-del"><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></div>
                    </div>
                  </div>
                </div>`;
      savedContactsContainer.insertAdjacentHTML("beforeend", HTMLNewContact);
      if (ele.favStatus) {
        let HTMLFavoriteContact = `
                  <div id="fav-${ele.id}" class="fav-saved-number w-100">
                    <div class="personal-box">
                      <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                      <div class="name-number">
                        <h6 id= "fav-contact-name">${ele.fullName}</h6>
                        <p id= "fav-contact-number">${ele.phoneNumber}</p>
                      </div>
                    </div>
                    <a class="dial-logo" href="tel:${ele.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                  </div>`;
        favoriteContacts > 0
          ? noFav.classList.add("d-none")
          : noFav.classList.remove("d-none");
        favBody.insertAdjacentHTML("beforeend", HTMLFavoriteContact);
      }
      if (ele.emergencyStatus) {
        let HTMLEmergencyContact = `
                  <div id="emergency-${ele.id}" class="emergency-saved-number w-100">
                    <div class="personal-box">
                      <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                      <div class="name-number">
                        <h6 id= "emergency-contact-name">${ele.fullName}</h6>
                        <p id= "emergency-contact-number">${ele.phoneNumber}</p>
                      </div>
                    </div>
                    <a class="dial-logo" href="tel:${ele.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                  </div>`;
        emergencyContacts > 0
          ? noEmergency.classList.add("d-none")
          : noEmergency.classList.remove("d-none");
        emergencyBody.insertAdjacentHTML("beforeend", HTMLEmergencyContact);
      }
    });
  } else {
    noContactsMsg.classList.remove("d-none");
  }
}

// disappearing the new contact's error msg
function errorMsgDisappearing() {
  errorMsg.classList.add("d-none");
}

// if conditions for no signs
function definingNoSigns() {
  if (allContacts.length === 0) {
    noContactsMsg.classList.remove("d-none");
  } else {
    noContactsMsg.classList.add("d-none");
  }

  if (favoriteContacts === 0) {
    noFav.classList.remove("d-none");
  } else {
    noFav.classList.add("d-none");
  }

  if (emergencyContacts === 0) {
    noEmergency.classList.remove("d-none");
  } else {
    noEmergency.classList.add("d-none");
  }
}

// defining main numbers
function definingNumbers() {
  totalNum.innerHTML = allContacts.length;
  favNum.innerHTML = favoriteContacts;
  emergencyNum.innerHTML = emergencyContacts;
}

// checking correction of name and phone number while writing them in inputs
function checkName() {
  if (fullName.value.length === 1) {
    fullNameError.classList.remove("d-none");
  } else if (fullName.value === "") {
    fullNameError.classList.add("d-none");
  } else {
    fullNameError.classList.add("d-none");
  }
}
function checkPhoneNumber() {
  if (!phoneNumberForm.test(phoneNumber.value)) {
    phoneError.classList.remove("d-none");
  } else {
    phoneError.classList.add("d-none");
  }
}

// the functionality of add a new contact button
function addContact() {
  if (fullName.value === "") {
    errorMsg.classList.remove("d-none");
    mainErrorMsg.textContent = "Missing Name";
    secondaryErrorMsg.textContent = "Please enter a name for the contact!";
  } else {
    if (phoneNumber.value === "") {
      errorMsg.classList.remove("d-none");
      mainErrorMsg.textContent = "Missing Phone";
      secondaryErrorMsg.textContent = "Please enter a phone number!";
    } else {
      if (!fullNameForm.test(fullName.value)) {
        errorMsg.classList.remove("d-none");
        mainErrorMsg.textContent = "Invalid Name";
        secondaryErrorMsg.textContent =
          "Name should contain only letters and spaces (2-50 characters)";
      } else {
        if (!phoneNumberForm.test(phoneNumber.value)) {
          errorMsg.classList.remove("d-none");
          mainErrorMsg.textContent = "Invalid Phone";
          secondaryErrorMsg.textContent =
            "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)";
        } else {
          inputsParent.hide();
          newContact = {
            id: `contact${phoneNumber.value}`,
            fullName: `${fullName.value}`,
            phoneNumber: `${phoneNumber.value}`,
            email: `${email.value}`,
            address: `${address.value}`,
            group: `${group.value}`,
            notes: `${notes.value}`,
            favStatus: favCheckbox.checked ? true : false,
            emergencyStatus: emergencyCheckbox.checked ? true : false,
          };
          allContacts.push(newContact);
          localStorage.setItem("allContacts", JSON.stringify(allContacts));
          let HTMLNewContact = `
                <div id="${newContact.id}" class="saved-contact-box">
                  <div class="name-number-box">
                    <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                    <div class="text-box">
                      <h4 id= "contact-name">${newContact.fullName}</h4>
                      <div class="number-box">
                        <div class="logo-box"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></div>
                        <p id= "contact-number">${newContact.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div class="email-box ${newContact.email === "" ? "d-none" : ""}">
                    <div class="logo-box"><svg class="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg></div>
                    <p id= "contact-email">${newContact.email}</p>
                  </div>
                  <div class="address-box ${newContact.address === "" ? "d-none" : ""}">
                    <div class="logo-box"><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></div>
                    <p id= "contact-address">${newContact.address}</p>
                  </div>
                  <div class="group-box ${newContact.group === "Select a group" ? "d-none" : ""}">
                    <p id= "contact-group">${newContact.group}</p>
                  </div>
                  <div class="links-box">
                    <div class="two-sides-links contact-box">
                      <a class="call-box" href="tel:${newContact.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                      <a class="msg-box" href="mailto:${newContact.mail}"><svg class="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg></a>
                    </div>
                    <div class="two-sides-links defining-links">
                      <div id="fav-${newContact.phoneNumber}" class="def-links fav-box" onclick="applyFav(this.id)">
                      <svg class="${newContact.favStatus === true ? "d-none" : ""} svg-inline--fa fa-star" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg>
                      <svg class="${newContact.favStatus === false ? "d-none" : ""}" style="fill: rgb(255, 169, 0);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                      </div>
                      <div id="emergency-${newContact.phoneNumber}" class="def-links emergency-box" onclick="applyEmergency(this.id)">
                        <svg class="${newContact.emergencyStatus === true ? "d-none" : ""} svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg>
                        <svg class="${newContact.emergencyStatus === false ? "d-none" : ""} svg-inline--fa fa-heart-pulse" style="color: red;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart-pulse" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"></path></svg>
                      </div>
                      <div id= "edit-${newContact.phoneNumber}" class="def-links edit-box" onclick="editContact(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg class="svg-inline--fa fa-pen" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg></div>
                      <div id= "del-${newContact.phoneNumber}" class="def-links delete-box" onclick="delMsg(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal-del"><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></div>
                    </div>
                  </div>
                </div>`;

          allContacts.length === 0
            ? noContactsMsg.classList.remove("d-none")
            : noContactsMsg.classList.add("d-none");

          savedContactsContainer.insertAdjacentHTML(
            "beforeend",
            HTMLNewContact,
          );
          //emptying inputs
          fullName.value = "";
          phoneNumber.value = "";
          email.value = "";
          address.value = "";
          group.value = "Select a group";
          notes.value = "";
          favCheckbox.checked = false;
          emergencyCheckbox.checked = false;
          // defining favorites and emergency numbers
          if (newContact.favStatus) {
            let HTMLFavoriteContact = `
                  <div id="fav-${newContact.id}" class="fav-saved-number w-100">
                    <div class="personal-box">
                      <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                      <div class="name-number">
                        <h6 id= "fav-contact-name">${newContact.fullName}</h6>
                        <p id= "fav-contact-number">${newContact.phoneNumber}</p>
                      </div>
                    </div>
                    <a class="dial-logo" href="tel:${newContact.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                  </div>`;

            favoriteContacts++;
            favoriteContacts > 0
              ? noFav.classList.add("d-none")
              : noFav.classList.remove("d-none");
            favBody.insertAdjacentHTML("beforeend", HTMLFavoriteContact);
            localStorage.setItem(
              "favoriteContacts",
              JSON.stringify(favoriteContacts),
            );
          }
          if (newContact.emergencyStatus) {
            let HTMLEmergencyContact = `
                  <div id="emergency-${newContact.id}" class="emergency-saved-number w-100">
                    <div class="personal-box">
                      <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
                      <div class="name-number">
                        <h6 id= "emergency-contact-name">${newContact.fullName}</h6>
                        <p id= "emergency-contact-number">${newContact.phoneNumber}</p>
                      </div>
                    </div>
                    <a class="dial-logo" href="tel:${newContact.phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
                  </div>`;
            emergencyContacts++;
            emergencyContacts > 0
              ? noEmergency.classList.add("d-none")
              : noEmergency.classList.remove("d-none");
            emergencyBody.insertAdjacentHTML("beforeend", HTMLEmergencyContact);
            localStorage.setItem(
              "emergencyContacts",
              JSON.stringify(emergencyContacts),
            );
          }
          definingNumbers();
          definingNoSigns();
        }
      }
    }
  }
}

// applying favorite and emergency numbers through links in the contact box
function applyFav(id) {
  console.log(id);
  let parentOfFav = document.getElementById(id);
  let parentOfFavArr = document.getElementById(id).children;
  parentOfFavArr = Array.from(parentOfFavArr);
  parentOfFavArr.forEach((ele) => {
    ele.classList.toggle("d-none");
  });
  let currentContact = parentOfFav.parentElement.parentElement.parentElement;
  let currentContactIndex = allContacts.findIndex(
    (ele) => ele.id === currentContact.id,
  );
  if (allContacts[currentContactIndex].favStatus === false) {
    allContacts[currentContactIndex].favStatus = true;
    favoriteContacts++;
    definingNumbers();
    definingNoSigns();
    localStorage.setItem("allContacts", JSON.stringify(allContacts));
    localStorage.setItem("favoriteContacts", JSON.stringify(favoriteContacts));
    let HTMLFavoriteContact = `
          <div id="fav-${allContacts[currentContactIndex].id}" class="fav-saved-number w-100">
            <div class="personal-box">
              <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
              <div class="name-number">
                <h6 id= "fav-contact-name">${allContacts[currentContactIndex].fullName}</h6>
                <p id= "fav-contact-number">${allContacts[currentContactIndex].phoneNumber}</p>
              </div>
            </div>
            <a class="dial-logo" href="tel:${allContacts[currentContactIndex].phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
          </div>`;
    favBody.insertAdjacentHTML("beforeend", HTMLFavoriteContact);
  } else {
    allContacts[currentContactIndex].favStatus = false;
    favoriteContacts--;
    definingNumbers();
    definingNoSigns();
    localStorage.setItem("allContacts", JSON.stringify(allContacts));
    localStorage.setItem("favoriteContacts", JSON.stringify(favoriteContacts));
    let removedFav = favBody.querySelector(
      `#fav-${allContacts[currentContactIndex].id}`,
    );
    removedFav.remove();
  }
}
function applyEmergency(id) {
  let parentOfEmergency = document.getElementById(id);
  let parentOfEmergencyArr = document.getElementById(id).children;
  parentOfEmergencyArr = Array.from(parentOfEmergencyArr);
  parentOfEmergencyArr.forEach((ele) => {
    ele.classList.toggle("d-none");
  });
  let currentContact =
    parentOfEmergency.parentElement.parentElement.parentElement;
  let currentContactIndex = allContacts.findIndex(
    (ele) => ele.id === currentContact.id,
  );
  if (allContacts[currentContactIndex].emergencyStatus === false) {
    allContacts[currentContactIndex].emergencyStatus = true;
    emergencyContacts++;
    definingNumbers();
    definingNoSigns();
    localStorage.setItem("allContacts", JSON.stringify(allContacts));
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(emergencyContacts),
    );
    let HTMLEmergencyContact = `
          <div id="emergency-${allContacts[currentContactIndex].id}" class="emergency-saved-number w-100">
            <div class="personal-box">
              <div class="logo-box"><svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>
              <div class="name-number">
                <h6 id= "emergency-contact-name">${allContacts[currentContactIndex].fullName}</h6>
                <p id= "emergency-contact-number">${allContacts[currentContactIndex].phoneNumber}</p>
              </div>
            </div>
            <a class="dial-logo" href="tel:${allContacts[currentContactIndex].phoneNumber}"><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></a>
          </div>`;
    emergencyBody.insertAdjacentHTML("beforeend", HTMLEmergencyContact);
  } else {
    allContacts[currentContactIndex].emergencyStatus = false;
    emergencyContacts--;
    definingNumbers();
    definingNoSigns();
    localStorage.setItem("allContacts", JSON.stringify(allContacts));
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(emergencyContacts),
    );
    let removedEmergency = emergencyBody.querySelector(
      `#emergency-${allContacts[currentContactIndex].id}`,
    );
    removedEmergency.remove();
  }
}

// clicking on edit link on the contact box
function editContact(id) {
  let editLink = document.getElementById(id);
  newContactTitle.classList.add("d-none");
  editContactTitle.classList.remove("d-none");
  editContactBtn.classList.remove("d-none");
  saveContact.classList.add("d-none");
  editedContact = editLink.parentElement.parentElement.parentElement;
  editedContactIndex = allContacts.findIndex(
    (ele) => ele.id === editedContact.id,
  );
  editedContactArr = allContacts[editedContactIndex];
  fullName.value = editedContactArr.fullName;
  phoneNumber.value = editedContactArr.phoneNumber;
  email.value = editedContactArr.email;
  address.value = editedContactArr.address;
  groupSelect.value = editedContactArr.group;
  notes.value = editedContactArr.notes;
  editedContactArr.favStatus
    ? (favCheckbox.checked = true)
    : (favCheckbox.checked = false);
  editedContactArr.emergencyStatus
    ? (emergencyCheckbox.checked = true)
    : (emergencyCheckbox.checked = false);
}

function doEditingToContact() {
  setTimeout(() => {
    contactUpdatedModal.hide();
  }, 2000);
  let oldId = editedContact.id;
  editedContact.querySelector("#contact-name").textContent = fullName.value;
  editedContact.querySelector("#contact-number").textContent =
    phoneNumber.value;
  editedContact.querySelector("#contact-email").textContent = email.value;
  email.value === ""
    ? editedContact.querySelector(".email-box").classList.add("d-none")
    : editedContact.querySelector(".email-box").classList.remove("d-none");
  editedContact.querySelector("#contact-address").textContent = address.value;
  address.value === ""
    ? editedContact.querySelector(".address-box").classList.add("d-none")
    : editedContact.querySelector(".address-box").classList.remove("d-none");
  editedContact.querySelector("#contact-group").textContent = groupSelect.value;
  groupSelect.value === "" || groupSelect.value === "Select a group"
    ? editedContact.querySelector(".group-box").classList.add("d-none")
    : editedContact.querySelector(".group-box").classList.remove("d-none");
  editedContact.id = `contact${phoneNumber.value}`;
  editedContact.querySelector(".fav-box").id = `fav-${phoneNumber.value}`;
  editedContact.querySelector(".emergency-box").id =
    `emergency-${phoneNumber.value}`;
  editedContact.querySelector(".edit-box").id = `edit-${phoneNumber.value}`;
  editedContact.querySelector(".delete-box").id = `del-${phoneNumber.value}`;
  if (favBody.querySelector(`#fav-${oldId}`)) {
    if (favCheckbox.checked) {
      favBody
        .querySelector(`#fav-${oldId}`)
        .querySelector("#fav-contact-name").textContent = fullName.value;

      favBody
        .querySelector(`#fav-${oldId}`)
        .querySelector("#fav-contact-number").textContent = phoneNumber.value;

      favBody.querySelector(`#fav-${oldId}`).id = `fav-${editedContact.id}`;
    } else {
      favBody.querySelector(`#fav-${oldId}`).remove();
      favoriteContacts--;
      if (favoriteContacts === 0) {
        noFav.classList.remove("d-none");
      }
      favNum.textContent = favoriteContacts;
      editedContactArr.favStatus = false;
      localStorage.setItem(
        "favoriteContacts",
        JSON.stringify(favoriteContacts),
      );
      Array.from(editedContact.querySelector(".fav-box").children).forEach(
        (ele) => ele.classList.toggle("d-none"),
      );
    }
  } else {
    if (favCheckbox.checked) {
      applyFav(`fav-${phoneNumber.value}`);
    }
  }
  if (emergencyBody.querySelector(`#emergency-${oldId}`)) {
    if (emergencyCheckbox.checked) {
      emergencyBody
        .querySelector(`#emergency-${oldId}`)
        .querySelector("#emergency-contact-name").textContent = fullName.value;

      emergencyBody
        .querySelector(`#emergency-${oldId}`)
        .querySelector("#emergency-contact-number").textContent =
        phoneNumber.value;

      emergencyBody.querySelector(`#emergency-${oldId}`).id =
        `emergency-${editedContact.id}`;
    } else {
      emergencyBody.querySelector(`#emergency-${oldId}`).remove();
      emergencyContacts--;
      if (emergencyContacts === 0) {
        noEmergency.classList.remove("d-none");
      }
      emergencyNum.textContent = emergencyContacts;
      editedContactArr.emergencyStatus = false;
      localStorage.setItem(
        "emergencyContacts",
        JSON.stringify(emergencyContacts),
      );
      Array.from(
        editedContact.querySelector(".emergency-box").children,
      ).forEach((ele) => ele.classList.toggle("d-none"));
    }
  } else {
    if (emergencyCheckbox.checked) {
      applyEmergency(`emergency-${phoneNumber.value}`);
    }
  }

  editedContactArr.fullName = fullName.value;
  editedContactArr.address = address.value;
  editedContactArr.email = email.value;
  editedContactArr.notes = notes.value;
  editedContactArr.phoneNumber = phoneNumber.value;
  editedContactArr.group = groupSelect.value;
  editedContactArr.id = `contact${phoneNumber.value}`;
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
}

// "Are you sure?" deletion message
function delMsg(id) {
  deletedContact =
    document.getElementById(id).parentElement.parentElement.parentElement;
  deletedContactIndex = allContacts.findIndex(
    (ele) => ele.id === deletedContact.id,
  );
  delSmallMsg.textContent = `Are you sure you want to delete ${allContacts[deletedContactIndex].fullName}?`;
  console.log(delSmallMsg);
}
// functionality of deletion
function deleteContact() {
  if (allContacts[deletedContactIndex].favStatus === true) {
    favBody.querySelector(`#fav-${deletedContact.id}`).remove();
    favoriteContacts--;
    localStorage.setItem("favoriteContacts", JSON.stringify(favoriteContacts));
  }
  if (allContacts[deletedContactIndex].emergencyStatus === true) {
    emergencyBody.querySelector(`#emergency-${deletedContact.id}`).remove();
    emergencyContacts--;
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(emergencyContacts),
    );
  }
  allContacts.splice(deletedContactIndex, 1);
  definingNumbers();
  definingNoSigns();
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  deletedContact.remove();
}

function searchContact() {
  let searchValue = searchBar.value;
  let savedContacts = Array.from(savedContactsContainer.children);
  savedContacts.forEach((ele) => {
    if (searchValue === "") {
      ele.id === "no-contacts"
        ? ele.classList.add("d-none")
        : ele.classList.remove("d-none");
    } else {
      if (ele.id !== "no-contacts") {
        ele.classList.add("d-none");
        let cName = ele.querySelector("#contact-name");
        let cNumber = ele.querySelector("#contact-number");
        let cEmail = ele.querySelector("#contact-email");
        let cAddress = ele.querySelector("#contact-address");

        if (
          cName.textContent.toLowerCase().includes(searchValue.toLowerCase()) ||
          cNumber.textContent
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          cEmail.textContent
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          cAddress.textContent.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          ele.classList.remove("d-none");
        }
      }
    }
  });
}

saveContact.addEventListener("click", addContact);
okErrorBtn.addEventListener("click", errorMsgDisappearing);
addContactBtn.addEventListener("click", addNewContactBtn);
editContactBtn.addEventListener("click", doEditingToContact);
searchBar.addEventListener("input", searchContact);
definingNoSigns();
gettingData();
