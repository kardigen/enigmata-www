
function syncCacheTime(returnedDate, returnedAge, requestDelay) {

    if( returnedDate !== undefined && returnedDate !== null && typeof returnedDate === "string"  ){

        try {
            let fileDate = new Date(returnedDate);

            let additionalSeconds = 0;
            if ((returnedAge !== undefined) && (returnedAge !== null) && (typeof returnedAge === "string")) {
                additionalSeconds = parseInt(returnedAge,10);
            }

            let serverTime = fileDate.getTime() + 100 * additionalSeconds - requestDelay;
            return serverTime - Date.now();


        } catch (ex){
        }
    }
    return 0;
};

function syncAppTime(serverTimestamp) {

    if(serverTimestamp){
        try {
            return serverTimestamp - Date.now()
        } catch (ex){
        }
    }
    return 0;
};

exports.syncCacheTime = syncCacheTime;
exports.syncAppTime = syncAppTime;