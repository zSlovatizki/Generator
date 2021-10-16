import Cables from '../Mobx/cables'
import cables from '../Mobx/cables';
import { toJS } from 'mobx';

export function CalcLength(coordinateA,coordinateB)
{
 var x=Math.pow(coordinateA.lat-coordinateB.Lat,2)+Math.pow(coordinateA.lng-coordinateB.lng,2);
 return Math.sqrt(x);
}

export function loadToPointInCable(pointStartCable,pointEndCable,pointOnCable,loadForAllCable)
{
    var DistanceFromBeginning = Math.sqrt( Math.pow(pointStartCable.lat-pointOnCable.lat,2)+
                                           Math.pow(pointStartCable.lng-pointOnCable.lng)
                                         );
    var loadLeftToPoint= loadForAllCable*(1-((DistanceFromBeginning/100)*0.05));
    return loadLeftToPoint;
    
}

export function f(pointOnCable) {
    var t=[];
    Cables.cablesStringArr.map(p=>
      {
          p.map((pp,i)=> 
          {
              if(i<p.length-1)
              {
                  var maxX = toJS(pp).lat > toJS(p[i+1]).lat ? toJS(pp).lat : toJS(p[i+1]).lat;
                  var minX=toJS(pp).lat < toJS(p[i+1]).lat ? toJS(pp).lat : toJS(p[i+1]).lat;
                  var maxY = toJS(pp).lng > toJS(p[i+1]).lng ? toJS(pp).lng : toJS(p[i+1]).lng;
                  var minY=toJS(pp).lng < toJS(p[i+1]).lng ? toJS(pp).lng : toJS(p[i+1]).lng;
                //   console.log("maxX",maxX,"maxY",maxY,"minX",minX,"minY",minY)
                //   console.log("point",pointOnCable)
                //   console.log(pointOnCable.lat>minX,"pointOnCable.lat>min")
                //   console.log(pointOnCable.lat<maxX,"pointOnCable.lat<maxX")
                //   console.log("pointOnCable.lng>minY",pointOnCable.lng>minY)
                //   console.log("minY&&pointOnCable.lng<maxY",minY&&pointOnCable.lng<maxY)
                  if(pointOnCable.lat>minX&&pointOnCable.lat<maxX&&pointOnCable.lng>minY&&pointOnCable.lng<maxY)
                  {
                      t.push(toJS(pp));
                      t.push(toJS(p[i+1]))
                  }
               }
          })
      })
      return t;
}

