function getSize(size){
    return (size / 1024)>1000?((size / 1024)/1024).toFixed(2)+' MB':(size / 1024).toFixed(2)+' KB';
}
let permissionMap={1: "--x", 2: "-w-", 3: "-wx", 4: "r--", 5: "r-x", 6: "rw-", 7: "rwx"}
function getPermissionString(numeric){
    let permString="---";
    numeric.split('').forEach(number=>permString+=permissionMap[Number(number)
        ])
    return permString;

}

function getTemplateExpanded(data) {

    if (data.type == "Directory") {
        return `
<tr class="file-item" data-type="dir" data-link="${data.link}">
                                <td>
                                    <label class="checkbox">
                                        <input type="checkbox">
                                        <span class="checkbox-text"></span>
                                    </label>
                                </td>
                                <td>
                                    <svg class="svg-icon" fill="none" height="13" viewBox="0 0 17 13" width="17">
                                        <path d="M17 3.33337V12C17 12.5523 16.5523 13 16 13H1C0.447715 13 0 12.5523 0 12V2.33337V1C0 0.447715 0.447715 0 1 0H6.54006C6.83199 0 7.10934 0.127565 7.29932 0.349215L9 2.33337H16C16.5523 2.33337 17 2.78109 17 3.33337Z" fill="#58595B"></path>
                                    </svg>
                                    <span class="file-name">${data.name}</span>
                                </td>
                                <td>${getSize(data.stats.size)}</td>
                                <td>${data.stats.mtime}</td>
                                <td>${getPermissionString( (data.stats.mode & parseInt('777', 8)).toString(8))}</td>
                            </tr>



`
    }
    else
    {

        return `<tr class="file-item" data-type="file" data-link="${data.link}">
                                <td>
                                    <label class="checkbox">
                                        <input type="checkbox">
                                        <span class="checkbox-text"></span>
                                    </label>
                                </td>
                                <td>
                                    <svg class="svg-icon" fill="none" height="17" viewBox="0 0 15 17" width="15"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29674 1H2C1.44772 1 1 1.44771 1 2V14.8571C1 15.4094 1.44772 15.8571 2 15.8571H13C13.5523 15.8571 14 15.4094 14 14.8571V5.17422C14 4.8823 13.8724 4.60495 13.6508 4.41496L9.94753 1.24074C9.76629 1.08539 9.53545 1 9.29674 1Z"
                                              stroke="#58595B"/>
                                        <path d="M9.66656 4.3333V1.61902H11.1696L13.619 3.78653V5.3333H10.6666C10.1143 5.3333 9.66656 4.88559 9.66656 4.3333Z"
                                              fill="#58595B"/>
                                    </svg>
                                    <span class="file-name">${data.name}</span>
                                </td>
                                <td>${getSize(data.stats.size)}</td>
                                <td>${data.stats.mtime}</td>
                                <td>${getPermissionString( (data.stats.mode & parseInt('777', 8)).toString(8))}</td>
                            </tr>
    
    `
    }


}


function getFileTemplate(data) {
    return `
     <li class="file-item item side_file" data-link="${data.link}" >
                                    <svg class="svg-icon" fill="none" height="17" viewBox="0 0 15 17" width="15"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29674 1H2C1.44772 1 1 1.44771 1 2V14.8571C1 15.4094 1.44772 15.8571 2 15.8571H13C13.5523 15.8571 14 15.4094 14 14.8571V5.17422C14 4.8823 13.8724 4.60495 13.6508 4.41496L9.94753 1.24074C9.76629 1.08539 9.53545 1 9.29674 1Z"
                                              stroke="#58595B"/>
                                        <path d="M9.66656 4.3333V1.61902H11.1696L13.619 3.78653V5.3333H10.6666C10.1143 5.3333 9.66656 4.88559 9.66656 4.3333Z"
                                              fill="#58595B"/>
                                    </svg>
                                    <span class="name">${data.name}</span>
                                </li>`
}


function getFolderTemplate(data) {
    return `
    
    <li class="dir-item item side_folder" data-open="false" data-link="${data.link}" >
                                    <svg class="icon-contract svg-icon" fill="none" height="13" viewBox="0 0 17 13" width="17">
                                        <path d="M17 3.33337V12C17 12.5523 16.5523 13 16 13H1C0.447715 13 0 12.5523 0 12V2.33337V1C0 0.447715 0.447715 0 1 0H6.54006C6.83199 0 7.10934 0.127565 7.29932 0.349215L9 2.33337H16C16.5523 2.33337 17 2.78109 17 3.33337Z"
                                              fill="#58595B"/>
                                    </svg>
                                    <svg class="icon-expend svg-icon" fill="none" height="13" viewBox="0 0 19 13" width="19">
                                        <path d="M17 3.33337V13H0V2.33337V1C0 0.447715 0.447715 0 1 0H6.54006C6.83199 0 7.10934 0.127565 7.29932 0.349215L9 2.33337H16C16.5523 2.33337 17 2.78109 17 3.33337Z"
                                              fill="#58595B"/>
                                        <path d="M16.9999 13H-0.00012207L1.36661 4.34404C1.44335 3.85799 1.8623 3.5 2.35437 3.5H17.3296C17.9441 3.5 18.4133 4.049 18.3174 4.65597L16.9999 13Z"
                                              fill="#C0C0C0"/>
                                    </svg>
                                    <span class="name">${data.name}</span>
                                    <ul class="sub-files">
                                        <li class="file-item item">
                                            <svg class="svg-icon" fill="none" height="17" viewBox="0 0 15 17" width="15"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.29674 1H2C1.44772 1 1 1.44771 1 2V14.8571C1 15.4094 1.44772 15.8571 2 15.8571H13C13.5523 15.8571 14 15.4094 14 14.8571V5.17422C14 4.8823 13.8724 4.60495 13.6508 4.41496L9.94753 1.24074C9.76629 1.08539 9.53545 1 9.29674 1Z"
                                                      stroke="#58595B"/>
                                                <path d="M9.66656 4.3333V1.61902H11.1696L13.619 3.78653V5.3333H10.6666C10.1143 5.3333 9.66656 4.88559 9.66656 4.3333Z"
                                                      fill="#58595B"/>
                                            </svg>
                                            <span class="name">UsersManagers.php</span>
                                        </li>
                                    </ul>
                                </li>
    
    `
}

function getUploadingfileTemplate(file){
    return ` <li class="file-item" data-name="mamak.zip" id="${file.name.replace(/[\. \)\(]/gi,'_')}">
                            <h3 class="name float-lt">${file.name}</h3>
                            <span class="size">${getSize(file.size)}</span>
                            <button class="remove-upload-file btn-icon-reset" type="button">
                                ×
                            </button>
                            <div class="start-upload">
                                <em class="upload-state">Queued for Upload...</em>
                                <span class="percentage">0%</span>
                                <div class="progress">
                                    <div class="progress-bar" style="width: 0%;">
                                    </div>
                                </div>
                            </div>
                            <div class="file-error upload-error">
                               <strong>error!</strong>
                <span class="text"> upload failed.</span>
                            </div>
                        </li>`
}