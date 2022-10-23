//PHP連携用日付変換関数

function convertDate( format, date ) {
  // Date format like PHP
  var baseDt  = Object.prototype.toString.call( date ) === '[object Date]' ? date : new Date( date ),
      month = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' },
      day = { 'Sun': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thurseday', 'Fri': 'Friday', 'Sat': 'Saturday' },
      formatStrings = format.split(''),
      converted = '',
      esc = false,
      lastDayOfMonth = function( dateObj ) {
        var _tmp = new Date( dateObj.getFullYear(), dateObj.getMonth() + 1, 1 );
        _tmp.setTime( _tmp.getTime() - 1 );
        return _tmp.getDate();
      },
      isLeapYear = function( dateObj ) {
        var _tmp = new Date( dateObj.getFullYear(), 0, 1 ),
            sum  = 0, i;
        for ( i = 0; i < 12; i++ ) {
          _tmp.setMonth(i);
          sum += lastDayOfMonth( _tmp );
        }
        return ( sum === 365 ) ? 0 : 1;
      },
      dateCount = function( dateObj ) {
        var _tmp = new Date( dateObj.getFullYear(), 0, 1 ),
            sum = 0, i;
        for ( i=0; i<dateObj.getMonth(); i++ ) {
          _tmp.setMonth(i);
          sum += lastDayOfMonth( _tmp );
        }
        return sum + dateObj.getDate();
      },
      half_hours = function( dateObj ) {
        var h = dateObj.getHours();
        return h > 12 ? h - 12 : h;
      },
      ampm = function( dateObj ) {
        var h = dateObj.getHours();
        return h > 12 ? 'pm' : 'am';
      },
      object_values = function( obj ) {
        var r = [];
        for ( var k in obj ) {
          if ( obj.hasOwnProperty( k ) ) r.push( obj[k] );
        }
        return r;
      },
      object_keys = function( obj ) {
        var r = [];
        for ( var k in obj ) {
          if ( obj.hasOwnProperty( k ) ) r.push( k );
        }
        return r;
      },
      zerofill = function( num, digit ) {
        var strDuplicate = function( n, str ) {
              return Array( n + 1 ).join( str );
            },
            zero = strDuplicate( digit - 1, '0' );
        return String( num ).length == digit ? num : ( zero + num ).substr( num * -1 );
      };

  if ( format === '' ) {
    return baseDt;
  }
  formatStrings.forEach( function( str, i ) {
    var res, tmp, sign;
    if ( esc === false ) {
      switch( str ) {
        case 'Y': // Full year | ruby %Y
        case 'o': // Full year (ISO-8601)
          res = baseDt.getFullYear();
          break;
        case 'y': // Two digits year | ruby %y
          res = ('' + baseDt.getFullYear()).slice(-2);
          break;
        case 'm': // Zerofill month (01-12) | ruby %m
          res = ('0' + (baseDt.getMonth() + 1)).slice(-2);
          break;
        case 'n': // Month
          res = baseDt.getMonth() + 1;
          break;
        case 'F': // Full month name | ruby %B
          res = object_values( month )[baseDt.getMonth()];
          break;
        case 'M': // Short month name | ruby %b
          res = object_keys( month )[baseDt.getMonth()];
          break;
        case 'd': // Zerofill day (01-31) | ruby %d
          res = ('0' + baseDt.getDate()).slice(-2);
          break;
        case 'j': // Day
          res = baseDt.getDate();
          break;
        case 'S': // Day with suffix
          var suffix = [ 'st', 'nd', 'rd', 'th' ],
              suffix_index = function(){
                var d = baseDt.getDate();
                if ( d == 1 || d == 2 || d == 3 || d == 21 || d == 22 || d == 23 || d == 31 ) {
                  return Number( ('' + d).slice(-1) - 1 );
                } else {
                  return 3;
                }
              };
          res = suffix[suffix_index()];
          break;
        case 'w': // Day of the week (number) | ruby %w
        case 'W': // Day of the week (ISO-8601 number)
          res = baseDt.getDay();
          break;
        case 'l': // Day of the week (full) | ruby %A
          res = object_values( day )[baseDt.getDay()];
          break;
        case 'D': // Day of the week (short) | ruby %a
          res = object_keys( day )[baseDt.getDay()];
          break;
        case 'N': // Day of the week (ISO-8601 number)
          res = baseDt.getDay() === 0 ? 7 : baseDt.getDay();
          break;
        case 'a': // am or pm
          res = ampm(baseDt);
          break;
        case 'A': // AM or PM
          res = ampm(baseDt).toUpperCase();
          break;
        case 'g': // Half hours (1-12)
          res = half_hours( baseDt );
          break;
        case 'h': // Zerofill half hours (01-12) | ruby %I
          res = ('0' + half_hours(baseDt)).slice(-2);
          break;
        case 'G': // Full hours (0-23)
          res = baseDt.getHours();
          break;
        case 'H': // Zerofill full hours (00-23) | ruby %H
          res = ('0' + baseDt.getHours()).slice(-2);
          break;
        case 'i': // Zerofill minutes (00-59) | ruby %M
          res = ('0' + baseDt.getMinutes()).slice(-2);
          break;
        case 's': // Zerofill seconds (00-59) | ruby %S
          res = ('0' + baseDt.getSeconds()).slice(-2);
          break;
        case 'z': // Day of the year (1-366) | ruby %j
          res = dateCount( baseDt );
          break;
        case 't': // Days of specific month
          res = lastDayOfMonth( baseDt );
          break;
        case 'L': // Whether a leap year
          res = isLeapYear( baseDt );
          break;
        case 'c': // Date of ISO-8601
          tmp = baseDt.getTimezoneOffset();
          tzo = [ Math.floor( Math.abs( tmp ) / 60 ), Math.abs( tmp ) % 60 ];
          sign = tmp < 0 ? '+' : '-';
          res  = baseDt.getFullYear() +'-'+ zerofill( baseDt.getMonth() + 1, 2 ) +'-'+ zerofill( baseDt.getDate(), 2 ) +'T';
          res += zerofill( baseDt.getHours(), 2 ) +':'+ zerofill( baseDt.getMinutes(), 2 ) +':'+ zerofill( baseDt.getSeconds(), 2 );
          res += sign + zerofill( tzo[0], 2 ) +':'+ zerofill( tzo[1], 2 );
          break;
        case 'r': // Date of RFC-2822
          tmp = baseDt.getTimezoneOffset();
          tzo = [ Math.floor( Math.abs( tmp ) / 60 ), Math.abs( tmp ) % 60 ];
          sign = tmp < 0 ? '+' : '-';
          res  = object_keys( day )[baseDt.getDay()] +', '+ baseDt.getDate() +' '+ object_keys( month )[baseDt.getMonth()] +' '+ baseDt.getFullYear() +' ';
          res += zerofill( baseDt.getHours(), 2 ) +':'+ zerofill( baseDt.getMinutes(), 2 ) +':'+ zerofill( baseDt.getSeconds(), 2 ) +' ';
          res += sign + zerofill( tzo[0], 2 ) + zerofill( tzo[1], 2 );
          break;
        case 'u': // Millisecond
          res = baseDt.getTime();
          break;
        case 'U': // Unix Epoch seconds
          res = Date.parse( baseDt ) / 1000;
          break;
        case "\\": // escape
          esc = true;
          res = formatStrings[i + 1];
          break;
        default:
          res = str;
          break;
      }
      converted += res;
    } else {
      esc = false;
      return true;
    }
  });

  return converted;

}
