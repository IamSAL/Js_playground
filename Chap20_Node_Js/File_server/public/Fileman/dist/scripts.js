
//.match(/\\public\\.*/g)[0]
const file_list_left=document.getElementById('file_list_left');
const files_table=document.querySelector('#file_table');
const editor_btn=document.querySelector('#editor_btn')
const rm_btn=document.querySelector('#removeFileBtn')
const modal_overaly=document.querySelector('.modal-overlay');
const modalEditor=document.querySelector('#editorModal');
let editorMessages=document.querySelector(`#editorModal .alert`);

const initalLink='http://192.168.0.101:8080/public';
const saveEdit=document.querySelector('#updateFileBtn')


let currentUrl='http://192.168.0.101:8080/public';

async function renderleftSidefiles(dom=file_list_left,link=initalLink){
  
    let files=await getFiles(link);
    let filelist=''
    for(let file of files.list){
        if(file.type=="Directory"){
            filelist+=getFolderTemplate(file)
        }else{
            filelist+=getFileTemplate(file)
        }
    }
    dom.innerHTML=filelist;

    setEvents();
    setTableList(files,initalLink);
}

renderleftSidefiles()

function setEvents(){

    document.querySelectorAll('.side_folder').forEach(folder=>{
        folder.addEventListener("dblclick",async (e)=>{
            let link=folder.getAttribute('data-link')
            let files=await getFiles(link)
           setTableList(files,link);
        })


    })

    let indirs= document.querySelectorAll(`tr[data-type="dir"]`);
    if(indirs){
        document.querySelectorAll(`tr[data-type="dir"]`).forEach(folder=>{
            folder.addEventListener("dblclick",async (e)=>{
                let link=folder.getAttribute('data-link')
                let files=await getFiles(link)

                setTableList(files,link);
            })
        })
    }

}

function getSelectedFilelinks(){
    return Array.from(document.querySelectorAll('tr.file-item.selected')).map(file=>file.getAttribute('data-link'))
}

//edit file
editor_btn.addEventListener('click',async (e)=>{
    let current_file ='';
    fetch(getSelectedFilelinks()[0]).then(res=>{
        fmEditor.showLoading();
        current_file=res.headers.get('file-link');
        let type=res.headers.get('Content-Type');
        if(type.includes('text')||type.includes('application')){
            return res.text();
        }else{
            throw new Error("This file is not editable,download it.")
        }

    }).then(content=>{
        fmEditor.set(content);
        modalEditor.setAttribute('data-currentFile',current_file)
        fmEditor.hideLoading();
    }).catch(e=>{
       modal_overaly.classList.remove('show');
       modalEditor.classList.remove('show');
        alert(e.message)
    })
})



//remove
rm_btn.addEventListener('click',async (e)=>{
    let files=getSelectedFilelinks();
    let deletions=[];
    for(let file of files){
        console.log(file)
        deletions.push(fetch(file,{method:'DELETE'}))
    }
    Promise.all(deletions).then(res=>{
        document.getElementById('removeFileModal').classList.remove('show');
        modal_overaly.classList.remove('show');
        console.log(res.status);
        refreshtable();
    })


})



saveEdit.addEventListener('click',async (e)=>{
    fmEditor.showLoading()
    let saved=await updateAddFile(modalEditor.getAttribute('data-currentfile'),fmEditor.get(),'PUT');
    console.log('res:',saved)
    setAlert('#editorModal');
    if(saved){
        fmEditor.hideLoading()
        succesAlert("File updated")
    }else{
        fmEditor.hideLoading()
        failAlert("Saving Failed, check server connection.")
    }
    setTimeout(()=>{
        editorMessages.classList.toggle('show')
    },7000)

})
//addFile
    const addFileBtn=document.getElementById('addFileBtn');
    const addFileInput=document.getElementById('fileName')
addFileBtn.addEventListener('click',async (e)=>{
    setAlert('#addFileModal');
    // succesAlert('Adding...',2000)

    console.log(currentUrl+'/'+addFileInput.value);
    let saved=await updateAddFile(currentUrl+'/'+addFileInput.value.replace(/[ \)\(]/gi,'_'),'','PUT');
    console.log('res:',saved)
    if(saved){
        succesAlert('File added')
        addFileInput.value='';
        refreshtable();
    }else{
     failAlert("Failed, check server connection.")
    }

})


//addFolder
const addFolderBtn=document.getElementById('addFolderBtn');
const addFolderInput=document.getElementById('folderName')
addFolderBtn.addEventListener('click',async (e)=>{
    setAlert('#addFolderModal');
    succesAlert('Adding...',2000)
    console.log(currentUrl+'/'+addFolderInput.value);
    let saved=await updateAddFile(currentUrl+'/'+addFolderInput.value.replace(/[\. \)\(]/gi,'_'),'','MKCOL');
    console.log('res:',saved)
    if(saved){
        succesAlert('Folder added')
        addFolderInput.value='';
        await refreshtable();
    }else{
        failAlert("Failed, check server connection.")
    }
})

//uploadFiles
const fileform=document.getElementById('uploadFilesForm');
const uploadBtn=document.getElementById('uploadBtn');
const filestatsContainer=document.querySelector('.fm-wrapper .upload-modal .files-to-upload');
uploadFilesBtn=document.getElementById('uploadFilesBtn');
uploadFilesBtn.addEventListener('change',async (e)=>{
    let filestats='';
    for(let file of fileform.fileuploads.files){
        console.log(file.size)
        if(file.size>1000000000){
            console.log(file.name+' too big,cancelled')
            continue;
        }
        filestats+=getUploadingfileTemplate(file);
    }
    filestatsContainer.innerHTML=filestats;
})
uploadBtn.addEventListener('click',async (e)=>{
    for(let file of fileform.fileuploads.files){
        if(file.size>1000000000){
            console.log(file.name+' too big,cancelled')
            continue;
        }
        await uploadFile(currentUrl+'/'+file.name,await readBuffer(file),'PUT',file.name);
    }
})



function readBuffer(file){
    return new Promise((resolve,reject)=>{
        let reader=new FileReader();
        reader.addEventListener("load",()=>{
            resolve(reader.result);
        })
        reader.addEventListener("error",()=>{
            reject(reader.error)
        })
        reader.readAsArrayBuffer(file)
    })
}


//renamefile
const renameFileBtn=document.getElementById('renameFileBtn');

renameFileBtn.addEventListener('click',async (e)=>{

    let currentDir=currentUrl.replace(window.location.origin,'');
    let nameFor=document.querySelector(`#renameFileModal .name-for`).textContent;
    let newName=document.querySelector(`#renameFileModal #newFileName`).value || nameFor;
    let toName=currentDir+'/'+newName
    let currentFile=currentDir+'/'+nameFor;
    console.log({currentFile,currentDir,nameFor,newName,toName});
    if(await updateAddFile(currentFile,JSON.stringify({toName:currentDir+'/'+newName}),'MOVE')){
        document.querySelector(`#renameFileModal .btn-icon-reset`).click();
        refreshtable()
    }else{
        document.querySelector(`#renameFileModal .btn-icon-reset`).click();
        console.log('something wrong');
    }


})


//moveFile
const moveFileModal=document.querySelector('#moveFileModal');

// function getDirTree(url){
// let tree={};
//
// async function diveIntoDirs(url){
//     let files=await getFiles(url);
//     for(let item of files.list){
//         if(item.type=="Directory"){
//             tree[item.name]=await getFiles(item.link);
//         }else{
//             tree[item.name]=item;
//         }
//     }
//
// }
// diveIntoDirs(url).then(()=>{
//     console.log(tree);
//     return tree;
// })
// }

document.querySelector('#uploadModal .close').addEventListener('click',()=>{
    fileform.reset();
    filestatsContainer.innerHTML='';
})
document.querySelector(`#uploadModal .cancel`).addEventListener('click',()=>{
    fileform.reset();
    filestatsContainer.innerHTML='';
})


function succesAlert(msg,timeout=7000){
    editorMessages.classList.remove('error')
    editorMessages.classList.add('success')
    editorMessages.innerHTML=msg
    editorMessages.classList.add('show')
    hideAlert(timeout)
}
function failAlert(msg,timeout=7000){
    editorMessages.classList.remove('success')
    editorMessages.classList.add('error')
    editorMessages.innerHTML=msg;
    editorMessages.classList.add('show')
    hideAlert(timeout)
}
function hideAlert(time){
    setTimeout(()=>{
        editorMessages.classList.toggle('show')
    },time)
}
function setAlert(current){
        editorMessages=document.querySelector(`${current} .alert`);
}



async function uploadFile(url, content, method,fileName='DumbFile'){
    let request = new XMLHttpRequest();
    request.open(method, url);

// upload progress event
    request.upload.addEventListener('progress', function(e) {
        let percent_complete = (e.loaded / e.total)*100;

        // percentage of upload completed
        document.querySelector(`#${fileName.replace(/[\. \)\(]/gi,'_')} .upload-state`).textContent=percent_complete==100?"uploaded ":"Uploading...";
        document.querySelector(`#${fileName.replace(/[\. \)\(]/gi,'_')} .percentage`).textContent=`${percent_complete}%`;
        document.querySelector(`#${fileName.replace(/[\. \)\(]/gi,'_')} .progress-bar`).style.width=`${percent_complete}%`

    });

    request.addEventListener('error',(e)=>{
        console.log(e)
        document.querySelector(`#${fileName.replace(/[\. \)\(]/gi,'_')} .upload-error`).style.display="block";

    })
// AJAX request finished event
    request.addEventListener('load', function(e) {
        // HTTP status message
        console.log(request.status);

        // request.response will hold the response from the server
        console.log(request.response);
    });

// send POST request to server side script
    request.send(content);


}


async function updateAddFile(url,content,method,header={}){
    return fetch(url,{
        method: method.toUpperCase(),
        mode: 'cors',
        headers:header,
        body: content
    }).then(res=>{

        console.log(res.status)
        return true;
    }).catch(e=>{

        console.log(e.toString())
        return false;
    })
}

async function refreshtable(){
    setTableList(await getFiles(currentUrl),currentUrl)
}
function setTableList(files,link){
    currentUrl=link;
    document.querySelector('.uploading-folder').textContent=currentUrl;
    let trs=''
    for(let file of files.list){
        trs+=getTemplateExpanded(file);
    }
    files_table.innerHTML=trs;
    setEvents();
}
async function getFiles(url){
    let files=await fetch(url)
    return files.json();
}

