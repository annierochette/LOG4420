
// Wait for the DOM to be ready

$(function() {
    $("#order-form").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute of an input field. Validation rules are defined on the right side
        firstname: "required",
        lastname: "required",
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
        }
      },
      // Specify validation error messages
    //   messages: {
    //     firstname: "Please enter your firstname",
    //     lastname: "Please enter your lastname",
    //     email: "Please enter a valid email address"
    //   },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
  });