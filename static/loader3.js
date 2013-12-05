/* sjcl */
"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.g(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.g(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b&=31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},g:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},h:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.base64={e:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,g=sjcl.codec.base64.e,f=0,l=sjcl.bitArray.bitLength(a);c&&(g=g.substr(0,62)+"-_");for(c=0;6*d.length<l;)d+=g.charAt((f^a[c]>>>e)>>>26),6>e?(f=a[c]<<6-e,e+=26,c++):(f<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c=[],d,e=0,g=sjcl.codec.base64.e,f=0,l;b&&(g=g.substr(0,62)+"-_");for(d=0;d<a.length;d++){l=g.indexOf(a.charAt(d));
if(0>l)throw new sjcl.exception.invalid("this isn't base64!");26<e?(e-=26,c.push(f^l>>>e),f=l<<32-e):(e+=6,f^=l<<32-e)}e&56&&c.push(sjcl.bitArray.partial(e&56,f,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};
sjcl.codec.bytes={fromBits:function(a){var b=[],c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b.push(e>>>24),e<<=8;return b},toBits:function(a){var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a[c],3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};sjcl.hash.sha256=function(a){this.d[0]||t(this);a?(this.c=a.c.slice(0),this.b=a.b.slice(0),this.a=a.a):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.c=this.f.slice(0);this.b=[];this.a=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.b=sjcl.bitArray.concat(this.b,a);b=this.a;a=this.a=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.b,c=this.c,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.a/
4294967296));for(b.push(this.a|0);b.length;)u(this,b.splice(0,16));this.reset();return c},f:[],d:[]};
function u(a,b){var c,d,e,g=b.slice(0),f=a.c,l=a.d,r=f[0],h=f[1],m=f[2],p=f[3],k=f[4],q=f[5],n=f[6],s=f[7];for(c=0;64>c;c++)16>c?d=g[c]:(d=g[c+1&15],e=g[c+14&15],d=g[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+g[c&15]+g[c+9&15]|0),d=d+s+(k>>>6^k>>>11^k>>>25^k<<26^k<<21^k<<7)+(n^k&(q^n))+l[c],s=n,n=q,q=k,k=p+d|0,p=m,m=h,h=r,r=d+(h&m^p&(h^m))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0;f[0]=f[0]+r|0;f[1]=f[1]+h|0;f[2]=f[2]+m|0;f[3]=f[3]+p|0;f[4]=f[4]+k|0;f[5]=f[5]+q|0;f[6]=
f[6]+n|0;f[7]=f[7]+s|0}function t(a){function b(a){return 0x100000000*(a-Math.floor(a))|0}var c=0,d=2,e;a:for(;64>c;d++){for(e=2;e*e<=d;e++)if(0===d%e)continue a;8>c&&(a.f[c]=b(Math.pow(d,0.5)));a.d[c]=b(Math.pow(d,1/3));c++}};

/* worker */
onmessage = function (event) {
    var req = event.data;

    var b64 = sjcl.codec.base64,
        sha = sjcl.hash.sha256,
        bytes = sjcl.codec.bytes,
        str = sjcl.codec.utf8String;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', req.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function _handle_ready(){
        if(xhr.readyState == 4 && xhr.status == 200){ // todo: handle non-200s.
            var b = sjcl.codec.bytes.toBits(new Uint8Array(xhr.response)),
                b_hsh = b64.fromBits(sha.hash(b));
            if(b_hsh == req.sha){
                postMessage(xhr.response);
            }else{
                postMessage("failure");
            }
        }
    };
    xhr.send();
};    
