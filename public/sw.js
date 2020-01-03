
self.addEventListener('install', function(event) {
  event.waitUntil(skipWaiting());
});

const S=1000;
const M=60*S;
const H=60*M;
const D=24*H;


const RIDDLES_NOTIFICATION_SCHEDULE = [
    5*H+58*M, 6*H+58*M, 7*H+58*M, 8*H+58*M, 9*H+58*M, 10*H+58*M, 11*H+58*M, 12*H+58*M, 13*H+58*M, 14*H+58*M, 15*H+58*M, 16*H+58*M, 17*H+58*M,
    D+5*H+58*M, D+6*H+58*M, D+7*H+58*M, D+8*H+58*M, D+10*H+58*M, D+12*H+58*M, D+13*H+58*M, D+14*H+58*M, D+15*H+58*M, D+17*H+58*M,
    2*D+5*H+58*M, 2*D+6*H+58*M, 2*D+7*H+58*M, 2*D+8*H+58*M, 2*D+10*H+58*M, 2*D+12*H+58*M, 2*D+13*H+58*M, 2*D+14*H+58*M, 2*D+15*H+58*M, 2*D+17*H+58*M,
    3*D+5*H+58*M, 3*D+6*H+58*M, 3*D+7*H+58*M, 3*D+8*H+58*M, 3*D+10*H+58*M, 3*D+12*H+58*M, 3*D+13*H+58*M, 3*D+14*H+58*M, 3*D+15*H+58*M, 3*D+17*H+58*M,
    4*D+5*H+58*M, 4*D+6*H+58*M, 4*D+7*H+58*M, 4*D+8*H+58*M, 4*D+10*H+58*M, 4*D+12*H+58*M, 4*D+13*H+58*M, 4*D+14*H+58*M, 4*D+15*H+58*M, 4*D+17*H+58*M,
    5*D+5*H+58*M, 5*D+6*H+58*M, 5*D+7*H+58*M, 5*D+8*H+58*M, 5*D+10*H+58*M, 5*D+12*H+58*M, 5*D+13*H+58*M, 5*D+14*H+58*M, 5*D+15*H+58*M, 5*D+17*H+58*M,
    6*D+5*H+58*M, 6*D+6*H+58*M, 6*D+7*H+58*M, 6*D+8*H+58*M, 6*D+9*H+58*M, 6*D+10*H+58*M, 6*D+12*H+58*M, 6*D+13*H+58*M, 6*D+14*H+58*M, 6*D+15*H+58*M, 6*D+16*H+58*M, 6*D+17*H+58*M
];

const mainScheduler = () => {

    const nowDate = new Date();
    const dayOfWeek = nowDate.getUTCDay();
    const now = nowDate.getTime();
    const weekTime = now - (Math.floor(now/D) - dayOfWeek)*D;
    const nextRiddleDate = RIDDLES_NOTIFICATION_SCHEDULE.find( date => weekTime > date - 20*S && weekTime < date );
    if(nextRiddleDate){
        const options = {
            body: "Następna zagadka za mniej niż 3 minuty!",
            icon: '/apple-touch-icon.png',
            vibrate: [100, 50, 100],
            actions: [{action: 'open', title: 'Open website'}]
        };
        self.registration.showNotification("Uwaga następna zagadka!", options);
    }
};

self.addEventListener('activate', function(event) {
    self.setInterval(mainScheduler, 15000);
});

self.addEventListener('fetch', function(event) {});

self.addEventListener('notificationclick', function(event) {
    event.waitUntil(clients.openWindow('https://www.enigmata.pl/#home'));
});
