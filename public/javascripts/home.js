var runningPrice = 0.0;
var runningQuantity = 0;

var quantity;
var currentItem;

var openDropDown = false;
function removeFromCart(event) {
  let priceToSubtract =
    event.target.parentElement.parentElement.parentElement
      .previousElementSibling.firstChild.firstChild.firstChild
      .nextElementSibling.innerText;
  priceToSubtract = parseFloat(priceToSubtract);
  runningPrice -= priceToSubtract;
  let checkIfSoftDrink =
    event.target.parentElement.parentElement.parentElement
      .previousElementSibling.previousElementSibling.children[0];
  if (checkIfSoftDrink.innerText[0] === "Q") {
    runningQuantity -= parseInt(
      checkIfSoftDrink.innerText[checkIfSoftDrink.innerText.length - 1]
    );
  } else {
    runningQuantity -= 1;
  }
  document.getElementsByClassName(
    "running-quantity"
  )[0].innerText = `Total: ${runningQuantity} items`;
  document.getElementsByClassName(
    "running-price"
  )[0].innerText = `$${runningPrice.toFixed(2)}`;
  document.getElementsByClassName(
    "total-price"
  )[0].innerText = `${runningPrice.toFixed(2)}`;
  let cartItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  while (cartItem.firstChild) {
    cartItem.firstChild.remove();
  }
  cartItem.remove();
  if (runningQuantity === 0) {
    document.getElementsByTagName("footer")[0].style.display = "none";
    document.getElementsByClassName("shopping-cart")[0].style.display = "none";
    document.getElementsByTagName("main")[0].children[0].style.display =
      "block";
  }
}

function hideCart() {
  document.getElementsByClassName("shopping-cart")[0].style.display = "none";
  document.getElementsByTagName("main")[0].children[0].style.display = "block";
}

var viewCartButton = document.getElementsByClassName("view-cart-button")[0];
viewCartButton.addEventListener("click", function () {
  document.getElementsByTagName("main")[0].children[0].style.display = "none";
  document.getElementsByClassName("shopping-cart")[0].style.display = "block";
});

var addToCartButtons = document.getElementsByClassName("add-to-cart-button");
for (let i = 0; i < addToCartButtons.length - 4; i++) {
  var addButton = addToCartButtons[i];
  addButton.addEventListener("click", function (event) {
    if (openDropDown === true) {
      alert("Can only add 1 item to cart at a time");
    } else {
      currentItem = 1;
      quantity =
        event.target.parentElement.previousElementSibling.children[1].innerText;
      quantity = parseInt(quantity);

      if (quantity === 1) {
        event.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].innerText = `Extra Information`;
      } else {
        event.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].innerText = `Extra Information ${currentItem}/${quantity}`;
      }
      event.target.parentElement.parentElement.parentElement.nextElementSibling.style.display =
        "block";

      openDropDown = true;
    }
  });
}

for (let i = addToCartButtons.length - 4; i < addToCartButtons.length; i++) {
  var addButton = addToCartButtons[i];
  addButton.addEventListener("click", function (event) {
    let price =
      event.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.children[0].children[0].innerText;
    price = parseFloat(price.substring(1));

    let quant =
      event.target.parentElement.previousElementSibling.children[1].innerText;
    quant = parseInt(quant);

    runningPrice = runningPrice + price * quant;
    runningQuantity += quant;

    let cart = document.getElementsByTagName("footer")[0];
    let updateQuantity = document.getElementsByClassName("running-quantity")[0];
    let updatePrice = document.getElementsByClassName("running-price")[0];

    updateQuantity.innerText = `Total: ${runningQuantity} items`;
    updatePrice.innerText = `$${runningPrice.toFixed(2)}`;
    cart.style.display = "flex";
    document.getElementsByClassName(
      "total-price"
    )[0].innerText = `${runningPrice.toFixed(2)}`;

    var object = {};
    object.price = price;
    object.quantity = quant;
    object.img =
      event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getAttribute(
        "src"
      );
    object.item =
      event.target.parentElement.previousElementSibling.previousElementSibling.innerText;
    var newCartItem;
    newCartItem = `<div class="cart-flex"><div class="img-wrapper"><div><img class="cart-img" src="${
      object.img
    }" /></div></div><div class="cart-wrapper-price"><p>$${object.price.toFixed(
      2
    )} | ${
      object.item
    }</p></div><div class="cart-wrapper-quantity"><p>Quantity: ${
      object.quantity
    }</p></div><div><p><strong>Total Item Price: $<span>${(
      object.price * object.quantity
    ).toFixed(
      2
    )}</strong></p></div><div class="cart-button-container"><div class="cart-button-wrapper"><div class="cart-remove-button-container"><button class="cart-remove-button" onclick="removeFromCart(event)">Remove</button></div></div></div></div>`;
    var insertPosition = document.getElementsByClassName("cart-back-button")[0];
    insertPosition.insertAdjacentHTML("afterend", newCartItem);
  });
}

var cancelButtons = document.getElementsByClassName("cancel");
for (let i = 0; i < cancelButtons.length; i++) {
  var cancelButton = cancelButtons[i];
  cancelButton.addEventListener("click", function (event) {
    event.target.parentElement.parentElement.parentElement.style.display =
      "none";
    openDropDown = false;
  });
}

var confirmButtons = document.getElementsByClassName("confirm");
for (let i = 0; i < confirmButtons.length; i++) {
  var confirmButton = confirmButtons[i];
  confirmButton.addEventListener("click", function (event) {
    let price =
      event.target.parentElement.parentElement.parentElement
        .previousElementSibling.children[1].children[0].children[0].innerText;
    price = parseFloat(price.substring(1));
    runningPrice = runningPrice + price;
    runningQuantity = runningQuantity + 1;

    let cart = document.getElementsByTagName("footer")[0];
    let updateQuantity = document.getElementsByClassName("running-quantity")[0];
    let updatePrice = document.getElementsByClassName("running-price")[0];

    var object = {};
    object.price = price;
    object.extraPrice = 0;
    object.img =
      event.target.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].getAttribute(
        "src"
      );
    object.item =
      event.target.parentElement.parentElement.parentElement.previousElementSibling.children[3].children[0].children[0].innerText;
    object.comments = event.target.parentElement.previousElementSibling.value;

    let type =
      event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].getAttribute(
        "type"
      );

    var formName =
      event.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.children[0].children[0]
        .name;

    if (type === "radio") {
      let milkButtons = document.getElementsByName(formName);
      for (let j = 0; j < milkButtons.length; j++) {
        if (milkButtons[j].checked === true) {
          object.milkType = milkButtons[j].nextElementSibling.innerText;
          milkButtons[0].checked = true;
          break;
        }
      }
    } else if (type === "checkbox") {
      let remButtons = document.getElementsByName(formName);
      object.remove = [];
      for (let j = 0; j < remButtons.length; j++) {
        if (remButtons[j].checked === true) {
          object.remove.push(remButtons[j].nextElementSibling.innerText);
        }
      }

      formName = formName.slice(0, -3);
      formName = formName + "add";
      let addButtons = document.getElementsByName(formName);
      object.add = [];
      for (let j = 0; j < addButtons.length; j++) {
        if (addButtons[j].checked === true) {
          object.add.push(addButtons[j].nextElementSibling.innerText);
        }
      }
    }

    if (object.add !== undefined && object.add.length > 0) {
      for (let j = 0; j < object.add.length; j++) {
        let len = object.add[j].length;
        let extraPrice = object.add[j].slice(len - 5, -1);
        extraPrice = parseFloat(extraPrice);
        if (!isNaN(extraPrice)) {
          runningPrice = runningPrice + extraPrice;
          object.extraPrice += extraPrice;
        }
      }
    }
    updateQuantity.innerText = `Total: ${runningQuantity} items`;
    updatePrice.innerText = `$${runningPrice.toFixed(2)}`;
    cart.style.display = "flex";
    document.getElementsByClassName(
      "total-price"
    )[0].innerText = `${runningPrice.toFixed(2)}`;

    if (currentItem === quantity) {
      event.target.parentElement.parentElement.parentElement.style.display =
        "none";
      openDropDown = false;
    } else {
      currentItem += 1;
      let name =
        event.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.children[0].children[0]
          .className;
      var checkboxes = document.getElementsByClassName(name);
      for (let j = 0; j < checkboxes.length; j++) {
        let checkbox = checkboxes[j];
        if (checkbox.getAttribute("type") === "radio" && j == 0) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      }
      event.target.parentElement.previousElementSibling.innerText = "";
      event.target.parentElement.parentElement.previousElementSibling.innerText = `Extra Information ${currentItem}/${quantity}`;
    }
    var toAdd = "",
      toRem = "";
    if (object.add === undefined || object.add.length === 0) {
      toAdd = `No ingredients to be added`;
    } else {
      let leng = object.add.length;
      if (leng > 1) {
        for (let j = 0; j < object.add.length - 1; j++) {
          toAdd += object.add[j] + `,&nbsp;`;
        }
      }

      toAdd += object.add[object.add.length - 1];
    }

    if (object.remove === undefined || object.remove.length === 0) {
      toRem = `No ingredients to be removed`;
    } else {
      let leng = object.add.length;
      if (leng === 1) {
        for (let j = 0; j < object.remove.length - 1; j++) {
          toRem += object.remove[j] + `,&nbsp;`;
        }
      }

      toRem += object.remove[object.remove.length - 1];
    }
    if (object.comments === "") {
      object.comments = `No additional comments`;
    }
    var newCartItem;
    if (type === "radio") {
      newCartItem = `<div class="cart-flex"><div class="img-wrapper"><div><img class="cart-img" src="${
        object.img
      }" /></div></div><div class="cart-wrapper-price"><p>$${object.price.toFixed(
        2
      )} | ${object.item}</p></div><div class="cart-wrapper-add"><p>+ ${
        object.milkType
      }</p></div><div class="cart-wrapper-comments"><p><em>${
        object.comments
      }</em></p></div><div><p><strong>Total Item Price: $<span>${(
        object.price + object.extraPrice
      ).toFixed(
        2
      )}</strong></p></div><div class="cart-button-container"><div class="cart-button-wrapper"><div class="cart-remove-button-container"><button class="cart-remove-button" onclick="removeFromCart(event)">Remove</button></div></div></div></div>`;
    } else {
      newCartItem = `<div class="cart-flex"><div class="img-wrapper"><div><img class="cart-img" src="${
        object.img
      }" /></div></div><div class="cart-wrapper-price"><p>$${object.price.toFixed(
        2
      )} | ${
        object.item
      }</p></div><div class="cart-wrapper-add"><p>+ ${toAdd}</p></div><div class="cart-wrapper-remove"><p>- ${toRem}</p></div><div class="cart-wrapper-comments"><p><em>${
        object.comments
      }</em></p></div><div><p><strong>Total Item Price: $<span>${(
        object.price + object.extraPrice
      ).toFixed(
        2
      )}</span></strong></p></div><div class="cart-button-container"><div class="cart-button-wrapper"><div class="cart-remove-button-container"><button class="cart-remove-button" onclick="removeFromCart(event)">Remove</button></div></div></div></div>`;
    }
    var insertPosition = document.getElementsByClassName("cart-back-button")[0];
    insertPosition.insertAdjacentHTML("afterend", newCartItem);
  });
}

const foodButton = document.querySelector(".food-button");
const drinkButton = document.querySelector(".drink-button");

foodButton.addEventListener("click", switchToFood);
drinkButton.addEventListener("click", switchToDrink);

function switchToFood() {
  const food = document.querySelector(".food");
  if (getComputedStyle(food).display !== "none") {
    return;
  }

  document.getElementsByClassName("drink")[0].style.display = "none";
  document.getElementsByClassName("drink-button")[0].style.color = "#c0c0c0";
  document.getElementsByClassName("drink-button")[0].style.backgroundColor =
    "white";

  document.getElementsByClassName("food")[0].style.display = "block";
  document.getElementsByClassName("food-button")[0].style.color = "white";
  document.getElementsByClassName("food-button")[0].style.backgroundColor =
    "black";
}

function switchToDrink() {
  const drink = document.querySelector(".drink");
  if (getComputedStyle(drink).display !== "none") {
    return;
  }

  document.getElementsByClassName("food")[0].style.display = "none";
  document.getElementsByClassName("food-button")[0].style.color = "#c0c0c0";
  document.getElementsByClassName("food-button")[0].style.backgroundColor =
    "white";

  document.getElementsByClassName("drink")[0].style.display = "block";
  document.getElementsByClassName("drink-button")[0].style.color = "white";
  document.getElementsByClassName("drink-button")[0].style.backgroundColor =
    "black";
}

var incrementers = document.getElementsByClassName("increment");
var decrementers = document.getElementsByClassName("decrement");
for (let i = 0; i < incrementers.length; i++) {
  var incButton = incrementers[i];
  var decButton = decrementers[i];

  incButton.addEventListener("click", function (event) {
    let quantity = parseInt(event.target.previousElementSibling.innerText);
    quantity += 1;
    if (quantity < 10) {
      if (quantity === 9) {
        event.target.style.color = "#c0c0c0";
      }
      if (quantity === 2) {
        event.target.previousElementSibling.previousElementSibling.style.color =
          "black";
      }
      event.target.previousElementSibling.innerText = quantity;
    }
  });

  decButton.addEventListener("click", function (event) {
    let quantity = parseInt(event.target.nextElementSibling.innerText);
    if (quantity === 9) {
      event.target.nextElementSibling.nextElementSibling.style.color = "black";
    }
    quantity -= 1;
    if (quantity > 0) {
      if (quantity === 1) {
        event.target.style.color = "#c0c0c0";
      }

      event.target.nextElementSibling.innerText = quantity;
    }
  });
}

document
  .getElementsByClassName("last-add")[0]
  .addEventListener("click", function () {
    document.getElementsByClassName("last-one")[0].style.marginBottom = "70px";
    document.getElementsByClassName("last-info")[0].style.marginBottom =
      "400px";
  });

document
  .getElementsByClassName("last-confirm")[0]
  .addEventListener("click", function () {
    document.getElementsByClassName("last-one")[0].style.marginBottom = "150px";
    document.getElementsByClassName("last-info")[0].style.marginBottom =
      "400px";
  });
