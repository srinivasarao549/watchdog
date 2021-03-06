// FIXME: When a user dismisses a doorhanger event, remove in content warning.
var inContentWarningVisible = false;
self.port.on('inContentWarning',function(msg) {
    if (window.lastBlur == null || inContentWarningVisible) return;
    var pos = findPos(window.lastBlur);
    var newDiv = document.createElement('div');
    inContentWarningVisible = true;
    newDiv.appendChild(document.createTextNode("Watchdog: "));
    document.body.insertBefore(newDiv,null);
    
    var moreInfo = document.createElement('img');
    moreInfo.src = msg.warningIconURL;
    // moreInfo.style['height'] = '50px';
    newDiv.insertBefore(moreInfo,null);
    
    function hideInContentWarning() {
        document.body.removeChild(newDiv);
        inContentWarningVisible = false;
    }
    
    moreInfo.addEventListener('click',function() {
        self.port.emit('moreInfo', {
            alertUUIDs: msg.alertUUIDs
        });
        hideInContentWarning();
    });
    
    newDiv.style['fontFamily'] = "helvetica,sans-serif";
    newDiv.style['fontSize'] = "120%";
    newDiv.style['backgroundColor'] = '#ffffff';
    newDiv.style['position'] = 'absolute';
    newDiv.style['opacity'] = 0.9;
    newDiv.style['left'] = pos[0].toString() + 'px';
    
    // TODO: CSS transition
    newDiv.style['top'] = (pos[1] + window.lastBlur.offsetHeight).toString() + 'px';

    newDiv.style['zIndex'] = 999999;
   
});