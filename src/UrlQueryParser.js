

function getQueryVariables(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    const result = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        result[pair[0]] = decodeURIComponent(pair[1]);
    }
    return result;
}

exports.getQueryVariables = getQueryVariables;