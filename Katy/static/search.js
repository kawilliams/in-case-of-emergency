/* Generic function that closes any pop-up message */
function closeDiv(divID){
	var curDiv = document.getElementById(divID);
	curDiv.style.display = "none";
	document.getElementById("blackout").style.display = "none";
}
/* Used to close the iframe description window */
function closeDescription(divID) {
	var descriptionElem = document.getElementById("iframe_sur_div");
	document.getElementById(divID).removeChild(descriptionElem);
	closeDiv(divID);
}
/* Jump back to top of results */
function scrollToTop() {
	window.scrollTo(0, 0);
}
/* Opens and Closes the Accordion */
function toggleAcc(accContentID){
	var accContent = document.getElementById(accContentID);
	if (accContent != null) {
		if (accContent.style.display == 'block'){
			accContent.style.display = 'none';
		}
		else{
			accContent.style.display = 'block';	
		}
	}
}
function toggleFilter(closeFilter){
	var filter = document.getElementById('filter');
	var menu = document.getElementById('menu-icon');
	var main = document.getElementById('main');
	if (closeFilter){
		filter.style.transition = '0.7s';//'2s';
		filter.style.marginLeft = '-1000px';	
		setTimeout(function(){menu.style.display = 'block';}, 400);
		main.style.width = '100%';
		main.style.marginLeft = "0%";
		/*document.getElementById("help_div").style.left = '35%';*/
		document.getElementById('course_desc_div').style.left = '30%';
	}
	else{
		filter.style.transition = '0.7s';
		filter.style.marginLeft = '0px';
		setTimeout(function(){menu.style.display = 'none';}, 300);
		main.style.width = '75%';
		main.style.marginLeft = "25%";
		/*document.getElementById("help_div").style.left = '48%';*/
		document.getElementById('course_desc_div').style.left = '43%';
	}	
}

function hasClass(element, clss) {
	return (element.className).indexOf(clss) > -1;
}

function toggleCheckbox(checkboxLabelID){
	var checkboxLabel = document.getElementById(checkboxLabelID);
	var checkbox = document.getElementById(checkboxLabel.htmlFor);
	if (checkbox.checked){
		checkboxLabel.style.color = "#008080";
	}
	else{
		checkboxLabel.style.color = "black";
	}
}
function clearAll(){
	var checkboxLabels = document.getElementsByClassName('checkbox-label');	
	
	for (var i = 0; i < checkboxLabels.length; i++){
		var label = checkboxLabels[i];
		var checkbox = document.getElementById(label.htmlFor);
		label.style.color = 'black';
		checkbox.checked = false;	
	}

	document.getElementById('from-class-size-select').options[0].selected = true;
	var toSelect = document.getElementById('to-class-size-select');
	toSelect.options[toSelect.length - 1].selected = true;
}

/*------------------------Professor Search Function----------------------*/

function filterProfs(){

	var profs = document.getElementsByClassName("prof");
	var curInput = document.getElementById("prof_search_id").value.toLowerCase();
	var inputLen = curInput.length;
	
	var i;
	for (i = 0; i < profs.length; i++){
		var curElem = profs[i];
		var curSubStr = curElem.value.substring(0,inputLen).toLowerCase();
	
		if (curSubStr !== curInput){
			curElem.parentElement.style.display = "none";	
		}	
		else{
			curElem.parentElement.style.display = "block";	
		}
	}
}

function toggleMornAft(mornAftClassname, input){
	var mornAftClasses = document.getElementsByClassName(mornAftClassname);
	var check = false;
	var color = 'black';
	
	if (input.checked){
		check = true;
		color = '#008080';
	}
	for (var i = 0; i < mornAftClasses.length; i++){
		mornAftClasses[i].checked = check;
		document.getElementById(mornAftClasses[i].id + '_label').style.color = color;
	}
}


/*---------------------Create query to pass to the db------------------*/

function createQueryStr(){

	var profStr = "";
	var deptStr = "";
	var dayStr = "";
	var timeStr = "";
	var distStr = "";
	var semStr = "";
	var classSizeStr = "";
	
	var checkedBoxes = document.getElementsByClassName("choices");
	for(var i = 0; i < checkedBoxes.length; i++){
		var curElem = checkedBoxes[i];
		if (curElem.checked){
			if (hasClass(curElem, "prof_check")){
				var replacemt;
				if(profStr != ""){
					replacemt = profStr.concat(" or ", curElem.value);
				}
				else{
					replacemt = profStr.concat(curElem.value);
	
				}
				profStr = replacemt;
			}
			if (hasClass(curElem, "dept_check")){
				var replacemt;
				if(deptStr != ""){
					replacemt = deptStr.concat(" or ", curElem.value);
				}
				else{
					replacemt = deptStr.concat(curElem.value);
				}
				deptStr = replacemt;
			}
			if (hasClass(curElem,"day_check")){
				var replacemt;
				if(dayStr != ""){
					replacemt = dayStr.concat(" or ", curElem.value);
				}
				else{
					replacemt = dayStr.concat(curElem.value);
				
				}
				dayStr = replacemt;
			}
			if (hasClass(curElem,"time_check")){
				var replacemt;
				if(timeStr != ""){
					replacemt = timeStr.concat(" or ", curElem.value);
				}
				else{
					replacemt = timeStr.concat(curElem.value);
				
				}
				timeStr = replacemt;
			}
			if (hasClass(curElem,"dist_req_check")){
				var replacemt;
				if(distStr != ""){
					replacemt = distStr.concat(" or ", curElem.value);
				}
				else{
					replacemt = distStr.concat(curElem.value);
				
				}
				distStr = replacemt;
			}
		}
	}
	
	var fromClassSize = document.getElementById('from-class-size-select');
	var fromAns = (fromClassSize.options[fromClassSize.selectedIndex]).innerHTML;
	var toClassSize = document.getElementById('to-class-size-select');
	var toAns = (toClassSize.options[toClassSize.selectedIndex]).innerHTML;
	if ((fromAns == "1") && (toAns == "35")){
		classSizeStr = "";
	}
	else{
		classSizeStr = fromAns + "-" + toAns;	
	}
	
	var semDropdown = document.getElementById("year_dropdwn");
	var semChoices = semDropdown.options;
	var semAns = semChoices[semDropdown.selectedIndex];
	var replacemt;
	replacemt = semStr.concat(semAns.value);
	semStr = replacemt;
	
	document.getElementById("period").value = semStr;
	document.getElementById("prof_form").value = profStr;
	document.getElementById("dep").value = deptStr;
	document.getElementById("days").value = dayStr;
	document.getElementById("times").value = timeStr;
	document.getElementById("distri").value = distStr; 	
	document.getElementById("class_size").value = classSizeStr;	
}


/*-------------------------- Display Course Description ---------------------------*/

function showDescription(divID, dept, course_num){

	var curDiv = document.getElementById(divID);
	curDiv.style.display = "block";
	document.getElementById("blackout").style.display = "block"; 	
	
	curDiv.style.marginTop = "5%";
	curDiv.style.marginLeft = "-40%";
	curDiv.style.width = "90%";
	curDiv.style.height = "80%";
	curDiv.style.backgroundColor = "white";
	curDiv.style.paddingBottom = "2px";
	var limitingDiv = document.createElement("DIV");
	limitingDiv.id = "iframe_sur_div";
	limitingDiv.style.padding = "0px";
	limitingDiv.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19)";
	
	var a = document.createElement('iframe');
	a.id = "iframe_description"
	a.src = "http://www.davidson.edu/general-course-detail/?subj=" + dept + "&cnum=" + course_num;	
	a.width = "100%"; //100%
	a.height = "100%";//"1410";
	a.style.marginTop = "-160px";
	a.style.marginBottom = "-800px";
	a.frameborder = "1";
	a.style.overflow = "scroll";
	limitingDiv.appendChild(a);
	
	var cancelBtn = document.getElementById('put_here');
	curDiv.insertBefore(limitingDiv, cancelBtn);
}


function closeDescription(divID) {
	var curDiv = document.getElementById(divID);
	var descriptionElem = document.getElementById("iframe_sur_div");
	curDiv.removeChild(descriptionElem);
	curDiv.style.display = "none";
	document.getElementById("blackout").style.display = "none";
}

function openCloseAllAccordions(open){
	var accContents = document.getElementsByClassName('acc-content-results');
	var display = 'none';
	if (open){
		display = 'block';	
	}
	for (var i = 0; i < accContents.length; i++){
		accContents[i].style.display = display;
	}
}
function toggleOpenCloseBtn(){
	var openCloseBtn = document.getElementById('open-close-btn');
	if (openCloseBtn.innerHTML == "Open All"){
		openCloseBtn.style.backgroundColor = "white";
		openCloseBtn.style.color = "#660000";
		openCloseBtn.innerHTML = "Close All";
		openCloseAllAccordions(true);
	
	}	
	else{
		openCloseBtn.style.backgroundColor = "#660000";
		openCloseBtn.style.color = "white";
		openCloseBtn.innerHTML = "Open All";
		openCloseAllAccordions(false);
		
	}
}

function openCloseSeatAccordions(open){
	var accContents = document.getElementsByClassName('no-seats');	
	var display = 'none';
	if (open){
		display = 'block';	
		var resultSpan = parseInt(document.getElementById("count").innerHTML) + accContents.length;
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	else {
		var resultSpan = parseInt(document.getElementById("count").innerHTML) - accContents.length;
		if (resultSpan < 0){
			resultSpan = 0;
		}
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	var secondFirstDiv = false;
	for (var i = 0; i < accContents.length; i++){
		accContents[i].style.display = display;
		/*var foo = accContents[i].className;*/
	}
}

function toggleSeatsAvailBtn(){
	var seatsAvailBtn = document.getElementById('seats-avail-btn');
	if (seatsAvailBtn.innerHTML == "Seats Available"){
		seatsAvailBtn.style.backgroundColor = "white";
		seatsAvailBtn.style.color = "#660000";
		seatsAvailBtn.innerHTML = "All Courses";
		openCloseSeatAccordions(false);
		//keepFirstDivStill();
		
	}	
	else{
		seatsAvailBtn.style.backgroundColor = "#660000";
		seatsAvailBtn.style.color = "white";
		seatsAvailBtn.innerHTML = "Seats Available";
		openCloseSeatAccordions(true);
		//keepFirstDivStill();
		
	}	
}

function openCloseVisAccordions(open){
	var accContents = document.getElementsByClassName('no-visit');
	
	var display = 'none';
	if (open){
		display = 'block';	
		var resultSpan = parseInt(document.getElementById("count").innerHTML) + accContents.length;
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	else {
		var resultSpan = parseInt(document.getElementById("count").innerHTML) - accContents.length;
		if (resultSpan < 0){
			resultSpan = 0;
		}
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	for (var i = 0; i < accContents.length; i++){
		accContents[i].style.display = display;
	}
}
function toggleAllowVisBtn(){
	var allowVisBtn = document.getElementById('allow-vis-btn');
	if (allowVisBtn.innerHTML == "Visitors Allowed"){
		allowVisBtn.style.backgroundColor = "white";
		allowVisBtn.style.color = "#660000";
		allowVisBtn.innerHTML = "All Courses";
		openCloseVisAccordions(false);
	}	
	else{
		allowVisBtn.style.backgroundColor = "#660000";
		allowVisBtn.style.color = "white";
		allowVisBtn.innerHTML = "Visitors Allowed";
		openCloseVisAccordions(true);
	}
}

function openCloseVisAccordions(open){
	var accContents = document.getElementsByClassName('no-visit');	
	var display = 'none';
	if (open){
		display = 'block';	
		var resultSpan = parseInt(document.getElementById("count").innerHTML) + accContents.length;
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	else {
		var resultSpan = parseInt(document.getElementById("count").innerHTML) - accContents.length;
		if (resultSpan < 0){
			resultSpan = 0;
		}
		document.getElementById("count").innerHTML = String(resultSpan);
	}
	var secondFirstDiv = false;
	for (var i = 0; i < accContents.length; i++){
		accContents[i].style.display = display;
		var foo = accContents[i].className;
	}
}

function toggleAllowVisBtn(){
	var allowVisBtn = document.getElementById('allow-vis-btn');
	if (allowVisBtn.innerHTML == "Visitors Allowed"){
		allowVisBtn.style.backgroundColor = "white";
		allowVisBtn.style.color = "#660000";
		allowVisBtn.innerHTML = "All Courses";
		openCloseVisAccordions(false);
		//keepFirstDivStill();
		
	}	
	else{
		allowVisBtn.style.backgroundColor = "#660000";
		allowVisBtn.style.color = "white";
		allowVisBtn.innerHTML = "Visitors Allowed";
		openCloseVisAccordions(true);
		//keepFirstDivStill();
		
	}	
}
function hideDiv(loopIndex) {
	/*document.getElementById('acc_'+String(loopIndex)).style.display='none';  old method*/
	var child = document.getElementById('acc_'+String(loopIndex));
	child.parentNode.removeChild(child);
	resultSpan = String(parseInt(document.getElementById("count").innerHTML) - 1);
	document.getElementById("count").innerHTML = resultSpan;
	/* reset which div is the "first" div */
	//keepFirstDivStill();
	
}


function countResults(chosen_year, tableId) {
	var resultSpan = document.getElementById("displayed_yr");
	var numResults = document.querySelectorAll(".acc-results").length;
	resultSpan.innerHTML = "<i>"+chosen_year+"</i>&nbsp;&nbsp;&nbsp;"+"Total Results: <span id='count'>"+String(numResults)+"</span>"; 
	
}

/*document.getElementById('acc_{{loop.index0}}').style.display='none';*/
function showTooltip(tooltipID, displayType){
	document.getElementById(tooltipID).style.display = displayType;
}
function hideTooltip(tooltipID){
	document.getElementById(tooltipID).style.display = 'none';
}

function mainPageSetup(searchBox){
	searchBox.style.marginTop = "5px";	
	searchBox.style.width = "90%";
	searchBox.style.margin = "0 auto";
	searchBox.style.height = "55px";
	searchBox.style.paddingTop = "0px";
	document.getElementById("by_keyword_home").style.position = "absolute";
	document.getElementById("search_bar").style.marginLeft = "180px";
	document.getElementById("search_bar").style.width = "calc(100% - 180px)";
	document.getElementById("search_home_td").style.width = "70%";
	document.getElementById("search_home").style.width = "99%";
	document.getElementById("search_btn_home_td").style.width = "5%";
	document.getElementById("descript_page").style.display = "none";

}

function resultsPageSetup(searchBox){
	searchBox.style.display = "none";
	document.getElementById("by_keyword_home").style.position = "absolute";
	document.getElementById("search_home_td").style.display = "none"; /*width = "50%";*/
	document.getElementById("search_home").style.display = "none"; /*width = "59%";*/
	document.getElementById("search_btn_home_td").style.display = "none"; /*width = "10px";*/
	document.getElementById("descript_page").style.display = "none";
	document.getElementById("welcome_text").style.display = "none";
	document.getElementById("open-close-btn").style.display = "inline";
	document.getElementById("seats-avail-btn").style.display = "inline";
	document.getElementById("allow-vis-btn").style.display = "inline";
}

/* determine if element has a class */
function hasClass(element, cls) f{
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


function showResults(){
	setTimeout(function(){
	var searchBox = document.getElementById("opq_search_box");
	searchBox.marginBottom = "400px";
	resultsPageSetup(searchBox);
	}, 10);
}
function showNoResults(){
	setTimeout(function(){
	var searchBox = document.getElementById("opq_search_box");
	var results = document.getElementById("results");
	mainPageSetup(searchBox);
	
	results.style.opacity = "0.0";
	results.style.zIndex = "-1";
	results.style.position = "absolute";
	}, 10);
}
function keepSemester(semester){
	var yearInputs = document.getElementsByClassName("year_li");
	for(var x = 0; x < yearInputs.length; x++){
		var curElem = yearInputs[x];
		if(curElem.value == semester){
			curElem.selected = true;  
		}
	}	
}
function keepClassSize(class_size_kept){
	var fromSelect = document.getElementById('from-class-size-select');
	var fromOptions = fromSelect.options;
	var toSelect = document.getElementById('to-class-size-select');
	var toOptions = toSelect.options;
	
	var split = class_size_kept.split("-");	
	var from = split[0];
	var to = split[1];
	
	var fromSolution;
	var foundSolFrom = false;
	for (var i = 0; i < fromOptions.length; i++){
		if (fromOptions[i].value == ("from_" + String(from))){
			fromSolution = fromOptions[i];
			foundSolFrom = true;
			break;	
		}
	}
	var toSolution = "";
	var foundSolTo = false;
	for (var i = 0; i < toOptions.length; i++){
		if (toOptions[i].value == ("to_" + String(to))){
			toSolution = toOptions[i];
			foundSolTo = true;
			break;	
		}	
	}
	
	if (foundSolTo && foundSolFrom){
		fromSolution.selected = true;
		toSolution.selected = true;	
		document.getElementById("class-size-acc-content").style.display = 'block';
	}	
}
