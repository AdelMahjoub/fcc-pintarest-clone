
var MIN_LENGTH = 6;

var passwordControl = $('#password').parent();
var passwordField = $('#password');
var passwordHelp = passwordControl.next();
var isValidPasswordIcon   = $('.icon[data="password-valid"]');
var isInValidPasswordIcon = $('.icon[data="password-invalid"]');

var confirmPasswordControl = $('#confirm-password').parent(); 
var confirmPasswordField = $('#confirm-password');
var confirmPasswordHelp = confirmPasswordControl.next();
var isValidConfirmPasswordIcon   = $('.icon[data="confirm-password-valid"]');
var isInValidConfirmPasswordIcon = $('.icon[data="confirm-password-invalid"]');

var validPassword = false;
var validConfirmPassword = false;

function lengthMisMatch(value) {
  return value.length < MIN_LENGTH;
}

function passwordMisMatch(password, confirmPassword) {
  return password !== confirmPassword;
}

function validatePassword(e) {
  var pass = e.target.value;
  passwordToggleValidationIcons(pass);
  highLightPasswordField(pass);
  validationPasswordHelpMessages(pass);
}

function validateConfirmPassword(e) {
  var pass = passwordField.val();
  var confirm = e.target.value;
  confirmPasswordToggleValidationIcons(pass, confirm);
  highLightConfirmPasswordField(pass, confirm);
  validationConfirmPasswordHelpMessages(pass, confirm);
}

function passwordToggleValidationIcons(value) {
  if(!lengthMisMatch(value)) {
    if(isValidPasswordIcon.hasClass('is-hidden')) {
      isValidPasswordIcon.removeClass('is-hidden');
    }
    if(!isInValidPasswordIcon.hasClass('is-hidden')) {
      isInValidPasswordIcon.addClass('is-hidden');
    }
  } else {
    if(!isValidPasswordIcon.hasClass('is-hidden')) {
      isValidPasswordIcon.addClass('is-hidden');
    }
    if(isInValidPasswordIcon.hasClass('is-hidden')) {
      isInValidPasswordIcon.removeClass('is-hidden');
    }
  }
}

function confirmPasswordToggleValidationIcons(pass, confirm) {
  if(!passwordMisMatch(pass, confirm) && confirm !== '' && !lengthMisMatch(passwordField.val())) {
    if(isValidConfirmPasswordIcon.hasClass('is-hidden')) {
      isValidConfirmPasswordIcon.removeClass('is-hidden');
    }
    if(!isInValidConfirmPasswordIcon.hasClass('is-hidden')) {
      isInValidConfirmPasswordIcon.addClass('is-hidden');
    }
  } else {
    if(!isValidConfirmPasswordIcon.hasClass('is-hidden')) {
      isValidConfirmPasswordIcon.addClass('is-hidden');
    }
    if(isInValidConfirmPasswordIcon.hasClass('is-hidden')) {
      isInValidConfirmPasswordIcon.removeClass('is-hidden');
    }
  }
}

function highLightPasswordField(value) {
  if(lengthMisMatch(value)) {
    passwordField.addClass('is-danger');
    passwordField.removeClass('is-success');
    passwordHelp.addClass('is-danger');
    passwordHelp.removeClass('is-success');
  } else {
    passwordField.addClass('is-success');
    passwordField.removeClass('is-danger');
    passwordHelp.addClass('is-success');
    passwordHelp.removeClass('is-danger');
  }
}

function highLightConfirmPasswordField(pass, confirm) {
  if(passwordMisMatch(pass, confirm) || confirm === '' || lengthMisMatch(passwordField.val())) {
    confirmPasswordField.addClass('is-danger');
    confirmPasswordField.removeClass('is-success');
    confirmPasswordHelp.addClass('is-danger');
    confirmPasswordHelp.removeClass('is-success');
  } else {
    confirmPasswordField.addClass('is-success');
    confirmPasswordField.removeClass('is-danger');
    confirmPasswordHelp.addClass('is-success');
    confirmPasswordHelp.removeClass('is-danger');
  }
}

function validationPasswordHelpMessages(value) {
  if(lengthMisMatch(value)) {
    if(value === '') {
      passwordHelp.text('Password is required');
    } else {
      passwordHelp.text('Password minimum length 6 characters');
    }
  } else {
    passwordHelp.text('Valid');
  }
}

function validationConfirmPasswordHelpMessages(pass, confirm) {
  if(passwordMisMatch(pass, confirm)) {
    confirmPasswordHelp.text('Passwords do not match');
  } else if(!lengthMisMatch(passwordField.val())){
    confirmPasswordHelp.text('Valid');
  }
  if(confirm === '') {
    confirmPasswordHelp.text('Please confirm the password');
  }
      
}

function resetPasswordValidation() {
  if(!isValidPasswordIcon.hasClass('is-hidden')) {
    isValidPasswordIcon.addClass('is-hidden');
  }
  if(!isInValidPasswordIcon.hasClass('is-hidden')) {
    isInValidPasswordIcon.addClass('is-hidden');
  }
  passwordField.removeClass('is-success');
  passwordField.removeClass('is-danger');
  passwordHelp.text('');
}

function resetConfirmPasswordValidation() {
  if(!isValidConfirmPasswordIcon.hasClass('is-hidden')) {
    isValidConfirmPasswordIcon.addClass('is-hidden');
  }
  if(!isInValidConfirmPasswordIcon.hasClass('is-hidden')) {
    isInValidConfirmPasswordIcon.addClass('is-hidden');
  }
  confirmPasswordField.removeClass('is-success');
  confirmPasswordField.removeClass('is-danger');
  confirmPasswordHelp.text('');
}

$(document).ready(function () {

  passwordField.blur(validatePassword);
  confirmPasswordField.blur(validateConfirmPassword);
  passwordField.on('keydown', resetPasswordValidation);
  confirmPasswordField.on('keydown', resetConfirmPasswordValidation);
  
});