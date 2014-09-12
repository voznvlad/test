
$( document ).ready(function() {

$(".main").css({height:((window.innerHeight-78))});					//setting right sizes
$(".main").css({width:((window.innerWidth-12))});

var fromJSON = {"result":[{"id":2,"name":"stream,","color":"#5D8AA8"},{"id":3,"name":"Lan","color":"#9966CC"},{"id":4,"name":"fired.","color":"#7BA05B"},{"id":5,"name":"When","color":"#5D8AA8"},{"id":6,"name":"she","color":"#9966CC"},{"id":7,"name":"heard","color":"#7BA05B"},{"id":8,"name":"the","color":"#5D8AA8"},{"id":9,"name":"shot,","color":"#9966CC"},{"id":10,"name":"the","color":"#7BA05B"},{"id":11,"name":"bear","color":"#5D8AA8"},{"id":12,"name":"turned","color":"#9966CC"},{"id":13,"name":"to","color":"#7BA05B"},{"id":14,"name":"her","color":"#5D8AA8"},{"id":15,"name":"cubs","color":"#9966CC"},{"id":16,"name":"and","color":"#7BA05B"},{"id":17,"name":"slapping","color":"#5D8AA8"},{"id":18,"name":"first","color":"#9966CC"},{"id":19,"name":"one","color":"#7BA05B"},{"id":20,"name":"and","color":"#5D8AA8"},{"id":21,"name":"then","color":"#9966CC"},{"id":22,"name":"the","color":"#7BA05B"},{"id":23,"name":"other,","color":"#5D8AA8"},{"id":24,"name":"she","color":"#9966CC"},{"id":25,"name":"chased","color":"#7BA05B"},{"id":26,"name":"them","color":"#5D8AA8"},{"id":27,"name":"up","color":"#9966CC"},{"id":28,"name":"a","color":"#7BA05B"},{"id":29,"name":"tree.","color":"#5D8AA8"},{"id":30,"name":"Lan's","color":"#9966CC"},{"id":31,"name":"second","color":"#7BA05B"},{"id":32,"name":"shot","color":"#5D8AA8"},{"id":33,"name":"struck","color":"#9966CC"},{"id":34,"name":"her.","color":"#7BA05B"},{"id":35,"name":"Wounded","color":"#5D8AA8"},{"id":36,"name":"and","color":"#9966CC"},{"id":37,"name":"raging,","color":"#7BA05B"},{"id":38,"name":"she","color":"#5D8AA8"},{"id":39,"name":"charged","color":"#9966CC"},{"id":40,"name":"fiercely","color":"#7BA05B"},{"id":41,"name":"on","color":"#5D8AA8"},{"id":42,"name":"the","color":"#9966CC"},{"id":43,"name":"hunter.","color":"#7BA05B"},{"id":44,"name":"A","color":"#5D8AA8"},{"id":45,"name":"third","color":"#9966CC"},{"id":46,"name":"shot","color":"#7BA05B"},{"id":47,"name":"struck","color":"#5D8AA8"},{"id":48,"name":"her","color":"#9966CC"},{"id":49,"name":"in","color":"#7BA05B"},{"id":50,"name":"the","color":"#5D8AA8"},{"id":51,"name":"head","color":"#9966CC"}],"total":16667}
																					//couldn`t get JSON data from server, so just copied it here
window.location.hash="";												//clear hash
var rowQuantity = 0;
var numberFromJSON = 0;                             //to get elements from result array in order
var save = "<h1>Hello World!</h1>";					//save content when going between tabs
var scrollSave = [0,0];								//save scroll position
var initial;										//helping to load table rows seamlessly by watching for user scroll
var scrollLines = 1;								//helping to load table rows seamlessly by telling, how many rows to add


$(".hello").click(function(){window.location.hash = "greet"});		//To greeting tab
$(".table").click(function(){window.location.hash = "table"});		//To Table tab

var theEnd = function(){								//function - writes "total" attribute from JSON into the last table cell
	$("td:last").text("Total: "+fromJSON.total);
	$("td:last").removeClass();							//removes class so the cell won`t be colored on click
}

var colorFill = function (el){										//coloring function
	$(el).animate({backgroundColor:$(el).attr("class")},400);
}

var newrow = function(quantity){										//function - creating and filling new rows
  if(rowQuantity >= 256 || quantity < 1){								//if enough rows, let them be colored and call the End function
    $("td").click(function() {colorFill(this);});						//this lets last created rows be colored
    theEnd();
    return;
  }
	for (i=0;i<quantity;i++) {											//loop create rows
	  if(rowQuantity >= 256){return;}									//don`t need too much rows
	  if(rowQuantity === 1){initial = $("tr:first").offset().top;}		//after first row is done, get it`s coordinates to load further table rows smoothly
		$("tbody").append("<tr></tr>");
		rowQuantity++;
		for(j=0;j<8;j++){												//lopp create columns
			if(numberFromJSON === fromJSON.result.length){numberFromJSON=0;}					//start over if JSON file ended
			$("tr:last").append("<td class="+fromJSON.result[numberFromJSON].color+">"+ fromJSON.result[numberFromJSON].name +"</td>");		//fill columns with "names"
			numberFromJSON++;
		}
	}
  $("td").click(function() {colorFill(this);});							//this lets first created rows be colored
}

$(window).bind('hashchange', function() {								//hash changing function
	if(location.hash === "#table") {									//going to Table tab
		$(".table").addClass("pressed");
		$(".hello").removeClass("pressed");
		if(rowQuantity === 0){											//for the first time
			$(".main").html("<table><tbody></tbody></table>");			//create table
			newrow(Math.floor((screen.height/32)+10));					//fill it
		}
		else{															//not the first time
			$(".main").html(save);										//retrieve datd saved
			$(".main").scrollTop(scrollSave[0]);						//put scroll in remembered position
			$(".main").scrollLeft(scrollSave[1]);
			$("td").click(function() {colorFill(this);});				//color retrieved elements onclick
		}
	}
	else if (location.hash === "#greet") {								//going to Greet tab
		$(".hello").addClass("pressed");
		$(".table").removeClass("pressed");
		
		scrollSave=[$(".main").scrollTop(),$(".main").scrollLeft()];	//save scroll position
		save = $(".main").html();										//save table data
		$(".main").html("<h1>Hello World!</h1>");						//replace table with greeting
	}
});
window.location.hash="";												//clear hash
window.location.hash="greet";											//send to greet tab when entering

$(window).resize(function() {											//help application to look better when window gets small
	$(".main").css({height:((window.innerHeight-78))});
	$(".main").css({width:((window.innerWidth-12))});
	if(window.innerWidth<=600){
		$(".button").css({height:25,
						width:"50%",
						minWidth:150,font:"bold 20px 'Trebuchet MS',Arial, Helvetica"});
		$(".hello").css({marginBottom:5,
						marginTop:5});
		$(".table").css({marginTop:0,
						marginBottom:0});
	}
	else{
		$(".button").css({height:"",
						width:"",
						minWidth:"",
						font:"bold 30px 'Trebuchet MS',Arial, Helvetica"});
		$(".hello").css({marginBottom:"",
						marginTop:""});
		$(".table").css({marginTop:"",
						marginBottom:""});
	}
})

$(".main").scroll(function() {																	//make sure visible+10 rows always loaded
	if(window.location.hash==="#table"){														//only in Table tab
		if(Math.abs(($("tr:first").offset().top - initial)/(32*scrollLines)) >= 1){					
			newrow(Math.abs(($("tr:first").offset().top - initial)/(32*scrollLines)));
			scrollLines++;
		}
	}
});
	
});
