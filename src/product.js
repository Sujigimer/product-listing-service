const apiUrl = "https://fakestoreapi.com";

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

let products = JSON.parse(localStorage.getItem("products")) || [];

const fetchProductDetails = () => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    renderProductDetails(product);
  } else {
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = "<p>Product not found.</p>";
  }
};

const renderProductDetails = (product) => {
  const productDetails = document.getElementById("product-details");

  productDetails.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" alt="${product.title}" />
      <h1>${product.title}</h1>
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <p>Category: ${product.category}</p>
      <button id="delete-product-btn">Delete Product</button>
    </div>
  `;

  document
    .getElementById("delete-product-btn")
    .addEventListener("click", deleteProduct);
};

const deleteProduct = () => {
  products = products.filter((product) => product.id !== productId);

  localStorage.setItem("products", JSON.stringify(products));

  showPopup("Product has been deleted.");
};

const showPopup = (message) => {
  const popup = document.getElementById("popup");
  document.getElementById("popup-message").innerText = message;
  popup.classList.remove("hidden");
  popup.classList.add("show");
};

const hidePopup = () => {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
  popup.classList.add("hidden");
  window.location.href = "index.html";
};

document.getElementById("close-popup-btn").addEventListener("click", hidePopup);

fetchProductDetails();
