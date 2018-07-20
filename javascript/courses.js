//displayCart : function
//My process to this jquery summary as well as the external js file is commented out belowe the code
//prevent default will prevent the link's default behaviour
$(".add-to-cart").click(function(event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var description = $(this).attr("data-description");
    var duration = $(this).attr("data-duration");
    var cost = Number($(this).attr("data-cost"));

    shoppingCart.addItemToCart(name, description, duration, cost, 1);
    displayCart();
});

$("#clear-cart").click(function(event) {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray.length);
    var output = "";
    for (var i in cartArray) {
        output += "<li>" + "<b>Course Name:</b> "+cartArray[i].name+ "<br/>"+ "<b>Course Description:</b> "+cartArray[i].description+"<br/>"+"<b>Course Duration:</b> "+ cartArray[i].duration+"<br/>"+ "<b>Cost:</b> " +cartArray[i].cost+"<br/>"+ "<b>Number of Lessons:</b> "+ cartArray[i].count+" x "+ cartArray[i].total+"<br/>"+"<button class='subtract-item' data-name='"+cartArray[i].name+"'>Remove Item</button>"+"<button class='delete-item' data-name='"+ cartArray[i].name+"'>Remove All</button>"+"</li>";
    }

    $("#show-cart").html(output);
    $("#count-cart").html(shoppingCart.countCart());
      $("#total-cart").html(shoppingCart.totalCart());
}

$("#show-cart").on("click", ".delete-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

    displayCart();

    //shopping cart functions

    var shoppingCart = [{"name":"Intro to Coding: Music","description":"Code a song using SonicPi software on a Raspberry Pi computer.","duration":"3 hours","cost":250,"count":1}];
    shoppingCart.cart = [];
    shoppingCart.Course = function(name, description, duration, cost, count) {
        this.name = name
        this.description = description
        this.duration = duration
        this.cost = cost
        this.count = count
    };
    shoppingCart.addItemToCart = function(name, description, duration, cost, count) {
        //loop every item in cart
        for (var i in this.cart) {
            //look at each item in the name property and match
            if (this.cart[i].name === name) {
                this.cart[i].count += count;
                this.saveCart();
                return;
            }
        }
       var course = new this.Course (name, description, duration, cost, count);
       this.cart.push(course);
        this.saveCart();
    }

    shoppingCart.removeItemFromCart = function(name) {
        for (var i in this.cart) {
            if (this.cart[i].name === name) {
                this.cart[i].count --;
                if (this.cart[i].count === 0) {
                    this.cart.splice(i, 1); //to remove an item from the array
                }
                break;
            }
        }
        this.saveCart();
    }

    shoppingCart.removeItemFromCartAll = function(name){
        for (var i in this.cart) {
            if(this.cart[i].name === name){
            this.cart.splice(i, 1);
            break;
        }
      }
        this.saveCart();
    };

    shoppingCart.clearCart = function() {
        this.cart = [];
        this.saveCart();
    }

    shoppingCart.countCart = function() {
        var totalCount = 0;
        for (var i in this.cart) {
            totalCount += this.cart[i].count;
        }
        return totalCount;
    }

    shoppingCart.totalCart = function() {
        var totalCost = 0;
        for (var i in this.cart) {
            totalCost += this.cart[i].cost * this.cart[i].count;
        }
        return totalCost;
    }

    shoppingCart.listCart = function() {
        var cartCopy = [];
        for (var i in this.cart) {
            var course = this.cart[i];
            var courseCopy = {};
            //p for property
            for ( var p in course) {
                courseCopy [p] = course[p];
            }
            courseCopy.total = course.cost * course.count;
            cartCopy.push(courseCopy);
        }
        return cartCopy;
    }

    shoppingCart.saveCart = function() {
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    }

    shoppingCart.loadCart = function() {
        this.cart = JSON.parse( localStorage.getItem("shoppingCart"));
    }

    shoppingCart.loadCart();
