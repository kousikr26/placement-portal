
$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-student .modal-content").html("");
        $("#modal-student").modal("show");
      },
      success: function (data) {
        $("#modal-student .modal-content").html(data.html_form);
      }
    });
  };



  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          // $("#student-table tbody").html(data.html_student_list);
          ajax_filter();

          $("#modal-student").modal("hide");
        }
        else {
          $("#modal-student .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  // var sort = function () {
  //   var sortid = String($(this).val());
  //   console.log(sortid);
  //   $.ajax({
  //     url: '/ccd/ajax/sort/',
  //     type: 'GET',
  //     data: { sortid: sortid },
  //     dataType: 'json',
  //     success: function (data) {
  //         $("#student-table tbody").html(data.html_student_list);
  //       }
  //     });
  //   return false;
  // };

  var getBranch = function()
  {
    console.log("getting branches");
    $.ajax({
      url: '/ccd/ajax/get/branches/',
      type: 'GET',
      dataType: 'json',
      success: function(data)
      {
        $('#branch_filter').html(data.html_branch_options);
      }
    });
  };

  var pagination_on  = function()
  {
    $('#student-table').DataTable(
    {
      dom: 'Blfrtip',
      pagingType: "full_numbers",
      ordering: false,
      fixedColumns: true,
      buttons: [
       {
           extend: 'pdf',
           footer: true,
           exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9]
            }
       },
       {
           extend: 'csv',
           footer: false,
           exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9]
            }
       },
       {
           extend: 'excel',
           footer: false,
           exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9]
            }
       },
       {
           extend: 'copy',
           footer: false,
           exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9]
            }
       },
       {
           extend: 'print',
           footer: false,
           exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9]
            }
       },
    ]
    }
    );
    // to change the postion of search box of the table
    $("#searchbox").html($(".dataTables_filter"));
    $("#tableLength").html($(".dataTables_length"));
    $("#dtbuttons").html($(".dt-buttons"));
    // to change the color of dt-buttons
    $("#dtbuttons").find("button").removeClass("btn-secondary");
    $("#dtbuttons").find("button").addClass("btn-info");
    // setting left-margin for pagination buttons
    $(".dataTables_paginate").css("margin-left","20%");
  };

  var ajax_filter = function()
  {
    var placed = $('#placed_filter').val();
    var branch = $('#branch_filter').val();
    var program = $('#program_filter').val();
    var sortid = $('#sort').val();
    $.ajax({
      url: '/ccd/ajax/filter/',
      type:'GET',
      data:{'branch':branch,'sortid':sortid,
            'placed':placed,'program':program,},
      dataType:'json',
      success: function(data)
      {
        // to update the pagination, firstly we clear the table
        $('#student-table').dataTable().fnDestroy();
        $("#searchbox").html("<p></p>");
        $("#tableLength").html("<p></p>");
        $("#dtbuttons").html("<p></p>");
        // now update the data table
        $("#student-table tbody").html(data.html_student_list);
        // Then initialize again after updating the html
        // $('#student-table').dataTable();
        pagination_on();
      }
    });
  };

  $(document).ready(function() {
      pagination_on();
  } );


  /* Binding */
  // to get all branches
  getBranch();
  // Create Student
  $(".js-create-student-btn").click(loadForm);
  $("#modal-student").on("submit", ".js-student-create-form", saveForm);

  // Update student
  $("#student-table").on("click", ".js-update-student-btn", loadForm);
  $("#modal-student").on("submit", ".js-student-update-form", saveForm);

  // Delete Student
  $("#student-table").on("click", ".js-delete-student-btn", loadForm);
  $("#modal-student").on("submit", ".js-student-delete-form", saveForm);



  // Sorting and Filtering
 // whenever sortby/filter option changes, the data will be updated
$('#sort').on('change',ajax_filter);
$('#branch_filter').on('change',ajax_filter);
$('#program_filter').on('change',ajax_filter);
$('#placed_filter').on('change',ajax_filter);
$('#branch_filter').on('change',ajax_filter);

});
