const HASH_ID_PREFIX_SIZE = 5;
const HASH_ID_DELIMITER = 'z';

export function parseRiddleHashId ( riddleHashId ){
    if( riddleHashId && typeof riddleHashId === "string" && riddleHashId.length > HASH_ID_PREFIX_SIZE + 2 * HASH_ID_DELIMITER.length){
        const fields = riddleHashId.split(HASH_ID_DELIMITER);
        if( fields.length === 4 ){
            const riddleId = parseInt(fields[0],10);
            const startDate = parseInt(fields[1],16);
            const endDate = parseInt(fields[2],16);
            const riddleNo = parseInt(fields[3],10);

            return {riddleId: riddleId, startDate: startDate, endDate: endDate, riddleNo: riddleNo};
        } else {
        }
    }
}
