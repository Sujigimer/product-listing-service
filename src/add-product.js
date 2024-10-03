const apiUrl = "https://fakestoreapi.com";

const validationPatterns = {
  title: /^.{1,100}$/,
  image: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
  price: /^\d+(\.\d{1,2})?$/,
  description: /^.{1,500}$/,
  category: /^.{1,100}$/,
};

document.getElementById("add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProduct = {};

  for (let [key, value] of formData.entries()) {
    if (!validationPatterns[key].test(value)) {
      alert(`Invalid ${key}`);
      return;
    }
    newProduct[key] = value;
  }

  newProduct.id = Date.now();

  newProduct.price = parseFloat(newProduct.price);

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("success-message").classList.remove("hidden");

  e.target.reset();
});
