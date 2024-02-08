document.addEventListener('DOMContentLoaded', function () {

    // nav links

    let dropdown_link = document.getElementById("dropdown_links");
    let dropdown = document.getElementById("dropdown");
    
    dropdown_link.addEventListener("click", (event) => {
        dropdown.classList.add("nav_men_hov_active");
        event.stopPropagation(); 
    });
    
    document.body.addEventListener("click", function (event) {
        if (dropdown) {
            dropdown.classList.remove("nav_men_hov_active");
        }
    });
    
    document.body.addEventListener("scroll", function (event) {
        if (dropdown) {
            dropdown.classList.remove("nav_men_hov_active");
        }
    });
    

    //  tab btn -> feature
    let tab_btn = document.querySelectorAll(".tab_btn");
    let all_content = document.querySelectorAll(".content");

    tab_btn.forEach((tab, index) => {

        tab.addEventListener('click', () => {
            tab_btn.forEach((remove_tab) => {
                remove_tab.classList.remove('active_btn');
            })
            tab.classList.add('active_btn');

            all_content.forEach((remove_all_c_active) => {
                remove_all_c_active.classList.remove('active_produc_card');
            });
            all_content[index].classList.add('active_produc_card');

        });

    });

    //  product details 

    let show_img = document.getElementById("show_img");
    let list_img = document.querySelectorAll(".list_img");

    list_img.forEach((img) => {
        console.log(show_img.src);

        img.addEventListener('click', () => {
            show_img.src = img.src;

        })
    });
});

    // user profile 

    function openTabs(tabsName) {
        var i;
        var x = document.getElementsByClassName("step-tab");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }

        document.getElementById(tabsName).style.display = "block";
      }

// swiper -> banner
var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 4000,
    },
    mousewheel: true,
    keyboard: true,
});


//  ajax implemention for quantity of cart product. 


// add to cart 

function addToCart() {
    $(".add_to_cart").click(function(){
        let id = $(this).attr("pid");
        let name = $(this).attr("pname");
        // let prod_live_update = $("#prod_live_update")
        let value = 'added';

        // Store a reference to the clicked element
        let clickedElement = this;

        $.ajax({
            type: 'GET',
            url: '/cart/add-to-cart-auto',
            data: {
                prod_id: id,
                prod_name: name,
            },
            success: function(data) {
                console.log(data);
                // prod_live_update.text(data.prod_counting);

                // Update the text of the clicked element
                clickedElement.innerText = value;
            },
            error: function(data) {
                console.log("Error:", data);
                // Handle the error, e.g., display an error message
            }
        });
    });
}

addToCart();


//  quantity plus. 
$(".plus-quantity").click(function () {
    let id = $(this).attr("pid")
    let quantity_product = $(this).closest(".quantity_parent").find(".quantity-product");

    $.ajax({
        type: 'GET',
        url: '/cart/pluscart',
        data: {
            prod_id: id
        },
        success: function (data) {
            quantity_product.text(data.quantity);

            document.getElementById('totalamount').innerText = data.total_amount + '$';
            document.getElementById('amount').innerText = data.amount;
        },
    })


})

// quantity minus 
$(".minus-quantity").click(function () {
    let id = $(this).attr("pid")
    let quantity_product = $(this).closest(".quantity_parent").find(".quantity-product");


    $.ajax({
        type: 'GET',
        url: '/cart/minuscart',
        data: {
            prod_id: id
        },
        success: function (data) {
            console.log(data);
            quantity_product.text(data.quantity);

            document.getElementById('totalamount').innerText = data.total_amount;
            document.getElementById('amount').innerText = data.amount;
        },
    })


})


// remove cart 
$(".remove_btn").click(function () {
    let id = $(this).attr("pid")

    $.ajax({
        type: 'GET',
        url: '/cart/remove',
        data: {
            prod_id: id
        },
        success: function (data) {
            console.log(data);

            document.getElementById("remove_cart").remove();

            document.getElementById('totalamount').innerText = data.total_amount;
            document.getElementById('amount').innerText = data.amount;
        },
    })


})

