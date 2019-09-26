$.validator.setDefaults({
  errorClass: 'is-invalid',
  validClass: 'is-valid',
  errorElement: 'div',
  errorPlacement: function(error, element) {
    // Add the `invalid-feedback` class to the error element
    error.addClass('invalid-feedback');

    if (element.prop('type') === 'checkbox') {
      error.before(element.parent('label'));
    } else if (element.prop('type') === 'radio') {
      error.before(element.parent('label'));
    } else {
      error.insertAfter(element);
    }
  },
  submitHandler: function() {
    // Stop form from submitting normally
    event.preventDefault();

    $('button').attr('disabled', true);
    $('button').html('Submitting...');

    $.ajax({
      type: 'post',
      url: url,
      data: form.serialize(),
      success: function(response, status, xhr) {
        // Get response content type
        var ct = xhr.getResponseHeader('content-type') || '';
        if (ct.indexOf('html') > -1) {
          form.html(response);
        }
        if (ct.indexOf('json') > -1) {
          validator.showErrors(response);

          $('button').attr('disabled', false);
          $('button').html('Submit');
        }
      }
    });
  }

});

var form = $('form');
var url = form.attr('action');
var validator = form.validate();
