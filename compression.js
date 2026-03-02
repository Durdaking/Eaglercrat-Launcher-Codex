function compress(data){
return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
function decompress(str){
return JSON.parse(decodeURIComponent(escape(atob(str))));
}
