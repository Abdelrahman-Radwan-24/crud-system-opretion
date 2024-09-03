let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let productImageInput = document.getElementById("productImage");
let productsSearchInput = document.getElementById("productsSearch");
let productAdd = document.getElementById("productAdd");
let productUpdate = document.getElementById("productUpdate");
index = 0;

let productContainer = [];

if (localStorage.getItem("productsLocal") !== null) {
  productContainer = JSON.parse(localStorage.getItem("productsLocal"));

  displayData();
}

function AddProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription")
  ) {
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]?.name
        ? `images/products/${productImageInput.files[0]?.name} `
        : "images/products/img2.gif",
    };

    productContainer.push(product);

    clearform();

    displayData();

    localStorage.setItem("productsLocal", JSON.stringify(productContainer));
  }
}

function clearform() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productImageInput.value = "";
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}

function deleteItem(indexItem) {
  productContainer.splice(indexItem, 1);

  localStorage.setItem("productsLocal", JSON.stringify(productContainer));

  displayData();
}

function displayData() {
  let term = productsSearchInput.value;

  let cartona = ``;

  for (let i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `

              <tr>
              <td>  ${i + 1}  </td>
              <td> ${productContainer[i].name}  </td>
              <td> ${productContainer[i].price}   </td>
              <td> ${productContainer[i].category}  </td>
              <td> ${productContainer[i].description} </td>
              <td>
                <img width="100px"    src="   ${
                  productContainer[i].image
                } " alt="product">
              </td>
              <td >
                <button onclick="setFormUpdate( ${i} )" class="btn btn-outline-warning btn-sm m-1">Update</button>
                <button onclick="deleteItem( ${i} )"  class="btn btn-outline-info btn-sm m-1">Delete</button>
              </td>
              </tr>

`;
    }
  }

  document.getElementById("tableData").innerHTML = cartona;
}

function validationInputs(element, msgId) {
  let validItem = element.value;

  let regex = {
    productName: /^[A-Z][a-z]{3,8}$/,
    productPrice: /^[0-9]{3,8}$/,
    productCategory: /^(TV|Screens|Samsung|Toshiba|Mobile|Electronic)$/i,
    productDescription: /^.{3,}$/m,
  };

  let msg = document.getElementById(msgId);

  if (regex[element.id].test(validItem) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}

function setFormUpdate(indexElement) {
  productNameInput.value = productContainer[indexElement].name;
  productPriceInput.value = productContainer[indexElement].price;
  productCategoryInput.value = productContainer[indexElement].category;
  productDescriptionInput.value = productContainer[indexElement].description;

  productAdd.classList.add("d-none");
  productUpdate.classList.remove("d-none");

  index = indexElement;
}

function UpdateData() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]?.name
      ? `images/products/${productImageInput.files[0]?.name} `
      : "images/products/img2.gif",
  };

  productContainer.splice(index, 1, product);

  clearform();

  displayData();

  localStorage.setItem("productsLocal", JSON.stringify(productContainer));

  productAdd.classList.remove("d-none");
  productUpdate.classList.add("d-none");
}
