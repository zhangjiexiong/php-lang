function loadingMsg(params){
    let infoListWrap = document.getElementById(params.id) 
    infoListWrap.innerHTML = `
    <div class="loading-wait" style='width:100%'>
    <p>${params.message}</p>
    <div class='loading-icon'>
        <i class="fa fa-spinner" aria-hidden="true"></i>
    </div>`
}