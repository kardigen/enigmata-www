
const LocaleId = 'pl-PL';
const FormatOptionMinutes = {hour: '2-digit', minute:'2-digit'};
const FormatOptionSeconds = {hour: '2-digit', minute:'2-digit', second:'2-digit'};

class DateTimeFormatter {

    static dateTimeFormat(utcDateStr) {
        let formattedDate = new Date(utcDateStr).toLocaleString(LocaleId, FormatOptionMinutes);
        return formattedDate;
    }

    static timeFormat(utcDateStr) {
        let formattedTime = new Date(utcDateStr).toLocaleTimeString(LocaleId, FormatOptionMinutes);
        return formattedTime;
    }

    static timeSecondFormat(utcDateStr) {
        let formattedTime = new Date(utcDateStr).toLocaleTimeString(LocaleId, FormatOptionSeconds);
        return formattedTime;
    }

    static dateFormat(utcDateStr) {
        let formattedDate = new Date(utcDateStr).toLocaleDateString(LocaleId);
        return formattedDate;
    }

    static formatTimeRange(mills) {
        const seconds = Math.ceil(mills/1000);
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);

        const minutesReminder = minutes - hours * 60;
        const secondsReminder = seconds - minutes * 60;

        const formattedTimeRange = ""
            + ( hours > 0 ? hours + "h" : "" )
            + ( minutesReminder > 0 ? " " + minutesReminder + "m" : "" )
            + ( secondsReminder > 0 ? " " + secondsReminder + "s" : "" )
            + ( secondsReminder > 0 || hours > 0 || minutesReminder > 0 ? "" : "-" );
        return formattedTimeRange;
    }
}

export default DateTimeFormatter;