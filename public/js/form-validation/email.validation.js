var emailControl  = $('#email').parent();
var emailInput    = $('#email');
var emailHelp     = emailControl.next();
var isValidIcon   = $('.icon[data="email-valid"]');
var isInValidIcon = $('.icon[data="email-invalid"]');
var validEmail    = false;

function emailRegex(value) {
  var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return patt.test(value);
}

function validateEmail(e) {
  var value = e.target.value;
  toggleEmailValidationIcons(value);
  highLightEmailField(value);
  emailValidationHelpMessages(value);
}

function toggleEmailValidationIcons(value) {
  if(emailRegex(value)) {
    if(isValidIcon.hasClass('is-hidden')) {
      isValidIcon.removeClass('is-hidden');
    }
    if(!isInValidIcon.hasClass('is-hidden')) {
      isInValidIcon.addClass('is-hidden');
    }
  } else {
    if(!isValidIcon.hasClass('is-hidden')) {
      isValidIcon.addClass('is-hidden');
    }
    if(isInValidIcon.hasClass('is-hidden')) {
      isInValidIcon.removeClass('is-hidden');
    }
  }
}

function highLightEmailField(value) {
  if(!emailRegex(value)) {
    emailInput.addClass('is-danger');
    emailInput.removeClass('is-success');
    emailHelp.addClass('is-danger');
    emailHelp.removeClass('is-success');
  } else {
    emailInput.addClass('is-success');
    emailInput.removeClass('is-danger');
    emailHelp.addClass('is-success');
    emailHelp.removeClass('is-danger');
  }
}

function emailValidationHelpMessages(value) {
  if(!emailRegex(value)) {
    if(value === '') {
      emailHelp.text('Email is required');
    } else {
      emailHelp.text('Invalid Email');
    }
  } else {
    emailHelp.text('Valid');
  }
}

function resetEmailValidation() {
  if(!isValidIcon.hasClass('is-hidden')) {
    isValidIcon.addClass('is-hidden');
  }
  if(!isInValidIcon.hasClass('is-hidden')) {
    isInValidIcon.addClass('is-hidden');
  }
  emailInput.removeClass('is-success');
  emailInput.removeClass('is-danger');
  emailHelp.text('');
}

$(document).ready(function () {

  emailInput.blur(validateEmail);
  emailInput.on('keydown', resetEmailValidation);

});