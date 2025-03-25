const nullValue=function(value,defaultValue){
  return typeof(value) != 'undefined' && value!==null?value:defaultValue;
}

const epochToIsoData=function(epoch){
  if(!epoch){
    return "";
  }
  let date = new Date(epoch);
  
  return date.toISOString();
}

const initIcon=function(){
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style="display: none;";

  let circle = createSymbole("check-circle-fill","M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z");
  let info = createSymbole("info-fill","M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z");
  let warning = createSymbole("exclamation-triangle-fill","M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z");
  
  svg.appendChild(circle);
  svg.appendChild(info);
  svg.appendChild(warning);
  document.body.appendChild(svg);
}

const createSymbole=function(id,path){
  let symbol = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
  symbol.id=id;
  symbol.setAttribute("fill","currentColor");
  symbol.setAttribute("viewBox","0 0 16 16");

  let pathCtrl = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathCtrl.setAttribute("d",path);
  symbol.appendChild(pathCtrl);

  return symbol;
}
const createAlertBox=function(messageCtrl, title, alertType){
  let logoMap={
    "primary":"#info-fill",
    "info":"#info-fill",
    "success":"#check-circle-fill",
    "warning":"#exclamation-triangle-fill",
    "danger":"#exclamation-triangle-fill"
  }
  if(!alertType)
    alertType="danger";

  if(!title)
    title="Error:";

  let alertCtrl = document.createElement("div");
  alertCtrl.className="alert alert-"+alertType+" alert-dismissible fade show";
  alertCtrl.setAttribute("role","alert");
  
  if(logoMap[alertType]){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.className="bi flex-shrink-0 me-4";
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label',alertType);

    let useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', logoMap[alertType]);
    svg.appendChild(useElem);
    alertCtrl.appendChild(svg);
  }
  
  
  let titleCtrl = document.createElement("strong");
  titleCtrl.appendChild(document.createTextNode(" "+title));
  alertCtrl.appendChild(titleCtrl);

  alertCtrl.appendChild(messageCtrl);
  
  let btnClose=document.createElement("button");
  btnClose.setAttribute("type","button");
  btnClose.className="btn-close";
  btnClose.setAttribute("data-bs-dismiss","alert");
  btnClose.setAttribute("aria-label","Close");
  alertCtrl.appendChild(btnClose);
  
  return alertCtrl;
}

const createAlert=function(message, title, alertType){
  let msgCtrl = document.createElement("span");
  msgCtrl.appendChild(document.createTextNode(" "+message));
  return createAlertBox(msgCtrl, title, alertType);
}

const showAlert=function(divId,erreur,title, alertType){
  let div= document.getElementById(divId);
  div.appendChild(createAlert(erreur,title, alertType));
}

const handleBtnSpinner=function(btnId, spin){
  let btn = document.getElementById(btnId);
  let label = document.getElementById(btn.getAttribute("labelId"));
  let spinner = document.getElementById(btn.getAttribute("spinnerId"));
  let spinnerLabel = document.getElementById(btn.getAttribute("spinnerLabelId"));

  btn.disabled=spin;
  label.style.display=!spin?"inline-block":"none";
  spinner.style.display=spin?"inline-block":"none";
  spinnerLabel.style.display=spin?"inline-block":"none";
}

const createElem=function(tagname,classnames,text){
  let tag = document.createElement(tagname);
  if(classnames){
    tag.className=classnames;
  }
  
  if(text){
    tag.appendChild(document.createTextNode(text));
  }
  return tag;
}

const clearChilds=function(elem){
  while(elem.firstChild){
    elem.removeChild(elem.firstChild);
  }
}

window.addEventListener("load",initIcon);
