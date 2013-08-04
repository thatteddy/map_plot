$(document).ready(function(){

function Mapplot(){

var map;
this.latlon = Array()
this.title = Array()
this.infocontent = Array();
this.infowindow = Array();
this.marker = Array();
this.pointsArray;
/***************************************************************************************************************/
Mapplot.prototype.fetchPointsCoordinates = function(){
  var mapplot = this;
  return $.ajax({
	  method: "post",
	  dataType:"json",
	  data:"servicename=fetchPointsCoordinates",
	  url:"http://www.herveweb.com/apps/map_plot/map_plot.php",
	  success: function(result){
		  mapplot.pointsArray=result;
		  for (i=0;i<mapplot.pointsArray.length;i++){
			mapplot.latlon[i]=new google.maps.LatLng(mapplot.pointsArray[i].latitude, mapplot.pointsArray[i].longitude);
		  }
	  }
  })
}
/***************************************************************************************************************/
Mapplot.prototype.createMap = function(){
	var myOptions={
	center:this.latlon[0],
	zoom:16,
	mapTypeId:google.maps.MapTypeId.ROADMAP,
	mapTypeControl:false,
	navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  this.map=new google.maps.Map(document.getElementById("map-canvas"),myOptions);
}
/***************************************************************************************************************/
Mapplot.prototype.createMarkers = function(){
	  var mapplot = this;
	  for (i=0;i<this.pointsArray.length;i++){
	  this.title[i]=this.pointsArray[i].title;
	  this.marker[i]=new google.maps.Marker({position:this.latlon[i],map:this.map,title:this.title[i]});
	  this.marker[i].id=i;
	  this.infocontent[i]=this.pointsArray[i].content;
	  this.infowindow[i] = new google.maps.InfoWindow({content: this.infocontent[i]})
	  google.maps.event.addListener(mapplot.marker[i], 'click', function() {mapplot.infowindow[this.id].open(mapplot.map,this);});
  }
}
/***************************************************************************************************************/
Mapplot.prototype.plotPoints = function(){
  var mapplot = this;
  this.fetchPointsCoordinates()
  .done(function(){
	mapplot.createMap();
	mapplot.createMarkers()
});
}
}
/***************************************************************************************************************/

plot = new Mapplot();
plot.plotPoints();

});