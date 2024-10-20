export function GetHoursAndMinutes(date) {
  var tData = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return tData;
}

export function GetDayAndMonth(date) {
  var tDataDay = new Date(date).toLocaleString([], {
    month: "numeric",
    day: "numeric",
  });
  return tDataDay;
}

export function GetDayName(date) {
  var days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  var d = new Date(date);
  var dayName = days[d.getDay()];

  return dayName;
}
