
class NotificationService {
    static promiseRequireNotification( ) {

        if (!("Notification" in window)) {
            console.error("Ta przeglądarka nie obsługuje powiadomień");
            return Promise.reject("No notification supported");
        } else if (Notification.permission !== 'denied') {
            return Notification.requestPermission(function (permission) {});
        } else if (Notification.permission === 'granted') {
            return Promise.resolve();
        } else {
            return Promise.reject("Notification is blocked.");
        }
    }

    static promiseSetNotification(description) {

        if (Notification.permission === 'granted') {
            const options = {
                body: description,
                icon: '/apple-touch-icon.png',
                vibrate: [100, 50, 100]
            };
            new Notification('Enigmata.pl', options);
        }
        return Promise.resolve();
    }
}

export default NotificationService;