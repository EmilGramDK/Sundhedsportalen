
function onChangeDatalistInput() {
    let input = document.getElementsByClassName("datainput")[0].value;
    let datalist = document.getElementsByClassName("datalist")[0];

    if (input.length >= 2) {
        datalist.id = "myList";
    } else {
        datalist.removeAttribute("id");
    }
}

$("#goToPatient").click(function() {
    var value = $("#selectPatient").val();

    var val = $('#myList [value="' + value + '"]').attr("data-id");

    window.location.href = "/fagperson/patient/" + val;
  });

