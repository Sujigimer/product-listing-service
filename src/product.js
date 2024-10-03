const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const apiUrl = `https://fakestoreapi.com/products/${productId}`;

const fetchProductDetails = async () => {
  try {
    const response = await fetch(apiUrl);
    const product = await response.json();
    renderProductDetails(product);
  } catch (error) {
    console.error(error);
  }
};

const renderProductDetails = (product) => {
  const productDetails = document.getElementById("product-details");

  productDetails.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <h1>${product.title}</h1>
    <p>Price: $${product.price}</p>
    <p>${product.description}</p>
    <p>Category: ${product.category}</p>
    <button id="delete-product-btn">Delete Product</button>
  `;

  document
    .getElementById("delete-product-btn")
    .addEventListener("click", deleteProduct);
};

const deleteProduct = async () => {
  try {
    await fetch(apiUrl, { method: "DELETE" });
    showPopup("Product has been deleted.");
  } catch (error) {
    console.error(error);
  }
};

const showPopup = (message) => {
  const popup = document.getElementById("popup");
  document.getElementById("popup-message").innerText = message;
  popup.classList.remove("hidden");
};

document.getElementById("close-popup-btn").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
  window.location.href = "index.html";
});

fetchProductDetails();
