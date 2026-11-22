(function () {
  "use strict";

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  // month는 0~11. 연도 경계를 넘어가도 올바르게 정규화한다.
  function shiftMonth(year, month, delta) {
    var total = year * 12 + month + delta;
    var newYear = Math.floor(total / 12);
    return { year: newYear, month: total - newYear * 12 };
  }

  // 달력 칸 배열을 만든다. 1일 앞의 빈 칸은 null.
  function buildMonthCells(year, month) {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var cells = [];
    for (var i = 0; i < firstDay; i++) cells.push(null);
    for (var d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }

  function formatTitle(year, month) {
    return year + "년 " + (month + 1) + "월";
  }

  var api = {
    WEEKDAYS: WEEKDAYS,
    shiftMonth: shiftMonth,
    buildMonthCells: buildMonthCells,
    formatTitle: formatTitle
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (typeof document === "undefined") return;

  var today = new Date();
  var state = { year: today.getFullYear(), month: today.getMonth() };

  var titleEl = document.getElementById("title");
  var weekdaysEl = document.getElementById("weekdays");
  var daysEl = document.getElementById("days");

  WEEKDAYS.forEach(function (name, i) {
    var el = document.createElement("div");
    el.textContent = name;
    if (i === 0) el.className = "sun";
    if (i === 6) el.className = "sat";
    weekdaysEl.appendChild(el);
  });

  function render() {
    titleEl.textContent = formatTitle(state.year, state.month);
    daysEl.innerHTML = "";
    var now = new Date();
    var isCurrentMonth = now.getFullYear() === state.year && now.getMonth() === state.month;

    buildMonthCells(state.year, state.month).forEach(function (day, idx) {
      var el = document.createElement("div");
      el.className = "day";
      if (day !== null) {
        el.textContent = day;
        var col = idx % 7;
        if (col === 0) el.classList.add("sun");
        if (col === 6) el.classList.add("sat");
        if (isCurrentMonth && day === now.getDate()) {
          el.classList.add("today");
          el.setAttribute("aria-current", "date");
        }
      }
      daysEl.appendChild(el);
    });
  }

  function move(delta) {
    var next = shiftMonth(state.year, state.month, delta);
    state.year = next.year;
    state.month = next.month;
    render();
  }

  document.getElementById("prev").addEventListener("click", function () { move(-1); });
  document.getElementById("next").addEventListener("click", function () { move(1); });

  render();
})();
