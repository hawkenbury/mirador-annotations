
import mirador from 'mirador/dist/es/src/index';
import imageCropperPlugin from 'mirador-imagecropper/es';
import annotationPlugins from '../../src';
//import LocalStorageAdapter from '../../src/adapters/LocalStorageAdapter';
import AnnototAdapter from '../../src/AnnototAdapter';
//import SimpleAnnotationServerV2Adapter  from '../../src/SimpleAnnotationServerV2Adapter';

//const endpointUrl = 'https://annotot.biblhertz.it';
//const endpointUrl = 'http://localhost:8080/annotation';
const endpointUrl = 'https://publink.biblhertz.it/services/annotation.php';
//const randomUserUrl = 'https://localhost/services/randomUserService.php';

let randomUserUrl = 'https://publink.biblhertz.it/services/randomUserService.php';
let userId="unset user id";
let token="unset token";


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(!urlParams.has('token')){
    alert(`Token is not set - exiting`);
    window.open('','_self').close()
    exit;
}

token=urlParams.get('token');
randomUserUrl=randomUserUrl+"?token="+token;


// copy & paste it in your console to try it out
const request = new XMLHttpRequest();
request.onload =  () => {
  // I'll run when the request completes
  const data = JSON.parse(request.response);
  if(data.user === "-1"){
    alert(`User or token doesn't exist\nYou can only use this tool from the publink interface`);
    window.open('','_self').close()
    exit;
  }
  alert(`You are logged in as  ${data.user}`);
  console.log(`User ::  ${data.user}`);
  userId=`${data.user}`;

};
request.open('GET', `${randomUserUrl}`);
request.send();



const config = {
    annotation: {
        //adapter: (canvasId) => new SimpleAnnotationServerV2Adapter(canvasId, endpointUrl, userId),
        adapter: (canvasId) => new AnnototAdapter(canvasId, endpointUrl, userId),
        exportLocalStorageAnnotations: true, // display annotation JSON export button
    },
    id: 'demo',
    window: {
        defaultSideBarPanel: 'annotations',
        sideBarOpenByDefault: true,
        imageCropper: {
            active: false,
            dialogOpen: false,
            enabled: true,
            roundingPrecision: 5,
            showRightsInformation: true,
        }
    }


};

mirador.viewer(config, [...annotationPlugins,...imageCropperPlugin,]);
