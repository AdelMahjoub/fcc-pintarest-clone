$(document).ready(function () {

  validUrl = false;
  validTitle = false;

  var imageSubmitBtn = $('#image-submit');

  imageSubmitBtn.attr('disabled', !(validUrl && validTitle));

  var imageField = $('#image-url');
  var imageValidationHelp = imageField.parent().next();

  var titleField = $('#title');
  var titleValidationHelp = titleField.parent().next();

  function isValidUrl(value) {
    var patt = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    return patt.test(value);
  }

  function isValidTitle(value) {
    var patt = /^[a-zA-Z0-9_-]+$/;
    return patt.test(value);
  }

  function highLight(inputEl, validator) {
    let value = inputEl.val();
    let valid = validator(value);
    if(valid) {
      if(!inputEl.hasClass('is-success')) {
        inputEl.addClass('is-success');
      }
      inputEl.removeClass('is-danger');
    } else {
      if(!inputEl.hasClass('is-danger')) {
        inputEl.addClass('is-danger');
      }
      inputEl.removeClass('is-success');
    }
  }

  function validationHelpText(value, helpEl, validator) {
    if(validator(value)) {
      if(!helpEl.hasClass('is-success')) {
        helpEl.addClass('is-success');
      }
      helpEl.removeClass('is-danger');
    } else {
      if(!helpEl.hasClass('is-danger')) {
        helpEl.addClass('is-danger');
      }
      helpEl.removeClass('is-success');
    }
  }

  function validateImageUrl(e) {
    highLight(imageField, isValidUrl);
    validationHelpText(e.target.value, imageValidationHelp, isValidUrl);
  }

  function validateImageTitle(e) {
    highLight(titleField, isValidTitle);
    validationHelpText(e.target.value, titleValidationHelp, isValidTitle);
  }

  imageField.on('input', function(e) {
    validateImageUrl(e);
    validUrl = isValidUrl(e.target.value);
    imageSubmitBtn.attr('disabled', !(validUrl && validTitle));
  });

  titleField.on('input', function(e) {
    validateImageTitle(e);
    validTitle = isValidTitle(e.target.value); 
    imageSubmitBtn.attr('disabled', !(validUrl && validTitle));
  });

});