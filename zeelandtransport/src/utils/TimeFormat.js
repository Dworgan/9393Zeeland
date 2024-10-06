export function GetHoursAndMinutes(date) {
  var tData = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return tData;
}
