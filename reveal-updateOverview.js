/// js/reveal.js

	/**
	 * Optimization method; hide all slides that are far away
	 * from the present slide.
	 */
	function updateSlidesVisibility() {

        // ...

        // Show the horizontal slide if it's within the view distance
        if( distanceX < viewDistance || Reveal.isOverview() ) {
			slideContent.load( horizontalSlide );
		}
		else {
			slideContent.unload( horizontalSlide );
		}

        // ...

        if( distanceX + distanceY < viewDistance || Reveal.isOverview() ) {
			slideContent.load( verticalSlide );
		}
		else {
			slideContent.unload( verticalSlide );
		}

        // ...
    }

/// js/controllers/overview.js 

	/**
	 * Moves the overview viewport to the current slides.
	 * Called each time the current slide changes.
	 */
	update() {

		// const vmin = Math.min( window.innerWidth, window.innerHeight );
		// const scale = Math.max( vmin / 5, 150 ) / vmin;
		// const indices = this.Reveal.getIndices();

		// this.Reveal.transformSlides( {
		// 	overview: [
		// 		'scale('+ scale +')',
		// 		'translateX('+ ( -indices.h * this.overviewSlideWidth ) +'px)',
		// 		'translateY('+ ( -indices.v * this.overviewSlideHeight ) +'px)'
		// 	].join( ' ' )
		// } );

		// var vmin = Math.min( window.innerWidth, window.innerHeight );
		// var scale = Math.max( vmin / 10, 5 ) / vmin;
		// var translateX = -indexh;
		// var translateY = -indexv;

		const indices = this.Reveal.getIndices();
		var translateX = -indices.h;
		var translateY = -indices.v;

		const hIndices = this.Reveal.getSlidesAttributes().map(slide => slide["data-index-h"]);
		var hcount = Math.max.apply(null,hIndices)+1;
		function elementsFreq(a) { return new Map([...new Set(a)].map(
			x => [x, a.filter(y => y === x).length]
		))};
		var slidesPerSection = elementsFreq(hIndices);
		var vcount = Math.max.apply(null,Array.from(slidesPerSection.values()));
		var scale = Math.min( 1/(hcount+1), 1/(vcount+1) ) ;
		var translateX = -(hcount-1)/2;
		var translateY = -(vcount-1)/2;
		// var scale = Math.min( 1/(hcount), 1/(vcount) ) ;
		// var translateX = -(hcount)/2;
		// var translateY = -(vcount)/2;

		this.Reveal.transformSlides( {
			overview: [
				'scale('+ scale +')',
				'translateX('+ ( translateX * this.overviewSlideWidth ) +'px)',
				'translateY('+ ( translateY * this.overviewSlideHeight ) +'px)'
			].join( ' ' )
		} );

	}
    
    /**
	 * Displays the overview of slides (quick nav) by scaling
	 * down and arranging all slide elements.
	 */
	activate() {

        // ...

        this.Reveal.getRevealElement().classList.add( 'overview' );

		this.Reveal.getRevealElement().querySelectorAll( 'h1,h2,h3' ).forEach( function( header ) {
				header.classList.add('overview');
		})

        // ...
    }

    /**
	 * Exits the slide overview and enters the currently
	 * active slide.
	 */
	deactivate() {

        // ...

        this.Reveal.getRevealElement().classList.remove( 'overview' );

		this.Reveal.getRevealElement().querySelectorAll( 'h1,h2,h3' ).forEach( function( header ) {
				header.classList.remove('overview');
		})

        // ...
    }