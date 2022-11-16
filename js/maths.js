function timeStringToFloat(time = '') {
  var hoursMinutes = time.split(':');
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}

function getArrayIndex(element, directory) {
  return Array.prototype.indexOf.call(directory.children, element)
}

function militaryToStandardTime(time = '') {
  const m_hour = parseInt(time.split(':')[0])
  const m_minute = time.split(':')[1]

  const s_hour = (m_hour < 12) ? m_hour : m_hour - 12
  const s_suffix = (m_hour < 12) ? 'AM' : 'PM'

  return (`${s_hour}:${m_minute} ${s_suffix}`)
}