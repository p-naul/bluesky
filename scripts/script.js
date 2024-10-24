const version = '1.12.1';
const uid = '9cb388dd480f4a5491e3220d1db0afa0';
const iframe = document.getElementById('api-frame');
const client = new window.Sketchfab(version, iframe);
// let client = new Sketchfab( iframe ); // By default, the latest version of the viewer API will be used
let api;

let lastAnnotation = 0;
var indic=0;



//////////////////// API Sketchfab /////////////////////////////////////////////////////
const error = () => window.console.error('Sketchfab API error');
const success = apiClient => {
  api = apiClient;
  api.start();

  api.addEventListener('viewerready', () => {
    window.console.log('viewer ready');

    document.getElementById('BtnCancel').addEventListener('click', function() {
        api.removeAnnotation(lastAnnotation-1, function(err) {
            if (!err) {window.console.log('Removed annotation', lastAnnotation);}
            if(lastAnnotation>0) {lastAnnotation = lastAnnotation -1;};
        });
    });

    //-----------------------------------déplace les objets ou ajoute une annotation      
    api.addEventListener('click', function (info) {
        if (info.instanceID) {  // le clic se fait effectivement sur un objet 
            window.console.log('clicked node', info.instanceID);
            clic = info.instanceID-2;
            posX=info.position3D[0];
            posY=info.position3D[1];
            posZ=info.position3D[2];
            declaration = document.getElementById("texteNoteNew").value
            if ((declaration.length != 0) && (declaration.length != null)) { // annotation: position, position camera, target camera (=position annotation), title, text
                api.createAnnotationFromScenePosition(  [posX,posY,posZ], [posX,posY-50,posZ+50],[posX,posY,posZ], document.getElementById("texteNoteNew").value,"");
                lastAnnotation = lastAnnotation + 1;
                document.getElementById("texteNoteNew").value=""; 
            }

        };
    });







    });
}; // end function success(api)

client.init(uid, {
    // annotation: 0, // Usage: Setting to [1 – 100] will automatically load that annotation when the viewer starts.
    // annotations_visible: 1, // Usage: Setting to 0 will hide annotations by default.
    //   annotation_cycle: 0, // Déroule les annotations avec le nombre de secondes indiquées.
    autospin: 0, // Usage: Setting to any other number will cause the model to automatically spin around the z-axis after loading.
    autostart: 1, // Usage: Setting to 1 will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.
    camera: 1, // Usage: Setting to 0 will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.
    ui_stop: 0, // Usage: Setting to 0 will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.
    transparent: 0, // Usage: Setting to 1 will make the model's background transparent
    ui_animations: 0, // Usage: Setting to 0 will hide the animation menu and timeline.
    ui_annotations: 0, // Usage: Setting to 0 will hide the Annotation menu.
    ui_controls: 1, // Usage: Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).
    ui_fullscreen: 0, // Usage: Setting to 0 will hide the Fullscreen button.
    ui_general_controls: 1, // Usage: Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).
    ui_help: 1, // Usage: Setting to 0 will hide the Help button.
    ui_hint: 0, // Usage: Setting to 0 will always hide the viewer hint animation ("click & hold to rotate"). Setting to 1 will show the hint the first time per browser session (using a cookie). Setting to 2 will always show the hint.
    ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer. Share sign etc.
    ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
    ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
    ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
    ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
    ui_color: '00a8c0', // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
    ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.
    
    success: success,
    error: error
    });