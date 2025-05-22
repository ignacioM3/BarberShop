export const generateTimeSlots = (start: string, end: string, interval: number) => {
    const slots = [];
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);


    let current = startHour * 60 + startMinute;
    const close = endHour * 60 + endMinute;

    while (current <= close) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;
      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
      current += interval;
    }

    return slots;
  };
