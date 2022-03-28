console.log("This is coming from script.js");

function onChangeDatalistInput() {
    let input = document.getElementsByClassName("datainput")[0].value;
    let datalist = document.getElementsByClassName("datalist")[0];

    if (input.length >= 2) {
        datalist.id = "myList";
    } else {
        datalist.removeAttribute("id");
    }
}