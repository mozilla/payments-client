
'use strict';

module.exports = {
  simulateClick: function(elm) {
    var doc = document;
    var simulatedClick = doc.createEvent('MouseEvents');
    // initMouseEvent(type,bubbles,cancelable,view,
    //                detail,screenx,screeny,clientx,clienty,ctrlKey,
    //                altKey,shiftKey,metaKey,button,relatedTarget)
    simulatedClick.initMouseEvent('click', true, true, window,
                                  0, 0, 0, 0, 0, false,
                                  false, false, false, 0, null);
    elm.dispatchEvent(simulatedClick);
  },
};
