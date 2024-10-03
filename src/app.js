const apiUrl = "https://fakestoreapi.com";

let products = [];

const fetchProducts = async () => {
  try {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    } else {
      // API
      const response = await fetch(`${apiUrl}/products`);
      products = await response.json();
      // local
      localStorage.setItem("products", JSON.stringify(products));
    }

    products.sort((a, b) => a.price - b.price);

    // Limitas
    const limitedProducts = products.slice(0, 100);

    renderProducts(limitedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Kviečiam produktus
const renderProducts = (productList) => {
  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = "";

  productList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
    `;

    productCard.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    // Appendinam iki negalėjimo
    productListElement.appendChild(productCard);
  });
};

const restoreProducts = async () => {
  try {
    // Iš api
    const response = await fetch(`${apiUrl}/products`);
    products = await response.json();

    // lokaliai saugom
    localStorage.setItem("products", JSON.stringify(products));

    fetchProducts();
  } catch (error) {
    console.error("Error restoring products:", error);
  }
};

document
  .getElementById("restore-products-btn")
  .addEventListener("click", restoreProducts);

document.getElementById("add-product-btn").addEventListener("click", () => {
  window.location.href = "add-product.html";
});

fetchProducts();
