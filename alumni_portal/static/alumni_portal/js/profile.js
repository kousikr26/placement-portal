$(function () {

var loadForm = function () {
  var btn = $(this);
  $.ajax({
    url: btn.attr('data-url'),
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
      $("#modal-form").modal("show");
    },
    success: function (data) {
      $("#modal-form .modal-content").html(data.html_form);
    }
  });
};

var saveIntroForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-form").modal("hide");
        $(".header").load(" .header > *");
      }
      else {
        $("#modal-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
$("body").on("click", ".edit-intro", loadForm);
$("body").on("submit", ".intro-update-form", saveIntroForm);



var saveAboutForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-form").modal("hide");
        $(".about").load(" .about > *");
      }
      else {
        $("#modal-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
$("body").on("click", ".edit-about-me", loadForm);
$("body").on("submit", ".about-update-form", saveAboutForm);


var saveBasicInfoForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-form").modal("hide");
        $(".info").load(" .info > *");
      }
      else {
        $("#modal-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
$("body").on("click", ".edit-basic-info", loadForm);
$("body").on("submit", ".basic-info-update-form", saveBasicInfoForm);



var saveJobForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-form").modal("hide");
        $(".experience").load(" .experience > *");
      }
      else {
        $("#modal-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
var loadDeleteForm = function () {
  var btn = $(this);
  $.ajax({
    url:  btn.attr('data-url'),
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
      $("#modal-form").modal("hide");
      $("#modal-delete-form").modal("show");
    },
    success: function (data) {


      $("#modal-delete-form .modal-content").html(data.html_form);
    }
  });
};

var saveJobDeleteForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-delete-form").modal("hide");
        $(".experience").load(" .experience > *");
      }
      else {
        $("#modal-delete-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
$("body").on("click", ".add-job", loadForm);
$("body").on("submit", ".create-job-form", saveJobForm);


$("body").on("click", ".edit-job", loadForm);
$("body").on("submit", ".edit-job-form", saveJobForm);

$("body").on("click", ".job-delete", loadDeleteForm);
$("body").on("submit", ".job-delete-form", saveJobDeleteForm);


var saveEducationForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-form").modal("hide");
        $(".education").load(" .education > *");
      }
      else {
        $("#modal-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
var loadEducationDeleteForm = function () {
  var btn = $(this);
  $.ajax({
    url:  btn.attr('data-url'),
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
      $("#modal-form").modal("hide");
      $("#modal-delete-form").modal("show");
    },
    success: function (data) {


      $("#modal-delete-form .modal-content").html(data.html_form);
    }
  });
};

var saveEducationDeleteForm = function () {
  var form = $(this);
  $.ajax({
    url: form.attr("action"),
    data: form.serialize(),
    type: form.attr("method"),
    dataType: 'json',
    success: function (data) {
      if (data.form_is_valid) {

        $("#modal-delete-form").modal("hide");
        $(".education").load(" .education > *");
      }
      else {
        $("#modal-delete-form .modal-content").html(data.html_form);
      }
    }
  });
  return false;
};
$("body").on("click", ".add-education", loadForm);
$("body").on("submit", ".create-education-form", saveEducationForm);


$("body").on("click", ".edit-education", loadForm);
$("body").on("submit", ".edit-education-form", saveEducationForm);

$("body").on("click", ".education-delete", loadDeleteForm);
$("body").on("submit", ".education-delete-form", saveEducationDeleteForm);
});
