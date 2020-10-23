// @ts-nocheck
"use strict";
const orderKey = "orders";
const cartKey = "uneCle";

// Wait for the DOM to be ready

$(function() {
  $("#order-form").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute of an input field. Validation rules are defined on the right side
      firstname: {
        required: true,
        minlength: 2
      },
      lastname: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneUS: true
      },
      creditcard: {
        required: true,
        creditcard: true
      },
      "credit-card-expiry": {
        required: true,
        expiryDate: true
      },
    },

    submitHandler: function(form) {
      form.submit();
      const orders = JSON.parse(localStorage.getItem(orderKey)) || [];
      orders.push({
        firstname: $("#first-name").val(),
        lastname: $("#last-name").val(),
        orderNumber: orders.length + 1,
      });
      localStorage.setItem(orderKey, JSON.stringify(orders));
      localStorage.removeItem(cartKey);
    }
  });
});

$.validator.addMethod("expiryDate", date => {
  return /^(0[1-9]|1[0-2])\/\d{2}$/g.test(date);
}, "La date d'expiration de votre carte de crédit est invalide.");