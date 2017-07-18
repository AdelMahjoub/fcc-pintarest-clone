var usernameControl          = $('#username').parent();
var usernameInput            = $('#username');
var usernameHelp             = usernameControl.next();
var usernameIsValidIcon      = $('.icon[data="username-valid"]');
var usernameIsInvalidIcon    = $('.icon[data="username-invalid"]');
var USERNAME_MIN_LENGTH      = 4;
var USERNAME_MAX_LENGTH      = 12;
var validUsername            = false;


function containsSpecialChars(value) {
  var patt = /^[a-zA-Z0-9_-]+$/;
  return !patt.test(value);
}

function usernameLength(value) {
  return (value.length >= USERNAME_MIN_LENGTH && value.length < USERNAME_MAX_LENGTH);
}

function usernameIsValid(value) {
  return (!containsSpecialChars(value) && usernameLength(value));
}

function validate(e) {
  var value = e.target.value;
  toggleValidationIcons(value);
  highLightUsernameField(value);
  validationHelpMessages(value);
}

function toggleValidationIcons(value) {
  if(usernameIsValid(value)) {
    if(usernameIsValidIcon.hasClass('is-hidden')) {
      usernameIsValidIcon.removeClass('is-hidden');
    }
    if(!usernameIsInvalidIcon.hasClass('is-hidden')) {
      usernameIsInvalidIcon.addClass('is-hidden');
    }
  } else {
    if(!usernameIsValidIcon.hasClass('is-hidden')) {
      usernameIsValidIcon.addClass('is-hidden');
    }
    if(usernameIsInvalidIcon.hasClass('is-hidden')) {
      usernameIsInvalidIcon.removeClass('is-hidden');
    }
  }
}

function highLightUsernameField(value) {
  if(!usernameIsValid(value)) {
    usernameInput.addClass('is-danger');
    usernameInput.removeClass('is-success');
    usernameHelp.addClass('is-danger');
    usernameHelp.removeClass('is-success');
  } else {
    usernameInput.addClass('is-success');
    usernameInput.removeClass('is-danger');
    usernameHelp.addClass('is-success');
    usernameHelp.removeClass('is-danger');
  }
}

function validationHelpMessages(value) {
  if(!usernameIsValid(value)) {
    if(value === '') {
      usernameHelp.text('Username is required');
    } else {
      if(containsSpecialChars(value)) {
        usernameHelp.text('Username should not contains special chars');
      } else if(!usernameLength(value)) {
        usernameHelp.text('Username length should be between 4 and 8 characters');
      }
    }
  } else {
    usernameHelp.text('Valid');
  }
}

function resetValidation() {
  if(!usernameIsValidIcon.hasClass('is-hidden')) {
    usernameIsValidIcon.addClass('is-hidden');
  }
  if(!usernameIsInvalidIcon.hasClass('is-hidden')) {
    usernameIsInvalidIcon.addClass('is-hidden');
  }
  usernameInput.removeClass('is-success');
  usernameInput.removeClass('is-danger');
  usernameHelp.text('');
}


$(document).ready(function () {

  usernameInput.blur(validate);
  usernameInput.on('keydown', resetValidation);
  
});