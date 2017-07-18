$(document).ready(function () {
  var validForm = false;
  var submitBtn = $('button[type="submit"]');

  submitBtn.attr('disabled', !validForm)
  
  $(document).on('keyup', function(e) {
    
    validEmail = emailRegex(emailInput.val());
    validUsername = usernameIsValid(usernameInput.val());
    validPassword = !lengthMisMatch(passwordField.val());
    validConfirmPassword = !passwordMisMatch(
      passwordField.val(),
      confirmPasswordField.val()
    );
    validForm = 
      validEmail && 
      validUsername &&
      validPassword &&
      validConfirmPassword;
    submitBtn.attr('disabled', !validForm);
  });
});