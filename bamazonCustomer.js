var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

var showProducts = function () {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    var showTable = new Table({
      head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
      colWidths: [10, 45, 25, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      showTable.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(showTable.toString());
    purchPrompt();
  });
}

function purchPrompt() {
  inquirer.prompt([
    {
      name: "ID",
      type: "input",
      message: "Please enter the ID of the product you would like to purchase.",
      filter: Number
    },
    {
      name: "Quantity",
      type: "input",
      message: "Please enter the number of units you would like to purchase?",
      filter: Number
    },
  ]).then(function (input) {
    var idInput = input.ID;
    var quantityInput = input.Quantity;
    placeOrder(idInput, quantityInput);
  });
};

function placeOrder(idDesired, quantityDesired) {
  connection.query("Select * FROM products WHERE item_id = " + idDesired, function (err, res) {
    if (err) { console.log(err) };
    if (quantityDesired <= res[0].stock_quantity) {
      var totalCost = res[0].price * quantityDesired;
      console.log("Your order is in stock!");
      console.log("Your total for " + quantityDesired + " " + res[0].product_name + " is " + totalCost + ".");

      connection.query("UPDATE products SET stock_quantity =  " + (res[0].stock_quantity - quantityDesired) + " WHERE item_id = " + idDesired);
    } else {
      console.log("Sorry Insufficient quantity of " + res[0].product_name + " in stock!");
    };
    showProducts();
  });
};

showProducts();