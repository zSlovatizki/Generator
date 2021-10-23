import Cables from '../Mobx/cables'
import cables from '../Mobx/cables';
import { toJS } from 'mobx';

export function CalcLength(coordinateA,coordinateB)
{
 return Math.sqrt(Math.pow(coordinateA.lat-coordinateB.lat,2)+
                  Math.pow(coordinateA.lng-coordinateB.lng,2));
}

export function loadToPointInCable(DistanceFromBeginning,loadForAllCable)
{
    var loadLeftToPoint= loadForAllCable*(1-((DistanceFromBeginning/100)*0.05));
    return loadLeftToPoint;
}

export function CableOfPoint(pointOnCable) {
    var currentCable=[];
    var index =0;
    var thickness = 0;   
     var typeId = 0;
    Cables.cablesStringArr.map((cableCoordinates)=>
      {
        cableCoordinates.coordinates.map((pointInCable,i)=> 
          {
              if(i<cableCoordinates.coordinates.length-1)
              {
                  var maxLat = toJS(pointInCable).lat > toJS(cableCoordinates.coordinates[i+1]).lat ? toJS(pointInCable).lat : toJS(cableCoordinates.coordinates[i+1]).lat;
                  var minLat=toJS(pointInCable).lat < toJS(cableCoordinates.coordinates[i+1]).lat ? toJS(pointInCable).lat : toJS(cableCoordinates.coordinates[i+1]).lat;
                  var maxLng = toJS(pointInCable).lng > toJS(cableCoordinates.coordinates[i+1]).lng ? toJS(pointInCable).lng : toJS(cableCoordinates.coordinates[i+1]).lng;
                  var minLng=toJS(pointInCable).lng < toJS(cableCoordinates.coordinates[i+1]).lng ? toJS(pointInCable).lng : toJS(cableCoordinates.coordinates[i+1]).lng;
                  if (pointOnCable.lat > minLat && pointOnCable.lat < maxLat && 
                      pointOnCable.lng > minLng && pointOnCable.lng < maxLng)
                  {
                    currentCable = cableCoordinates.coordinates;
                    index =i;
                    thickness = cableCoordinates.thickness;
                    typeId = cableCoordinates.typeId;
                    console.log("hjbubouiniomkl,",toJS(cableCoordinates))

                  }
               }
          })
      })
      console.log(typeId)
      return {currentCable: currentCable , index: index, thickness: thickness, typeId: typeId};
}

export function calcLoadByTypeAndThickness(type,thickness)
{
  console.log(type==1)
    //if(type=="copper")
    if(type==1)
    {
        switch(thickness)
        {
           case 1.5: return 10              
           case 2.5: return 16;
           case 4: return 25;
           case 6: return 32;
           case 10: return 40;
           case 16: return 63;
           case 25: return 80;
           case 30: return 100;
           case 35: return 100;
           case 50: return 125;
           case 70: return 160;
           case 92: return 200;
           case 120: return 225;
           case 150: return 250;
           case 240: return 300;

        } 
    }
    //else if(type=="aluminum")
    else if(type==2)
    {
      switch(thickness){
          case 24 : return 63;
          case 50 : return 100;
          case 70 : return 125;
          case 65 : return 160;
          case 150 : return 200;
          case 240 : return 250;
      }
    }
   
}

