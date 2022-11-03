import "./index.css";

function timepicker(setTimeCb) {
  console.log(setTimeCb);
  var tpicker = document.createElement("div"),
    input = document.createElement("input"),
    tbl = document.createElement("table"),
    tblBody = document.createElement("tbody"),
    row = document.createElement("tr"),
    hours = document.createElement("th"),
    minutes = document.createElement("th");

  tpicker.classList.add("timepicker-container");

  tpicker.style.position = "relative";
  tpicker.style.cursor = "pointer";

  tbl.style.position = "absolute";
  tbl.style.top = "-190px";

  const showTable = () => {
    tbl.style.display = "table";
  };
  const hideTable = () => {
    tbl.style.display = "none";
  };

  input.style.zIndex = "1";

  tpicker.appendChild(input);
  // return tpicker
  hours.appendChild(document.createTextNode("Hours"));
  hours.setAttribute("colspan", "5");
  minutes.appendChild(document.createTextNode("Minutes"));
  minutes.setAttribute("colspan", "4");
  row.appendChild(hours);
  row.appendChild(minutes);

  var hrs, mins, _text;

  tblBody.appendChild(row);

  for (var i = 0; i < 6; i++) {
    row = document.createElement("tr");
    for (var _h = 1; _h <= 4; _h++) {
      _text = i * 4 + _h;
      if (_text < 10) _text = "0" + _text;
      hrs = document.createElement("td");
      hrs.appendChild(document.createTextNode(_text));
      hrs.setAttribute("class", "hours");
      // hrs.setAttribute("data-time", _tim);
      row.appendChild(hrs);
    }

    if (i === 0 || i == 2 || i == 4) {
      for (var _m = 0; _m < 4; _m++) {
        _text = 5 * _m + i * 10;
        if (_text < 10) _text = "0" + _text;

        mins = document.createElement("td");
        mins.appendChild(document.createTextNode(_text));
        mins.setAttribute("class", "minutes");
        mins.setAttribute("rowspan", "2");
        row.appendChild(mins);
      }
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  tpicker.appendChild(tbl);
  tbl.setAttribute("class", "timepicker");

  input.addEventListener("click", function (e) {
    e.stopPropagation();
    showTable();
  });

  var hours = "00",
    min = null;

  function setDate() {
    if (hours) {
      if (min) {
        input.value = hours + ":" + min;
      } else {
        input.value = hours + ":00";
      }
    } else {
      if (min) {
        input.value = "00:" + min;
      } else {
        input.value = "";
      }
    }

    setTimeCb({
      hours: hours | "",
      minutes: min | "",
    });
  }
  console.log(tpicker.querySelector(".hours"));
  tpicker.addEventListener("click", function (e) {
    const target = e.target;

    if (target.className === "hours") {
      hours = target.innerHTML;
    }
    if (target.className === "minutes") {
      min = target.innerHTML;
      hideTable();
    }
    setDate();
  });

  return tpicker;
}

export default timepicker;
