function shardStats(i) {
 $(`body`).append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog" role="document">
   <div class="dark-mode modal-content">
     <div class="dark-mode modal-header">
       <h5 class="dark-mode modal-title" id="exampleModalLabel"><b>Status of Shard ${i}</b></h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
     <div class="dark-mode modal-body">
       
     </div>
    <!--- <div class="dark-mode modal-footer">
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       <button type="button" class="btn btn-primary">Save changes</button>
     </div> --->
   </div>
 </div>
</div>>`)
$('#exampleModal').modal('show')
}

function refreshStats(i) {
    try {
        $.get('status', (data, status) => {
            if (!data) return;
            newdata = data;
            const ids = $("#shard-status-card div[id]").map(function () { return this.id; }).get();
            for (let i = 0; i < ids.length; i++) {
                const shard = newdata.find((x => `shard-button${x.id}` === ids[i]));
                if (shard !== undefined) continue;
                console.log(ids[i])
                $(`#${ids[i]}`).remove();
            }
            for (let i = 0; i < newdata.length; i++) {
                const color = (newdata[i].status === 'online' ? 'green' : 'red');
                const classname = (newdata[i].status === 'online' ? 'normal' : 'alert');
                const classnamecolor = (newdata[i].status === 'online' ? '#43b581' : '#ED4245');
                if (!$(`#shard-button${i}`).length) {
                    $("#shard-status-card").append(`<div id="shard-button${i}" class="shard-button">
                    <p id= "shard-button-name${i}" class="shard-button ${color}"><b>Shard ${newdata[i].id}</b>
                    </p>
                    <div class="shard-button ressource"><i class="fa fa-cog"></i><span>
                        <button id="shard-button-ressource-stats${i}" title="Statistics" class="shard-button managestats" onClick="shardStats(${i})"><i class="fa fa-hdd"></i></button>
                        <button id="shard-button-ressource-refresh${i}" title="Refresh Stats"class="shard-button managegreen" onClick="refreshStats(${i})"><i class="fa fa-retweet"></i></button>
                        <button id="shard-button-ressource-kill${i}" title="Kill Shard" class="shard-button managered" onClick="killShard(${i})"><i class="fa fa-stop"></i></button>
                        </span></div>
                    <p id="shard-button-log${i}" class="shard-button log ${classname}">${newdata[i].message}</p>
                  </div>`)
                } else {

                    $(`#shard-button-log${i}`).css('color', classnamecolor)
                    $(`#shard-button-log${i}`).text(newdata[i].message);
                    $(`#shard-button-name${i}`).removeClass('.shard-button red').addClass(`.shard-button ${color}`);
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function killShard(i) {
    alert("In function shardStats " + i);
}


