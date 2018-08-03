<script src="https://lspug.sharepoint.com/sites/fun/siteassets/jquery-3.3.1.min.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="https://lspug.sharepoint.com/sites/fun/SiteAssets/StyleTiles.css" />
<link rel="stylesheet" type="text/css" href="https://lspug.sharepoint.com/sites/fun/SiteAssets/bootstrap.css" />
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
<style type="text/css">
/* The actual popup (appears on top) */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 21%;
    left: 33%;
    margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
}
#categoryId option{color:black;}
#categoryId option:selected{color:black;}
/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {opacity: 0;} 
    to {opacity: 1;}
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}
#thanksPopUp { animation: css 0s 39s forwards; }

@keyframes css  { to { visibility: hidden; } }

.form-background{
    color:white !important;
    background: #8E0E00;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1F1C18, #8E0E00);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1F1C18, #8E0E00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>
 <div class="w3-twothird panel panel-info " id="submitform" >
    <div class="w3-container w3-card form-background w3-margin-bottom">
        
        <div class="w3-container">
        <h1  class="w3-padding-16" style="color:white"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp; Submit an idea!</h1>
          <p>Your opinion counts!</p>
          <p>
          <div class="panel-body">
          Is you idea a:<br>
        <div class="radio">
            <label><input type="radio" name="type" data-name='A new suggestion'>A new suggestion</label>
        </div>
        <div class="radio">
            <label><input type="radio" name="type" data-name='An improvement to existing'>An improvement to existing</label>
        </div>
        <div class="radio">
            <label><input type="radio" name="type" data-name='A request to bring back function'>A request to bring back function</label>
        </div>
        <div class="radio">
            <label><input type="radio" name="type" data-name='Other'>Other</label>
        </div>
        </p>
          <hr>
          <div class="form-group popup" style="text-align:left">
            <label for="categoryId">Your idea is related to:&nbsp;&nbsp; </label>
            <select id="categoryId">
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
                <option value="6">Category 6</option>
                <option value="7">Category 7</option>
                <option value="8">Category 8</option>
                <option value="9">Category 9</option>
                <option value="10">Category 10</option>
             </select>
             <br><hr>
            <label for="ideasId">Comments:</label>
            <textarea class="form-control" rows="6" id="ideasId"></textarea><br><br>
			<a type="button" class="btn btn-default" style="color:black" id="submitId" >Submit <span class="glyphicon glyphicon-envelope"></span></a>
			<span class="popuptext" id="thanksPopUp">Thanks for your feedback!</span>
		</div>
        </div>
        <div class="w3-container">
          <p>         Thanks you do gooder!<br>Keep them coming, <a href="https://lspug.sharepoint.com/sites/fun/SitePages/Submit%20an%20Idea.aspx">submit more!</a></p><br>
        </div>
      </div>

</div>
<script>
<script class="code" type="text/javascript">
(function(){
$(document).ready(function() { 
    // make sure the SharePoint script file 'sp.js' is loaded before code runs
		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', SubmitIdea);
});
function SubmitIdea(){
	
$("#submitId").click(function () {
    createListItem("SubmitYourIdea",listLoadSuccess,globalError);
	var popup = document.getElementById("thanksPopUp");
   $('#showform>input:radio').attr('checked','false');
      popup.classList.toggle("show");
});
	
}
function createListItem(listName, onSuccess, onFail){
    var ctx= new SP.ClientContext.get_current();
    var oList=ctx.get_web().get_lists().getByTitle(listName);
	
	var itemCreateInfo= new SP.ListItemCreationInformation();
	this.oListItem=oList.addItem(itemCreateInfo);
	
	oListItem.set_item('Title', 'Incoming New Idea!');
    oListItem.set_item('TypeOfIdea',$('input:radio[name=type]:checked').data('name'));
    oListItem.set_item('Category',$("#categoryId option:selected").text());
	oListItem.set_item('Idea',$("#ideasId").val());
	oListItem.update();
	
	ctx.load(oListItem); 
	ctx.executeQueryAsync(function(sender, args){onSuccess(colListItem);},onFail);
	
}
function listLoadSuccess(sender,args){
	console.log('Idea  Created: '+oListItem.get_id()+$("#ideasId").val());
	popUpThanks();
}
//error handler - generic
function globalError(sender, args) {
     alert(args.get_message());
   }   

})();

</script>
