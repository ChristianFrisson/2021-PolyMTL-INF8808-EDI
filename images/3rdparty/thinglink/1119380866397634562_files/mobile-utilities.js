
function preloadImages(imageSources){var uniqueImageSources=[];imageSources.forEach(function(el){if($tlJQ.inArray(el,uniqueImageSources)===-1){uniqueImageSources.push(el);}});function preloadOneImageIfAvailable(){if(uniqueImageSources.length<1){return;}
var tempImage=new Image();tempImage.onload=preloadOneImageIfAvailable;tempImage.onerror=preloadOneImageIfAvailable;tempImage.src=uniqueImageSources.shift();}
preloadOneImageIfAvailable();}