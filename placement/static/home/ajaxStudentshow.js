$(function() {

    $('#searchStudent').keyup(function(e) {

    var optionSelected = $('#select').find("option:selected");
    var valueSelected  = optionSelected.val();

    var PSelected = $('#selectP').find("option:selected");
    var valuePSelected  = PSelected.val();
    if (($('#searchStudent').val() != '') || e.which === 8)
        $.ajax({
            type: "POST",
            url: urlajaxsearchStudent,
            data: {
                'search_text' : $('#searchStudent').val(),
                'val': valueSelected,
                'place':valuePSelected,
                'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
            },
            success: searchSuccess,
            dataType: 'html'
        });
    });
});

function searchSuccess(data, textStatus, jqXHR)
{   
    let lis = document.getElementById("mainlist");
    // console.log(sres.childNodes.length    )
        lis.style.display = "none";

    $('#search_results').html(data)
}