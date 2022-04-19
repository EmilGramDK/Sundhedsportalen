// søg efter patienter
function onChangeDatalistInput() {
  let input = document.getElementsByClassName("datainput")[0].value;
  let datalist = document.getElementsByClassName("datalist")[0];

  if (input.length >= 2) {
    datalist.id = "myList";
  } else {
    datalist.removeAttribute("id");
  }
}

// vis patient knap
$("#goToPatient").click(function () {
  var value = $("#selectPatient").val();

  var val = $('#myList [value="' + value + '"]').attr("data-id");

  window.location.href = "/fagperson/patient/" + val;
});

// søg efter patient til at sende en besked
function onChangeDatalistInputMessage() {
  let input = document.getElementsByClassName("datainputMessage")[0].value;
  let datalist = document.getElementsByClassName("datalistMessage")[0];

  if (input.length >= 2) {
    datalist.id = "messageList";
  } else {
    datalist.removeAttribute("id");
  }
}

// send besked knap fagperson
$("#sendBesked").click(function () {
  var value = $("#selectPatientMessage").val();

  var val = $('#messageList [value="' + value + '"]').attr("data-id");
  var message = $("textarea#messageTextarea").val();

  if (message === "" || val === "") {
    alert("Du skal skrive en besked og vælge en patient");
  } else {
    $.ajax({
      url: "/fagperson/sendMessage",
      type: "POST",
      data: {
        patient: val,
        message: message,
      },
      success: function (data) {
        window.location.href = "/fagperson/?alert=Beskeden blev sendt";
      },
      error: function (data) {
        alert("Der skete en fejl");
      },
    });
  }
});

// send besked knap borger
$("#sendBeskedBorger").click(function () {
  var value = $("#selectFagpersonMessage").val();

  var val = $('#messageList [value="' + value + '"]').attr("data-id");
  var message = $("textarea#messageTextarea").val();

  if (message === "" || val === "") {
    alert("Du skal skrive en besked og vælge en fagperson");
  } else {
    $.ajax({
      url: "/borger/sendMessage",
      type: "POST",
      data: {
        fagperson: val,
        message: message,
      },
      success: function (data) {
        window.location.href = "/borger/?alert=Beskeden blev sendt";
      },
      error: function (data) {
        console.log(data);
        alert("Der skete en fejl");
      },
    });
  }
});

// bootstrap enabler
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl);
});
toastList.forEach((toast) => toast.show());
