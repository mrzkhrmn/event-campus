export const formatTime = (time: string) => {
  // time parametresi undefined veya null ise boş string döndür
  if (!time) {
    return "--:--";
  }

  // "11:53:43.6840000" formatındaki string'i parse et
  const timeStr = time.split(":");
  const hour = timeStr[0]?.padStart(2, "0") || "00";
  const minute = timeStr[1]?.padStart(2, "0") || "00";

  return `${hour}:${minute}`;
};
