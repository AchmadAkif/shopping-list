//Product Constructor
class Product {
  constructor(name, price, currentDate) {
    this.name = name;
    this.price = price;
    this.date = currentDate;
  }
}

//UI Constructor
class UI {
  //Product template
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <h5><strong>${product.name}</strong></h5>
          <strong >Price</strong>: Rp.${product.price}
          <strong class="ml-4">Date Added</strong>: ${product.date} 
          <a href="#" class="btn btn-danger ml-5" name="delete">Delete</a>
        </div>
      </div>
    `;
    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      return true;
    }
  }

  showMessage(message, cssClass) {
    const msg = document.createElement("div");
    msg.className = `alert alert-${cssClass} mt-2 text-center`;
    msg.appendChild(document.createTextNode(message));

    //Render DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");

    //Insert message in the UI
    container.insertBefore(msg, app);

    //Remove after 1 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 1000);
  }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit", e => {
  const name = document.getElementById("product-name").value,
    price = document.getElementById("product-price").value

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
    
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;

  //Create a new Object Product
  const product = new Product(name, price, currentDate);

  //Create a new UI
  const ui = new UI();

  //Save product
  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage("Product added successfully", "success");

  e.preventDefault();
});

//Delete product
document.getElementById("product-list").addEventListener("click", e => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  if(ui.deleteProduct(e.target)) {
    ui.showMessage("Product removed successfully", "danger");
  }
  e.preventDefault();
});
