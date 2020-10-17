
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
        //TODO: Ajouter vérification pour la date d'expiration carte + message
      },
      // Specify validation error messages
    //   messages: {

    //   },
      submitHandler: function(form) {
        form.submit();
      }
    });
  });