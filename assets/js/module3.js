// Helper if element exist then call function
function iee(_el, _cb, ..._rest) {
	var elem = document.querySelector(_el);
	var rest = _rest;

	if(document.body.contains(elem)) {
		if (arguments.length <= 2) {
			_cb();
		}
		if (arguments.length == 3) {
			_cb(rest[0]);
		}
		if (arguments.length == 4) {
			_cb(rest[0], rest[1]);
		}
		if (arguments.length == 5) {
			_cb(rest[0], rest[1], rest[2]);
		}
	}
}
/* module diagonalLayouts */
// function on
jQuery(document).ready(function() {
	diagonalLayoutsInit();
});
// function init
function diagonalLayoutsInit() {}

/* module snowCanvas */
// function on
jQuery(document).ready(function() {
	snowCanvasInit();
});

// function init
// important this script uses lodash JavaScript utility library
function snowCanvasInit() {

	const Snow = (canvas, count, options) => {
		const ctx = canvas.getContext('2d');
		const snowflakes = [];
		const add = item => snowflakes.push(item(canvas));
		const update = () => _.forEach(snowflakes, el => el.update());
		const resize = () => {
			ctx.canvas.width = canvas.offsetWidth;
			ctx.canvas.height = canvas.offsetHeight;
			_.forEach(snowflakes, el => el.resized());
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
			_.forEach(snowflakes, el => el.draw());
		};

		const events = () => {
			window.addEventListener('resize', resize);
		};

		const loop = () => {
			draw();
			update();
			animFrame(loop);
		};

		const init = () => {
			_.times(count, () => add(canvas => SnowItem(canvas, null, options)));
			events();
			loop();
		};

		init(count);
		resize();
		return { add, resize };
	};

	const defaultOptions = {
		color: 'orange',
		radius: [0.5, 3.0],
		speed: [1, 3],
		wind: [-0.5, 3.0]
	};

	const SnowItem = (canvas, drawFn = null, opts) => {
		const options = { ...defaultOptions, ...opts };
		const { radius, speed, wind, color } = options;
		const params = {
			color,
			x: _.random(0, canvas.offsetWidth),
			y: _.random(-canvas.offsetHeight, 0),
			radius: _.random(...radius),
			speed: _.random(...speed),
			wind: _.random(...wind),
			isResized: false
		};

		const ctx = canvas.getContext('2d');
		const updateData = () => {
			params.x = _.random(0, canvas.offsetWidth);
			params.y = _.random(-canvas.offsetHeight, 0);
		};
		const resized = () => params.isResized = true;
		const drawDefault = () => {
			ctx.beginPath();
			ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
			ctx.fillStyle = params.color;
			ctx.fill();
			ctx.closePath();
		};
		const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;
		const translate = () => {
			params.y += params.speed;
			params.x += params.wind;
		};
		const onDown = () => {
			if (params.y < canvas.offsetHeight) return;
			if (params.isResized) {
				updateData();
				params.isResized = false;
			} else {
				params.y = 0;
				params.x = _.random(0, canvas.offsetWidth);
			}
		};
		const update = () => {
			translate();
			onDown();
		};
		return {
			update,
			resized,
			draw
		};
	};

	const canvas = document.getElementById('snow');
	const animFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	Snow(canvas, 150, { color: 'gray' });
	// Snow script end
}
/* module selectChoices */
// function on
jQuery(document).ready(function() {
	selectChoicesInit();
});

// function init
// More info see https://github.com/jshjohnson/Choices/blob/master/public/assets/scripts/choices.min.js
function selectChoicesInit() {
	const element1 = document.querySelectorAll('.js-choice-all-v1 select');
	const element2 = document.querySelectorAll('.js-choice-all-v2 select');
	// Passing options (with default options)
	element1.forEach(function(el) {
		const choices = new Choices(el, {
			silent: false,
			items: [],
			choices: [],
			renderChoiceLimit: -1,
			maxItemCount: -1,
			addItems: true,
			addItemFilter: null,
			removeItems: true,
			removeItemButton: false,
			editItems: false,
			duplicateItemsAllowed: true,
			delimiter: ',',
			paste: true,
			searchEnabled: true,
			searchChoices: true,
			searchFloor: 1,
			searchResultLimit: 4,
			searchFields: ['label', 'value'],
			position: 'auto',
			resetScrollPosition: true,
			shouldSort: true,
			shouldSortItems: false,
			sorter: () => {},
			placeholder: true,
			placeholderValue: null,
			searchPlaceholderValue: null,
			prependValue: null,
			appendValue: null,
			renderSelectedChoices: 'auto',
			loadingText: 'Loading...',
			noResultsText: 'No results found',
			noChoicesText: 'No choices to choose from',
			itemSelectText: 'Press to select',
			addItemText: (value) => {
				return `Press Enter to add <b>"${value}"</b>`;
			},
			maxItemText: (maxItemCount) => {
				return `Only ${maxItemCount} values can be added`;
			},
			valueComparer: (value1, value2) => {
				return value1 === value2;
			},
			classNames: {
				containerOuter: 'choices',
				containerInner: 'choices__inner',
				input: 'choices__input',
				inputCloned: 'choices__input--cloned',
				list: 'choices__list',
				listItems: 'choices__list--multiple',
				listSingle: 'choices__list--single',
				listDropdown: 'choices__list--dropdown',
				item: 'choices__item',
				itemSelectable: 'choices__item--selectable',
				itemDisabled: 'choices__item--disabled',
				itemChoice: 'choices__item--choice',
				placeholder: 'choices__placeholder',
				group: 'choices__group',
				groupHeading: 'choices__heading',
				button: 'choices__button',
				activeState: 'is-active',
				focusState: 'is-focused',
				openState: 'is-open',
				disabledState: 'is-disabled',
				highlightedState: 'is-highlighted',
				selectedState: 'is-selected',
				flippedState: 'is-flipped',
				loadingState: 'is-loading',
				noResults: 'has-no-results',
				noChoices: 'has-no-choices'
			},
			// Choices uses the great Fuse library for searching. You
			// can find more options here: https://github.com/krisk/Fuse#options
			fuseOptions: {
				include: 'score'
			},
			callbackOnInit: null,
			callbackOnCreateTemplates: null
		})
	})
	element2.forEach(function(el) {
		const choices = new Choices(el, {
			searchEnabled: false,
			itemSelectText: '',
		})
	})
}

/*! choices.js v9.0.1 | © 2019 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
window.Choices=function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/public/assets/scripts/",i(i.s=4)}([function(e,t,i){"use strict";var n=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===s}(e)}(e)};var s="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function r(e,t){return!1!==t.clone&&t.isMergeableObject(e)?l((i=e,Array.isArray(i)?[]:{}),e,t):e;var i}function o(e,t,i){return e.concat(t).map((function(e){return r(e,i)}))}function a(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(t){return e.propertyIsEnumerable(t)})):[]}(e))}function c(e,t,i){var n={};return i.isMergeableObject(e)&&a(e).forEach((function(t){n[t]=r(e[t],i)})),a(t).forEach((function(s){(function(e,t){try{return t in e&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}catch(e){return!1}})(e,s)||(i.isMergeableObject(t[s])&&e[s]?n[s]=function(e,t){if(!t.customMerge)return l;var i=t.customMerge(e);return"function"==typeof i?i:l}(s,i)(e[s],t[s],i):n[s]=r(t[s],i))})),n}function l(e,t,i){(i=i||{}).arrayMerge=i.arrayMerge||o,i.isMergeableObject=i.isMergeableObject||n,i.cloneUnlessOtherwiseSpecified=r;var s=Array.isArray(t);return s===Array.isArray(e)?s?i.arrayMerge(e,t,i):c(e,t,i):r(t,i)}l.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,i){return l(e,i,t)}),{})};var h=l;e.exports=h},function(e,t,i){"use strict";(function(e,n){var s,r=i(3);s="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var o=Object(r.a)(s);t.a=o}).call(this,i(5),i(6)(e))},function(e,t,i){
/*!
 * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
e.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,i){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=i(2),o=i(8),a=i(0),c=function(){function e(t,i){var n=i.location,s=void 0===n?0:n,r=i.distance,a=void 0===r?100:r,c=i.threshold,l=void 0===c?.6:c,h=i.maxPatternLength,u=void 0===h?32:h,d=i.caseSensitive,p=void 0!==d&&d,m=i.tokenSeparator,f=void 0===m?/ +/g:m,v=i.findAllMatches,g=void 0!==v&&v,_=i.minMatchCharLength,b=void 0===_?1:_,y=i.id,E=void 0===y?null:y,I=i.keys,S=void 0===I?[]:I,w=i.shouldSort,O=void 0===w||w,C=i.getFn,A=void 0===C?o:C,L=i.sortFn,T=void 0===L?function(e,t){return e.score-t.score}:L,x=i.tokenize,k=void 0!==x&&x,P=i.matchAllTokens,D=void 0!==P&&P,M=i.includeMatches,N=void 0!==M&&M,F=i.includeScore,j=void 0!==F&&F,K=i.verbose,R=void 0!==K&&K;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:s,distance:a,threshold:l,maxPatternLength:u,isCaseSensitive:p,tokenSeparator:f,findAllMatches:g,minMatchCharLength:b,id:E,keys:S,includeMatches:N,includeScore:j,shouldSort:O,getFn:A,sortFn:T,verbose:R,tokenize:k,matchAllTokens:D},this.setCollection(t)}var t,i;return t=e,(i=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var i=this._prepareSearchers(e),n=i.tokenSearchers,s=i.fullSearcher,r=this._search(n,s),o=r.weights,a=r.results;return this._computeScore(o,a),this.options.shouldSort&&this._sort(a),t.limit&&"number"==typeof t.limit&&(a=a.slice(0,t.limit)),this._format(a)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var i=e.split(this.options.tokenSeparator),n=0,s=i.length;n<s;n+=1)t.push(new r(i[n],this.options));return{tokenSearchers:t,fullSearcher:new r(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,i=this.list,n={},s=[];if("string"==typeof i[0]){for(var r=0,o=i.length;r<o;r+=1)this._analyze({key:"",value:i[r],record:r,index:r},{resultMap:n,results:s,tokenSearchers:e,fullSearcher:t});return{weights:null,results:s}}for(var a={},c=0,l=i.length;c<l;c+=1)for(var h=i[c],u=0,d=this.options.keys.length;u<d;u+=1){var p=this.options.keys[u];if("string"!=typeof p){if(a[p.name]={weight:1-p.weight||1},p.weight<=0||p.weight>1)throw new Error("Key weight has to be > 0 and <= 1");p=p.name}else a[p]={weight:1};this._analyze({key:p,value:this.options.getFn(h,p),record:h,index:c},{resultMap:n,results:s,tokenSearchers:e,fullSearcher:t})}return{weights:a,results:s}}},{key:"_analyze",value:function(e,t){var i=e.key,n=e.arrayIndex,s=void 0===n?-1:n,r=e.value,o=e.record,c=e.index,l=t.tokenSearchers,h=void 0===l?[]:l,u=t.fullSearcher,d=void 0===u?[]:u,p=t.resultMap,m=void 0===p?{}:p,f=t.results,v=void 0===f?[]:f;if(null!=r){var g=!1,_=-1,b=0;if("string"==typeof r){this._log("\nKey: ".concat(""===i?"-":i));var y=d.search(r);if(this._log('Full text: "'.concat(r,'", score: ').concat(y.score)),this.options.tokenize){for(var E=r.split(this.options.tokenSeparator),I=[],S=0;S<h.length;S+=1){var w=h[S];this._log('\nPattern: "'.concat(w.pattern,'"'));for(var O=!1,C=0;C<E.length;C+=1){var A=E[C],L=w.search(A),T={};L.isMatch?(T[A]=L.score,g=!0,O=!0,I.push(L.score)):(T[A]=1,this.options.matchAllTokens||I.push(1)),this._log('Token: "'.concat(A,'", score: ').concat(T[A]))}O&&(b+=1)}_=I[0];for(var x=I.length,k=1;k<x;k+=1)_+=I[k];_/=x,this._log("Token score average:",_)}var P=y.score;_>-1&&(P=(P+_)/2),this._log("Score average:",P);var D=!this.options.tokenize||!this.options.matchAllTokens||b>=h.length;if(this._log("\nCheck Matches: ".concat(D)),(g||y.isMatch)&&D){var M=m[c];M?M.output.push({key:i,arrayIndex:s,value:r,score:P,matchedIndices:y.matchedIndices}):(m[c]={item:o,output:[{key:i,arrayIndex:s,value:r,score:P,matchedIndices:y.matchedIndices}]},v.push(m[c]))}}else if(a(r))for(var N=0,F=r.length;N<F;N+=1)this._analyze({key:i,arrayIndex:N,value:r[N],record:o,index:c},{resultMap:m,results:v,tokenSearchers:h,fullSearcher:d})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var i=0,n=t.length;i<n;i+=1){for(var s=t[i].output,r=s.length,o=1,a=1,c=0;c<r;c+=1){var l=e?e[s[c].key].weight:1,h=(1===l?s[c].score:s[c].score||.001)*l;1!==l?a=Math.min(a,h):(s[c].nScore=h,o*=h)}t[i].score=1===a?o:a,this._log(t[i])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var i=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,(function(e,t){if("object"===n(t)&&null!==t){if(-1!==i.indexOf(t))return;i.push(t)}return t}))),i=null}var s=[];this.options.includeMatches&&s.push((function(e,t){var i=e.output;t.matches=[];for(var n=0,s=i.length;n<s;n+=1){var r=i[n];if(0!==r.matchedIndices.length){var o={indices:r.matchedIndices,value:r.value};r.key&&(o.key=r.key),r.hasOwnProperty("arrayIndex")&&r.arrayIndex>-1&&(o.arrayIndex=r.arrayIndex),t.matches.push(o)}}})),this.options.includeScore&&s.push((function(e,t){t.score=e.score}));for(var r=0,o=e.length;r<o;r+=1){var a=e[r];if(this.options.id&&(a.item=this.options.getFn(a.item,this.options.id)[0]),s.length){for(var c={item:a.item},l=0,h=s.length;l<h;l+=1)s[l](a,c);t.push(c)}else t.push(a.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&s(t.prototype,i),e}();e.exports=c},function(e,t,i){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=i(3),r=i(4),o=i(7),a=function(){function e(t,i){var n=i.location,s=void 0===n?0:n,r=i.distance,a=void 0===r?100:r,c=i.threshold,l=void 0===c?.6:c,h=i.maxPatternLength,u=void 0===h?32:h,d=i.isCaseSensitive,p=void 0!==d&&d,m=i.tokenSeparator,f=void 0===m?/ +/g:m,v=i.findAllMatches,g=void 0!==v&&v,_=i.minMatchCharLength,b=void 0===_?1:_;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:s,distance:a,threshold:l,maxPatternLength:u,isCaseSensitive:p,tokenSeparator:f,findAllMatches:g,minMatchCharLength:b},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=o(this.pattern))}var t,i;return t=e,(i=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,i=t.maxPatternLength,n=t.tokenSeparator;if(this.pattern.length>i)return s(e,this.pattern,n);var o=this.options,a=o.location,c=o.distance,l=o.threshold,h=o.findAllMatches,u=o.minMatchCharLength;return r(e,this.pattern,this.patternAlphabet,{location:a,distance:c,threshold:l,findAllMatches:h,minMatchCharLength:u})}}])&&n(t.prototype,i),e}();e.exports=a},function(e,t){var i=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,s=new RegExp(t.replace(i,"\\$&").replace(n,"|")),r=e.match(s),o=!!r,a=[];if(o)for(var c=0,l=r.length;c<l;c+=1){var h=r[c];a.push([e.indexOf(h),h.length-1])}return{score:o?.5:1,isMatch:o,matchedIndices:a}}},function(e,t,i){var n=i(5),s=i(6);e.exports=function(e,t,i,r){for(var o=r.location,a=void 0===o?0:o,c=r.distance,l=void 0===c?100:c,h=r.threshold,u=void 0===h?.6:h,d=r.findAllMatches,p=void 0!==d&&d,m=r.minMatchCharLength,f=void 0===m?1:m,v=a,g=e.length,_=u,b=e.indexOf(t,v),y=t.length,E=[],I=0;I<g;I+=1)E[I]=0;if(-1!==b){var S=n(t,{errors:0,currentLocation:b,expectedLocation:v,distance:l});if(_=Math.min(S,_),-1!==(b=e.lastIndexOf(t,v+y))){var w=n(t,{errors:0,currentLocation:b,expectedLocation:v,distance:l});_=Math.min(w,_)}}b=-1;for(var O=[],C=1,A=y+g,L=1<<y-1,T=0;T<y;T+=1){for(var x=0,k=A;x<k;)n(t,{errors:T,currentLocation:v+k,expectedLocation:v,distance:l})<=_?x=k:A=k,k=Math.floor((A-x)/2+x);A=k;var P=Math.max(1,v-k+1),D=p?g:Math.min(v+k,g)+y,M=Array(D+2);M[D+1]=(1<<T)-1;for(var N=D;N>=P;N-=1){var F=N-1,j=i[e.charAt(F)];if(j&&(E[F]=1),M[N]=(M[N+1]<<1|1)&j,0!==T&&(M[N]|=(O[N+1]|O[N])<<1|1|O[N+1]),M[N]&L&&(C=n(t,{errors:T,currentLocation:F,expectedLocation:v,distance:l}))<=_){if(_=C,(b=F)<=v)break;P=Math.max(1,2*v-b)}}if(n(t,{errors:T+1,currentLocation:v,expectedLocation:v,distance:l})>_)break;O=M}return{isMatch:b>=0,score:0===C?.001:C,matchedIndices:s(E,f)}}},function(e,t){e.exports=function(e,t){var i=t.errors,n=void 0===i?0:i,s=t.currentLocation,r=void 0===s?0:s,o=t.expectedLocation,a=void 0===o?0:o,c=t.distance,l=void 0===c?100:c,h=n/e.length,u=Math.abs(a-r);return l?h+u/l:u?1:h}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=[],n=-1,s=-1,r=0,o=e.length;r<o;r+=1){var a=e[r];a&&-1===n?n=r:a||-1===n||((s=r-1)-n+1>=t&&i.push([n,s]),n=-1)}return e[r-1]&&r-n>=t&&i.push([n,r-1]),i}},function(e,t){e.exports=function(e){for(var t={},i=e.length,n=0;n<i;n+=1)t[e.charAt(n)]=0;for(var s=0;s<i;s+=1)t[e.charAt(s)]|=1<<i-s-1;return t}},function(e,t,i){var n=i(0);e.exports=function(e,t){return function e(t,i,s){if(i){var r=i.indexOf("."),o=i,a=null;-1!==r&&(o=i.slice(0,r),a=i.slice(r+1));var c=t[o];if(null!=c)if(a||"string"!=typeof c&&"number"!=typeof c)if(n(c))for(var l=0,h=c.length;l<h;l+=1)e(c[l],a,s);else a&&e(c,a,s);else s.push(c.toString())}else s.push(t);return s}(e,t,[])}}])},function(e,t,i){"use strict";function n(e){var t,i=e.Symbol;return"function"==typeof i?i.observable?t=i.observable:(t=i("observable"),i.observable=t):t="@@observable",t}i.d(t,"a",(function(){return n}))},function(e,t,i){e.exports=i(7)},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,i){"use strict";i.r(t);var n=i(2),s=i.n(n),r=i(0),o=i.n(r),a=i(1),c=function(){return Math.random().toString(36).substring(7).split("").join(".")},l={INIT:"@@redux/INIT"+c(),REPLACE:"@@redux/REPLACE"+c(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+c()}};function h(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function u(e,t,i){var n;if("function"==typeof t&&"function"==typeof i||"function"==typeof i&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===i&&(i=t,t=void 0),void 0!==i){if("function"!=typeof i)throw new Error("Expected the enhancer to be a function.");return i(u)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var s=e,r=t,o=[],c=o,d=!1;function p(){c===o&&(c=o.slice())}function m(){if(d)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return r}function f(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(d)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var t=!0;return p(),c.push(e),function(){if(t){if(d)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");t=!1,p();var i=c.indexOf(e);c.splice(i,1)}}}function v(e){if(!h(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,r=s(r,e)}finally{d=!1}for(var t=o=c,i=0;i<t.length;i++){(0,t[i])()}return e}return v({type:l.INIT}),(n={dispatch:v,subscribe:f,getState:m,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");s=e,v({type:l.REPLACE})}})[a.a]=function(){var e,t=f;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function i(){e.next&&e.next(m())}return i(),{unsubscribe:t(i)}}})[a.a]=function(){return this},e},n}function d(e,t){var i=t&&t.type;return"Given "+(i&&'action "'+String(i)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}var p=[];var m=[];var f=[];var v,g={loading:!1},_=function(e,t){switch(void 0===e&&(e=g),t.type){case"SET_IS_LOADING":return{loading:t.isLoading};default:return e}},b=function(e){return Array.from({length:e},(function(){return(e=0,t=36,Math.floor(Math.random()*(t-e)+e)).toString(36);var e,t})).join("")},y=function(e,t){var i=e.id||e.name&&e.name+"-"+b(2)||b(4);return i=t+"-"+(i=i.replace(/(:|\.|\[|\]|,)/g,""))},E=function(e){return Object.prototype.toString.call(e).slice(8,-1)},I=function(e,t){return null!=t&&E(t)===e},S=function(e){return"string"!=typeof e?e:e.replace(/&/g,"&amp;").replace(/>/g,"&rt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")},w=(v=document.createElement("div"),function(e){var t=e.trim();v.innerHTML=t;for(var i=v.children[0];v.firstChild;)v.removeChild(v.firstChild);return i}),O=function(e,t){return e.score-t.score},C=function(e){return JSON.parse(JSON.stringify(e))},A=function(e,t){var i=Object.keys(e).sort(),n=Object.keys(t).sort();return i.filter((function(e){return n.indexOf(e)<0}))},L=function(e){for(var t=Object.keys(e),i={},n=0;n<t.length;n++){var s=t[n];0,"function"==typeof e[s]&&(i[s]=e[s])}var r,o=Object.keys(i);try{!function(e){Object.keys(e).forEach((function(t){var i=e[t];if(void 0===i(void 0,{type:l.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===i(void 0,{type:l.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+l.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(i)}catch(e){r=e}return function(e,t){if(void 0===e&&(e={}),r)throw r;for(var n=!1,s={},a=0;a<o.length;a++){var c=o[a],l=i[c],h=e[c],u=l(h,t);if(void 0===u){var p=d(c,t);throw new Error(p)}s[c]=u,n=n||u!==h}return n?s:e}}({items:function(e,t){switch(void 0===e&&(e=p),t.type){case"ADD_ITEM":return[].concat(e,[{id:t.id,choiceId:t.choiceId,groupId:t.groupId,value:t.value,label:t.label,active:!0,highlighted:!1,customProperties:t.customProperties,placeholder:t.placeholder||!1,keyCode:null}]).map((function(e){var t=e;return t.highlighted=!1,t}));case"REMOVE_ITEM":return e.map((function(e){var i=e;return i.id===t.id&&(i.active=!1),i}));case"HIGHLIGHT_ITEM":return e.map((function(e){var i=e;return i.id===t.id&&(i.highlighted=t.highlighted),i}));default:return e}},groups:function(e,t){switch(void 0===e&&(e=m),t.type){case"ADD_GROUP":return[].concat(e,[{id:t.id,value:t.value,active:t.active,disabled:t.disabled}]);case"CLEAR_CHOICES":return[];default:return e}},choices:function(e,t){switch(void 0===e&&(e=f),t.type){case"ADD_CHOICE":return[].concat(e,[{id:t.id,elementId:t.elementId,groupId:t.groupId,value:t.value,label:t.label||t.value,disabled:t.disabled||!1,selected:!1,active:!0,score:9999,customProperties:t.customProperties,placeholder:t.placeholder||!1,keyCode:null}]);case"ADD_ITEM":return t.activateOptions?e.map((function(e){var i=e;return i.active=t.active,i})):t.choiceId>-1?e.map((function(e){var i=e;return i.id===parseInt(t.choiceId,10)&&(i.selected=!0),i})):e;case"REMOVE_ITEM":return t.choiceId>-1?e.map((function(e){var i=e;return i.id===parseInt(t.choiceId,10)&&(i.selected=!1),i})):e;case"FILTER_CHOICES":return e.map((function(e){var i=e;return i.active=t.results.some((function(e){var t=e.item,n=e.score;return t.id===i.id&&(i.score=n,!0)})),i}));case"ACTIVATE_CHOICES":return e.map((function(e){var i=e;return i.active=t.active,i}));case"CLEAR_CHOICES":return f;default:return e}},general:_}),T=function(e,t){var i=e;if("CLEAR_ALL"===t.type)i=void 0;else if("RESET_TO"===t.type)return C(t.state);return L(i,t)};function x(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var k=function(){function e(){this._store=u(T,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())}var t,i,n,s=e.prototype;return s.subscribe=function(e){this._store.subscribe(e)},s.dispatch=function(e){this._store.dispatch(e)},s.isLoading=function(){return this.state.general.loading},s.getChoiceById=function(e){return this.activeChoices.find((function(t){return t.id===parseInt(e,10)}))},s.getGroupById=function(e){return this.groups.find((function(t){return t.id===e}))},t=e,(i=[{key:"state",get:function(){return this._store.getState()}},{key:"items",get:function(){return this.state.items}},{key:"activeItems",get:function(){return this.items.filter((function(e){return!0===e.active}))}},{key:"highlightedActiveItems",get:function(){return this.items.filter((function(e){return e.active&&e.highlighted}))}},{key:"choices",get:function(){return this.state.choices}},{key:"activeChoices",get:function(){return this.choices.filter((function(e){return!0===e.active}))}},{key:"selectableChoices",get:function(){return this.choices.filter((function(e){return!0!==e.disabled}))}},{key:"searchableChoices",get:function(){return this.selectableChoices.filter((function(e){return!0!==e.placeholder}))}},{key:"placeholderChoice",get:function(){return[].concat(this.choices).reverse().find((function(e){return!0===e.placeholder}))}},{key:"groups",get:function(){return this.state.groups}},{key:"activeGroups",get:function(){var e=this.groups,t=this.choices;return e.filter((function(e){var i=!0===e.active&&!1===e.disabled,n=t.some((function(e){return!0===e.active&&!1===e.disabled}));return i&&n}),[])}}])&&x(t.prototype,i),n&&x(t,n),e}();function P(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var D=function(){function e(e){var t=e.element,i=e.type,n=e.classNames;this.element=t,this.classNames=n,this.type=i,this.isActive=!1}var t,i,n,s=e.prototype;return s.getChild=function(e){return this.element.querySelector(e)},s.show=function(){return this.element.classList.add(this.classNames.activeState),this.element.setAttribute("aria-expanded","true"),this.isActive=!0,this},s.hide=function(){return this.element.classList.remove(this.classNames.activeState),this.element.setAttribute("aria-expanded","false"),this.isActive=!1,this},t=e,(i=[{key:"distanceFromTopWindow",get:function(){return this.element.getBoundingClientRect().bottom}}])&&P(t.prototype,i),n&&P(t,n),e}(),M={items:[],choices:[],silent:!1,renderChoiceLimit:-1,maxItemCount:-1,addItems:!0,addItemFilter:null,removeItems:!0,removeItemButton:!1,editItems:!1,duplicateItemsAllowed:!0,delimiter:",",paste:!0,searchEnabled:!0,searchChoices:!0,searchFloor:1,searchResultLimit:4,searchFields:["label","value"],position:"auto",resetScrollPosition:!0,shouldSort:!0,shouldSortItems:!1,sorter:function(e,t){var i=e.value,n=e.label,s=void 0===n?i:n,r=t.value,o=t.label,a=void 0===o?r:o;return s.localeCompare(a,[],{sensitivity:"base",ignorePunctuation:!0,numeric:!0})},placeholder:!0,placeholderValue:null,searchPlaceholderValue:null,prependValue:null,appendValue:null,renderSelectedChoices:"auto",loadingText:"Loading...",noResultsText:"No results found",noChoicesText:"No choices to choose from",itemSelectText:"Press to select",uniqueItemText:"Only unique values can be added",customAddItemText:"Only values matching specific conditions can be added",addItemText:function(e){return'Press Enter to add <b>"'+S(e)+'"</b>'},maxItemText:function(e){return"Only "+e+" values can be added"},valueComparer:function(e,t){return e===t},fuseOptions:{includeScore:!0},callbackOnInit:null,callbackOnCreateTemplates:null,classNames:{containerOuter:"choices",containerInner:"choices__inner",input:"choices__input",inputCloned:"choices__input--cloned",list:"choices__list",listItems:"choices__list--multiple",listSingle:"choices__list--single",listDropdown:"choices__list--dropdown",item:"choices__item",itemSelectable:"choices__item--selectable",itemDisabled:"choices__item--disabled",itemChoice:"choices__item--choice",placeholder:"choices__placeholder",group:"choices__group",groupHeading:"choices__heading",button:"choices__button",activeState:"is-active",focusState:"is-focused",openState:"is-open",disabledState:"is-disabled",highlightedState:"is-highlighted",selectedState:"is-selected",flippedState:"is-flipped",loadingState:"is-loading",noResults:"has-no-results",noChoices:"has-no-choices"}},N="showDropdown",F="hideDropdown",j="change",K="choice",R="search",H="addItem",B="removeItem",V="highlightItem",G="highlightChoice",q="ADD_CHOICE",U="FILTER_CHOICES",z="ACTIVATE_CHOICES",W="CLEAR_CHOICES",X="ADD_GROUP",$="ADD_ITEM",J="REMOVE_ITEM",Y="HIGHLIGHT_ITEM",Z=46,Q=8,ee=13,te=65,ie=27,ne=38,se=40,re=33,oe=34,ae="text",ce="select-one",le="select-multiple",he=function(){function e(e){var t=e.element,i=e.type,n=e.classNames,s=e.position;this.element=t,this.classNames=n,this.type=i,this.position=s,this.isOpen=!1,this.isFlipped=!1,this.isFocussed=!1,this.isDisabled=!1,this.isLoading=!1,this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this)}var t=e.prototype;return t.addEventListeners=function(){this.element.addEventListener("focus",this._onFocus),this.element.addEventListener("blur",this._onBlur)},t.removeEventListeners=function(){this.element.removeEventListener("focus",this._onFocus),this.element.removeEventListener("blur",this._onBlur)},t.shouldFlip=function(e){if("number"!=typeof e)return!1;var t=!1;return"auto"===this.position?t=!window.matchMedia("(min-height: "+(e+1)+"px)").matches:"top"===this.position&&(t=!0),t},t.setActiveDescendant=function(e){this.element.setAttribute("aria-activedescendant",e)},t.removeActiveDescendant=function(){this.element.removeAttribute("aria-activedescendant")},t.open=function(e){this.element.classList.add(this.classNames.openState),this.element.setAttribute("aria-expanded","true"),this.isOpen=!0,this.shouldFlip(e)&&(this.element.classList.add(this.classNames.flippedState),this.isFlipped=!0)},t.close=function(){this.element.classList.remove(this.classNames.openState),this.element.setAttribute("aria-expanded","false"),this.removeActiveDescendant(),this.isOpen=!1,this.isFlipped&&(this.element.classList.remove(this.classNames.flippedState),this.isFlipped=!1)},t.focus=function(){this.isFocussed||this.element.focus()},t.addFocusState=function(){this.element.classList.add(this.classNames.focusState)},t.removeFocusState=function(){this.element.classList.remove(this.classNames.focusState)},t.enable=function(){this.element.classList.remove(this.classNames.disabledState),this.element.removeAttribute("aria-disabled"),this.type===ce&&this.element.setAttribute("tabindex","0"),this.isDisabled=!1},t.disable=function(){this.element.classList.add(this.classNames.disabledState),this.element.setAttribute("aria-disabled","true"),this.type===ce&&this.element.setAttribute("tabindex","-1"),this.isDisabled=!0},t.wrap=function(e){!function(e,t){void 0===t&&(t=document.createElement("div")),e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t),t.appendChild(e)}(e,this.element)},t.unwrap=function(e){this.element.parentNode.insertBefore(e,this.element),this.element.parentNode.removeChild(this.element)},t.addLoadingState=function(){this.element.classList.add(this.classNames.loadingState),this.element.setAttribute("aria-busy","true"),this.isLoading=!0},t.removeLoadingState=function(){this.element.classList.remove(this.classNames.loadingState),this.element.removeAttribute("aria-busy"),this.isLoading=!1},t._onFocus=function(){this.isFocussed=!0},t._onBlur=function(){this.isFocussed=!1},e}();function ue(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var de=function(){function e(e){var t=e.element,i=e.type,n=e.classNames,s=e.preventPaste;this.element=t,this.type=i,this.classNames=n,this.preventPaste=s,this.isFocussed=this.element===document.activeElement,this.isDisabled=t.disabled,this._onPaste=this._onPaste.bind(this),this._onInput=this._onInput.bind(this),this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this)}var t,i,n,s=e.prototype;return s.addEventListeners=function(){this.element.addEventListener("paste",this._onPaste),this.element.addEventListener("input",this._onInput,{passive:!0}),this.element.addEventListener("focus",this._onFocus,{passive:!0}),this.element.addEventListener("blur",this._onBlur,{passive:!0})},s.removeEventListeners=function(){this.element.removeEventListener("input",this._onInput,{passive:!0}),this.element.removeEventListener("paste",this._onPaste),this.element.removeEventListener("focus",this._onFocus,{passive:!0}),this.element.removeEventListener("blur",this._onBlur,{passive:!0})},s.enable=function(){this.element.removeAttribute("disabled"),this.isDisabled=!1},s.disable=function(){this.element.setAttribute("disabled",""),this.isDisabled=!0},s.focus=function(){this.isFocussed||this.element.focus()},s.blur=function(){this.isFocussed&&this.element.blur()},s.clear=function(e){return void 0===e&&(e=!0),this.element.value&&(this.element.value=""),e&&this.setWidth(),this},s.setWidth=function(){var e=this.element,t=e.style,i=e.value,n=e.placeholder;t.minWidth=n.length+1+"ch",t.width=i.length+1+"ch"},s.setActiveDescendant=function(e){this.element.setAttribute("aria-activedescendant",e)},s.removeActiveDescendant=function(){this.element.removeAttribute("aria-activedescendant")},s._onInput=function(){this.type!==ce&&this.setWidth()},s._onPaste=function(e){this.preventPaste&&e.preventDefault()},s._onFocus=function(){this.isFocussed=!0},s._onBlur=function(){this.isFocussed=!1},t=e,(i=[{key:"placeholder",set:function(e){this.element.placeholder=e}},{key:"value",get:function(){return S(this.element.value)},set:function(e){this.element.value=e}}])&&ue(t.prototype,i),n&&ue(t,n),e}(),pe=function(){function e(e){var t=e.element;this.element=t,this.scrollPos=this.element.scrollTop,this.height=this.element.offsetHeight}var t=e.prototype;return t.clear=function(){this.element.innerHTML=""},t.append=function(e){this.element.appendChild(e)},t.getChild=function(e){return this.element.querySelector(e)},t.hasChildren=function(){return this.element.hasChildNodes()},t.scrollToTop=function(){this.element.scrollTop=0},t.scrollToChildElement=function(e,t){var i=this;if(e){var n=this.element.offsetHeight,s=this.element.scrollTop+n,r=e.offsetHeight,o=e.offsetTop+r,a=t>0?this.element.scrollTop+o-s:e.offsetTop;requestAnimationFrame((function(){i._animateScroll(a,t)}))}},t._scrollDown=function(e,t,i){var n=(i-e)/t,s=n>1?n:1;this.element.scrollTop=e+s},t._scrollUp=function(e,t,i){var n=(e-i)/t,s=n>1?n:1;this.element.scrollTop=e-s},t._animateScroll=function(e,t){var i=this,n=this.element.scrollTop,s=!1;t>0?(this._scrollDown(n,4,e),n<e&&(s=!0)):(this._scrollUp(n,4,e),n>e&&(s=!0)),s&&requestAnimationFrame((function(){i._animateScroll(e,t)}))},e}();function me(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var fe=function(){function e(e){var t=e.element,i=e.classNames;if(this.element=t,this.classNames=i,!(t instanceof HTMLInputElement||t instanceof HTMLSelectElement))throw new TypeError("Invalid element passed");this.isDisabled=!1}var t,i,n,s=e.prototype;return s.conceal=function(){this.element.classList.add(this.classNames.input),this.element.hidden=!0,this.element.tabIndex=-1;var e=this.element.getAttribute("style");e&&this.element.setAttribute("data-choice-orig-style",e),this.element.setAttribute("data-choice","active")},s.reveal=function(){this.element.classList.remove(this.classNames.input),this.element.hidden=!1,this.element.removeAttribute("tabindex");var e=this.element.getAttribute("data-choice-orig-style");e?(this.element.removeAttribute("data-choice-orig-style"),this.element.setAttribute("style",e)):this.element.removeAttribute("style"),this.element.removeAttribute("data-choice"),this.element.value=this.element.value},s.enable=function(){this.element.removeAttribute("disabled"),this.element.disabled=!1,this.isDisabled=!1},s.disable=function(){this.element.setAttribute("disabled",""),this.element.disabled=!0,this.isDisabled=!0},s.triggerEvent=function(e,t){!function(e,t,i){void 0===i&&(i=null);var n=new CustomEvent(t,{detail:i,bubbles:!0,cancelable:!0});e.dispatchEvent(n)}(this.element,e,t)},t=e,(i=[{key:"isActive",get:function(){return"active"===this.element.dataset.choice}},{key:"dir",get:function(){return this.element.dir}},{key:"value",get:function(){return this.element.value},set:function(e){this.element.value=e}}])&&me(t.prototype,i),n&&me(t,n),e}();function ve(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var ge=function(e){var t,i,n,s,r;function o(t){var i,n=t.element,s=t.classNames,r=t.delimiter;return(i=e.call(this,{element:n,classNames:s})||this).delimiter=r,i}return i=e,(t=o).prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i,n=o,(s=[{key:"value",get:function(){return this.element.value},set:function(e){var t=e.map((function(e){return e.value})).join(this.delimiter);this.element.setAttribute("value",t),this.element.value=t}}])&&ve(n.prototype,s),r&&ve(n,r),o}(fe);function _e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var be=function(e){var t,i,n,s,r;function o(t){var i,n=t.element,s=t.classNames,r=t.template;return(i=e.call(this,{element:n,classNames:s})||this).template=r,i}return i=e,(t=o).prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i,o.prototype.appendDocFragment=function(e){this.element.innerHTML="",this.element.appendChild(e)},n=o,(s=[{key:"placeholderOption",get:function(){return this.element.querySelector('option[value=""]')||this.element.querySelector("option[placeholder]")}},{key:"optionGroups",get:function(){return Array.from(this.element.getElementsByTagName("OPTGROUP"))}},{key:"options",get:function(){return Array.from(this.element.options)},set:function(e){var t=this,i=document.createDocumentFragment();e.forEach((function(e){return n=e,s=t.template(n),void i.appendChild(s);var n,s})),this.appendDocFragment(i)}}])&&_e(n.prototype,s),r&&_e(n,r),o}(fe),ye={containerOuter:function(e,t,i,n,s,r){var o=e.containerOuter,a=Object.assign(document.createElement("div"),{className:o});return a.dataset.type=r,t&&(a.dir=t),n&&(a.tabIndex=0),i&&(a.setAttribute("role",s?"combobox":"listbox"),s&&a.setAttribute("aria-autocomplete","list")),a.setAttribute("aria-haspopup","true"),a.setAttribute("aria-expanded","false"),a},containerInner:function(e){var t=e.containerInner;return Object.assign(document.createElement("div"),{className:t})},itemList:function(e,t){var i=e.list,n=e.listSingle,s=e.listItems;return Object.assign(document.createElement("div"),{className:i+" "+(t?n:s)})},placeholder:function(e,t){var i=e.placeholder;return Object.assign(document.createElement("div"),{className:i,innerHTML:t})},item:function(e,t,i){var n=e.item,s=e.button,r=e.highlightedState,o=e.itemSelectable,a=e.placeholder,c=t.id,l=t.value,h=t.label,u=t.customProperties,d=t.active,p=t.disabled,m=t.highlighted,f=t.placeholder,v=Object.assign(document.createElement("div"),{className:n,innerHTML:h});if(Object.assign(v.dataset,{item:"",id:c,value:l,customProperties:u}),d&&v.setAttribute("aria-selected","true"),p&&v.setAttribute("aria-disabled","true"),f&&v.classList.add(a),v.classList.add(m?r:o),i){p&&v.classList.remove(o),v.dataset.deletable="";var g=Object.assign(document.createElement("button"),{type:"button",className:s,innerHTML:"Remove item"});g.setAttribute("aria-label","Remove item: '"+l+"'"),g.dataset.button="",v.appendChild(g)}return v},choiceList:function(e,t){var i=e.list,n=Object.assign(document.createElement("div"),{className:i});return t||n.setAttribute("aria-multiselectable","true"),n.setAttribute("role","listbox"),n},choiceGroup:function(e,t){var i=e.group,n=e.groupHeading,s=e.itemDisabled,r=t.id,o=t.value,a=t.disabled,c=Object.assign(document.createElement("div"),{className:i+" "+(a?s:"")});return c.setAttribute("role","group"),Object.assign(c.dataset,{group:"",id:r,value:o}),a&&c.setAttribute("aria-disabled","true"),c.appendChild(Object.assign(document.createElement("div"),{className:n,innerHTML:o})),c},choice:function(e,t,i){var n=e.item,s=e.itemChoice,r=e.itemSelectable,o=e.selectedState,a=e.itemDisabled,c=e.placeholder,l=t.id,h=t.value,u=t.label,d=t.groupId,p=t.elementId,m=t.disabled,f=t.selected,v=t.placeholder,g=Object.assign(document.createElement("div"),{id:p,innerHTML:u,className:n+" "+s});return f&&g.classList.add(o),v&&g.classList.add(c),g.setAttribute("role",d>0?"treeitem":"option"),Object.assign(g.dataset,{choice:"",id:l,value:h,selectText:i}),m?(g.classList.add(a),g.dataset.choiceDisabled="",g.setAttribute("aria-disabled","true")):(g.classList.add(r),g.dataset.choiceSelectable=""),g},input:function(e,t){var i=e.input,n=e.inputCloned,s=Object.assign(document.createElement("input"),{type:"text",className:i+" "+n,autocomplete:"off",autocapitalize:"off",spellcheck:!1});return s.setAttribute("role","textbox"),s.setAttribute("aria-autocomplete","list"),s.setAttribute("aria-label",t),s},dropdown:function(e){var t=e.list,i=e.listDropdown,n=document.createElement("div");return n.classList.add(t,i),n.setAttribute("aria-expanded","false"),n},notice:function(e,t,i){var n=e.item,s=e.itemChoice,r=e.noResults,o=e.noChoices;void 0===i&&(i="");var a=[n,s];return"no-choices"===i?a.push(o):"no-results"===i&&a.push(r),Object.assign(document.createElement("div"),{innerHTML:t,className:a.join(" ")})},option:function(e){var t=e.label,i=e.value,n=e.customProperties,s=e.active,r=e.disabled,o=new Option(t,i,!1,s);return n&&(o.dataset.customProperties=n),o.disabled=r,o}},Ee=function(e){return void 0===e&&(e=!0),{type:z,active:e}},Ie=function(e,t){return{type:Y,id:e,highlighted:t}},Se=function(e){var t=e.value,i=e.id,n=e.active,s=e.disabled;return{type:X,value:t,id:i,active:n,disabled:s}},we=function(e){return{type:"SET_IS_LOADING",isLoading:e}};function Oe(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var Ce="-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style,Ae={},Le=function(){var e,t,i;function n(e,t){var i=this;void 0===e&&(e="[data-choice]"),void 0===t&&(t={}),this.config=o.a.all([M,n.defaults.options,t],{arrayMerge:function(e,t){return[].concat(t)}});var s=A(this.config,M);s.length&&console.warn("Unknown config option(s) passed",s.join(", "));var r="string"==typeof e?document.querySelector(e):e;if(!(r instanceof HTMLInputElement||r instanceof HTMLSelectElement))throw TypeError("Expected one of the following types text|select-one|select-multiple");if(this._isTextElement=r.type===ae,this._isSelectOneElement=r.type===ce,this._isSelectMultipleElement=r.type===le,this._isSelectElement=this._isSelectOneElement||this._isSelectMultipleElement,this.config.searchEnabled=this._isSelectMultipleElement||this.config.searchEnabled,["auto","always"].includes(this.config.renderSelectedChoices)||(this.config.renderSelectedChoices="auto"),t.addItemFilter&&"function"!=typeof t.addItemFilter){var a=t.addItemFilter instanceof RegExp?t.addItemFilter:new RegExp(t.addItemFilter);this.config.addItemFilter=a.test.bind(a)}if(this._isTextElement?this.passedElement=new ge({element:r,classNames:this.config.classNames,delimiter:this.config.delimiter}):this.passedElement=new be({element:r,classNames:this.config.classNames,template:function(e){return i._templates.option(e)}}),this.initialised=!1,this._store=new k,this._initialState={},this._currentState={},this._prevState={},this._currentValue="",this._canSearch=this.config.searchEnabled,this._isScrollingOnIe=!1,this._highlightPosition=0,this._wasTap=!0,this._placeholderValue=this._generatePlaceholderValue(),this._baseId=y(this.passedElement.element,"choices-"),this._direction=this.passedElement.dir,!this._direction){var c=window.getComputedStyle(this.passedElement.element).direction;c!==window.getComputedStyle(document.documentElement).direction&&(this._direction=c)}if(this._idNames={itemChoice:"item-choice"},this._presetGroups=this.passedElement.optionGroups,this._presetOptions=this.passedElement.options,this._presetChoices=this.config.choices,this._presetItems=this.config.items,this.passedElement.value&&(this._presetItems=this._presetItems.concat(this.passedElement.value.split(this.config.delimiter))),this.passedElement.options&&this.passedElement.options.forEach((function(e){i._presetChoices.push({value:e.value,label:e.innerHTML,selected:e.selected,disabled:e.disabled||e.parentNode.disabled,placeholder:""===e.value||e.hasAttribute("placeholder"),customProperties:e.getAttribute("data-custom-properties")})})),this._render=this._render.bind(this),this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onClick=this._onClick.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this),this._onMouseDown=this._onMouseDown.bind(this),this._onMouseOver=this._onMouseOver.bind(this),this._onFormReset=this._onFormReset.bind(this),this._onAKey=this._onAKey.bind(this),this._onEnterKey=this._onEnterKey.bind(this),this._onEscapeKey=this._onEscapeKey.bind(this),this._onDirectionKey=this._onDirectionKey.bind(this),this._onDeleteKey=this._onDeleteKey.bind(this),this.passedElement.isActive)return this.config.silent||console.warn("Trying to initialise Choices on element already initialised"),void(this.initialised=!0);this.init()}e=n,i=[{key:"defaults",get:function(){return Object.preventExtensions({get options(){return Ae},get templates(){return ye}})}}],(t=null)&&Oe(e.prototype,t),i&&Oe(e,i);var r=n.prototype;return r.init=function(){if(!this.initialised){this._createTemplates(),this._createElements(),this._createStructure(),this._initialState=C(this._store.state),this._store.subscribe(this._render),this._render(),this._addEventListeners(),(!this.config.addItems||this.passedElement.element.hasAttribute("disabled"))&&this.disable(),this.initialised=!0;var e=this.config.callbackOnInit;e&&"function"==typeof e&&e.call(this)}},r.destroy=function(){this.initialised&&(this._removeEventListeners(),this.passedElement.reveal(),this.containerOuter.unwrap(this.passedElement.element),this.clearStore(),this._isSelectElement&&(this.passedElement.options=this._presetOptions),this._templates=null,this.initialised=!1)},r.enable=function(){return this.passedElement.isDisabled&&this.passedElement.enable(),this.containerOuter.isDisabled&&(this._addEventListeners(),this.input.enable(),this.containerOuter.enable()),this},r.disable=function(){return this.passedElement.isDisabled||this.passedElement.disable(),this.containerOuter.isDisabled||(this._removeEventListeners(),this.input.disable(),this.containerOuter.disable()),this},r.highlightItem=function(e,t){if(void 0===t&&(t=!0),!e)return this;var i=e.id,n=e.groupId,s=void 0===n?-1:n,r=e.value,o=void 0===r?"":r,a=e.label,c=void 0===a?"":a,l=s>=0?this._store.getGroupById(s):null;return this._store.dispatch(Ie(i,!0)),t&&this.passedElement.triggerEvent(V,{id:i,value:o,label:c,groupValue:l&&l.value?l.value:null}),this},r.unhighlightItem=function(e){if(!e)return this;var t=e.id,i=e.groupId,n=void 0===i?-1:i,s=e.value,r=void 0===s?"":s,o=e.label,a=void 0===o?"":o,c=n>=0?this._store.getGroupById(n):null;return this._store.dispatch(Ie(t,!1)),this.passedElement.triggerEvent(V,{id:t,value:r,label:a,groupValue:c&&c.value?c.value:null}),this},r.highlightAll=function(){var e=this;return this._store.items.forEach((function(t){return e.highlightItem(t)})),this},r.unhighlightAll=function(){var e=this;return this._store.items.forEach((function(t){return e.unhighlightItem(t)})),this},r.removeActiveItemsByValue=function(e){var t=this;return this._store.activeItems.filter((function(t){return t.value===e})).forEach((function(e){return t._removeItem(e)})),this},r.removeActiveItems=function(e){var t=this;return this._store.activeItems.filter((function(t){return t.id!==e})).forEach((function(e){return t._removeItem(e)})),this},r.removeHighlightedItems=function(e){var t=this;return void 0===e&&(e=!1),this._store.highlightedActiveItems.forEach((function(i){t._removeItem(i),e&&t._triggerChange(i.value)})),this},r.showDropdown=function(e){var t=this;return this.dropdown.isActive?this:(requestAnimationFrame((function(){t.dropdown.show(),t.containerOuter.open(t.dropdown.distanceFromTopWindow),!e&&t._canSearch&&t.input.focus(),t.passedElement.triggerEvent(N,{})})),this)},r.hideDropdown=function(e){var t=this;return this.dropdown.isActive?(requestAnimationFrame((function(){t.dropdown.hide(),t.containerOuter.close(),!e&&t._canSearch&&(t.input.removeActiveDescendant(),t.input.blur()),t.passedElement.triggerEvent(F,{})})),this):this},r.getValue=function(e){void 0===e&&(e=!1);var t=this._store.activeItems.reduce((function(t,i){var n=e?i.value:i;return t.push(n),t}),[]);return this._isSelectOneElement?t[0]:t},r.setValue=function(e){var t=this;return this.initialised?(e.forEach((function(e){return t._setChoiceOrItem(e)})),this):this},r.setChoiceByValue=function(e){var t=this;return!this.initialised||this._isTextElement?this:((Array.isArray(e)?e:[e]).forEach((function(e){return t._findAndSelectChoiceByValue(e)})),this)},r.setChoices=function(e,t,i,n){var s=this;if(void 0===e&&(e=[]),void 0===t&&(t="value"),void 0===i&&(i="label"),void 0===n&&(n=!1),!this.initialised)throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");if(!this._isSelectElement)throw new TypeError("setChoices can't be used with INPUT based Choices");if("string"!=typeof t||!t)throw new TypeError("value parameter must be a name of 'value' field in passed objects");if(n&&this.clearChoices(),"function"==typeof e){var r=e(this);if("function"==typeof Promise&&r instanceof Promise)return new Promise((function(e){return requestAnimationFrame(e)})).then((function(){return s._handleLoadingState(!0)})).then((function(){return r})).then((function(e){return s.setChoices(e,t,i,n)})).catch((function(e){s.config.silent||console.error(e)})).then((function(){return s._handleLoadingState(!1)})).then((function(){return s}));if(!Array.isArray(r))throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: "+typeof r);return this.setChoices(r,t,i,!1)}if(!Array.isArray(e))throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");return this.containerOuter.removeLoadingState(),this._startLoading(),e.forEach((function(e){e.choices?s._addGroup({id:parseInt(e.id,10)||null,group:e,valueKey:t,labelKey:i}):s._addChoice({value:e[t],label:e[i],isSelected:e.selected,isDisabled:e.disabled,customProperties:e.customProperties,placeholder:e.placeholder})})),this._stopLoading(),this},r.clearChoices=function(){return this._store.dispatch({type:W}),this},r.clearStore=function(){return this._store.dispatch({type:"CLEAR_ALL"}),this},r.clearInput=function(){var e=!this._isSelectOneElement;return this.input.clear(e),!this._isTextElement&&this._canSearch&&(this._isSearching=!1,this._store.dispatch(Ee(!0))),this},r._render=function(){if(!this._store.isLoading()){this._currentState=this._store.state;var e=this._currentState.choices!==this._prevState.choices||this._currentState.groups!==this._prevState.groups||this._currentState.items!==this._prevState.items,t=this._isSelectElement,i=this._currentState.items!==this._prevState.items;e&&(t&&this._renderChoices(),i&&this._renderItems(),this._prevState=this._currentState)}},r._renderChoices=function(){var e=this,t=this._store,i=t.activeGroups,n=t.activeChoices,s=document.createDocumentFragment();if(this.choiceList.clear(),this.config.resetScrollPosition&&requestAnimationFrame((function(){return e.choiceList.scrollToTop()})),i.length>=1&&!this._isSearching){var r=n.filter((function(e){return!0===e.placeholder&&-1===e.groupId}));r.length>=1&&(s=this._createChoicesFragment(r,s)),s=this._createGroupsFragment(i,n,s)}else n.length>=1&&(s=this._createChoicesFragment(n,s));if(s.childNodes&&s.childNodes.length>0){var o=this._store.activeItems,a=this._canAddItem(o,this.input.value);a.response?(this.choiceList.append(s),this._highlightChoice()):this.choiceList.append(this._getTemplate("notice",a.notice))}else{var c,l;this._isSearching?(l="function"==typeof this.config.noResultsText?this.config.noResultsText():this.config.noResultsText,c=this._getTemplate("notice",l,"no-results")):(l="function"==typeof this.config.noChoicesText?this.config.noChoicesText():this.config.noChoicesText,c=this._getTemplate("notice",l,"no-choices")),this.choiceList.append(c)}},r._renderItems=function(){var e=this._store.activeItems||[];this.itemList.clear();var t=this._createItemsFragment(e);t.childNodes&&this.itemList.append(t)},r._createGroupsFragment=function(e,t,i){var n=this;void 0===i&&(i=document.createDocumentFragment());return this.config.shouldSort&&e.sort(this.config.sorter),e.forEach((function(e){var s=function(e){return t.filter((function(t){return n._isSelectOneElement?t.groupId===e.id:t.groupId===e.id&&("always"===n.config.renderSelectedChoices||!t.selected)}))}(e);if(s.length>=1){var r=n._getTemplate("choiceGroup",e);i.appendChild(r),n._createChoicesFragment(s,i,!0)}})),i},r._createChoicesFragment=function(e,t,i){var n=this;void 0===t&&(t=document.createDocumentFragment()),void 0===i&&(i=!1);var s=this.config,r=s.renderSelectedChoices,o=s.searchResultLimit,a=s.renderChoiceLimit,c=this._isSearching?O:this.config.sorter,l=function(e){if("auto"!==r||(n._isSelectOneElement||!e.selected)){var i=n._getTemplate("choice",e,n.config.itemSelectText);t.appendChild(i)}},h=e;"auto"!==r||this._isSelectOneElement||(h=e.filter((function(e){return!e.selected})));var u=h.reduce((function(e,t){return t.placeholder?e.placeholderChoices.push(t):e.normalChoices.push(t),e}),{placeholderChoices:[],normalChoices:[]}),d=u.placeholderChoices,p=u.normalChoices;(this.config.shouldSort||this._isSearching)&&p.sort(c);var m=h.length,f=this._isSelectOneElement?[].concat(d,p):p;this._isSearching?m=o:a&&a>0&&!i&&(m=a);for(var v=0;v<m;v+=1)f[v]&&l(f[v]);return t},r._createItemsFragment=function(e,t){var i=this;void 0===t&&(t=document.createDocumentFragment());var n=this.config,s=n.shouldSortItems,r=n.sorter,o=n.removeItemButton;s&&!this._isSelectOneElement&&e.sort(r),this._isTextElement?this.passedElement.value=e:this.passedElement.options=e;return e.forEach((function(e){var n=i._getTemplate("item",e,o);t.appendChild(n)})),t},r._triggerChange=function(e){null!=e&&this.passedElement.triggerEvent(j,{value:e})},r._selectPlaceholderChoice=function(){var e=this._store.placeholderChoice;e&&(this._addItem({value:e.value,label:e.label,choiceId:e.id,groupId:e.groupId,placeholder:e.placeholder}),this._triggerChange(e.value))},r._handleButtonAction=function(e,t){if(e&&t&&this.config.removeItems&&this.config.removeItemButton){var i=t.parentNode.getAttribute("data-id"),n=e.find((function(e){return e.id===parseInt(i,10)}));this._removeItem(n),this._triggerChange(n.value),this._isSelectOneElement&&this._selectPlaceholderChoice()}},r._handleItemAction=function(e,t,i){var n=this;if(void 0===i&&(i=!1),e&&t&&this.config.removeItems&&!this._isSelectOneElement){var s=t.getAttribute("data-id");e.forEach((function(e){e.id!==parseInt(s,10)||e.highlighted?!i&&e.highlighted&&n.unhighlightItem(e):n.highlightItem(e)})),this.input.focus()}},r._handleChoiceAction=function(e,t){if(e&&t){var i=t.dataset.id,n=this._store.getChoiceById(i);if(n){var s=e[0]&&e[0].keyCode?e[0].keyCode:null,r=this.dropdown.isActive;if(n.keyCode=s,this.passedElement.triggerEvent(K,{choice:n}),!n.selected&&!n.disabled)this._canAddItem(e,n.value).response&&(this._addItem({value:n.value,label:n.label,choiceId:n.id,groupId:n.groupId,customProperties:n.customProperties,placeholder:n.placeholder,keyCode:n.keyCode}),this._triggerChange(n.value));this.clearInput(),r&&this._isSelectOneElement&&(this.hideDropdown(!0),this.containerOuter.focus())}}},r._handleBackspace=function(e){if(this.config.removeItems&&e){var t=e[e.length-1],i=e.some((function(e){return e.highlighted}));this.config.editItems&&!i&&t?(this.input.value=t.value,this.input.setWidth(),this._removeItem(t),this._triggerChange(t.value)):(i||this.highlightItem(t,!1),this.removeHighlightedItems(!0))}},r._startLoading=function(){this._store.dispatch(we(!0))},r._stopLoading=function(){this._store.dispatch(we(!1))},r._handleLoadingState=function(e){void 0===e&&(e=!0);var t=this.itemList.getChild("."+this.config.classNames.placeholder);e?(this.disable(),this.containerOuter.addLoadingState(),this._isSelectOneElement?t?t.innerHTML=this.config.loadingText:(t=this._getTemplate("placeholder",this.config.loadingText),this.itemList.append(t)):this.input.placeholder=this.config.loadingText):(this.enable(),this.containerOuter.removeLoadingState(),this._isSelectOneElement?t.innerHTML=this._placeholderValue||"":this.input.placeholder=this._placeholderValue||"")},r._handleSearch=function(e){if(e&&this.input.isFocussed){var t=this._store.choices,i=this.config,n=i.searchFloor,s=i.searchChoices,r=t.some((function(e){return!e.active}));if(e&&e.length>=n){var o=s?this._searchChoices(e):0;this.passedElement.triggerEvent(R,{value:e,resultCount:o})}else r&&(this._isSearching=!1,this._store.dispatch(Ee(!0)))}},r._canAddItem=function(e,t){var i=!0,n="function"==typeof this.config.addItemText?this.config.addItemText(t):this.config.addItemText;if(!this._isSelectOneElement){var s=function(e,t,i){return void 0===i&&(i="value"),e.some((function(e){return"string"==typeof t?e[i]===t.trim():e[i]===t}))}(e,t);this.config.maxItemCount>0&&this.config.maxItemCount<=e.length&&(i=!1,n="function"==typeof this.config.maxItemText?this.config.maxItemText(this.config.maxItemCount):this.config.maxItemText),!this.config.duplicateItemsAllowed&&s&&i&&(i=!1,n="function"==typeof this.config.uniqueItemText?this.config.uniqueItemText(t):this.config.uniqueItemText),this._isTextElement&&this.config.addItems&&i&&"function"==typeof this.config.addItemFilter&&!this.config.addItemFilter(t)&&(i=!1,n="function"==typeof this.config.customAddItemText?this.config.customAddItemText(t):this.config.customAddItemText)}return{response:i,notice:n}},r._searchChoices=function(e){var t="string"==typeof e?e.trim():e,i="string"==typeof this._currentValue?this._currentValue.trim():this._currentValue;if(t.length<1&&t===i+" ")return 0;var n=this._store.searchableChoices,r=t,o=[].concat(this.config.searchFields),a=Object.assign(this.config.fuseOptions,{keys:o}),c=new s.a(n,a).search(r);return this._currentValue=t,this._highlightPosition=0,this._isSearching=!0,this._store.dispatch(function(e){return{type:U,results:e}}(c)),c.length},r._addEventListeners=function(){var e=document.documentElement;e.addEventListener("touchend",this._onTouchEnd,!0),this.containerOuter.element.addEventListener("keydown",this._onKeyDown,!0),this.containerOuter.element.addEventListener("mousedown",this._onMouseDown,!0),e.addEventListener("click",this._onClick,{passive:!0}),e.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.dropdown.element.addEventListener("mouseover",this._onMouseOver,{passive:!0}),this._isSelectOneElement&&(this.containerOuter.element.addEventListener("focus",this._onFocus,{passive:!0}),this.containerOuter.element.addEventListener("blur",this._onBlur,{passive:!0})),this.input.element.addEventListener("keyup",this._onKeyUp,{passive:!0}),this.input.element.addEventListener("focus",this._onFocus,{passive:!0}),this.input.element.addEventListener("blur",this._onBlur,{passive:!0}),this.input.element.form&&this.input.element.form.addEventListener("reset",this._onFormReset,{passive:!0}),this.input.addEventListeners()},r._removeEventListeners=function(){var e=document.documentElement;e.removeEventListener("touchend",this._onTouchEnd,!0),this.containerOuter.element.removeEventListener("keydown",this._onKeyDown,!0),this.containerOuter.element.removeEventListener("mousedown",this._onMouseDown,!0),e.removeEventListener("click",this._onClick),e.removeEventListener("touchmove",this._onTouchMove),this.dropdown.element.removeEventListener("mouseover",this._onMouseOver),this._isSelectOneElement&&(this.containerOuter.element.removeEventListener("focus",this._onFocus),this.containerOuter.element.removeEventListener("blur",this._onBlur)),this.input.element.removeEventListener("keyup",this._onKeyUp),this.input.element.removeEventListener("focus",this._onFocus),this.input.element.removeEventListener("blur",this._onBlur),this.input.element.form&&this.input.element.form.removeEventListener("reset",this._onFormReset),this.input.removeEventListeners()},r._onKeyDown=function(e){var t,i=e.target,n=e.keyCode,s=e.ctrlKey,r=e.metaKey,o=this._store.activeItems,a=this.input.isFocussed,c=this.dropdown.isActive,l=this.itemList.hasChildren(),h=String.fromCharCode(n),u=Z,d=Q,p=ee,m=te,f=ie,v=ne,g=se,_=re,b=oe,y=s||r;!this._isTextElement&&/[a-zA-Z0-9-_ ]/.test(h)&&this.showDropdown();var E=((t={})[m]=this._onAKey,t[p]=this._onEnterKey,t[f]=this._onEscapeKey,t[v]=this._onDirectionKey,t[_]=this._onDirectionKey,t[g]=this._onDirectionKey,t[b]=this._onDirectionKey,t[d]=this._onDeleteKey,t[u]=this._onDeleteKey,t);E[n]&&E[n]({event:e,target:i,keyCode:n,metaKey:r,activeItems:o,hasFocusedInput:a,hasActiveDropdown:c,hasItems:l,hasCtrlDownKeyPressed:y})},r._onKeyUp=function(e){var t=e.target,i=e.keyCode,n=this.input.value,s=this._store.activeItems,r=this._canAddItem(s,n),o=Z,a=Q;if(this._isTextElement){if(r.notice&&n){var c=this._getTemplate("notice",r.notice);this.dropdown.element.innerHTML=c.outerHTML,this.showDropdown(!0)}else this.hideDropdown(!0)}else{var l=(i===o||i===a)&&!t.value,h=!this._isTextElement&&this._isSearching,u=this._canSearch&&r.response;l&&h?(this._isSearching=!1,this._store.dispatch(Ee(!0))):u&&this._handleSearch(this.input.value)}this._canSearch=this.config.searchEnabled},r._onAKey=function(e){var t=e.hasItems;e.hasCtrlDownKeyPressed&&t&&(this._canSearch=!1,this.config.removeItems&&!this.input.value&&this.input.element===document.activeElement&&this.highlightAll())},r._onEnterKey=function(e){var t=e.event,i=e.target,n=e.activeItems,s=e.hasActiveDropdown,r=ee,o=i.hasAttribute("data-button");if(this._isTextElement&&i.value){var a=this.input.value;this._canAddItem(n,a).response&&(this.hideDropdown(!0),this._addItem({value:a}),this._triggerChange(a),this.clearInput())}if(o&&(this._handleButtonAction(n,i),t.preventDefault()),s){var c=this.dropdown.getChild("."+this.config.classNames.highlightedState);c&&(n[0]&&(n[0].keyCode=r),this._handleChoiceAction(n,c)),t.preventDefault()}else this._isSelectOneElement&&(this.showDropdown(),t.preventDefault())},r._onEscapeKey=function(e){e.hasActiveDropdown&&(this.hideDropdown(!0),this.containerOuter.focus())},r._onDirectionKey=function(e){var t,i,n,s=e.event,r=e.hasActiveDropdown,o=e.keyCode,a=e.metaKey,c=se,l=re,h=oe;if(r||this._isSelectOneElement){this.showDropdown(),this._canSearch=!1;var u,d=o===c||o===h?1:-1;if(a||o===h||o===l)u=d>0?this.dropdown.element.querySelector("[data-choice-selectable]:last-of-type"):this.dropdown.element.querySelector("[data-choice-selectable]");else{var p=this.dropdown.element.querySelector("."+this.config.classNames.highlightedState);u=p?function(e,t,i){if(void 0===i&&(i=1),e instanceof Element&&"string"==typeof t){for(var n=(i>0?"next":"previous")+"ElementSibling",s=e[n];s;){if(s.matches(t))return s;s=s[n]}return s}}(p,"[data-choice-selectable]",d):this.dropdown.element.querySelector("[data-choice-selectable]")}u&&(t=u,i=this.choiceList.element,void 0===(n=d)&&(n=1),t&&(n>0?i.scrollTop+i.offsetHeight>=t.offsetTop+t.offsetHeight:t.offsetTop>=i.scrollTop)||this.choiceList.scrollToChildElement(u,d),this._highlightChoice(u)),s.preventDefault()}},r._onDeleteKey=function(e){var t=e.event,i=e.target,n=e.hasFocusedInput,s=e.activeItems;!n||i.value||this._isSelectOneElement||(this._handleBackspace(s),t.preventDefault())},r._onTouchMove=function(){this._wasTap&&(this._wasTap=!1)},r._onTouchEnd=function(e){var t=(e||e.touches[0]).target;this._wasTap&&this.containerOuter.element.contains(t)&&((t===this.containerOuter.element||t===this.containerInner.element)&&(this._isTextElement?this.input.focus():this._isSelectMultipleElement&&this.showDropdown()),e.stopPropagation());this._wasTap=!0},r._onMouseDown=function(e){var t=e.target;if(t instanceof HTMLElement){if(Ce&&this.choiceList.element.contains(t)){var i=this.choiceList.element.firstElementChild,n="ltr"===this._direction?e.offsetX>=i.offsetWidth:e.offsetX<i.offsetLeft;this._isScrollingOnIe=n}if(t!==this.input.element){var s=t.closest("[data-button],[data-item],[data-choice]");if(s instanceof HTMLElement){var r=e.shiftKey,o=this._store.activeItems,a=s.dataset;"button"in a?this._handleButtonAction(o,s):"item"in a?this._handleItemAction(o,s,r):"choice"in a&&this._handleChoiceAction(o,s)}e.preventDefault()}}},r._onMouseOver=function(e){var t=e.target;t instanceof HTMLElement&&"choice"in t.dataset&&this._highlightChoice(t)},r._onClick=function(e){var t=e.target;this.containerOuter.element.contains(t)?this.dropdown.isActive||this.containerOuter.isDisabled?this._isSelectOneElement&&t!==this.input.element&&!this.dropdown.element.contains(t)&&this.hideDropdown():this._isTextElement?document.activeElement!==this.input.element&&this.input.focus():(this.showDropdown(),this.containerOuter.focus()):(this._store.highlightedActiveItems.length>0&&this.unhighlightAll(),this.containerOuter.removeFocusState(),this.hideDropdown(!0))},r._onFocus=function(e){var t,i=this,n=e.target;this.containerOuter.element.contains(n)&&((t={})[ae]=function(){n===i.input.element&&i.containerOuter.addFocusState()},t[ce]=function(){i.containerOuter.addFocusState(),n===i.input.element&&i.showDropdown(!0)},t[le]=function(){n===i.input.element&&(i.showDropdown(!0),i.containerOuter.addFocusState())},t)[this.passedElement.element.type]()},r._onBlur=function(e){var t=this,i=e.target;if(this.containerOuter.element.contains(i)&&!this._isScrollingOnIe){var n,s=this._store.activeItems.some((function(e){return e.highlighted}));((n={})[ae]=function(){i===t.input.element&&(t.containerOuter.removeFocusState(),s&&t.unhighlightAll(),t.hideDropdown(!0))},n[ce]=function(){t.containerOuter.removeFocusState(),(i===t.input.element||i===t.containerOuter.element&&!t._canSearch)&&t.hideDropdown(!0)},n[le]=function(){i===t.input.element&&(t.containerOuter.removeFocusState(),t.hideDropdown(!0),s&&t.unhighlightAll())},n)[this.passedElement.element.type]()}else this._isScrollingOnIe=!1,this.input.element.focus()},r._onFormReset=function(){this._store.dispatch({type:"RESET_TO",state:this._initialState})},r._highlightChoice=function(e){var t=this;void 0===e&&(e=null);var i=Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]"));if(i.length){var n=e;Array.from(this.dropdown.element.querySelectorAll("."+this.config.classNames.highlightedState)).forEach((function(e){e.classList.remove(t.config.classNames.highlightedState),e.setAttribute("aria-selected","false")})),n?this._highlightPosition=i.indexOf(n):(n=i.length>this._highlightPosition?i[this._highlightPosition]:i[i.length-1])||(n=i[0]),n.classList.add(this.config.classNames.highlightedState),n.setAttribute("aria-selected","true"),this.passedElement.triggerEvent(G,{el:n}),this.dropdown.isActive&&(this.input.setActiveDescendant(n.id),this.containerOuter.setActiveDescendant(n.id))}},r._addItem=function(e){var t=e.value,i=e.label,n=void 0===i?null:i,s=e.choiceId,r=void 0===s?-1:s,o=e.groupId,a=void 0===o?-1:o,c=e.customProperties,l=void 0===c?null:c,h=e.placeholder,u=void 0!==h&&h,d=e.keyCode,p=void 0===d?null:d,m="string"==typeof t?t.trim():t,f=p,v=l,g=this._store.items,_=n||m,b=r||-1,y=a>=0?this._store.getGroupById(a):null,E=g?g.length+1:1;return this.config.prependValue&&(m=this.config.prependValue+m.toString()),this.config.appendValue&&(m+=this.config.appendValue.toString()),this._store.dispatch(function(e){var t=e.value,i=e.label,n=e.id,s=e.choiceId,r=e.groupId,o=e.customProperties,a=e.placeholder,c=e.keyCode;return{type:$,value:t,label:i,id:n,choiceId:s,groupId:r,customProperties:o,placeholder:a,keyCode:c}}({value:m,label:_,id:E,choiceId:b,groupId:a,customProperties:l,placeholder:u,keyCode:f})),this._isSelectOneElement&&this.removeActiveItems(E),this.passedElement.triggerEvent(H,{id:E,value:m,label:_,customProperties:v,groupValue:y&&y.value?y.value:void 0,keyCode:f}),this},r._removeItem=function(e){if(!e||!I("Object",e))return this;var t=e.id,i=e.value,n=e.label,s=e.choiceId,r=e.groupId,o=r>=0?this._store.getGroupById(r):null;return this._store.dispatch(function(e,t){return{type:J,id:e,choiceId:t}}(t,s)),o&&o.value?this.passedElement.triggerEvent(B,{id:t,value:i,label:n,groupValue:o.value}):this.passedElement.triggerEvent(B,{id:t,value:i,label:n}),this},r._addChoice=function(e){var t=e.value,i=e.label,n=void 0===i?null:i,s=e.isSelected,r=void 0!==s&&s,o=e.isDisabled,a=void 0!==o&&o,c=e.groupId,l=void 0===c?-1:c,h=e.customProperties,u=void 0===h?null:h,d=e.placeholder,p=void 0!==d&&d,m=e.keyCode,f=void 0===m?null:m;if(null!=t){var v=this._store.choices,g=n||t,_=v?v.length+1:1,b=this._baseId+"-"+this._idNames.itemChoice+"-"+_;this._store.dispatch(function(e){var t=e.value,i=e.label,n=e.id,s=e.groupId,r=e.disabled,o=e.elementId,a=e.customProperties,c=e.placeholder,l=e.keyCode;return{type:q,value:t,label:i,id:n,groupId:s,disabled:r,elementId:o,customProperties:a,placeholder:c,keyCode:l}}({id:_,groupId:l,elementId:b,value:t,label:g,disabled:a,customProperties:u,placeholder:p,keyCode:f})),r&&this._addItem({value:t,label:g,choiceId:_,customProperties:u,placeholder:p,keyCode:f})}},r._addGroup=function(e){var t=this,i=e.group,n=e.id,s=e.valueKey,r=void 0===s?"value":s,o=e.labelKey,a=void 0===o?"label":o,c=I("Object",i)?i.choices:Array.from(i.getElementsByTagName("OPTION")),l=n||Math.floor((new Date).valueOf()*Math.random()),h=!!i.disabled&&i.disabled;if(c){this._store.dispatch(Se({value:i.label,id:l,active:!0,disabled:h}));c.forEach((function(e){var i=e.disabled||e.parentNode&&e.parentNode.disabled;t._addChoice({value:e[r],label:I("Object",e)?e[a]:e.innerHTML,isSelected:e.selected,isDisabled:i,groupId:l,customProperties:e.customProperties,placeholder:e.placeholder})}))}else this._store.dispatch(Se({value:i.label,id:i.id,active:!1,disabled:i.disabled}))},r._getTemplate=function(e){var t;if(!e)return null;for(var i=this.config.classNames,n=arguments.length,s=new Array(n>1?n-1:0),r=1;r<n;r++)s[r-1]=arguments[r];return(t=this._templates[e]).call.apply(t,[this,i].concat(s))},r._createTemplates=function(){var e=this.config.callbackOnCreateTemplates,t={};e&&"function"==typeof e&&(t=e.call(this,w)),this._templates=o()(ye,t)},r._createElements=function(){this.containerOuter=new he({element:this._getTemplate("containerOuter",this._direction,this._isSelectElement,this._isSelectOneElement,this.config.searchEnabled,this.passedElement.element.type),classNames:this.config.classNames,type:this.passedElement.element.type,position:this.config.position}),this.containerInner=new he({element:this._getTemplate("containerInner"),classNames:this.config.classNames,type:this.passedElement.element.type,position:this.config.position}),this.input=new de({element:this._getTemplate("input",this._placeholderValue),classNames:this.config.classNames,type:this.passedElement.element.type,preventPaste:!this.config.paste}),this.choiceList=new pe({element:this._getTemplate("choiceList",this._isSelectOneElement)}),this.itemList=new pe({element:this._getTemplate("itemList",this._isSelectOneElement)}),this.dropdown=new D({element:this._getTemplate("dropdown"),classNames:this.config.classNames,type:this.passedElement.element.type})},r._createStructure=function(){this.passedElement.conceal(),this.containerInner.wrap(this.passedElement.element),this.containerOuter.wrap(this.containerInner.element),this._isSelectOneElement?this.input.placeholder=this.config.searchPlaceholderValue||"":this._placeholderValue&&(this.input.placeholder=this._placeholderValue,this.input.setWidth()),this.containerOuter.element.appendChild(this.containerInner.element),this.containerOuter.element.appendChild(this.dropdown.element),this.containerInner.element.appendChild(this.itemList.element),this._isTextElement||this.dropdown.element.appendChild(this.choiceList.element),this._isSelectOneElement?this.config.searchEnabled&&this.dropdown.element.insertBefore(this.input.element,this.dropdown.element.firstChild):this.containerInner.element.appendChild(this.input.element),this._isSelectElement&&(this._highlightPosition=0,this._isSearching=!1,this._startLoading(),this._presetGroups.length?this._addPredefinedGroups(this._presetGroups):this._addPredefinedChoices(this._presetChoices),this._stopLoading()),this._isTextElement&&this._addPredefinedItems(this._presetItems)},r._addPredefinedGroups=function(e){var t=this,i=this.passedElement.placeholderOption;i&&"SELECT"===i.parentNode.tagName&&this._addChoice({value:i.value,label:i.innerHTML,isSelected:i.selected,isDisabled:i.disabled,placeholder:!0}),e.forEach((function(e){return t._addGroup({group:e,id:e.id||null})}))},r._addPredefinedChoices=function(e){var t=this;this.config.shouldSort&&e.sort(this.config.sorter);var i=e.some((function(e){return e.selected})),n=e.findIndex((function(e){return void 0===e.disabled||!e.disabled}));e.forEach((function(e,s){var r=e.value,o=e.label,a=e.customProperties,c=e.placeholder;if(t._isSelectElement)if(e.choices)t._addGroup({group:e,id:e.id||null});else{var l=!!(t._isSelectOneElement&&!i&&s===n)||e.selected,h=e.disabled;t._addChoice({value:r,label:o,isSelected:l,isDisabled:h,customProperties:a,placeholder:c})}else t._addChoice({value:r,label:o,isSelected:e.selected,isDisabled:e.disabled,customProperties:a,placeholder:c})}))},r._addPredefinedItems=function(e){var t=this;e.forEach((function(e){"object"==typeof e&&e.value&&t._addItem({value:e.value,label:e.label,choiceId:e.id,customProperties:e.customProperties,placeholder:e.placeholder}),"string"==typeof e&&t._addItem({value:e})}))},r._setChoiceOrItem=function(e){var t=this;({object:function(){e.value&&(t._isTextElement?t._addItem({value:e.value,label:e.label,choiceId:e.id,customProperties:e.customProperties,placeholder:e.placeholder}):t._addChoice({value:e.value,label:e.label,isSelected:!0,isDisabled:!1,customProperties:e.customProperties,placeholder:e.placeholder}))},string:function(){t._isTextElement?t._addItem({value:e}):t._addChoice({value:e,label:e,isSelected:!0,isDisabled:!1})}})[E(e).toLowerCase()]()},r._findAndSelectChoiceByValue=function(e){var t=this,i=this._store.choices.find((function(i){return t.config.valueComparer(i.value,e)}));i&&!i.selected&&this._addItem({value:i.value,label:i.label,choiceId:i.id,groupId:i.groupId,customProperties:i.customProperties,placeholder:i.placeholder,keyCode:i.keyCode})},r._generatePlaceholderValue=function(){if(this._isSelectElement){var e=this.passedElement.placeholderOption;return!!e&&e.text}var t=this.config,i=t.placeholder,n=t.placeholderValue,s=this.passedElement.element.dataset;if(i){if(n)return n;if(s.placeholder)return s.placeholder}return!1},n}();t.default=Le}]).default;

/* module gradientAnimate */
// function on
jQuery(document).ready(function() {
	gradientAnimateInit();
});

// function init
function gradientAnimateInit() {
	var granimInstance = new Granim({
		element: '#canvas-basic',
		direction: 'left-right',
		isPausedWhenNotInView: true,
		states: {
			"default-state": {
				gradients: [
					['#ff9966', '#ff5e62'],
					['#00F260', '#0575E6'],
					['#e1eec3', '#f05053']
				]
			}
		}
	});
	//Complex gradient animation
	var granimInstance = new Granim({
		element: '#canvas-complex',
		direction: 'left-right',
		isPausedWhenNotInView: true,
		states: {
			"default-state": {
				gradients: [
					[{ color: '#833ab4', pos: .2 }, { color: '#fd1d1d', pos: .8 }, { color: '#38ef7d', pos: 1 }],
					[{ color: '#40e0d0', pos: 0 }, { color: '#ff8c00', pos: .2 }, { color: '#ff0080', pos: .75 }],
				]
			}
		}
	});
	//Gradient animation with an image and blending mode
	var granimInstance = new Granim({
		element: '#canvas-image-blending',
		direction: 'top-bottom',
		isPausedWhenNotInView: true,
		image: {
			source: 'http://lorempixel.com/1400/400/people/',
			blendingMode: 'multiply',
		},
		states: {
			"default-state": {
				gradients: [
					['#29323c', '#485563'],
					['#FF6B6B', '#556270'],
					['#80d3fe', '#7ea0c4'],
					['#f0ab51', '#eceba3']
				],
				transitionSpeed: 7000
			}
		}
	});
	//Gradients with an image mask
	var granimInstance = new Granim({
		element: '#logo-canvas',
		direction: 'left-right',
		states: {
			"default-state": {
				gradients: [
					['#EB3349', '#F45C43'],
					['#FF8008', '#FFC837'],
					['#4CB8C4', '#3CD3AD'],
					['#24C6DC', '#514A9D'],
					['#FF512F', '#DD2476'],
					['#DA22FF', '#9733EE']
				],
				transitionSpeed: 2000
			}
		}
	});
	//Interactive Gradients
	var granimInstance = new Granim({
		element: '#canvas-interactive',
		name: 'interactive-gradient',
		elToSetClassOn: '.canvas-interactive-wrapper',
		direction: 'diagonal',
		isPausedWhenNotInView: true,
		stateTransitionSpeed: 500,
		states: {
			"default-state": {
				gradients: [
					['#B3FFAB', '#12FFF7'],
					['#ADD100', '#7B920A'],
					['#1A2980', '#26D0CE']
				],
				transitionSpeed: 10000
			},
			"violet-state": {
				gradients: [
					['#9D50BB', '#6E48AA'],
					['#4776E6', '#8E54E9']
				],
				transitionSpeed: 2000
			},
			"orange-state": {
				gradients: [
					['#FF4E50', '#F9D423']
				],
				loop: false
			}
		}
	});
	// With jQuery
	$('#default-state-cta').on('click', function(event) {
		event.preventDefault();
		granimInstance.changeState('default-state');
		setClass('#default-state-cta')
	});
	$('#violet-state-cta').on('click', function(event) {
		event.preventDefault();
		granimInstance.changeState('violet-state');
		setClass('#violet-state-cta')
	});
	$('#orange-state-cta').on('click', function(event) {
		event.preventDefault();
		granimInstance.changeState('orange-state');
		setClass('#orange-state-cta')
	});

	function setClass(element) {
		$('.canvas-interactive-wrapper a').removeClass('active');
		$(element).addClass('active');
	};
}

/*! Granim v2.0.0 - https://sarcadass.github.io/granim.js */
! function t(e, i, s) {
	function o(r, a) { if (!i[r]) { if (!e[r]) { var h = "function" == typeof require && require; if (!a && h) return h(r, !0); if (n) return n(r, !0); var c = new Error("Cannot find module '" + r + "'"); throw c.code = "MODULE_NOT_FOUND", c } var l = i[r] = { exports: {} };
			e[r][0].call(l.exports, function(t) { var i = e[r][1][t]; return o(i ? i : t) }, l, l.exports, t, e, i, s) } return i[r].exports } for (var n = "function" == typeof require && require, r = 0; r < s.length; r++) o(s[r]); return o }({ 1: [function(t, e, i) { "use strict";

		function s(t) { this.getElement(t.element), this.x1 = 0, this.y1 = 0, this.name = t.name || !1, this.elToSetClassOn = t.elToSetClassOn || "body", this.direction = t.direction || "diagonal", this.customDirection = t.customDirection || {}, this.validateInput("direction"), this.isPausedWhenNotInView = t.isPausedWhenNotInView || !1, this.states = t.states, this.stateTransitionSpeed = t.stateTransitionSpeed || 1e3, this.previousTimeStamp = null, this.progress = 0, this.isPaused = !1, this.isCleared = !1, this.isPausedBecauseNotInView = !1, this.context = this.canvas.getContext("2d"), this.channels = {}, this.channelsIndex = 0, this.activeState = t.defaultStateName || "default-state", this.isChangingState = !1, this.currentColors = [], this.currentColorsPos = [], this.activetransitionSpeed = null, this.eventPolyfill(), this.scrollDebounceThreshold = t.scrollDebounceThreshold || 300, this.scrollDebounceTimeout = null, this.isImgLoaded = !1, this.isCanvasInWindowView = !1, this.firstScrollInit = !0, this.animating = !1, this.gradientLength = this.states[this.activeState].gradients[0].length, t.image && t.image.source && (this.image = { source: t.image.source, position: t.image.position || ["center", "center"], stretchMode: t.image.stretchMode || !1, blendingMode: t.image.blendingMode || !1 }), this.events = { start: new CustomEvent("granim:start"), end: new CustomEvent("granim:end"), gradientChange: function(t) { return new CustomEvent("granim:gradientChange", { detail: { isLooping: t.isLooping, colorsFrom: t.colorsFrom, colorsTo: t.colorsTo, activeState: t.activeState }, bubbles: !1, cancelable: !1 }) } }, this.callbacks = { onStart: "function" == typeof t.onStart && t.onStart, onGradientChange: "function" == typeof t.onGradientChange && t.onGradientChange, onEnd: "function" == typeof t.onEnd && t.onEnd }, this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.setColors(), this.image && (this.validateInput("image"), this.prepareImage()), this.pauseWhenNotInViewNameSpace = this.pauseWhenNotInView.bind(this), this.setSizeAttributesNameSpace = this.setSizeAttributes.bind(this), this.onResize(), this.isPausedWhenNotInView ? this.onScroll() : this.image || (this.refreshColorsAndPos(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0), this.callbacks.onStart && this.callbacks.onStart(), this.canvas.dispatchEvent(this.events.start) } s.prototype.animateColors = t("./animateColors.js"), s.prototype.changeBlendingMode = t("./changeBlendingMode.js"), s.prototype.changeDirection = t("./changeDirection.js"), s.prototype.changeState = t("./changeState.js"), s.prototype.clear = t("./clear.js"), s.prototype.convertColorToRgba = t("./convertColorToRgba.js"), s.prototype.destroy = t("./destroy.js"), s.prototype.eventPolyfill = t("./eventPolyfill.js"), s.prototype.getColor = t("./getColor.js"), s.prototype.getColorDiff = t("./getColorDiff.js"), s.prototype.getColorPos = t("./getColorPos.js"), s.prototype.getColorPosDiff = t("./getColorPosDiff.js"), s.prototype.getCurrentColors = t("./getCurrentColors.js"), s.prototype.getCurrentColorsPos = t("./getCurrentColorsPos.js"), s.prototype.getDimensions = t("./getDimensions.js"), s.prototype.getElement = t("./getElement.js"), s.prototype.getLightness = t("./getLightness.js"), s.prototype.makeGradient = t("./makeGradient.js"), s.prototype.onResize = t("./onResize.js"), s.prototype.onScroll = t("./onScroll.js"), s.prototype.pause = t("./pause.js"), s.prototype.pauseWhenNotInView = t("./pauseWhenNotInView.js"), s.prototype.play = t("./play.js"), s.prototype.prepareImage = t("./prepareImage.js"), s.prototype.refreshColorsAndPos = t("./refreshColorsAndPos.js"), s.prototype.setColors = t("./setColors.js"), s.prototype.setDirection = t("./setDirection.js"), s.prototype.setSizeAttributes = t("./setSizeAttributes.js"), s.prototype.triggerError = t("./triggerError.js"), s.prototype.validateInput = t("./validateInput.js"), e.exports = s }, { "./animateColors.js": 2, "./changeBlendingMode.js": 3, "./changeDirection.js": 4, "./changeState.js": 5, "./clear.js": 6, "./convertColorToRgba.js": 7, "./destroy.js": 8, "./eventPolyfill.js": 9, "./getColor.js": 10, "./getColorDiff.js": 11, "./getColorPos.js": 12, "./getColorPosDiff.js": 13, "./getCurrentColors.js": 14, "./getCurrentColorsPos.js": 15, "./getDimensions.js": 16, "./getElement.js": 17, "./getLightness.js": 18, "./makeGradient.js": 19, "./onResize.js": 20, "./onScroll.js": 21, "./pause.js": 22, "./pauseWhenNotInView.js": 23, "./play.js": 24, "./prepareImage.js": 25, "./refreshColorsAndPos.js": 26, "./setColors.js": 27, "./setDirection.js": 28, "./setSizeAttributes.js": 29, "./triggerError.js": 30, "./validateInput.js": 31 }], 2: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e, i, s, o = t - this.previousTimeStamp > 100,
				n = void 0 === this.states[this.activeState].loop || this.states[this.activeState].loop;
			(null === this.previousTimeStamp || o) && (this.previousTimeStamp = t), this.progress = this.progress + (t - this.previousTimeStamp), e = (this.progress / this.activetransitionSpeed * 100).toFixed(2), this.previousTimeStamp = t, this.refreshColorsAndPos(e), e < 100 ? this.animation = requestAnimationFrame(this.animateColors.bind(this)) : this.channelsIndex < this.states[this.activeState].gradients.length - 2 || n ? (this.isChangingState && (this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3, this.isChangingState = !1), this.previousTimeStamp = null, this.progress = 0, this.channelsIndex++, i = !1, this.channelsIndex === this.states[this.activeState].gradients.length - 1 ? i = !0 : this.channelsIndex === this.states[this.activeState].gradients.length && (this.channelsIndex = 0), s = void 0 === this.states[this.activeState].gradients[this.channelsIndex + 1] ? this.states[this.activeState].gradients[0] : this.states[this.activeState].gradients[this.channelsIndex + 1], this.setColors(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.callbacks.onGradientChange && this.callbacks.onGradientChange({ isLooping: i, colorsFrom: this.states[this.activeState].gradients[this.channelsIndex], colorsTo: s, activeState: this.activeState }), this.canvas.dispatchEvent(this.events.gradientChange({ isLooping: i, colorsFrom: this.states[this.activeState].gradients[this.channelsIndex], colorsTo: s, activeState: this.activeState }))) : (cancelAnimationFrame(this.animation), this.callbacks.onEnd && this.callbacks.onEnd(), this.canvas.dispatchEvent(new CustomEvent("granim:end"))) } }, {}], 3: [function(t, e, i) { "use strict";
		e.exports = function(t) { this.context.clearRect(0, 0, this.x1, this.y1), this.context.globalCompositeOperation = this.image.blendingMode = t, this.validateInput("blendingMode"), this.isPaused && this.refreshColorsAndPos() } }, {}], 4: [function(t, e, i) { "use strict";
		e.exports = function(t) { this.context.clearRect(0, 0, this.x1, this.y1), this.direction = t, this.validateInput("direction"), this.isPaused && this.refreshColorsAndPos() } }, {}], 5: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e = this;
			this.activeState !== t && (this.isPaused || (this.isPaused = !0, this.pause()), this.channelsIndex = -1, this.activetransitionSpeed = this.stateTransitionSpeed, this.activeColorsDiff = [], this.activeColorsPosDiff = [], this.activeColors = this.getCurrentColors(), this.activeColorsPos = this.getCurrentColorsPos(), this.progress = 0, this.previousTimeStamp = null, this.isChangingState = !0, this.states[t].gradients[0].forEach(function(t, i, s) { var o = e.convertColorToRgba(e.getColor(t)),
					n = e.getColorPos(t, i),
					r = e.getColorDiff(e.activeColors[i], o),
					a = e.getColorPosDiff(e.activeColorsPos[i], n);
				e.activeColorsDiff.push(r), e.activeColorsPosDiff.push(a) }), this.activeState = t, this.play()) } }, {}], 6: [function(t, e, i) { "use strict";
		e.exports = function() { this.isPaused ? this.isPaused = !1 : cancelAnimationFrame(this.animation), this.isCleared = !0, this.context.clearRect(0, 0, this.x1, this.y1) } }, {}], 7: [function(t, e, i) { "use strict";

		function s(t) { var e = Object.keys(h),
				i = 0; for (i; i < e.length; i++)
				if (a = h[e[i]].exec(t)) return e[i]; return !1 }

		function o(t) { var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			t = t.replace(e, function(t, e, i, s) { return e + e + i + i + s + s }); var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t); return i ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16), 1] : null }

		function n(t, e, i) { return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t }

		function r(t, e, i, s) { var o, r, a, h, c; return 0 === e ? o = r = a = i : (h = i < .5 ? i * (1 + e) : i + e - i * e, c = 2 * i - h, o = n(c, h, t + 1 / 3), r = n(c, h, t), a = n(c, h, t - 1 / 3)), [Math.round(255 * o), Math.round(255 * r), Math.round(255 * a), s] } var a, h = { hexa: /^#(?:[0-9a-fA-F]{3}){1,2}$/, rgba: /^rgba\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(.?\d{1,3})\)$/, rgb: /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/, hsla: /^hsla\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%, ?(.?\d{1,3})\)$/, hsl: /^hsl\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%\)$/ };
		e.exports = function(t) { switch (s(t)) {
				default:
					this.triggerError("colorType");
				case "hexa":
					return o(t);
				case "rgba":
					return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10), parseFloat(a[4])];
				case "rgb":
					return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10), 1];
				case "hsla":
					return r(parseInt(a[1], 10) / 360, parseInt(a[2], 10) / 100, parseInt(a[3], 10) / 100, parseFloat(a[4]));
				case "hsl":
					return r(parseInt(a[1], 10) / 360, parseInt(a[2], 10) / 100, parseInt(a[3], 10) / 100, 1) } } }, {}], 8: [function(t, e, i) { "use strict";
		e.exports = function() { this.onResize("removeListeners"), this.onScroll("removeListeners"), this.clear() } }, {}], 9: [function(t, e, i) { "use strict";
		e.exports = function() {
			function t(t, e) { e = e || { bubbles: !1, cancelable: !1, detail: void 0 }; var i = document.createEvent("CustomEvent"); return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i } "function" != typeof window.CustomEvent && (t.prototype = window.Event.prototype, window.CustomEvent = t) } }, {}], 10: [function(t, e, i) { "use strict";
		e.exports = function(t) { return "string" == typeof t ? t : "object" == typeof t && t.color ? t.color : void this.triggerError("gradient.color") } }, {}], 11: [function(t, e, i) { "use strict";
		e.exports = function(t, e) { var i = 0,
				s = []; for (i; i < 4; i++) s.push(e[i] - t[i]); return s } }, {}], 12: [function(t, e, i) { "use strict";
		e.exports = function(t, e) { return "object" == typeof t && t.pos ? t.pos : parseFloat(e ? (1 / (this.gradientLength - 1) * e).toFixed(2) : 0) } }, {}], 13: [function(t, e, i) { "use strict";
		e.exports = function(t, e) { return e - t } }, {}], 14: [function(t, e, i) { "use strict";
		e.exports = function() { var t, e, i = []; for (t = 0; t < this.currentColors.length; t++)
				for (i.push([]), e = 0; e < 4; e++) i[t].push(this.currentColors[t][e]); return i } }, {}], 15: [function(t, e, i) { "use strict";
		e.exports = function() { var t, e = []; for (t = 0; t < this.currentColorsPos.length; t++) e.push(this.currentColorsPos[t]); return e } }, {}], 16: [function(t, e, i) { "use strict";
		e.exports = function() { this.x1 = this.canvas.offsetWidth, this.y1 = this.canvas.offsetHeight } }, {}], 17: [function(t, e, i) { "use strict";
		e.exports = function(t) { if (t instanceof HTMLCanvasElement) this.canvas = t;
			else { if ("string" != typeof t) throw new Error("The element you used is neither a String, nor a HTMLCanvasElement");
				this.canvas = document.querySelector(t) } if (!this.canvas) throw new Error("`" + t + "` could not be found in the DOM") } }, {}], 18: [function(t, e, i) { "use strict";
		e.exports = function() { var t, e, i = this.getCurrentColors(),
				s = null,
				o = i.map(function(t) { return Math.max(t[0], t[1], t[2]) }); for (e = 0; e < o.length; e++) s = null === s ? o[e] : s + o[e], e === o.length - 1 && (t = Math.round(s / (e + 1))); return t >= 128 ? "light" : "dark" } }, {}], 19: [function(t, e, i) { "use strict";
		e.exports = function() { var t = this.setDirection(),
				e = document.querySelector(this.elToSetClassOn).classList,
				i = 0; for (this.context.clearRect(0, 0, this.x1, this.y1), this.image && this.context.drawImage(this.imageNode, this.imagePosition.x, this.imagePosition.y, this.imagePosition.width, this.imagePosition.height), i; i < this.currentColors.length; i++) t.addColorStop(this.currentColorsPos[i], "rgba(" + this.currentColors[i][0] + ", " + this.currentColors[i][1] + ", " + this.currentColors[i][2] + ", " + this.currentColors[i][3] + ")");
			this.name && ("light" === this.getLightness() ? (e.remove(this.name + "-dark"), e.add(this.name + "-light")) : (e.remove(this.name + "-light"), e.add(this.name + "-dark"))), this.context.fillStyle = t, this.context.fillRect(0, 0, this.x1, this.y1) } }, {}], 20: [function(t, e, i) { "use strict";
		e.exports = function(t) { return "removeListeners" === t ? void window.removeEventListener("resize", this.setSizeAttributesNameSpace) : void window.addEventListener("resize", this.setSizeAttributesNameSpace) } }, {}], 21: [function(t, e, i) { "use strict";
		e.exports = function(t) { return "removeListeners" === t ? void window.removeEventListener("scroll", this.pauseWhenNotInViewNameSpace) : (window.addEventListener("scroll", this.pauseWhenNotInViewNameSpace), void this.pauseWhenNotInViewNameSpace()) } }, {}], 22: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e = "isPausedBecauseNotInView" === t;
			this.isCleared || (e || (this.isPaused = !0), cancelAnimationFrame(this.animation), this.animating = !1) } }, {}], 23: [function(t, e, i) { "use strict";
		e.exports = function() { var t = this;
			this.scrollDebounceTimeout && clearTimeout(this.scrollDebounceTimeout), this.scrollDebounceTimeout = setTimeout(function() { var e = t.canvas.getBoundingClientRect(); if (t.isCanvasInWindowView = !(e.bottom < 0 || e.right < 0 || e.left > window.innerWidth || e.top > window.innerHeight), t.isCanvasInWindowView) { if (!t.isPaused || t.firstScrollInit) { if (t.image && !t.isImgLoaded) return;
						t.isPausedBecauseNotInView = !1, t.play("isPlayedBecauseInView"), t.firstScrollInit = !1 } } else !t.image && t.firstScrollInit && (t.refreshColorsAndPos(), t.firstScrollInit = !1), t.isPaused || t.isPausedBecauseNotInView || (t.isPausedBecauseNotInView = !0, t.pause("isPausedBecauseNotInView")) }, this.scrollDebounceThreshold) } }, {}], 24: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e = "isPlayedBecauseInView" === t;
			e || (this.isPaused = !1), this.isCleared = !1, this.animating || (this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0) } }, {}], 25: [function(t, e, i) { "use strict";
		e.exports = function() {
			function t() {
				function t(t) { var i, s = e[t + "1"],
						o = e["x" === t ? "imgOriginalWidth" : "imgOriginalHeight"],
						n = "x" === t ? e.image.position[0] : e.image.position[1]; switch (n) {
						case "center":
							i = o > s ? -(o - s) / 2 : (s - o) / 2, e.imagePosition[t] = i, e.imagePosition["x" === t ? "width" : "height"] = o; break;
						case "top":
							e.imagePosition.y = 0, e.imagePosition.height = o; break;
						case "bottom":
							e.imagePosition.y = s - o, e.imagePosition.height = o; break;
						case "right":
							e.imagePosition.x = s - o, e.imagePosition.width = o; break;
						case "left":
							e.imagePosition.x = 0, e.imagePosition.width = o } if (e.image.stretchMode) switch (n = "x" === t ? e.image.stretchMode[0] : e.image.stretchMode[1]) {
						case "none":
							break;
						case "stretch":
							e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s; break;
						case "stretch-if-bigger":
							if (o < s) break;
							e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s; break;
						case "stretch-if-smaller":
							if (o > s) break;
							e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s } } var i, s; for (i = 0; i < 2; i++) s = i ? "y" : "x", t(s) } var e = this; return this.imagePosition || (this.imagePosition = { x: 0, y: 0, width: 0, height: 0 }), this.image.blendingMode && (this.context.globalCompositeOperation = this.image.blendingMode), this.imageNode ? void t() : (this.imageNode = new Image, this.imageNode.onerror = function() { throw new Error("Granim: The image source is invalid.") }, this.imageNode.onload = function() { e.imgOriginalWidth = e.imageNode.width, e.imgOriginalHeight = e.imageNode.height, t(), e.refreshColorsAndPos(), e.isPausedWhenNotInView && !e.isCanvasInWindowView || (e.animation = requestAnimationFrame(e.animateColors.bind(e))), e.isImgLoaded = !0 }, void(this.imageNode.src = this.image.source)) } }, {}], 26: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e, i, s, o, n = this; for (s = 0; s < this.activeColors.length; s++) { for (o = 0; o < 4; o++) e = n.activeColors[s][o] + (3 !== o ? Math.ceil(n.activeColorsDiff[s][o] / 100 * t) : Math.round(n.activeColorsDiff[s][o] / 100 * t * 100) / 100), e <= 255 && e >= 0 && (n.currentColors[s][o] = e);
				i = parseFloat((n.activeColorsPos[s] + n.activeColorsPosDiff[s] / 100 * t).toFixed(4)), i <= 1 && i >= 0 && (n.currentColorsPos[s] = i) } this.makeGradient() } }, {}], 27: [function(t, e, i) { "use strict";
		e.exports = function() { var t, e, i, s, o = this; return this.channels[this.activeState] || (this.channels[this.activeState] = []), void 0 !== this.channels[this.activeState][this.channelsIndex] ? (this.activeColors = this.channels[this.activeState][this.channelsIndex].colors, this.activeColorsDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff, this.activeColorsPos = this.channels[this.activeState][this.channelsIndex].colorsPos, void(this.activeColorsPosDiff = this.channels[this.activeState][this.channelsIndex].colorsPosDiff)) : (this.channels[this.activeState].push([{}]), this.channels[this.activeState][this.channelsIndex].colors = [], this.channels[this.activeState][this.channelsIndex].colorsDiff = [], this.channels[this.activeState][this.channelsIndex].colorsPos = [], this.channels[this.activeState][this.channelsIndex].colorsPosDiff = [], this.activeColors = [], this.activeColorsDiff = [], this.activeColorsPos = [], this.activeColorsPosDiff = [], this.states[this.activeState].gradients[this.channelsIndex].forEach(function(n, r) { var a = o.getColorPos(n, r),
					n = o.getColor(n),
					h = o.convertColorToRgba(n),
					c = o.channels[o.activeState];
				c[o.channelsIndex].colors.push(h), o.activeColors.push(h), c[o.channelsIndex].colorsPos.push(a), o.activeColorsPos.push(a), o.isCurrentColorsSet || (o.currentColors.push(o.convertColorToRgba(n)), o.currentColorsPos.push(a)), o.channelsIndex === o.states[o.activeState].gradients.length - 1 ? (t = o.getColorDiff(c[o.channelsIndex].colors[r], c[0].colors[r]), e = o.getColorPosDiff(c[o.channelsIndex].colorsPos[r], c[0].colorsPos[r])) : (i = o.convertColorToRgba(o.getColor(o.states[o.activeState].gradients[o.channelsIndex + 1][r])), s = o.getColorPos(o.states[o.activeState].gradients[o.channelsIndex + 1][r], r), t = o.getColorDiff(c[o.channelsIndex].colors[r], i), e = o.getColorPosDiff(c[o.channelsIndex].colorsPos[r], s)), c[o.channelsIndex].colorsDiff.push(t), o.activeColorsDiff.push(t), c[o.channelsIndex].colorsPosDiff.push(e), o.activeColorsPosDiff.push(e) }), this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3, void(this.isCurrentColorsSet = !0)) } }, {}], 28: [function(t, e, i) { "use strict";

		function s(t, e) { return t.indexOf("%") > -1 ? e / 100 * parseInt(t.split("%")[0], 10) : parseInt(t.split("px")[0], 10) } e.exports = function() { var t = this.context; switch (this.direction) {
				case "diagonal":
					return t.createLinearGradient(0, 0, this.x1, this.y1);
				case "left-right":
					return t.createLinearGradient(0, 0, this.x1, 0);
				case "top-bottom":
					return t.createLinearGradient(this.x1 / 2, 0, this.x1 / 2, this.y1);
				case "radial":
					return t.createRadialGradient(this.x1 / 2, this.y1 / 2, this.x1 / 2, this.x1 / 2, this.y1 / 2, 0);
				case "custom":
					return t.createLinearGradient(s(this.customDirection.x0, this.x1), s(this.customDirection.y0, this.y1), s(this.customDirection.x1, this.x1), s(this.customDirection.y1, this.y1)) } } }, {}], 29: [function(t, e, i) { "use strict";
		e.exports = function() { this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.image && this.prepareImage(), this.refreshColorsAndPos() } }, {}], 30: [function(t, e, i) { "use strict";
		e.exports = function(t) { var e = "https://sarcadass.github.io/granim.js/api.html"; throw new Error('Granim: Input error on "' + t + '" option.\nCheck the API ' + e + ".") } }, {}], 31: [function(t, e, i) { "use strict";

		function s(t) { for (var e, i = !0, s = 0; i && s < t.length;) { if (e = t[s], "string" != typeof e) i = !1;
				else { var o = null,
						n = null;
					e.indexOf("px") !== -1 && (n = "px"), e.indexOf("%") !== -1 && (n = "%"), o = e.split(n).filter(function(t) { return t.length > 0 }), (!n || o.length > 2 || !o[0] || o[1] || !/^-?\d+\.?\d*$/.test(o[0])) && (i = !1) } s++ } return i } e.exports = function(t) { var e = ["left", "center", "right"],
				i = ["top", "center", "bottom"],
				o = ["none", "stretch", "stretch-if-smaller", "stretch-if-bigger"],
				n = ["multiply", "screen", "normal", "overlay", "darken", "lighten", "lighter", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
				r = ["diagonal", "left-right", "top-bottom", "radial", "custom"]; switch (t) {
				case "image":
					Array.isArray(this.image.position) && 2 === this.image.position.length && e.indexOf(this.image.position[0]) !== -1 && i.indexOf(this.image.position[1]) !== -1 || this.triggerError("image.position"), this.image.stretchMode && (Array.isArray(this.image.stretchMode) && 2 === this.image.stretchMode.length && o.indexOf(this.image.stretchMode[0]) !== -1 && o.indexOf(this.image.stretchMode[1]) !== -1 || this.triggerError("image.stretchMode")); break;
				case "blendingMode":
					n.indexOf(this.image.blendingMode) === -1 && (this.clear(), this.triggerError("blendingMode")); break;
				case "direction":
					r.indexOf(this.direction) === -1 ? this.triggerError("direction") : "custom" === this.direction && (s([this.customDirection.x0, this.customDirection.x1, this.customDirection.y0, this.customDirection.y1]) || this.triggerError("customDirection")) } } }, {}], 32: [function(t, e, i) { window.Granim = t("./lib/Granim.js") }, { "./lib/Granim.js": 1 }] }, {}, [32]);

/* module svgAnimateCustom */
// function on
jQuery(document).ready(function() {
	svgAnimateCustomInit();
});
// function init
function svgAnimateCustomInit() {
	const calcPaths = (totalDur) => {
		// задаем класс 'animated' для body, что приведет к перезагрузке анимации
		document.body.classList.add('animated')
		// выбираем все SVG элементы - линии и точки
		const paths = document.querySelectorAll('.autograph__path')
		// объявляем переменную для длины path
		let len = 0
		// задаем переменную для времени задержки анимации
		let delay = 0
		// выходим если ни одного элемента не найдено
		if (!paths.length) {
			return false
		}
		// устанавливаем длительность анимации в секундах (если она не задана)
		const totalDuration = totalDur || 7
		// высчитываем общую длину path
		paths.forEach((path) => {
			const totalLen = path.getTotalLength()
			len += totalLen
		})
		paths.forEach((path) => {
			const pathElem = path
			// получаем текущую длину path
			const totalLen = path.getTotalLength()
			// получаем текущую продолжительность анимации
			const duration = totalLen / len * totalDuration
			// задаем задержку и продолжительность анимации
			pathElem.style.animationDuration = `${duration < 0.2 ? 0.2 : duration}s`
			pathElem.style.animationDelay = `${delay}s`
			// устанавливаем значения dasharray и dashoffset равными длине path
			// таким образом мы прячем линию
			pathElem.setAttribute('stroke-dasharray', totalLen)
			pathElem.setAttribute('stroke-dashoffset', totalLen)
			// устанавливаем задержку для следующего path
			// сейчас добавлено 0,2 секунды для большей реалистичности
			delay += duration + 0.2
		})
		// задаем для body класс 'animated' который запустит анимацию
		document.body.classList.add('animated')
		return true
	}
	calcPaths(10)
}

/* module ionCalendar */
// function on
jQuery(document).ready(function() {
	ionCalendarInit();
});
// function init
// more option see https://github.com/IonDen/ion.calendar
function ionCalendarInit() {
	// Date Picker
	$("#myDatePicker-1").ionDatePicker();
	// Calendar
	$("#myCalendar-1").ionCalendar({
		lang: "ru", // language
		sundayFirst: false, // first week day
		years: "80", // years diapason
		format: "DD.MM.YYYY", // date format
		onClick: function(date) { // click on day returns date
			console.log(date);
		}
	});
}

// plugin moment-with-locales.min.js
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Gd.apply(null,arguments)}function b(a){Gd=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return za(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(0/0);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Id.length>0)for(c in Id)d=Id[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(+b._d),Jd===!1&&(Jd=!0,a.updateOffset(this),Jd=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function q(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&p(a[d])!==p(b[d]))&&g++;return g+f}function r(){}function s(a){return a?a.toLowerCase().replace("_","-"):a}function t(a){for(var b,c,d,e,f=0;f<a.length;){for(e=s(a[f]).split("-"),b=e.length,c=s(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=u(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&q(e,c,!0)>=b-1)break;b--}f++}return null}function u(a){var b=null;if(!Kd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Hd._abbr,require("./locale/"+a),v(b)}catch(c){}return Kd[a]}function v(a,b){var c;return a&&(c="undefined"==typeof b?x(a):w(a,b),c&&(Hd=c)),Hd._abbr}function w(a,b){return null!==b?(b.abbr=a,Kd[a]||(Kd[a]=new r),Kd[a].set(b),v(a),Kd[a]):(delete Kd[a],null)}function x(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Hd;if(!c(a)){if(b=u(a))return b;a=[a]}return t(a)}function y(a,b){var c=a.toLowerCase();Ld[c]=Ld[c+"s"]=Ld[b]=a}function z(a){return"string"==typeof a?Ld[a]||Ld[a.toLowerCase()]:void 0}function A(a){var b,c,d={};for(c in a)f(a,c)&&(b=z(c),b&&(d[b]=a[c]));return d}function B(b,c){return function(d){return null!=d?(D(this,b,d),a.updateOffset(this,c),this):C(this,b)}}function C(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function D(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function E(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=z(a),"function"==typeof this[a])return this[a](b);return this}function F(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function G(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Pd[a]=e),b&&(Pd[b[0]]=function(){return F(e.apply(this,arguments),b[1],b[2])}),c&&(Pd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function H(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function I(a){var b,c,d=a.match(Md);for(b=0,c=d.length;c>b;b++)Pd[d[b]]?d[b]=Pd[d[b]]:d[b]=H(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function J(a,b){return a.isValid()?(b=K(b,a.localeData()),Od[b]||(Od[b]=I(b)),Od[b](a)):a.localeData().invalidDate()}function K(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Nd.lastIndex=0;d>=0&&Nd.test(a);)a=a.replace(Nd,c),Nd.lastIndex=0,d-=1;return a}function L(a,b,c){ce[a]="function"==typeof b?b:function(a){return a&&c?c:b}}function M(a,b){return f(ce,a)?ce[a](b._strict,b._locale):new RegExp(N(a))}function N(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function O(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=p(a)}),c=0;c<a.length;c++)de[a[c]]=d}function P(a,b){O(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function Q(a,b,c){null!=b&&f(de,a)&&de[a](b,c._a,c,a)}function R(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function S(a){return this._months[a.month()]}function T(a){return this._monthsShort[a.month()]}function U(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function V(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),R(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function W(b){return null!=b?(V(this,b),a.updateOffset(this,!0),this):C(this,"Month")}function X(){return R(this.year(),this.month())}function Y(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[fe]<0||c[fe]>11?fe:c[ge]<1||c[ge]>R(c[ee],c[fe])?ge:c[he]<0||c[he]>24||24===c[he]&&(0!==c[ie]||0!==c[je]||0!==c[ke])?he:c[ie]<0||c[ie]>59?ie:c[je]<0||c[je]>59?je:c[ke]<0||c[ke]>999?ke:-1,j(a)._overflowDayOfYear&&(ee>b||b>ge)&&(b=ge),j(a).overflow=b),a}function Z(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function $(a,b){var c=!0,d=a+"\n"+(new Error).stack;return g(function(){return c&&(Z(d),c=!1),b.apply(this,arguments)},b)}function _(a,b){ne[a]||(Z(b),ne[a]=!0)}function aa(a){var b,c,d=a._i,e=oe.exec(d);if(e){for(j(a).iso=!0,b=0,c=pe.length;c>b;b++)if(pe[b][1].exec(d)){a._f=pe[b][0]+(e[6]||" ");break}for(b=0,c=qe.length;c>b;b++)if(qe[b][1].exec(d)){a._f+=qe[b][0];break}d.match(_d)&&(a._f+="Z"),ta(a)}else a._isValid=!1}function ba(b){var c=re.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(aa(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ca(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function da(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ea(a){return fa(a)?366:365}function fa(a){return a%4===0&&a%100!==0||a%400===0}function ga(){return fa(this.year())}function ha(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Aa(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ia(a){return ha(a,this._week.dow,this._week.doy).week}function ja(){return this._week.dow}function ka(){return this._week.doy}function la(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function ma(a){var b=ha(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function na(a,b,c,d,e){var f,g,h=da(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:ea(a-1)+g}}function oa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function pa(a,b,c){return null!=a?a:null!=b?b:c}function qa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ra(a){var b,c,d,e,f=[];if(!a._d){for(d=qa(a),a._w&&null==a._a[ge]&&null==a._a[fe]&&sa(a),a._dayOfYear&&(e=pa(a._a[ee],d[ee]),a._dayOfYear>ea(e)&&(j(a)._overflowDayOfYear=!0),c=da(e,0,a._dayOfYear),a._a[fe]=c.getUTCMonth(),a._a[ge]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[he]&&0===a._a[ie]&&0===a._a[je]&&0===a._a[ke]&&(a._nextDay=!0,a._a[he]=0),a._d=(a._useUTC?da:ca).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[he]=24)}}function sa(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=pa(b.GG,a._a[ee],ha(Aa(),1,4).year),d=pa(b.W,1),e=pa(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=pa(b.gg,a._a[ee],ha(Aa(),f,g).year),d=pa(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=na(c,d,e,g,f),a._a[ee]=h.year,a._dayOfYear=h.dayOfYear}function ta(b){if(b._f===a.ISO_8601)return void aa(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=K(b._f,b._locale).match(Md)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(M(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Pd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),Q(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[he]<=12&&b._a[he]>0&&(j(b).bigHour=void 0),b._a[he]=ua(b._locale,b._a[he],b._meridiem),ra(b),Y(b)}function ua(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function va(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(0/0));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],ta(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function wa(a){if(!a._d){var b=A(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ra(a)}}function xa(a){var b,e=a._i,f=a._f;return a._locale=a._locale||x(a._l),null===e||void 0===f&&""===e?l({nullInput:!0}):("string"==typeof e&&(a._i=e=a._locale.preparse(e)),o(e)?new n(Y(e)):(c(f)?va(a):f?ta(a):d(e)?a._d=e:ya(a),b=new n(Y(a)),b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b))}function ya(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?ba(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ra(b)):"object"==typeof f?wa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function za(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,xa(f)}function Aa(a,b,c,d){return za(a,b,c,d,!1)}function Ba(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Aa();for(d=b[0],e=1;e<b.length;++e)b[e][a](d)&&(d=b[e]);return d}function Ca(){var a=[].slice.call(arguments,0);return Ba("isBefore",a)}function Da(){var a=[].slice.call(arguments,0);return Ba("isAfter",a)}function Ea(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=x(),this._bubble()}function Fa(a){return a instanceof Ea}function Ga(a,b){G(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+F(~~(a/60),2)+b+F(~~a%60,2)})}function Ha(a){var b=(a||"").match(_d)||[],c=b[b.length-1]||[],d=(c+"").match(we)||["-",0,0],e=+(60*d[1])+p(d[2]);return"+"===d[0]?e:-e}function Ia(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Aa(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Aa(b).local();return c._isUTC?Aa(b).zone(c._offset||0):Aa(b).local()}function Ja(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ka(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ha(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ja(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?$a(this,Va(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ja(this)}function La(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Ma(a){return this.utcOffset(0,a)}function Na(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ja(this),"m")),this}function Oa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ha(this._i)),this}function Pa(a){return a=a?Aa(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Qa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ra(){if(this._a){var a=this._isUTC?h(this._a):Aa(this._a);return this.isValid()&&q(this._a,a.toArray())>0}return!1}function Sa(){return!this._isUTC}function Ta(){return this._isUTC}function Ua(){return this._isUTC&&0===this._offset}function Va(a,b){var c,d,e,g=a,h=null;return Fa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=xe.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:p(h[ge])*c,h:p(h[he])*c,m:p(h[ie])*c,s:p(h[je])*c,ms:p(h[ke])*c}):(h=ye.exec(a))?(c="-"===h[1]?-1:1,g={y:Wa(h[2],c),M:Wa(h[3],c),d:Wa(h[4],c),h:Wa(h[5],c),m:Wa(h[6],c),s:Wa(h[7],c),w:Wa(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Ya(Aa(g.from),Aa(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ea(g),Fa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Wa(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Xa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Ya(a,b){var c;return b=Ia(b,a),a.isBefore(b)?c=Xa(a,b):(c=Xa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function Za(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(_(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Va(c,d),$a(this,e,a),this}}function $a(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&D(b,"Date",C(b,"Date")+g*d),h&&V(b,C(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function _a(a){var b=a||Aa(),c=Ia(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,Aa(b)))}function ab(){return new n(this)}function bb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this>+a):(c=o(a)?+a:+Aa(a),c<+this.clone().startOf(b))}function cb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+a>+this):(c=o(a)?+a:+Aa(a),+this.clone().endOf(b)<c)}function db(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function eb(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this===+a):(c=+Aa(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function fb(a){return 0>a?Math.ceil(a):Math.floor(a)}function gb(a,b,c){var d,e,f=Ia(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=hb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:fb(e)}function hb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function ib(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function jb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():J(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):J(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function kb(b){var c=J(this,b||a.defaultFormat);return this.localeData().postformat(c)}function lb(a,b){return this.isValid()?Va({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mb(a){return this.from(Aa(),a)}function nb(a,b){return this.isValid()?Va({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.to(Aa(),a)}function pb(a){var b;return void 0===a?this._locale._abbr:(b=x(a),null!=b&&(this._locale=b),this)}function qb(){return this._locale}function rb(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sb(a){return a=z(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function tb(){return+this._d-6e4*(this._offset||0)}function ub(){return Math.floor(+this/1e3)}function vb(){return this._offset?new Date(+this):this._d}function wb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xb(){return k(this)}function yb(){return g({},j(this))}function zb(){return j(this).overflow}function Ab(a,b){G(0,[a,a.length],0,b)}function Bb(a,b,c){return ha(Aa([a,11,31+b-c]),b,c).week}function Cb(a){var b=ha(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Db(a){var b=ha(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Eb(){return Bb(this.year(),1,4)}function Fb(){var a=this.localeData()._week;return Bb(this.year(),a.dow,a.doy)}function Gb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Hb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Ib(a){return this._weekdays[a.day()]}function Jb(a){return this._weekdaysShort[a.day()]}function Kb(a){return this._weekdaysMin[a.day()]}function Lb(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Aa([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Mb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Hb(a,this.localeData()),this.add(a-b,"d")):b}function Nb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ob(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Pb(a,b){G(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Qb(a,b){return b._meridiemParse}function Rb(a){return"p"===(a+"").toLowerCase().charAt(0)}function Sb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Tb(a){G(0,[a,3],0,"millisecond")}function Ub(){return this._isUTC?"UTC":""}function Vb(){return this._isUTC?"Coordinated Universal Time":""}function Wb(a){return Aa(1e3*a)}function Xb(){return Aa.apply(null,arguments).parseZone()}function Yb(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function Zb(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b}function $b(){return this._invalidDate}function _b(a){return this._ordinal.replace("%d",a)}function ac(a){return a}function bc(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function cc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function dc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ec(a,b,c,d){var e=x(),f=h().set(d,b);return e[c](f,a)}function fc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return ec(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=ec(a,f,c,e);return g}function gc(a,b){return fc(a,b,"months",12,"month")}function hc(a,b){return fc(a,b,"monthsShort",12,"month")}function ic(a,b){return fc(a,b,"weekdays",7,"day")}function jc(a,b){return fc(a,b,"weekdaysShort",7,"day")}function kc(a,b){return fc(a,b,"weekdaysMin",7,"day")}function lc(){var a=this._data;return this._milliseconds=Ue(this._milliseconds),this._days=Ue(this._days),this._months=Ue(this._months),a.milliseconds=Ue(a.milliseconds),a.seconds=Ue(a.seconds),a.minutes=Ue(a.minutes),a.hours=Ue(a.hours),a.months=Ue(a.months),a.years=Ue(a.years),this}function mc(a,b,c,d){var e=Va(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function nc(a,b){return mc(this,a,b,1)}function oc(a,b){return mc(this,a,b,-1)}function pc(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;return g.milliseconds=d%1e3,a=fb(d/1e3),g.seconds=a%60,b=fb(a/60),g.minutes=b%60,c=fb(b/60),g.hours=c%24,e+=fb(c/24),h=fb(qc(e)),e-=fb(rc(h)),f+=fb(e/30),e%=30,h+=fb(f/12),f%=12,g.days=e,g.months=f,g.years=h,this}function qc(a){return 400*a/146097}function rc(a){return 146097*a/400}function sc(a){var b,c,d=this._milliseconds;if(a=z(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+12*qc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(rc(this._months/12)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function tc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)}function uc(a){return function(){return this.as(a)}}function vc(a){return a=z(a),this[a+"s"]()}function wc(a){return function(){return this._data[a]}}function xc(){return fb(this.days()/7)}function yc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function zc(a,b,c){var d=Va(a).abs(),e=jf(d.as("s")),f=jf(d.as("m")),g=jf(d.as("h")),h=jf(d.as("d")),i=jf(d.as("M")),j=jf(d.as("y")),k=e<kf.s&&["s",e]||1===f&&["m"]||f<kf.m&&["mm",f]||1===g&&["h"]||g<kf.h&&["hh",g]||1===h&&["d"]||h<kf.d&&["dd",h]||1===i&&["M"]||i<kf.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,yc.apply(null,k)}function Ac(a,b){return void 0===kf[a]?!1:void 0===b?kf[a]:(kf[a]=b,!0)}function Bc(a){var b=this.localeData(),c=zc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Cc(){var a=lf(this.years()),b=lf(this.months()),c=lf(this.days()),d=lf(this.hours()),e=lf(this.minutes()),f=lf(this.seconds()+this.milliseconds()/1e3),g=this.asSeconds();return g?(0>g?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}
//! moment.js locale configuration
//! locale : belarusian (be)
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire
function Dc(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Ec(a,b,c){var d={mm:b?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:b?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===c?b?"хвіліна":"хвіліну":"h"===c?b?"гадзіна":"гадзіну":a+" "+Dc(d[c],+a)}function Fc(a,b){var c={nominative:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"),accusative:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function Gc(a,b){var c={nominative:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),accusative:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_")},d=/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/.test(b)?"accusative":"nominative";return c[d][a.day()]}
//! moment.js locale configuration
//! locale : breton (br)
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
function Hc(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+Kc(d[c],a)}function Ic(a){switch(Jc(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function Jc(a){return a>9?Jc(a%10):a}function Kc(a,b){return 2===b?Lc(a):a}function Lc(a){var b={m:"v",b:"v",d:"z"};return void 0===b[a.charAt(0)]?a:b[a.charAt(0)]+a.substring(1)}
//! moment.js locale configuration
//! locale : bosnian (bs)
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković
function Mc(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function Nc(a){return a>1&&5>a&&1!==~~(a/10)}function Oc(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekund":"pár sekundami";case"m":return b?"minuta":d?"minutu":"minutou";case"mm":return b||d?e+(Nc(a)?"minuty":"minut"):e+"minutami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(Nc(a)?"hodiny":"hodin"):e+"hodinami";break;case"d":return b||d?"den":"dnem";case"dd":return b||d?e+(Nc(a)?"dny":"dní"):e+"dny";break;case"M":return b||d?"měsíc":"měsícem";case"MM":return b||d?e+(Nc(a)?"měsíce":"měsíců"):e+"měsíci";break;case"y":return b||d?"rok":"rokem";case"yy":return b||d?e+(Nc(a)?"roky":"let"):e+"lety"}}
//! moment.js locale configuration
//! locale : austrian german (de-at)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
function Pc(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : german (de)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
function Qc(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : estonian (et)
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka
function Rc(a,b,c,d){var e={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[a+" minuti",a+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[a+" tunni",a+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[a+" kuu",a+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[a+" aasta",a+" aastat"]};return b?e[c][2]?e[c][2]:e[c][1]:d?e[c][0]:e[c][1]}function Sc(a,b,c,d){var e="";switch(c){case"s":return d?"muutaman sekunnin":"muutama sekunti";case"m":return d?"minuutin":"minuutti";case"mm":e=d?"minuutin":"minuuttia";break;case"h":return d?"tunnin":"tunti";case"hh":e=d?"tunnin":"tuntia";break;case"d":return d?"päivän":"päivä";case"dd":e=d?"päivän":"päivää";break;case"M":return d?"kuukauden":"kuukausi";case"MM":e=d?"kuukauden":"kuukautta";break;case"y":return d?"vuoden":"vuosi";case"yy":e=d?"vuoden":"vuotta"}return e=Tc(a,d)+" "+e}function Tc(a,b){return 10>a?b?If[a]:Hf[a]:a}
//! moment.js locale configuration
//! locale : hrvatski (hr)
//! author : Bojan Marković : https://github.com/bmarkovic
function Uc(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function Vc(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function Wc(a){return(a?"":"[múlt] ")+"["+Nf[this.day()]+"] LT[-kor]"}
//! moment.js locale configuration
//! locale : Armenian (hy-am)
//! author : Armendarabyan : https://github.com/armendarabyan
function Xc(a,b){var c={nominative:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),accusative:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function Yc(a,b){var c="հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");return c[a.month()]}function Zc(a,b){var c="կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");return c[a.day()]}
//! moment.js locale configuration
//! locale : icelandic (is)
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
function $c(a){return a%100===11?!0:a%10===1?!1:!0}function _c(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return b?"mínúta":"mínútu";case"mm":return $c(a)?e+(b||d?"mínútur":"mínútum"):b?e+"mínúta":e+"mínútu";case"hh":return $c(a)?e+(b||d?"klukkustundir":"klukkustundum"):e+"klukkustund";case"d":return b?"dagur":d?"dag":"degi";case"dd":return $c(a)?b?e+"dagar":e+(d?"daga":"dögum"):b?e+"dagur":e+(d?"dag":"degi");case"M":return b?"mánuður":d?"mánuð":"mánuði";case"MM":return $c(a)?b?e+"mánuðir":e+(d?"mánuði":"mánuðum"):b?e+"mánuður":e+(d?"mánuð":"mánuði");case"y":return b||d?"ár":"ári";case"yy":return $c(a)?e+(b||d?"ár":"árum"):e+(b||d?"ár":"ári")}}
//! moment.js locale configuration
//! locale : Georgian (ka)
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
function ad(a,b){var c={nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},d=/D[oD] *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function bd(a,b){var c={nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")},d=/(წინა|შემდეგ)/.test(b)?"accusative":"nominative";return c[d][a.day()]}
//! moment.js locale configuration
//! locale : Luxembourgish (lb)
//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
function cd(a,b,c,d){var e={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return b?e[c][0]:e[c][1]}function dd(a){var b=a.substr(0,a.indexOf(" "));return fd(b)?"a "+a:"an "+a}function ed(a){var b=a.substr(0,a.indexOf(" "));return fd(b)?"viru "+a:"virun "+a}function fd(a){if(a=parseInt(a,10),isNaN(a))return!1;if(0>a)return!0;if(10>a)return a>=4&&7>=a?!0:!1;if(100>a){var b=a%10,c=a/10;return fd(0===b?c:b)}if(1e4>a){for(;a>=10;)a/=10;return fd(a)}return a/=1e3,fd(a)}function gd(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function hd(a,b,c,d){return b?jd(c)[0]:d?jd(c)[1]:jd(c)[2]}function id(a){return a%10===0||a>10&&20>a}function jd(a){return Of[a].split("_")}function kd(a,b,c,d){var e=a+" ";return 1===a?e+hd(a,b,c[0],d):b?e+(id(a)?jd(c)[1]:jd(c)[0]):d?e+jd(c)[1]:e+(id(a)?jd(c)[1]:jd(c)[2])}function ld(a,b){var c=-1===b.indexOf("dddd HH:mm"),d=Pf[a.day()];return c?d:d.substring(0,d.length-2)+"į"}function md(a,b,c){return c?b%10===1&&11!==b?a[2]:a[3]:b%10===1&&11!==b?a[0]:a[1]}function nd(a,b,c){return a+" "+md(Qf[c],a,b)}function od(a,b,c){return md(Qf[c],a,b)}function pd(a,b){return b?"dažas sekundes":"dažām sekundēm"}function qd(a){return 5>a%10&&a%10>1&&~~(a/10)%10!==1}function rd(a,b,c){var d=a+" ";switch(c){case"m":return b?"minuta":"minutę";case"mm":return d+(qd(a)?"minuty":"minut");case"h":return b?"godzina":"godzinę";case"hh":return d+(qd(a)?"godziny":"godzin");case"MM":return d+(qd(a)?"miesiące":"miesięcy");case"yy":return d+(qd(a)?"lata":"lat")}}
//! moment.js locale configuration
//! locale : romanian (ro)
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
function sd(a,b,c){var d={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},e=" ";return(a%100>=20||a>=100&&a%100===0)&&(e=" de "),a+e+d[c]}
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
function td(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function ud(a,b,c){var d={mm:b?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===c?b?"минута":"минуту":a+" "+td(d[c],+a)}function vd(a,b){var c={nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function wd(a,b){var c={nominative:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function xd(a,b){var c={nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")},d=/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/.test(b)?"accusative":"nominative";return c[d][a.day()]}function yd(a){return a>1&&5>a}function zd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekúnd":"pár sekundami";case"m":return b?"minúta":d?"minútu":"minútou";case"mm":return b||d?e+(yd(a)?"minúty":"minút"):e+"minútami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(yd(a)?"hodiny":"hodín"):e+"hodinami";break;case"d":return b||d?"deň":"dňom";case"dd":return b||d?e+(yd(a)?"dni":"dní"):e+"dňami";break;case"M":return b||d?"mesiac":"mesiacom";case"MM":return b||d?e+(yd(a)?"mesiace":"mesiacov"):e+"mesiacmi";break;case"y":return b||d?"rok":"rokom";case"yy":return b||d?e+(yd(a)?"roky":"rokov"):e+"rokmi"}}
//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert Sedovšek : https://github.com/sedovsek
function Ad(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nekaj sekund":"nekaj sekundami";case"m":return b?"ena minuta":"eno minuto";case"mm":return e+=1===a?b?"minuta":"minuto":2===a?b||d?"minuti":"minutama":5>a?b||d?"minute":"minutami":b||d?"minut":"minutami";case"h":return b?"ena ura":"eno uro";case"hh":return e+=1===a?b?"ura":"uro":2===a?b||d?"uri":"urama":5>a?b||d?"ure":"urami":b||d?"ur":"urami";case"d":return b||d?"en dan":"enim dnem";case"dd":return e+=1===a?b||d?"dan":"dnem":2===a?b||d?"dni":"dnevoma":b||d?"dni":"dnevi";case"M":return b||d?"en mesec":"enim mesecem";case"MM":return e+=1===a?b||d?"mesec":"mesecem":2===a?b||d?"meseca":"mesecema":5>a?b||d?"mesece":"meseci":b||d?"mesecev":"meseci";case"y":return b||d?"eno leto":"enim letom";case"yy":return e+=1===a?b||d?"leto":"letom":2===a?b||d?"leti":"letoma":5>a?b||d?"leta":"leti":b||d?"let":"leti"}}
//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire
function Bd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Cd(a,b,c){var d={mm:"хвилина_хвилини_хвилин",hh:"година_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===c?b?"хвилина":"хвилину":"h"===c?b?"година":"годину":a+" "+Bd(d[c],+a)}function Dd(a,b){var c={nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")},d=/D[oD]? *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function Ed(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function Fd(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}var Gd,Hd,Id=a.momentProperties=[],Jd=!1,Kd={},Ld={},Md=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Nd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Od={},Pd={},Qd=/\d/,Rd=/\d\d/,Sd=/\d{3}/,Td=/\d{4}/,Ud=/[+-]?\d{6}/,Vd=/\d\d?/,Wd=/\d{1,3}/,Xd=/\d{1,4}/,Yd=/[+-]?\d{1,6}/,Zd=/\d+/,$d=/[+-]?\d+/,_d=/Z|[+-]\d\d:?\d\d/gi,ae=/[+-]?\d+(\.\d{1,3})?/,be=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,ce={},de={},ee=0,fe=1,ge=2,he=3,ie=4,je=5,ke=6;G("M",["MM",2],"Mo",function(){return this.month()+1}),G("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),G("MMMM",0,0,function(a){return this.localeData().months(this,a)}),y("month","M"),L("M",Vd),L("MM",Vd,Rd),L("MMM",be),L("MMMM",be),O(["M","MM"],function(a,b){b[fe]=p(a)-1}),O(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[fe]=e:j(c).invalidMonth=a});var le="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),me="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ne={};a.suppressDeprecationWarnings=!1;var oe=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,pe=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],qe=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],re=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=$("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),G(0,["YY",2],0,function(){return this.year()%100}),G(0,["YYYY",4],0,"year"),G(0,["YYYYY",5],0,"year"),G(0,["YYYYYY",6,!0],0,"year"),y("year","y"),L("Y",$d),L("YY",Vd,Rd),L("YYYY",Xd,Td),L("YYYYY",Yd,Ud),L("YYYYYY",Yd,Ud),O(["YYYY","YYYYY","YYYYYY"],ee),O("YY",function(b,c){c[ee]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return p(a)+(p(a)>68?1900:2e3)};var se=B("FullYear",!1);G("w",["ww",2],"wo","week"),G("W",["WW",2],"Wo","isoWeek"),y("week","w"),y("isoWeek","W"),L("w",Vd),L("ww",Vd,Rd),L("W",Vd),L("WW",Vd,Rd),P(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=p(a)});var te={dow:0,doy:6};G("DDD",["DDDD",3],"DDDo","dayOfYear"),y("dayOfYear","DDD"),L("DDD",Wd),L("DDDD",Sd),O(["DDD","DDDD"],function(a,b,c){c._dayOfYear=p(a)}),a.ISO_8601=function(){};var ue=$("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this>a?this:a}),ve=$("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return a>this?this:a});Ga("Z",":"),Ga("ZZ",""),L("Z",_d),L("ZZ",_d),O(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ha(a)});var we=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var xe=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,ye=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Va.fn=Ea.prototype;var ze=Za(1,"add"),Ae=Za(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Be=$("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});G(0,["gg",2],0,function(){return this.weekYear()%100}),G(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ab("gggg","weekYear"),Ab("ggggg","weekYear"),Ab("GGGG","isoWeekYear"),Ab("GGGGG","isoWeekYear"),y("weekYear","gg"),y("isoWeekYear","GG"),L("G",$d),L("g",$d),L("GG",Vd,Rd),L("gg",Vd,Rd),L("GGGG",Xd,Td),L("gggg",Xd,Td),L("GGGGG",Yd,Ud),L("ggggg",Yd,Ud),P(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=p(a)}),P(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),G("Q",0,0,"quarter"),y("quarter","Q"),L("Q",Qd),O("Q",function(a,b){b[fe]=3*(p(a)-1)}),G("D",["DD",2],"Do","date"),y("date","D"),L("D",Vd),L("DD",Vd,Rd),L("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),O(["D","DD"],ge),O("Do",function(a,b){b[ge]=p(a.match(Vd)[0],10)});var Ce=B("Date",!0);G("d",0,"do","day"),G("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),G("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),G("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),G("e",0,0,"weekday"),G("E",0,0,"isoWeekday"),y("day","d"),y("weekday","e"),y("isoWeekday","E"),L("d",Vd),L("e",Vd),L("E",Vd),L("dd",be),L("ddd",be),L("dddd",be),P(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),P(["d","e","E"],function(a,b,c,d){b[d]=p(a)});var De="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Ee="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Fe="Su_Mo_Tu_We_Th_Fr_Sa".split("_");G("H",["HH",2],0,"hour"),G("h",["hh",2],0,function(){return this.hours()%12||12}),Pb("a",!0),Pb("A",!1),y("hour","h"),L("a",Qb),L("A",Qb),L("H",Vd),L("h",Vd),L("HH",Vd,Rd),L("hh",Vd,Rd),O(["H","HH"],he),O(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),O(["h","hh"],function(a,b,c){b[he]=p(a),j(c).bigHour=!0});var Ge=/[ap]\.?m?\.?/i,He=B("Hours",!0);G("m",["mm",2],0,"minute"),y("minute","m"),L("m",Vd),L("mm",Vd,Rd),O(["m","mm"],ie);var Ie=B("Minutes",!1);G("s",["ss",2],0,"second"),y("second","s"),L("s",Vd),L("ss",Vd,Rd),O(["s","ss"],je);var Je=B("Seconds",!1);G("S",0,0,function(){return~~(this.millisecond()/100)}),G(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Tb("SSS"),Tb("SSSS"),y("millisecond","ms"),L("S",Wd,Qd),L("SS",Wd,Rd),L("SSS",Wd,Sd),L("SSSS",Zd),O(["S","SS","SSS","SSSS"],function(a,b){b[ke]=p(1e3*("0."+a))});var Ke=B("Milliseconds",!1);G("z",0,0,"zoneAbbr"),G("zz",0,0,"zoneName");var Le=n.prototype;Le.add=ze,Le.calendar=_a,Le.clone=ab,Le.diff=gb,Le.endOf=sb,Le.format=kb,Le.from=lb,Le.fromNow=mb,Le.to=nb,Le.toNow=ob,Le.get=E,Le.invalidAt=zb,Le.isAfter=bb,Le.isBefore=cb,Le.isBetween=db,Le.isSame=eb,Le.isValid=xb,Le.lang=Be,Le.locale=pb,Le.localeData=qb,Le.max=ve,Le.min=ue,Le.parsingFlags=yb,Le.set=E,Le.startOf=rb,Le.subtract=Ae,Le.toArray=wb,Le.toDate=vb,Le.toISOString=jb,Le.toJSON=jb,Le.toString=ib,Le.unix=ub,Le.valueOf=tb,Le.year=se,Le.isLeapYear=ga,Le.weekYear=Cb,Le.isoWeekYear=Db,Le.quarter=Le.quarters=Gb,Le.month=W,Le.daysInMonth=X,Le.week=Le.weeks=la,Le.isoWeek=Le.isoWeeks=ma,Le.weeksInYear=Fb,Le.isoWeeksInYear=Eb,Le.date=Ce,Le.day=Le.days=Mb,Le.weekday=Nb,Le.isoWeekday=Ob,Le.dayOfYear=oa,Le.hour=Le.hours=He,Le.minute=Le.minutes=Ie,Le.second=Le.seconds=Je,Le.millisecond=Le.milliseconds=Ke,Le.utcOffset=Ka,Le.utc=Ma,Le.local=Na,Le.parseZone=Oa,Le.hasAlignedHourOffset=Pa,Le.isDST=Qa,Le.isDSTShifted=Ra,Le.isLocal=Sa,Le.isUtcOffset=Ta,Le.isUtc=Ua,Le.isUTC=Ua,Le.zoneAbbr=Ub,Le.zoneName=Vb,Le.dates=$("dates accessor is deprecated. Use date instead.",Ce),Le.months=$("months accessor is deprecated. Use month instead",W),Le.years=$("years accessor is deprecated. Use year instead",se),Le.zone=$("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",La);var Me=Le,Ne={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Oe={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},Pe="Invalid date",Qe="%d",Re=/\d{1,2}/,Se={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Te=r.prototype;Te._calendar=Ne,Te.calendar=Yb,Te._longDateFormat=Oe,Te.longDateFormat=Zb,Te._invalidDate=Pe,Te.invalidDate=$b,Te._ordinal=Qe,Te.ordinal=_b,Te._ordinalParse=Re,Te.preparse=ac,Te.postformat=ac,Te._relativeTime=Se,Te.relativeTime=bc,Te.pastFuture=cc,Te.set=dc,Te.months=S,Te._months=le,Te.monthsShort=T,Te._monthsShort=me,Te.monthsParse=U,Te.week=ia,Te._week=te,Te.firstDayOfYear=ka,Te.firstDayOfWeek=ja,Te.weekdays=Ib,Te._weekdays=De,Te.weekdaysMin=Kb,Te._weekdaysMin=Fe,Te.weekdaysShort=Jb,Te._weekdaysShort=Ee,Te.weekdaysParse=Lb,Te.isPM=Rb,Te._meridiemParse=Ge,Te.meridiem=Sb,v("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===p(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=$("moment.lang is deprecated. Use moment.locale instead.",v),a.langData=$("moment.langData is deprecated. Use moment.localeData instead.",x);var Ue=Math.abs,Ve=uc("ms"),We=uc("s"),Xe=uc("m"),Ye=uc("h"),Ze=uc("d"),$e=uc("w"),_e=uc("M"),af=uc("y"),bf=wc("milliseconds"),cf=wc("seconds"),df=wc("minutes"),ef=wc("hours"),ff=wc("days"),gf=wc("months"),hf=wc("years"),jf=Math.round,kf={s:45,m:45,h:22,d:26,M:11},lf=Math.abs,mf=Ea.prototype;mf.abs=lc,mf.add=nc,mf.subtract=oc,mf.as=sc,mf.asMilliseconds=Ve,mf.asSeconds=We,mf.asMinutes=Xe,mf.asHours=Ye,mf.asDays=Ze,mf.asWeeks=$e,mf.asMonths=_e,mf.asYears=af,mf.valueOf=tc,mf._bubble=pc,mf.get=vc,mf.milliseconds=bf,mf.seconds=cf,mf.minutes=df,mf.hours=ef,mf.days=ff,mf.weeks=xc,mf.months=gf,mf.years=hf,mf.humanize=Bc,mf.toISOString=Cc,mf.toString=Cc,mf.toJSON=Cc,mf.locale=pb,mf.localeData=qb,mf.toIsoString=$("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Cc),mf.lang=Be,G("X",0,0,"unix"),G("x",0,0,"valueOf"),L("x",$d),L("X",ae),O("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),O("x",function(a,b,c){c._d=new Date(p(a))}),
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
a.version="2.10.3",b(Aa),a.fn=Me,a.min=Ca,a.max=Da,a.utc=h,a.unix=Wb,a.months=gc,a.isDate=d,a.locale=v,a.invalid=l,a.duration=Va,a.isMoment=o,a.weekdays=ic,a.parseZone=Xb,a.localeData=x,a.isDuration=Fa,a.monthsShort=hc,a.weekdaysMin=kc,a.defineLocale=w,a.weekdaysShort=jc,a.normalizeUnits=z,a.relativeTimeThreshold=Ac;var nf=a,of=(nf.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(a){return/^nm$/i.test(a)},meridiem:function(a,b,c){return 12>a?c?"vm":"VM":c?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),nf.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),pf={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},qf=(nf.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(a){return a.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return pf[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return of[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),nf.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),rf={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},sf=function(a){return 0===a?0:1===a?1:2===a?2:a%100>=3&&10>=a%100?3:a%100>=11?4:5},tf={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},uf=function(a){return function(b,c,d,e){var f=sf(b),g=tf[a][sf(b)];return 2===f&&(g=g[c?0:1]),g.replace(/%d/i,b)}},vf=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"],wf=(nf.defineLocale("ar",{months:vf,monthsShort:vf,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:uf("s"),m:uf("m"),mm:uf("m"),h:uf("h"),hh:uf("h"),d:uf("d"),dd:uf("d"),M:uf("M"),MM:uf("M"),y:uf("y"),yy:uf("y")},preparse:function(a){return a.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return rf[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return qf[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),{1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"}),xf=(nf.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(a){return/^(gündüz|axşam)$/.test(a)},meridiem:function(a,b,c){return 4>a?"gecə":12>a?"səhər":17>a?"gündüz":"axşam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(a){if(0===a)return a+"-ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(wf[b]||wf[c]||wf[d])},week:{dow:1,doy:7}}),nf.defineLocale("be",{months:Fc,monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:Gc,weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., LT",LLLL:"dddd, D MMMM YYYY г., LT"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:Ec,mm:Ec,h:Ec,hh:Ec,d:"дзень",dd:Ec,M:"месяц",MM:Ec,y:"год",yy:Ec},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(a){return/^(дня|вечара)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночы":12>a?"раніцы":17>a?"дня":"вечара"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a%10!==2&&a%10!==3||a%100===12||a%100===13?a+"-ы":a+"-і";case"D":return a+"-га";default:return a}},week:{dow:1,doy:7}}),nf.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),{1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"}),yf={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},zf=(nf.defineLocale("bn",{months:"জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রুবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্রু_শনি".split("_"),weekdaysMin:"রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কএক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(a){return a.replace(/[১২৩৪৫৬৭৮৯০]/g,function(a){return yf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return xf[a]})},meridiemParse:/রাত|শকাল|দুপুর|বিকেল|রাত/,isPM:function(a){return/^(দুপুর|বিকেল|রাত)$/.test(a)},meridiem:function(a,b,c){return 4>a?"রাত":10>a?"শকাল":17>a?"দুপুর":20>a?"বিকেল":"রাত"},week:{dow:0,doy:6}}),{1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"}),Af={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},Bf=(nf.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(a){return a.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(a){return Af[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return zf[a]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,isPM:function(a){return/^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(a)},meridiem:function(a,b,c){return 4>a?"མཚན་མོ":10>a?"ཞོགས་ཀས":17>a?"ཉིན་གུང":20>a?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}}),nf.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY LT",LLLL:"dddd, D [a viz] MMMM YYYY LT"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:Hc,h:"un eur",hh:"%d eur",d:"un devezh",dd:Hc,M:"ur miz",MM:Hc,y:"ur bloaz",yy:Ic},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}}),nf.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:Mc,mm:Mc,h:Mc,hh:Mc,d:"dan",dd:Mc,M:"mjesec",MM:Mc,y:"godinu",yy:Mc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),nf.defineLocale("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(a,b){var c=1===a?"r":2===a?"n":3===a?"r":4===a?"t":"è";return("w"===b||"W"===b)&&(c="a"),a+c},week:{dow:1,doy:4}}),"leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_")),Cf="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),Df=(nf.defineLocale("cs",{months:Bf,monthsShort:Cf,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(Bf,Cf),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:Oc,m:Oc,mm:Oc,h:Oc,hh:Oc,d:Oc,dd:Oc,M:Oc,MM:Oc,y:Oc,yy:Oc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], LT",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], LT"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/ҫул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}}),nf.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(a){var b=a,c="",d=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return b>20?c=40===b||50===b||60===b||80===b||100===b?"fed":"ain":b>0&&(c=d[b]),a+c},week:{dow:1,doy:4}}),nf.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd [d.] D. MMMM YYYY LT"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Heute um] LT [Uhr]",sameElse:"L",nextDay:"[Morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[Gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Pc,mm:"%d Minuten",h:Pc,hh:"%d Stunden",d:Pc,dd:Pc,M:Pc,MM:Pc,y:Pc,yy:Pc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Heute um] LT [Uhr]",sameElse:"L",nextDay:"[Morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[Gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Qc,mm:"%d Minuten",h:Qc,hh:"%d Stunden",d:Qc,dd:Qc,M:Qc,MM:Qc,y:Qc,yy:Qc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},isPM:function(a){return"μ"===(a+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return"function"==typeof c&&(c=c.apply(b)),c.replace("{}",d%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}}),nf.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),nf.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY LT",LLLL:"dddd, D MMMM, YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),nf.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),nf.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY LT",LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"},meridiemParse:/[ap]\.t\.m/i,isPM:function(a){return"p"===a.charAt(0).toLowerCase()},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}}),"Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_")),Ef="Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),Ff=(nf.defineLocale("es",{months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?Ef[a.month()]:Df[a.month()]},weekdays:"Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),nf.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:Rc,m:Rc,mm:Rc,h:Rc,hh:Rc,d:Rc,dd:"%d päeva",M:Rc,MM:Rc,y:Rc,yy:Rc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] LT",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] LT",llll:"ddd, YYYY[ko] MMM D[a] LT"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",
dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"}),Gf={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},Hf=(nf.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(a){return/بعد از ظهر/.test(a)},meridiem:function(a,b,c){return 12>a?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return Gf[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Ff[a]}).replace(/,/g,"،")},ordinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}}),"nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ")),If=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",Hf[7],Hf[8],Hf[9]],Jf=(nf.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] LT",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] LT",llll:"ddd, Do MMM YYYY, [klo] LT"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:Sc,m:Sc,mm:Sc,h:Sc,hh:Sc,d:Sc,dd:Sc,M:Sc,MM:Sc,y:Sc,yy:Sc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D. MMMM, YYYY LT"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(a){return a+(1===a?"er":"")}}),nf.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(a){return a+(1===a?"er":"")},week:{dow:1,doy:4}}),"jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")),Kf="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),Lf=(nf.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?Kf[a.month()]:Jf[a.month()]},weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),nf.defineLocale("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return"uns segundos"===a?"nuns segundos":"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:7}}),nf.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY LT",LLLL:"dddd, D [ב]MMMM YYYY LT",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY LT",llll:"ddd, D MMM YYYY LT"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a%10===0&&10!==a?a+" שנה":a+" שנים"}}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),Mf={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},Nf=(nf.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return Mf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Lf[a]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात"===b?4>a?a:a+12:"सुबह"===b?a:"दोपहर"===b?a>=10?a:a+12:"शाम"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात":10>a?"सुबह":17>a?"दोपहर":20>a?"शाम":"रात"},week:{dow:0,doy:6}}),nf.defineLocale("hr",{months:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:Uc,mm:Uc,h:Uc,hh:Uc,d:"dan",dd:Uc,M:"mjesec",MM:Uc,y:"godinu",yy:Uc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),"vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")),Of=(nf.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D., LT",LLLL:"YYYY. MMMM D., dddd LT"},meridiemParse:/de|du/i,isPM:function(a){return"u"===a.charAt(1).toLowerCase()},meridiem:function(a,b,c){return 12>a?c===!0?"de":"DE":c===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return Wc.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return Wc.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:Vc,m:Vc,mm:Vc,h:Vc,hh:Vc,d:Vc,dd:Vc,M:Vc,MM:Vc,y:Vc,yy:Vc},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),nf.defineLocale("hy-am",{months:Xc,monthsShort:Yc,weekdays:Zc,weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., LT",LLLL:"dddd, D MMMM YYYY թ., LT"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(a){return/^(ցերեկվա|երեկոյան)$/.test(a)},meridiem:function(a){return 4>a?"գիշերվա":12>a?"առավոտվա":17>a?"ցերեկվա":"երեկոյան"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(a,b){switch(b){case"DDD":case"w":case"W":case"DDDo":return 1===a?a+"-ին":a+"-րդ";default:return a}},week:{dow:1,doy:7}}),nf.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"LT.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"siang"===b?a>=11?a:a+12:"sore"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"siang":19>a?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),nf.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd, D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:_c,m:_c,mm:_c,h:"klukkustund",hh:_c,d:_c,dd:_c,M:_c,MM:_c,y:_c,yy:_c},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),nf.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",LTS:"LTs秒",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日LT",LLLL:"YYYY年M月D日LT dddd"},meridiemParse:/午前|午後/i,isPM:function(a){return"午後"===a},meridiem:function(a,b,c){return 12>a?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}}),nf.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"LT.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(a,b){return 12===a&&(a=0),"enjing"===b?a:"siyang"===b?a>=11?a:a+12:"sonten"===b||"ndalu"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"enjing":15>a?"siyang":19>a?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),nf.defineLocale("ka",{months:ad,monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:bd,weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(a)?a.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(a){return 0===a?a:1===a?a+"-ლი":20>a||100>=a&&a%20===0||a%100===0?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}}),nf.defineLocale("km",{months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[ថ្ងៃនៈ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},week:{dow:1,doy:4}}),nf.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 m분",LTS:"A h시 m분 s초",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 LT",LLLL:"YYYY년 MMMM D일 dddd LT"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇초",ss:"%d초",m:"일분",mm:"%d분",h:"한시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한달",MM:"%d달",y:"일년",yy:"%d년"},ordinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(a){return"오후"===a},meridiem:function(a,b,c){return 12>a?"오전":"오후"}}),nf.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:dd,past:ed,s:"e puer Sekonnen",m:cd,mm:"%d Minutten",h:cd,hh:"%d Stonnen",d:cd,dd:"%d Deeg",M:cd,MM:"%d Méint",y:cd,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"}),Pf="sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),Qf=(nf.defineLocale("lt",{months:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:ld,weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], LT [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], LT [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:gd,m:hd,mm:kd,h:hd,hh:kd,d:hd,dd:kd,M:hd,MM:kd,y:hd,yy:kd},ordinalParse:/\d{1,2}-oji/,ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}}),{m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")}),Rf=(nf.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, LT",LLLL:"YYYY. [gada] D. MMMM, dddd, LT"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:pd,m:od,mm:nd,h:od,hh:nd,d:od,dd:nd,M:od,MM:nd,y:od,yy:nd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=Rf.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Rf.correctGrammaticalCase(a,d)}}),Sf=(nf.defineLocale("me",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:Rf.translate,mm:Rf.translate,h:Rf.translate,hh:Rf.translate,d:"dan",dd:Rf.translate,M:"mjesec",MM:Rf.translate,y:"godinu",yy:Rf.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),nf.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Во изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Во изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),nf.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,isPM:function(a){return/^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(a)},meridiem:function(a,b,c){return 4>a?"രാത്രി":12>a?"രാവിലെ":17>a?"ഉച്ച കഴിഞ്ഞ്":20>a?"വൈകുന്നേരം":"രാത്രി"}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),Tf={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},Uf=(nf.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%s नंतर",past:"%s पूर्वी",s:"सेकंद",m:"एक मिनिट",mm:"%d मिनिटे",h:"एक तास",hh:"%d तास",d:"एक दिवस",dd:"%d दिवस",M:"एक महिना",MM:"%d महिने",y:"एक वर्ष",yy:"%d वर्षे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return Tf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Sf[a]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात्री"===b?4>a?a:a+12:"सकाळी"===b?a:"दुपारी"===b?a>=10?a:a+12:"सायंकाळी"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात्री":10>a?"सकाळी":17>a?"दुपारी":20>a?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}}),nf.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"LT.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),{1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"}),Vf={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5",
"၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},Wf=(nf.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(a){return a.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(a){return Vf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Uf[a]})},week:{dow:1,doy:4}}),nf.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tirs_ons_tors_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"H.mm",LTS:"LT.ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),Xf={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},Yf=(nf.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return Xf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Wf[a]})},meridiemParse:/राती|बिहान|दिउँसो|बेलुका|साँझ|राती/,meridiemHour:function(a,b){return 12===a&&(a=0),"राती"===b?3>a?a:a+12:"बिहान"===b?a:"दिउँसो"===b?a>=10?a:a+12:"बेलुका"===b||"साँझ"===b?a+12:void 0},meridiem:function(a,b,c){return 3>a?"राती":10>a?"बिहान":15>a?"दिउँसो":18>a?"बेलुका":20>a?"साँझ":"राती"},calendar:{sameDay:"[आज] LT",nextDay:"[भोली] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडी",s:"केही समय",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्��",yy:"%d बर्ष"},week:{dow:1,doy:7}}),"jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")),Zf="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),$f=(nf.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?Zf[a.month()]:Yf[a.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),nf.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),"styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_")),_f="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),ag=(nf.defineLocale("pl",{months:function(a,b){return""===b?"("+_f[a.month()]+"|"+$f[a.month()]+")":/D MMMM/.test(b)?_f[a.month()]:$f[a.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:rd,mm:rd,h:rd,hh:rd,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:rd,y:"rok",yy:rd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] LT",LLLL:"dddd, D [de] MMMM [de] YYYY [às] LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"}),nf.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),nf.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:sd,h:"o oră",hh:sd,d:"o zi",dd:sd,M:"o lună",MM:sd,y:"un an",yy:sd},week:{dow:1,doy:7}}),nf.defineLocale("ru",{months:vd,monthsShort:wd,weekdays:xd,weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),monthsParse:[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[й|я]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i],longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., LT",LLLL:"dddd, D MMMM YYYY г., LT"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(){return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT"},lastWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:ud,mm:ud,h:"час",hh:ud,d:"день",dd:ud,M:"месяц",MM:ud,y:"год",yy:ud},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(a){return/^(дня|вечера)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночи":12>a?"утра":17>a?"дня":"вечера"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}}),nf.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, LT",LLLL:"YYYY MMMM D [වැනි] dddd, LTS"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(a){return a+" වැනි"},meridiem:function(a,b,c){return a>11?c?"ප.ව.":"පස් වරු":c?"පෙ.ව.":"පෙර වරු"}}),"január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_")),bg="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),cg=(nf.defineLocale("sk",{months:ag,monthsShort:bg,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(ag,bg),weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:zd,m:zd,mm:zd,h:zd,hh:zd,d:zd,dd:zd,M:zd,MM:zd,y:zd,yy:zd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),nf.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:Ad,m:Ad,mm:Ad,h:Ad,hh:Ad,d:Ad,dd:Ad,M:Ad,MM:Ad,y:Ad,yy:Ad},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),nf.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),meridiemParse:/PD|MD/,isPM:function(a){return"M"===a.charAt(0)},meridiem:function(a,b,c){return 12>a?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=cg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+cg.correctGrammaticalCase(a,d)}}),dg=(nf.defineLocale("sr-cyrl",{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],monthsShort:["јан.","феб.","мар.","апр.","мај","јун","јул","авг.","сеп.","окт.","нов.","дец."],weekdays:["недеља","понедељак","уторак","среда","четвртак","петак","субота"],weekdaysShort:["нед.","пон.","уто.","сре.","чет.","пет.","суб."],weekdaysMin:["не","по","ут","ср","че","пе","су"],longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var a=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:cg.translate,mm:cg.translate,h:cg.translate,hh:cg.translate,d:"дан",dd:cg.translate,M:"месец",MM:cg.translate,y:"годину",yy:cg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=dg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+dg.correctGrammaticalCase(a,d)}}),eg=(nf.defineLocale("sr",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sre.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:dg.translate,mm:dg.translate,h:dg.translate,hh:dg.translate,d:"dan",dd:dg.translate,M:"mesec",MM:dg.translate,y:"godinu",yy:dg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),nf.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":"e";return a+c},week:{dow:1,doy:4}}),nf.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinalParse:/\d{1,2}வது/,ordinal:function(a){return a+"வது"},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(a,b,c){return 2>a?" யாமம்":6>a?" வைகறை":10>a?" காலை":14>a?" நண்பகல்":18>a?" எற்பாடு":22>a?" மாலை":" யாமம்"},meridiemHour:function(a,b){return 12===a&&(a=0),"யாமம்"===b?2>a?a:a+12:"வைகறை"===b||"காலை"===b?a:"நண்பகல்"===b&&a>=10?a:a+12},week:{dow:0,doy:6}}),nf.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),longDateFormat:{LT:"H นาฬิกา m นาที",LTS:"LT s วินาที",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา LT",LLLL:"วันddddที่ D MMMM YYYY เวลา LT"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(a){return"หลังเที่ยง"===a},meridiem:function(a,b,c){return 12>a?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}}),nf.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM DD, YYYY LT"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),{1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"}),fg=(nf.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(a){if(0===a)return a+"'ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(eg[b]||eg[c]||eg[d])},week:{dow:1,doy:7}}),nf.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),nf.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}}),nf.defineLocale("uk",{months:Dd,monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:Ed,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., LT",LLLL:"dddd, D MMMM YYYY р., LT"},calendar:{sameDay:Fd("[Сьогодні "),nextDay:Fd("[Завтра "),lastDay:Fd("[Вчора "),nextWeek:Fd("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Fd("[Минулої] dddd [").call(this);case 1:case 2:case 4:return Fd("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:Cd,mm:Cd,h:"годину",hh:Cd,d:"день",dd:Cd,M:"місяць",MM:Cd,y:"рік",yy:Cd},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(a){return/^(дня|вечора)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночі":12>a?"ранку":17>a?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}}),nf.defineLocale("uz",{months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"D MMMM YYYY, dddd LT"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}}),nf.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),longDateFormat:{LT:"HH:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY LT",LLLL:"dddd, D MMMM [năm] YYYY LT",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY LT",llll:"ddd, D MMM YYYY LT"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),nf.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"下午"===b||"晚上"===b?a+12:a>=11?a:a+12},meridiem:function(a,b,c){var d=100*a+b;return 600>d?"凌晨":900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var a,b;return a=nf().startOf("week"),b=this.unix()-a.unix()>=604800?"[下]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},lastWeek:function(){var a,b;return a=nf().startOf("week"),b=this.unix()<a.unix()?"[上]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}}),nf.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiemParse:/早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"早上"===b||"上午"===b?a:"中午"===b?a>=11?a:a+12:"下午"===b||"晚上"===b?a+12:void 0},meridiem:function(a,b,c){var d=100*a+b;

return 900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"一分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}}),nf);return fg});

// plugin ion.calendar.min.js
// Ion.Calendar | version 2.0.2 | http://ionden.com/a/plugins/ion.calendar/
;(function(f){try{var u=moment()}catch(v){throw alert("Can't find Moment.js, please read the ion.calendar description."),Error("Can't find Moment.js library");}var m={init:function(e){var c=f.extend({lang:"en",sundayFirst:!0,years:"80",format:"",clickable:!0,startDate:"",hideArrows:!1,onClick:null,onReady:null},e),a,b;return this.each(function(){var n=f(this);if(!n.data("isActive")){n.data("isActive",!0);var e,l,m,w,y,g,d=moment(u.locale(c.lang)),h,k,p,z,x,q,r,v=!0;this.updateData=function(a){c=f.extend(c,
a);t()};var t=function(){e.off();l.off();m.off();w.off();n.empty();B();C()},B=function(){c.startDate&&(g=0<=c.format.indexOf("L")?moment(c.startDate,"YYYY.MM.DD").locale(c.lang):moment(c.startDate,c.format).locale(c.lang));c.years=c.years.toString();x=c.years.split("-");1===x.length?(q=moment().subtract("years",x[0]).format("YYYY"),r=moment().format("YYYY")):2===x.length&&(q=x[0],r=x[1]);q=parseInt(q);r=parseInt(r);r<d.format("YYYY")&&d.year(r).month(11);q>d.format("YYYY")&&d.year(q).month(0)},C=
function(){h=moment(d);k=parseInt(h.startOf("month").format("d"));p=parseInt(h.endOf("month").format("d"));z=parseInt(h.endOf("month").format("D"));a='<div class="ic__container">';a+='<div class="ic__header">';a+='<div class="ic__prev"><div></div></div>';a+='<div class="ic__next"><div></div></div>';a+='<div class="ic__month"><select class="ic__month-select">';for(b=0;12>b;b++)a=b===parseInt(d.format("M"))-1?a+('<option value="'+b+'" selected="selected">'+h.month(b).format("MMMM")+"</option>"):a+('<option value="'+
b+'">'+h.month(b).format("MMMM")+"</option>");a+="</select></div>";a+='<div class="ic__year"><select class="ic__year-select">';for(b=q;b<=r;b++)a=b===parseInt(d.format("YYYY"))?a+('<option value="'+b+'" selected="selected">'+b+"</option>"):a+('<option value="'+b+'">'+b+"</option>");a+="</select></div>";a+="</div>";if(c.sundayFirst){a+='<table class="ic__week-head"><tr>';for(b=0;7>b;b++)a+="<td>"+h.day(b).format("dd")+"</td>";a+="</tr></table>";a+='<table class="ic__days"><tr>';for(b=0;b<k;b++)a+=
'<td class="ic__day-empty">&nbsp;</td>';for(b=1;b<=z;b++)a=moment(d).date(b).format("D.M.YYYY")===u.format("D.M.YYYY")?a+('<td class="ic__day ic__day_state_current">'+b+"</td>"):g&&moment(d).date(b).format("D.M.YYYY")===g.format("D.M.YYYY")?a+('<td class="ic__day ic__day_state_selected">'+b+"</td>"):a+('<td class="ic__day">'+b+"</td>"),(k+b)/7===Math.floor((k+b)/7)&&(a+="</tr><tr>");b=p}else{a+='<table class="ic__week-head"><tr>';for(b=1;8>b;b++)a=7>b?a+("<td>"+h.day(b).format("dd")+"</td>"):a+("<td>"+
h.day(0).format("dd")+"</td>");a+="</tr></table>";a+='<table class="ic__days"><tr>';k=0<k?k-1:6;for(b=0;b<k;b++)a+='<td class="ic__day-empty">&nbsp;</td>';for(b=1;b<=z;b++)a=moment(d).date(b).format("D.M.YYYY")===u.format("D.M.YYYY")?a+('<td class="ic__day ic__day_state_current">'+b+"</td>"):g&&moment(d).date(b).format("D.M.YYYY")===g.format("D.M.YYYY")?a+('<td class="ic__day ic__day_state_selected">'+b+"</td>"):a+('<td class="ic__day">'+b+"</td>"),(k+b)/7===Math.floor((k+b)/7)&&(a+="</tr><tr>");
1>p&&(p=7);b=p-1}for(;6>b;b++)a+='<td class="ic__day-empty">&nbsp;</td>';a+="</tr></table>";a+="</div>";D()},D=function(){n.html(a);e=n.find(".ic__prev");l=n.find(".ic__next");m=n.find(".ic__month-select");w=n.find(".ic__year-select");y=n.find(".ic__day");c.hideArrows?(e[0].style.display="none",l[0].style.display="none"):(e.on("click",function(a){a.preventDefault();d.subtract("months",1);parseInt(d.format("YYYY"))<q&&d.add("months",1);t()}),l.on("click",function(a){a.preventDefault();d.add("months",
1);parseInt(d.format("YYYY"))>r&&d.subtract("months",1);t()}));m.on("change",function(a){a.preventDefault();a=f(this).prop("value");d.month(parseInt(a));t()});w.on("change",function(a){a.preventDefault();a=f(this).prop("value");d.year(parseInt(a));t()});if(c.clickable)y.on("click",function(a){a.preventDefault();a=f(this).text();d.date(parseInt(a));g=moment(d);0<=c.format.indexOf("L")?c.startDate=g.format("YYYY-MM-DD"):c.startDate=g.format(c.format);"function"===typeof c.onClick&&(c.format?"moment"===
c.format?c.onClick.call(this,g):c.onClick.call(this,g.format(c.format)):c.onClick.call(this,g.format()));t()});"function"===typeof c.onReady&&(c.format?"moment"===c.format?c.onReady.call(this,d):c.onReady.call(this,d.format(c.format)):c.onReady.call(this,d.format()));c.startDate&&v&&(v=!1,d.year(parseInt(g.format("YYYY"))),d.month(parseInt(g.format("M")-1)),t())};B();C()}})},update:function(e){return this.each(function(){this.updateData(e)})}};f.fn.ionCalendar=function(e){if(m[e])return m[e].apply(this,
Array.prototype.slice.call(arguments,1));if("object"!==typeof e&&e)f.error("Method "+e+" does not exist for jQuery.ionCalendar");else return m.init.apply(this,arguments)}})(jQuery);
(function(f){var u=0,v,m=f(document.body),e=function(){f(".ic__datepicker").css("left","-9999px").css("top","-9999px")},c={init:function(a){var b=f.extend({lang:"en",sundayFirst:!0,years:"80",clickable:!0,format:""},a);return this.each(function(){var a=f(this),c,l={},A=this,w,y,g,d,h,k;if(!a.data("isActive")){a.data("isActive",!0);u++;this.pluginCount=u;l.lang=a.data("lang")||b.lang;!1===a.data("sundayfirst")&&(l.sundayFirst=a.data("sundayfirst"));l.years=a.data("years")||b.years;l.format=a.data("format")||
b.format;f.extend(b,l);m.on("mousedown",function(){e()});b.onClick=function(b){a.prop("value",b);d=b;e()};var p=function(){w=parseInt(a.offset().left);y=parseInt(a.offset().top);g=parseInt(a.outerWidth(!0));c.css("left",w+g+10+"px").css("top",y-10+"px");(h=a.prop("value"))&&h!==d&&0>b.format.indexOf("L")&&(k=moment(h,b.format),k.isValid()&&c.ionCalendar("update",{startDate:h}))};(function(){v='<div class="ic__datepicker" id="ic__datepicker-'+A.pluginCount+'"></div>';m.append(v);c=f("#ic__datepicker-"+
A.pluginCount);c.ionCalendar(b);c.on("mousedown",function(a){a.stopPropagation()});a.on("mousedown",function(a){a.stopPropagation()});a.on("focusin",function(){e();p()});a.on("keyup",function(){p()})})()}})},close:function(){e()}};f.fn.ionDatePicker=function(a){if(c[a])return c[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)f.error("Method "+a+" does not exist for jQuery.ionDatePicker");else return c.init.apply(this,arguments)}})(jQuery);

/* module fullCalendar */
// function on
jQuery(document).ready(function() {
	fullCalendarInit();
});

// function init
//  more example https://fullcalendar.io/#demos
function fullCalendarInit() {
	var calendarEl = document.getElementById('full-calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
		},
		initialDate: '2020-09-12',
		navLinks: true, // can click day/week names to navigate views
		businessHours: true, // display business hours
		editable: true,
		selectable: true,
		events: [{
				title: 'Business Lunch',
				start: '2020-09-03T13:00:00',
				constraint: 'businessHours'
			}, {
				title: 'Meeting',
				start: '2020-09-13T11:00:00',
				constraint: 'availableForMeeting', // defined below
				color: '#257e4a'
			}, {
				title: 'Conference',
				start: '2020-09-18',
				end: '2020-09-20'
			}, {
				title: 'Party',
				start: '2020-09-29T20:00:00'
			},
			// areas where "Meeting" must be dropped
			{
				groupId: 'availableForMeeting',
				start: '2020-09-11T10:00:00',
				end: '2020-09-11T16:00:00',
				display: 'background'
			}, {
				groupId: 'availableForMeeting',
				start: '2020-09-13T10:00:00',
				end: '2020-09-13T16:00:00',
				display: 'background'
			},
			// red areas where no events can be dropped
			{
				start: '2020-09-24',
				end: '2020-09-28',
				overlap: false,
				display: 'background',
				color: '#ff9f89'
			}, {
				start: '2020-09-06',
				end: '2020-09-08',
				overlap: false,
				display: 'background',
				color: '#ff9f89'
			}
		]
	});
	calendar.render();
}

/*!
FullCalendar v5.3.2
Docs & License: https://fullcalendar.io/
(c) 2020 Adam Shaw
*/
var FullCalendar=function(e){"use strict";var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,n)};function n(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}var r=function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function o(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)r[o]=i[a];return r}var i,a,s,l,u,c,d,p={},f=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function v(e,t){for(var n in t)e[n]=t[n];return e}function g(e){var t=e.parentNode;t&&t.removeChild(e)}function m(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return y(e,i,t&&t.key,t&&t.ref,null)}function y(e,t,n,r,o){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o};return null==o&&(a.__v=a),i.vnode&&i.vnode(a),a}function E(e){return e.children}function S(e,t){this.props=e,this.context=t}function D(e,t){if(null==t)return e.__?D(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?D(e):null}function b(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return b(e)}}function C(e){(!e.__d&&(e.__d=!0)&&a.push(e)&&!s++||u!==i.debounceRendering)&&((u=i.debounceRendering)||l)(w)}function w(){for(var e;s=a.length;)e=a.sort((function(e,t){return e.__v.__b-t.__v.__b})),a=[],e.some((function(e){var t,n,r,o,i,a,s;e.__d&&(a=(i=(t=e).__v).__e,(s=t.__P)&&(n=[],(r=v({},i)).__v=r,o=_(s,i,r,t.__n,void 0!==s.ownerSVGElement,null,n,null==a?D(i):a),I(n,i),o!=a&&b(i)))}))}function R(e,t,n,r,o,i,a,s,l){var u,c,d,h,v,m,y,E=n&&n.__k||f,S=E.length;if(s==p&&(s=null!=i?i[0]:S?D(n,0):null),u=0,t.__k=T(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(d=E[u])||d&&n.key==d.key&&n.type===d.type)E[u]=void 0;else for(c=0;c<S;c++){if((d=E[c])&&n.key==d.key&&n.type===d.type){E[c]=void 0;break}d=null}if(h=_(e,n,d=d||p,r,o,i,a,s,l),(c=n.ref)&&d.ref!=c&&(y||(y=[]),d.ref&&y.push(d.ref,null,n),y.push(c,n.__c||h,n)),null!=h){var f;if(null==m&&(m=h),void 0!==n.__d)f=n.__d,n.__d=void 0;else if(i==d||h!=s||null==h.parentNode){e:if(null==s||s.parentNode!==e)e.appendChild(h),f=null;else{for(v=s,c=0;(v=v.nextSibling)&&c<S;c+=2)if(v==h)break e;e.insertBefore(h,s),f=s}"option"==t.type&&(e.value="")}s=void 0!==f?f:h.nextSibling,"function"==typeof t.type&&(t.__d=s)}else s&&d.__e==s&&s.parentNode!=e&&(s=D(d))}return u++,n})),t.__e=m,null!=i&&"function"!=typeof t.type)for(u=i.length;u--;)null!=i[u]&&g(i[u]);for(u=S;u--;)null!=E[u]&&H(E[u],E[u]);if(y)for(u=0;u<y.length;u++)N(y[u],y[++u],y[++u])}function T(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)T(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?y(null,e,null,null,e):null!=e.__e||null!=e.__c?y(e.type,e.props,e.key,null,e.__v):e):e);return n}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===h.test(t)?n+"px":null==n?"":n}function M(e,t,n,r,o){var i,a,s,l,u;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(l in r)n&&l in n||k(i,l,"");if(n)for(u in n)r&&n[u]===r[u]||k(i,u,n[u])}else"o"===t[0]&&"n"===t[1]?(a=t!==(t=t.replace(/Capture$/,"")),s=t.toLowerCase(),t=(s in e?s:t).slice(2),n?(r||e.addEventListener(t,x,a),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,x,a)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function x(e){this.l[e.type](i.event?i.event(e):e)}function _(e,t,n,r,o,a,s,l,u){var c,d,p,f,h,g,m,y,D,b,C=t.type;if(void 0!==t.constructor)return null;(c=i.__b)&&c(t);try{e:if("function"==typeof C){if(y=t.props,D=(c=C.contextType)&&r[c.__c],b=c?D?D.props.value:c.__:r,n.__c?m=(d=t.__c=n.__c).__=d.__E:("prototype"in C&&C.prototype.render?t.__c=d=new C(y,b):(t.__c=d=new S(y,b),d.constructor=C,d.render=O),D&&D.sub(d),d.props=y,d.state||(d.state={}),d.context=b,d.__n=r,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=C.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=v({},d.__s)),v(d.__s,C.getDerivedStateFromProps(y,d.__s))),f=d.props,h=d.state,p)null==C.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==C.getDerivedStateFromProps&&y!==f&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(y,b),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(y,d.__s,b)||t.__v===n.__v&&!d.__){for(d.props=y,d.state=d.__s,t.__v!==n.__v&&(d.__d=!1),d.__v=t,t.__e=n.__e,t.__k=n.__k,d.__h.length&&s.push(d),c=0;c<t.__k.length;c++)t.__k[c]&&(t.__k[c].__=t);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(y,d.__s,b),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(f,h,g)}))}d.context=b,d.props=y,d.state=d.__s,(c=i.__r)&&c(t),d.__d=!1,d.__v=t,d.__P=e,c=d.render(d.props,d.state,d.context),t.__k=null!=c&&c.type==E&&null==c.key?c.props.children:Array.isArray(c)?c:[c],null!=d.getChildContext&&(r=v(v({},r),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(f,h)),R(e,t,n,r,o,a,s,l,u),d.base=t.__e,d.__h.length&&s.push(d),m&&(d.__E=d.__=null),d.__e=!1}else null==a&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=P(n.__e,t,n,r,o,a,s,u);(c=i.diffed)&&c(t)}catch(e){t.__v=null,i.__e(e,t,n)}return t.__e}function I(e,t){i.__c&&i.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){i.__e(e,t.__v)}}))}function P(e,t,n,r,o,i,a,s){var l,u,c,d,h,v=n.props,g=t.props;if(o="svg"===t.type||o,null!=i)for(l=0;l<i.length;l++)if(null!=(u=i[l])&&((null===t.type?3===u.nodeType:u.localName===t.type)||e==u)){e=u,i[l]=null;break}if(null==e){if(null===t.type)return document.createTextNode(g);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,g.is&&{is:g.is}),i=null,s=!1}if(null===t.type)v!==g&&e.data!=g&&(e.data=g);else{if(null!=i&&(i=f.slice.call(e.childNodes)),c=(v=n.props||p).dangerouslySetInnerHTML,d=g.dangerouslySetInnerHTML,!s){if(v===p)for(v={},h=0;h<e.attributes.length;h++)v[e.attributes[h].name]=e.attributes[h].value;(d||c)&&(d&&c&&d.__html==c.__html||(e.innerHTML=d&&d.__html||""))}(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||M(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||M(e,i,t[i],n[i],r)})(e,g,v,o,s),d?t.__k=[]:(t.__k=t.props.children,R(e,t,n,r,"foreignObject"!==t.type&&o,i,a,p,s)),s||("value"in g&&void 0!==(l=g.value)&&l!==e.value&&M(e,"value",l,v.value,!1),"checked"in g&&void 0!==(l=g.checked)&&l!==e.checked&&M(e,"checked",l,v.checked,!1))}return e}function N(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){i.__e(e,n)}}function H(e,t,n){var r,o,a;if(i.unmount&&i.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||N(r,null,t)),n||"function"==typeof e.type||(n=null!=(o=e.__e)),e.__e=e.__d=void 0,null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){i.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(a=0;a<r.length;a++)r[a]&&H(r[a],t,n);null!=o&&g(o)}function O(e,t,n){return this.constructor(e,n)}function A(e,t,n){var r,o,a;i.__&&i.__(e,t),o=(r=n===c)?null:n&&n.__k||t.__k,e=m(E,null,[e]),a=[],_(t,(r?t:n||t).__k=e,o||p,p,void 0!==t.ownerSVGElement,n&&!r?[n]:o?null:f.slice.call(t.childNodes),a,n||p,r),I(a,e)}i={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return C(n.__E=n)}catch(t){e=t}throw e}},S.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=v({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&v(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),C(this))},S.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),C(this))},S.prototype.render=E,a=[],s=0,l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,c=p,d=0,("undefined"!=typeof globalThis?globalThis:window).FullCalendarVDom={Component:S,createElement:m,render:A,createRef:function(){return{}},Fragment:E,createContext:function(e){var t=function(e){var t={},n={__c:"__cC"+d++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(e){o.props.value!==e.value&&r.some((function(t){t.context=e.value,C(t)}))},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n.Provider.__=n,n}(e),n=t.Provider;return t.Provider=function(){var e=this,t=!this.getChildContext,r=n.apply(this,arguments);if(t){var o=[];this.shouldComponentUpdate=function(t){e.props.value!==t.value&&o.some((function(e){e.context=t.value,e.forceUpdate()}))},this.sub=function(e){o.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){o.splice(o.indexOf(e),1),t&&t.call(e)}}}return r},t},flushToDom:function(){var e=i.debounceRendering,t=[];i.debounceRendering=function(e){t.push(e)},A(m(U,{}),document.createElement("div"));for(;t.length;)t.shift()();i.debounceRendering=e}};var U=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){return m("div",{})},t.prototype.componentDidMount=function(){this.setState({})},t}(S);var L=function(){function e(e,t){this.context=e,this.internalEventSource=t}return e.prototype.remove=function(){this.context.dispatch({type:"REMOVE_EVENT_SOURCE",sourceId:this.internalEventSource.sourceId})},e.prototype.refetch=function(){this.context.dispatch({type:"FETCH_EVENT_SOURCES",sourceIds:[this.internalEventSource.sourceId]})},Object.defineProperty(e.prototype,"id",{get:function(){return this.internalEventSource.publicId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this.internalEventSource.meta.url},enumerable:!1,configurable:!0}),e}();function W(e){e.parentNode&&e.parentNode.removeChild(e)}function V(e,t){if(e.closest)return e.closest(t);if(!document.documentElement.contains(e))return null;do{if(z(e,t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}function z(e,t){return(e.matches||e.matchesSelector||e.msMatchesSelector).call(e,t)}function F(e,t){for(var n=e instanceof HTMLElement?[e]:e,r=[],o=0;o<n.length;o++)for(var i=n[o].querySelectorAll(t),a=0;a<i.length;a++)r.push(i[a]);return r}var B=/(top|left|right|bottom|width|height)$/i;function j(e,t){for(var n in t)G(e,n,t[n])}function G(e,t,n){null==n?e.style[t]="":"number"==typeof n&&B.test(t)?e.style[t]=n+"px":e.style[t]=n}function q(e){e.preventDefault()}function Y(e,t){return function(n){var r=V(n.target,e);r&&t.call(r,n,r)}}function Z(e,t,n,r){var o=Y(n,r);return e.addEventListener(t,o),function(){e.removeEventListener(t,o)}}var X=["webkitTransitionEnd","otransitionend","oTransitionEnd","msTransitionEnd","transitionend"];function K(e,t){var n=function(r){t(r),X.forEach((function(t){e.removeEventListener(t,n)}))};X.forEach((function(t){e.addEventListener(t,n)}))}var J=0;function $(){return String(J++)}function Q(){document.body.classList.add("fc-not-allowed")}function ee(){document.body.classList.remove("fc-not-allowed")}function te(e){e.classList.add("fc-unselectable"),e.addEventListener("selectstart",q)}function ne(e){e.classList.remove("fc-unselectable"),e.removeEventListener("selectstart",q)}function re(e){e.addEventListener("contextmenu",q)}function oe(e){e.removeEventListener("contextmenu",q)}function ie(e){var t,n,r=[],o=[];for("string"==typeof e?o=e.split(/\s*,\s*/):"function"==typeof e?o=[e]:Array.isArray(e)&&(o=e),t=0;t<o.length;t++)"string"==typeof(n=o[t])?r.push("-"===n.charAt(0)?{field:n.substring(1),order:-1}:{field:n,order:1}):"function"==typeof n&&r.push({func:n});return r}function ae(e,t,n){var r,o;for(r=0;r<n.length;r++)if(o=se(e,t,n[r]))return o;return 0}function se(e,t,n){return n.func?n.func(e,t):le(e[n.field],t[n.field])*(n.order||1)}function le(e,t){return e||t?null==t?-1:null==e?1:"string"==typeof e||"string"==typeof t?String(e).localeCompare(String(t)):e-t:0}function ue(e,t){var n=String(e);return"000".substr(0,t-n.length)+n}function ce(e,t){return e-t}function de(e){return e%1==0}function pe(e){var t=e.querySelector(".fc-scrollgrid-shrink-frame"),n=e.querySelector(".fc-scrollgrid-shrink-cushion");if(!t)throw new Error("needs fc-scrollgrid-shrink-frame className");if(!n)throw new Error("needs fc-scrollgrid-shrink-cushion className");return e.getBoundingClientRect().width-t.getBoundingClientRect().width+n.getBoundingClientRect().width}var fe=["sun","mon","tue","wed","thu","fri","sat"];function he(e,t){var n=ke(e);return n[2]+=7*t,Me(n)}function ve(e,t){var n=ke(e);return n[2]+=t,Me(n)}function ge(e,t){var n=ke(e);return n[6]+=t,Me(n)}function me(e,t){return ye(e,t)/7}function ye(e,t){return(t.valueOf()-e.valueOf())/864e5}function Ee(e,t){var n=be(e),r=be(t);return{years:0,months:0,days:Math.round(ye(n,r)),milliseconds:t.valueOf()-r.valueOf()-(e.valueOf()-n.valueOf())}}function Se(e,t){var n=De(e,t);return null!==n&&n%7==0?n/7:null}function De(e,t){return _e(e)===_e(t)?Math.round(ye(e,t)):null}function be(e){return Me([e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()])}function Ce(e,t,n,r){var o=Me([t,0,1+we(t,n,r)]),i=be(e),a=Math.round(ye(o,i));return Math.floor(a/7)+1}function we(e,t,n){var r=7+t-n;return-((7+Me([e,0,r]).getUTCDay()-t)%7)+r-1}function Re(e){return[e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()]}function Te(e){return new Date(e[0],e[1]||0,null==e[2]?1:e[2],e[3]||0,e[4]||0,e[5]||0)}function ke(e){return[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()]}function Me(e){return 1===e.length&&(e=e.concat([0])),new Date(Date.UTC.apply(Date,e))}function xe(e){return!isNaN(e.valueOf())}function _e(e){return 1e3*e.getUTCHours()*60*60+1e3*e.getUTCMinutes()*60+1e3*e.getUTCSeconds()+e.getUTCMilliseconds()}function Ie(e,t,n,r){return{instanceId:$(),defId:e,range:t,forcedStartTzo:null==n?null:n,forcedEndTzo:null==r?null:r}}var Pe=Object.prototype.hasOwnProperty;function Ne(e,t){var n={};if(t)for(var r in t){for(var o=[],i=e.length-1;i>=0;i--){var a=e[i][r];if("object"==typeof a&&a)o.unshift(a);else if(void 0!==a){n[r]=a;break}}o.length&&(n[r]=Ne(o))}for(i=e.length-1;i>=0;i--){var s=e[i];for(var l in s)l in n||(n[l]=s[l])}return n}function He(e,t){var n={};for(var r in e)t(e[r],r)&&(n[r]=e[r]);return n}function Oe(e,t){var n={};for(var r in e)n[r]=t(e[r],r);return n}function Ae(e){for(var t={},n=0,r=e;n<r.length;n++){t[r[n]]=!0}return t}function Ue(e){var t=[];for(var n in e)t.push(e[n]);return t}function Le(e,t){if(e===t)return!0;for(var n in e)if(Pe.call(e,n)&&!(n in t))return!1;for(var n in t)if(Pe.call(t,n)&&e[n]!==t[n])return!1;return!0}function We(e,t){var n=[];for(var r in e)Pe.call(e,r)&&(r in t||n.push(r));for(var r in t)Pe.call(t,r)&&e[r]!==t[r]&&n.push(r);return n}function Ve(e,t,n){if(void 0===n&&(n={}),e===t)return!0;for(var r in t)if(!(r in e)||!ze(e[r],t[r],n[r]))return!1;for(var r in e)if(!(r in t))return!1;return!0}function ze(e,t,n){return e===t||!0===n||!!n&&n(e,t)}function Fe(e,t,n,r){void 0===t&&(t=0),void 0===r&&(r=1);var o=[];null==n&&(n=Object.keys(e).length);for(var i=t;i<n;i+=r){var a=e[i];void 0!==a&&o.push(a)}return o}function Be(e,t,n){var r=n.dateEnv,o=n.pluginHooks,i=n.options,a=e.defs,s=e.instances;for(var l in s=He(s,(function(e){return!a[e.defId].recurringDef})),a){var u=a[l];if(u.recurringDef){var c=u.recurringDef.duration;c||(c=u.allDay?i.defaultAllDayEventDuration:i.defaultTimedEventDuration);for(var d=0,p=je(u,c,t,r,o.recurringTypes);d<p.length;d++){var f=p[d],h=Ie(l,{start:f,end:r.add(f,c)});s[h.instanceId]=h}}}return{defs:a,instances:s}}function je(e,t,n,r,o){var i=o[e.recurringDef.typeId].expand(e.recurringDef.typeData,{start:r.subtract(n.start,t),end:n.end},r);return e.allDay&&(i=i.map(be)),i}var Ge=["years","months","days","milliseconds"],qe=/^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;function Ye(e,t){var n;return"string"==typeof e?function(e){var t=qe.exec(e);if(t){var n=t[1]?-1:1;return{years:0,months:0,days:n*(t[2]?parseInt(t[2],10):0),milliseconds:n*(60*(t[3]?parseInt(t[3],10):0)*60*1e3+60*(t[4]?parseInt(t[4],10):0)*1e3+1e3*(t[5]?parseInt(t[5],10):0)+(t[6]?parseInt(t[6],10):0))}}return null}(e):"object"==typeof e&&e?Ze(e):"number"==typeof e?Ze(((n={})[t||"milliseconds"]=e,n)):null}function Ze(e){var t={years:e.years||e.year||0,months:e.months||e.month||0,days:e.days||e.day||0,milliseconds:60*(e.hours||e.hour||0)*60*1e3+60*(e.minutes||e.minute||0)*1e3+1e3*(e.seconds||e.second||0)+(e.milliseconds||e.millisecond||e.ms||0)},n=e.weeks||e.week;return n&&(t.days+=7*n,t.specifiedWeeks=!0),t}function Xe(e,t){return{years:e.years+t.years,months:e.months+t.months,days:e.days+t.days,milliseconds:e.milliseconds+t.milliseconds}}function Ke(e,t){return{years:e.years*t,months:e.months*t,days:e.days*t,milliseconds:e.milliseconds*t}}function Je(e){return $e(e)/864e5}function $e(e){return 31536e6*e.years+2592e6*e.months+864e5*e.days+e.milliseconds}function Qe(e,t){for(var n=null,r=0;r<Ge.length;r++){var o=Ge[r];if(t[o]){var i=e[o]/t[o];if(!de(i)||null!==n&&n!==i)return null;n=i}else if(e[o])return null}return n}function et(e){var t=e.milliseconds;if(t){if(t%1e3!=0)return{unit:"millisecond",value:t};if(t%6e4!=0)return{unit:"second",value:t/1e3};if(t%36e5!=0)return{unit:"minute",value:t/6e4};if(t)return{unit:"hour",value:t/36e5}}return e.days?e.specifiedWeeks&&e.days%7==0?{unit:"week",value:e.days/7}:{unit:"day",value:e.days}:e.months?{unit:"month",value:e.months}:e.years?{unit:"year",value:e.years}:{unit:"millisecond",value:0}}function tt(e){return e.toISOString().replace(/T.*$/,"")}function nt(e){return ue(e.getUTCHours(),2)+":"+ue(e.getUTCMinutes(),2)+":"+ue(e.getUTCSeconds(),2)}function rt(e,t){void 0===t&&(t=!1);var n=e<0?"-":"+",r=Math.abs(e),o=Math.floor(r/60),i=Math.round(r%60);return t?n+ue(o,2)+":"+ue(i,2):"GMT"+n+o+(i?":"+ue(i,2):"")}function ot(e,t,n){if(e===t)return!0;var r,o=e.length;if(o!==t.length)return!1;for(r=0;r<o;r++)if(!(n?n(e[r],t[r]):e[r]===t[r]))return!1;return!0}function it(e,t,n){var r,o;return function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];if(r){if(!ot(r,i)){n&&n(o);var s=e.apply(this,i);t&&t(s,o)||(o=s)}}else o=e.apply(this,i);return r=i,o}}function at(e,t,n){var r,o;return function(i){if(r){if(!Le(r,i)){n&&n(o);var a=e.call(this,i);t&&t(a,o)||(o=a)}}else o=e.call(this,i);return r=i,o}}var st={week:3,separator:0,omitZeroMinute:0,meridiem:0,omitCommas:0},lt={timeZoneName:7,era:6,year:5,month:4,day:2,weekday:2,hour:1,minute:1,second:1},ut=/\s*([ap])\.?m\.?/i,ct=/,/g,dt=/\s+/g,pt=/\u200e/g,ft=/UTC|GMT/,ht=function(){function e(e){var t={},n={},r=0;for(var o in e)o in st?(n[o]=e[o],r=Math.max(st[o],r)):(t[o]=e[o],o in lt&&(r=Math.max(lt[o],r)));this.standardDateProps=t,this.extendedSettings=n,this.severity=r,this.buildFormattingFunc=it(vt)}return e.prototype.format=function(e,t){return this.buildFormattingFunc(this.standardDateProps,this.extendedSettings,t)(e)},e.prototype.formatRange=function(e,t,n,r){var o=this.standardDateProps,i=this.extendedSettings,a=function(e,t,n){if(n.getMarkerYear(e)!==n.getMarkerYear(t))return 5;if(n.getMarkerMonth(e)!==n.getMarkerMonth(t))return 4;if(n.getMarkerDay(e)!==n.getMarkerDay(t))return 2;if(_e(e)!==_e(t))return 1;return 0}(e.marker,t.marker,n.calendarSystem);if(!a)return this.format(e,n);var s=a;!(s>1)||"numeric"!==o.year&&"2-digit"!==o.year||"numeric"!==o.month&&"2-digit"!==o.month||"numeric"!==o.day&&"2-digit"!==o.day||(s=1);var l=this.format(e,n),u=this.format(t,n);if(l===u)return l;var c=vt(function(e,t){var n={};for(var r in e)(!(r in lt)||lt[r]<=t)&&(n[r]=e[r]);return n}(o,s),i,n),d=c(e),p=c(t),f=function(e,t,n,r){var o=0;for(;o<e.length;){var i=e.indexOf(t,o);if(-1===i)break;var a=e.substr(0,i);o=i+t.length;for(var s=e.substr(o),l=0;l<n.length;){var u=n.indexOf(r,l);if(-1===u)break;var c=n.substr(0,u);l=u+r.length;var d=n.substr(l);if(a===c&&s===d)return{before:a,after:s}}}return null}(l,d,u,p),h=i.separator||r||n.defaultSeparator||"";return f?f.before+d+h+p+f.after:l+h+u},e.prototype.getLargestUnit=function(){switch(this.severity){case 7:case 6:case 5:return"year";case 4:return"month";case 3:return"week";case 2:return"day";default:return"time"}},e}();function vt(e,t,n){var o=Object.keys(e).length;return 1===o&&"short"===e.timeZoneName?function(e){return rt(e.timeZoneOffset)}:0===o&&t.week?function(e){return function(e,t,n,r){var o=[];"narrow"===r?o.push(t):"short"===r&&o.push(t," ");o.push(n.simpleNumberFormat.format(e)),"rtl"===n.options.direction&&o.reverse();return o.join("")}(n.computeWeekNumber(e.marker),n.weekText,n.locale,t.week)}:function(e,t,n){e=r({},e),t=r({},t),function(e,t){e.timeZoneName&&(e.hour||(e.hour="2-digit"),e.minute||(e.minute="2-digit"));"long"===e.timeZoneName&&(e.timeZoneName="short");t.omitZeroMinute&&(e.second||e.millisecond)&&delete t.omitZeroMinute}(e,t),e.timeZone="UTC";var o,i=new Intl.DateTimeFormat(n.locale.codes,e);if(t.omitZeroMinute){var a=r({},e);delete a.minute,o=new Intl.DateTimeFormat(n.locale.codes,a)}return function(r){var a=r.marker;return function(e,t,n,r,o){e=e.replace(pt,""),"short"===n.timeZoneName&&(e=function(e,t){var n=!1;e=e.replace(ft,(function(){return n=!0,t})),n||(e+=" "+t);return e}(e,"UTC"===o.timeZone||null==t.timeZoneOffset?"UTC":rt(t.timeZoneOffset)));r.omitCommas&&(e=e.replace(ct,"").trim());r.omitZeroMinute&&(e=e.replace(":00",""));!1===r.meridiem?e=e.replace(ut,"").trim():"narrow"===r.meridiem?e=e.replace(ut,(function(e,t){return t.toLocaleLowerCase()})):"short"===r.meridiem?e=e.replace(ut,(function(e,t){return t.toLocaleLowerCase()+"m"})):"lowercase"===r.meridiem&&(e=e.replace(ut,(function(e){return e.toLocaleLowerCase()})));return e=(e=e.replace(dt," ")).trim()}((o&&!a.getUTCMinutes()?o:i).format(a),r,e,t,n)}}(e,t,n)}function gt(e,t){var n=t.markerToArray(e.marker);return{marker:e.marker,timeZoneOffset:e.timeZoneOffset,array:n,year:n[0],month:n[1],day:n[2],hour:n[3],minute:n[4],second:n[5],millisecond:n[6]}}function mt(e,t,n,r){var o=gt(e,n.calendarSystem);return{date:o,start:o,end:t?gt(t,n.calendarSystem):null,timeZone:n.timeZone,localeCodes:n.locale.codes,defaultSeparator:r||n.defaultSeparator}}var yt=function(){function e(e){this.cmdStr=e}return e.prototype.format=function(e,t,n){return t.cmdFormatter(this.cmdStr,mt(e,null,t,n))},e.prototype.formatRange=function(e,t,n,r){return n.cmdFormatter(this.cmdStr,mt(e,t,n,r))},e}(),Et=function(){function e(e){this.func=e}return e.prototype.format=function(e,t,n){return this.func(mt(e,null,t,n))},e.prototype.formatRange=function(e,t,n,r){return this.func(mt(e,t,n,r))},e}();function St(e){return"object"==typeof e&&e?new ht(e):"string"==typeof e?new yt(e):"function"==typeof e?new Et(e):void 0}var Dt={navLinkDayClick:_t,navLinkWeekClick:_t,duration:Ye,bootstrapFontAwesome:_t,buttonIcons:_t,customButtons:_t,defaultAllDayEventDuration:Ye,defaultTimedEventDuration:Ye,nextDayThreshold:Ye,scrollTime:Ye,slotMinTime:Ye,slotMaxTime:Ye,dayPopoverFormat:St,slotDuration:Ye,snapDuration:Ye,headerToolbar:_t,footerToolbar:_t,defaultRangeSeparator:String,titleRangeSeparator:String,forceEventDuration:Boolean,dayHeaders:Boolean,dayHeaderFormat:St,dayHeaderClassNames:_t,dayHeaderContent:_t,dayHeaderDidMount:_t,dayHeaderWillUnmount:_t,dayCellClassNames:_t,dayCellContent:_t,dayCellDidMount:_t,dayCellWillUnmount:_t,initialView:String,aspectRatio:Number,weekends:Boolean,weekNumberCalculation:_t,weekNumbers:Boolean,weekNumberClassNames:_t,weekNumberContent:_t,weekNumberDidMount:_t,weekNumberWillUnmount:_t,editable:Boolean,viewClassNames:_t,viewDidMount:_t,viewWillUnmount:_t,nowIndicator:Boolean,nowIndicatorClassNames:_t,nowIndicatorContent:_t,nowIndicatorDidMount:_t,nowIndicatorWillUnmount:_t,showNonCurrentDates:Boolean,lazyFetching:Boolean,startParam:String,endParam:String,timeZoneParam:String,timeZone:String,locales:_t,locale:_t,themeSystem:String,dragRevertDuration:Number,dragScroll:Boolean,allDayMaintainDuration:Boolean,unselectAuto:Boolean,dropAccept:_t,eventOrder:ie,handleWindowResize:Boolean,windowResizeDelay:Number,longPressDelay:Number,eventDragMinDistance:Number,expandRows:Boolean,height:_t,contentHeight:_t,direction:String,weekNumberFormat:St,eventResizableFromStart:Boolean,displayEventTime:Boolean,displayEventEnd:Boolean,weekText:String,progressiveEventRendering:Boolean,businessHours:_t,initialDate:_t,now:_t,eventDataTransform:_t,stickyHeaderDates:_t,stickyFooterScrollbar:_t,viewHeight:_t,defaultAllDay:Boolean,eventSourceFailure:_t,eventSourceSuccess:_t,eventDisplay:String,eventStartEditable:Boolean,eventDurationEditable:Boolean,eventOverlap:_t,eventConstraint:_t,eventAllow:_t,eventBackgroundColor:String,eventBorderColor:String,eventTextColor:String,eventColor:String,eventClassNames:_t,eventContent:_t,eventDidMount:_t,eventWillUnmount:_t,selectConstraint:_t,selectOverlap:_t,selectAllow:_t,droppable:Boolean,unselectCancel:String,slotLabelFormat:_t,slotLaneClassNames:_t,slotLaneContent:_t,slotLaneDidMount:_t,slotLaneWillUnmount:_t,slotLabelClassNames:_t,slotLabelContent:_t,slotLabelDidMount:_t,slotLabelWillUnmount:_t,dayMaxEvents:_t,dayMaxEventRows:_t,dayMinWidth:Number,slotLabelInterval:Ye,allDayText:String,allDayClassNames:_t,allDayContent:_t,allDayDidMount:_t,allDayWillUnmount:_t,slotMinWidth:Number,navLinks:Boolean,eventTimeFormat:St,rerenderDelay:Number,moreLinkText:_t,selectMinDistance:Number,selectable:Boolean,selectLongPressDelay:Number,eventLongPressDelay:Number,selectMirror:Boolean,eventMinHeight:Number,slotEventOverlap:Boolean,plugins:_t,firstDay:Number,dayCount:Number,dateAlignment:String,dateIncrement:Ye,hiddenDays:_t,monthMode:Boolean,fixedWeekCount:Boolean,validRange:_t,visibleRange:_t,titleFormat:_t,noEventsText:String},bt={eventDisplay:"auto",defaultRangeSeparator:" - ",titleRangeSeparator:" – ",defaultTimedEventDuration:"01:00:00",defaultAllDayEventDuration:{day:1},forceEventDuration:!1,nextDayThreshold:"00:00:00",dayHeaders:!0,initialView:"",aspectRatio:1.35,headerToolbar:{start:"title",center:"",end:"today prev,next"},weekends:!0,weekNumbers:!1,weekNumberCalculation:"local",editable:!1,nowIndicator:!1,scrollTime:"06:00:00",slotMinTime:"00:00:00",slotMaxTime:"24:00:00",showNonCurrentDates:!0,lazyFetching:!0,startParam:"start",endParam:"end",timeZoneParam:"timeZone",timeZone:"local",locales:[],locale:"",themeSystem:"standard",dragRevertDuration:500,dragScroll:!0,allDayMaintainDuration:!1,unselectAuto:!0,dropAccept:"*",eventOrder:"start,-duration,allDay,title",dayPopoverFormat:{month:"long",day:"numeric",year:"numeric"},handleWindowResize:!0,windowResizeDelay:100,longPressDelay:1e3,eventDragMinDistance:5,expandRows:!1,navLinks:!1,selectable:!1},Ct={datesSet:_t,eventsSet:_t,eventAdd:_t,eventChange:_t,eventRemove:_t,windowResize:_t,eventClick:_t,eventMouseEnter:_t,eventMouseLeave:_t,select:_t,unselect:_t,loading:_t,_unmount:_t,_beforeprint:_t,_afterprint:_t,_noEventDrop:_t,_noEventResize:_t,_resize:_t,_scrollRequest:_t},wt={buttonText:_t,views:_t,plugins:_t,initialEvents:_t,events:_t,eventSources:_t},Rt={headerToolbar:Tt,footerToolbar:Tt,buttonText:Tt,buttonIcons:Tt};function Tt(e,t){return"object"==typeof e&&"object"==typeof t&&e&&t?Le(e,t):e===t}var kt={type:String,component:_t,buttonText:String,buttonTextKey:String,dateProfileGeneratorClass:_t,usesMinMaxTime:Boolean,classNames:_t,content:_t,didMount:_t,willUnmount:_t};function Mt(e){return Ne(e,Rt)}function xt(e,t){var n={},r={};for(var o in t)o in e&&(n[o]=t[o](e[o]));for(var o in e)o in t||(r[o]=e[o]);return{refined:n,extra:r}}function _t(e){return e}function It(e,t,n,r){for(var o={defs:{},instances:{}},i=Zt(n),a=0,s=e;a<s.length;a++){var l=qt(s[a],t,n,r,i);l&&Pt(l,o)}return o}function Pt(e,t){return void 0===t&&(t={defs:{},instances:{}}),t.defs[e.def.defId]=e.def,e.instance&&(t.instances[e.instance.instanceId]=e.instance),t}function Nt(e,t){var n=e.instances[t];if(n){var r=e.defs[n.defId],o=At(e,(function(e){return t=r,n=e,Boolean(t.groupId&&t.groupId===n.groupId);var t,n}));return o.defs[r.defId]=r,o.instances[n.instanceId]=n,o}return{defs:{},instances:{}}}function Ht(){return{defs:{},instances:{}}}function Ot(e,t){return{defs:r(r({},e.defs),t.defs),instances:r(r({},e.instances),t.instances)}}function At(e,t){var n=He(e.defs,t),r=He(e.instances,(function(e){return n[e.defId]}));return{defs:n,instances:r}}function Ut(e){return Array.isArray(e)?e:"string"==typeof e?e.split(/\s+/):[]}var Lt={display:String,editable:Boolean,startEditable:Boolean,durationEditable:Boolean,constraint:_t,overlap:_t,allow:_t,className:Ut,classNames:Ut,color:String,backgroundColor:String,borderColor:String,textColor:String};function Wt(e,t){var n=function(e,t){return Array.isArray(e)?It(e,null,t,!0):"object"==typeof e&&e?It([e],null,t,!0):null!=e?String(e):null}(e.constraint,t);return{display:e.display||null,startEditable:null!=e.startEditable?e.startEditable:e.editable,durationEditable:null!=e.durationEditable?e.durationEditable:e.editable,constraints:null!=n?[n]:[],overlap:null!=e.overlap?e.overlap:null,allows:null!=e.allow?[e.allow]:[],backgroundColor:e.backgroundColor||e.color||"",borderColor:e.borderColor||e.color||"",textColor:e.textColor||"",classNames:(e.className||[]).concat(e.classNames||[])}}function Vt(e){return e.reduce(zt,Ft)}function zt(e,t){return{display:null!=t.display?t.display:e.display,startEditable:null!=t.startEditable?t.startEditable:e.startEditable,durationEditable:null!=t.durationEditable?t.durationEditable:e.durationEditable,constraints:e.constraints.concat(t.constraints),overlap:"boolean"==typeof t.overlap?t.overlap:e.overlap,allows:e.allows.concat(t.allows),backgroundColor:t.backgroundColor||e.backgroundColor,borderColor:t.borderColor||e.borderColor,textColor:t.textColor||e.textColor,classNames:e.classNames.concat(t.classNames)}}var Ft={display:null,startEditable:null,durationEditable:null,constraints:[],overlap:null,allows:[],backgroundColor:"",borderColor:"",textColor:"",classNames:[]},Bt={id:String,groupId:String,title:String,url:String},jt={start:_t,end:_t,date:_t,allDay:Boolean},Gt=r(r(r({},Bt),jt),{extendedProps:_t});function qt(e,t,n,r,o){void 0===o&&(o=Zt(n));var i=Yt(e,n,o),a=i.refined,s=i.extra,l=function(e,t){var n=null;e&&(n=e.defaultAllDay);null==n&&(n=t.options.defaultAllDay);return n}(t,n),u=function(e,t,n,r){for(var o=0;o<r.length;o++){var i=r[o].parse(e,n);if(i){var a=e.allDay;return null==a&&null==(a=t)&&null==(a=i.allDayGuess)&&(a=!1),{allDay:a,duration:i.duration,typeData:i.typeData,typeId:o}}}return null}(a,l,n.dateEnv,n.pluginHooks.recurringTypes);if(u)return(c=Xt(a,s,t?t.sourceId:"",u.allDay,Boolean(u.duration),n)).recurringDef={typeId:u.typeId,typeData:u.typeData,duration:u.duration},{def:c,instance:null};var c,d=function(e,t,n,r){var o,i,a=e.allDay,s=null,l=!1,u=null,c=null!=e.start?e.start:e.date;if(o=n.dateEnv.createMarkerMeta(c))s=o.marker;else if(!r)return null;null!=e.end&&(i=n.dateEnv.createMarkerMeta(e.end));null==a&&(a=null!=t?t:(!o||o.isTimeUnspecified)&&(!i||i.isTimeUnspecified));a&&s&&(s=be(s));i&&(u=i.marker,a&&(u=be(u)),s&&u<=s&&(u=null));u?l=!0:r||(l=n.options.forceEventDuration||!1,u=n.dateEnv.add(s,a?n.options.defaultAllDayEventDuration:n.options.defaultTimedEventDuration));return{allDay:a,hasEnd:l,range:{start:s,end:u},forcedStartTzo:o?o.forcedTzo:null,forcedEndTzo:i?i.forcedTzo:null}}(a,l,n,r);return d?{def:c=Xt(a,s,t?t.sourceId:"",d.allDay,d.hasEnd,n),instance:Ie(c.defId,d.range,d.forcedStartTzo,d.forcedEndTzo)}:null}function Yt(e,t,n){return void 0===n&&(n=Zt(t)),xt(e,n)}function Zt(e){return r(r(r({},Lt),Gt),e.pluginHooks.eventRefiners)}function Xt(e,t,n,o,i,a){for(var s={title:e.title||"",groupId:e.groupId||"",publicId:e.id||"",url:e.url||"",recurringDef:null,defId:$(),sourceId:n,allDay:o,hasEnd:i,ui:Wt(e,a),extendedProps:r(r({},e.extendedProps||{}),t)},l=0,u=a.pluginHooks.eventDefMemberAdders;l<u.length;l++){var c=u[l];r(s,c(e))}return Object.freeze(s.ui.classNames),Object.freeze(s.extendedProps),s}function Kt(e){var t=Math.floor(ye(e.start,e.end))||1,n=be(e.start);return{start:n,end:ve(n,t)}}function Jt(e,t){void 0===t&&(t=Ye(0));var n=null,r=null;if(e.end){r=be(e.end);var o=e.end.valueOf()-r.valueOf();o&&o>=$e(t)&&(r=ve(r,1))}return e.start&&(n=be(e.start),r&&r<=n&&(r=ve(n,1))),{start:n,end:r}}function $t(e){var t=Jt(e);return ye(t.start,t.end)>1}function Qt(e,t,n,r){return"year"===r?Ye(n.diffWholeYears(e,t),"year"):"month"===r?Ye(n.diffWholeMonths(e,t),"month"):Ee(e,t)}function en(e,t){var n,r,o=[],i=t.start;for(e.sort(tn),n=0;n<e.length;n++)(r=e[n]).start>i&&o.push({start:i,end:r.start}),r.end>i&&(i=r.end);return i<t.end&&o.push({start:i,end:t.end}),o}function tn(e,t){return e.start.valueOf()-t.start.valueOf()}function nn(e,t){var n=e.start,r=e.end,o=null;return null!==t.start&&(n=null===n?t.start:new Date(Math.max(n.valueOf(),t.start.valueOf()))),null!=t.end&&(r=null===r?t.end:new Date(Math.min(r.valueOf(),t.end.valueOf()))),(null===n||null===r||n<r)&&(o={start:n,end:r}),o}function rn(e,t){return(null===e.start?null:e.start.valueOf())===(null===t.start?null:t.start.valueOf())&&(null===e.end?null:e.end.valueOf())===(null===t.end?null:t.end.valueOf())}function on(e,t){return(null===e.end||null===t.start||e.end>t.start)&&(null===e.start||null===t.end||e.start<t.end)}function an(e,t){return(null===e.start||null!==t.start&&t.start>=e.start)&&(null===e.end||null!==t.end&&t.end<=e.end)}function sn(e,t){return(null===e.start||t>=e.start)&&(null===e.end||t<e.end)}function ln(e,t,n,r){var o={},i={},a={},s=[],l=[],u=pn(e.defs,t);for(var c in e.defs){"inverse-background"===(f=u[(S=e.defs[c]).defId]).display&&(S.groupId?(o[S.groupId]=[],a[S.groupId]||(a[S.groupId]=S)):i[c]=[])}for(var d in e.instances){var p=e.instances[d],f=u[(S=e.defs[p.defId]).defId],h=p.range,v=!S.allDay&&r?Jt(h,r):h,g=nn(v,n);g&&("inverse-background"===f.display?S.groupId?o[S.groupId].push(g):i[p.defId].push(g):"none"!==f.display&&("background"===f.display?s:l).push({def:S,ui:f,instance:p,range:g,isStart:v.start&&v.start.valueOf()===g.start.valueOf(),isEnd:v.end&&v.end.valueOf()===g.end.valueOf()}))}for(var m in o)for(var y=0,E=en(o[m],n);y<E.length;y++){var S,D=E[y];f=u[(S=a[m]).defId];s.push({def:S,ui:f,instance:null,range:D,isStart:!1,isEnd:!1})}for(var c in i)for(var b=0,C=en(i[c],n);b<C.length;b++){D=C[b];s.push({def:e.defs[c],ui:u[c],instance:null,range:D,isStart:!1,isEnd:!1})}return{bg:s,fg:l}}function un(e){return"background"===e.ui.display||"inverse-background"===e.ui.display}function cn(e,t){e.fcSeg=t}function dn(e){return e.fcSeg||e.parentNode.fcSeg||null}function pn(e,t){return Oe(e,(function(e){return fn(e,t)}))}function fn(e,t){var n=[];return t[""]&&n.push(t[""]),t[e.defId]&&n.push(t[e.defId]),n.push(e.ui),Vt(n)}function hn(e,t){var n=e.map(vn);return n.sort((function(e,n){return ae(e,n,t)})),n.map((function(e){return e._seg}))}function vn(e){var t=e.eventRange,n=t.def,o=t.instance?t.instance.range:t.range,i=o.start?o.start.valueOf():0,a=o.end?o.end.valueOf():0;return r(r(r({},n.extendedProps),n),{id:n.publicId,start:i,end:a,duration:a-i,allDay:Number(n.allDay),_seg:e})}function gn(e,t){for(var n=t.pluginHooks.isDraggableTransformers,r=e.eventRange,o=r.def,i=r.ui,a=i.startEditable,s=0,l=n;s<l.length;s++){a=(0,l[s])(a,o,i,t)}return a}function mn(e,t){return e.isStart&&e.eventRange.ui.durationEditable&&t.options.eventResizableFromStart}function yn(e,t){return e.isEnd&&e.eventRange.ui.durationEditable}function En(e,t,n,r,o,i,a){var s=n.dateEnv,l=n.options,u=l.displayEventTime,c=l.displayEventEnd,d=e.eventRange.def,p=e.eventRange.instance;if(null==u&&(u=!1!==r),null==c&&(c=!1!==o),u&&!d.allDay&&(e.isStart||e.isEnd)){var f=i||(e.isStart?p.range.start:e.start||e.eventRange.range.start),h=a||(e.isEnd?p.range.end:e.end||e.eventRange.range.end);return c&&d.hasEnd?s.formatRange(f,h,t,{forcedStartTzo:i?null:p.forcedStartTzo,forcedEndTzo:a?null:p.forcedEndTzo}):s.format(f,t,{forcedTzo:i?null:p.forcedStartTzo})}return""}function Sn(e,t,n){var r=e.eventRange.range;return{isPast:r.end<(n||t.start),isFuture:r.start>=(n||t.end),isToday:t&&sn(t,r.start)}}function Dn(e){var t=["fc-event"];return e.isMirror&&t.push("fc-event-mirror"),e.isDraggable&&t.push("fc-event-draggable"),(e.isStartResizable||e.isEndResizable)&&t.push("fc-event-resizable"),e.isDragging&&t.push("fc-event-dragging"),e.isResizing&&t.push("fc-event-resizing"),e.isSelected&&t.push("fc-event-selected"),e.isStart&&t.push("fc-event-start"),e.isEnd&&t.push("fc-event-end"),e.isPast&&t.push("fc-event-past"),e.isToday&&t.push("fc-event-today"),e.isFuture&&t.push("fc-event-future"),t}function bn(e){return e.instance?e.instance.instanceId:e.def.defId+":"+e.range.start.toISOString()}var Cn={start:_t,end:_t,allDay:Boolean};function wn(e,t,n){var o=function(e,t){var n=xt(e,Cn),o=n.refined,i=n.extra,a=o.start?t.createMarkerMeta(o.start):null,s=o.end?t.createMarkerMeta(o.end):null,l=o.allDay;null==l&&(l=a&&a.isTimeUnspecified&&(!s||s.isTimeUnspecified));return r({range:{start:a?a.marker:null,end:s?s.marker:null},allDay:l},i)}(e,t),i=o.range;if(!i.start)return null;if(!i.end){if(null==n)return null;i.end=t.add(i.start,n)}return o}function Rn(e,t){return rn(e.range,t.range)&&e.allDay===t.allDay&&function(e,t){for(var n in t)if("range"!==n&&"allDay"!==n&&e[n]!==t[n])return!1;for(var n in e)if(!(n in t))return!1;return!0}(e,t)}function Tn(e,t,n){return r(r({},kn(e,t,n)),{timeZone:t.timeZone})}function kn(e,t,n){return{start:t.toDate(e.start),end:t.toDate(e.end),startStr:t.formatIso(e.start,{omitTime:n}),endStr:t.formatIso(e.end,{omitTime:n})}}function Mn(e,t,n){var r=Yt({editable:!1},n),o=Xt(r.refined,r.extra,"",e.allDay,!0,n);return{def:o,ui:fn(o,t),instance:Ie(o.defId,e.range),range:e.range,isStart:!0,isEnd:!0}}function xn(e,t,n){n.emitter.trigger("select",r(r({},_n(e,n)),{jsEvent:t?t.origEvent:null,view:n.viewApi||n.calendarApi.view}))}function _n(e,t){for(var n,o,i={},a=0,s=t.pluginHooks.dateSpanTransforms;a<s.length;a++){var l=s[a];r(i,l(e,t))}return r(i,(n=e,o=t.dateEnv,r(r({},kn(n.range,o,n.allDay)),{allDay:n.allDay}))),i}function In(e,t,n){var r=n.dateEnv,o=n.options,i=t;return e?(i=be(i),i=r.add(i,o.defaultAllDayEventDuration)):i=r.add(i,o.defaultTimedEventDuration),i}function Pn(e,t,n,r){var o=pn(e.defs,t),i={defs:{},instances:{}};for(var a in e.defs){var s=e.defs[a];i.defs[a]=Nn(s,o[a],n,r)}for(var l in e.instances){var u=e.instances[l];s=i.defs[u.defId];i.instances[l]=Hn(u,s,o[u.defId],n,r)}return i}function Nn(e,t,n,o){var i=n.standardProps||{};null==i.hasEnd&&t.durationEditable&&(n.startDelta||n.endDelta)&&(i.hasEnd=!0);var a=r(r(r({},e),i),{ui:r(r({},e.ui),i.ui)});n.extendedProps&&(a.extendedProps=r(r({},a.extendedProps),n.extendedProps));for(var s=0,l=o.pluginHooks.eventDefMutationAppliers;s<l.length;s++){(0,l[s])(a,n,o)}return!a.hasEnd&&o.options.forceEventDuration&&(a.hasEnd=!0),a}function Hn(e,t,n,o,i){var a=i.dateEnv,s=o.standardProps&&!0===o.standardProps.allDay,l=o.standardProps&&!1===o.standardProps.hasEnd,u=r({},e);return s&&(u.range=Kt(u.range)),o.datesDelta&&n.startEditable&&(u.range={start:a.add(u.range.start,o.datesDelta),end:a.add(u.range.end,o.datesDelta)}),o.startDelta&&n.durationEditable&&(u.range={start:a.add(u.range.start,o.startDelta),end:u.range.end}),o.endDelta&&n.durationEditable&&(u.range={start:u.range.start,end:a.add(u.range.end,o.endDelta)}),l&&(u.range={start:u.range.start,end:In(t.allDay,u.range.start,i)}),t.allDay&&(u.range={start:be(u.range.start),end:be(u.range.end)}),u.range.end<u.range.start&&(u.range.end=In(t.allDay,u.range.start,i)),u}var On=function(){function e(e,t,n){this.type=e,this.getCurrentData=t,this.dateEnv=n}return Object.defineProperty(e.prototype,"calendar",{get:function(){return this.getCurrentData().calendarApi},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"title",{get:function(){return this.getCurrentData().viewTitle},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"activeStart",{get:function(){return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"activeEnd",{get:function(){return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currentStart",{get:function(){return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currentEnd",{get:function(){return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end)},enumerable:!1,configurable:!0}),e.prototype.getOption=function(e){return this.getCurrentData().options[e]},e}(),An={id:String,defaultAllDay:Boolean,url:String,events:_t,eventDataTransform:_t,success:_t,failure:_t};function Un(e,t,n){var r;if(void 0===n&&(n=Ln(t)),"string"==typeof e?r={url:e}:"function"==typeof e||Array.isArray(e)?r={events:e}:"object"==typeof e&&e&&(r=e),r){var o=xt(r,n),i=o.refined,a=o.extra,s=function(e,t){for(var n=t.pluginHooks.eventSourceDefs,r=n.length-1;r>=0;r--){var o=n[r].parseMeta(e);if(o)return{sourceDefId:r,meta:o}}return null}(i,t);if(s)return{_raw:e,isFetching:!1,latestFetchId:"",fetchRange:null,defaultAllDay:i.defaultAllDay,eventDataTransform:i.eventDataTransform,success:i.success,failure:i.failure,publicId:i.id||"",sourceId:$(),sourceDefId:s.sourceDefId,meta:s.meta,ui:Wt(i,t),extendedProps:a}}return null}function Ln(e){return r(r(r({},Lt),An),e.pluginHooks.eventSourceRefiners)}function Wn(e,t){return"function"==typeof e&&(e=e()),null==e?t.createNowMarker():t.createMarker(e)}var Vn=function(){function e(){}return e.prototype.getCurrentData=function(){return this.currentDataManager.getCurrentData()},e.prototype.dispatch=function(e){return this.currentDataManager.dispatch(e)},Object.defineProperty(e.prototype,"view",{get:function(){return this.getCurrentData().viewApi},enumerable:!1,configurable:!0}),e.prototype.batchRendering=function(e){e()},e.prototype.updateSize=function(){this.trigger("_resize",!0)},e.prototype.setOption=function(e,t){this.dispatch({type:"SET_OPTION",optionName:e,rawOptionValue:t})},e.prototype.getOption=function(e){return this.currentDataManager.currentCalendarOptionsInput[e]},e.prototype.getAvailableLocaleCodes=function(){return Object.keys(this.getCurrentData().availableRawLocales)},e.prototype.on=function(e,t){var n=this.currentDataManager;n.currentCalendarOptionsRefiners[e]?n.emitter.on(e,t):console.warn("Unknown listener name '"+e+"'")},e.prototype.off=function(e,t){this.currentDataManager.emitter.off(e,t)},e.prototype.trigger=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];(t=this.currentDataManager.emitter).trigger.apply(t,o([e],n))},e.prototype.changeView=function(e,t){var n=this;this.batchRendering((function(){if(n.unselect(),t)if(t.start&&t.end)n.dispatch({type:"CHANGE_VIEW_TYPE",viewType:e}),n.dispatch({type:"SET_OPTION",optionName:"visibleRange",rawOptionValue:t});else{var r=n.getCurrentData().dateEnv;n.dispatch({type:"CHANGE_VIEW_TYPE",viewType:e,dateMarker:r.createMarker(t)})}else n.dispatch({type:"CHANGE_VIEW_TYPE",viewType:e})}))},e.prototype.zoomTo=function(e,t){var n;t=t||"day",n=this.getCurrentData().viewSpecs[t]||this.getUnitViewSpec(t),this.unselect(),n?this.dispatch({type:"CHANGE_VIEW_TYPE",viewType:n.type,dateMarker:e}):this.dispatch({type:"CHANGE_DATE",dateMarker:e})},e.prototype.getUnitViewSpec=function(e){var t,n,r=this.getCurrentData(),o=r.viewSpecs,i=r.toolbarConfig,a=[].concat(i.viewsWithButtons);for(var s in o)a.push(s);for(t=0;t<a.length;t++)if((n=o[a[t]])&&n.singleUnit===e)return n},e.prototype.prev=function(){this.unselect(),this.dispatch({type:"PREV"})},e.prototype.next=function(){this.unselect(),this.dispatch({type:"NEXT"})},e.prototype.prevYear=function(){var e=this.getCurrentData();this.unselect(),this.dispatch({type:"CHANGE_DATE",dateMarker:e.dateEnv.addYears(e.currentDate,-1)})},e.prototype.nextYear=function(){var e=this.getCurrentData();this.unselect(),this.dispatch({type:"CHANGE_DATE",dateMarker:e.dateEnv.addYears(e.currentDate,1)})},e.prototype.today=function(){var e=this.getCurrentData();this.unselect(),this.dispatch({type:"CHANGE_DATE",dateMarker:Wn(e.calendarOptions.now,e.dateEnv)})},e.prototype.gotoDate=function(e){var t=this.getCurrentData();this.unselect(),this.dispatch({type:"CHANGE_DATE",dateMarker:t.dateEnv.createMarker(e)})},e.prototype.incrementDate=function(e){var t=this.getCurrentData(),n=Ye(e);n&&(this.unselect(),this.dispatch({type:"CHANGE_DATE",dateMarker:t.dateEnv.add(t.currentDate,n)}))},e.prototype.getDate=function(){var e=this.getCurrentData();return e.dateEnv.toDate(e.currentDate)},e.prototype.formatDate=function(e,t){var n=this.getCurrentData().dateEnv;return n.format(n.createMarker(e),St(t))},e.prototype.formatRange=function(e,t,n){var r=this.getCurrentData().dateEnv;return r.formatRange(r.createMarker(e),r.createMarker(t),St(n),n)},e.prototype.formatIso=function(e,t){var n=this.getCurrentData().dateEnv;return n.formatIso(n.createMarker(e),{omitTime:t})},e.prototype.select=function(e,t){var n;n=null==t?null!=e.start?e:{start:e,end:null}:{start:e,end:t};var r=this.getCurrentData(),o=wn(n,r.dateEnv,Ye({days:1}));o&&(this.dispatch({type:"SELECT_DATES",selection:o}),xn(o,null,r))},e.prototype.unselect=function(e){var t=this.getCurrentData();t.dateSelection&&(this.dispatch({type:"UNSELECT_DATES"}),function(e,t){t.emitter.trigger("unselect",{jsEvent:e?e.origEvent:null,view:t.viewApi||t.calendarApi.view})}(e,t))},e.prototype.addEvent=function(e,t){if(e instanceof zn){var n=e._def,r=e._instance;return this.getCurrentData().eventStore.defs[n.defId]||(this.dispatch({type:"ADD_EVENTS",eventStore:Pt({def:n,instance:r})}),this.triggerEventAdd(e)),e}var o,i=this.getCurrentData();if(t instanceof L)o=t.internalEventSource;else if("boolean"==typeof t)t&&(o=Ue(i.eventSources)[0]);else if(null!=t){var a=this.getEventSourceById(t);if(!a)return console.warn('Could not find an event source with ID "'+t+'"'),null;o=a.internalEventSource}var s=qt(e,o,i,!1);if(s){var l=new zn(i,s.def,s.def.recurringDef?null:s.instance);return this.dispatch({type:"ADD_EVENTS",eventStore:Pt(s)}),this.triggerEventAdd(l),l}return null},e.prototype.triggerEventAdd=function(e){var t=this;this.getCurrentData().emitter.trigger("eventAdd",{event:e,relatedEvents:[],revert:function(){t.dispatch({type:"REMOVE_EVENTS",eventStore:Fn(e)})}})},e.prototype.getEventById=function(e){var t=this.getCurrentData(),n=t.eventStore,r=n.defs,o=n.instances;for(var i in e=String(e),r){var a=r[i];if(a.publicId===e){if(a.recurringDef)return new zn(t,a,null);for(var s in o){var l=o[s];if(l.defId===a.defId)return new zn(t,a,l)}}}return null},e.prototype.getEvents=function(){var e=this.getCurrentData();return Bn(e.eventStore,e)},e.prototype.removeAllEvents=function(){this.dispatch({type:"REMOVE_ALL_EVENTS"})},e.prototype.getEventSources=function(){var e=this.getCurrentData(),t=e.eventSources,n=[];for(var r in t)n.push(new L(e,t[r]));return n},e.prototype.getEventSourceById=function(e){var t=this.getCurrentData(),n=t.eventSources;for(var r in e=String(e),n)if(n[r].publicId===e)return new L(t,n[r]);return null},e.prototype.addEventSource=function(e){var t=this.getCurrentData();if(e instanceof L)return t.eventSources[e.internalEventSource.sourceId]||this.dispatch({type:"ADD_EVENT_SOURCES",sources:[e.internalEventSource]}),e;var n=Un(e,t);return n?(this.dispatch({type:"ADD_EVENT_SOURCES",sources:[n]}),new L(t,n)):null},e.prototype.removeAllEventSources=function(){this.dispatch({type:"REMOVE_ALL_EVENT_SOURCES"})},e.prototype.refetchEvents=function(){this.dispatch({type:"FETCH_EVENT_SOURCES"})},e.prototype.scrollToTime=function(e){var t=Ye(e);t&&this.trigger("_scrollRequest",{time:t})},e}(),zn=function(){function e(e,t,n){this._context=e,this._def=t,this._instance=n||null}return e.prototype.setProp=function(e,t){var n,r;if(e in jt)console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");else if(e in Bt)t=Bt[e](t),this.mutate({standardProps:(n={},n[e]=t,n)});else if(e in Lt){var o=Lt[e](t);"color"===e?o={backgroundColor:t,borderColor:t}:"editable"===e?o={startEditable:t,durationEditable:t}:((r={})[e]=t,o=r),this.mutate({standardProps:{ui:o}})}else console.warn("Could not set prop '"+e+"'. Use setExtendedProp instead.")},e.prototype.setExtendedProp=function(e,t){var n;this.mutate({extendedProps:(n={},n[e]=t,n)})},e.prototype.setStart=function(e,t){void 0===t&&(t={});var n=this._context.dateEnv,r=n.createMarker(e);if(r&&this._instance){var o=Qt(this._instance.range.start,r,n,t.granularity);t.maintainDuration?this.mutate({datesDelta:o}):this.mutate({startDelta:o})}},e.prototype.setEnd=function(e,t){void 0===t&&(t={});var n,r=this._context.dateEnv;if((null==e||(n=r.createMarker(e)))&&this._instance)if(n){var o=Qt(this._instance.range.end,n,r,t.granularity);this.mutate({endDelta:o})}else this.mutate({standardProps:{hasEnd:!1}})},e.prototype.setDates=function(e,t,n){void 0===n&&(n={});var r,o,i,a=this._context.dateEnv,s={allDay:n.allDay},l=a.createMarker(e);if(l&&((null==t||(r=a.createMarker(t)))&&this._instance)){var u=this._instance.range;!0===n.allDay&&(u=Kt(u));var c=Qt(u.start,l,a,n.granularity);if(r){var d=Qt(u.end,r,a,n.granularity);i=d,(o=c).years===i.years&&o.months===i.months&&o.days===i.days&&o.milliseconds===i.milliseconds?this.mutate({datesDelta:c,standardProps:s}):this.mutate({startDelta:c,endDelta:d,standardProps:s})}else s.hasEnd=!1,this.mutate({datesDelta:c,standardProps:s})}},e.prototype.moveStart=function(e){var t=Ye(e);t&&this.mutate({startDelta:t})},e.prototype.moveEnd=function(e){var t=Ye(e);t&&this.mutate({endDelta:t})},e.prototype.moveDates=function(e){var t=Ye(e);t&&this.mutate({datesDelta:t})},e.prototype.setAllDay=function(e,t){void 0===t&&(t={});var n={allDay:e},r=t.maintainDuration;null==r&&(r=this._context.options.allDayMaintainDuration),this._def.allDay!==e&&(n.hasEnd=r),this.mutate({standardProps:n})},e.prototype.formatRange=function(e){var t=this._context.dateEnv,n=this._instance,r=St(e);return this._def.hasEnd?t.formatRange(n.range.start,n.range.end,r,{forcedStartTzo:n.forcedStartTzo,forcedEndTzo:n.forcedEndTzo}):t.format(n.range.start,r,{forcedTzo:n.forcedStartTzo})},e.prototype.mutate=function(t){var n=this._instance;if(n){var r=this._def,o=this._context,i=Nt(o.getCurrentData().eventStore,n.instanceId);i=Pn(i,{"":{display:"",startEditable:!0,durationEditable:!0,constraints:[],overlap:null,allows:[],backgroundColor:"",borderColor:"",textColor:"",classNames:[]}},t,o);var a=new e(o,r,n);this._def=i.defs[r.defId],this._instance=i.instances[n.instanceId],o.dispatch({type:"MERGE_EVENTS",eventStore:i}),o.emitter.trigger("eventChange",{oldEvent:a,event:this,relatedEvents:Bn(i,o,n),revert:function(){o.dispatch({type:"REMOVE_EVENTS",eventStore:i})}})}},e.prototype.remove=function(){var e=this._context,t=Fn(this);e.dispatch({type:"REMOVE_EVENTS",eventStore:t}),e.emitter.trigger("eventRemove",{event:this,relatedEvents:[],revert:function(){e.dispatch({type:"MERGE_EVENTS",eventStore:t})}})},Object.defineProperty(e.prototype,"source",{get:function(){var e=this._def.sourceId;return e?new L(this._context,this._context.getCurrentData().eventSources[e]):null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"start",{get:function(){return this._instance?this._context.dateEnv.toDate(this._instance.range.start):null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"end",{get:function(){return this._instance&&this._def.hasEnd?this._context.dateEnv.toDate(this._instance.range.end):null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startStr",{get:function(){var e=this._instance;return e?this._context.dateEnv.formatIso(e.range.start,{omitTime:this._def.allDay,forcedTzo:e.forcedStartTzo}):""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"endStr",{get:function(){var e=this._instance;return e&&this._def.hasEnd?this._context.dateEnv.formatIso(e.range.end,{omitTime:this._def.allDay,forcedTzo:e.forcedEndTzo}):""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"id",{get:function(){return this._def.publicId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"groupId",{get:function(){return this._def.groupId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"allDay",{get:function(){return this._def.allDay},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"title",{get:function(){return this._def.title},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._def.url},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"display",{get:function(){return this._def.ui.display||"auto"},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startEditable",{get:function(){return this._def.ui.startEditable},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"durationEditable",{get:function(){return this._def.ui.durationEditable},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"constraint",{get:function(){return this._def.ui.constraints[0]||null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"overlap",{get:function(){return this._def.ui.overlap},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"allow",{get:function(){return this._def.ui.allows[0]||null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"backgroundColor",{get:function(){return this._def.ui.backgroundColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"borderColor",{get:function(){return this._def.ui.borderColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"textColor",{get:function(){return this._def.ui.textColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classNames",{get:function(){return this._def.ui.classNames},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"extendedProps",{get:function(){return this._def.extendedProps},enumerable:!1,configurable:!0}),e.prototype.toPlainObject=function(e){void 0===e&&(e={});var t=this._def,n=t.ui,o=this.startStr,i=this.endStr,a={};return t.title&&(a.title=t.title),o&&(a.start=o),i&&(a.end=i),t.publicId&&(a.id=t.publicId),t.groupId&&(a.groupId=t.groupId),t.url&&(a.url=t.url),n.display&&"auto"!==n.display&&(a.display=n.display),e.collapseColor&&n.backgroundColor&&n.backgroundColor===n.borderColor?a.color=n.backgroundColor:(n.backgroundColor&&(a.backgroundColor=n.backgroundColor),n.borderColor&&(a.borderColor=n.borderColor)),n.textColor&&(a.textColor=n.textColor),n.classNames.length&&(a.classNames=n.classNames),Object.keys(t.extendedProps).length&&(e.collapseExtendedProps?r(a,t.extendedProps):a.extendedProps=t.extendedProps),a},e.prototype.toJSON=function(){return this.toPlainObject()},e}();function Fn(e){var t,n,r=e._def,o=e._instance;return{defs:(t={},t[r.defId]=r,t),instances:o?(n={},n[o.instanceId]=o,n):{}}}function Bn(e,t,n){var r=e.defs,o=e.instances,i=[],a=n?n.instanceId:"";for(var s in o){var l=o[s],u=r[l.defId];l.instanceId!==a&&i.push(new zn(t,u,l))}return i}var jn={};var Gn,qn=function(){function e(){}return e.prototype.getMarkerYear=function(e){return e.getUTCFullYear()},e.prototype.getMarkerMonth=function(e){return e.getUTCMonth()},e.prototype.getMarkerDay=function(e){return e.getUTCDate()},e.prototype.arrayToMarker=function(e){return Me(e)},e.prototype.markerToArray=function(e){return ke(e)},e}();Gn=qn,jn["gregory"]=Gn;var Yn=/^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;function Zn(e){var t=Yn.exec(e);if(t){var n=new Date(Date.UTC(Number(t[1]),t[3]?Number(t[3])-1:0,Number(t[5]||1),Number(t[7]||0),Number(t[8]||0),Number(t[10]||0),t[12]?1e3*Number("0."+t[12]):0));if(xe(n)){var r=null;return t[13]&&(r=("-"===t[15]?-1:1)*(60*Number(t[16]||0)+Number(t[18]||0))),{marker:n,isTimeUnspecified:!t[6],timeZoneOffset:r}}}return null}var Xn=function(){function e(e){var t=this.timeZone=e.timeZone,n="local"!==t&&"UTC"!==t;e.namedTimeZoneImpl&&n&&(this.namedTimeZoneImpl=new e.namedTimeZoneImpl(t)),this.canComputeOffset=Boolean(!n||this.namedTimeZoneImpl),this.calendarSystem=function(e){return new jn[e]}(e.calendarSystem),this.locale=e.locale,this.weekDow=e.locale.week.dow,this.weekDoy=e.locale.week.doy,"ISO"===e.weekNumberCalculation&&(this.weekDow=1,this.weekDoy=4),"number"==typeof e.firstDay&&(this.weekDow=e.firstDay),"function"==typeof e.weekNumberCalculation&&(this.weekNumberFunc=e.weekNumberCalculation),this.weekText=null!=e.weekText?e.weekText:e.locale.options.weekText,this.cmdFormatter=e.cmdFormatter,this.defaultSeparator=e.defaultSeparator}return e.prototype.createMarker=function(e){var t=this.createMarkerMeta(e);return null===t?null:t.marker},e.prototype.createNowMarker=function(){return this.canComputeOffset?this.timestampToMarker((new Date).valueOf()):Me(Re(new Date))},e.prototype.createMarkerMeta=function(e){if("string"==typeof e)return this.parse(e);var t=null;return"number"==typeof e?t=this.timestampToMarker(e):e instanceof Date?(e=e.valueOf(),isNaN(e)||(t=this.timestampToMarker(e))):Array.isArray(e)&&(t=Me(e)),null!==t&&xe(t)?{marker:t,isTimeUnspecified:!1,forcedTzo:null}:null},e.prototype.parse=function(e){var t=Zn(e);if(null===t)return null;var n=t.marker,r=null;return null!==t.timeZoneOffset&&(this.canComputeOffset?n=this.timestampToMarker(n.valueOf()-60*t.timeZoneOffset*1e3):r=t.timeZoneOffset),{marker:n,isTimeUnspecified:t.isTimeUnspecified,forcedTzo:r}},e.prototype.getYear=function(e){return this.calendarSystem.getMarkerYear(e)},e.prototype.getMonth=function(e){return this.calendarSystem.getMarkerMonth(e)},e.prototype.add=function(e,t){var n=this.calendarSystem.markerToArray(e);return n[0]+=t.years,n[1]+=t.months,n[2]+=t.days,n[6]+=t.milliseconds,this.calendarSystem.arrayToMarker(n)},e.prototype.subtract=function(e,t){var n=this.calendarSystem.markerToArray(e);return n[0]-=t.years,n[1]-=t.months,n[2]-=t.days,n[6]-=t.milliseconds,this.calendarSystem.arrayToMarker(n)},e.prototype.addYears=function(e,t){var n=this.calendarSystem.markerToArray(e);return n[0]+=t,this.calendarSystem.arrayToMarker(n)},e.prototype.addMonths=function(e,t){var n=this.calendarSystem.markerToArray(e);return n[1]+=t,this.calendarSystem.arrayToMarker(n)},e.prototype.diffWholeYears=function(e,t){var n=this.calendarSystem;return _e(e)===_e(t)&&n.getMarkerDay(e)===n.getMarkerDay(t)&&n.getMarkerMonth(e)===n.getMarkerMonth(t)?n.getMarkerYear(t)-n.getMarkerYear(e):null},e.prototype.diffWholeMonths=function(e,t){var n=this.calendarSystem;return _e(e)===_e(t)&&n.getMarkerDay(e)===n.getMarkerDay(t)?n.getMarkerMonth(t)-n.getMarkerMonth(e)+12*(n.getMarkerYear(t)-n.getMarkerYear(e)):null},e.prototype.greatestWholeUnit=function(e,t){var n=this.diffWholeYears(e,t);return null!==n?{unit:"year",value:n}:null!==(n=this.diffWholeMonths(e,t))?{unit:"month",value:n}:null!==(n=Se(e,t))?{unit:"week",value:n}:null!==(n=De(e,t))?{unit:"day",value:n}:de(n=function(e,t){return(t.valueOf()-e.valueOf())/36e5}(e,t))?{unit:"hour",value:n}:de(n=function(e,t){return(t.valueOf()-e.valueOf())/6e4}(e,t))?{unit:"minute",value:n}:de(n=function(e,t){return(t.valueOf()-e.valueOf())/1e3}(e,t))?{unit:"second",value:n}:{unit:"millisecond",value:t.valueOf()-e.valueOf()}},e.prototype.countDurationsBetween=function(e,t,n){var r;return n.years&&null!==(r=this.diffWholeYears(e,t))?r/(Je(n)/365):n.months&&null!==(r=this.diffWholeMonths(e,t))?r/function(e){return Je(e)/30}(n):n.days&&null!==(r=De(e,t))?r/Je(n):(t.valueOf()-e.valueOf())/$e(n)},e.prototype.startOf=function(e,t){return"year"===t?this.startOfYear(e):"month"===t?this.startOfMonth(e):"week"===t?this.startOfWeek(e):"day"===t?be(e):"hour"===t?function(e){return Me([e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours()])}(e):"minute"===t?function(e){return Me([e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes()])}(e):"second"===t?function(e){return Me([e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()])}(e):void 0},e.prototype.startOfYear=function(e){return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e)])},e.prototype.startOfMonth=function(e){return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e),this.calendarSystem.getMarkerMonth(e)])},e.prototype.startOfWeek=function(e){return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e),this.calendarSystem.getMarkerMonth(e),e.getUTCDate()-(e.getUTCDay()-this.weekDow+7)%7])},e.prototype.computeWeekNumber=function(e){return this.weekNumberFunc?this.weekNumberFunc(this.toDate(e)):function(e,t,n){var r=e.getUTCFullYear(),o=Ce(e,r,t,n);if(o<1)return Ce(e,r-1,t,n);var i=Ce(e,r+1,t,n);return i>=1?Math.min(o,i):o}(e,this.weekDow,this.weekDoy)},e.prototype.format=function(e,t,n){return void 0===n&&(n={}),t.format({marker:e,timeZoneOffset:null!=n.forcedTzo?n.forcedTzo:this.offsetForMarker(e)},this)},e.prototype.formatRange=function(e,t,n,r){return void 0===r&&(r={}),r.isEndExclusive&&(t=ge(t,-1)),n.formatRange({marker:e,timeZoneOffset:null!=r.forcedStartTzo?r.forcedStartTzo:this.offsetForMarker(e)},{marker:t,timeZoneOffset:null!=r.forcedEndTzo?r.forcedEndTzo:this.offsetForMarker(t)},this,r.defaultSeparator)},e.prototype.formatIso=function(e,t){void 0===t&&(t={});var n=null;return t.omitTimeZoneOffset||(n=null!=t.forcedTzo?t.forcedTzo:this.offsetForMarker(e)),function(e,t,n){void 0===n&&(n=!1);var r=e.toISOString();return r=r.replace(".000",""),n&&(r=r.replace("T00:00:00Z","")),r.length>10&&(null==t?r=r.replace("Z",""):0!==t&&(r=r.replace("Z",rt(t,!0)))),r}(e,n,t.omitTime)},e.prototype.timestampToMarker=function(e){return"local"===this.timeZone?Me(Re(new Date(e))):"UTC"!==this.timeZone&&this.namedTimeZoneImpl?Me(this.namedTimeZoneImpl.timestampToArray(e)):new Date(e)},e.prototype.offsetForMarker=function(e){return"local"===this.timeZone?-Te(ke(e)).getTimezoneOffset():"UTC"===this.timeZone?0:this.namedTimeZoneImpl?this.namedTimeZoneImpl.offsetForArray(ke(e)):null},e.prototype.toDate=function(e,t){return"local"===this.timeZone?Te(ke(e)):"UTC"===this.timeZone?new Date(e.valueOf()):this.namedTimeZoneImpl?new Date(e.valueOf()-1e3*this.namedTimeZoneImpl.offsetForArray(ke(e))*60):new Date(e.valueOf()-(t||0))},e}(),Kn=[],Jn={code:"en",week:{dow:0,doy:4},direction:"ltr",buttonText:{prev:"prev",next:"next",prevYear:"prev year",nextYear:"next year",year:"year",today:"today",month:"month",week:"week",day:"day",list:"list"},weekText:"W",allDayText:"all-day",moreLinkText:"more",noEventsText:"No events to display"};function $n(e){for(var t=e.length>0?e[0].code:"en",n=Kn.concat(e),r={en:Jn},o=0,i=n;o<i.length;o++){var a=i[o];r[a.code]=a}return{map:r,defaultCode:t}}function Qn(e,t){return"object"!=typeof e||Array.isArray(e)?function(e,t){var n=[].concat(e||[]),r=function(e,t){for(var n=0;n<e.length;n++)for(var r=e[n].toLocaleLowerCase().split("-"),o=r.length;o>0;o--){var i=r.slice(0,o).join("-");if(t[i])return t[i]}return null}(n,t)||Jn;return er(e,n,r)}(e,t):er(e.code,[e.code],e)}function er(e,t,n){var r=Ne([Jn,n],["buttonText"]);delete r.code;var o=r.week;return delete r.week,{codeArg:e,codes:t,week:o,simpleNumberFormat:new Intl.NumberFormat(e),options:r}}function tr(e){var t=Qn(e.locale||"en",$n([]).map);return new Xn(r(r({timeZone:bt.timeZone,calendarSystem:"gregory"},e),{locale:t}))}var nr,rr={startTime:"09:00",endTime:"17:00",daysOfWeek:[1,2,3,4,5],display:"inverse-background",classNames:"fc-non-business",groupId:"_businessHours"};function or(e,t){return It(function(e){var t;t=!0===e?[{}]:Array.isArray(e)?e.filter((function(e){return e.daysOfWeek})):"object"==typeof e&&e?[e]:[];return t=t.map((function(e){return r(r({},rr),e)}))}(e),null,t)}function ir(e,t){return e.left>=t.left&&e.left<t.right&&e.top>=t.top&&e.top<t.bottom}function ar(e,t){var n={left:Math.max(e.left,t.left),right:Math.min(e.right,t.right),top:Math.max(e.top,t.top),bottom:Math.min(e.bottom,t.bottom)};return n.left<n.right&&n.top<n.bottom&&n}function sr(e,t){return{left:Math.min(Math.max(e.left,t.left),t.right),top:Math.min(Math.max(e.top,t.top),t.bottom)}}function lr(e){return{left:(e.left+e.right)/2,top:(e.top+e.bottom)/2}}function ur(e,t){return{left:e.left-t.left,top:e.top-t.top}}function cr(){return null==nr&&(nr=function(){if("undefined"==typeof document)return!0;var e=document.createElement("div");e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.innerHTML="<table><tr><td><div></div></td></tr></table>",e.querySelector("table").style.height="100px",e.querySelector("div").style.height="100%",document.body.appendChild(e);var t=e.querySelector("div").offsetHeight>0;return document.body.removeChild(e),t}()),nr}var dr={defs:{},instances:{}},pr=function(){function e(){this.getKeysForEventDefs=it(this._getKeysForEventDefs),this.splitDateSelection=it(this._splitDateSpan),this.splitEventStore=it(this._splitEventStore),this.splitIndividualUi=it(this._splitIndividualUi),this.splitEventDrag=it(this._splitInteraction),this.splitEventResize=it(this._splitInteraction),this.eventUiBuilders={}}return e.prototype.splitProps=function(e){var t=this,n=this.getKeyInfo(e),r=this.getKeysForEventDefs(e.eventStore),o=this.splitDateSelection(e.dateSelection),i=this.splitIndividualUi(e.eventUiBases,r),a=this.splitEventStore(e.eventStore,r),s=this.splitEventDrag(e.eventDrag),l=this.splitEventResize(e.eventResize),u={};for(var c in this.eventUiBuilders=Oe(n,(function(e,n){return t.eventUiBuilders[n]||it(fr)})),n){var d=n[c],p=a[c]||dr,f=this.eventUiBuilders[c];u[c]={businessHours:d.businessHours||e.businessHours,dateSelection:o[c]||null,eventStore:p,eventUiBases:f(e.eventUiBases[""],d.ui,i[c]),eventSelection:p.instances[e.eventSelection]?e.eventSelection:"",eventDrag:s[c]||null,eventResize:l[c]||null}}return u},e.prototype._splitDateSpan=function(e){var t={};if(e)for(var n=0,r=this.getKeysForDateSpan(e);n<r.length;n++){t[r[n]]=e}return t},e.prototype._getKeysForEventDefs=function(e){var t=this;return Oe(e.defs,(function(e){return t.getKeysForEventDef(e)}))},e.prototype._splitEventStore=function(e,t){var n=e.defs,r=e.instances,o={};for(var i in n)for(var a=0,s=t[i];a<s.length;a++){o[p=s[a]]||(o[p]={defs:{},instances:{}}),o[p].defs[i]=n[i]}for(var l in r)for(var u=r[l],c=0,d=t[u.defId];c<d.length;c++){var p;o[p=d[c]]&&(o[p].instances[l]=u)}return o},e.prototype._splitIndividualUi=function(e,t){var n={};for(var r in e)if(r)for(var o=0,i=t[r];o<i.length;o++){var a=i[o];n[a]||(n[a]={}),n[a][r]=e[r]}return n},e.prototype._splitInteraction=function(e){var t={};if(e){var n=this._splitEventStore(e.affectedEvents,this._getKeysForEventDefs(e.affectedEvents)),r=this._getKeysForEventDefs(e.mutatedEvents),o=this._splitEventStore(e.mutatedEvents,r),i=function(r){t[r]||(t[r]={affectedEvents:n[r]||dr,mutatedEvents:o[r]||dr,isEvent:e.isEvent})};for(var a in n)i(a);for(var a in o)i(a)}return t},e}();function fr(e,t,n){var o=[];e&&o.push(e),t&&o.push(t);var i={"":Vt(o)};return n&&r(i,n),i}function hr(e,t,n,r){return{dow:e.getUTCDay(),isDisabled:Boolean(r&&!sn(r.activeRange,e)),isOther:Boolean(r&&!sn(r.currentRange,e)),isToday:Boolean(t&&sn(t,e)),isPast:Boolean(n?e<n:!!t&&e<t.start),isFuture:Boolean(n?e>n:!!t&&e>=t.end)}}function vr(e,t){var n=["fc-day","fc-day-"+fe[e.dow]];return e.isDisabled?n.push("fc-day-disabled"):(e.isToday&&(n.push("fc-day-today"),n.push(t.getClass("today"))),e.isPast&&n.push("fc-day-past"),e.isFuture&&n.push("fc-day-future"),e.isOther&&n.push("fc-day-other")),n}function gr(e,t){return void 0===t&&(t="day"),JSON.stringify({date:tt(e),type:t})}var mr,yr=null;function Er(){return null===yr&&(yr=function(){var e=document.createElement("div");j(e,{position:"absolute",top:-1e3,left:0,border:0,padding:0,overflow:"scroll",direction:"rtl"}),e.innerHTML="<div></div>",document.body.appendChild(e);var t=e.firstChild.getBoundingClientRect().left>e.getBoundingClientRect().left;return W(e),t}()),yr}function Sr(){return mr||(mr=function(){var e=document.createElement("div");e.style.overflow="scroll",document.body.appendChild(e);var t=Dr(e);return document.body.removeChild(e),t}()),mr}function Dr(e){return{x:e.offsetHeight-e.clientHeight,y:e.offsetWidth-e.clientWidth}}function br(e,t){void 0===t&&(t=!1);var n=window.getComputedStyle(e),r=parseInt(n.borderLeftWidth,10)||0,o=parseInt(n.borderRightWidth,10)||0,i=parseInt(n.borderTopWidth,10)||0,a=parseInt(n.borderBottomWidth,10)||0,s=Dr(e),l=s.y-r-o,u={borderLeft:r,borderRight:o,borderTop:i,borderBottom:a,scrollbarBottom:s.x-i-a,scrollbarLeft:0,scrollbarRight:0};return Er()&&"rtl"===n.direction?u.scrollbarLeft=l:u.scrollbarRight=l,t&&(u.paddingLeft=parseInt(n.paddingLeft,10)||0,u.paddingRight=parseInt(n.paddingRight,10)||0,u.paddingTop=parseInt(n.paddingTop,10)||0,u.paddingBottom=parseInt(n.paddingBottom,10)||0),u}function Cr(e,t,n){void 0===t&&(t=!1);var r=n?e.getBoundingClientRect():wr(e),o=br(e,t),i={left:r.left+o.borderLeft+o.scrollbarLeft,right:r.right-o.borderRight-o.scrollbarRight,top:r.top+o.borderTop,bottom:r.bottom-o.borderBottom-o.scrollbarBottom};return t&&(i.left+=o.paddingLeft,i.right-=o.paddingRight,i.top+=o.paddingTop,i.bottom-=o.paddingBottom),i}function wr(e){var t=e.getBoundingClientRect();return{left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,right:t.right+window.pageXOffset,bottom:t.bottom+window.pageYOffset}}function Rr(e){for(var t=[];e instanceof HTMLElement;){var n=window.getComputedStyle(e);if("fixed"===n.position)break;/(auto|scroll)/.test(n.overflow+n.overflowY+n.overflowX)&&t.push(e),e=e.parentNode}return t}function Tr(e,t,n){var r=!1,o=function(){r||(r=!0,t.apply(this,arguments))},i=function(){r||(r=!0,n&&n.apply(this,arguments))},a=e(o,i);a&&"function"==typeof a.then&&a.then(o,i)}var kr=function(){function e(){this.handlers={},this.thisContext=null}return e.prototype.setThisContext=function(e){this.thisContext=e},e.prototype.setOptions=function(e){this.options=e},e.prototype.on=function(e,t){!function(e,t,n){(e[t]||(e[t]=[])).push(n)}(this.handlers,e,t)},e.prototype.off=function(e,t){!function(e,t,n){n?e[t]&&(e[t]=e[t].filter((function(e){return e!==n}))):delete e[t]}(this.handlers,e,t)},e.prototype.trigger=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=this.handlers[e]||[],o=this.options&&this.options[e],i=[].concat(o||[],r),a=0,s=i;a<s.length;a++){var l=s[a];l.apply(this.thisContext,t)}},e.prototype.hasHandlers=function(e){return this.handlers[e]&&this.handlers[e].length||this.options&&this.options[e]},e}();var Mr=function(){function e(e,t,n,r){this.els=t;var o=this.originClientRect=e.getBoundingClientRect();n&&this.buildElHorizontals(o.left),r&&this.buildElVerticals(o.top)}return e.prototype.buildElHorizontals=function(e){for(var t=[],n=[],r=0,o=this.els;r<o.length;r++){var i=o[r].getBoundingClientRect();t.push(i.left-e),n.push(i.right-e)}this.lefts=t,this.rights=n},e.prototype.buildElVerticals=function(e){for(var t=[],n=[],r=0,o=this.els;r<o.length;r++){var i=o[r].getBoundingClientRect();t.push(i.top-e),n.push(i.bottom-e)}this.tops=t,this.bottoms=n},e.prototype.leftToIndex=function(e){var t,n=this.lefts,r=this.rights,o=n.length;for(t=0;t<o;t++)if(e>=n[t]&&e<r[t])return t},e.prototype.topToIndex=function(e){var t,n=this.tops,r=this.bottoms,o=n.length;for(t=0;t<o;t++)if(e>=n[t]&&e<r[t])return t},e.prototype.getWidth=function(e){return this.rights[e]-this.lefts[e]},e.prototype.getHeight=function(e){return this.bottoms[e]-this.tops[e]},e}(),xr=function(){function e(){}return e.prototype.getMaxScrollTop=function(){return this.getScrollHeight()-this.getClientHeight()},e.prototype.getMaxScrollLeft=function(){return this.getScrollWidth()-this.getClientWidth()},e.prototype.canScrollVertically=function(){return this.getMaxScrollTop()>0},e.prototype.canScrollHorizontally=function(){return this.getMaxScrollLeft()>0},e.prototype.canScrollUp=function(){return this.getScrollTop()>0},e.prototype.canScrollDown=function(){return this.getScrollTop()<this.getMaxScrollTop()},e.prototype.canScrollLeft=function(){return this.getScrollLeft()>0},e.prototype.canScrollRight=function(){return this.getScrollLeft()<this.getMaxScrollLeft()},e}(),_r=function(e){function t(t){var n=e.call(this)||this;return n.el=t,n}return n(t,e),t.prototype.getScrollTop=function(){return this.el.scrollTop},t.prototype.getScrollLeft=function(){return this.el.scrollLeft},t.prototype.setScrollTop=function(e){this.el.scrollTop=e},t.prototype.setScrollLeft=function(e){this.el.scrollLeft=e},t.prototype.getScrollWidth=function(){return this.el.scrollWidth},t.prototype.getScrollHeight=function(){return this.el.scrollHeight},t.prototype.getClientHeight=function(){return this.el.clientHeight},t.prototype.getClientWidth=function(){return this.el.clientWidth},t}(xr),Ir=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.getScrollTop=function(){return window.pageYOffset},t.prototype.getScrollLeft=function(){return window.pageXOffset},t.prototype.setScrollTop=function(e){window.scroll(window.pageXOffset,e)},t.prototype.setScrollLeft=function(e){window.scroll(e,window.pageYOffset)},t.prototype.getScrollWidth=function(){return document.documentElement.scrollWidth},t.prototype.getScrollHeight=function(){return document.documentElement.scrollHeight},t.prototype.getClientHeight=function(){return document.documentElement.clientHeight},t.prototype.getClientWidth=function(){return document.documentElement.clientWidth},t}(xr),Pr=function(){function e(e){this.iconOverrideOption&&this.setIconOverride(e[this.iconOverrideOption])}return e.prototype.setIconOverride=function(e){var t,n;if("object"==typeof e&&e){for(n in t=r({},this.iconClasses),e)t[n]=this.applyIconOverridePrefix(e[n]);this.iconClasses=t}else!1===e&&(this.iconClasses={})},e.prototype.applyIconOverridePrefix=function(e){var t=this.iconOverridePrefix;return t&&0!==e.indexOf(t)&&(e=t+e),e},e.prototype.getClass=function(e){return this.classes[e]||""},e.prototype.getIconClass=function(e,t){var n;return(n=t&&this.rtlIconClasses&&this.rtlIconClasses[e]||this.iconClasses[e])?this.baseIconClass+" "+n:""},e.prototype.getCustomButtonIconClass=function(e){var t;return this.iconOverrideCustomButtonOption&&(t=e[this.iconOverrideCustomButtonOption])?this.baseIconClass+" "+this.applyIconOverridePrefix(t):""},e}();if(Pr.prototype.classes={},Pr.prototype.iconClasses={},Pr.prototype.baseIconClass="",Pr.prototype.iconOverridePrefix="","undefined"==typeof FullCalendarVDom)throw new Error("Please import the top-level fullcalendar lib before attempting to import a plugin.");var Nr=FullCalendarVDom.Component,Hr=FullCalendarVDom.createElement,Or=FullCalendarVDom.render,Ar=FullCalendarVDom.createRef,Ur=FullCalendarVDom.Fragment,Lr=FullCalendarVDom.createContext,Wr=FullCalendarVDom.flushToDom,Vr=function(){function e(e,t,n){var o=this;this.execFunc=e,this.emitter=t,this.scrollTime=n,this.handleScrollRequest=function(e){o.queuedRequest=r({},o.queuedRequest||{},e),o.drain()},t.on("_scrollRequest",this.handleScrollRequest),this.fireInitialScroll()}return e.prototype.detach=function(){this.emitter.off("_scrollRequest",this.handleScrollRequest)},e.prototype.update=function(e){e?this.fireInitialScroll():this.drain()},e.prototype.fireInitialScroll=function(){this.handleScrollRequest({time:this.scrollTime})},e.prototype.drain=function(){this.queuedRequest&&this.execFunc(this.queuedRequest)&&(this.queuedRequest=null)},e}(),zr=Lr({});function Fr(e,t,n,r,o,i,a,s,l,u,c,d,p){return{dateEnv:o,options:n,pluginHooks:a,emitter:u,dispatch:s,getCurrentData:l,calendarApi:c,viewSpec:e,viewApi:t,dateProfileGenerator:r,theme:i,isRtl:"rtl"===n.direction,addResizeHandler:function(e){u.on("_resize",e)},removeResizeHandler:function(e){u.off("_resize",e)},createScrollResponder:function(e){return new Vr(e,u,Ye(n.scrollTime))},registerInteractiveComponent:d,unregisterInteractiveComponent:p}}var Br=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.shouldComponentUpdate=function(e,t){return this.debug&&console.log(We(e,this.props),We(t,this.state)),!Ve(this.props,e,this.propEquality)||!Ve(this.state,t,this.stateEquality)},t.addPropsEquality=Gr,t.addStateEquality=qr,t.contextType=zr,t}(Nr);Br.prototype.propEquality={},Br.prototype.stateEquality={};var jr=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.contextType=zr,t}(Br);function Gr(e){var t=Object.create(this.prototype.propEquality);r(t,e),this.prototype.propEquality=t}function qr(e){var t=Object.create(this.prototype.stateEquality);r(t,e),this.prototype.stateEquality=t}function Yr(e,t){"function"==typeof e?e(t):e&&(e.current=t)}function Zr(e,t,n,r,o){switch(t.type){case"RECEIVE_EVENTS":return function(e,t,n,r,o,i){if(t&&n===t.latestFetchId){var a=It(function(e,t,n){var r=n.options.eventDataTransform,o=t?t.eventDataTransform:null;o&&(e=Xr(e,o));r&&(e=Xr(e,r));return e}(o,t,i),t,i);return r&&(a=Be(a,r,i)),Ot(Kr(e,t.sourceId),a)}return e}(e,n[t.sourceId],t.fetchId,t.fetchRange,t.rawEvents,o);case"ADD_EVENTS":return function(e,t,n,r){n&&(t=Be(t,n,r));return Ot(e,t)}(e,t.eventStore,r?r.activeRange:null,o);case"MERGE_EVENTS":return Ot(e,t.eventStore);case"PREV":case"NEXT":case"CHANGE_DATE":case"CHANGE_VIEW_TYPE":return r?Be(e,r.activeRange,o):e;case"REMOVE_EVENTS":return function(e,t){var n=e.defs,r=e.instances,o={},i={};for(var a in n)t.defs[a]||(o[a]=n[a]);for(var s in r)!t.instances[s]&&o[r[s].defId]&&(i[s]=r[s]);return{defs:o,instances:i}}(e,t.eventStore);case"REMOVE_EVENT_SOURCE":return Kr(e,t.sourceId);case"REMOVE_ALL_EVENT_SOURCES":return At(e,(function(e){return!e.sourceId}));case"REMOVE_ALL_EVENTS":return{defs:{},instances:{}};default:return e}}function Xr(e,t){var n;if(t){n=[];for(var r=0,o=e;r<o.length;r++){var i=o[r],a=t(i);a?n.push(a):null==a&&n.push(i)}}else n=e;return n}function Kr(e,t){return At(e,(function(e){return e.sourceId!==t}))}function Jr(e,t){return $r({eventDrag:e},t)}function $r(e,t){var n=t.getCurrentData(),o=r({businessHours:n.businessHours,dateSelection:"",eventStore:n.eventStore,eventUiBases:n.eventUiBases,eventSelection:"",eventDrag:null,eventResize:null},e);return(t.pluginHooks.isPropsValid||Qr)(o,t)}function Qr(e,t,n,o){return void 0===n&&(n={}),!(e.eventDrag&&!function(e,t,n,o){var i=t.getCurrentData(),a=e.eventDrag,s=a.mutatedEvents,l=s.defs,u=s.instances,c=pn(l,a.isEvent?e.eventUiBases:{"":i.selectionConfig});o&&(c=Oe(c,o));var d=(v=e.eventStore,g=a.affectedEvents.instances,{defs:v.defs,instances:He(v.instances,(function(e){return!g[e.instanceId]}))}),p=d.defs,f=d.instances,h=pn(p,e.eventUiBases);var v,g;for(var m in u){var y=u[m],E=y.range,S=c[y.defId],D=l[y.defId];if(!eo(S.constraints,E,d,e.businessHours,t))return!1;var b=t.options.eventOverlap,C="function"==typeof b?b:null;for(var w in f){var R=f[w];if(on(E,R.range)){if(!1===h[R.defId].overlap&&a.isEvent)return!1;if(!1===S.overlap)return!1;if(C&&!C(new zn(t,p[R.defId],R),new zn(t,D,y)))return!1}}for(var T=i.eventStore,k=0,M=S.allows;k<M.length;k++){var x=M[k],_=r(r({},n),{range:y.range,allDay:D.allDay}),I=T.defs[D.defId],P=T.instances[m],N=void 0;if(N=I?new zn(t,I,P):new zn(t,D),!x(_n(_,t),N))return!1}}return!0}(e,t,n,o))&&!(e.dateSelection&&!function(e,t,n,o){var i=e.eventStore,a=i.defs,s=i.instances,l=e.dateSelection,u=l.range,c=t.getCurrentData().selectionConfig;o&&(c=o(c));if(!eo(c.constraints,u,i,e.businessHours,t))return!1;var d=t.options.selectOverlap,p="function"==typeof d?d:null;for(var f in s){var h=s[f];if(on(u,h.range)){if(!1===c.overlap)return!1;if(p&&!p(new zn(t,a[h.defId],h),null))return!1}}for(var v=0,g=c.allows;v<g.length;v++){var m=g[v],y=r(r({},n),l);if(!m(_n(y,t),null))return!1}return!0}(e,t,n,o))}function eo(e,t,n,r,o){for(var i=0,a=e;i<a.length;i++){if(!ro(to(a[i],t,n,r,o),t))return!1}return!0}function to(e,t,n,r,o){return"businessHours"===e?no(Be(r,t,o)):"string"==typeof e?no(At(n,(function(t){return t.groupId===e}))):"object"==typeof e&&e?no(Be(e,t,o)):[]}function no(e){var t=e.instances,n=[];for(var r in t)n.push(t[r].range);return n}function ro(e,t){for(var n=0,r=e;n<r.length;n++){if(an(r[n],t))return!0}return!1}var oo=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.uid=$(),t}return n(t,e),t.prototype.prepareHits=function(){},t.prototype.queryHit=function(e,t,n,r){return null},t.prototype.isInteractionValid=function(e){var t=this.props.dateProfile,n=e.mutatedEvents.instances;if(t)for(var r in n)if(!an(t.validRange,n[r].range))return!1;return Jr(e,this.context)},t.prototype.isDateSelectionValid=function(e){var t,n,r=this.props.dateProfile;return!(r&&!an(r.validRange,e.range))&&(t=e,n=this.context,$r({dateSelection:t},n))},t.prototype.isValidSegDownEl=function(e){return!this.props.eventDrag&&!this.props.eventResize&&!V(e,".fc-event-mirror")&&(this.isPopover()||!this.isInPopover(e))},t.prototype.isValidDateDownEl=function(e){return!(V(e,".fc-event:not(.fc-bg-event)")||V(e,".fc-daygrid-more-link")||V(e,"a[data-navlink]")||this.isInPopover(e))},t.prototype.isPopover=function(){return!1},t.prototype.isInPopover=function(e){return Boolean(V(e,".fc-popover"))},t}(jr);function io(e){return{id:$(),deps:e.deps||[],reducers:e.reducers||[],contextInit:[].concat(e.contextInit||[]),eventRefiners:e.eventRefiners||{},eventDefMemberAdders:e.eventDefMemberAdders||[],eventSourceRefiners:e.eventSourceRefiners||{},isDraggableTransformers:e.isDraggableTransformers||[],eventDragMutationMassagers:e.eventDragMutationMassagers||[],eventDefMutationAppliers:e.eventDefMutationAppliers||[],dateSelectionTransformers:e.dateSelectionTransformers||[],datePointTransforms:e.datePointTransforms||[],dateSpanTransforms:e.dateSpanTransforms||[],views:e.views||{},viewPropsTransformers:e.viewPropsTransformers||[],isPropsValid:e.isPropsValid||null,externalDefTransforms:e.externalDefTransforms||[],eventResizeJoinTransforms:e.eventResizeJoinTransforms||[],viewContainerAppends:e.viewContainerAppends||[],eventDropTransformers:e.eventDropTransformers||[],componentInteractions:e.componentInteractions||[],calendarInteractions:e.calendarInteractions||[],themeClasses:e.themeClasses||{},eventSourceDefs:e.eventSourceDefs||[],cmdFormatter:e.cmdFormatter,recurringTypes:e.recurringTypes||[],namedTimeZonedImpl:e.namedTimeZonedImpl,initialView:e.initialView||"",elementDraggingImpl:e.elementDraggingImpl,optionChangeHandlers:e.optionChangeHandlers||{},scrollGridImpl:e.scrollGridImpl||null,contentTypeHandlers:e.contentTypeHandlers||{},listenerRefiners:e.listenerRefiners||{},optionRefiners:e.optionRefiners||{},propSetHandlers:e.propSetHandlers||{}}}function ao(){var e,t=[],n=[];return function(o,i){return e&&ot(o,t)&&ot(i,n)||(e=function(e,t){var n={},o={reducers:[],contextInit:[],eventRefiners:{},eventDefMemberAdders:[],eventSourceRefiners:{},isDraggableTransformers:[],eventDragMutationMassagers:[],eventDefMutationAppliers:[],dateSelectionTransformers:[],datePointTransforms:[],dateSpanTransforms:[],views:{},viewPropsTransformers:[],isPropsValid:null,externalDefTransforms:[],eventResizeJoinTransforms:[],viewContainerAppends:[],eventDropTransformers:[],componentInteractions:[],calendarInteractions:[],themeClasses:{},eventSourceDefs:[],cmdFormatter:null,recurringTypes:[],namedTimeZonedImpl:null,initialView:"",elementDraggingImpl:null,optionChangeHandlers:{},scrollGridImpl:null,contentTypeHandlers:{},listenerRefiners:{},optionRefiners:{},propSetHandlers:{}};function i(e){for(var t=0,a=e;t<a.length;t++){var s=a[t];n[s.id]||(n[s.id]=!0,i(s.deps),u=s,o={reducers:(l=o).reducers.concat(u.reducers),contextInit:l.contextInit.concat(u.contextInit),eventRefiners:r(r({},l.eventRefiners),u.eventRefiners),eventDefMemberAdders:l.eventDefMemberAdders.concat(u.eventDefMemberAdders),eventSourceRefiners:r(r({},l.eventSourceRefiners),u.eventSourceRefiners),isDraggableTransformers:l.isDraggableTransformers.concat(u.isDraggableTransformers),eventDragMutationMassagers:l.eventDragMutationMassagers.concat(u.eventDragMutationMassagers),eventDefMutationAppliers:l.eventDefMutationAppliers.concat(u.eventDefMutationAppliers),dateSelectionTransformers:l.dateSelectionTransformers.concat(u.dateSelectionTransformers),datePointTransforms:l.datePointTransforms.concat(u.datePointTransforms),dateSpanTransforms:l.dateSpanTransforms.concat(u.dateSpanTransforms),views:r(r({},l.views),u.views),viewPropsTransformers:l.viewPropsTransformers.concat(u.viewPropsTransformers),isPropsValid:u.isPropsValid||l.isPropsValid,externalDefTransforms:l.externalDefTransforms.concat(u.externalDefTransforms),eventResizeJoinTransforms:l.eventResizeJoinTransforms.concat(u.eventResizeJoinTransforms),viewContainerAppends:l.viewContainerAppends.concat(u.viewContainerAppends),eventDropTransformers:l.eventDropTransformers.concat(u.eventDropTransformers),calendarInteractions:l.calendarInteractions.concat(u.calendarInteractions),componentInteractions:l.componentInteractions.concat(u.componentInteractions),themeClasses:r(r({},l.themeClasses),u.themeClasses),eventSourceDefs:l.eventSourceDefs.concat(u.eventSourceDefs),cmdFormatter:u.cmdFormatter||l.cmdFormatter,recurringTypes:l.recurringTypes.concat(u.recurringTypes),namedTimeZonedImpl:u.namedTimeZonedImpl||l.namedTimeZonedImpl,initialView:l.initialView||u.initialView,elementDraggingImpl:l.elementDraggingImpl||u.elementDraggingImpl,optionChangeHandlers:r(r({},l.optionChangeHandlers),u.optionChangeHandlers),scrollGridImpl:u.scrollGridImpl||l.scrollGridImpl,contentTypeHandlers:r(r({},l.contentTypeHandlers),u.contentTypeHandlers),listenerRefiners:r(r({},l.listenerRefiners),u.listenerRefiners),optionRefiners:r(r({},l.optionRefiners),u.optionRefiners),propSetHandlers:r(r({},l.propSetHandlers),u.propSetHandlers)})}var l,u}return e&&i(e),i(t),o}(o,i)),t=o,n=i,e}}var so=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t}(Pr);function lo(e,t,n,o){if(t[e])return t[e];var i=function(e,t,n,o){var i=n[e],a=o[e],s=function(e){return i&&null!==i[e]?i[e]:a&&null!==a[e]?a[e]:null},l=s("component"),u=s("superType"),c=null;if(u){if(u===e)throw new Error("Can't have a custom view type that references itself");c=lo(u,t,n,o)}!l&&c&&(l=c.component);if(!l)return null;return{type:e,component:l,defaults:r(r({},c?c.defaults:{}),i?i.rawOptions:{}),overrides:r(r({},c?c.overrides:{}),a?a.rawOptions:{})}}(e,t,n,o);return i&&(t[e]=i),i}so.prototype.classes={root:"fc-theme-standard",tableCellShaded:"fc-cell-shaded",buttonGroup:"fc-button-group",button:"fc-button fc-button-primary",buttonActive:"fc-button-active"},so.prototype.baseIconClass="fc-icon",so.prototype.iconClasses={close:"fc-icon-x",prev:"fc-icon-chevron-left",next:"fc-icon-chevron-right",prevYear:"fc-icon-chevrons-left",nextYear:"fc-icon-chevrons-right"},so.prototype.rtlIconClasses={prev:"fc-icon-chevron-right",next:"fc-icon-chevron-left",prevYear:"fc-icon-chevrons-right",nextYear:"fc-icon-chevrons-left"},so.prototype.iconOverrideOption="buttonIcons",so.prototype.iconOverrideCustomButtonOption="icon",so.prototype.iconOverridePrefix="fc-icon-";var uo=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.rootElRef=Ar(),t.handleRootEl=function(e){Yr(t.rootElRef,e),t.props.elRef&&Yr(t.props.elRef,e)},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=t.hookProps;return Hr(ho,{hookProps:n,didMount:t.didMount,willUnmount:t.willUnmount,elRef:this.handleRootEl},(function(r){return Hr(po,{hookProps:n,content:t.content,defaultContent:t.defaultContent,backupElRef:e.rootElRef},(function(e,o){return t.children(r,go(t.classNames,n),e,o)}))}))},t}(jr),co=Lr(0);function po(e){return Hr(co.Consumer,null,(function(t){return Hr(fo,r({renderId:t},e))}))}var fo=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.innerElRef=Ar(),t}return n(t,e),t.prototype.render=function(){return this.props.children(this.innerElRef,this.renderInnerContent())},t.prototype.componentDidMount=function(){this.updateCustomContent()},t.prototype.componentDidUpdate=function(){this.updateCustomContent()},t.prototype.renderInnerContent=function(){var e=this.context.pluginHooks.contentTypeHandlers,t=this.props,n=this.customContentInfo,r=mo(t.content,t.hookProps),o=null;if(void 0===r&&(r=mo(t.defaultContent,t.hookProps)),void 0!==r){if(n)n.contentVal=r[n.contentKey];else if("object"==typeof r)for(var i in e)if(void 0!==r[i]){n=this.customContentInfo={contentKey:i,contentVal:r[i],handler:e[i]()};break}o=n?[]:r}return o},t.prototype.updateCustomContent=function(){this.customContentInfo&&this.customContentInfo.handler(this.innerElRef.current||this.props.backupElRef.current,this.customContentInfo.contentVal)},t}(jr),ho=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleRootEl=function(e){t.rootEl=e,t.props.elRef&&Yr(t.props.elRef,e)},t}return n(t,e),t.prototype.render=function(){return this.props.children(this.handleRootEl)},t.prototype.componentDidMount=function(){var e=this.props.didMount;e&&e(r(r({},this.props.hookProps),{el:this.rootEl}))},t.prototype.componentWillUnmount=function(){var e=this.props.willUnmount;e&&e(r(r({},this.props.hookProps),{el:this.rootEl}))},t}(jr);function vo(){var e,t,n=[];return function(r,o){return t&&Le(t,o)&&r===e||(e=r,t=o,n=go(r,o)),n}}function go(e,t){return"function"==typeof e&&(e=e(t)),Ut(e)}function mo(e,t){return"function"==typeof e?e(t,Hr):e}var yo=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.normalizeClassNames=vo(),t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options,r={view:t.viewApi},o=this.normalizeClassNames(n.viewClassNames,r);return Hr(ho,{hookProps:r,didMount:n.viewDidMount,willUnmount:n.viewWillUnmount,elRef:e.elRef},(function(t){return e.children(t,["fc-"+e.viewSpec.type+"-view","fc-view"].concat(o))}))},t}(jr);function Eo(e){return Oe(e,So)}function So(e){var t,n="function"==typeof e?{component:e}:e,o=n.component;return n.content&&(t=n,o=function(e){return Hr(zr.Consumer,null,(function(n){return Hr(yo,{viewSpec:n.viewSpec},(function(o,i){var a=r(r({},e),{nextDayThreshold:n.options.nextDayThreshold});return Hr(uo,{hookProps:a,classNames:t.classNames,content:t.content,didMount:t.didMount,willUnmount:t.willUnmount,elRef:o},(function(e,t,n,r){return Hr("div",{className:i.concat(t).join(" "),ref:e},r)}))}))}))}),{superType:n.type,component:o,rawOptions:n}}function Do(e,t,n,o){var i=Eo(e),a=Eo(t.views);return Oe(function(e,t){var n,r={};for(n in e)lo(n,r,e,t);for(n in t)lo(n,r,e,t);return r}(i,a),(function(e){return function(e,t,n,o,i){var a=e.overrides.duration||e.defaults.duration||o.duration||n.duration,s=null,l="",u="",c={};if(a&&(s=function(e){var t=JSON.stringify(e),n=bo[t];void 0===n&&(n=Ye(e),bo[t]=n);return n}(a))){var d=et(s);l=d.unit,1===d.value&&(u=l,c=t[l]?t[l].rawOptions:{})}var p=function(t){var n=t.buttonText||{},r=e.defaults.buttonTextKey;return null!=r&&null!=n[r]?n[r]:null!=n[e.type]?n[e.type]:null!=n[u]?n[u]:void 0};return{type:e.type,component:e.component,duration:s,durationUnit:l,singleUnit:u,optionDefaults:e.defaults,optionOverrides:r(r({},c),e.overrides),buttonTextOverride:p(o)||p(n)||e.overrides.buttonText,buttonTextDefault:p(i)||e.defaults.buttonText||p(bt)||e.type}}(e,a,t,n,o)}))}var bo={};var Co=function(){function e(e){this.props=e,this.nowDate=Wn(e.nowInput,e.dateEnv),this.initHiddenDays()}return e.prototype.buildPrev=function(e,t,n){var r=this.props.dateEnv,o=r.subtract(r.startOf(t,e.currentRangeUnit),e.dateIncrement);return this.build(o,-1,n)},e.prototype.buildNext=function(e,t,n){var r=this.props.dateEnv,o=r.add(r.startOf(t,e.currentRangeUnit),e.dateIncrement);return this.build(o,1,n)},e.prototype.build=function(e,t,n){void 0===n&&(n=!0);var r,o,i,a,s,l,u,c,d=this.props;return r=this.buildValidRange(),r=this.trimHiddenDays(r),n&&(u=e,e=null!=(c=r).start&&u<c.start?c.start:null!=c.end&&u>=c.end?new Date(c.end.valueOf()-1):u),o=this.buildCurrentRangeInfo(e,t),i=/^(year|month|week|day)$/.test(o.unit),a=this.buildRenderRange(this.trimHiddenDays(o.range),o.unit,i),s=a=this.trimHiddenDays(a),d.showNonCurrentDates||(s=nn(s,o.range)),s=nn(s=this.adjustActiveRange(s),r),l=on(o.range,r),{validRange:r,currentRange:o.range,currentRangeUnit:o.unit,isRangeAllDay:i,activeRange:s,renderRange:a,slotMinTime:d.slotMinTime,slotMaxTime:d.slotMaxTime,isValid:l,dateIncrement:this.buildDateIncrement(o.duration)}},e.prototype.buildValidRange=function(){var e=this.props.validRangeInput,t="function"==typeof e?e.call(this.props.calendarApi,this.nowDate):e;return this.refineRange(t)||{start:null,end:null}},e.prototype.buildCurrentRangeInfo=function(e,t){var n,r=this.props,o=null,i=null,a=null;return r.duration?(o=r.duration,i=r.durationUnit,a=this.buildRangeFromDuration(e,t,o,i)):(n=this.props.dayCount)?(i="day",a=this.buildRangeFromDayCount(e,t,n)):(a=this.buildCustomVisibleRange(e))?i=r.dateEnv.greatestWholeUnit(a.start,a.end).unit:(i=et(o=this.getFallbackDuration()).unit,a=this.buildRangeFromDuration(e,t,o,i)),{duration:o,unit:i,range:a}},e.prototype.getFallbackDuration=function(){return Ye({day:1})},e.prototype.adjustActiveRange=function(e){var t=this.props,n=t.dateEnv,r=t.usesMinMaxTime,o=t.slotMinTime,i=t.slotMaxTime,a=e.start,s=e.end;return r&&(Je(o)<0&&(a=be(a),a=n.add(a,o)),Je(i)>1&&(s=ve(s=be(s),-1),s=n.add(s,i))),{start:a,end:s}},e.prototype.buildRangeFromDuration=function(e,t,n,r){var o,i,a,s=this.props,l=s.dateEnv,u=s.dateAlignment;if(!u){var c=this.props.dateIncrement;u=c&&$e(c)<$e(n)?et(c).unit:r}function d(){o=l.startOf(e,u),i=l.add(o,n),a={start:o,end:i}}return Je(n)<=1&&this.isHiddenDay(o)&&(o=be(o=this.skipHiddenDays(o,t))),d(),this.trimHiddenDays(a)||(e=this.skipHiddenDays(e,t),d()),a},e.prototype.buildRangeFromDayCount=function(e,t,n){var r,o=this.props,i=o.dateEnv,a=o.dateAlignment,s=0,l=e;a&&(l=i.startOf(l,a)),l=be(l),r=l=this.skipHiddenDays(l,t);do{r=ve(r,1),this.isHiddenDay(r)||s++}while(s<n);return{start:l,end:r}},e.prototype.buildCustomVisibleRange=function(e){var t=this.props,n=t.visibleRangeInput,r="function"==typeof n?n.call(t.calendarApi,t.dateEnv.toDate(e)):n,o=this.refineRange(r);return!o||null!=o.start&&null!=o.end?o:null},e.prototype.buildRenderRange=function(e,t,n){return e},e.prototype.buildDateIncrement=function(e){var t,n=this.props.dateIncrement;return n||((t=this.props.dateAlignment)?Ye(1,t):e||Ye({days:1}))},e.prototype.refineRange=function(e){if(e){var t=(n=e,r=this.props.dateEnv,o=null,i=null,n.start&&(o=r.createMarker(n.start)),n.end&&(i=r.createMarker(n.end)),o||i?o&&i&&i<o?null:{start:o,end:i}:null);return t&&(t=Jt(t)),t}var n,r,o,i;return null},e.prototype.initHiddenDays=function(){var e,t=this.props.hiddenDays||[],n=[],r=0;for(!1===this.props.weekends&&t.push(0,6),e=0;e<7;e++)(n[e]=-1!==t.indexOf(e))||r++;if(!r)throw new Error("invalid hiddenDays");this.isHiddenDayHash=n},e.prototype.trimHiddenDays=function(e){var t=e.start,n=e.end;return t&&(t=this.skipHiddenDays(t)),n&&(n=this.skipHiddenDays(n,-1,!0)),null==t||null==n||t<n?{start:t,end:n}:null},e.prototype.isHiddenDay=function(e){return e instanceof Date&&(e=e.getUTCDay()),this.isHiddenDayHash[e]},e.prototype.skipHiddenDays=function(e,t,n){for(void 0===t&&(t=1),void 0===n&&(n=!1);this.isHiddenDayHash[(e.getUTCDay()+(n?t:0)+7)%7];)e=ve(e,t);return e},e}();function wo(e,t,n){var r=t?t.activeRange:null;return ko({},function(e,t){var n=Ln(t),r=[].concat(e.eventSources||[]),o=[];e.initialEvents&&r.unshift(e.initialEvents);e.events&&r.unshift(e.events);for(var i=0,a=r;i<a.length;i++){var s=Un(a[i],t,n);s&&o.push(s)}return o}(e,n),r,n)}function Ro(e,t,n,o){var i,a,s=n?n.activeRange:null;switch(t.type){case"ADD_EVENT_SOURCES":return ko(e,t.sources,s,o);case"REMOVE_EVENT_SOURCE":return i=e,a=t.sourceId,He(i,(function(e){return e.sourceId!==a}));case"PREV":case"NEXT":case"CHANGE_DATE":case"CHANGE_VIEW_TYPE":return n?Mo(e,s,o):e;case"FETCH_EVENT_SOURCES":return xo(e,t.sourceIds?Ae(t.sourceIds):Io(e,o),s,o);case"RECEIVE_EVENTS":case"RECEIVE_EVENT_ERROR":return function(e,t,n,o){var i,a=e[t];if(a&&n===a.latestFetchId)return r(r({},e),((i={})[t]=r(r({},a),{isFetching:!1,fetchRange:o}),i));return e}(e,t.sourceId,t.fetchId,t.fetchRange);case"REMOVE_ALL_EVENT_SOURCES":return{};default:return e}}function To(e){var t=0;for(var n in e)e[n].isFetching&&t++;return t}function ko(e,t,n,o){for(var i={},a=0,s=t;a<s.length;a++){var l=s[a];i[l.sourceId]=l}return n&&(i=Mo(i,n,o)),r(r({},e),i)}function Mo(e,t,n){return xo(e,He(e,(function(e){return function(e,t,n){return Po(e,n)?!n.options.lazyFetching||!e.fetchRange||e.isFetching||t.start<e.fetchRange.start||t.end>e.fetchRange.end:!e.latestFetchId}(e,t,n)})),t,n)}function xo(e,t,n,r){var o={};for(var i in e){var a=e[i];t[i]?o[i]=_o(a,n,r):o[i]=a}return o}function _o(e,t,n){var o=n.options,i=n.calendarApi,a=n.pluginHooks.eventSourceDefs[e.sourceDefId],s=$();return a.fetch({eventSource:e,range:t,context:n},(function(r){var a=r.rawEvents;o.eventSourceSuccess&&(a=o.eventSourceSuccess.call(i,a,r.xhr)||a),e.success&&(a=e.success.call(i,a,r.xhr)||a),n.dispatch({type:"RECEIVE_EVENTS",sourceId:e.sourceId,fetchId:s,fetchRange:t,rawEvents:a})}),(function(r){console.warn(r.message,r),o.eventSourceFailure&&o.eventSourceFailure.call(i,r),e.failure&&e.failure(r),n.dispatch({type:"RECEIVE_EVENT_ERROR",sourceId:e.sourceId,fetchId:s,fetchRange:t,error:r})})),r(r({},e),{isFetching:!0,latestFetchId:s})}function Io(e,t){return He(e,(function(e){return Po(e,t)}))}function Po(e,t){return!t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange}function No(e,t){switch(t.type){case"UNSELECT_DATES":return null;case"SELECT_DATES":return t.selection;default:return e}}function Ho(e,t){switch(t.type){case"UNSELECT_EVENT":return"";case"SELECT_EVENT":return t.eventInstanceId;default:return e}}function Oo(e,t){var n;switch(t.type){case"UNSET_EVENT_DRAG":return null;case"SET_EVENT_DRAG":return{affectedEvents:(n=t.state).affectedEvents,mutatedEvents:n.mutatedEvents,isEvent:n.isEvent};default:return e}}function Ao(e,t){var n;switch(t.type){case"UNSET_EVENT_RESIZE":return null;case"SET_EVENT_RESIZE":return{affectedEvents:(n=t.state).affectedEvents,mutatedEvents:n.mutatedEvents,isEvent:n.isEvent};default:return e}}function Uo(e,t,n,r,o){var i=[];return{headerToolbar:e.headerToolbar?Lo(e.headerToolbar,e,t,n,r,o,i):null,footerToolbar:e.footerToolbar?Lo(e.footerToolbar,e,t,n,r,o,i):null,viewsWithButtons:i}}function Lo(e,t,n,r,o,i,a){return Oe(e,(function(e){return function(e,t,n,r,o,i,a){var s="rtl"===t.direction,l=t.customButtons||{},u=n.buttonText||{},c=t.buttonText||{};return(e?e.split(" "):[]).map((function(e){return e.split(",").map((function(e){if("title"===e)return{buttonName:e};var t,n=void 0,d=void 0,p=void 0,f=void 0;return(t=l[e])?(d=function(e){t.click&&t.click.call(e.target,e,e.target)},(p=r.getCustomButtonIconClass(t))||(p=r.getIconClass(e,s))||(f=t.text)):(n=o[e])?(a.push(e),d=function(){i.changeView(e)},(f=n.buttonTextOverride)||(p=r.getIconClass(e,s))||(f=n.buttonTextDefault)):i[e]&&(d=function(){i[e]()},(f=u[e])||(p=r.getIconClass(e,s))||(f=c[e])),{buttonName:e,buttonClick:d,buttonIcon:p,buttonText:f}}))}))}(e,t,n,r,o,i,a)}))}function Wo(e,t,n,r,o){var i=null;"GET"===(e=e.toUpperCase())?t=function(e,t){return e+(-1===e.indexOf("?")?"?":"&")+Vo(t)}(t,n):i=Vo(n);var a=new XMLHttpRequest;a.open(e,t,!0),"GET"!==e&&a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.onload=function(){if(a.status>=200&&a.status<400){var e=!1,t=void 0;try{t=JSON.parse(a.responseText),e=!0}catch(e){}e?r(t,a):o("Failure parsing JSON",a)}else o("Request failed",a)},a.onerror=function(){o("Request failed",a)},a.send(i)}function Vo(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}function zo(e,t){for(var n=Ue(t.getCurrentData().eventSources),r=[],o=0,i=e;o<i.length;o++){for(var a=i[o],s=!1,l=0;l<n.length;l++)if(n[l]._raw===a){n.splice(l,1),s=!0;break}s||r.push(a)}for(var u=0,c=n;u<c.length;u++){var d=c[u];t.dispatch({type:"REMOVE_EVENT_SOURCE",sourceId:d.sourceId})}for(var p=0,f=r;p<f.length;p++){var h=f[p];t.calendarApi.addEventSource(h)}}var Fo=[io({eventSourceDefs:[{ignoreRange:!0,parseMeta:function(e){return Array.isArray(e.events)?e.events:null},fetch:function(e,t){t({rawEvents:e.eventSource.meta})}}]}),io({eventSourceDefs:[{parseMeta:function(e){return"function"==typeof e.events?e.events:null},fetch:function(e,t,n){var r=e.context.dateEnv;Tr(e.eventSource.meta.bind(null,Tn(e.range,r)),(function(e){t({rawEvents:e})}),n)}}]}),io({eventSourceRefiners:{method:String,extraParams:_t,startParam:String,endParam:String,timeZoneParam:String},eventSourceDefs:[{parseMeta:function(e){return e.url?{url:e.url,method:(e.method||"GET").toUpperCase(),extraParams:e.extraParams,startParam:e.startParam,endParam:e.endParam,timeZoneParam:e.timeZoneParam}:null},fetch:function(e,t,n){var o=e.eventSource.meta,i=function(e,t,n){var o,i,a,s,l=n.dateEnv,u=n.options,c={};null==(o=e.startParam)&&(o=u.startParam);null==(i=e.endParam)&&(i=u.endParam);null==(a=e.timeZoneParam)&&(a=u.timeZoneParam);s="function"==typeof e.extraParams?e.extraParams():e.extraParams||{};r(c,s),c[o]=l.formatIso(t.start),c[i]=l.formatIso(t.end),"local"!==l.timeZone&&(c[a]=l.timeZone);return c}(o,e.range,e.context);Wo(o.method,o.url,i,(function(e,n){t({rawEvents:e,xhr:n})}),(function(e,t){n({message:e,xhr:t})}))}}]}),io({recurringTypes:[{parse:function(e,t){if(e.daysOfWeek||e.startTime||e.endTime||e.startRecur||e.endRecur){var n={daysOfWeek:e.daysOfWeek||null,startTime:e.startTime||null,endTime:e.endTime||null,startRecur:e.startRecur?t.createMarker(e.startRecur):null,endRecur:e.endRecur?t.createMarker(e.endRecur):null},r=void 0;return e.duration&&(r=e.duration),!r&&e.startTime&&e.endTime&&(o=e.endTime,i=e.startTime,r={years:o.years-i.years,months:o.months-i.months,days:o.days-i.days,milliseconds:o.milliseconds-i.milliseconds}),{allDayGuess:Boolean(!e.startTime&&!e.endTime),duration:r,typeData:n}}var o,i;return null},expand:function(e,t,n){var r=nn(t,{start:e.startRecur,end:e.endRecur});return r?function(e,t,n,r){var o=e?Ae(e):null,i=be(n.start),a=n.end,s=[];for(;i<a;){var l=void 0;o&&!o[i.getUTCDay()]||(l=t?r.add(i,t):i,s.push(l)),i=ve(i,1)}return s}(e.daysOfWeek,e.startTime,r,n):[]}}],eventRefiners:{daysOfWeek:_t,startTime:Ye,endTime:Ye,duration:Ye,startRecur:_t,endRecur:_t}}),io({optionChangeHandlers:{events:function(e,t){zo([e],t)},eventSources:zo}}),io({contentTypeHandlers:{html:function(){return Bo},domNodes:function(){return jo}},propSetHandlers:{dateProfile:function(e,t){t.emitter.trigger("datesSet",r(r({},Tn(e.activeRange,t.dateEnv)),{view:t.viewApi}))},eventStore:function(e,t){var n=t.emitter;n.hasHandlers("eventsSet")&&n.trigger("eventsSet",Bn(e,t))}}})];function Bo(e,t){e.innerHTML=t}function jo(e,t){var n=Array.prototype.slice.call(e.childNodes),r=Array.prototype.slice.call(t);if(!ot(n,r)){for(var o=0,i=r;o<i.length;o++){var a=i[o];e.appendChild(a)}n.forEach(W)}}var Go=function(){function e(e){this.drainedOption=e,this.isRunning=!1,this.isDirty=!1,this.pauseDepths={},this.timeoutId=0}return e.prototype.request=function(e){this.isDirty=!0,this.isPaused()||(this.clearTimeout(),null==e?this.tryDrain():this.timeoutId=setTimeout(this.tryDrain.bind(this),e))},e.prototype.pause=function(e){void 0===e&&(e="");var t=this.pauseDepths;t[e]=(t[e]||0)+1,this.clearTimeout()},e.prototype.resume=function(e,t){void 0===e&&(e="");var n=this.pauseDepths;if(e in n){if(t)delete n[e];else--n[e]<=0&&delete n[e];this.tryDrain()}},e.prototype.isPaused=function(){return Object.keys(this.pauseDepths).length},e.prototype.tryDrain=function(){if(!this.isRunning&&!this.isPaused()){for(this.isRunning=!0;this.isDirty;)this.isDirty=!1,this.drained();this.isRunning=!1}},e.prototype.clear=function(){this.clearTimeout(),this.isDirty=!1,this.pauseDepths={}},e.prototype.clearTimeout=function(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=0)},e.prototype.drained=function(){this.drainedOption&&this.drainedOption()},e}(),qo=function(){function e(e,t){this.runTaskOption=e,this.drainedOption=t,this.queue=[],this.delayedRunner=new Go(this.drain.bind(this))}return e.prototype.request=function(e,t){this.queue.push(e),this.delayedRunner.request(t)},e.prototype.pause=function(e){this.delayedRunner.pause(e)},e.prototype.resume=function(e,t){this.delayedRunner.resume(e,t)},e.prototype.drain=function(){for(var e=this.queue;e.length;){for(var t=[],n=void 0;n=e.shift();)this.runTask(n),t.push(n);this.drained(t)}},e.prototype.runTask=function(e){this.runTaskOption&&this.runTaskOption(e)},e.prototype.drained=function(e){this.drainedOption&&this.drainedOption(e)},e}();function Yo(e,t,n){var r;return r=/^(year|month)$/.test(e.currentRangeUnit)?e.currentRange:e.activeRange,n.formatRange(r.start,r.end,St(t.titleFormat||function(e){var t=e.currentRangeUnit;if("year"===t)return{year:"numeric"};if("month"===t)return{year:"numeric",month:"long"};var n=De(e.currentRange.start,e.currentRange.end);return null!==n&&n>1?{year:"numeric",month:"short",day:"numeric"}:{year:"numeric",month:"long",day:"numeric"}}(e)),{isEndExclusive:e.isRangeAllDay,defaultSeparator:t.titleRangeSeparator})}var Zo=function(){function e(e){var t=this;this.computeOptionsData=it(this._computeOptionsData),this.computeCurrentViewData=it(this._computeCurrentViewData),this.organizeRawLocales=it($n),this.buildLocale=it(Qn),this.buildPluginHooks=ao(),this.buildDateEnv=it(Xo),this.buildTheme=it(Ko),this.parseToolbars=it(Uo),this.buildViewSpecs=it(Do),this.buildDateProfileGenerator=at(Jo),this.buildViewApi=it($o),this.buildViewUiProps=at(ti),this.buildEventUiBySource=it(Qo,Le),this.buildEventUiBases=it(ei),this.parseContextBusinessHours=at(ni),this.buildTitle=it(Yo),this.emitter=new kr,this.actionRunner=new qo(this._handleAction.bind(this),this.updateData.bind(this)),this.currentCalendarOptionsInput={},this.currentCalendarOptionsRefined={},this.currentViewOptionsInput={},this.currentViewOptionsRefined={},this.currentCalendarOptionsRefiners={},this.getCurrentData=function(){return t.data},this.dispatch=function(e){t.actionRunner.request(e)},this.props=e,this.actionRunner.pause();var n={},o=this.computeOptionsData(e.optionOverrides,n,e.calendarApi),i=o.calendarOptions.initialView||o.pluginHooks.initialView,a=this.computeCurrentViewData(i,o,e.optionOverrides,n);e.calendarApi.currentDataManager=this,this.emitter.setThisContext(e.calendarApi),this.emitter.setOptions(a.options);var s,l,u,c=(s=o.calendarOptions,l=o.dateEnv,null!=(u=s.initialDate)?l.createMarker(u):Wn(s.now,l)),d=a.dateProfileGenerator.build(c);sn(d.activeRange,c)||(c=d.currentRange.start);for(var p={dateEnv:o.dateEnv,options:o.calendarOptions,pluginHooks:o.pluginHooks,calendarApi:e.calendarApi,dispatch:this.dispatch,emitter:this.emitter,getCurrentData:this.getCurrentData},f=0,h=o.pluginHooks.contextInit;f<h.length;f++){(0,h[f])(p)}for(var v=wo(o.calendarOptions,d,p),g={dynamicOptionOverrides:n,currentViewType:i,currentDate:c,dateProfile:d,businessHours:this.parseContextBusinessHours(p),eventSources:v,eventUiBases:{},loadingLevel:To(v),eventStore:{defs:{},instances:{}},renderableEventStore:{defs:{},instances:{}},dateSelection:null,eventSelection:"",eventDrag:null,eventResize:null,selectionConfig:this.buildViewUiProps(p).selectionConfig},m=r(r({},p),g),y=0,E=o.pluginHooks.reducers;y<E.length;y++){var S=E[y];r(g,S(null,null,m))}g.loadingLevel&&this.emitter.trigger("loading",!0),this.state=g,this.updateData(),this.actionRunner.resume()}return e.prototype.resetOptions=function(e,t){var n=this.props;n.optionOverrides=t?r(r({},n.optionOverrides),e):e,this.actionRunner.request({type:"NOTHING"})},e.prototype._handleAction=function(e){var t=this.props,n=this.state,o=this.emitter,i=function(e,t){var n;switch(t.type){case"SET_OPTION":return r(r({},e),((n={})[t.optionName]=t.rawOptionValue,n));default:return e}}(n.dynamicOptionOverrides,e),a=this.computeOptionsData(t.optionOverrides,i,t.calendarApi),s=function(e,t){switch(t.type){case"CHANGE_VIEW_TYPE":return t.viewType}return e}(n.currentViewType,e),l=this.computeCurrentViewData(s,a,t.optionOverrides,i);t.calendarApi.currentDataManager=this,o.setThisContext(t.calendarApi),o.setOptions(l.options);var u={dateEnv:a.dateEnv,options:a.calendarOptions,pluginHooks:a.pluginHooks,calendarApi:t.calendarApi,dispatch:this.dispatch,emitter:o,getCurrentData:this.getCurrentData},c=n.currentDate,d=n.dateProfile;this.data&&this.data.dateProfileGenerator!==l.dateProfileGenerator&&(d=l.dateProfileGenerator.build(c)),d=function(e,t,n,r){var o;switch(t.type){case"CHANGE_VIEW_TYPE":return r.build(t.dateMarker||n);case"CHANGE_DATE":if(!e.activeRange||!sn(e.currentRange,t.dateMarker))return r.build(t.dateMarker);break;case"PREV":if((o=r.buildPrev(e,n)).isValid)return o;break;case"NEXT":if((o=r.buildNext(e,n)).isValid)return o}return e}(d,e,c=function(e,t){switch(t.type){case"CHANGE_DATE":return t.dateMarker;default:return e}}(c,e),l.dateProfileGenerator),sn(d.currentRange,c)||(c=d.currentRange.start);for(var p=Ro(n.eventSources,e,d,u),f=To(p),h=Zr(n.eventStore,e,p,d,u),v=f&&!l.options.progressiveEventRendering&&n.renderableEventStore||h,g=this.buildViewUiProps(u),m=g.eventUiSingleBase,y=g.selectionConfig,E=this.buildEventUiBySource(p),S=this.buildEventUiBases(v.defs,m,E),D=n.loadingLevel||0,b=f,C={dynamicOptionOverrides:i,currentViewType:s,currentDate:c,dateProfile:d,eventSources:p,eventStore:h,renderableEventStore:v,selectionConfig:y,eventUiBases:S,loadingLevel:b,businessHours:this.parseContextBusinessHours(u),dateSelection:No(n.dateSelection,e),eventSelection:Ho(n.eventSelection,e),eventDrag:Oo(n.eventDrag,e),eventResize:Ao(n.eventResize,e)},w=r(r({},u),C),R=0,T=a.pluginHooks.reducers;R<T.length;R++){var k=T[R];r(C,k(n,e,w))}!D&&b?o.trigger("loading",!0):D&&!b&&o.trigger("loading",!1),this.state=C,t.onAction&&t.onAction(e)},e.prototype.updateData=function(){var e,t,n,o,i,a,s,l,u,c=this.props,d=this.state,p=this.data,f=this.computeOptionsData(c.optionOverrides,d.dynamicOptionOverrides,c.calendarApi),h=this.computeCurrentViewData(d.currentViewType,f,c.optionOverrides,d.dynamicOptionOverrides),v=this.data=r(r(r({viewTitle:this.buildTitle(d.dateProfile,h.options,f.dateEnv),calendarApi:c.calendarApi,dispatch:this.dispatch,emitter:this.emitter,getCurrentData:this.getCurrentData},f),h),d),g=f.pluginHooks.optionChangeHandlers,m=p&&p.calendarOptions,y=f.calendarOptions;if(m&&m!==y)for(var E in m.timeZone!==y.timeZone&&(d.eventSources=v.eventSources=(a=v.eventSources,s=d.dateProfile,l=v,u=s?s.activeRange:null,xo(a,Io(a,l),u,l)),d.eventStore=v.eventStore=(e=v.eventStore,t=p.dateEnv,n=v.dateEnv,o=e.defs,i=Oe(e.instances,(function(e){var i=o[e.defId];return i.allDay||i.recurringDef?e:r(r({},e),{range:{start:n.createMarker(t.toDate(e.range.start,e.forcedStartTzo)),end:n.createMarker(t.toDate(e.range.end,e.forcedEndTzo))},forcedStartTzo:n.canComputeOffset?null:e.forcedStartTzo,forcedEndTzo:n.canComputeOffset?null:e.forcedEndTzo})})),{defs:o,instances:i})),g)m[E]!==y[E]&&g[E](y[E],v);c.onData&&c.onData(v)},e.prototype._computeOptionsData=function(e,t,n){var r=this.processRawCalendarOptions(e,t),o=r.refinedOptions,i=r.pluginHooks,a=r.localeDefaults,s=r.availableLocaleData;ri(r.extra);var l=this.buildDateEnv(o.timeZone,o.locale,o.weekNumberCalculation,o.firstDay,o.weekText,i,s,o.defaultRangeSeparator),u=this.buildViewSpecs(i.views,e,t,a),c=this.buildTheme(o,i);return{calendarOptions:o,pluginHooks:i,dateEnv:l,viewSpecs:u,theme:c,toolbarConfig:this.parseToolbars(o,e,c,u,n),localeDefaults:a,availableRawLocales:s.map}},e.prototype.processRawCalendarOptions=function(e,t){var n=Mt([bt,e,t]),o=n.locales,i=n.locale,a=this.organizeRawLocales(o),s=a.map,l=this.buildLocale(i||a.defaultCode,s).options,u=this.buildPluginHooks(e.plugins||[],Fo),c=this.currentCalendarOptionsRefiners=r(r(r(r(r({},Dt),Ct),wt),u.listenerRefiners),u.optionRefiners),d={},p=Mt([bt,l,e,t]),f={},h=this.currentCalendarOptionsInput,v=this.currentCalendarOptionsRefined,g=!1;for(var m in p)"plugins"!==m&&(p[m]===h[m]||Rt[m]&&m in h&&Rt[m](h[m],p[m])?f[m]=v[m]:c[m]?(f[m]=c[m](p[m]),g=!0):d[m]=h[m]);return g&&(this.currentCalendarOptionsInput=p,this.currentCalendarOptionsRefined=f),{rawOptions:this.currentCalendarOptionsInput,refinedOptions:this.currentCalendarOptionsRefined,pluginHooks:u,availableLocaleData:a,localeDefaults:l,extra:d}},e.prototype._computeCurrentViewData=function(e,t,n,r){var o=t.viewSpecs[e];if(!o)throw new Error('viewType "'+e+"\" is not available. Please make sure you've loaded all neccessary plugins");var i=this.processRawViewOptions(o,t.pluginHooks,t.localeDefaults,n,r),a=i.refinedOptions;return ri(i.extra),{viewSpec:o,options:a,dateProfileGenerator:this.buildDateProfileGenerator({dateProfileGeneratorClass:o.optionDefaults.dateProfileGeneratorClass,duration:o.duration,durationUnit:o.durationUnit,usesMinMaxTime:o.optionDefaults.usesMinMaxTime,dateEnv:t.dateEnv,calendarApi:this.props.calendarApi,slotMinTime:a.slotMinTime,slotMaxTime:a.slotMaxTime,showNonCurrentDates:a.showNonCurrentDates,dayCount:a.dayCount,dateAlignment:a.dateAlignment,dateIncrement:a.dateIncrement,hiddenDays:a.hiddenDays,weekends:a.weekends,nowInput:a.now,validRangeInput:a.validRange,visibleRangeInput:a.visibleRange,monthMode:a.monthMode,fixedWeekCount:a.fixedWeekCount}),viewApi:this.buildViewApi(e,this.getCurrentData,t.dateEnv)}},e.prototype.processRawViewOptions=function(e,t,n,o,i){var a=Mt([bt,e.optionDefaults,n,o,e.optionOverrides,i]),s=r(r(r(r(r(r({},Dt),Ct),wt),kt),t.listenerRefiners),t.optionRefiners),l={},u=this.currentViewOptionsInput,c=this.currentViewOptionsRefined,d=!1,p={};for(var f in a)a[f]===u[f]?l[f]=c[f]:(a[f]===this.currentCalendarOptionsInput[f]?f in this.currentCalendarOptionsRefined&&(l[f]=this.currentCalendarOptionsRefined[f]):s[f]?l[f]=s[f](a[f]):p[f]=a[f],d=!0);return d&&(this.currentViewOptionsInput=a,this.currentViewOptionsRefined=l),{rawOptions:this.currentViewOptionsInput,refinedOptions:this.currentViewOptionsRefined,extra:p}},e}();function Xo(e,t,n,r,o,i,a,s){var l=Qn(t||a.defaultCode,a.map);return new Xn({calendarSystem:"gregory",timeZone:e,namedTimeZoneImpl:i.namedTimeZonedImpl,locale:l,weekNumberCalculation:n,firstDay:r,weekText:o,cmdFormatter:i.cmdFormatter,defaultSeparator:s})}function Ko(e,t){return new(t.themeClasses[e.themeSystem]||so)(e)}function Jo(e){return new(e.dateProfileGeneratorClass||Co)(e)}function $o(e,t,n){return new On(e,t,n)}function Qo(e){return Oe(e,(function(e){return e.ui}))}function ei(e,t,n){var r={"":t};for(var o in e){var i=e[o];i.sourceId&&n[i.sourceId]&&(r[o]=n[i.sourceId])}return r}function ti(e){var t=e.options;return{eventUiSingleBase:Wt({display:t.eventDisplay,editable:t.editable,startEditable:t.eventStartEditable,durationEditable:t.eventDurationEditable,constraint:t.eventConstraint,overlap:"boolean"==typeof t.eventOverlap?t.eventOverlap:void 0,allow:t.eventAllow,backgroundColor:t.eventBackgroundColor,borderColor:t.eventBorderColor,textColor:t.eventTextColor,color:t.eventColor},e),selectionConfig:Wt({constraint:t.selectConstraint,overlap:"boolean"==typeof t.selectOverlap?t.selectOverlap:void 0,allow:t.selectAllow},e)}}function ni(e){return or(e.options.businessHours,e)}function ri(e,t){for(var n in e)console.warn("Unknown option '"+n+"'"+(t?" for view '"+t+"'":""))}var oi=function(e){function t(t){var n=e.call(this,t)||this;return n.handleData=function(e){n.dataManager?n.setState(e):n.state=e},n.dataManager=new Zo({optionOverrides:t.optionOverrides,calendarApi:t.calendarApi,onData:n.handleData}),n}return n(t,e),t.prototype.render=function(){return this.props.children(this.state)},t.prototype.componentDidUpdate=function(e){var t=this.props.optionOverrides;t!==e.optionOverrides&&this.dataManager.resetOptions(t)},t}(Nr);var ii=function(e){this.timeZoneName=e},ai=function(){function e(e){this.component=e.component}return e.prototype.destroy=function(){},e}();function si(e,t){return{component:e,el:t.el,useEventCenter:null==t.useEventCenter||t.useEventCenter}}function li(e){var t;return(t={})[e.component.uid]=e,t}var ui={},ci=function(){function e(e,t){this.emitter=new kr}return e.prototype.destroy=function(){},e.prototype.setMirrorIsVisible=function(e){},e.prototype.setMirrorNeedsRevert=function(e){},e.prototype.setAutoScrollEnabled=function(e){},e}(),di={},pi={startTime:Ye,duration:Ye,create:Boolean,sourceId:String};function fi(e){var t=xt(e,pi),n=t.refined,r=t.extra;return{startTime:n.startTime||null,duration:n.duration||null,create:null==n.create||n.create,sourceId:n.sourceId,leftoverProps:r}}var hi=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e,t,n=this.props,r=n.model,o=n.extraClassName,i=!1,a=r.center;return r.left?(i=!0,e=r.left):e=r.start,r.right?(i=!0,t=r.right):t=r.end,Hr("div",{className:[o||"","fc-toolbar",i?"fc-toolbar-ltr":""].join(" ")},this.renderSection("start",e||[]),this.renderSection("center",a||[]),this.renderSection("end",t||[]))},t.prototype.renderSection=function(e,t){var n=this.props;return Hr(vi,{key:e,widgetGroups:t,title:n.title,activeButton:n.activeButton,isTodayEnabled:n.isTodayEnabled,isPrevEnabled:n.isPrevEnabled,isNextEnabled:n.isNextEnabled})},t}(jr),vi=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this,t=this.props.widgetGroups.map((function(t){return e.renderWidgetGroup(t)}));return Hr.apply(void 0,o(["div",{className:"fc-toolbar-chunk"}],t))},t.prototype.renderWidgetGroup=function(e){for(var t=this.props,n=this.context.theme,i=[],a=!0,s=0,l=e;s<l.length;s++){var u=l[s],c=u.buttonName,d=u.buttonClick,p=u.buttonText,f=u.buttonIcon;if("title"===c)a=!1,i.push(Hr("h2",{className:"fc-toolbar-title"},t.title));else{var h=f?{"aria-label":c}:{},v=["fc-"+c+"-button",n.getClass("button")];c===t.activeButton&&v.push(n.getClass("buttonActive"));var g=!t.isTodayEnabled&&"today"===c||!t.isPrevEnabled&&"prev"===c||!t.isNextEnabled&&"next"===c;i.push(Hr("button",r({disabled:g,className:v.join(" "),onClick:d,type:"button"},h),p||(f?Hr("span",{className:f}):"")))}}if(i.length>1){var m=a&&n.getClass("buttonGroup")||"";return Hr.apply(void 0,o(["div",{className:m}],i))}return i[0]},t}(jr),gi=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={availableWidth:null},t.handleEl=function(e){t.el=e,Yr(t.props.elRef,e),t.updateAvailableWidth()},t.handleResize=function(){t.updateAvailableWidth()},t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.state,n=e.aspectRatio,r=["fc-view-harness",n||e.liquid||e.height?"fc-view-harness-active":"fc-view-harness-passive"],o="",i="";return n?null!==t.availableWidth?o=t.availableWidth/n:i=1/n*100+"%":o=e.height||"",Hr("div",{ref:this.handleEl,onClick:e.onClick,className:r.join(" "),style:{height:o,paddingBottom:i}},e.children)},t.prototype.componentDidMount=function(){this.context.addResizeHandler(this.handleResize)},t.prototype.componentWillUnmount=function(){this.context.removeResizeHandler(this.handleResize)},t.prototype.updateAvailableWidth=function(){this.el&&this.props.aspectRatio&&this.setState({availableWidth:this.el.offsetWidth})},t}(jr),mi=function(e){function t(t){var n=e.call(this,t)||this;return n.handleSegClick=function(e,t){var r=n.component,o=r.context,i=dn(t);if(i&&r.isValidSegDownEl(e.target)){var a=V(e.target,".fc-event-forced-url"),s=a?a.querySelector("a[href]").href:"";o.emitter.trigger("eventClick",{el:t,event:new zn(r.context,i.eventRange.def,i.eventRange.instance),jsEvent:e,view:o.viewApi}),s&&!e.defaultPrevented&&(window.location.href=s)}},n.destroy=Z(t.el,"click",".fc-event",n.handleSegClick),n}return n(t,e),t}(ai),yi=function(e){function t(t){var n,r,o,i,a,s=e.call(this,t)||this;return s.handleEventElRemove=function(e){e===s.currentSegEl&&s.handleSegLeave(null,s.currentSegEl)},s.handleSegEnter=function(e,t){dn(t)&&(s.currentSegEl=t,s.triggerEvent("eventMouseEnter",e,t))},s.handleSegLeave=function(e,t){s.currentSegEl&&(s.currentSegEl=null,s.triggerEvent("eventMouseLeave",e,t))},s.removeHoverListeners=(n=t.el,r=".fc-event",o=s.handleSegEnter,i=s.handleSegLeave,Z(n,"mouseover",r,(function(e,t){if(t!==a){a=t,o(e,t);var n=function(e){a=null,i(e,t),t.removeEventListener("mouseleave",n)};t.addEventListener("mouseleave",n)}}))),s}return n(t,e),t.prototype.destroy=function(){this.removeHoverListeners()},t.prototype.triggerEvent=function(e,t,n){var r=this.component,o=r.context,i=dn(n);t&&!r.isValidSegDownEl(t.target)||o.emitter.trigger(e,{el:n,event:new zn(o,i.eventRange.def,i.eventRange.instance),jsEvent:t,view:o.viewApi})},t}(ai),Ei=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.buildViewContext=it(Fr),t.buildViewPropTransformers=it(Di),t.buildToolbarProps=it(Si),t.handleNavLinkClick=Y("a[data-navlink]",t._handleNavLinkClick.bind(t)),t.headerRef=Ar(),t.footerRef=Ar(),t.interactionsStore={},t.registerInteractiveComponent=function(e,n){var r=si(e,n),o=[mi,yi].concat(t.props.pluginHooks.componentInteractions).map((function(e){return new e(r)}));t.interactionsStore[e.uid]=o,ui[e.uid]=r},t.unregisterInteractiveComponent=function(e){for(var n=0,r=t.interactionsStore[e.uid];n<r.length;n++){r[n].destroy()}delete t.interactionsStore[e.uid],delete ui[e.uid]},t.resizeRunner=new Go((function(){t.props.emitter.trigger("_resize",!0),t.props.emitter.trigger("windowResize",{view:t.props.viewApi})})),t.handleWindowResize=function(e){var n=t.props.options;n.handleWindowResize&&e.target===window&&t.resizeRunner.request(n.windowResizeDelay)},t}return n(t,e),t.prototype.render=function(){var e,t=this.props,n=t.toolbarConfig,o=t.options,i=this.buildToolbarProps(t.viewSpec,t.dateProfile,t.dateProfileGenerator,t.currentDate,Wn(t.options.now,t.dateEnv),t.viewTitle),a=!1,s="";t.isHeightAuto||t.forPrint?s="":null!=o.height?a=!0:null!=o.contentHeight?s=o.contentHeight:e=Math.max(o.aspectRatio,.5);var l=this.buildViewContext(t.viewSpec,t.viewApi,t.options,t.dateProfileGenerator,t.dateEnv,t.theme,t.pluginHooks,t.dispatch,t.getCurrentData,t.emitter,t.calendarApi,this.registerInteractiveComponent,this.unregisterInteractiveComponent);return Hr(zr.Provider,{value:l},n.headerToolbar&&Hr(hi,r({ref:this.headerRef,extraClassName:"fc-header-toolbar",model:n.headerToolbar},i)),Hr(gi,{liquid:a,height:s,aspectRatio:e,onClick:this.handleNavLinkClick},this.renderView(t),this.buildAppendContent()),n.footerToolbar&&Hr(hi,r({ref:this.footerRef,extraClassName:"fc-footer-toolbar",model:n.footerToolbar},i)))},t.prototype.componentDidMount=function(){var e=this.props;this.calendarInteractions=e.pluginHooks.calendarInteractions.map((function(t){return new t(e)})),window.addEventListener("resize",this.handleWindowResize);var t=e.pluginHooks.propSetHandlers;for(var n in t)t[n](e[n],e)},t.prototype.componentDidUpdate=function(e){var t=this.props,n=t.pluginHooks.propSetHandlers;for(var r in n)t[r]!==e[r]&&n[r](t[r],t)},t.prototype.componentWillUnmount=function(){window.removeEventListener("resize",this.handleWindowResize),this.resizeRunner.clear();for(var e=0,t=this.calendarInteractions;e<t.length;e++){t[e].destroy()}this.props.emitter.trigger("_unmount")},t.prototype._handleNavLinkClick=function(e,t){var n=this.props,r=n.dateEnv,o=n.options,i=n.calendarApi,a=t.getAttribute("data-navlink");a=a?JSON.parse(a):{};var s=r.createMarker(a.date),l=a.type,u="day"===l?o.navLinkDayClick:"week"===l?o.navLinkWeekClick:null;"function"==typeof u?u.call(i,r.toDate(s),e):("string"==typeof u&&(l=u),i.zoomTo(s,l))},t.prototype.buildAppendContent=function(){var e=this.props,t=e.pluginHooks.viewContainerAppends.map((function(t){return t(e)}));return Hr.apply(void 0,o([Ur,{}],t))},t.prototype.renderView=function(e){for(var t=e.pluginHooks,n=e.viewSpec,o={dateProfile:e.dateProfile,businessHours:e.businessHours,eventStore:e.renderableEventStore,eventUiBases:e.eventUiBases,dateSelection:e.dateSelection,eventSelection:e.eventSelection,eventDrag:e.eventDrag,eventResize:e.eventResize,isHeightAuto:e.isHeightAuto,forPrint:e.forPrint},i=0,a=this.buildViewPropTransformers(t.viewPropsTransformers);i<a.length;i++){var s=a[i];r(o,s.transform(o,e))}var l=n.component;return Hr(l,r({},o))},t}(Br);function Si(e,t,n,r,o,i){var a=n.build(o,void 0,!1),s=n.buildPrev(t,r,!1),l=n.buildNext(t,r,!1);return{title:i,activeButton:e.type,isTodayEnabled:a.isValid&&!sn(t.currentRange,o),isPrevEnabled:s.isValid,isNextEnabled:l.isValid}}function Di(e){return e.map((function(e){return new e}))}var bi=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={forPrint:!1},t.handleBeforePrint=function(){t.setState({forPrint:!0})},t.handleAfterPrint=function(){t.setState({forPrint:!1})},t}return n(t,e),t.prototype.render=function(){var e=this.props,t=e.options,n=this.state.forPrint,r=n||"auto"===t.height||"auto"===t.contentHeight,o=r||null==t.height?"":t.height,i=["fc",n?"fc-media-print":"fc-media-screen","fc-direction-"+t.direction,e.theme.getClass("root")];return cr()||i.push("fc-liquid-hack"),e.children(i,o,r,n)},t.prototype.componentDidMount=function(){var e=this.props.emitter;e.on("_beforeprint",this.handleBeforePrint),e.on("_afterprint",this.handleAfterPrint)},t.prototype.componentWillUnmount=function(){var e=this.props.emitter;e.off("_beforeprint",this.handleBeforePrint),e.off("_afterprint",this.handleAfterPrint)},t}(jr);function Ci(e,t){return St(!e||t>10?{weekday:"short"}:t>1?{weekday:"short",month:"numeric",day:"numeric",omitCommas:!0}:{weekday:"long"})}var wi="fc-col-header-cell",Ri=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.context,t=e.dateEnv,n=e.options,o=e.theme,i=e.viewApi,a=this.props,s=a.date,l=a.dateProfile,u=hr(s,a.todayRange,null,l),c=[wi].concat(vr(u,o)),d=t.format(s,a.dayHeaderFormat),p=n.navLinks&&!u.isDisabled&&a.colCnt>1?{"data-navlink":gr(s),tabIndex:0}:{},f=r(r(r({date:t.toDate(s),view:i},a.extraHookProps),{text:d}),u);return Hr(uo,{hookProps:f,classNames:n.dayHeaderClassNames,content:n.dayHeaderContent,defaultContent:ki,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},(function(e,t,n,o){return Hr("th",r({ref:e,className:c.concat(t).join(" "),"data-date":u.isDisabled?void 0:tt(s),colSpan:a.colSpan},a.extraDataAttrs),Hr("div",{className:"fc-scrollgrid-sync-inner"},!u.isDisabled&&Hr("a",r({ref:n,className:["fc-col-header-cell-cushion",a.isSticky?"fc-sticky":""].join(" ")},p),o)))}))},t}(jr),Ti=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.dateEnv,o=t.theme,i=t.viewApi,a=t.options,s=ve(new Date(2592e5),e.dow),l={dow:e.dow,isDisabled:!1,isFuture:!1,isPast:!1,isToday:!1,isOther:!1},u=[wi].concat(vr(l,o),e.extraClassNames||[]),c=n.format(s,e.dayHeaderFormat),d=r(r(r(r({date:s},l),{view:i}),e.extraHookProps),{text:c});return Hr(uo,{hookProps:d,classNames:a.dayHeaderClassNames,content:a.dayHeaderContent,defaultContent:ki,didMount:a.dayHeaderDidMount,willUnmount:a.dayHeaderWillUnmount},(function(t,n,o,i){return Hr("th",r({ref:t,className:u.concat(n).join(" "),colSpan:e.colSpan},e.extraDataAttrs),Hr("div",{className:"fc-scrollgrid-sync-inner"},Hr("a",{className:["fc-col-header-cell-cushion",e.isSticky?"fc-sticky":""].join(" "),ref:o},i)))}))},t}(jr);function ki(e){return e.text}var Mi=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.initialNowDate=Wn(n.options.now,n.dateEnv),r.initialNowQueriedMs=(new Date).valueOf(),r.state=r.computeTiming().currentState,r}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.state;return e.children(t.nowDate,t.todayRange)},t.prototype.componentDidMount=function(){this.setTimeout()},t.prototype.componentDidUpdate=function(e){e.unit!==this.props.unit&&(this.clearTimeout(),this.setTimeout())},t.prototype.componentWillUnmount=function(){this.clearTimeout()},t.prototype.computeTiming=function(){var e=this.props,t=this.context,n=ge(this.initialNowDate,(new Date).valueOf()-this.initialNowQueriedMs),r=t.dateEnv.startOf(n,e.unit),o=t.dateEnv.add(r,Ye(1,e.unit)),i=o.valueOf()-n.valueOf();return{currentState:{nowDate:r,todayRange:xi(r)},nextState:{nowDate:o,todayRange:xi(o)},waitMs:i}},t.prototype.setTimeout=function(){var e=this,t=this.computeTiming(),n=t.nextState,r=t.waitMs;this.timeoutId=setTimeout((function(){e.setState(n,(function(){e.setTimeout()}))}),r)},t.prototype.clearTimeout=function(){this.timeoutId&&clearTimeout(this.timeoutId)},t.contextType=zr,t}(Nr);function xi(e){var t=be(e);return{start:t,end:ve(t,1)}}var _i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.createDayHeaderFormatter=it(Ii),t}return n(t,e),t.prototype.render=function(){var e=this.context,t=this.props,n=t.dates,r=t.dateProfile,o=t.datesRepDistinctDays,i=t.renderIntro,a=this.createDayHeaderFormatter(e.options.dayHeaderFormat,o,n.length);return Hr(Mi,{unit:"day"},(function(e,t){return Hr("tr",null,i&&i(),n.map((function(e){return o?Hr(Ri,{key:e.toISOString(),date:e,dateProfile:r,todayRange:t,colCnt:n.length,dayHeaderFormat:a}):Hr(Ti,{key:e.getUTCDay(),dow:e.getUTCDay(),dayHeaderFormat:a})})))}))},t}(jr);function Ii(e,t,n){return e||Ci(t,n)}var Pi=function(){function e(e,t){for(var n=e.start,r=e.end,o=[],i=[],a=-1;n<r;)t.isHiddenDay(n)?o.push(a+.5):(a++,o.push(a),i.push(n)),n=ve(n,1);this.dates=i,this.indices=o,this.cnt=i.length}return e.prototype.sliceRange=function(e){var t=this.getDateDayIndex(e.start),n=this.getDateDayIndex(ve(e.end,-1)),r=Math.max(0,t),o=Math.min(this.cnt-1,n);return(r=Math.ceil(r))<=(o=Math.floor(o))?{firstIndex:r,lastIndex:o,isStart:t===r,isEnd:n===o}:null},e.prototype.getDateDayIndex=function(e){var t=this.indices,n=Math.floor(ye(this.dates[0],e));return n<0?t[0]-1:n>=t.length?t[t.length-1]+1:t[n]},e}(),Ni=function(){function e(e,t){var n,r,o,i=e.dates;if(t){for(r=i[0].getUTCDay(),n=1;n<i.length&&i[n].getUTCDay()!==r;n++);o=Math.ceil(i.length/n)}else o=1,n=i.length;this.rowCnt=o,this.colCnt=n,this.daySeries=e,this.cells=this.buildCells(),this.headerDates=this.buildHeaderDates()}return e.prototype.buildCells=function(){for(var e=[],t=0;t<this.rowCnt;t++){for(var n=[],r=0;r<this.colCnt;r++)n.push(this.buildCell(t,r));e.push(n)}return e},e.prototype.buildCell=function(e,t){var n=this.daySeries.dates[e*this.colCnt+t];return{key:n.toISOString(),date:n}},e.prototype.buildHeaderDates=function(){for(var e=[],t=0;t<this.colCnt;t++)e.push(this.cells[0][t].date);return e},e.prototype.sliceRange=function(e){var t=this.colCnt,n=this.daySeries.sliceRange(e),r=[];if(n)for(var o=n.firstIndex,i=n.lastIndex,a=o;a<=i;){var s=Math.floor(a/t),l=Math.min((s+1)*t,i+1);r.push({row:s,firstCol:a%t,lastCol:(l-1)%t,isStart:n.isStart&&a===o,isEnd:n.isEnd&&l-1===i}),a=l}return r},e}(),Hi=function(){function e(){this.sliceBusinessHours=it(this._sliceBusinessHours),this.sliceDateSelection=it(this._sliceDateSpan),this.sliceEventStore=it(this._sliceEventStore),this.sliceEventDrag=it(this._sliceInteraction),this.sliceEventResize=it(this._sliceInteraction),this.forceDayIfListItem=!1}return e.prototype.sliceProps=function(e,t,n,r){for(var i=[],a=4;a<arguments.length;a++)i[a-4]=arguments[a];var s=e.eventUiBases,l=this.sliceEventStore.apply(this,o([e.eventStore,s,t,n],i));return{dateSelectionSegs:this.sliceDateSelection.apply(this,o([e.dateSelection,s,r],i)),businessHourSegs:this.sliceBusinessHours.apply(this,o([e.businessHours,t,n,r],i)),fgEventSegs:l.fg,bgEventSegs:l.bg,eventDrag:this.sliceEventDrag.apply(this,o([e.eventDrag,s,t,n],i)),eventResize:this.sliceEventResize.apply(this,o([e.eventResize,s,t,n],i)),eventSelection:e.eventSelection}},e.prototype.sliceNowDate=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];return this._sliceDateSpan.apply(this,o([{range:{start:e,end:ge(e,1)},allDay:!1},{},t],n))},e.prototype._sliceBusinessHours=function(e,t,n,r){for(var i=[],a=4;a<arguments.length;a++)i[a-4]=arguments[a];return e?this._sliceEventStore.apply(this,o([Be(e,Oi(t,Boolean(n)),r),{},t,n],i)).bg:[]},e.prototype._sliceEventStore=function(e,t,n,r){for(var o=[],i=4;i<arguments.length;i++)o[i-4]=arguments[i];if(e){var a=ln(e,t,Oi(n,Boolean(r)),r);return{bg:this.sliceEventRanges(a.bg,o),fg:this.sliceEventRanges(a.fg,o)}}return{bg:[],fg:[]}},e.prototype._sliceInteraction=function(e,t,n,r){for(var o=[],i=4;i<arguments.length;i++)o[i-4]=arguments[i];if(!e)return null;var a=ln(e.mutatedEvents,t,Oi(n,Boolean(r)),r);return{segs:this.sliceEventRanges(a.fg,o),affectedInstances:e.affectedEvents.instances,isEvent:e.isEvent}},e.prototype._sliceDateSpan=function(e,t,n){for(var r=[],i=3;i<arguments.length;i++)r[i-3]=arguments[i];if(!e)return[];for(var a=Mn(e,t,n),s=this.sliceRange.apply(this,o([e.range],r)),l=0,u=s;l<u.length;l++){var c=u[l];c.eventRange=a}return s},e.prototype.sliceEventRanges=function(e,t){for(var n=[],r=0,o=e;r<o.length;r++){var i=o[r];n.push.apply(n,this.sliceEventRange(i,t))}return n},e.prototype.sliceEventRange=function(e,t){var n=e.range;this.forceDayIfListItem&&"list-item"===e.ui.display&&(n={start:n.start,end:ve(n.start,1)});for(var r=this.sliceRange.apply(this,o([n],t)),i=0,a=r;i<a.length;i++){var s=a[i];s.eventRange=e,s.isStart=e.isStart&&s.isStart,s.isEnd=e.isEnd&&s.isEnd}return r},e}();function Oi(e,t){var n=e.activeRange;return t?n:{start:ge(n.start,e.slotMinTime.milliseconds),end:ge(n.end,e.slotMaxTime.milliseconds-864e5)}}var Ai=/^(visible|hidden)$/,Ui=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleEl=function(e){t.el=e,Yr(t.props.elRef,e)},t}return n(t,e),t.prototype.render=function(){var e=this.props,t=e.liquid,n=e.liquidIsAbsolute,r=t&&n,o=["fc-scroller"];return t&&(n?o.push("fc-scroller-liquid-absolute"):o.push("fc-scroller-liquid")),Hr("div",{ref:this.handleEl,className:o.join(" "),style:{overflowX:e.overflowX,overflowY:e.overflowY,left:r&&-(e.overcomeLeft||0)||"",right:r&&-(e.overcomeRight||0)||"",bottom:r&&-(e.overcomeBottom||0)||"",marginLeft:!r&&-(e.overcomeLeft||0)||"",marginRight:!r&&-(e.overcomeRight||0)||"",marginBottom:!r&&-(e.overcomeBottom||0)||"",maxHeight:e.maxHeight||""}},e.children)},t.prototype.needsXScrolling=function(){if(Ai.test(this.props.overflowX))return!1;for(var e=this.el,t=this.el.getBoundingClientRect().width-this.getYScrollbarWidth(),n=e.children,r=0;r<n.length;r++){if(n[r].getBoundingClientRect().width>t)return!0}return!1},t.prototype.needsYScrolling=function(){if(Ai.test(this.props.overflowY))return!1;for(var e=this.el,t=this.el.getBoundingClientRect().height-this.getXScrollbarWidth(),n=e.children,r=0;r<n.length;r++){if(n[r].getBoundingClientRect().height>t)return!0}return!1},t.prototype.getXScrollbarWidth=function(){return Ai.test(this.props.overflowX)?0:this.el.offsetHeight-this.el.clientHeight},t.prototype.getYScrollbarWidth=function(){return Ai.test(this.props.overflowY)?0:this.el.offsetWidth-this.el.clientWidth},t}(jr),Li=function(){function e(e){var t=this;this.masterCallback=e,this.currentMap={},this.depths={},this.callbackMap={},this.handleValue=function(e,n){var r=t,o=r.depths,i=r.currentMap,a=!1,s=!1;null!==e?(a=n in i,i[n]=e,o[n]=(o[n]||0)+1,s=!0):0==--o[n]&&(delete i[n],delete t.callbackMap[n],a=!0),t.masterCallback&&(a&&t.masterCallback(null,String(n)),s&&t.masterCallback(e,String(n)))}}return e.prototype.createRef=function(e){var t=this,n=this.callbackMap[e];return n||(n=this.callbackMap[e]=function(n){t.handleValue(n,String(e))}),n},e.prototype.collect=function(e,t,n){return Fe(this.currentMap,e,t,n)},e.prototype.getAll=function(){return Ue(this.currentMap)},e}();function Wi(e){for(var t=0,n=0,r=F(e,".fc-scrollgrid-shrink");n<r.length;n++){var o=r[n];t=Math.max(t,pe(o))}return Math.ceil(t)}function Vi(e,t){return e.liquid&&t.liquid}function zi(e,t){return null!=t.maxHeight||Vi(e,t)}function Fi(e,t,n){var r=n.expandRows;return"function"==typeof t.content?t.content(n):Hr("table",{className:[t.tableClassName,e.syncRowHeights?"fc-scrollgrid-sync-table":""].join(" "),style:{minWidth:n.tableMinWidth,width:n.clientWidth,height:r?n.clientHeight:""}},n.tableColGroupNode,Hr("tbody",{},"function"==typeof t.rowContent?t.rowContent(n):t.rowContent))}function Bi(e,t){return ot(e,t,Le)}function ji(e,t){for(var n=[],r=0,i=e;r<i.length;r++)for(var a=i[r],s=a.span||1,l=0;l<s;l++)n.push(Hr("col",{style:{width:"shrink"===a.width?Gi(t):a.width||"",minWidth:a.minWidth||""}}));return Hr.apply(void 0,o(["colgroup",{}],n))}function Gi(e){return null==e?4:e}function qi(e){for(var t=0,n=e;t<n.length;t++){if("shrink"===n[t].width)return!0}return!1}function Yi(e,t){var n=["fc-scrollgrid",t.theme.getClass("table")];return e&&n.push("fc-scrollgrid-liquid"),n}function Zi(e,t){var n=["fc-scrollgrid-section","fc-scrollgrid-section-"+e.type,e.className];return t&&e.liquid&&null==e.maxHeight&&n.push("fc-scrollgrid-section-liquid"),e.isSticky&&n.push("fc-scrollgrid-section-sticky"),n}function Xi(e){return Hr("div",{className:"fc-scrollgrid-sticky-shim",style:{width:e.clientWidth,minWidth:e.tableMinWidth}})}function Ki(e){var t=e.stickyHeaderDates;return null!=t&&"auto"!==t||(t="auto"===e.height||"auto"===e.viewHeight),t}function Ji(e){var t=e.stickyFooterScrollbar;return null!=t&&"auto"!==t||(t="auto"===e.height||"auto"===e.viewHeight),t}var $i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.processCols=it((function(e){return e}),Bi),t.renderMicroColGroup=it(ji),t.scrollerRefs=new Li,t.scrollerElRefs=new Li(t._handleScrollerEl.bind(t)),t.state={shrinkWidth:null,forceYScrollbars:!1,scrollerClientWidths:{},scrollerClientHeights:{}},t.handleSizing=function(){t.setState(r({shrinkWidth:t.computeShrinkWidth()},t.computeScrollerDims()))},t}return n(t,e),t.prototype.render=function(){for(var e,t=this.props,n=this.state,r=this.context,i=t.sections||[],a=this.processCols(t.cols),s=this.renderMicroColGroup(a,n.shrinkWidth),l=Yi(t.liquid,r),u=i.length,c=0,d=[],p=[],f=[];c<u&&"header"===(e=i[c]).type;)d.push(this.renderSection(e,c,s)),c++;for(;c<u&&"body"===(e=i[c]).type;)p.push(this.renderSection(e,c,s)),c++;for(;c<u&&"footer"===(e=i[c]).type;)f.push(this.renderSection(e,c,s)),c++;var h=!cr();return Hr("table",{className:l.join(" "),style:{height:t.height}},Boolean(!h&&d.length)&&Hr.apply(void 0,o(["thead",{}],d)),Boolean(!h&&p.length)&&Hr.apply(void 0,o(["tbody",{}],p)),Boolean(!h&&f.length)&&Hr.apply(void 0,o(["tfoot",{}],f)),h&&Hr.apply(void 0,o(["tbody",{}],d,p,f)))},t.prototype.renderSection=function(e,t,n){return"outerContent"in e?Hr(Ur,{key:e.key},e.outerContent):Hr("tr",{key:e.key,className:Zi(e,this.props.liquid).join(" ")},this.renderChunkTd(e,t,n,e.chunk))},t.prototype.renderChunkTd=function(e,t,n,r){if("outerContent"in r)return r.outerContent;var o=this.props,i=this.state,a=i.forceYScrollbars,s=i.scrollerClientWidths,l=i.scrollerClientHeights,u=zi(o,e),c=Vi(o,e),d=o.liquid?a?"scroll":u?"auto":"hidden":"visible",p=Fi(e,r,{tableColGroupNode:n,tableMinWidth:"",clientWidth:void 0!==s[t]?s[t]:null,clientHeight:void 0!==l[t]?l[t]:null,expandRows:e.expandRows,syncRowHeights:!1,rowSyncHeights:[],reportRowHeightChange:function(){}});return Hr("td",{ref:r.elRef},Hr("div",{className:"fc-scroller-harness"+(c?" fc-scroller-harness-liquid":"")},Hr(Ui,{ref:this.scrollerRefs.createRef(t),elRef:this.scrollerElRefs.createRef(t),overflowY:d,overflowX:o.liquid?"hidden":"visible",maxHeight:e.maxHeight,liquid:c,liquidIsAbsolute:!0},p)))},t.prototype._handleScrollerEl=function(e,t){var n=parseInt(t,10);Yr(this.props.sections[n].chunk.scrollerElRef,e)},t.prototype.componentDidMount=function(){this.handleSizing(),this.context.addResizeHandler(this.handleSizing)},t.prototype.componentDidUpdate=function(){this.handleSizing()},t.prototype.componentWillUnmount=function(){this.context.removeResizeHandler(this.handleSizing)},t.prototype.computeShrinkWidth=function(){return qi(this.props.cols)?Wi(this.scrollerElRefs.getAll()):0},t.prototype.computeScrollerDims=function(){for(var e=Sr(),t=this.props.sections.length,n=this.scrollerRefs,r=this.scrollerElRefs,o=!1,i={},a={},s=0;s<t;s++){var l=n.currentMap[s];if(l&&l.needsYScrolling()){o=!0;break}}for(s=0;s<t;s++){var u=r.currentMap[s];if(u){var c=u.parentNode;i[s]=Math.floor(c.getBoundingClientRect().width-(o?e.y:0)),a[s]=Math.floor(c.getBoundingClientRect().height)}}return{forceYScrollbars:o,scrollerClientWidths:i,scrollerClientHeights:a}},t}(jr);$i.addStateEquality({scrollerClientWidths:Le,scrollerClientHeights:Le});var Qi=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.elRef=Ar(),t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options,r=e.seg,o=r.eventRange,i=o.ui,a={event:new zn(t,o.def,o.instance),view:t.viewApi,timeText:e.timeText,textColor:i.textColor,backgroundColor:i.backgroundColor,borderColor:i.borderColor,isDraggable:!e.disableDragging&&gn(r,t),isStartResizable:!e.disableResizing&&mn(r,t),isEndResizable:!e.disableResizing&&yn(r),isMirror:Boolean(e.isDragging||e.isResizing||e.isDateSelecting),isStart:Boolean(r.isStart),isEnd:Boolean(r.isEnd),isPast:Boolean(e.isPast),isFuture:Boolean(e.isFuture),isToday:Boolean(e.isToday),isSelected:Boolean(e.isSelected),isDragging:Boolean(e.isDragging),isResizing:Boolean(e.isResizing)},s=Dn(a).concat(i.classNames);return Hr(uo,{hookProps:a,classNames:n.eventClassNames,content:n.eventContent,defaultContent:e.defaultContent,didMount:n.eventDidMount,willUnmount:n.eventWillUnmount,elRef:this.elRef},(function(t,n,r,o){return e.children(t,s.concat(n),r,o,a)}))},t.prototype.componentDidMount=function(){cn(this.elRef.current,this.props.seg)},t.prototype.componentDidUpdate=function(e){var t=this.props.seg;t!==e.seg&&cn(this.elRef.current,t)},t}(jr),ea=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=e.seg,o=t.options.eventTimeFormat||e.defaultTimeFormat,i=En(n,o,t,e.defaultDisplayEventTime,e.defaultDisplayEventEnd);return Hr(Qi,{seg:n,timeText:i,disableDragging:e.disableDragging,disableResizing:e.disableResizing,defaultContent:e.defaultContent||ta,isDragging:e.isDragging,isResizing:e.isResizing,isDateSelecting:e.isDateSelecting,isSelected:e.isSelected,isPast:e.isPast,isFuture:e.isFuture,isToday:e.isToday},(function(t,o,i,a,s){return Hr("a",r({className:e.extraClassNames.concat(o).join(" "),style:{borderColor:s.borderColor,backgroundColor:s.backgroundColor},ref:t},function(e){var t=e.eventRange.def.url;return t?{href:t}:{}}(n)),Hr("div",{className:"fc-event-main",ref:i,style:{color:s.textColor}},a),s.isStartResizable&&Hr("div",{className:"fc-event-resizer fc-event-resizer-start"}),s.isEndResizable&&Hr("div",{className:"fc-event-resizer fc-event-resizer-end"}))}))},t}(jr);function ta(e){return Hr("div",{className:"fc-event-main-frame"},e.timeText&&Hr("div",{className:"fc-event-time"},e.timeText),Hr("div",{className:"fc-event-title-container"},Hr("div",{className:"fc-event-title fc-sticky"},e.event.title||Hr(Ur,null," "))))}var na=function(e){return Hr(zr.Consumer,null,(function(t){var n=t.options,r={isAxis:e.isAxis,date:t.dateEnv.toDate(e.date),view:t.viewApi};return Hr(uo,{hookProps:r,classNames:n.nowIndicatorClassNames,content:n.nowIndicatorContent,didMount:n.nowIndicatorDidMount,willUnmount:n.nowIndicatorWillUnmount},e.children)}))},ra=St({day:"numeric"}),oa=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.refineHookProps=at(aa),t.normalizeClassNames=vo(),t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options,r=this.refineHookProps({date:e.date,dateProfile:e.dateProfile,todayRange:e.todayRange,showDayNumber:e.showDayNumber,extraProps:e.extraHookProps,viewApi:t.viewApi,dateEnv:t.dateEnv}),o=vr(r,t.theme).concat(r.isDisabled?[]:this.normalizeClassNames(n.dayCellClassNames,r)),i=r.isDisabled?{}:{"data-date":tt(e.date)};return Hr(ho,{hookProps:r,didMount:n.dayCellDidMount,willUnmount:n.dayCellWillUnmount,elRef:e.elRef},(function(t){return e.children(t,o,i,r.isDisabled)}))},t}(jr),ia=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options,r=aa({date:e.date,dateProfile:e.dateProfile,todayRange:e.todayRange,showDayNumber:e.showDayNumber,extraProps:e.extraHookProps,viewApi:t.viewApi,dateEnv:t.dateEnv});return Hr(po,{hookProps:r,content:n.dayCellContent,defaultContent:e.defaultContent},e.children)},t}(jr);function aa(e){var t=e.date,n=e.dateEnv,o=hr(t,e.todayRange,null,e.dateProfile);return r(r(r({date:n.toDate(t),view:e.viewApi},o),{dayNumberText:e.showDayNumber?n.format(t,ra):""}),e.extraProps)}function sa(e){return Hr("div",{className:"fc-"+e})}var la=function(e){return Hr(Qi,{defaultContent:ua,seg:e.seg,timeText:"",disableDragging:!0,disableResizing:!0,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,isPast:e.isPast,isFuture:e.isFuture,isToday:e.isToday},(function(e,t,n,r,o){return Hr("div",{ref:e,className:["fc-bg-event"].concat(t).join(" "),style:{backgroundColor:o.backgroundColor}},r)}))};function ua(e){return e.event.title&&Hr("div",{className:"fc-event-title"},e.event.title)}var ca=function(e){return Hr(zr.Consumer,null,(function(t){var n=t.dateEnv,r=t.options,o=e.date,i=r.weekNumberFormat||e.defaultFormat,a=n.computeWeekNumber(o),s=n.format(o,i);return Hr(uo,{hookProps:{num:a,text:s,date:o},classNames:r.weekNumberClassNames,content:r.weekNumberContent,defaultContent:da,didMount:r.weekNumberDidMount,willUnmount:r.weekNumberWillUnmount},e.children)}))};function da(e){return e.text}var pa=function(e){function t(t,n){void 0===n&&(n={});var o=e.call(this)||this;return o.isRendering=!1,o.isRendered=!1,o.currentClassNames=[],o.customContentRenderId=0,o.handleAction=function(e){switch(e.type){case"SET_EVENT_DRAG":case"SET_EVENT_RESIZE":o.renderRunner.tryDrain()}},o.handleData=function(e){o.currentData=e,o.renderRunner.request(e.calendarOptions.rerenderDelay)},o.handleRenderRequest=function(){if(o.isRendering){o.isRendered=!0;var e=o.currentData;Or(Hr(bi,{options:e.calendarOptions,theme:e.theme,emitter:e.emitter},(function(t,n,i,a){return o.setClassNames(t),o.setHeight(n),Hr(co.Provider,{value:o.customContentRenderId},Hr(Ei,r({isHeightAuto:i,forPrint:a},e)))})),o.el)}else o.isRendered&&(o.isRendered=!1,Or(null,o.el),o.setClassNames([]),o.setHeight(""));Wr()},o.el=t,o.renderRunner=new Go(o.handleRenderRequest),new Zo({optionOverrides:n,calendarApi:o,onAction:o.handleAction,onData:o.handleData}),o}return n(t,e),Object.defineProperty(t.prototype,"view",{get:function(){return this.currentData.viewApi},enumerable:!1,configurable:!0}),t.prototype.render=function(){var e=this.isRendering;e?this.customContentRenderId++:this.isRendering=!0,this.renderRunner.request(),e&&this.updateSize()},t.prototype.destroy=function(){this.isRendering&&(this.isRendering=!1,this.renderRunner.request())},t.prototype.updateSize=function(){e.prototype.updateSize.call(this),Wr()},t.prototype.batchRendering=function(e){this.renderRunner.pause("batchRendering"),e(),this.renderRunner.resume("batchRendering")},t.prototype.pauseRendering=function(){this.renderRunner.pause("pauseRendering")},t.prototype.resumeRendering=function(){this.renderRunner.resume("pauseRendering",!0)},t.prototype.resetOptions=function(e,t){this.currentDataManager.resetOptions(e,t)},t.prototype.setClassNames=function(e){if(!ot(e,this.currentClassNames)){for(var t=this.el.classList,n=0,r=this.currentClassNames;n<r.length;n++){var o=r[n];t.remove(o)}for(var i=0,a=e;i<a.length;i++){o=a[i];t.add(o)}this.currentClassNames=e}},t.prototype.setHeight=function(e){G(this.el,"height",e)},t}(Vn);di.touchMouseIgnoreWait=500;var fa=0,ha=0,va=!1,ga=function(){function e(e){var t=this;this.subjectEl=null,this.selector="",this.handleSelector="",this.shouldIgnoreMove=!1,this.shouldWatchScroll=!0,this.isDragging=!1,this.isTouchDragging=!1,this.wasTouchScroll=!1,this.handleMouseDown=function(e){if(!t.shouldIgnoreMouse()&&function(e){return 0===e.button&&!e.ctrlKey}(e)&&t.tryStart(e)){var n=t.createEventFromMouse(e,!0);t.emitter.trigger("pointerdown",n),t.initScrollWatch(n),t.shouldIgnoreMove||document.addEventListener("mousemove",t.handleMouseMove),document.addEventListener("mouseup",t.handleMouseUp)}},this.handleMouseMove=function(e){var n=t.createEventFromMouse(e);t.recordCoords(n),t.emitter.trigger("pointermove",n)},this.handleMouseUp=function(e){document.removeEventListener("mousemove",t.handleMouseMove),document.removeEventListener("mouseup",t.handleMouseUp),t.emitter.trigger("pointerup",t.createEventFromMouse(e)),t.cleanup()},this.handleTouchStart=function(e){if(t.tryStart(e)){t.isTouchDragging=!0;var n=t.createEventFromTouch(e,!0);t.emitter.trigger("pointerdown",n),t.initScrollWatch(n);var r=e.target;t.shouldIgnoreMove||r.addEventListener("touchmove",t.handleTouchMove),r.addEventListener("touchend",t.handleTouchEnd),r.addEventListener("touchcancel",t.handleTouchEnd),window.addEventListener("scroll",t.handleTouchScroll,!0)}},this.handleTouchMove=function(e){var n=t.createEventFromTouch(e);t.recordCoords(n),t.emitter.trigger("pointermove",n)},this.handleTouchEnd=function(e){if(t.isDragging){var n=e.target;n.removeEventListener("touchmove",t.handleTouchMove),n.removeEventListener("touchend",t.handleTouchEnd),n.removeEventListener("touchcancel",t.handleTouchEnd),window.removeEventListener("scroll",t.handleTouchScroll,!0),t.emitter.trigger("pointerup",t.createEventFromTouch(e)),t.cleanup(),t.isTouchDragging=!1,fa++,setTimeout((function(){fa--}),di.touchMouseIgnoreWait)}},this.handleTouchScroll=function(){t.wasTouchScroll=!0},this.handleScroll=function(e){if(!t.shouldIgnoreMove){var n=window.pageXOffset-t.prevScrollX+t.prevPageX,r=window.pageYOffset-t.prevScrollY+t.prevPageY;t.emitter.trigger("pointermove",{origEvent:e,isTouch:t.isTouchDragging,subjectEl:t.subjectEl,pageX:n,pageY:r,deltaX:n-t.origPageX,deltaY:r-t.origPageY})}},this.containerEl=e,this.emitter=new kr,e.addEventListener("mousedown",this.handleMouseDown),e.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),ha++||window.addEventListener("touchmove",ma,{passive:!1})}return e.prototype.destroy=function(){this.containerEl.removeEventListener("mousedown",this.handleMouseDown),this.containerEl.removeEventListener("touchstart",this.handleTouchStart,{passive:!0}),--ha||window.removeEventListener("touchmove",ma,{passive:!1})},e.prototype.tryStart=function(e){var t=this.querySubjectEl(e),n=e.target;return!(!t||this.handleSelector&&!V(n,this.handleSelector))&&(this.subjectEl=t,this.isDragging=!0,this.wasTouchScroll=!1,!0)},e.prototype.cleanup=function(){va=!1,this.isDragging=!1,this.subjectEl=null,this.destroyScrollWatch()},e.prototype.querySubjectEl=function(e){return this.selector?V(e.target,this.selector):this.containerEl},e.prototype.shouldIgnoreMouse=function(){return fa||this.isTouchDragging},e.prototype.cancelTouchScroll=function(){this.isDragging&&(va=!0)},e.prototype.initScrollWatch=function(e){this.shouldWatchScroll&&(this.recordCoords(e),window.addEventListener("scroll",this.handleScroll,!0))},e.prototype.recordCoords=function(e){this.shouldWatchScroll&&(this.prevPageX=e.pageX,this.prevPageY=e.pageY,this.prevScrollX=window.pageXOffset,this.prevScrollY=window.pageYOffset)},e.prototype.destroyScrollWatch=function(){this.shouldWatchScroll&&window.removeEventListener("scroll",this.handleScroll,!0)},e.prototype.createEventFromMouse=function(e,t){var n=0,r=0;return t?(this.origPageX=e.pageX,this.origPageY=e.pageY):(n=e.pageX-this.origPageX,r=e.pageY-this.origPageY),{origEvent:e,isTouch:!1,subjectEl:this.subjectEl,pageX:e.pageX,pageY:e.pageY,deltaX:n,deltaY:r}},e.prototype.createEventFromTouch=function(e,t){var n,r,o=e.touches,i=0,a=0;return o&&o.length?(n=o[0].pageX,r=o[0].pageY):(n=e.pageX,r=e.pageY),t?(this.origPageX=n,this.origPageY=r):(i=n-this.origPageX,a=r-this.origPageY),{origEvent:e,isTouch:!0,subjectEl:this.subjectEl,pageX:n,pageY:r,deltaX:i,deltaY:a}},e}();function ma(e){va&&e.preventDefault()}var ya=function(){function e(){this.isVisible=!1,this.sourceEl=null,this.mirrorEl=null,this.sourceElRect=null,this.parentNode=document.body,this.zIndex=9999,this.revertDuration=0}return e.prototype.start=function(e,t,n){this.sourceEl=e,this.sourceElRect=this.sourceEl.getBoundingClientRect(),this.origScreenX=t-window.pageXOffset,this.origScreenY=n-window.pageYOffset,this.deltaX=0,this.deltaY=0,this.updateElPosition()},e.prototype.handleMove=function(e,t){this.deltaX=e-window.pageXOffset-this.origScreenX,this.deltaY=t-window.pageYOffset-this.origScreenY,this.updateElPosition()},e.prototype.setIsVisible=function(e){e?this.isVisible||(this.mirrorEl&&(this.mirrorEl.style.display=""),this.isVisible=e,this.updateElPosition()):this.isVisible&&(this.mirrorEl&&(this.mirrorEl.style.display="none"),this.isVisible=e)},e.prototype.stop=function(e,t){var n=this,r=function(){n.cleanup(),t()};e&&this.mirrorEl&&this.isVisible&&this.revertDuration&&(this.deltaX||this.deltaY)?this.doRevertAnimation(r,this.revertDuration):setTimeout(r,0)},e.prototype.doRevertAnimation=function(e,t){var n=this.mirrorEl,r=this.sourceEl.getBoundingClientRect();n.style.transition="top "+t+"ms,left "+t+"ms",j(n,{left:r.left,top:r.top}),K(n,(function(){n.style.transition="",e()}))},e.prototype.cleanup=function(){this.mirrorEl&&(W(this.mirrorEl),this.mirrorEl=null),this.sourceEl=null},e.prototype.updateElPosition=function(){this.sourceEl&&this.isVisible&&j(this.getMirrorEl(),{left:this.sourceElRect.left+this.deltaX,top:this.sourceElRect.top+this.deltaY})},e.prototype.getMirrorEl=function(){var e=this.sourceElRect,t=this.mirrorEl;return t||((t=this.mirrorEl=this.sourceEl.cloneNode(!0)).classList.add("fc-unselectable"),t.classList.add("fc-event-dragging"),j(t,{position:"fixed",zIndex:this.zIndex,visibility:"",boxSizing:"border-box",width:e.right-e.left,height:e.bottom-e.top,right:"auto",bottom:"auto",margin:0}),this.parentNode.appendChild(t)),t},e}(),Ea=function(e){function t(t,n){var r=e.call(this)||this;return r.handleScroll=function(){r.scrollTop=r.scrollController.getScrollTop(),r.scrollLeft=r.scrollController.getScrollLeft(),r.handleScrollChange()},r.scrollController=t,r.doesListening=n,r.scrollTop=r.origScrollTop=t.getScrollTop(),r.scrollLeft=r.origScrollLeft=t.getScrollLeft(),r.scrollWidth=t.getScrollWidth(),r.scrollHeight=t.getScrollHeight(),r.clientWidth=t.getClientWidth(),r.clientHeight=t.getClientHeight(),r.clientRect=r.computeClientRect(),r.doesListening&&r.getEventTarget().addEventListener("scroll",r.handleScroll),r}return n(t,e),t.prototype.destroy=function(){this.doesListening&&this.getEventTarget().removeEventListener("scroll",this.handleScroll)},t.prototype.getScrollTop=function(){return this.scrollTop},t.prototype.getScrollLeft=function(){return this.scrollLeft},t.prototype.setScrollTop=function(e){this.scrollController.setScrollTop(e),this.doesListening||(this.scrollTop=Math.max(Math.min(e,this.getMaxScrollTop()),0),this.handleScrollChange())},t.prototype.setScrollLeft=function(e){this.scrollController.setScrollLeft(e),this.doesListening||(this.scrollLeft=Math.max(Math.min(e,this.getMaxScrollLeft()),0),this.handleScrollChange())},t.prototype.getClientWidth=function(){return this.clientWidth},t.prototype.getClientHeight=function(){return this.clientHeight},t.prototype.getScrollWidth=function(){return this.scrollWidth},t.prototype.getScrollHeight=function(){return this.scrollHeight},t.prototype.handleScrollChange=function(){},t}(xr),Sa=function(e){function t(t,n){return e.call(this,new _r(t),n)||this}return n(t,e),t.prototype.getEventTarget=function(){return this.scrollController.el},t.prototype.computeClientRect=function(){return Cr(this.scrollController.el)},t}(Ea),Da=function(e){function t(t){return e.call(this,new Ir,t)||this}return n(t,e),t.prototype.getEventTarget=function(){return window},t.prototype.computeClientRect=function(){return{left:this.scrollLeft,right:this.scrollLeft+this.clientWidth,top:this.scrollTop,bottom:this.scrollTop+this.clientHeight}},t.prototype.handleScrollChange=function(){this.clientRect=this.computeClientRect()},t}(Ea),ba="function"==typeof performance?performance.now:Date.now,Ca=function(){function e(){var e=this;this.isEnabled=!0,this.scrollQuery=[window,".fc-scroller"],this.edgeThreshold=50,this.maxVelocity=300,this.pointerScreenX=null,this.pointerScreenY=null,this.isAnimating=!1,this.scrollCaches=null,this.everMovedUp=!1,this.everMovedDown=!1,this.everMovedLeft=!1,this.everMovedRight=!1,this.animate=function(){if(e.isAnimating){var t=e.computeBestEdge(e.pointerScreenX+window.pageXOffset,e.pointerScreenY+window.pageYOffset);if(t){var n=ba();e.handleSide(t,(n-e.msSinceRequest)/1e3),e.requestAnimation(n)}else e.isAnimating=!1}}}return e.prototype.start=function(e,t){this.isEnabled&&(this.scrollCaches=this.buildCaches(),this.pointerScreenX=null,this.pointerScreenY=null,this.everMovedUp=!1,this.everMovedDown=!1,this.everMovedLeft=!1,this.everMovedRight=!1,this.handleMove(e,t))},e.prototype.handleMove=function(e,t){if(this.isEnabled){var n=e-window.pageXOffset,r=t-window.pageYOffset,o=null===this.pointerScreenY?0:r-this.pointerScreenY,i=null===this.pointerScreenX?0:n-this.pointerScreenX;o<0?this.everMovedUp=!0:o>0&&(this.everMovedDown=!0),i<0?this.everMovedLeft=!0:i>0&&(this.everMovedRight=!0),this.pointerScreenX=n,this.pointerScreenY=r,this.isAnimating||(this.isAnimating=!0,this.requestAnimation(ba()))}},e.prototype.stop=function(){if(this.isEnabled){this.isAnimating=!1;for(var e=0,t=this.scrollCaches;e<t.length;e++){t[e].destroy()}this.scrollCaches=null}},e.prototype.requestAnimation=function(e){this.msSinceRequest=e,requestAnimationFrame(this.animate)},e.prototype.handleSide=function(e,t){var n=e.scrollCache,r=this.edgeThreshold,o=r-e.distance,i=o*o/(r*r)*this.maxVelocity*t,a=1;switch(e.name){case"left":a=-1;case"right":n.setScrollLeft(n.getScrollLeft()+i*a);break;case"top":a=-1;case"bottom":n.setScrollTop(n.getScrollTop()+i*a)}},e.prototype.computeBestEdge=function(e,t){for(var n=this.edgeThreshold,r=null,o=0,i=this.scrollCaches;o<i.length;o++){var a=i[o],s=a.clientRect,l=e-s.left,u=s.right-e,c=t-s.top,d=s.bottom-t;l>=0&&u>=0&&c>=0&&d>=0&&(c<=n&&this.everMovedUp&&a.canScrollUp()&&(!r||r.distance>c)&&(r={scrollCache:a,name:"top",distance:c}),d<=n&&this.everMovedDown&&a.canScrollDown()&&(!r||r.distance>d)&&(r={scrollCache:a,name:"bottom",distance:d}),l<=n&&this.everMovedLeft&&a.canScrollLeft()&&(!r||r.distance>l)&&(r={scrollCache:a,name:"left",distance:l}),u<=n&&this.everMovedRight&&a.canScrollRight()&&(!r||r.distance>u)&&(r={scrollCache:a,name:"right",distance:u}))}return r},e.prototype.buildCaches=function(){return this.queryScrollEls().map((function(e){return e===window?new Da(!1):new Sa(e,!1)}))},e.prototype.queryScrollEls=function(){for(var e=[],t=0,n=this.scrollQuery;t<n.length;t++){var r=n[t];"object"==typeof r?e.push(r):e.push.apply(e,Array.prototype.slice.call(document.querySelectorAll(r)))}return e},e}(),wa=function(e){function t(t,n){var r=e.call(this,t)||this;r.delay=null,r.minDistance=0,r.touchScrollAllowed=!0,r.mirrorNeedsRevert=!1,r.isInteracting=!1,r.isDragging=!1,r.isDelayEnded=!1,r.isDistanceSurpassed=!1,r.delayTimeoutId=null,r.onPointerDown=function(e){r.isDragging||(r.isInteracting=!0,r.isDelayEnded=!1,r.isDistanceSurpassed=!1,te(document.body),re(document.body),e.isTouch||e.origEvent.preventDefault(),r.emitter.trigger("pointerdown",e),r.isInteracting&&!r.pointer.shouldIgnoreMove&&(r.mirror.setIsVisible(!1),r.mirror.start(e.subjectEl,e.pageX,e.pageY),r.startDelay(e),r.minDistance||r.handleDistanceSurpassed(e)))},r.onPointerMove=function(e){if(r.isInteracting){if(r.emitter.trigger("pointermove",e),!r.isDistanceSurpassed){var t=r.minDistance,n=e.deltaX,o=e.deltaY;n*n+o*o>=t*t&&r.handleDistanceSurpassed(e)}r.isDragging&&("scroll"!==e.origEvent.type&&(r.mirror.handleMove(e.pageX,e.pageY),r.autoScroller.handleMove(e.pageX,e.pageY)),r.emitter.trigger("dragmove",e))}},r.onPointerUp=function(e){r.isInteracting&&(r.isInteracting=!1,ne(document.body),oe(document.body),r.emitter.trigger("pointerup",e),r.isDragging&&(r.autoScroller.stop(),r.tryStopDrag(e)),r.delayTimeoutId&&(clearTimeout(r.delayTimeoutId),r.delayTimeoutId=null))};var o=r.pointer=new ga(t);return o.emitter.on("pointerdown",r.onPointerDown),o.emitter.on("pointermove",r.onPointerMove),o.emitter.on("pointerup",r.onPointerUp),n&&(o.selector=n),r.mirror=new ya,r.autoScroller=new Ca,r}return n(t,e),t.prototype.destroy=function(){this.pointer.destroy(),this.onPointerUp({})},t.prototype.startDelay=function(e){var t=this;"number"==typeof this.delay?this.delayTimeoutId=setTimeout((function(){t.delayTimeoutId=null,t.handleDelayEnd(e)}),this.delay):this.handleDelayEnd(e)},t.prototype.handleDelayEnd=function(e){this.isDelayEnded=!0,this.tryStartDrag(e)},t.prototype.handleDistanceSurpassed=function(e){this.isDistanceSurpassed=!0,this.tryStartDrag(e)},t.prototype.tryStartDrag=function(e){this.isDelayEnded&&this.isDistanceSurpassed&&(this.pointer.wasTouchScroll&&!this.touchScrollAllowed||(this.isDragging=!0,this.mirrorNeedsRevert=!1,this.autoScroller.start(e.pageX,e.pageY),this.emitter.trigger("dragstart",e),!1===this.touchScrollAllowed&&this.pointer.cancelTouchScroll()))},t.prototype.tryStopDrag=function(e){this.mirror.stop(this.mirrorNeedsRevert,this.stopDrag.bind(this,e))},t.prototype.stopDrag=function(e){this.isDragging=!1,this.emitter.trigger("dragend",e)},t.prototype.setIgnoreMove=function(e){this.pointer.shouldIgnoreMove=e},t.prototype.setMirrorIsVisible=function(e){this.mirror.setIsVisible(e)},t.prototype.setMirrorNeedsRevert=function(e){this.mirrorNeedsRevert=e},t.prototype.setAutoScrollEnabled=function(e){this.autoScroller.isEnabled=e},t}(ci),Ra=function(){function e(e){this.origRect=wr(e),this.scrollCaches=Rr(e).map((function(e){return new Sa(e,!0)}))}return e.prototype.destroy=function(){for(var e=0,t=this.scrollCaches;e<t.length;e++){t[e].destroy()}},e.prototype.computeLeft=function(){for(var e=this.origRect.left,t=0,n=this.scrollCaches;t<n.length;t++){var r=n[t];e+=r.origScrollLeft-r.getScrollLeft()}return e},e.prototype.computeTop=function(){for(var e=this.origRect.top,t=0,n=this.scrollCaches;t<n.length;t++){var r=n[t];e+=r.origScrollTop-r.getScrollTop()}return e},e.prototype.isWithinClipping=function(e,t){for(var n,r,o={left:e,top:t},i=0,a=this.scrollCaches;i<a.length;i++){var s=a[i];if(n=s.getEventTarget(),r=void 0,"HTML"!==(r=n.tagName)&&"BODY"!==r&&!ir(o,s.clientRect))return!1}return!0},e}();var Ta=function(){function e(e,t){var n=this;this.useSubjectCenter=!1,this.requireInitial=!0,this.initialHit=null,this.movingHit=null,this.finalHit=null,this.handlePointerDown=function(e){var t=n.dragging;n.initialHit=null,n.movingHit=null,n.finalHit=null,n.prepareHits(),n.processFirstCoord(e),n.initialHit||!n.requireInitial?(t.setIgnoreMove(!1),n.emitter.trigger("pointerdown",e)):t.setIgnoreMove(!0)},this.handleDragStart=function(e){n.emitter.trigger("dragstart",e),n.handleMove(e,!0)},this.handleDragMove=function(e){n.emitter.trigger("dragmove",e),n.handleMove(e)},this.handlePointerUp=function(e){n.releaseHits(),n.emitter.trigger("pointerup",e)},this.handleDragEnd=function(e){n.movingHit&&n.emitter.trigger("hitupdate",null,!0,e),n.finalHit=n.movingHit,n.movingHit=null,n.emitter.trigger("dragend",e)},this.droppableStore=t,e.emitter.on("pointerdown",this.handlePointerDown),e.emitter.on("dragstart",this.handleDragStart),e.emitter.on("dragmove",this.handleDragMove),e.emitter.on("pointerup",this.handlePointerUp),e.emitter.on("dragend",this.handleDragEnd),this.dragging=e,this.emitter=new kr}return e.prototype.processFirstCoord=function(e){var t,n={left:e.pageX,top:e.pageY},r=n,o=e.subjectEl;o!==document&&(r=sr(r,t=wr(o)));var i=this.initialHit=this.queryHitForOffset(r.left,r.top);if(i){if(this.useSubjectCenter&&t){var a=ar(t,i.rect);a&&(r=lr(a))}this.coordAdjust=ur(r,n)}else this.coordAdjust={left:0,top:0}},e.prototype.handleMove=function(e,t){var n=this.queryHitForOffset(e.pageX+this.coordAdjust.left,e.pageY+this.coordAdjust.top);!t&&ka(this.movingHit,n)||(this.movingHit=n,this.emitter.trigger("hitupdate",n,!1,e))},e.prototype.prepareHits=function(){this.offsetTrackers=Oe(this.droppableStore,(function(e){return e.component.prepareHits(),new Ra(e.el)}))},e.prototype.releaseHits=function(){var e=this.offsetTrackers;for(var t in e)e[t].destroy();this.offsetTrackers={}},e.prototype.queryHitForOffset=function(e,t){var n=this.droppableStore,r=this.offsetTrackers,o=null;for(var i in n){var a=n[i].component,s=r[i];if(s&&s.isWithinClipping(e,t)){var l=s.computeLeft(),u=s.computeTop(),c=e-l,d=t-u,p=s.origRect,f=p.right-p.left,h=p.bottom-p.top;if(c>=0&&c<f&&d>=0&&d<h){var v=a.queryHit(c,d,f,h),g=a.context.getCurrentData().dateProfile;v&&an(g.activeRange,v.dateSpan.range)&&(!o||v.layer>o.layer)&&(v.rect.left+=l,v.rect.right+=l,v.rect.top+=u,v.rect.bottom+=u,o=v)}}}return o},e}();function ka(e,t){return!e&&!t||Boolean(e)===Boolean(t)&&Rn(e.dateSpan,t.dateSpan)}function Ma(e,t){for(var n,o,i={},a=0,s=t.pluginHooks.datePointTransforms;a<s.length;a++){var l=s[a];r(i,l(e,t))}return r(i,(n=e,{date:(o=t.dateEnv).toDate(n.range.start),dateStr:o.formatIso(n.range.start,{omitTime:n.allDay}),allDay:n.allDay})),i}var xa=function(e){function t(t){var n=e.call(this,t)||this;n.handlePointerDown=function(e){var t=n.dragging,r=e.origEvent.target;t.setIgnoreMove(!n.component.isValidDateDownEl(r))},n.handleDragEnd=function(e){var t=n.component;if(!n.dragging.pointer.wasTouchScroll){var o=n.hitDragging,i=o.initialHit,a=o.finalHit;if(i&&a&&ka(i,a)){var s=t.context,l=r(r({},Ma(i.dateSpan,s)),{dayEl:i.dayEl,jsEvent:e.origEvent,view:s.viewApi||s.calendarApi.view});s.emitter.trigger("dateClick",l)}}},n.dragging=new wa(t.el),n.dragging.autoScroller.isEnabled=!1;var o=n.hitDragging=new Ta(n.dragging,li(t));return o.emitter.on("pointerdown",n.handlePointerDown),o.emitter.on("dragend",n.handleDragEnd),n}return n(t,e),t.prototype.destroy=function(){this.dragging.destroy()},t}(ai),_a=function(e){function t(t){var n=e.call(this,t)||this;n.dragSelection=null,n.handlePointerDown=function(e){var t=n,r=t.component,o=t.dragging,i=r.context.options.selectable&&r.isValidDateDownEl(e.origEvent.target);o.setIgnoreMove(!i),o.delay=e.isTouch?function(e){var t=e.context.options,n=t.selectLongPressDelay;null==n&&(n=t.longPressDelay);return n}(r):null},n.handleDragStart=function(e){n.component.context.calendarApi.unselect(e)},n.handleHitUpdate=function(e,t){var o=n.component.context,i=null,a=!1;e&&((i=function(e,t,n){var o=e.dateSpan,i=t.dateSpan,a=[o.range.start,o.range.end,i.range.start,i.range.end];a.sort(ce);for(var s={},l=0,u=n;l<u.length;l++){var c=(0,u[l])(e,t);if(!1===c)return null;c&&r(s,c)}return s.range={start:a[0],end:a[3]},s.allDay=o.allDay,s}(n.hitDragging.initialHit,e,o.pluginHooks.dateSelectionTransformers))&&n.component.isDateSelectionValid(i)||(a=!0,i=null)),i?o.dispatch({type:"SELECT_DATES",selection:i}):t||o.dispatch({type:"UNSELECT_DATES"}),a?Q():ee(),t||(n.dragSelection=i)},n.handlePointerUp=function(e){n.dragSelection&&(xn(n.dragSelection,e,n.component.context),n.dragSelection=null)};var o=t.component.context.options,i=n.dragging=new wa(t.el);i.touchScrollAllowed=!1,i.minDistance=o.selectMinDistance||0,i.autoScroller.isEnabled=o.dragScroll;var a=n.hitDragging=new Ta(n.dragging,li(t));return a.emitter.on("pointerdown",n.handlePointerDown),a.emitter.on("dragstart",n.handleDragStart),a.emitter.on("hitupdate",n.handleHitUpdate),a.emitter.on("pointerup",n.handlePointerUp),n}return n(t,e),t.prototype.destroy=function(){this.dragging.destroy()},t}(ai);var Ia=function(e){function t(n){var o=e.call(this,n)||this;o.subjectEl=null,o.subjectSeg=null,o.isDragging=!1,o.eventRange=null,o.relevantEvents=null,o.receivingContext=null,o.validMutation=null,o.mutatedRelevantEvents=null,o.handlePointerDown=function(e){var t=e.origEvent.target,n=o,r=n.component,i=n.dragging,a=i.mirror,s=r.context.options,l=r.context;o.subjectEl=e.subjectEl;var u=o.subjectSeg=dn(e.subjectEl),c=(o.eventRange=u.eventRange).instance.instanceId;o.relevantEvents=Nt(l.getCurrentData().eventStore,c),i.minDistance=e.isTouch?0:s.eventDragMinDistance,i.delay=e.isTouch&&c!==r.props.eventSelection?function(e){var t=e.context.options,n=t.eventLongPressDelay;null==n&&(n=t.longPressDelay);return n}(r):null,a.parentNode=V(t,".fc"),a.revertDuration=s.dragRevertDuration;var d=r.isValidSegDownEl(t)&&!V(t,".fc-event-resizer");i.setIgnoreMove(!d),o.isDragging=d&&e.subjectEl.classList.contains("fc-event-draggable")},o.handleDragStart=function(e){var t=o.component.context,n=o.eventRange,r=n.instance.instanceId;e.isTouch?r!==o.component.props.eventSelection&&t.dispatch({type:"SELECT_EVENT",eventInstanceId:r}):t.dispatch({type:"UNSELECT_EVENT"}),o.isDragging&&(t.calendarApi.unselect(e),t.emitter.trigger("eventDragStart",{el:o.subjectEl,event:new zn(t,n.def,n.instance),jsEvent:e.origEvent,view:t.viewApi}))},o.handleHitUpdate=function(e,t){if(o.isDragging){var n=o.relevantEvents,r=o.hitDragging.initialHit,i=o.component.context,a=null,s=null,l=null,u=!1,c={affectedEvents:n,mutatedEvents:{defs:{},instances:{}},isEvent:!0};if(e){var d=e.component,p=(a=d.context).options;i===a||p.editable&&p.droppable?(s=function(e,t,n){var r=e.dateSpan,o=t.dateSpan,i=r.range.start,a=o.range.start,s={};r.allDay!==o.allDay&&(s.allDay=o.allDay,s.hasEnd=t.component.context.options.allDayMaintainDuration,o.allDay&&(i=be(i)));var l=Qt(i,a,e.component.context.dateEnv,e.component===t.component?e.component.largeUnit:null);l.milliseconds&&(s.allDay=!1);for(var u={datesDelta:l,standardProps:s},c=0,d=n;c<d.length;c++){(0,d[c])(u,e,t)}return u}(r,e,a.getCurrentData().pluginHooks.eventDragMutationMassagers))&&(l=Pn(n,a.getCurrentData().eventUiBases,s,a),c.mutatedEvents=l,d.isInteractionValid(c)||(u=!0,s=null,l=null,c.mutatedEvents={defs:{},instances:{}})):a=null}o.displayDrag(a,c),u?Q():ee(),t||(i===a&&ka(r,e)&&(s=null),o.dragging.setMirrorNeedsRevert(!s),o.dragging.setMirrorIsVisible(!e||!document.querySelector(".fc-event-mirror")),o.receivingContext=a,o.validMutation=s,o.mutatedRelevantEvents=l)}},o.handlePointerUp=function(){o.isDragging||o.cleanup()},o.handleDragEnd=function(e){if(o.isDragging){var t=o.component.context,n=t.viewApi,i=o,a=i.receivingContext,s=i.validMutation,l=o.eventRange.def,u=o.eventRange.instance,c=new zn(t,l,u),d=o.relevantEvents,p=o.mutatedRelevantEvents,f=o.hitDragging.finalHit;if(o.clearDrag(),t.emitter.trigger("eventDragStop",{el:o.subjectEl,event:c,jsEvent:e.origEvent,view:n}),s){if(a===t){var h=new zn(t,p.defs[l.defId],u?p.instances[u.instanceId]:null);t.dispatch({type:"MERGE_EVENTS",eventStore:p});for(var v={oldEvent:c,event:h,relatedEvents:Bn(p,t,u),revert:function(){t.dispatch({type:"MERGE_EVENTS",eventStore:d})}},g={},m=0,y=t.getCurrentData().pluginHooks.eventDropTransformers;m<y.length;m++){var E=y[m];r(g,E(s,t))}t.emitter.trigger("eventDrop",r(r(r({},v),g),{el:e.subjectEl,delta:s.datesDelta,jsEvent:e.origEvent,view:n})),t.emitter.trigger("eventChange",v)}else if(a){var S={event:c,relatedEvents:Bn(d,t,u),revert:function(){t.dispatch({type:"MERGE_EVENTS",eventStore:d})}};t.emitter.trigger("eventLeave",r(r({},S),{draggedEl:e.subjectEl,view:n})),t.dispatch({type:"REMOVE_EVENTS",eventStore:d}),t.emitter.trigger("eventRemove",S);var D=p.defs[l.defId],b=p.instances[u.instanceId],C=new zn(a,D,b);a.dispatch({type:"MERGE_EVENTS",eventStore:p});var w={event:C,relatedEvents:Bn(p,a,b),revert:function(){a.dispatch({type:"REMOVE_EVENTS",eventStore:p})}};a.emitter.trigger("eventAdd",w),e.isTouch&&a.dispatch({type:"SELECT_EVENT",eventInstanceId:u.instanceId}),a.emitter.trigger("drop",r(r({},Ma(f.dateSpan,a)),{draggedEl:e.subjectEl,jsEvent:e.origEvent,view:f.component.context.viewApi})),a.emitter.trigger("eventReceive",r(r({},w),{draggedEl:e.subjectEl,view:f.component.context.viewApi}))}}else t.emitter.trigger("_noEventDrop")}o.cleanup()};var i=o.component.context.options,a=o.dragging=new wa(n.el);a.pointer.selector=t.SELECTOR,a.touchScrollAllowed=!1,a.autoScroller.isEnabled=i.dragScroll;var s=o.hitDragging=new Ta(o.dragging,ui);return s.useSubjectCenter=n.useEventCenter,s.emitter.on("pointerdown",o.handlePointerDown),s.emitter.on("dragstart",o.handleDragStart),s.emitter.on("hitupdate",o.handleHitUpdate),s.emitter.on("pointerup",o.handlePointerUp),s.emitter.on("dragend",o.handleDragEnd),o}return n(t,e),t.prototype.destroy=function(){this.dragging.destroy()},t.prototype.displayDrag=function(e,t){var n=this.component.context,r=this.receivingContext;r&&r!==e&&(r===n?r.dispatch({type:"SET_EVENT_DRAG",state:{affectedEvents:t.affectedEvents,mutatedEvents:{defs:{},instances:{}},isEvent:!0}}):r.dispatch({type:"UNSET_EVENT_DRAG"})),e&&e.dispatch({type:"SET_EVENT_DRAG",state:t})},t.prototype.clearDrag=function(){var e=this.component.context,t=this.receivingContext;t&&t.dispatch({type:"UNSET_EVENT_DRAG"}),e!==t&&e.dispatch({type:"UNSET_EVENT_DRAG"})},t.prototype.cleanup=function(){this.subjectSeg=null,this.isDragging=!1,this.eventRange=null,this.relevantEvents=null,this.receivingContext=null,this.validMutation=null,this.mutatedRelevantEvents=null},t.SELECTOR=".fc-event-draggable, .fc-event-resizable",t}(ai);var Pa=function(e){function t(t){var n=e.call(this,t)||this;n.draggingSegEl=null,n.draggingSeg=null,n.eventRange=null,n.relevantEvents=null,n.validMutation=null,n.mutatedRelevantEvents=null,n.handlePointerDown=function(e){var t=n.component,r=dn(n.querySegEl(e)),o=n.eventRange=r.eventRange;n.dragging.minDistance=t.context.options.eventDragMinDistance,n.dragging.setIgnoreMove(!n.component.isValidSegDownEl(e.origEvent.target)||e.isTouch&&n.component.props.eventSelection!==o.instance.instanceId)},n.handleDragStart=function(e){var t=n.component.context,r=n.eventRange;n.relevantEvents=Nt(t.getCurrentData().eventStore,n.eventRange.instance.instanceId);var o=n.querySegEl(e);n.draggingSegEl=o,n.draggingSeg=dn(o),t.calendarApi.unselect(),t.emitter.trigger("eventResizeStart",{el:o,event:new zn(t,r.def,r.instance),jsEvent:e.origEvent,view:t.viewApi})},n.handleHitUpdate=function(e,t,o){var i=n.component.context,a=n.relevantEvents,s=n.hitDragging.initialHit,l=n.eventRange.instance,u=null,c=null,d=!1,p={affectedEvents:a,mutatedEvents:{defs:{},instances:{}},isEvent:!0};e&&(u=function(e,t,n,o,i){for(var a=e.component.context.dateEnv,s=e.dateSpan.range.start,l=t.dateSpan.range.start,u=Qt(s,l,a,e.component.largeUnit),c={},d=0,p=i;d<p.length;d++){var f=(0,p[d])(e,t);if(!1===f)return null;f&&r(c,f)}if(n){if(a.add(o.start,u)<o.end)return c.startDelta=u,c}else if(a.add(o.end,u)>o.start)return c.endDelta=u,c;return null}(s,e,o.subjectEl.classList.contains("fc-event-resizer-start"),l.range,i.pluginHooks.eventResizeJoinTransforms)),u&&(c=Pn(a,i.getCurrentData().eventUiBases,u,i),p.mutatedEvents=c,n.component.isInteractionValid(p)||(d=!0,u=null,c=null,p.mutatedEvents=null)),c?i.dispatch({type:"SET_EVENT_RESIZE",state:p}):i.dispatch({type:"UNSET_EVENT_RESIZE"}),d?Q():ee(),t||(u&&ka(s,e)&&(u=null),n.validMutation=u,n.mutatedRelevantEvents=c)},n.handleDragEnd=function(e){var t=n.component.context,o=n.eventRange.def,i=n.eventRange.instance,a=new zn(t,o,i),s=n.relevantEvents,l=n.mutatedRelevantEvents;if(t.emitter.trigger("eventResizeStop",{el:n.draggingSegEl,event:a,jsEvent:e.origEvent,view:t.viewApi}),n.validMutation){var u=new zn(t,l.defs[o.defId],i?l.instances[i.instanceId]:null);t.dispatch({type:"MERGE_EVENTS",eventStore:l});var c={oldEvent:a,event:u,relatedEvents:Bn(l,t,i),revert:function(){t.dispatch({type:"MERGE_EVENTS",eventStore:s})}};t.emitter.trigger("eventResize",r(r({},c),{el:n.draggingSegEl,startDelta:n.validMutation.startDelta||Ye(0),endDelta:n.validMutation.endDelta||Ye(0),jsEvent:e.origEvent,view:t.viewApi})),t.emitter.trigger("eventChange",c)}else t.emitter.trigger("_noEventResize");n.draggingSeg=null,n.relevantEvents=null,n.validMutation=null};var o=t.component,i=n.dragging=new wa(t.el);i.pointer.selector=".fc-event-resizer",i.touchScrollAllowed=!1,i.autoScroller.isEnabled=o.context.options.dragScroll;var a=n.hitDragging=new Ta(n.dragging,li(t));return a.emitter.on("pointerdown",n.handlePointerDown),a.emitter.on("dragstart",n.handleDragStart),a.emitter.on("hitupdate",n.handleHitUpdate),a.emitter.on("dragend",n.handleDragEnd),n}return n(t,e),t.prototype.destroy=function(){this.dragging.destroy()},t.prototype.querySegEl=function(e){return V(e.subjectEl,".fc-event")},t}(ai);var Na=function(){function e(e){var t=this;this.context=e,this.isRecentPointerDateSelect=!1,this.matchesCancel=!1,this.matchesEvent=!1,this.onSelect=function(e){e.jsEvent&&(t.isRecentPointerDateSelect=!0)},this.onDocumentPointerDown=function(e){var n=t.context.options.unselectCancel,r=e.origEvent.target;t.matchesCancel=!!V(r,n),t.matchesEvent=!!V(r,Ia.SELECTOR)},this.onDocumentPointerUp=function(e){var n=t.context,r=t.documentPointer,o=n.getCurrentData();if(!r.wasTouchScroll){if(o.dateSelection&&!t.isRecentPointerDateSelect){var i=n.options.unselectAuto;!i||i&&t.matchesCancel||n.calendarApi.unselect(e)}o.eventSelection&&!t.matchesEvent&&n.dispatch({type:"UNSELECT_EVENT"})}t.isRecentPointerDateSelect=!1};var n=this.documentPointer=new ga(document);n.shouldIgnoreMove=!0,n.shouldWatchScroll=!1,n.emitter.on("pointerdown",this.onDocumentPointerDown),n.emitter.on("pointerup",this.onDocumentPointerUp),e.emitter.on("select",this.onSelect)}return e.prototype.destroy=function(){this.context.emitter.off("select",this.onSelect),this.documentPointer.destroy()},e}(),Ha={dateClick:_t,eventDragStart:_t,eventDragStop:_t,eventDrop:_t,eventResizeStart:_t,eventResizeStop:_t,eventResize:_t,drop:_t,eventReceive:_t,eventLeave:_t},Oa=function(){function e(e,t){var n=this;this.receivingContext=null,this.droppableEvent=null,this.suppliedDragMeta=null,this.dragMeta=null,this.handleDragStart=function(e){n.dragMeta=n.buildDragMeta(e.subjectEl)},this.handleHitUpdate=function(e,t,o){var i=n.hitDragging.dragging,a=null,s=null,l=!1,u={affectedEvents:{defs:{},instances:{}},mutatedEvents:{defs:{},instances:{}},isEvent:n.dragMeta.create};e&&(a=e.component.context,n.canDropElOnCalendar(o.subjectEl,a)&&(s=function(e,t,n){for(var o=r({},t.leftoverProps),i=0,a=n.pluginHooks.externalDefTransforms;i<a.length;i++){var s=a[i];r(o,s(e,t))}var l=Yt(o,n),u=l.refined,c=l.extra,d=Xt(u,c,t.sourceId,e.allDay,n.options.forceEventDuration||Boolean(t.duration),n),p=e.range.start;e.allDay&&t.startTime&&(p=n.dateEnv.add(p,t.startTime));var f=t.duration?n.dateEnv.add(p,t.duration):In(e.allDay,p,n),h=Ie(d.defId,{start:p,end:f});return{def:d,instance:h}}(e.dateSpan,n.dragMeta,a),u.mutatedEvents=Pt(s),(l=!Jr(u,a))&&(u.mutatedEvents={defs:{},instances:{}},s=null))),n.displayDrag(a,u),i.setMirrorIsVisible(t||!s||!document.querySelector(".fc-event-mirror")),l?Q():ee(),t||(i.setMirrorNeedsRevert(!s),n.receivingContext=a,n.droppableEvent=s)},this.handleDragEnd=function(e){var t=n,o=t.receivingContext,i=t.droppableEvent;if(n.clearDrag(),o&&i){var a=n.hitDragging.finalHit,s=a.component.context.viewApi,l=n.dragMeta;if(o.emitter.trigger("drop",r(r({},Ma(a.dateSpan,o)),{draggedEl:e.subjectEl,jsEvent:e.origEvent,view:s})),l.create){var u=Pt(i);o.dispatch({type:"MERGE_EVENTS",eventStore:u}),e.isTouch&&o.dispatch({type:"SELECT_EVENT",eventInstanceId:i.instance.instanceId}),o.emitter.trigger("eventReceive",{event:new zn(o,i.def,i.instance),relatedEvents:[],revert:function(){o.dispatch({type:"REMOVE_EVENTS",eventStore:u})},draggedEl:e.subjectEl,view:s})}}n.receivingContext=null,n.droppableEvent=null};var o=this.hitDragging=new Ta(e,ui);o.requireInitial=!1,o.emitter.on("dragstart",this.handleDragStart),o.emitter.on("hitupdate",this.handleHitUpdate),o.emitter.on("dragend",this.handleDragEnd),this.suppliedDragMeta=t}return e.prototype.buildDragMeta=function(e){return"object"==typeof this.suppliedDragMeta?fi(this.suppliedDragMeta):"function"==typeof this.suppliedDragMeta?fi(this.suppliedDragMeta(e)):fi((t=function(e,t){var n=di.dataAttrPrefix,r=(n?n+"-":"")+t;return e.getAttribute("data-"+r)||""}(e,"event"))?JSON.parse(t):{create:!1});var t},e.prototype.displayDrag=function(e,t){var n=this.receivingContext;n&&n!==e&&n.dispatch({type:"UNSET_EVENT_DRAG"}),e&&e.dispatch({type:"SET_EVENT_DRAG",state:t})},e.prototype.clearDrag=function(){this.receivingContext&&this.receivingContext.dispatch({type:"UNSET_EVENT_DRAG"})},e.prototype.canDropElOnCalendar=function(e,t){var n=t.options.dropAccept;return"function"==typeof n?n.call(t.calendarApi,e):"string"!=typeof n||!n||Boolean(z(e,n))},e}();di.dataAttrPrefix="";var Aa=function(){function e(e,t){var n=this;void 0===t&&(t={}),this.handlePointerDown=function(e){var t=n.dragging,r=n.settings,o=r.minDistance,i=r.longPressDelay;t.minDistance=null!=o?o:e.isTouch?0:bt.eventDragMinDistance,t.delay=e.isTouch?null!=i?i:bt.longPressDelay:0},this.handleDragStart=function(e){e.isTouch&&n.dragging.delay&&e.subjectEl.classList.contains("fc-event")&&n.dragging.mirror.getMirrorEl().classList.add("fc-event-selected")},this.settings=t;var r=this.dragging=new wa(e);r.touchScrollAllowed=!1,null!=t.itemSelector&&(r.pointer.selector=t.itemSelector),null!=t.appendTo&&(r.mirror.parentNode=t.appendTo),r.emitter.on("pointerdown",this.handlePointerDown),r.emitter.on("dragstart",this.handleDragStart),new Oa(r,t.eventData)}return e.prototype.destroy=function(){this.dragging.destroy()},e}(),Ua=function(e){function t(t){var n=e.call(this,t)||this;n.shouldIgnoreMove=!1,n.mirrorSelector="",n.currentMirrorEl=null,n.handlePointerDown=function(e){n.emitter.trigger("pointerdown",e),n.shouldIgnoreMove||n.emitter.trigger("dragstart",e)},n.handlePointerMove=function(e){n.shouldIgnoreMove||n.emitter.trigger("dragmove",e)},n.handlePointerUp=function(e){n.emitter.trigger("pointerup",e),n.shouldIgnoreMove||n.emitter.trigger("dragend",e)};var r=n.pointer=new ga(t);return r.emitter.on("pointerdown",n.handlePointerDown),r.emitter.on("pointermove",n.handlePointerMove),r.emitter.on("pointerup",n.handlePointerUp),n}return n(t,e),t.prototype.destroy=function(){this.pointer.destroy()},t.prototype.setIgnoreMove=function(e){this.shouldIgnoreMove=e},t.prototype.setMirrorIsVisible=function(e){if(e)this.currentMirrorEl&&(this.currentMirrorEl.style.visibility="",this.currentMirrorEl=null);else{var t=this.mirrorSelector?document.querySelector(this.mirrorSelector):null;t&&(this.currentMirrorEl=t,t.style.visibility="hidden")}},t}(ci),La=function(){function e(e,t){var n=document;e===document||e instanceof Element?(n=e,t=t||{}):t=e||{};var r=this.dragging=new Ua(n);"string"==typeof t.itemSelector?r.pointer.selector=t.itemSelector:n===document&&(r.pointer.selector="[data-event]"),"string"==typeof t.mirrorSelector&&(r.mirrorSelector=t.mirrorSelector),new Oa(r,t.eventData)}return e.prototype.destroy=function(){this.dragging.destroy()},e}(),Wa=io({componentInteractions:[xa,_a,Ia,Pa],calendarInteractions:[Na],elementDraggingImpl:wa,listenerRefiners:Ha}),Va=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.headerElRef=Ar(),t}return n(t,e),t.prototype.renderSimpleLayout=function(e,t){var n=this.props,r=this.context,o=[],i=Ki(r.options);return e&&o.push({type:"header",key:"header",isSticky:i,chunk:{elRef:this.headerElRef,tableClassName:"fc-col-header",rowContent:e}}),o.push({type:"body",key:"body",liquid:!0,chunk:{content:t}}),Hr(yo,{viewSpec:r.viewSpec},(function(e,t){return Hr("div",{ref:e,className:["fc-daygrid"].concat(t).join(" ")},Hr($i,{liquid:!n.isHeightAuto&&!n.forPrint,cols:[],sections:o}))}))},t.prototype.renderHScrollLayout=function(e,t,n,r){var o=this.context.pluginHooks.scrollGridImpl;if(!o)throw new Error("No ScrollGrid implementation");var i=this.props,a=this.context,s=!i.forPrint&&Ki(a.options),l=!i.forPrint&&Ji(a.options),u=[];return e&&u.push({type:"header",key:"header",isSticky:s,chunks:[{key:"main",elRef:this.headerElRef,tableClassName:"fc-col-header",rowContent:e}]}),u.push({type:"body",key:"body",liquid:!0,chunks:[{key:"main",content:t}]}),l&&u.push({type:"footer",key:"footer",isSticky:!0,chunks:[{key:"main",content:Xi}]}),Hr(yo,{viewSpec:a.viewSpec},(function(e,t){return Hr("div",{ref:e,className:["fc-daygrid"].concat(t).join(" ")},Hr(o,{liquid:!i.isHeightAuto&&!i.forPrint,colGroups:[{cols:[{span:n,minWidth:r}]}],sections:u}))}))},t}(oo);function za(e,t){for(var n=[],r=0;r<t;r++)n[r]=[];for(var o=0,i=e;o<i.length;o++){var a=i[o];n[a.row].push(a)}return n}function Fa(e,t){for(var n=[],r=0;r<t;r++)n[r]=[];for(var o=0,i=e;o<i.length;o++){var a=i[o];n[a.firstCol].push(a)}return n}function Ba(e,t){var n=[];if(e){for(a=0;a<t;a++)n[a]={affectedInstances:e.affectedInstances,isEvent:e.isEvent,segs:[]};for(var r=0,o=e.segs;r<o.length;r++){var i=o[r];n[i.row].segs.push(i)}}else for(var a=0;a<t;a++)n[a]=null;return n}var ja=St({week:"narrow"}),Ga=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleRootEl=function(e){t.rootEl=e,Yr(t.props.elRef,e)},t.handleMoreLinkClick=function(e){var n=t.props;if(n.onMoreClick){var r=n.segsByEachCol,o=r.filter((function(e){return n.segIsHidden[e.eventRange.instance.instanceId]}));n.onMoreClick({date:n.date,allSegs:r,hiddenSegs:o,moreCnt:n.moreCnt,dayEl:t.rootEl,ev:e})}},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.context,n=t.options,o=t.viewApi,i=this.props,a=i.date,s=i.dateProfile,l={num:i.moreCnt,text:i.buildMoreLinkText(i.moreCnt),view:o},u=n.navLinks?{"data-navlink":gr(a,"week"),tabIndex:0}:{};return Hr(oa,{date:a,dateProfile:s,todayRange:i.todayRange,showDayNumber:i.showDayNumber,extraHookProps:i.extraHookProps,elRef:this.handleRootEl},(function(t,o,c,d){return Hr("td",r({ref:t,className:["fc-daygrid-day"].concat(o,i.extraClassNames||[]).join(" ")},c,i.extraDataAttrs),Hr("div",{className:"fc-daygrid-day-frame fc-scrollgrid-sync-inner",ref:i.innerElRef},i.showWeekNumber&&Hr(ca,{date:a,defaultFormat:ja},(function(e,t,n,o){return Hr("a",r({ref:e,className:["fc-daygrid-week-number"].concat(t).join(" ")},u),o)})),!d&&Hr(Za,{date:a,dateProfile:s,showDayNumber:i.showDayNumber,forceDayTop:i.forceDayTop,todayRange:i.todayRange,extraHookProps:i.extraHookProps}),Hr("div",{className:"fc-daygrid-day-events",ref:i.fgContentElRef,style:{paddingBottom:i.fgPaddingBottom}},i.fgContent,Boolean(i.moreCnt)&&Hr("div",{className:"fc-daygrid-day-bottom",style:{marginTop:i.moreMarginTop}},Hr(uo,{hookProps:l,classNames:n.moreLinkClassNames,content:n.moreLinkContent,defaultContent:Ya,didMount:n.moreLinkDidMount,willUnmount:n.moreLinkWillUnmount},(function(t,n,r,o){return Hr("a",{onClick:e.handleMoreLinkClick,ref:t,className:["fc-daygrid-more-link"].concat(n).join(" ")},o)})))),Hr("div",{className:"fc-daygrid-day-bg"},i.bgContent)))}))},t}(oo);function qa(e){return e.dayNumberText}function Ya(e){return e.text}var Za=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context.options.navLinks?{"data-navlink":gr(e.date),tabIndex:0}:{};return Hr(ia,{date:e.date,dateProfile:e.dateProfile,todayRange:e.todayRange,showDayNumber:e.showDayNumber,extraHookProps:e.extraHookProps,defaultContent:qa},(function(n,o){return(o||e.forceDayTop)&&Hr("div",{className:"fc-daygrid-day-top",ref:n},Hr("a",r({className:"fc-daygrid-day-number"},t),o||Hr(Ur,null," ")))}))},t}(jr),Xa=St({hour:"numeric",minute:"2-digit",omitZeroMinute:!0,meridiem:"narrow"});function Ka(e){var t=e.eventRange.ui.display;return"list-item"===t||"auto"===t&&!e.eventRange.def.allDay&&e.firstCol===e.lastCol&&e.isStart&&e.isEnd}var Ja=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options.eventTimeFormat||Xa,o=En(e.seg,n,t,!0,e.defaultDisplayEventEnd);return Hr(Qi,{seg:e.seg,timeText:o,defaultContent:$a,isDragging:e.isDragging,isResizing:!1,isDateSelecting:!1,isSelected:e.isSelected,isPast:e.isPast,isFuture:e.isFuture,isToday:e.isToday},(function(t,n,o,i){return Hr("a",r({className:["fc-daygrid-event","fc-daygrid-dot-event"].concat(n).join(" "),ref:t},(a=e.seg,(s=a.eventRange.def.url)?{href:s}:{})),i);var a,s}))},t}(jr);function $a(e){return Hr(Ur,null,Hr("div",{className:"fc-daygrid-event-dot",style:{borderColor:e.borderColor||e.backgroundColor}}),e.timeText&&Hr("div",{className:"fc-event-time"},e.timeText),Hr("div",{className:"fc-event-title"},e.event.title||Hr(Ur,null," ")))}var Qa=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props;return Hr(ea,r({},e,{extraClassNames:["fc-daygrid-event","fc-daygrid-block-event","fc-h-event"],defaultTimeFormat:Xa,defaultDisplayEventEnd:e.defaultDisplayEventEnd,disableResizing:!e.seg.eventRange.def.allDay}))},t}(jr);function es(e,t,n,o,i,a,s,l){for(var u=[],c=[],d={},p={},f={},h={},v={},g=0;g<s;g++)u.push([]),c.push(0);for(var m=0,y=t=hn(t,l);m<y.length;m++){T(w=y[m],i[w.eventRange.instance.instanceId+":"+w.firstCol]||0)}!0===n||!0===o?function(e,t,n,r){ns(e,t,n,!0,(function(e){return e.bottom<=r}))}(c,d,u,a):"number"==typeof n?function(e,t,n,r){ns(e,t,n,!1,(function(e,t){return t<r}))}(c,d,u,n):"number"==typeof o&&function(e,t,n,r){ns(e,t,n,!0,(function(e,t){return t<r}))}(c,d,u,o);for(var E=0;E<s;E++){for(var S=0,D=0,b=0,C=u[E];b<C.length;b++){var w,R=C[b];d[(w=R.seg).eventRange.instance.instanceId]||(p[w.eventRange.instance.instanceId]=R.top,w.firstCol===w.lastCol&&w.isStart&&w.isEnd?(f[w.eventRange.instance.instanceId]=R.top-S,D=0,S=R.bottom):D=R.bottom-S)}D&&(c[E]?h[E]=D:v[E]=D)}function T(e,t){if(!k(e,t,0))for(var n=e.firstCol;n<=e.lastCol;n++)for(var r=0,o=u[n];r<o.length;r++){if(k(e,t,o[r].bottom))return}}function k(e,t,n){if(function(e,t,n){for(var r=e.firstCol;r<=e.lastCol;r++)for(var o=0,i=u[r];o<i.length;o++){var a=i[o];if(n<a.bottom&&n+t>a.top)return!1}return!0}(e,t,n)){for(var r=e.firstCol;r<=e.lastCol;r++){for(var o=u[r],i=0;i<o.length&&n>=o[i].top;)i++;o.splice(i,0,{seg:e,top:n,bottom:n+t})}return!0}return!1}for(var M in i)i[M]||(d[M.split(":")[0]]=!0);return{segsByFirstCol:u.map(ts),segsByEachCol:u.map((function(t,n){var o=function(e){for(var t=[],n=0,r=e;n<r.length;n++){var o=r[n];t.push(o.seg)}return t}(t);return o=function(e,t,n){for(var o=t,i=ve(o,1),a={start:o,end:i},s=[],l=0,u=e;l<u.length;l++){var c=u[l],d=c.eventRange,p=d.range,f=nn(p,a);f&&s.push(r(r({},c),{firstCol:n,lastCol:n,eventRange:{def:d.def,ui:r(r({},d.ui),{durationEditable:!1}),instance:d.instance,range:f},isStart:c.isStart&&f.start.valueOf()===p.start.valueOf(),isEnd:c.isEnd&&f.end.valueOf()===p.end.valueOf()}))}return s}(o,e[n].date,n)})),segIsHidden:d,segTops:p,segMarginTops:f,moreCnts:c,moreTops:h,paddingBottoms:v}}function ts(e,t){for(var n=[],r=0,o=e;r<o.length;r++){var i=o[r];i.seg.firstCol===t&&n.push(i.seg)}return n}function ns(e,t,n,r,o){for(var i=e.length,a={},s=[],l=0;l<i;l++)s.push([]);for(l=0;l<i;l++)for(var u=0,c=0,d=n[l];c<d.length;c++){var p=d[c];o(p,u)?f(p):h(p,u,r),p.top!==p.bottom&&u++}function f(e){var t=e.seg,n=t.eventRange.instance.instanceId;if(!a[n]){a[n]=!0;for(var r=t.firstCol;r<=t.lastCol;r++)s[r].push(e)}}function h(n,r,o){var i=n.seg,a=i.eventRange.instance.instanceId;if(!t[a]){t[a]=!0;for(var l=i.firstCol;l<=i.lastCol;l++){var u=++e[l];if(o&&1===u)for(var c=r-1;s[l].length>c;)h(s[l].pop(),s[l].length,!1)}}}}var rs=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.cellElRefs=new Li,t.frameElRefs=new Li,t.fgElRefs=new Li,t.segHarnessRefs=new Li,t.rootElRef=Ar(),t.state={framePositions:null,maxContentHeight:null,segHeights:{}},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=this.state,r=this.context,o=t.cells.length,i=Fa(t.businessHourSegs,o),a=Fa(t.bgEventSegs,o),s=Fa(this.getHighlightSegs(),o),l=Fa(this.getMirrorSegs(),o),u=es(t.cells,t.fgEventSegs,t.dayMaxEvents,t.dayMaxEventRows,n.segHeights,n.maxContentHeight,o,r.options.eventOrder),c=u.paddingBottoms,d=u.segsByFirstCol,p=u.segsByEachCol,f=u.segIsHidden,h=u.segTops,v=u.segMarginTops,g=u.moreCnts,m=u.moreTops,y=t.eventDrag&&t.eventDrag.affectedInstances||t.eventResize&&t.eventResize.affectedInstances||{};return Hr("tr",{ref:this.rootElRef},t.renderIntro&&t.renderIntro(),t.cells.map((function(n,r){var o=e.renderFgSegs(d[r],f,h,v,y,t.todayRange),u=e.renderFgSegs(l[r],{},h,{},{},t.todayRange,Boolean(t.eventDrag),Boolean(t.eventResize),!1);return Hr(Ga,{key:n.key,elRef:e.cellElRefs.createRef(n.key),innerElRef:e.frameElRefs.createRef(n.key),dateProfile:t.dateProfile,date:n.date,showDayNumber:t.showDayNumbers,showWeekNumber:t.showWeekNumbers&&0===r,forceDayTop:t.showWeekNumbers,todayRange:t.todayRange,extraHookProps:n.extraHookProps,extraDataAttrs:n.extraDataAttrs,extraClassNames:n.extraClassNames,moreCnt:g[r],buildMoreLinkText:t.buildMoreLinkText,onMoreClick:t.onMoreClick,segIsHidden:f,moreMarginTop:m[r],segsByEachCol:p[r],fgPaddingBottom:c[r],fgContentElRef:e.fgElRefs.createRef(n.key),fgContent:Hr(Ur,null,Hr(Ur,null,o),Hr(Ur,null,u)),bgContent:Hr(Ur,null,e.renderFillSegs(s[r],"highlight"),e.renderFillSegs(i[r],"non-business"),e.renderFillSegs(a[r],"bg-event"))})})))},t.prototype.componentDidMount=function(){this.updateSizing(!0)},t.prototype.componentDidUpdate=function(e,t){var n=this.props;this.updateSizing(!Le(e,n))},t.prototype.getHighlightSegs=function(){var e=this.props;return e.eventDrag&&e.eventDrag.segs.length?e.eventDrag.segs:e.eventResize&&e.eventResize.segs.length?e.eventResize.segs:e.dateSelectionSegs},t.prototype.getMirrorSegs=function(){var e=this.props;return e.eventResize&&e.eventResize.segs.length?e.eventResize.segs:[]},t.prototype.renderFgSegs=function(e,t,n,o,i,a,s,l,u){var c=this.context,d=this.props.eventSelection,p=this.state.framePositions,f=1===this.props.cells.length,h=[];if(p)for(var v=0,g=e;v<g.length;v++){var m=g[v],y=m.eventRange.instance.instanceId,E=s||l||u,S=i[y],D=t[y]||S,b=t[y]||E||m.firstCol!==m.lastCol||!m.isStart||!m.isEnd,C=void 0,w=void 0,R=void 0,T=void 0;b?(w=n[y],c.isRtl?(T=0,R=p.lefts[m.lastCol]-p.lefts[m.firstCol]):(R=0,T=p.rights[m.firstCol]-p.rights[m.lastCol])):C=o[y],h.push(Hr("div",{className:"fc-daygrid-event-harness"+(b?" fc-daygrid-event-harness-abs":""),key:y,ref:E?null:this.segHarnessRefs.createRef(y+":"+m.firstCol),style:{visibility:D?"hidden":"",marginTop:C||"",top:w||"",left:R||"",right:T||""}},Ka(m)?Hr(Ja,r({seg:m,isDragging:s,isSelected:y===d,defaultDisplayEventEnd:f},Sn(m,a))):Hr(Qa,r({seg:m,isDragging:s,isResizing:l,isDateSelecting:u,isSelected:y===d,defaultDisplayEventEnd:f},Sn(m,a)))))}return h},t.prototype.renderFillSegs=function(e,t){var n=this.context.isRtl,i=this.props.todayRange,a=this.state.framePositions,s=[];if(a)for(var l=0,u=e;l<u.length;l++){var c=u[l],d=n?{right:0,left:a.lefts[c.lastCol]-a.lefts[c.firstCol]}:{left:0,right:a.rights[c.firstCol]-a.rights[c.lastCol]};s.push(Hr("div",{key:bn(c.eventRange),className:"fc-daygrid-bg-harness",style:d},"bg-event"===t?Hr(la,r({seg:c},Sn(c,i))):sa(t)))}return Hr.apply(void 0,o([Ur,{}],s))},t.prototype.updateSizing=function(e){var t=this.props,n=this.frameElRefs;if(null!==t.clientWidth){if(e){var r=t.cells.map((function(e){return n.currentMap[e.key]}));if(r.length){var o=this.rootElRef.current;this.setState({framePositions:new Mr(o,r,!0,!1)})}}var i=!0===t.dayMaxEvents||!0===t.dayMaxEventRows;this.setState({segHeights:this.computeSegHeights(),maxContentHeight:i?this.computeMaxContentHeight():null})}},t.prototype.computeSegHeights=function(){return Oe(this.segHarnessRefs.currentMap,(function(e){return e.getBoundingClientRect().height}))},t.prototype.computeMaxContentHeight=function(){var e=this.props.cells[0].key,t=this.cellElRefs.currentMap[e],n=this.fgElRefs.currentMap[e];return t.getBoundingClientRect().bottom-n.getBoundingClientRect().top},t.prototype.getCellEls=function(){var e=this.cellElRefs.currentMap;return this.props.cells.map((function(t){return e[t.key]}))},t}(oo);rs.addStateEquality({segHeights:Le});var os=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.repositioner=new Go(t.updateSize.bind(t)),t.handleRootEl=function(e){t.rootEl=e,t.props.elRef&&Yr(t.props.elRef,e)},t.handleDocumentMousedown=function(e){var n=t.props.onClose;n&&!t.rootEl.contains(e.target)&&n()},t.handleDocumentScroll=function(){t.repositioner.request(10)},t.handleCloseClick=function(){var e=t.props.onClose;e&&e()},t}return n(t,e),t.prototype.render=function(){var e=this.context.theme,t=this.props,n=["fc-popover",e.getClass("popover")].concat(t.extraClassNames||[]);return Hr("div",r({className:n.join(" ")},t.extraAttrs,{ref:this.handleRootEl}),Hr("div",{className:"fc-popover-header "+e.getClass("popoverHeader")},Hr("span",{className:"fc-popover-title"},t.title),Hr("span",{className:"fc-popover-close "+e.getIconClass("close"),onClick:this.handleCloseClick})),Hr("div",{className:"fc-popover-body "+e.getClass("popoverContent")},t.children))},t.prototype.componentDidMount=function(){document.addEventListener("mousedown",this.handleDocumentMousedown),document.addEventListener("scroll",this.handleDocumentScroll),this.updateSize()},t.prototype.componentWillUnmount=function(){document.removeEventListener("mousedown",this.handleDocumentMousedown),document.removeEventListener("scroll",this.handleDocumentScroll)},t.prototype.updateSize=function(){var e=this.props,t=e.alignmentEl,n=e.topAlignmentEl,r=this.rootEl;if(r){var o,i=r.getBoundingClientRect(),a=t.getBoundingClientRect(),s=n?n.getBoundingClientRect().top:a.top;s=Math.min(s,window.innerHeight-i.height-10),s=Math.max(s,10),o=this.context.isRtl?a.right-i.width:a.left,o=Math.min(o,window.innerWidth-i.width-10),j(r,{top:s,left:o=Math.max(o,10)})}},t}(jr),is=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handlePopoverEl=function(e){t.popoverEl=e,e?t.context.registerInteractiveComponent(t,{el:e,useEventCenter:!1}):t.context.unregisterInteractiveComponent(t)},t}return n(t,e),t.prototype.render=function(){var e=this.context,t=e.options,n=e.dateEnv,o=this.props,i=o.date,a=o.hiddenInstances,s=o.todayRange,l=o.dateProfile,u=o.selectedInstanceId,c=n.format(i,t.dayPopoverFormat);return Hr(oa,{date:i,dateProfile:l,todayRange:s,elRef:this.handlePopoverEl},(function(e,t,n){return Hr(os,{elRef:e,title:c,extraClassNames:["fc-more-popover"].concat(t),extraAttrs:n,onClose:o.onCloseClick,alignmentEl:o.alignmentEl,topAlignmentEl:o.topAlignmentEl},Hr(ia,{date:i,dateProfile:l,todayRange:s},(function(e,t){return t&&Hr("div",{className:"fc-more-popover-misc",ref:e},t)})),o.segs.map((function(e){var t=e.eventRange.instance.instanceId;return Hr("div",{className:"fc-daygrid-event-harness",key:t,style:{visibility:a[t]?"hidden":""}},Ka(e)?Hr(Ja,r({seg:e,isDragging:!1,isSelected:t===u,defaultDisplayEventEnd:!1},Sn(e,s))):Hr(Qa,r({seg:e,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:t===u,defaultDisplayEventEnd:!1},Sn(e,s))))})))}))},t.prototype.queryHit=function(e,t,n,r){var o=this.props.date;if(e<n&&t<r)return{component:this,dateSpan:{allDay:!0,range:{start:o,end:ve(o,1)}},dayEl:this.popoverEl,rect:{left:0,top:0,right:n,bottom:r},layer:1}},t.prototype.isPopover=function(){return!0},t}(oo),as=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.splitBusinessHourSegs=it(za),t.splitBgEventSegs=it(za),t.splitFgEventSegs=it(za),t.splitDateSelectionSegs=it(za),t.splitEventDrag=it(Ba),t.splitEventResize=it(Ba),t.buildBuildMoreLinkText=it(ss),t.rowRefs=new Li,t.state={morePopoverState:null},t.handleRootEl=function(e){t.rootEl=e,Yr(t.props.elRef,e)},t.handleMoreLinkClick=function(e){var n=t.context,o=n.dateEnv,i=n.options.moreLinkClick;function a(e){var t=e.eventRange,r=t.def,i=t.instance,a=t.range;return{event:new zn(n,r,i),start:o.toDate(a.start),end:o.toDate(a.end),isStart:e.isStart,isEnd:e.isEnd}}"function"==typeof i&&(i=i({date:o.toDate(e.date),allDay:!0,allSegs:e.allSegs.map(a),hiddenSegs:e.hiddenSegs.map(a),jsEvent:e.ev,view:n.viewApi})),i&&"popover"!==i?"string"==typeof i&&n.calendarApi.zoomTo(e.date,i):t.setState({morePopoverState:r(r({},e),{currentFgEventSegs:t.props.fgEventSegs})})},t.handleMorePopoverClose=function(){t.setState({morePopoverState:null})},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=t.dateProfile,r=t.dayMaxEventRows,o=t.dayMaxEvents,i=t.expandRows,a=this.state.morePopoverState,s=t.cells.length,l=this.splitBusinessHourSegs(t.businessHourSegs,s),u=this.splitBgEventSegs(t.bgEventSegs,s),c=this.splitFgEventSegs(t.fgEventSegs,s),d=this.splitDateSelectionSegs(t.dateSelectionSegs,s),p=this.splitEventDrag(t.eventDrag,s),f=this.splitEventResize(t.eventResize,s),h=this.buildBuildMoreLinkText(this.context.options.moreLinkText),v=!0===o||!0===r;return v&&!i&&(v=!1,r=null,o=null),Hr("div",{className:["fc-daygrid-body",v?"fc-daygrid-body-balanced":"fc-daygrid-body-unbalanced",i?"":"fc-daygrid-body-natural"].join(" "),ref:this.handleRootEl,style:{width:t.clientWidth,minWidth:t.tableMinWidth}},Hr(Mi,{unit:"day"},(function(v,g){return Hr(Ur,null,Hr("table",{className:"fc-scrollgrid-sync-table",style:{width:t.clientWidth,minWidth:t.tableMinWidth,height:i?t.clientHeight:""}},t.colGroupNode,Hr("tbody",null,t.cells.map((function(i,a){return Hr(rs,{ref:e.rowRefs.createRef(a),key:i.length?i[0].date.toISOString():a,showDayNumbers:s>1,showWeekNumbers:t.showWeekNumbers,todayRange:g,dateProfile:n,cells:i,renderIntro:t.renderRowIntro,businessHourSegs:l[a],eventSelection:t.eventSelection,bgEventSegs:u[a].filter(ls),fgEventSegs:c[a],dateSelectionSegs:d[a],eventDrag:p[a],eventResize:f[a],dayMaxEvents:o,dayMaxEventRows:r,clientWidth:t.clientWidth,clientHeight:t.clientHeight,buildMoreLinkText:h,onMoreClick:e.handleMoreLinkClick})})))),!t.forPrint&&a&&a.currentFgEventSegs===t.fgEventSegs&&Hr(is,{date:a.date,dateProfile:n,segs:a.allSegs,alignmentEl:a.dayEl,topAlignmentEl:1===s?t.headerAlignElRef.current:null,onCloseClick:e.handleMorePopoverClose,selectedInstanceId:t.eventSelection,hiddenInstances:(t.eventDrag?t.eventDrag.affectedInstances:null)||(t.eventResize?t.eventResize.affectedInstances:null)||{},todayRange:g}))})))},t.prototype.prepareHits=function(){this.rowPositions=new Mr(this.rootEl,this.rowRefs.collect().map((function(e){return e.getCellEls()[0]})),!1,!0),this.colPositions=new Mr(this.rootEl,this.rowRefs.currentMap[0].getCellEls(),!0,!1)},t.prototype.positionToHit=function(e,t){var n=this.colPositions,r=this.rowPositions,o=n.leftToIndex(e),i=r.topToIndex(t);if(null!=i&&null!=o)return{row:i,col:o,dateSpan:{range:this.getCellRange(i,o),allDay:!0},dayEl:this.getCellEl(i,o),relativeRect:{left:n.lefts[o],right:n.rights[o],top:r.tops[i],bottom:r.bottoms[i]}}},t.prototype.getCellEl=function(e,t){return this.rowRefs.currentMap[e].getCellEls()[t]},t.prototype.getCellRange=function(e,t){var n=this.props.cells[e][t].date;return{start:n,end:ve(n,1)}},t}(oo);function ss(e){return"function"==typeof e?e:function(t){return"+"+t+" "+e}}function ls(e){return e.eventRange.def.allDay}var us=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.slicer=new cs,t.tableRef=Ar(),t.handleRootEl=function(e){e?t.context.registerInteractiveComponent(t,{el:e}):t.context.unregisterInteractiveComponent(t)},t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context;return Hr(as,r({ref:this.tableRef,elRef:this.handleRootEl},this.slicer.sliceProps(e,e.dateProfile,e.nextDayThreshold,t,e.dayTableModel),{dateProfile:e.dateProfile,cells:e.dayTableModel.cells,colGroupNode:e.colGroupNode,tableMinWidth:e.tableMinWidth,renderRowIntro:e.renderRowIntro,dayMaxEvents:e.dayMaxEvents,dayMaxEventRows:e.dayMaxEventRows,showWeekNumbers:e.showWeekNumbers,expandRows:e.expandRows,headerAlignElRef:e.headerAlignElRef,clientWidth:e.clientWidth,clientHeight:e.clientHeight,forPrint:e.forPrint}))},t.prototype.prepareHits=function(){this.tableRef.current.prepareHits()},t.prototype.queryHit=function(e,t){var n=this.tableRef.current.positionToHit(e,t);if(n)return{component:this,dateSpan:n.dateSpan,dayEl:n.dayEl,rect:{left:n.relativeRect.left,right:n.relativeRect.right,top:n.relativeRect.top,bottom:n.relativeRect.bottom},layer:0}},t}(oo),cs=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.forceDayIfListItem=!0,t}return n(t,e),t.prototype.sliceRange=function(e,t){return t.sliceRange(e)},t}(Hi),ds=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.buildDayTableModel=it(ps),t.headerRef=Ar(),t.tableRef=Ar(),t}return n(t,e),t.prototype.render=function(){var e=this,t=this.context,n=t.options,r=t.dateProfileGenerator,o=this.props,i=this.buildDayTableModel(o.dateProfile,r),a=n.dayHeaders&&Hr(_i,{ref:this.headerRef,dateProfile:o.dateProfile,dates:i.headerDates,datesRepDistinctDays:1===i.rowCnt}),s=function(t){return Hr(us,{ref:e.tableRef,dateProfile:o.dateProfile,dayTableModel:i,businessHours:o.businessHours,dateSelection:o.dateSelection,eventStore:o.eventStore,eventUiBases:o.eventUiBases,eventSelection:o.eventSelection,eventDrag:o.eventDrag,eventResize:o.eventResize,nextDayThreshold:n.nextDayThreshold,colGroupNode:t.tableColGroupNode,tableMinWidth:t.tableMinWidth,dayMaxEvents:n.dayMaxEvents,dayMaxEventRows:n.dayMaxEventRows,showWeekNumbers:n.weekNumbers,expandRows:!o.isHeightAuto,headerAlignElRef:e.headerElRef,clientWidth:t.clientWidth,clientHeight:t.clientHeight,forPrint:o.forPrint})};return n.dayMinWidth?this.renderHScrollLayout(a,s,i.colCnt,n.dayMinWidth):this.renderSimpleLayout(a,s)},t}(Va);function ps(e,t){var n=new Pi(e.renderRange,t);return new Ni(n,/year|month|week/.test(e.currentRangeUnit))}var fs=io({initialView:"dayGridMonth",optionRefiners:{moreLinkClick:_t,moreLinkClassNames:_t,moreLinkContent:_t,moreLinkDidMount:_t,moreLinkWillUnmount:_t},views:{dayGrid:{component:ds,dateProfileGeneratorClass:function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.buildRenderRange=function(t,n,r){var o,i=this.props.dateEnv,a=e.prototype.buildRenderRange.call(this,t,n,r),s=a.start,l=a.end;(/^(year|month)$/.test(n)&&(s=i.startOfWeek(s),(o=i.startOfWeek(l)).valueOf()!==l.valueOf()&&(l=he(o,1))),this.props.monthMode&&this.props.fixedWeekCount)&&(l=he(l,6-Math.ceil(me(s,l))));return{start:s,end:l}},t}(Co)},dayGridDay:{type:"dayGrid",duration:{days:1}},dayGridWeek:{type:"dayGrid",duration:{weeks:1}},dayGridMonth:{type:"dayGrid",duration:{months:1},monthMode:!0,fixedWeekCount:!0}}}),hs=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.getKeyInfo=function(){return{allDay:{},timed:{}}},t.prototype.getKeysForDateSpan=function(e){return e.allDay?["allDay"]:["timed"]},t.prototype.getKeysForEventDef=function(e){return e.allDay?un(e)?["timed","allDay"]:["allDay"]:["timed"]},t}(pr),vs=function(){function e(e,t,n){this.positions=e,this.dateProfile=t,this.slatMetas=n}return e.prototype.safeComputeTop=function(e){var t=this.dateProfile;if(sn(t.currentRange,e)){var n=be(e),r=e.valueOf()-n.valueOf();if(r>=$e(t.slotMinTime)&&r<$e(t.slotMaxTime))return this.computeTimeTop(Ye(r))}},e.prototype.computeDateTop=function(e,t){return t||(t=be(e)),this.computeTimeTop(Ye(e.valueOf()-t.valueOf()))},e.prototype.computeTimeTop=function(e){var t,n,r=this.positions,o=this.dateProfile,i=this.slatMetas,a=r.els.length,s=i[1].date.valueOf()-i[0].date.valueOf(),l=(e.milliseconds-$e(o.slotMinTime))/s;return l=Math.max(0,l),l=Math.min(a,l),t=Math.floor(l),n=l-(t=Math.min(t,a-1)),r.tops[t]+r.getHeight(t)*n},e}(),gs=[{hours:1},{minutes:30},{minutes:15},{seconds:30},{seconds:15}],ms=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.rootElRef=Ar(),t.slatElRefs=new Li,t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context;return Hr("div",{className:"fc-timegrid-slots",ref:this.rootElRef},Hr("table",{className:t.theme.getClass("table"),style:{minWidth:e.tableMinWidth,width:e.clientWidth,height:e.minHeight}},e.tableColGroupNode,Hr(ys,{slatElRefs:this.slatElRefs,axis:e.axis,slatMetas:e.slatMetas})))},t.prototype.componentDidMount=function(){this.updateSizing()},t.prototype.componentDidUpdate=function(){this.updateSizing()},t.prototype.componentWillUnmount=function(){this.props.onCoords&&this.props.onCoords(null)},t.prototype.updateSizing=function(){var e,t=this.props;t.onCoords&&null!==t.clientWidth&&(this.rootElRef.current.offsetHeight&&t.onCoords(new vs(new Mr(this.rootElRef.current,(e=this.slatElRefs.currentMap,t.slatMetas.map((function(t){return e[t.key]}))),!1,!0),this.props.dateProfile,t.slatMetas)))},t}(jr);var ys=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=t.options,o=e.slatElRefs;return Hr("tbody",null,e.slatMetas.map((function(i,a){var s={time:i.time,date:t.dateEnv.toDate(i.date),view:t.viewApi},l=["fc-timegrid-slot","fc-timegrid-slot-lane",i.isLabeled?"":"fc-timegrid-slot-minor"];return Hr("tr",{key:i.key,ref:o.createRef(i.key)},e.axis&&Hr(Ss,r({},i)),Hr(uo,{hookProps:s,classNames:n.slotLaneClassNames,content:n.slotLaneContent,didMount:n.slotLaneDidMount,willUnmount:n.slotLaneWillUnmount},(function(e,t,n,r){return Hr("td",{ref:e,className:l.concat(t).join(" "),"data-time":i.isoTimeStr},r)})))})))},t}(jr),Es=St({hour:"numeric",minute:"2-digit",omitZeroMinute:!0,meridiem:"short"});function Ss(e){var t=["fc-timegrid-slot","fc-timegrid-slot-label",e.isLabeled?"fc-scrollgrid-shrink":"fc-timegrid-slot-minor"];return Hr(zr.Consumer,null,(function(n){if(e.isLabeled){var r=n.dateEnv,o=n.options,i=n.viewApi,a=null==o.slotLabelFormat?Es:Array.isArray(o.slotLabelFormat)?St(o.slotLabelFormat[0]):St(o.slotLabelFormat),s={level:0,time:e.time,date:r.toDate(e.date),view:i,text:r.format(e.date,a)};return Hr(uo,{hookProps:s,classNames:o.slotLabelClassNames,content:o.slotLabelContent,defaultContent:Ds,didMount:o.slotLabelDidMount,willUnmount:o.slotLabelWillUnmount},(function(n,r,o,i){return Hr("td",{ref:n,className:t.concat(r).join(" "),"data-time":e.isoTimeStr},Hr("div",{className:"fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame"},Hr("div",{className:"fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion",ref:o},i)))}))}return Hr("td",{className:t.join(" "),"data-time":e.isoTimeStr})}))}function Ds(e){return e.text}function bs(e,t,n,r,o){for(var i=new Date(0),a=e,s=Ye(0),l=n||function(e){var t,n,r;for(t=gs.length-1;t>=0;t--)if(n=Ye(gs[t]),null!==(r=Qe(n,e))&&r>1)return n;return e}(r),u=[];$e(a)<$e(t);){var c=o.add(i,a),d=null!==Qe(s,l);u.push({date:c,time:a,key:c.toISOString(),isoTimeStr:nt(c),isLabeled:d}),a=Xe(a,r),s=Xe(s,r)}return u}var Cs=St({week:"short"}),ws=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.allDaySplitter=new hs,t.headerElRef=Ar(),t.rootElRef=Ar(),t.scrollerElRef=Ar(),t.state={slatCoords:null},t.handleScrollTopRequest=function(e){var n=t.scrollerElRef.current;n&&(n.scrollTop=e)},t.renderHeadAxis=function(e){void 0===e&&(e="");var n=t.context.options,o=t.props.dateProfile.renderRange,i=ye(o.start,o.end),a=n.navLinks&&1===i?{"data-navlink":gr(o.start,"week"),tabIndex:0}:{};return n.weekNumbers?Hr(ca,{date:o.start,defaultFormat:Cs},(function(t,n,o,i){return Hr("th",{ref:t,className:["fc-timegrid-axis","fc-scrollgrid-shrink"].concat(n).join(" ")},Hr("div",{className:"fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid",style:{height:e}},Hr("a",r({ref:o,className:"fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner"},a),i)))})):Hr("th",{className:"fc-timegrid-axis"},Hr("div",{className:"fc-timegrid-axis-frame",style:{height:e}}))},t.renderTableRowAxis=function(e){var n=t.context,r=n.options,o=n.viewApi,i={text:r.allDayText,view:o};return Hr(uo,{hookProps:i,classNames:r.allDayClassNames,content:r.allDayContent,defaultContent:Rs,didMount:r.allDayDidMount,willUnmount:r.allDayWillUnmount},(function(t,n,r,o){return Hr("td",{ref:t,className:["fc-timegrid-axis","fc-scrollgrid-shrink"].concat(n).join(" ")},Hr("div",{className:"fc-timegrid-axis-frame fc-scrollgrid-shrink-frame"+(null==e?" fc-timegrid-axis-frame-liquid":""),style:{height:e}},Hr("span",{className:"fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner",ref:r},o)))}))},t.handleSlatCoords=function(e){t.setState({slatCoords:e})},t}return n(t,e),t.prototype.renderSimpleLayout=function(e,t,n){var r=this.context,o=this.props,i=[],a=Ki(r.options);return e&&i.push({type:"header",key:"header",isSticky:a,chunk:{elRef:this.headerElRef,tableClassName:"fc-col-header",rowContent:e}}),t&&(i.push({type:"body",key:"all-day",chunk:{content:t}}),i.push({type:"body",key:"all-day-divider",outerContent:Hr("tr",{className:"fc-scrollgrid-section"},Hr("td",{className:"fc-timegrid-divider "+r.theme.getClass("tableCellShaded")}))})),i.push({type:"body",key:"body",liquid:!0,expandRows:Boolean(r.options.expandRows),chunk:{scrollerElRef:this.scrollerElRef,content:n}}),Hr(yo,{viewSpec:r.viewSpec,elRef:this.rootElRef},(function(e,t){return Hr("div",{className:["fc-timegrid"].concat(t).join(" "),ref:e},Hr($i,{liquid:!o.isHeightAuto&&!o.forPrint,cols:[{width:"shrink"}],sections:i}))}))},t.prototype.renderHScrollLayout=function(e,t,n,r,o,i,a){var s=this,l=this.context.pluginHooks.scrollGridImpl;if(!l)throw new Error("No ScrollGrid implementation");var u=this.context,c=this.props,d=!c.forPrint&&Ki(u.options),p=!c.forPrint&&Ji(u.options),f=[];e&&f.push({type:"header",key:"header",isSticky:d,syncRowHeights:!0,chunks:[{key:"axis",rowContent:function(e){return Hr("tr",null,s.renderHeadAxis(e.rowSyncHeights[0]))}},{key:"cols",elRef:this.headerElRef,tableClassName:"fc-col-header",rowContent:e}]}),t&&(f.push({type:"body",key:"all-day",syncRowHeights:!0,chunks:[{key:"axis",rowContent:function(e){return Hr("tr",null,s.renderTableRowAxis(e.rowSyncHeights[0]))}},{key:"cols",content:t}]}),f.push({key:"all-day-divider",type:"body",outerContent:Hr("tr",{className:"fc-scrollgrid-section"},Hr("td",{colSpan:2,className:"fc-timegrid-divider "+u.theme.getClass("tableCellShaded")}))}));var h=u.options.nowIndicator;return f.push({type:"body",key:"body",liquid:!0,expandRows:Boolean(u.options.expandRows),chunks:[{key:"axis",content:function(e){return Hr("div",{className:"fc-timegrid-axis-chunk"},Hr("table",{style:{height:e.expandRows?e.clientHeight:""}},e.tableColGroupNode,Hr("tbody",null,Hr(Ts,{slatMetas:i}))),Hr("div",{className:"fc-timegrid-now-indicator-container"},Hr(Mi,{unit:h?"minute":"day"},(function(e){var t=h&&a&&a.safeComputeTop(e);return"number"==typeof t?Hr(na,{isAxis:!0,date:e},(function(e,n,r,o){return Hr("div",{ref:e,className:["fc-timegrid-now-indicator-arrow"].concat(n).join(" "),style:{top:t}},o)})):null}))))}},{key:"cols",scrollerElRef:this.scrollerElRef,content:n}]}),p&&f.push({key:"footer",type:"footer",isSticky:!0,chunks:[{key:"axis",content:Xi},{key:"cols",content:Xi}]}),Hr(yo,{viewSpec:u.viewSpec,elRef:this.rootElRef},(function(e,t){return Hr("div",{className:["fc-timegrid"].concat(t).join(" "),ref:e},Hr(l,{liquid:!c.isHeightAuto&&!c.forPrint,colGroups:[{width:"shrink",cols:[{width:"shrink"}]},{cols:[{span:r,minWidth:o}]}],sections:f}))}))},t.prototype.getAllDayMaxEventProps=function(){var e=this.context.options,t=e.dayMaxEvents,n=e.dayMaxEventRows;return!0!==t&&!0!==n||(t=void 0,n=5),{dayMaxEvents:t,dayMaxEventRows:n}},t}(oo);function Rs(e){return e.text}var Ts=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){return this.props.slatMetas.map((function(e){return Hr("tr",{key:e.key},Hr(Ss,r({},e)))}))},t}(jr);function ks(e,t){var n,r=[];for(n=0;n<t;n++)r.push([]);if(e)for(n=0;n<e.length;n++)r[e[n].col].push(e[n]);return r}function Ms(e,t){var n=[];if(e){for(a=0;a<t;a++)n[a]={affectedInstances:e.affectedInstances,isEvent:e.isEvent,segs:[]};for(var r=0,o=e.segs;r<o.length;r++){var i=o[r];n[i.col].segs.push(i)}}else for(var a=0;a<t;a++)n[a]=null;return n}function xs(e,t,n,r,o){return _s(e,t,n,r),function(e,t){for(var n=0,r=e;n<r.length;n++){(c=r[n]).level=null,c.forwardCoord=null,c.backwardCoord=null,c.forwardPressure=null}var o,i=function(e){var t,n,r,o=[];for(t=0;t<e.length;t++){for(n=e[t],r=0;r<o.length&&Is(n,o[r]).length;r++);n.level=r,(o[r]||(o[r]=[])).push(n)}return o}(e=hn(e,t));if(function(e){var t,n,r,o,i;for(t=0;t<e.length;t++)for(n=e[t],r=0;r<n.length;r++)for((o=n[r]).forwardSegs=[],i=t+1;i<e.length;i++)Is(o,e[i],o.forwardSegs)}(i),o=i[0]){for(var a=0,s=o;a<s.length;a++){Ps(c=s[a])}for(var l=0,u=o;l<u.length;l++){var c;Ns(c=u[l],0,0,t)}}return e}(e,o)}function _s(e,t,n,r){for(var o=0,i=e;o<i.length;o++){var a=i[o];a.top=n.computeDateTop(a.start,t),a.bottom=Math.max(a.top+(r||0),n.computeDateTop(a.end,t))}}function Is(e,t,n){void 0===n&&(n=[]);for(var r=0;r<t.length;r++)o=e,i=t[r],o.bottom>i.top&&o.top<i.bottom&&n.push(t[r]);var o,i;return n}function Ps(e){var t,n,r=e.forwardSegs,o=0;if(null==e.forwardPressure){for(t=0;t<r.length;t++)Ps(n=r[t]),o=Math.max(o,1+n.forwardPressure);e.forwardPressure=o}}function Ns(e,t,n,r){var o,i=e.forwardSegs;if(null==e.forwardCoord)for(i.length?(!function(e,t){var n=e.map(Hs),r=[{field:"forwardPressure",order:-1},{field:"backwardCoord",order:1}].concat(t);n.sort((function(e,t){return ae(e,t,r)})),n.map((function(e){return e._seg}))}(i,r),Ns(i[0],t+1,n,r),e.forwardCoord=i[0].backwardCoord):e.forwardCoord=1,e.backwardCoord=e.forwardCoord-(e.forwardCoord-n)/(t+1),o=0;o<i.length;o++)Ns(i[o],0,e.forwardCoord,r)}function Hs(e){var t=vn(e);return t.forwardPressure=e.forwardPressure,t.backwardCoord=e.backwardCoord,t}var Os=St({hour:"numeric",minute:"2-digit",meridiem:!1}),As=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=["fc-timegrid-event","fc-v-event"];return this.props.isCondensed&&e.push("fc-timegrid-event-condensed"),Hr(ea,r({},this.props,{defaultTimeFormat:Os,extraClassNames:e}))},t}(jr);di.timeGridEventCondensedHeight=30;var Us=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=this.context.options.selectMirror,o=t.eventDrag&&t.eventDrag.segs||t.eventResize&&t.eventResize.segs||n&&t.dateSelectionSegs||[],i=t.eventDrag&&t.eventDrag.affectedInstances||t.eventResize&&t.eventResize.affectedInstances||{};return Hr(oa,{elRef:t.elRef,date:t.date,dateProfile:t.dateProfile,todayRange:t.todayRange,extraHookProps:t.extraHookProps},(function(a,s,l){return Hr("td",r({ref:a,className:["fc-timegrid-col"].concat(s,t.extraClassNames||[]).join(" ")},l,t.extraDataAttrs),Hr("div",{className:"fc-timegrid-col-frame"},Hr("div",{className:"fc-timegrid-col-bg"},e.renderFillSegs(t.businessHourSegs,"non-business"),e.renderFillSegs(t.bgEventSegs,"bg-event"),e.renderFillSegs(t.dateSelectionSegs,"highlight")),Hr("div",{className:"fc-timegrid-col-events"},e.renderFgSegs(t.fgEventSegs,i)),Hr("div",{className:"fc-timegrid-col-events"},e.renderFgSegs(o,{},Boolean(t.eventDrag),Boolean(t.eventResize),Boolean(n))),Hr("div",{className:"fc-timegrid-now-indicator-container"},e.renderNowIndicator(t.nowIndicatorSegs)),Hr(Ls,{date:t.date,dateProfile:t.dateProfile,todayRange:t.todayRange,extraHookProps:t.extraHookProps})))}))},t.prototype.renderFgSegs=function(e,t,n,r,o){var i=this.props;return i.forPrint?this.renderPrintFgSegs(e):i.slatCoords?this.renderPositionedFgSegs(e,t,n,r,o):void 0},t.prototype.renderPrintFgSegs=function(e){var t=this.props;return(e=hn(e,this.context.options.eventOrder)).map((function(e){return Hr("div",{className:"fc-timegrid-event-harness",key:e.eventRange.instance.instanceId},Hr(As,r({seg:e,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,isCondensed:!1},Sn(e,t.todayRange,t.nowDate))))}))},t.prototype.renderPositionedFgSegs=function(e,t,n,o,i){var a=this,s=this.context,l=this.props;return(e=xs(e,l.date,l.slatCoords,s.options.eventMinHeight,s.options.eventOrder)).map((function(e){var s=e.eventRange.instance.instanceId,u=n||o||i?r({left:0,right:0},a.computeSegTopBottomCss(e)):a.computeFgSegPositionCss(e);return Hr("div",{className:"fc-timegrid-event-harness"+(e.level>0?" fc-timegrid-event-harness-inset":""),key:s,style:r({visibility:t[s]?"hidden":""},u)},Hr(As,r({seg:e,isDragging:n,isResizing:o,isDateSelecting:i,isSelected:s===l.eventSelection,isCondensed:e.bottom-e.top<di.timeGridEventCondensedHeight},Sn(e,l.todayRange,l.nowDate))))}))},t.prototype.renderFillSegs=function(e,t){var n=this,o=this.context,i=this.props;if(i.slatCoords){_s(e,i.date,i.slatCoords,o.options.eventMinHeight);var a=e.map((function(e){return Hr("div",{key:bn(e.eventRange),className:"fc-timegrid-bg-harness",style:n.computeSegTopBottomCss(e)},"bg-event"===t?Hr(la,r({seg:e},Sn(e,i.todayRange,i.nowDate))):sa(t))}));return Hr(Ur,null,a)}},t.prototype.renderNowIndicator=function(e){var t=this.props,n=t.slatCoords,r=t.date;if(n)return e.map((function(e,t){return Hr(na,{isAxis:!1,date:r,key:t},(function(t,o,i,a){return Hr("div",{ref:t,className:["fc-timegrid-now-indicator-line"].concat(o).join(" "),style:{top:n.computeDateTop(e.start,r)}},a)}))}))},t.prototype.computeFgSegPositionCss=function(e){var t,n,o=this.context,i=o.isRtl,a=o.options.slotEventOverlap,s=e.backwardCoord,l=e.forwardCoord;a&&(l=Math.min(1,s+2*(l-s))),i?(t=1-l,n=s):(t=s,n=1-l);var u={zIndex:e.level+1,left:100*t+"%",right:100*n+"%"};return a&&e.forwardPressure&&(u[i?"marginLeft":"marginRight"]=20),r(r({},u),this.computeSegTopBottomCss(e))},t.prototype.computeSegTopBottomCss=function(e){return{top:e.top,bottom:-e.bottom}},t}(jr),Ls=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props;return Hr(ia,{date:e.date,dateProfile:e.dateProfile,todayRange:e.todayRange,extraHookProps:e.extraHookProps},(function(e,t){return t&&Hr("div",{className:"fc-timegrid-col-misc",ref:e},t)}))},t}(jr),Ws=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.splitFgEventSegs=it(ks),t.splitBgEventSegs=it(ks),t.splitBusinessHourSegs=it(ks),t.splitNowIndicatorSegs=it(ks),t.splitDateSelectionSegs=it(ks),t.splitEventDrag=it(Ms),t.splitEventResize=it(Ms),t.rootElRef=Ar(),t.cellElRefs=new Li,t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=this.context.options.nowIndicator&&t.slatCoords&&t.slatCoords.safeComputeTop(t.nowDate),r=t.cells.length,o=this.splitFgEventSegs(t.fgEventSegs,r),i=this.splitBgEventSegs(t.bgEventSegs,r),a=this.splitBusinessHourSegs(t.businessHourSegs,r),s=this.splitNowIndicatorSegs(t.nowIndicatorSegs,r),l=this.splitDateSelectionSegs(t.dateSelectionSegs,r),u=this.splitEventDrag(t.eventDrag,r),c=this.splitEventResize(t.eventResize,r);return Hr("div",{className:"fc-timegrid-cols",ref:this.rootElRef},Hr("table",{style:{minWidth:t.tableMinWidth,width:t.clientWidth}},t.tableColGroupNode,Hr("tbody",null,Hr("tr",null,t.axis&&Hr("td",{className:"fc-timegrid-col fc-timegrid-axis"},Hr("div",{className:"fc-timegrid-col-frame"},Hr("div",{className:"fc-timegrid-now-indicator-container"},"number"==typeof n&&Hr(na,{isAxis:!0,date:t.nowDate},(function(e,t,r,o){return Hr("div",{ref:e,className:["fc-timegrid-now-indicator-arrow"].concat(t).join(" "),style:{top:n}},o)}))))),t.cells.map((function(n,r){return Hr(Us,{key:n.key,elRef:e.cellElRefs.createRef(n.key),dateProfile:t.dateProfile,date:n.date,nowDate:t.nowDate,todayRange:t.todayRange,extraHookProps:n.extraHookProps,extraDataAttrs:n.extraDataAttrs,extraClassNames:n.extraClassNames,fgEventSegs:o[r],bgEventSegs:i[r],businessHourSegs:a[r],nowIndicatorSegs:s[r],dateSelectionSegs:l[r],eventDrag:u[r],eventResize:c[r],slatCoords:t.slatCoords,eventSelection:t.eventSelection,forPrint:t.forPrint})}))))))},t.prototype.componentDidMount=function(){this.updateCoords()},t.prototype.componentDidUpdate=function(){this.updateCoords()},t.prototype.updateCoords=function(){var e,t=this.props;t.onColCoords&&null!==t.clientWidth&&t.onColCoords(new Mr(this.rootElRef.current,(e=this.cellElRefs.currentMap,t.cells.map((function(t){return e[t.key]}))),!0,!1))},t}(jr);var Vs=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.processSlotOptions=it(zs),t.state={slatCoords:null},t.handleScrollRequest=function(e){var n=t.props.onScrollTopRequest,r=t.state.slatCoords;if(n&&r){if(e.time){var o=r.computeTimeTop(e.time);(o=Math.ceil(o))&&o++,n(o)}return!0}},t.handleColCoords=function(e){t.colCoords=e},t.handleSlatCoords=function(e){t.setState({slatCoords:e}),t.props.onSlatCoords&&t.props.onSlatCoords(e)},t}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.state;return Hr("div",{className:"fc-timegrid-body",ref:e.rootElRef,style:{width:e.clientWidth,minWidth:e.tableMinWidth}},Hr(ms,{axis:e.axis,dateProfile:e.dateProfile,slatMetas:e.slatMetas,clientWidth:e.clientWidth,minHeight:e.expandRows?e.clientHeight:"",tableMinWidth:e.tableMinWidth,tableColGroupNode:e.axis?e.tableColGroupNode:null,onCoords:this.handleSlatCoords}),Hr(Ws,{cells:e.cells,axis:e.axis,dateProfile:e.dateProfile,businessHourSegs:e.businessHourSegs,bgEventSegs:e.bgEventSegs,fgEventSegs:e.fgEventSegs,dateSelectionSegs:e.dateSelectionSegs,eventSelection:e.eventSelection,eventDrag:e.eventDrag,eventResize:e.eventResize,todayRange:e.todayRange,nowDate:e.nowDate,nowIndicatorSegs:e.nowIndicatorSegs,clientWidth:e.clientWidth,tableMinWidth:e.tableMinWidth,tableColGroupNode:e.tableColGroupNode,slatCoords:t.slatCoords,onColCoords:this.handleColCoords,forPrint:e.forPrint}))},t.prototype.componentDidMount=function(){this.scrollResponder=this.context.createScrollResponder(this.handleScrollRequest)},t.prototype.componentDidUpdate=function(e){this.scrollResponder.update(e.dateProfile!==this.props.dateProfile)},t.prototype.componentWillUnmount=function(){this.scrollResponder.detach()},t.prototype.positionToHit=function(e,t){var n=this.context,r=n.dateEnv,o=n.options,i=this.colCoords,a=this.props.dateProfile,s=this.state.slatCoords,l=this.processSlotOptions(this.props.slotDuration,o.snapDuration),u=l.snapDuration,c=l.snapsPerSlot,d=i.leftToIndex(e),p=s.positions.topToIndex(t);if(null!=d&&null!=p){var f=s.positions.tops[p],h=s.positions.getHeight(p),v=(t-f)/h,g=p*c+Math.floor(v*c),m=this.props.cells[d].date,y=Xe(a.slotMinTime,Ke(u,g)),E=r.add(m,y);return{col:d,dateSpan:{range:{start:E,end:r.add(E,u)},allDay:!1},dayEl:i.els[d],relativeRect:{left:i.lefts[d],right:i.rights[d],top:f,bottom:f+h}}}},t}(jr);function zs(e,t){var n=t||e,r=Qe(e,n);return null===r&&(n=e,r=1),{snapDuration:n,snapsPerSlot:r}}var Fs=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.buildDayRanges=it(Bs),t.slicer=new js,t.timeColsRef=Ar(),t.handleRootEl=function(e){e?t.context.registerInteractiveComponent(t,{el:e}):t.context.unregisterInteractiveComponent(t)},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=this.context,o=t.dateProfile,i=t.dayTableModel,a=n.options.nowIndicator,s=this.buildDayRanges(i,o,n.dateEnv);return Hr(Mi,{unit:a?"minute":"day"},(function(l,u){return Hr(Vs,r({ref:e.timeColsRef,rootElRef:e.handleRootEl},e.slicer.sliceProps(t,o,null,n,s),{forPrint:t.forPrint,axis:t.axis,dateProfile:o,slatMetas:t.slatMetas,slotDuration:t.slotDuration,cells:i.cells[0],tableColGroupNode:t.tableColGroupNode,tableMinWidth:t.tableMinWidth,clientWidth:t.clientWidth,clientHeight:t.clientHeight,expandRows:t.expandRows,nowDate:l,nowIndicatorSegs:a&&e.slicer.sliceNowDate(l,n,s),todayRange:u,onScrollTopRequest:t.onScrollTopRequest,onSlatCoords:t.onSlatCoords}))}))},t.prototype.queryHit=function(e,t){var n=this.timeColsRef.current.positionToHit(e,t);if(n)return{component:this,dateSpan:n.dateSpan,dayEl:n.dayEl,rect:{left:n.relativeRect.left,right:n.relativeRect.right,top:n.relativeRect.top,bottom:n.relativeRect.bottom},layer:0}},t}(oo);function Bs(e,t,n){for(var r=[],o=0,i=e.headerDates;o<i.length;o++){var a=i[o];r.push({start:n.add(a,t.slotMinTime),end:n.add(a,t.slotMaxTime)})}return r}var js=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.sliceRange=function(e,t){for(var n=[],r=0;r<t.length;r++){var o=nn(e,t[r]);o&&n.push({start:o.start,end:o.end,isStart:o.start.valueOf()===e.start.valueOf(),isEnd:o.end.valueOf()===e.end.valueOf(),col:r})}return n},t}(Hi),Gs=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.buildTimeColsModel=it(qs),t.buildSlatMetas=it(bs),t}return n(t,e),t.prototype.render=function(){var e=this,t=this.context,n=t.options,o=t.dateEnv,i=t.dateProfileGenerator,a=this.props,s=a.dateProfile,l=this.buildTimeColsModel(s,i),u=this.allDaySplitter.splitProps(a),c=this.buildSlatMetas(s.slotMinTime,s.slotMaxTime,n.slotLabelInterval,n.slotDuration,o),d=n.dayMinWidth,p=!d,f=d,h=n.dayHeaders&&Hr(_i,{dates:l.headerDates,dateProfile:s,datesRepDistinctDays:!0,renderIntro:p?this.renderHeadAxis:null}),v=!1!==n.allDaySlot&&function(t){return Hr(us,r({},u.allDay,{dateProfile:s,dayTableModel:l,nextDayThreshold:n.nextDayThreshold,tableMinWidth:t.tableMinWidth,colGroupNode:t.tableColGroupNode,renderRowIntro:p?e.renderTableRowAxis:null,showWeekNumbers:!1,expandRows:!1,headerAlignElRef:e.headerElRef,clientWidth:t.clientWidth,clientHeight:t.clientHeight,forPrint:a.forPrint},e.getAllDayMaxEventProps()))},g=function(t){return Hr(Fs,r({},u.timed,{dayTableModel:l,dateProfile:s,axis:p,slotDuration:n.slotDuration,slatMetas:c,forPrint:a.forPrint,tableColGroupNode:t.tableColGroupNode,tableMinWidth:t.tableMinWidth,clientWidth:t.clientWidth,clientHeight:t.clientHeight,onSlatCoords:e.handleSlatCoords,expandRows:t.expandRows,onScrollTopRequest:e.handleScrollTopRequest}))};return f?this.renderHScrollLayout(h,v,g,l.colCnt,d,c,this.state.slatCoords):this.renderSimpleLayout(h,v,g)},t}(ws);function qs(e,t){var n=new Pi(e.renderRange,t);return new Ni(n,!1)}var Ys=io({initialView:"timeGridWeek",optionRefiners:{allDaySlot:Boolean},views:{timeGrid:{component:Gs,usesMinMaxTime:!0,allDaySlot:!0,slotDuration:"00:30:00",slotEventOverlap:!0},timeGridDay:{type:"timeGrid",duration:{days:1}},timeGridWeek:{type:"timeGrid",duration:{weeks:1}}}}),Zs=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=e.dayDate,n=e.todayRange,o=this.context,i=o.theme,a=o.dateEnv,s=o.options,l=o.viewApi,u=hr(t,n),c=s.listDayFormat?a.format(t,s.listDayFormat):"",d=s.listDaySideFormat?a.format(t,s.listDaySideFormat):"",p=s.navLinks?gr(t):null,f=r({date:a.toDate(t),view:l,text:c,sideText:d,navLinkData:p},u),h=["fc-list-day"].concat(vr(u,i));return Hr(uo,{hookProps:f,classNames:s.dayHeaderClassNames,content:s.dayHeaderContent,defaultContent:Xs,didMount:s.dayHeaderDidMount,willUnmount:s.dayHeaderWillUnmount},(function(e,n,r,o){return Hr("tr",{ref:e,className:h.concat(n).join(" "),"data-date":tt(t)},Hr("th",{colSpan:3},Hr("div",{className:"fc-list-day-cushion "+i.getClass("tableCellShaded"),ref:r},o)))}))},t}(jr);function Xs(e){var t=e.navLinkData?{"data-navlink":e.navLinkData,tabIndex:0}:{};return Hr(Ur,null,e.text&&Hr("a",r({className:"fc-list-day-text"},t),e.text),e.sideText&&Hr("a",r({className:"fc-list-day-side-text"},t),e.sideText))}var Ks=St({hour:"numeric",minute:"2-digit",meridiem:"short"}),Js=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this.props,t=this.context,n=e.seg,r=t.options.eventTimeFormat||Ks;return Hr(Qi,{seg:n,timeText:"",disableDragging:!0,disableResizing:!0,defaultContent:$s,isPast:e.isPast,isFuture:e.isFuture,isToday:e.isToday,isSelected:e.isSelected,isDragging:e.isDragging,isResizing:e.isResizing,isDateSelecting:e.isDateSelecting},(function(e,o,i,a,s){return Hr("tr",{className:["fc-list-event",s.event.url?"fc-event-forced-url":""].concat(o).join(" "),ref:e},function(e,t,n){var r=n.options;if(!1!==r.displayEventTime){var o=e.eventRange.def,i=e.eventRange.instance,a=!1,s=void 0;if(o.allDay?a=!0:$t(e.eventRange.range)?e.isStart?s=En(e,t,n,null,null,i.range.start,e.end):e.isEnd?s=En(e,t,n,null,null,e.start,i.range.end):a=!0:s=En(e,t,n),a){var l={text:n.options.allDayText,view:n.viewApi};return Hr(uo,{hookProps:l,classNames:r.allDayClassNames,content:r.allDayContent,defaultContent:Qs,didMount:r.allDayDidMount,willUnmount:r.allDayWillUnmount},(function(e,t,n,r){return Hr("td",{className:["fc-list-event-time"].concat(t).join(" "),ref:e},r)}))}return Hr("td",{className:"fc-list-event-time"},s)}return null}(n,r,t),Hr("td",{className:"fc-list-event-graphic"},Hr("span",{className:"fc-list-event-dot",style:{borderColor:s.borderColor||s.backgroundColor}})),Hr("td",{className:"fc-list-event-title",ref:i},a))}))},t}(jr);function $s(e){var t=e.event,n=t.url;return Hr("a",r({},n?{href:n}:{}),t.title)}function Qs(e){return e.text}var el=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.computeDateVars=it(nl),t.eventStoreToSegs=it(t._eventStoreToSegs),t.setRootEl=function(e){e?t.context.registerInteractiveComponent(t,{el:e}):t.context.unregisterInteractiveComponent(t)},t}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,n=this.context,r=["fc-list",n.theme.getClass("table"),!1!==n.options.stickyHeaderDates?"fc-list-sticky":""],o=this.computeDateVars(t.dateProfile),i=o.dayDates,a=o.dayRanges,s=this.eventStoreToSegs(t.eventStore,t.eventUiBases,a);return Hr(yo,{viewSpec:n.viewSpec,elRef:this.setRootEl},(function(n,o){return Hr("div",{ref:n,className:r.concat(o).join(" ")},Hr(Ui,{liquid:!t.isHeightAuto,overflowX:t.isHeightAuto?"visible":"hidden",overflowY:t.isHeightAuto?"visible":"auto"},s.length>0?e.renderSegList(s,i):e.renderEmptyMessage()))}))},t.prototype.renderEmptyMessage=function(){var e=this.context,t=e.options,n=e.viewApi,r={text:t.noEventsText,view:n};return Hr(uo,{hookProps:r,classNames:t.noEventsClassNames,content:t.noEventsContent,defaultContent:tl,didMount:t.noEventsDidMount,willUnmount:t.noEventsWillUnmount},(function(e,t,n,r){return Hr("div",{className:["fc-list-empty"].concat(t).join(" "),ref:e},Hr("div",{className:"fc-list-empty-cushion",ref:n},r))}))},t.prototype.renderSegList=function(e,t){var n=this.context,o=n.theme,i=n.options,a=function(e){var t,n,r=[];for(t=0;t<e.length;t++)n=e[t],(r[n.dayIndex]||(r[n.dayIndex]=[])).push(n);return r}(e);return Hr(Mi,{unit:"day"},(function(e,n){for(var s=[],l=0;l<a.length;l++){var u=a[l];if(u){var c=t[l].toISOString();s.push(Hr(Zs,{key:c,dayDate:t[l],todayRange:n}));for(var d=0,p=u=hn(u,i.eventOrder);d<p.length;d++){var f=p[d];s.push(Hr(Js,r({key:c+":"+f.eventRange.instance.instanceId,seg:f,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1},Sn(f,n,e))))}}}return Hr("table",{className:"fc-list-table "+o.getClass("table")},Hr("tbody",null,s))}))},t.prototype._eventStoreToSegs=function(e,t,n){return this.eventRangesToSegs(ln(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)},t.prototype.eventRangesToSegs=function(e,t){for(var n=[],r=0,o=e;r<o.length;r++){var i=o[r];n.push.apply(n,this.eventRangeToSegs(i,t))}return n},t.prototype.eventRangeToSegs=function(e,t){var n,r,o,i=this.context.dateEnv,a=this.context.options.nextDayThreshold,s=e.range,l=e.def.allDay,u=[];for(n=0;n<t.length;n++)if((r=nn(s,t[n]))&&(o={component:this,eventRange:e,start:r.start,end:r.end,isStart:e.isStart&&r.start.valueOf()===s.start.valueOf(),isEnd:e.isEnd&&r.end.valueOf()===s.end.valueOf(),dayIndex:n},u.push(o),!o.isEnd&&!l&&n+1<t.length&&s.end<i.add(t[n+1].start,a))){o.end=s.end,o.isEnd=!0;break}return u},t}(oo);function tl(e){return e.text}function nl(e){for(var t=be(e.renderRange.start),n=e.renderRange.end,r=[],o=[];t<n;)r.push(t),o.push({start:t,end:ve(t,1)}),t=ve(t,1);return{dayDates:r,dayRanges:o}}function rl(e){return!1===e?null:St(e)}var ol=io({optionRefiners:{listDayFormat:rl,listDaySideFormat:rl,noEventsClassNames:_t,noEventsContent:_t,noEventsDidMount:_t,noEventsWillUnmount:_t},views:{list:{component:el,buttonTextKey:"list",listDayFormat:{month:"long",day:"numeric",year:"numeric"}},listDay:{type:"list",duration:{days:1},listDayFormat:{weekday:"long"}},listWeek:{type:"list",duration:{weeks:1},listDayFormat:{weekday:"long"},listDaySideFormat:{month:"long",day:"numeric",year:"numeric"}},listMonth:{type:"list",duration:{month:1},listDaySideFormat:{weekday:"long"}},listYear:{type:"list",duration:{year:1},listDaySideFormat:{weekday:"long"}}}}),il=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t}(Pr);il.prototype.classes={root:"fc-theme-bootstrap",table:"table-bordered",tableCellShaded:"table-active",buttonGroup:"btn-group",button:"btn btn-primary",buttonActive:"active",popover:"popover",popoverHeader:"popover-header",popoverContent:"popover-body"},il.prototype.baseIconClass="fa",il.prototype.iconClasses={close:"fa-times",prev:"fa-chevron-left",next:"fa-chevron-right",prevYear:"fa-angle-double-left",nextYear:"fa-angle-double-right"},il.prototype.rtlIconClasses={prev:"fa-chevron-right",next:"fa-chevron-left",prevYear:"fa-angle-double-right",nextYear:"fa-angle-double-left"},il.prototype.iconOverrideOption="bootstrapFontAwesome",il.prototype.iconOverrideCustomButtonOption="bootstrapFontAwesome",il.prototype.iconOverridePrefix="fa-";var al=io({themeClasses:{bootstrap:il}});var sl=io({eventSourceDefs:[{parseMeta:function(e){var t=e.googleCalendarId;return!t&&e.url&&(t=function(e){var t;if(/^[^/]+@([^/.]+\.)*(google|googlemail|gmail)\.com$/.test(e))return e;if((t=/^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^/]*)/.exec(e))||(t=/^https?:\/\/www.google.com\/calendar\/feeds\/([^/]*)/.exec(e)))return decodeURIComponent(t[1])}(e.url)),t?{googleCalendarId:t,googleCalendarApiKey:e.googleCalendarApiKey,googleCalendarApiBase:e.googleCalendarApiBase,extraParams:e.extraParams}:null},fetch:function(e,t,n){var o=e.context,i=o.dateEnv,a=o.options,s=e.eventSource.meta,l=s.googleCalendarApiKey||a.googleCalendarApiKey;if(l){var u=function(e){var t=e.googleCalendarApiBase;t||(t="https://www.googleapis.com/calendar/v3/calendars");return t+"/"+encodeURIComponent(e.googleCalendarId)+"/events"}(s),c=s.extraParams,d="function"==typeof c?c():c,p=function(e,t,n,o){var i,a,s;o.canComputeOffset?(a=o.formatIso(e.start),s=o.formatIso(e.end)):(a=ve(e.start,-1).toISOString(),s=ve(e.end,1).toISOString());i=r(r({},n||{}),{key:t,timeMin:a,timeMax:s,singleEvents:!0,maxResults:9999}),"local"!==o.timeZone&&(i.timeZone=o.timeZone);return i}(e.range,l,d,i);Wo("GET",u,p,(function(e,r){var o,i;e.error?n({message:"Google Calendar API: "+e.error.message,errors:e.error.errors,xhr:r}):t({rawEvents:(o=e.items,i=p.timeZone,o.map((function(e){return function(e,t){var n=e.htmlLink||null;n&&t&&(n=function(e,t){return e.replace(/(\?.*?)?(#|$)/,(function(e,n,r){return(n?n+"&":"?")+t+r}))}(n,"ctz="+t));return{id:e.id,title:e.summary,start:e.start.dateTime||e.start.date,end:e.end.dateTime||e.end.date,url:n,location:e.location,description:e.description}}(e,i)}))),xhr:r})}),(function(e,t){n({message:e,xhr:t})}))}else n({message:"Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/"})}}],optionRefiners:{googleCalendarApiKey:String},eventSourceRefiners:{googleCalendarApiKey:String,googleCalendarId:String,googleCalendarApiBase:String,extraParams:_t}});return Fo.push(Wa,fs,Ys,ol,al,sl),e.BASE_OPTION_DEFAULTS=bt,e.BASE_OPTION_REFINERS=Dt,e.BaseComponent=jr,e.BgEvent=la,e.BootstrapTheme=il,e.Calendar=pa,e.CalendarApi=Vn,e.CalendarContent=Ei,e.CalendarDataManager=Zo,e.CalendarDataProvider=oi,e.CalendarRoot=bi,e.Component=Nr,e.ContentHook=po,e.CustomContentRenderContext=co,e.DateComponent=oo,e.DateEnv=Xn,e.DateProfileGenerator=Co,e.DayCellContent=ia,e.DayCellRoot=oa,e.DayGridView=ds,e.DayHeader=_i,e.DaySeriesModel=Pi,e.DayTable=us,e.DayTableModel=Ni,e.DayTableSlicer=cs,e.DayTimeCols=Fs,e.DayTimeColsSlicer=js,e.DayTimeColsView=Gs,e.DelayedRunner=Go,e.Draggable=Aa,e.ElementDragging=ci,e.ElementScrollController=_r,e.Emitter=kr,e.EventApi=zn,e.EventRoot=Qi,e.EventSourceApi=L,e.FeaturefulElementDragging=wa,e.Fragment=Ur,e.Interaction=ai,e.ListView=el,e.MountHook=ho,e.NamedTimeZoneImpl=ii,e.NowIndicatorRoot=na,e.NowTimer=Mi,e.PointerDragging=ga,e.PositionCache=Mr,e.RefMap=Li,e.RenderHook=uo,e.ScrollController=xr,e.ScrollResponder=Vr,e.Scroller=Ui,e.SimpleScrollGrid=$i,e.Slicer=Hi,e.Splitter=pr,e.StandardEvent=ea,e.Table=as,e.TableDateCell=Ri,e.TableDowCell=Ti,e.TableView=Va,e.Theme=Pr,e.ThirdPartyDraggable=La,e.TimeCols=Vs,e.TimeColsSlatsCoords=vs,e.TimeColsView=ws,e.ViewApi=On,e.ViewContextType=zr,e.ViewRoot=yo,e.WeekNumberRoot=ca,e.WindowScrollController=Ir,e.addDays=ve,e.addDurations=Xe,e.addMs=ge,e.addWeeks=he,e.allowContextMenu=oe,e.allowSelection=ne,e.applyMutationToEventStore=Pn,e.applyStyle=j,e.applyStyleProp=G,e.asCleanDays=function(e){return e.years||e.months||e.milliseconds?0:e.days},e.asRoughMinutes=function(e){return $e(e)/6e4},e.asRoughMs=$e,e.asRoughSeconds=function(e){return $e(e)/1e3},e.buildClassNameNormalizer=vo,e.buildDayRanges=Bs,e.buildDayTableModel=ps,e.buildEventApis=Bn,e.buildEventRangeKey=bn,e.buildHashFromArray=function(e,t){for(var n={},r=0;r<e.length;r++){var o=t(e[r],r);n[o[0]]=o[1]}return n},e.buildNavLinkData=gr,e.buildSegCompareObj=vn,e.buildSegTimeText=En,e.buildSlatMetas=bs,e.buildTimeColsModel=qs,e.collectFromHash=Fe,e.combineEventUis=Vt,e.compareByFieldSpec=se,e.compareByFieldSpecs=ae,e.compareNumbers=ce,e.compareObjs=Ve,e.computeEdges=br,e.computeFallbackHeaderFormat=Ci,e.computeHeightAndMargins=function(e){return e.getBoundingClientRect().height+function(e){var t=window.getComputedStyle(e);return parseInt(t.marginTop,10)+parseInt(t.marginBottom,10)}(e)},e.computeInnerRect=Cr,e.computeRect=wr,e.computeSegDraggable=gn,e.computeSegEndResizable=yn,e.computeSegStartResizable=mn,e.computeShrinkWidth=Wi,e.computeSmallestCellWidth=pe,e.computeVisibleDayRange=Jt,e.config=di,e.constrainPoint=sr,e.createContext=Lr,e.createDuration=Ye,e.createElement=Hr,e.createEmptyEventStore=Ht,e.createEventInstance=Ie,e.createEventUi=Wt,e.createFormatter=St,e.createPlugin=io,e.createRef=Ar,e.diffDates=Qt,e.diffDayAndTime=Ee,e.diffDays=ye,e.diffPoints=ur,e.diffWeeks=me,e.diffWholeDays=De,e.diffWholeWeeks=Se,e.disableCursor=Q,e.elementClosest=V,e.elementMatches=z,e.enableCursor=ee,e.eventTupleToStore=Pt,e.filterEventStoreDefs=At,e.filterHash=He,e.findDirectChildren=function(e,t){for(var n=e instanceof HTMLElement?[e]:e,r=[],o=0;o<n.length;o++)for(var i=n[o].children,a=0;a<i.length;a++){var s=i[a];t&&!z(s,t)||r.push(s)}return r},e.findElements=F,e.flexibleCompare=le,e.flushToDom=Wr,e.formatDate=function(e,t){void 0===t&&(t={});var n=tr(t),r=St(t),o=n.createMarkerMeta(e);return o?n.format(o.marker,r,{forcedTzo:o.forcedTzo}):""},e.formatDayString=tt,e.formatIsoTimeString=nt,e.formatRange=function(e,t,n){var r=tr("object"==typeof n&&n?n:{}),o=St(n),i=r.createMarkerMeta(e),a=r.createMarkerMeta(t);return i&&a?r.formatRange(i.marker,a.marker,o,{forcedStartTzo:i.forcedTzo,forcedEndTzo:a.forcedTzo,isEndExclusive:n.isEndExclusive,defaultSeparator:bt.defaultRangeSeparator}):""},e.getAllowYScrolling=zi,e.getCanVGrowWithinCell=cr,e.getClippingParents=Rr,e.getDateMeta=hr,e.getDayClassNames=vr,e.getDefaultEventEnd=In,e.getElSeg=dn,e.getEventClassNames=Dn,e.getIsRtlScrollbarOnLeft=Er,e.getRectCenter=lr,e.getRelevantEvents=Nt,e.getScrollGridClassNames=Yi,e.getScrollbarWidths=Sr,e.getSectionClassNames=Zi,e.getSectionHasLiquidHeight=Vi,e.getSegMeta=Sn,e.getSlotClassNames=function(e,t){var n=["fc-slot","fc-slot-"+fe[e.dow]];return e.isDisabled?n.push("fc-slot-disabled"):(e.isToday&&(n.push("fc-slot-today"),n.push(t.getClass("today"))),e.isPast&&n.push("fc-slot-past"),e.isFuture&&n.push("fc-slot-future")),n},e.getStickyFooterScrollbar=Ji,e.getStickyHeaderDates=Ki,e.getUnequalProps=We,e.globalLocales=Kn,e.globalPlugins=Fo,e.greatestDurationDenominator=et,e.guid=$,e.hasBgRendering=un,e.hasShrinkWidth=qi,e.identity=_t,e.interactionSettingsStore=ui,e.interactionSettingsToStore=li,e.intersectRanges=nn,e.intersectRects=ar,e.isArraysEqual=ot,e.isColPropsEqual=Bi,e.isDateSpansEqual=Rn,e.isInt=de,e.isInteractionValid=Jr,e.isMultiDayRange=$t,e.isPropsEqual=Le,e.isPropsValid=Qr,e.isValidDate=xe,e.listenBySelector=Z,e.mapHash=Oe,e.memoize=it,e.memoizeArraylike=function(e,t,n){var r=[],o=[];return function(i){for(var a=r.length,s=i.length,l=0;l<a;l++)if(i[l]){if(!ot(r[l],i[l])){n&&n(o[l]);var u=e.apply(this,i[l]);t&&t(u,o[l])||(o[l]=u)}}else n&&n(o[l]);for(;l<s;l++)o[l]=e.apply(this,i[l]);return r=i,o.splice(s),o}},e.memoizeHashlike=function(e,t,n){var r={},o={};return function(i){var a={};for(var s in i)if(o[s])if(ot(r[s],i[s]))a[s]=o[s];else{n&&n(o[s]);var l=e.apply(this,i[s]);a[s]=t&&t(l,o[s])?o[s]:l}else a[s]=e.apply(this,i[s]);return r=i,o=a,a}},e.memoizeObjArg=at,e.mergeEventStores=Ot,e.multiplyDuration=Ke,e.padStart=ue,e.parseBusinessHours=or,e.parseClassNames=Ut,e.parseDragMeta=fi,e.parseEventDef=Xt,e.parseFieldSpecs=ie,e.parseMarker=Zn,e.pointInsideRect=ir,e.preventContextMenu=re,e.preventDefault=q,e.preventSelection=te,e.rangeContainsMarker=sn,e.rangeContainsRange=an,e.rangesEqual=rn,e.rangesIntersect=on,e.refineEventDef=Yt,e.refineProps=xt,e.removeElement=W,e.removeExact=function(e,t){for(var n=0,r=0;r<e.length;)e[r]===t?(e.splice(r,1),n++):r++;return n},e.render=Or,e.renderChunkContent=Fi,e.renderFill=sa,e.renderMicroColGroup=ji,e.renderScrollShim=Xi,e.requestJson=Wo,e.sanitizeShrinkWidth=Gi,e.setElSeg=cn,e.setRef=Yr,e.sliceEventStore=ln,e.sliceEvents=function(e,t){return ln(e.eventStore,e.eventUiBases,e.dateProfile.activeRange,t?e.nextDayThreshold:null).fg},e.sortEventSegs=hn,e.startOfDay=be,e.translateRect=function(e,t,n){return{left:e.left+t,right:e.right+t,top:e.top+n,bottom:e.bottom+n}},e.triggerDateSelect=xn,e.unpromisify=Tr,e.version="5.3.2",e.whenTransitionDone=K,e.wholeDivideDurations=Qe,e}({});

// plugin locales-all.min.js
[].push.apply(FullCalendar.globalLocales,function(){"use strict";return[{code:"af",week:{dow:1,doy:4},buttonText:{prev:"Vorige",next:"Volgende",today:"Vandag",year:"Jaar",month:"Maand",week:"Week",day:"Dag",list:"Agenda"},allDayText:"Heeldag",moreLinkText:"Addisionele",noEventsText:"Daar is geen gebeurtenisse nie"},{code:"ar-dz",week:{dow:0,doy:4},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar-kw",week:{dow:0,doy:12},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar-ly",week:{dow:6,doy:12},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar-ma",week:{dow:6,doy:12},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar-sa",week:{dow:0,doy:6},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar-tn",week:{dow:1,doy:4},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"ar",week:{dow:6,doy:12},direction:"rtl",buttonText:{prev:"السابق",next:"التالي",today:"اليوم",month:"شهر",week:"أسبوع",day:"يوم",list:"أجندة"},weekText:"أسبوع",allDayText:"اليوم كله",moreLinkText:"أخرى",noEventsText:"أي أحداث لعرض"},{code:"az",week:{dow:1,doy:4},buttonText:{prev:"Əvvəl",next:"Sonra",today:"Bu Gün",month:"Ay",week:"Həftə",day:"Gün",list:"Gündəm"},weekText:"Həftə",allDayText:"Bütün Gün",moreLinkText:function(e){return"+ daha çox "+e},noEventsText:"Göstərmək üçün hadisə yoxdur"},{code:"bg",week:{dow:1,doy:7},buttonText:{prev:"назад",next:"напред",today:"днес",month:"Месец",week:"Седмица",day:"Ден",list:"График"},allDayText:"Цял ден",moreLinkText:function(e){return"+още "+e},noEventsText:"Няма събития за показване"},{code:"bs",week:{dow:1,doy:7},buttonText:{prev:"Prošli",next:"Sljedeći",today:"Danas",month:"Mjesec",week:"Sedmica",day:"Dan",list:"Raspored"},weekText:"Sed",allDayText:"Cijeli dan",moreLinkText:function(e){return"+ još "+e},noEventsText:"Nema događaja za prikazivanje"},{code:"ca",week:{dow:1,doy:4},buttonText:{prev:"Anterior",next:"Següent",today:"Avui",month:"Mes",week:"Setmana",day:"Dia",list:"Agenda"},weekText:"Set",allDayText:"Tot el dia",moreLinkText:"més",noEventsText:"No hi ha esdeveniments per mostrar"},{code:"cs",week:{dow:1,doy:4},buttonText:{prev:"Dříve",next:"Později",today:"Nyní",month:"Měsíc",week:"Týden",day:"Den",list:"Agenda"},weekText:"Týd",allDayText:"Celý den",moreLinkText:function(e){return"+další: "+e},noEventsText:"Žádné akce k zobrazení"},{code:"da",week:{dow:1,doy:4},buttonText:{prev:"Forrige",next:"Næste",today:"I dag",month:"Måned",week:"Uge",day:"Dag",list:"Agenda"},weekText:"Uge",allDayText:"Hele dagen",moreLinkText:"flere",noEventsText:"Ingen arrangementer at vise"},{code:"de",week:{dow:1,doy:4},buttonText:{prev:"Zurück",next:"Vor",today:"Heute",year:"Jahr",month:"Monat",week:"Woche",day:"Tag",list:"Terminübersicht"},weekText:"KW",allDayText:"Ganztägig",moreLinkText:function(e){return"+ weitere "+e},noEventsText:"Keine Ereignisse anzuzeigen"},{code:"el",week:{dow:1,doy:4},buttonText:{prev:"Προηγούμενος",next:"Επόμενος",today:"Σήμερα",month:"Μήνας",week:"Εβδομάδα",day:"Ημέρα",list:"Ατζέντα"},weekText:"Εβδ",allDayText:"Ολοήμερο",moreLinkText:"περισσότερα",noEventsText:"Δεν υπάρχουν γεγονότα προς εμφάνιση"},{code:"en-au",week:{dow:1,doy:4}},{code:"en-gb",week:{dow:1,doy:4}},{code:"en-nz",week:{dow:1,doy:4}},{code:"es",week:{dow:0,doy:6},buttonText:{prev:"Ant",next:"Sig",today:"Hoy",month:"Mes",week:"Semana",day:"Día",list:"Agenda"},weekText:"Sm",allDayText:"Todo el día",moreLinkText:"más",noEventsText:"No hay eventos para mostrar"},{code:"es",week:{dow:1,doy:4},buttonText:{prev:"Ant",next:"Sig",today:"Hoy",month:"Mes",week:"Semana",day:"Día",list:"Agenda"},weekText:"Sm",allDayText:"Todo el día",moreLinkText:"más",noEventsText:"No hay eventos para mostrar"},{code:"et",week:{dow:1,doy:4},buttonText:{prev:"Eelnev",next:"Järgnev",today:"Täna",month:"Kuu",week:"Nädal",day:"Päev",list:"Päevakord"},weekText:"näd",allDayText:"Kogu päev",moreLinkText:function(e){return"+ veel "+e},noEventsText:"Kuvamiseks puuduvad sündmused"},{code:"eu",week:{dow:1,doy:7},buttonText:{prev:"Aur",next:"Hur",today:"Gaur",month:"Hilabetea",week:"Astea",day:"Eguna",list:"Agenda"},weekText:"As",allDayText:"Egun osoa",moreLinkText:"gehiago",noEventsText:"Ez dago ekitaldirik erakusteko"},{code:"fa",week:{dow:6,doy:12},direction:"rtl",buttonText:{prev:"قبلی",next:"بعدی",today:"امروز",month:"ماه",week:"هفته",day:"روز",list:"برنامه"},weekText:"هف",allDayText:"تمام روز",moreLinkText:function(e){return"بیش از "+e},noEventsText:"هیچ رویدادی به نمایش"},{code:"fi",week:{dow:1,doy:4},buttonText:{prev:"Edellinen",next:"Seuraava",today:"Tänään",month:"Kuukausi",week:"Viikko",day:"Päivä",list:"Tapahtumat"},weekText:"Vk",allDayText:"Koko päivä",moreLinkText:"lisää",noEventsText:"Ei näytettäviä tapahtumia"},{code:"fr",buttonText:{prev:"Précédent",next:"Suivant",today:"Aujourd'hui",year:"Année",month:"Mois",week:"Semaine",day:"Jour",list:"Mon planning"},weekText:"Sem.",allDayText:"Toute la journée",moreLinkText:"en plus",noEventsText:"Aucun événement à afficher"},{code:"fr-ch",week:{dow:1,doy:4},buttonText:{prev:"Précédent",next:"Suivant",today:"Courant",year:"Année",month:"Mois",week:"Semaine",day:"Jour",list:"Mon planning"},weekText:"Sm",allDayText:"Toute la journée",moreLinkText:"en plus",noEventsText:"Aucun événement à afficher"},{code:"fr",week:{dow:1,doy:4},buttonText:{prev:"Précédent",next:"Suivant",today:"Aujourd'hui",year:"Année",month:"Mois",week:"Semaine",day:"Jour",list:"Planning"},weekText:"Sem.",allDayText:"Toute la journée",moreLinkText:"en plus",noEventsText:"Aucun événement à afficher"},{code:"gl",week:{dow:1,doy:4},buttonText:{prev:"Ant",next:"Seg",today:"Hoxe",month:"Mes",week:"Semana",day:"Día",list:"Axenda"},weekText:"Sm",allDayText:"Todo o día",moreLinkText:"máis",noEventsText:"Non hai eventos para amosar"},{code:"he",direction:"rtl",buttonText:{prev:"הקודם",next:"הבא",today:"היום",month:"חודש",week:"שבוע",day:"יום",list:"סדר יום"},allDayText:"כל היום",moreLinkText:"אחר",noEventsText:"אין אירועים להצגה",weekText:"שבוע"},{code:"hi",week:{dow:0,doy:6},buttonText:{prev:"पिछला",next:"अगला",today:"आज",month:"महीना",week:"सप्ताह",day:"दिन",list:"कार्यसूची"},weekText:"हफ्ता",allDayText:"सभी दिन",moreLinkText:function(e){return"+अधिक "+e},noEventsText:"कोई घटनाओं को प्रदर्शित करने के लिए"},{code:"hr",week:{dow:1,doy:7},buttonText:{prev:"Prijašnji",next:"Sljedeći",today:"Danas",month:"Mjesec",week:"Tjedan",day:"Dan",list:"Raspored"},weekText:"Tje",allDayText:"Cijeli dan",moreLinkText:function(e){return"+ još "+e},noEventsText:"Nema događaja za prikaz"},{code:"hu",week:{dow:1,doy:4},buttonText:{prev:"vissza",next:"előre",today:"ma",month:"Hónap",week:"Hét",day:"Nap",list:"Napló"},weekText:"Hét",allDayText:"Egész nap",moreLinkText:"további",noEventsText:"Nincs megjeleníthető esemény"},{code:"id",week:{dow:1,doy:7},buttonText:{prev:"mundur",next:"maju",today:"hari ini",month:"Bulan",week:"Minggu",day:"Hari",list:"Agenda"},weekText:"Mg",allDayText:"Sehari penuh",moreLinkText:"lebih",noEventsText:"Tidak ada acara untuk ditampilkan"},{code:"is",week:{dow:1,doy:4},buttonText:{prev:"Fyrri",next:"Næsti",today:"Í dag",month:"Mánuður",week:"Vika",day:"Dagur",list:"Dagskrá"},weekText:"Vika",allDayText:"Allan daginn",moreLinkText:"meira",noEventsText:"Engir viðburðir til að sýna"},{code:"it",week:{dow:1,doy:4},buttonText:{prev:"Prec",next:"Succ",today:"Oggi",month:"Mese",week:"Settimana",day:"Giorno",list:"Agenda"},weekText:"Sm",allDayText:"Tutto il giorno",moreLinkText:function(e){return"+altri "+e},noEventsText:"Non ci sono eventi da visualizzare"},{code:"ja",buttonText:{prev:"前",next:"次",today:"今日",month:"月",week:"週",day:"日",list:"予定リスト"},weekText:"週",allDayText:"終日",moreLinkText:function(e){return"他 "+e+" 件"},noEventsText:"表示する予定はありません"},{code:"ka",week:{dow:1,doy:7},buttonText:{prev:"წინა",next:"შემდეგი",today:"დღეს",month:"თვე",week:"კვირა",day:"დღე",list:"დღის წესრიგი"},weekText:"კვ",allDayText:"მთელი დღე",moreLinkText:function(e){return"+ კიდევ "+e},noEventsText:"ღონისძიებები არ არის"},{code:"kk",week:{dow:1,doy:7},buttonText:{prev:"Алдыңғы",next:"Келесі",today:"Бүгін",month:"Ай",week:"Апта",day:"Күн",list:"Күн тәртібі"},weekText:"Не",allDayText:"Күні бойы",moreLinkText:function(e){return"+ тағы "+e},noEventsText:"Көрсету үшін оқиғалар жоқ"},{code:"ko",buttonText:{prev:"이전달",next:"다음달",today:"오늘",month:"월",week:"주",day:"일",list:"일정목록"},weekText:"주",allDayText:"종일",moreLinkText:"개",noEventsText:"일정이 없습니다"},{code:"lb",week:{dow:1,doy:4},buttonText:{prev:"Zréck",next:"Weider",today:"Haut",month:"Mount",week:"Woch",day:"Dag",list:"Terminiwwersiicht"},weekText:"W",allDayText:"Ganzen Dag",moreLinkText:"méi",noEventsText:"Nee Evenementer ze affichéieren"},{code:"lt",week:{dow:1,doy:4},buttonText:{prev:"Atgal",next:"Pirmyn",today:"Šiandien",month:"Mėnuo",week:"Savaitė",day:"Diena",list:"Darbotvarkė"},weekText:"SAV",allDayText:"Visą dieną",moreLinkText:"daugiau",noEventsText:"Nėra įvykių rodyti"},{code:"lv",week:{dow:1,doy:4},buttonText:{prev:"Iepr.",next:"Nāk.",today:"Šodien",month:"Mēnesis",week:"Nedēļa",day:"Diena",list:"Dienas kārtība"},weekText:"Ned.",allDayText:"Visu dienu",moreLinkText:function(e){return"+vēl "+e},noEventsText:"Nav notikumu"},{code:"mk",buttonText:{prev:"претходно",next:"следно",today:"Денес",month:"Месец",week:"Недела",day:"Ден",list:"График"},weekText:"Сед",allDayText:"Цел ден",moreLinkText:function(e){return"+повеќе "+e},noEventsText:"Нема настани за прикажување"},{code:"ms",week:{dow:1,doy:7},buttonText:{prev:"Sebelum",next:"Selepas",today:"hari ini",month:"Bulan",week:"Minggu",day:"Hari",list:"Agenda"},weekText:"Mg",allDayText:"Sepanjang hari",moreLinkText:function(e){return"masih ada "+e+" acara"},noEventsText:"Tiada peristiwa untuk dipaparkan"},{code:"nb",week:{dow:1,doy:4},buttonText:{prev:"Forrige",next:"Neste",today:"I dag",month:"Måned",week:"Uke",day:"Dag",list:"Agenda"},weekText:"Uke",allDayText:"Hele dagen",moreLinkText:"til",noEventsText:"Ingen hendelser å vise"},{code:"ne",week:{dow:7,doy:1},buttonText:{prev:"अघिल्लो",next:"अर्को",today:"आज",month:"महिना",week:"हप्ता",day:"दिन",list:"सूची"},weekText:"हप्ता",allDayText:"दिनभरि",moreLinkText:"थप लिंक",noEventsText:"देखाउनको लागि कुनै घटनाहरू छैनन्"},{code:"nl",week:{dow:1,doy:4},buttonText:{prev:"Voorgaand",next:"Volgende",today:"Vandaag",year:"Jaar",month:"Maand",week:"Week",day:"Dag",list:"Agenda"},allDayText:"Hele dag",moreLinkText:"extra",noEventsText:"Geen evenementen om te laten zien"},{code:"nn",week:{dow:1,doy:4},buttonText:{prev:"Førre",next:"Neste",today:"I dag",month:"Månad",week:"Veke",day:"Dag",list:"Agenda"},weekText:"Veke",allDayText:"Heile dagen",moreLinkText:"til",noEventsText:"Ingen hendelser å vise"},{code:"pl",week:{dow:1,doy:4},buttonText:{prev:"Poprzedni",next:"Następny",today:"Dziś",month:"Miesiąc",week:"Tydzień",day:"Dzień",list:"Plan dnia"},weekText:"Tydz",allDayText:"Cały dzień",moreLinkText:"więcej",noEventsText:"Brak wydarzeń do wyświetlenia"},{code:"pt-br",buttonText:{prev:"Anterior",next:"Próximo",today:"Hoje",month:"Mês",week:"Semana",day:"Dia",list:"Lista"},weekText:"Sm",allDayText:"dia inteiro",moreLinkText:function(e){return"mais +"+e},noEventsText:"Não há eventos para mostrar"},{code:"pt",week:{dow:1,doy:4},buttonText:{prev:"Anterior",next:"Seguinte",today:"Hoje",month:"Mês",week:"Semana",day:"Dia",list:"Agenda"},weekText:"Sem",allDayText:"Todo o dia",moreLinkText:"mais",noEventsText:"Não há eventos para mostrar"},{code:"ro",week:{dow:1,doy:7},buttonText:{prev:"precedentă",next:"următoare",today:"Azi",month:"Lună",week:"Săptămână",day:"Zi",list:"Agendă"},weekText:"Săpt",allDayText:"Toată ziua",moreLinkText:function(e){return"+alte "+e},noEventsText:"Nu există evenimente de afișat"},{code:"ru",week:{dow:1,doy:4},buttonText:{prev:"Пред",next:"След",today:"Сегодня",month:"Месяц",week:"Неделя",day:"День",list:"Повестка дня"},weekText:"Нед",allDayText:"Весь день",moreLinkText:function(e){return"+ ещё "+e},noEventsText:"Нет событий для отображения"},{code:"sk",week:{dow:1,doy:4},buttonText:{prev:"Predchádzajúci",next:"Nasledujúci",today:"Dnes",month:"Mesiac",week:"Týždeň",day:"Deň",list:"Rozvrh"},weekText:"Ty",allDayText:"Celý deň",moreLinkText:function(e){return"+ďalšie: "+e},noEventsText:"Žiadne akcie na zobrazenie"},{code:"sl",week:{dow:1,doy:7},buttonText:{prev:"Prejšnji",next:"Naslednji",today:"Trenutni",month:"Mesec",week:"Teden",day:"Dan",list:"Dnevni red"},weekText:"Teden",allDayText:"Ves dan",moreLinkText:"več",noEventsText:"Ni dogodkov za prikaz"},{code:"sq",week:{dow:1,doy:4},buttonText:{prev:"mbrapa",next:"Përpara",today:"sot",month:"Muaj",week:"Javë",day:"Ditë",list:"Listë"},weekText:"Ja",allDayText:"Gjithë ditën",moreLinkText:function(e){return"+më tepër "+e},noEventsText:"Nuk ka evente për të shfaqur"},{code:"sr-cyrl",week:{dow:1,doy:7},buttonText:{prev:"Претходна",next:"следећи",today:"Данас",month:"Месец",week:"Недеља",day:"Дан",list:"Планер"},weekText:"Сед",allDayText:"Цео дан",moreLinkText:function(e){return"+ још "+e},noEventsText:"Нема догађаја за приказ"},{code:"sr",week:{dow:1,doy:7},buttonText:{prev:"Prethodna",next:"Sledeći",today:"Danas",month:"Mеsеc",week:"Nеdеlja",day:"Dan",list:"Planеr"},weekText:"Sed",allDayText:"Cеo dan",moreLinkText:function(e){return"+ još "+e},noEventsText:"Nеma događaja za prikaz"},{code:"sv",week:{dow:1,doy:4},buttonText:{prev:"Förra",next:"Nästa",today:"Idag",month:"Månad",week:"Vecka",day:"Dag",list:"Program"},weekText:"v.",allDayText:"Heldag",moreLinkText:"till",noEventsText:"Inga händelser att visa"},{code:"th",week:{dow:1,doy:4},buttonText:{prev:"ก่อนหน้า",next:"ถัดไป",prevYear:"ปีก่อนหน้า",nextYear:"ปีถัดไป",year:"ปี",today:"วันนี้",month:"เดือน",week:"สัปดาห์",day:"วัน",list:"กำหนดการ"},weekText:"สัปดาห์",allDayText:"ตลอดวัน",moreLinkText:"เพิ่มเติม",noEventsText:"ไม่มีกิจกรรมที่จะแสดง"},{code:"tr",week:{dow:1,doy:7},buttonText:{prev:"geri",next:"ileri",today:"bugün",month:"Ay",week:"Hafta",day:"Gün",list:"Ajanda"},weekText:"Hf",allDayText:"Tüm gün",moreLinkText:"daha fazla",noEventsText:"Gösterilecek etkinlik yok"},{code:"ug",buttonText:{month:"ئاي",week:"ھەپتە",day:"كۈن",list:"كۈنتەرتىپ"},allDayText:"پۈتۈن كۈن"},{code:"uk",week:{dow:1,doy:7},buttonText:{prev:"Попередній",next:"далі",today:"Сьогодні",month:"Місяць",week:"Тиждень",day:"День",list:"Порядок денний"},weekText:"Тиж",allDayText:"Увесь день",moreLinkText:function(e){return"+ще "+e+"..."},noEventsText:"Немає подій для відображення"},{code:"uz",buttonText:{month:"Oy",week:"Xafta",day:"Kun",list:"Kun tartibi"},allDayText:"Kun bo'yi",moreLinkText:function(e){return"+ yana "+e},noEventsText:"Ko'rsatish uchun voqealar yo'q"},{code:"vi",week:{dow:1,doy:4},buttonText:{prev:"Trước",next:"Tiếp",today:"Hôm nay",month:"Tháng",week:"Tuần",day:"Ngày",list:"Lịch biểu"},weekText:"Tu",allDayText:"Cả ngày",moreLinkText:function(e){return"+ thêm "+e},noEventsText:"Không có sự kiện để hiển thị"},{code:"zh-cn",week:{dow:1,doy:4},buttonText:{prev:"上月",next:"下月",today:"今天",month:"月",week:"周",day:"日",list:"日程"},weekText:"周",allDayText:"全天",moreLinkText:function(e){return"另外 "+e+" 个"},noEventsText:"没有事件显示"},{code:"zh-tw",buttonText:{prev:"上月",next:"下月",today:"今天",month:"月",week:"週",day:"天",list:"活動列表"},weekText:"周",allDayText:"整天",moreLinkText:"顯示更多",noEventsText:"没有任何活動"}]}());

/* module mediumColor */
// function on
jQuery(document).ready(function() {
	mediumColorInit();
});

// function init
// more options and example https://habr.com/ru/post/419309/ or https://github.com/fast-average-color/fast-average-color#getcolorasyncresource-callback-options
function mediumColorInit() {
	fac = new FastAverageColor(),
		container = document.querySelectorAll('.image-mediumColor1');
	container.forEach(function(el) {
		fac.getColorAsync(el.querySelector('img')).then(function(color) {
			el.style.backgroundColor = color.rgba;
			el.style.color = color.isDark ? '#fff' : '#000';
		}).catch(function(e) {
			console.log(e);
		});
	})
}

/*! Fast Average Color | © 2020 Denis Seleznev | MIT License | https://github.com/fast-average-color/fast-average-color */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).FastAverageColor=e()}(this,function(){"use strict";function n(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _(t,e,r){return t[e]===r[0]&&t[e+1]===r[1]&&t[e+2]===r[2]&&t[e+3]===r[3]}function s(t,e,r){for(var o={},n=r.ignoredColor,i=0;i<e;i+=r.step){var a=t[i],s=t[i+1],u=t[i+2],c=t[i+3];if(!n||!_(t,i,n)){var h=Math.round(a/24)+","+Math.round(s/24)+","+Math.round(u/24);o[h]?o[h]=[o[h][0]+a*c,o[h][1]+s*c,o[h][2]+u*c,o[h][3]+c,o[h][4]+1]:o[h]=[a*c,s*c,u*c,c,1]}}var d=Object.keys(o).map(function(t){return o[t]}).sort(function(t,e){var r=t[4],o=e[4];return o<r?-1:r===o?0:1})[0],l=d[0],f=d[1],g=d[2],v=d[3],p=d[4];return v?[Math.round(l/v),Math.round(f/v),Math.round(g/v),Math.round(v/p)]:r.defaultColor}function u(t,e,r){for(var o=0,n=0,i=0,a=0,s=0,u=r.ignoredColor,c=0;c<e;c+=r.step){var h=t[c+3],d=t[c]*h,l=t[c+1]*h,f=t[c+2]*h;u&&_(t,c,u)||(o+=d,n+=l,i+=f,a+=h,s++)}return a?[Math.round(o/a),Math.round(n/a),Math.round(i/a),Math.round(a/s)]:r.defaultColor}function c(t,e,r){for(var o=0,n=0,i=0,a=0,s=0,u=r.ignoredColor,c=0;c<e;c+=r.step){var h=t[c],d=t[c+1],l=t[c+2],f=t[c+3];u&&_(t,c,u)||(o+=h*h*f,n+=d*d*f,i+=l*l*f,a+=f,s++)}return a?[Math.round(Math.sqrt(o/a)),Math.round(Math.sqrt(n/a)),Math.round(Math.sqrt(i/a)),Math.round(a/s)]:r.defaultColor}var h="FastAverageColor: ";return function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,o;return e=t,(r=[{key:"getColorAsync",value:function(t,e){if(t){if("string"==typeof t){var r=new Image;return r.src=t,this._bindImageEvents(r,e)}if(t.complete){var o=this.getColor(t,e);return o.error?Promise.reject(o.error):Promise.resolve(o)}return this._bindImageEvents(t,e)}return Promise.reject(Error("".concat(h,"call .getColorAsync() without resource.")))}},{key:"getColor",value:function(e,r){r=r||{};var t=this._getDefaultColor(r),o=t;if(!e)return this._outputError(r,"call .getColor(null) without resource."),this._prepareResult(t);var n=this._getOriginalSize(e),i=this._prepareSizeAndPosition(n,r);if(!(i.srcWidth&&i.srcHeight&&i.destWidth&&i.destHeight))return this._outputError(r,'incorrect sizes for resource "'.concat(e.src,'".')),this._prepareResult(t);if(!this._ctx&&(this._canvas=this._makeCanvas(),this._ctx=this._canvas.getContext&&this._canvas.getContext("2d"),!this._ctx))return this._outputError(r,"Canvas Context 2D is not supported in this browser."),this._prepareResult(t);this._canvas.width=i.destWidth,this._canvas.height=i.destHeight;try{this._ctx.clearRect(0,0,i.destWidth,i.destHeight),this._ctx.drawImage(e,i.srcLeft,i.srcTop,i.srcWidth,i.srcHeight,0,0,i.destWidth,i.destHeight);var a=this._ctx.getImageData(0,0,i.destWidth,i.destHeight).data;o=this.getColorFromArray4(a,r)}catch(t){this._outputError(r,"security error (CORS) for resource ".concat(e.src,".\nDetails: https://developer.mozilla.org/en/docs/Web/HTML/CORS_enabled_image"),t)}return this._prepareResult(o)}},{key:"getColorFromArray4",value:function(t,e){e=e||{};var r=t.length,o=this._getDefaultColor(e);if(r<4)return o;var n,i=r-r%4,a=4*(e.step||1);switch(e.algorithm||"sqrt"){case"simple":n=u;break;case"sqrt":n=c;break;case"dominant":n=s;break;default:throw Error("".concat(h).concat(e.algorithm," is unknown algorithm."))}return n(t,i,{defaultColor:o,ignoredColor:e.ignoredColor,step:a})}},{key:"destroy",value:function(){delete this._canvas,delete this._ctx}},{key:"_getDefaultColor",value:function(t){return this._getOption(t,"defaultColor",[0,0,0,0])}},{key:"_getOption",value:function(t,e,r){return void 0===t[e]?r:t[e]}},{key:"_prepareSizeAndPosition",value:function(t,e){var r=this._getOption(e,"left",0),o=this._getOption(e,"top",0),n=this._getOption(e,"width",t.width),i=this._getOption(e,"height",t.height),a=n,s=i;if("precision"===e.mode)return{srcLeft:r,srcTop:o,srcWidth:n,srcHeight:i,destWidth:a,destHeight:s};var u;return i<n?(u=n/i,a=100,s=Math.round(a/u)):(u=i/n,s=100,a=Math.round(s/u)),(n<a||i<s||a<10||s<10)&&(a=n,s=i),{srcLeft:r,srcTop:o,srcWidth:n,srcHeight:i,destWidth:a,destHeight:s}}},{key:"_bindImageEvents",value:function(a,s){var u=this;return new Promise(function(e,r){function t(){i();var t=u.getColor(a,s);t.error?r(t.error):e(t)}function o(){i(),r(Error("".concat(h,"Error loading image ").concat(a.src,".")))}function n(){i(),r(Error("".concat(h,'Image "').concat(a.src,'" loading aborted.')))}var i=function(){a.removeEventListener("load",t),a.removeEventListener("error",o),a.removeEventListener("abort",n)};a.addEventListener("load",t),a.addEventListener("error",o),a.addEventListener("abort",n)})}},{key:"_prepareResult",value:function(t){var e=t.slice(0,3),r=[].concat(e,t[3]/255),o=this._isDark(t);return{value:t,rgb:"rgb("+e.join(",")+")",rgba:"rgba("+r.join(",")+")",hex:this._arrayToHex(e),hexa:this._arrayToHex(t),isDark:o,isLight:!o}}},{key:"_getOriginalSize",value:function(t){return t instanceof HTMLImageElement?{width:t.naturalWidth,height:t.naturalHeight}:t instanceof HTMLVideoElement?{width:t.videoWidth,height:t.videoHeight}:{width:t.width,height:t.height}}},{key:"_toHex",value:function(t){var e=t.toString(16);return 1===e.length?"0"+e:e}},{key:"_arrayToHex",value:function(t){return"#"+t.map(this._toHex).join("")}},{key:"_isDark",value:function(t){return(299*t[0]+587*t[1]+114*t[2])/1e3<128}},{key:"_makeCanvas",value:function(){return"undefined"==typeof window?new OffscreenCanvas(1,1):document.createElement("canvas")}},{key:"_outputError",value:function(t,e,r){t.silent||(console.error("".concat(h).concat(e)),r&&console.error(r))}}])&&n(e.prototype,r),o&&n(e,o),t}()});

/* module parsleyValidateForm */
// function on
jQuery(document).ready(function() {
	parsleyValidateFormInit();
});
// function init
//  more option https://parsleyjs.org/doc/index.html and https://devhints.io/parsley
function parsleyValidateFormInit() {
	$('.form-parsley').parsley({
		maxlength: 6,
		minlength: 3,
	});
}

// plugin parsley.min.js v2.9.2
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):(t=t||self).parsley=e(t.jQuery)}(this,function(h){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t}).apply(this,arguments)}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var i=[],r=!0,n=!1,s=void 0;try{for(var a,o=t[Symbol.iterator]();!(r=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);r=!0);}catch(t){n=!0,s=t}finally{try{r||null==o.return||o.return()}finally{if(n)throw s}}return i}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var t=1,e={},d={attr:function(t,e,i){var r,n,s,a=new RegExp("^"+e,"i");if(void 0===i)i={};else for(r in i)i.hasOwnProperty(r)&&delete i[r];if(!t)return i;for(r=(s=t.attributes).length;r--;)(n=s[r])&&n.specified&&a.test(n.name)&&(i[this.camelize(n.name.slice(e.length))]=this.deserializeValue(n.value));return i},checkAttr:function(t,e,i){return t.hasAttribute(e+i)},setAttr:function(t,e,i,r){t.setAttribute(this.dasherize(e+i),String(r))},getType:function(t){return t.getAttribute("type")||"text"},generateID:function(){return""+t++},deserializeValue:function(e){var t;try{return e?"true"==e||"false"!=e&&("null"==e?null:isNaN(t=Number(e))?/^[\[\{]/.test(e)?JSON.parse(e):e:t):e}catch(t){return e}},camelize:function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},dasherize:function(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){var t;window.console&&"function"==typeof window.console.warn&&(t=window.console).warn.apply(t,arguments)},warnOnce:function(t){e[t]||(e[t]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){e={}},trimString:function(t){return t.replace(/^\s+|\s+$/g,"")},parse:{date:function(t){var e=t.match(/^(\d{4,})-(\d\d)-(\d\d)$/);if(!e)return null;var i=o(e.map(function(t){return parseInt(t,10)}),4),r=(i[0],i[1]),n=i[2],s=i[3],a=new Date(r,n-1,s);return a.getFullYear()!==r||a.getMonth()+1!==n||a.getDate()!==s?null:a},string:function(t){return t},integer:function(t){return isNaN(t)?null:parseInt(t,10)},number:function(t){if(isNaN(t))throw null;return parseFloat(t)},boolean:function(t){return!/^\s*false\s*$/i.test(t)},object:function(t){return d.deserializeValue(t)},regexp:function(t){var e="";return t=/^\/.*\/(?:[gimy]*)$/.test(t)?(e=t.replace(/.*\/([gimy]*)$/,"$1"),t.replace(new RegExp("^/(.*?)/"+e+"$"),"$1")):"^"+t+"$",new RegExp(t,e)}},parseRequirement:function(t,e){var i=this.parse[t||"string"];if(!i)throw'Unknown requirement specification: "'+t+'"';var r=i(e);if(null===r)throw"Requirement is not a ".concat(t,': "').concat(e,'"');return r},namespaceEvents:function(t,e){return(t=this.trimString(t||"").split(/\s+/))[0]?h.map(t,function(t){return"".concat(t,".").concat(e)}).join(" "):""},difference:function(t,i){var r=[];return h.each(t,function(t,e){-1==i.indexOf(e)&&r.push(e)}),r},all:function(t){return h.when.apply(h,u(t).concat([42,42]))},objectCreate:Object.create||function(t){if(1<arguments.length)throw Error("Second argument not supported");if("object"!=n(t))throw TypeError("Argument must be an object");i.prototype=t;var e=new i;return i.prototype=null,e},_SubmitSelector:'input[type="submit"], button:submit'};function i(){}function r(){this.__id__=d.generateID()}var s={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,triggerAfterFailure:"input",errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(){},errorsContainer:function(){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"};r.prototype={asyncSupport:!0,_pipeAccordingToValidationResult:function(){function t(){var t=h.Deferred();return!0!==e.validationResult&&t.reject(),t.resolve().promise()}var e=this;return[t,t]},actualizeOptions:function(){return d.attr(this.element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(t){for(var e in this.domOptions=d.objectCreate(this.parent.options),this.options=d.objectCreate(this.domOptions),t)t.hasOwnProperty(e)&&(this.options[e]=t[e]);this.actualizeOptions()},_listeners:null,on:function(t,e){return this._listeners=this._listeners||{},(this._listeners[t]=this._listeners[t]||[]).push(e),this},subscribe:function(t,e){h.listenTo(this,t.toLowerCase(),e)},off:function(t,e){var i=this._listeners&&this._listeners[t];if(i)if(e)for(var r=i.length;r--;)i[r]===e&&i.splice(r,1);else delete this._listeners[t];return this},unsubscribe:function(t){h.unsubscribeTo(this,t.toLowerCase())},trigger:function(t,e,i){e=e||this;var r,n=this._listeners&&this._listeners[t];if(n)for(var s=n.length;s--;)if(!1===(r=n[s].call(e,e,i)))return r;return!this.parent||this.parent.trigger(t,e,i)},asyncIsValid:function(t,e){return d.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),this.whenValid({group:t,force:e})},_findRelated:function(){return this.options.multiple?h(this.parent.element.querySelectorAll("[".concat(this.options.namespace,'multiple="').concat(this.options.multiple,'"]'))):this.$element}};function c(t){h.extend(!0,this,t)}c.prototype={validate:function(t,e){if(this.fn)return 3<arguments.length&&(e=[].slice.call(arguments,1,-1)),this.fn(t,e);if(Array.isArray(t)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}var i=arguments[arguments.length-1];if(this.validateDate&&i._isDateInput())return arguments[0]=d.parse.date(arguments[0]),null!==arguments[0]&&this.validateDate.apply(this,arguments);if(this.validateNumber)return!t||!isNaN(t)&&(arguments[0]=parseFloat(arguments[0]),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(t,e){if("string"!=typeof t)return Array.isArray(t)?t:[t];var i=this.requirementType;if(Array.isArray(i)){for(var r=function(t,e){var i=t.match(/^\s*\[(.*)\]\s*$/);if(!i)throw'Requirement is not an array: "'+t+'"';var r=i[1].split(",").map(d.trimString);if(r.length!==e)throw"Requirement has "+r.length+" values when "+e+" are needed";return r}(t,i.length),n=0;n<r.length;n++)r[n]=d.parseRequirement(i[n],r[n]);return r}return h.isPlainObject(i)?function(t,e,i){var r=null,n={};for(var s in t)if(s){var a=i(s);"string"==typeof a&&(a=d.parseRequirement(t[s],a)),n[s]=a}else r=d.parseRequirement(t[s],e);return[r,n]}(i,t,e):[d.parseRequirement(i,t)]},requirementType:"string",priority:2};function a(t,e){this.__class__="ValidatorRegistry",this.locale="en",this.init(t||{},e||{})}var p={email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))$/,number:/^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,date:{test:function(t){return null!==d.parse.date(t)}},url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")};p.range=p.number;function f(t){var e=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0}function m(s,a){return function(t){for(var e=arguments.length,i=new Array(1<e?e-1:0),r=1;r<e;r++)i[r-1]=arguments[r];return i.pop(),a.apply(void 0,[t].concat(u((n=s,i.map(d.parse[n])))));var n}}function g(t){return{validateDate:m("date",t),validateNumber:m("number",t),requirementType:t.length<=2?"string":["string","string"],priority:30}}a.prototype={init:function(t,e){for(var i in this.catalog=e,this.validators=l({},this.validators),t)this.addValidator(i,t[i].fn,t[i].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(t){if(void 0===this.catalog[t])throw new Error(t+" is not available in the catalog");return this.locale=t,this},addCatalog:function(t,e,i){return"object"===n(e)&&(this.catalog[t]=e),!0===i?this.setLocale(t):this},addMessage:function(t,e,i){return void 0===this.catalog[t]&&(this.catalog[t]={}),this.catalog[t][e]=i,this},addMessages:function(t,e){for(var i in e)this.addMessage(t,i,e[i]);return this},addValidator:function(t,e,i){if(this.validators[t])d.warn('Validator "'+t+'" is already defined.');else if(s.hasOwnProperty(t))return void d.warn('"'+t+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},hasValidator:function(t){return!!this.validators[t]},updateValidator:function(t,e,i){return this.validators[t]?this._setValidator.apply(this,arguments):(d.warn('Validator "'+t+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(t){return this.validators[t]||d.warn('Validator "'+t+'" is not defined.'),delete this.validators[t],this},_setValidator:function(t,e,i){for(var r in"object"!==n(e)&&(e={fn:e,priority:i}),e.validate||(e=new c(e)),(this.validators[t]=e).messages||{})this.addMessage(r,t,e.messages[r]);return this},getErrorMessage:function(t){var e;"type"===t.name?e=(this.catalog[this.locale][t.name]||{})[t.requirements]:e=this.formatMessage(this.catalog[this.locale][t.name],t.requirements);return e||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(t,e){if("object"!==n(e))return"string"==typeof t?t.replace(/%s/i,e):"";for(var i in e)t=this.formatMessage(t,e[i]);return t},validators:{notblank:{validateString:function(t){return/\S/.test(t)},priority:2},required:{validateMultiple:function(t){return 0<t.length},validateString:function(t){return/\S/.test(t)},priority:512},type:{validateString:function(t,e,i){var r=2<arguments.length&&void 0!==i?i:{},n=r.step,s=void 0===n?"any":n,a=r.base,o=void 0===a?0:a,l=p[e];if(!l)throw new Error("validator type `"+e+"` is not supported");if(!t)return!0;if(!l.test(t))return!1;if("number"===e&&!/^any$/i.test(s||"")){var u=Number(t),d=Math.max(f(s),f(o));if(f(u)>d)return!1;var h=function(t){return Math.round(t*Math.pow(10,d))};if((h(u)-h(o))%h(s)!=0)return!1}return!0},requirementType:{"":"string",step:"string",base:"number"},priority:256},pattern:{validateString:function(t,e){return!t||e.test(t)},requirementType:"regexp",priority:64},minlength:{validateString:function(t,e){return!t||t.length>=e},requirementType:"integer",priority:30},maxlength:{validateString:function(t,e){return t.length<=e},requirementType:"integer",priority:30},length:{validateString:function(t,e,i){return!t||t.length>=e&&t.length<=i},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(t,e){return t.length>=e},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(t,e){return t.length<=e},requirementType:"integer",priority:30},check:{validateMultiple:function(t,e,i){return t.length>=e&&t.length<=i},requirementType:["integer","integer"],priority:30},min:g(function(t,e){return e<=t}),max:g(function(t,e){return t<=e}),range:g(function(t,e,i){return e<=t&&t<=i}),equalto:{validateString:function(t,e){if(!t)return!0;var i=h(e);return i.length?t===i.val():t===e},priority:256},euvatin:{validateString:function(t){if(!t)return!0;return/^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/.test(t)},priority:30}}};var v={};v.Form={_actualizeTriggers:function(){var e=this;this.$element.on("submit.Parsley",function(t){e.onSubmitValidate(t)}),this.$element.on("click.Parsley",d._SubmitSelector,function(t){e.onSubmitButton(t)}),!1!==this.options.uiEnabled&&this.element.setAttribute("novalidate","")},focus:function(){if(!(this._focusedField=null)===this.validationResult||"none"===this.options.focus)return null;for(var t=0;t<this.fields.length;t++){var e=this.fields[t];if(!0!==e.validationResult&&0<e.validationResult.length&&void 0===e.options.noFocus&&(this._focusedField=e.$element,"first"===this.options.focus))break}return null===this._focusedField?null:this._focusedField.focus()},_destroyUI:function(){this.$element.off(".Parsley")}},v.Field={_reflowUI:function(){if(this._buildUI(),this._ui){var t=function t(e,i,r){for(var n=[],s=[],a=0;a<e.length;a++){for(var o=!1,l=0;l<i.length;l++)if(e[a].assert.name===i[l].assert.name){o=!0;break}o?s.push(e[a]):n.push(e[a])}return{kept:s,added:n,removed:r?[]:t(i,e,!0).added}}(this.validationResult,this._ui.lastValidationResult);this._ui.lastValidationResult=this.validationResult,this._manageStatusClass(),this._manageErrorsMessages(t),this._actualizeTriggers(),!t.kept.length&&!t.added.length||this._failedOnce||(this._failedOnce=!0,this._actualizeTriggers())}},getErrorsMessages:function(){if(!0===this.validationResult)return[];for(var t=[],e=0;e<this.validationResult.length;e++)t.push(this.validationResult[e].errorMessage||this._getErrorMessage(this.validationResult[e].assert));return t},addError:function(t,e){var i=1<arguments.length&&void 0!==e?e:{},r=i.message,n=i.assert,s=i.updateClass,a=void 0===s||s;this._buildUI(),this._addError(t,{message:r,assert:n}),a&&this._errorClass()},updateError:function(t,e){var i=1<arguments.length&&void 0!==e?e:{},r=i.message,n=i.assert,s=i.updateClass,a=void 0===s||s;this._buildUI(),this._updateError(t,{message:r,assert:n}),a&&this._errorClass()},removeError:function(t,e){var i=(1<arguments.length&&void 0!==e?e:{}).updateClass,r=void 0===i||i;this._buildUI(),this._removeError(t),r&&this._manageStatusClass()},_manageStatusClass:function(){this.hasConstraints()&&this.needsValidation()&&!0===this.validationResult?this._successClass():0<this.validationResult.length?this._errorClass():this._resetClass()},_manageErrorsMessages:function(t){if(void 0===this.options.errorsMessagesDisabled){if(void 0!==this.options.errorMessage)return t.added.length||t.kept.length?(this._insertErrorWrapper(),0===this._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&this._ui.$errorsWrapper.append(h(this.options.errorTemplate).addClass("parsley-custom-error-message")),this._ui.$errorClassHandler.attr("aria-describedby",this._ui.errorsWrapperId),this._ui.$errorsWrapper.addClass("filled").attr("aria-hidden","false").find(".parsley-custom-error-message").html(this.options.errorMessage)):(this._ui.$errorClassHandler.removeAttr("aria-describedby"),this._ui.$errorsWrapper.removeClass("filled").attr("aria-hidden","true").find(".parsley-custom-error-message").remove());for(var e=0;e<t.removed.length;e++)this._removeError(t.removed[e].assert.name);for(e=0;e<t.added.length;e++)this._addError(t.added[e].assert.name,{message:t.added[e].errorMessage,assert:t.added[e].assert});for(e=0;e<t.kept.length;e++)this._updateError(t.kept[e].assert.name,{message:t.kept[e].errorMessage,assert:t.kept[e].assert})}},_addError:function(t,e){var i=e.message,r=e.assert;this._insertErrorWrapper(),this._ui.$errorClassHandler.attr("aria-describedby",this._ui.errorsWrapperId),this._ui.$errorsWrapper.addClass("filled").attr("aria-hidden","false").append(h(this.options.errorTemplate).addClass("parsley-"+t).html(i||this._getErrorMessage(r)))},_updateError:function(t,e){var i=e.message,r=e.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-"+t).html(i||this._getErrorMessage(r))},_removeError:function(t){this._ui.$errorClassHandler.removeAttr("aria-describedby"),this._ui.$errorsWrapper.removeClass("filled").attr("aria-hidden","true").find(".parsley-"+t).remove()},_getErrorMessage:function(t){var e=t.name+"Message";return void 0!==this.options[e]?window.Parsley.formatMessage(this.options[e],t.requirements):window.Parsley.getErrorMessage(t)},_buildUI:function(){if(!this._ui&&!1!==this.options.uiEnabled){var t={};this.element.setAttribute(this.options.namespace+"id",this.__id__),t.$errorClassHandler=this._manageClassHandler(),t.errorsWrapperId="parsley-id-"+(this.options.multiple?"multiple-"+this.options.multiple:this.__id__),t.$errorsWrapper=h(this.options.errorsWrapper).attr("id",t.errorsWrapperId),t.lastValidationResult=[],t.validationInformationVisible=!1,this._ui=t}},_manageClassHandler:function(){if("string"==typeof this.options.classHandler&&h(this.options.classHandler).length)return h(this.options.classHandler);var t=this.options.classHandler;if("string"==typeof this.options.classHandler&&"function"==typeof window[this.options.classHandler]&&(t=window[this.options.classHandler]),"function"==typeof t){var e=t.call(this,this);if(void 0!==e&&e.length)return e}else{if("object"===n(t)&&t instanceof jQuery&&t.length)return t;t&&d.warn("The class handler `"+t+"` does not exist in DOM nor as a global JS function")}return this._inputHolder()},_inputHolder:function(){return this.options.multiple&&"SELECT"!==this.element.nodeName?this.$element.parent():this.$element},_insertErrorWrapper:function(){var t=this.options.errorsContainer;if(0!==this._ui.$errorsWrapper.parent().length)return this._ui.$errorsWrapper.parent();if("string"==typeof t){if(h(t).length)return h(t).append(this._ui.$errorsWrapper);"function"==typeof window[t]?t=window[t]:d.warn("The errors container `"+t+"` does not exist in DOM nor as a global JS function")}return"function"==typeof t&&(t=t.call(this,this)),"object"===n(t)&&t.length?t.append(this._ui.$errorsWrapper):this._inputHolder().after(this._ui.$errorsWrapper)},_actualizeTriggers:function(){var t,e=this,i=this._findRelated();i.off(".Parsley"),this._failedOnce?i.on(d.namespaceEvents(this.options.triggerAfterFailure,"Parsley"),function(){e._validateIfNeeded()}):(t=d.namespaceEvents(this.options.trigger,"Parsley"))&&i.on(t,function(t){e._validateIfNeeded(t)})},_validateIfNeeded:function(t){var e=this;t&&/key|input/.test(t.type)&&(!this._ui||!this._ui.validationInformationVisible)&&this.getValue().length<=this.options.validationThreshold||(this.options.debounce?(window.clearTimeout(this._debounced),this._debounced=window.setTimeout(function(){return e.validate()},this.options.debounce)):this.validate())},_resetUI:function(){this._failedOnce=!1,this._actualizeTriggers(),void 0!==this._ui&&(this._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(),this._ui.lastValidationResult=[],this._ui.validationInformationVisible=!1)},_destroyUI:function(){this._resetUI(),void 0!==this._ui&&this._ui.$errorsWrapper.remove(),delete this._ui},_successClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)},_errorClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)},_resetClass:function(){this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)}};function y(t,e,i){this.__class__="Form",this.element=t,this.$element=h(t),this.domOptions=e,this.options=i,this.parent=window.Parsley,this.fields=[],this.validationResult=null}var _={pending:null,resolved:!0,rejected:!1};y.prototype={onSubmitValidate:function(t){var e=this;if(!0!==t.parsley){var i=this._submitSource||this.$element.find(d._SubmitSelector)[0];if(this._submitSource=null,this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!0),!i||null===i.getAttribute("formnovalidate")){window.Parsley._remoteCache={};var r=this.whenValidate({event:t});"resolved"===r.state()&&!1!==this._trigger("submit")||(t.stopImmediatePropagation(),t.preventDefault(),"pending"===r.state()&&r.done(function(){e._submit(i)}))}}},onSubmitButton:function(t){this._submitSource=t.currentTarget},_submit:function(t){if(!1!==this._trigger("submit")){if(t){var e=this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!1);0===e.length&&(e=h('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),e.attr({name:t.getAttribute("name"),value:t.getAttribute("value")})}this.$element.trigger(l(h.Event("submit"),{parsley:!0}))}},validate:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={group:e[0],force:e[1],event:e[2]}}return _[this.whenValidate(t).state()]},whenValidate:function(t){var e,i=this,r=0<arguments.length&&void 0!==t?t:{},n=r.group,s=r.force,a=r.event;(this.submitEvent=a)&&(this.submitEvent=l({},a,{preventDefault:function(){d.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),i.validationResult=!1}})),this.validationResult=!0,this._trigger("validate"),this._refreshFields();var o=this._withoutReactualizingFormOptions(function(){return h.map(i.fields,function(t){return t.whenValidate({force:s,group:n})})});return(e=d.all(o).done(function(){i._trigger("success")}).fail(function(){i.validationResult=!1,i.focus(),i._trigger("error")}).always(function(){i._trigger("validated")})).pipe.apply(e,u(this._pipeAccordingToValidationResult()))},isValid:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={group:e[0],force:e[1]}}return _[this.whenValid(t).state()]},whenValid:function(t){var e=this,i=0<arguments.length&&void 0!==t?t:{},r=i.group,n=i.force;this._refreshFields();var s=this._withoutReactualizingFormOptions(function(){return h.map(e.fields,function(t){return t.whenValid({group:r,force:n})})});return d.all(s)},refresh:function(){return this._refreshFields(),this},reset:function(){for(var t=0;t<this.fields.length;t++)this.fields[t].reset();this._trigger("reset")},destroy:function(){this._destroyUI();for(var t=0;t<this.fields.length;t++)this.fields[t].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var n=this,t=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){n.$element.find(n.options.inputs).not(n.options.excluded).not("[".concat(n.options.namespace,"excluded=true]")).each(function(t,e){var i=new window.Parsley.Factory(e,{},n);if("Field"===i.__class__||"FieldMultiple"===i.__class__){var r=i.__class__+"-"+i.__id__;void 0===n.fieldsMappedById[r]&&(n.fieldsMappedById[r]=i,n.fields.push(i))}}),h.each(d.difference(t,n.fields),function(t,e){e.reset()})}),this},_withoutReactualizingFormOptions:function(t){var e=this.actualizeOptions;this.actualizeOptions=function(){return this};var i=t();return this.actualizeOptions=e,i},_trigger:function(t){return this.trigger("form:"+t)}};function b(t,e,i,r,n){var s=window.Parsley._validatorRegistry.validators[e],a=new c(s);l(this,{validator:a,name:e,requirements:i,priority:r=r||t.options[e+"Priority"]||a.priority,isDomConstraint:n=!0===n}),this._parseRequirements(t.options)}function w(t,e,i,r){this.__class__="Field",this.element=t,this.$element=h(t),void 0!==r&&(this.parent=r),this.options=i,this.domOptions=e,this.constraints=[],this.constraintsByName={},this.validationResult=!0,this._bindConstraints()}var F={pending:null,resolved:!0,rejected:!(b.prototype={validate:function(t,e){var i;return(i=this.validator).validate.apply(i,[t].concat(u(this.requirementList),[e]))},_parseRequirements:function(i){var r=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(t){return i[r.name+((e=t)[0].toUpperCase()+e.slice(1))];var e})}})};w.prototype={validate:function(t){1<=arguments.length&&!h.isPlainObject(t)&&(d.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),t={options:t});var e=this.whenValidate(t);if(!e)return!0;switch(e.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(t){var e,i=this,r=0<arguments.length&&void 0!==t?t:{},n=r.force,s=r.group;if(this.refresh(),!s||this._isInGroup(s))return this.value=this.getValue(),this._trigger("validate"),(e=this.whenValid({force:n,value:this.value,_refreshed:!0}).always(function(){i._reflowUI()}).done(function(){i._trigger("success")}).fail(function(){i._trigger("error")}).always(function(){i._trigger("validated")})).pipe.apply(e,u(this._pipeAccordingToValidationResult()))},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(t){return void 0===t&&(t=this.getValue()),!(!t.length&&!this._isRequired()&&void 0===this.options.validateIfEmpty)},_isInGroup:function(t){return Array.isArray(this.options.group)?-1!==h.inArray(t,this.options.group):this.options.group===t},isValid:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={force:e[0],value:e[1]}}var i=this.whenValid(t);return!i||F[i.state()]},whenValid:function(t){var r=this,e=0<arguments.length&&void 0!==t?t:{},i=e.force,n=void 0!==i&&i,s=e.value,a=e.group;if(e._refreshed||this.refresh(),!a||this._isInGroup(a)){if(this.validationResult=!0,!this.hasConstraints())return h.when();if(null==s&&(s=this.getValue()),!this.needsValidation(s)&&!0!==n)return h.when();var o=this._getGroupedConstraints(),l=[];return h.each(o,function(t,e){var i=d.all(h.map(e,function(t){return r._validateConstraint(s,t)}));if(l.push(i),"rejected"===i.state())return!1}),d.all(l)}},_validateConstraint:function(t,e){var i=this,r=e.validate(t,this);return!1===r&&(r=h.Deferred().reject()),d.all([r]).fail(function(t){i.validationResult instanceof Array||(i.validationResult=[]),i.validationResult.push({assert:e,errorMessage:"string"==typeof t&&t})})},getValue:function(){var t;return null==(t="function"==typeof this.options.value?this.options.value(this):void 0!==this.options.value?this.options.value:this.$element.val())?"":this._handleWhitespace(t)},reset:function(){return this._resetUI(),this._trigger("reset")},destroy:function(){this._destroyUI(),this.$element.removeData("Parsley"),this.$element.removeData("FieldMultiple"),this._trigger("destroy")},refresh:function(){return this._refreshConstraints(),this},_refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},refreshConstraints:function(){return d.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"),this.refresh()},addConstraint:function(t,e,i,r){if(window.Parsley._validatorRegistry.validators[t]){var n=new b(this,t,e,i,r);"undefined"!==this.constraintsByName[n.name]&&this.removeConstraint(n.name),this.constraints.push(n),this.constraintsByName[n.name]=n}return this},removeConstraint:function(t){for(var e=0;e<this.constraints.length;e++)if(t===this.constraints[e].name){this.constraints.splice(e,1);break}return delete this.constraintsByName[t],this},updateConstraint:function(t,e,i){return this.removeConstraint(t).addConstraint(t,e,i)},_bindConstraints:function(){for(var t=[],e={},i=0;i<this.constraints.length;i++)!1===this.constraints[i].isDomConstraint&&(t.push(this.constraints[i]),e[this.constraints[i].name]=this.constraints[i]);for(var r in this.constraints=t,this.constraintsByName=e,this.options)this.addConstraint(r,this.options[r],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){null!==this.element.getAttribute("required")&&this.addConstraint("required",!0,void 0,!0),null!==this.element.getAttribute("pattern")&&this.addConstraint("pattern",this.element.getAttribute("pattern"),void 0,!0);var t=this.element.getAttribute("min"),e=this.element.getAttribute("max");null!==t&&null!==e?this.addConstraint("range",[t,e],void 0,!0):null!==t?this.addConstraint("min",t,void 0,!0):null!==e&&this.addConstraint("max",e,void 0,!0),null!==this.element.getAttribute("minlength")&&null!==this.element.getAttribute("maxlength")?this.addConstraint("length",[this.element.getAttribute("minlength"),this.element.getAttribute("maxlength")],void 0,!0):null!==this.element.getAttribute("minlength")?this.addConstraint("minlength",this.element.getAttribute("minlength"),void 0,!0):null!==this.element.getAttribute("maxlength")&&this.addConstraint("maxlength",this.element.getAttribute("maxlength"),void 0,!0);var i=d.getType(this.element);return"number"===i?this.addConstraint("type",["number",{step:this.element.getAttribute("step")||"1",base:t||this.element.getAttribute("value")}],void 0,!0):/^(email|url|range|date)$/i.test(i)?this.addConstraint("type",i,void 0,!0):this},_isRequired:function(){return void 0!==this.constraintsByName.required&&!1!==this.constraintsByName.required.requirements},_trigger:function(t){return this.trigger("field:"+t)},_handleWhitespace:function(t){return!0===this.options.trimValue&&d.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(t=t.replace(/\s{2,}/g," ")),"trim"!==this.options.whitespace&&"squish"!==this.options.whitespace&&!0!==this.options.trimValue||(t=d.trimString(t)),t},_isDateInput:function(){var t=this.constraintsByName.type;return t&&"date"===t.requirements},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var t=[],e={},i=0;i<this.constraints.length;i++){var r=this.constraints[i].priority;e[r]||t.push(e[r]=[]),e[r].push(this.constraints[i])}return t.sort(function(t,e){return e[0].priority-t[0].priority}),t}};function C(){this.__class__="FieldMultiple"}C.prototype={addElement:function(t){return this.$elements.push(t),this},_refreshConstraints:function(){var t;if(this.constraints=[],"SELECT"===this.element.nodeName)return this.actualizeOptions()._bindConstraints(),this;for(var e=0;e<this.$elements.length;e++)if(h("html").has(this.$elements[e]).length){t=this.$elements[e].data("FieldMultiple")._refreshConstraints().constraints;for(var i=0;i<t.length;i++)this.addConstraint(t[i].name,t[i].requirements,t[i].priority,t[i].isDomConstraint)}else this.$elements.splice(e,1);return this},getValue:function(){if("function"==typeof this.options.value)return this.options.value(this);if(void 0!==this.options.value)return this.options.value;if("INPUT"===this.element.nodeName){var t=d.getType(this.element);if("radio"===t)return this._findRelated().filter(":checked").val()||"";if("checkbox"===t){var e=[];return this._findRelated().filter(":checked").each(function(){e.push(h(this).val())}),e}}return"SELECT"===this.element.nodeName&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};function A(t,e,i){this.element=t,this.$element=h(t);var r=this.$element.data("Parsley");if(r)return void 0!==i&&r.parent===window.Parsley&&(r.parent=i,r._resetOptions(r.options)),"object"===n(e)&&l(r.options,e),r;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if(void 0!==i&&"Form"!==i.__class__)throw new Error("Parent instance must be a Form instance");return this.parent=i||window.Parsley,this.init(e)}A.prototype={init:function(t){return this.__class__="Parsley",this.__version__="2.9.2",this.__id__=d.generateID(),this._resetOptions(t),"FORM"===this.element.nodeName||d.checkAttr(this.element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){var t=d.getType(this.element);return"radio"===t||"checkbox"===t||"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple")},handleMultiple:function(){var t,e,r=this;if(this.options.multiple=this.options.multiple||(t=this.element.getAttribute("name"))||this.element.getAttribute("id"),"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return d.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),t&&h('input[name="'+t+'"]').each(function(t,e){var i=d.getType(e);"radio"!==i&&"checkbox"!==i||e.setAttribute(r.options.namespace+"multiple",r.options.multiple)});for(var i=this._findRelated(),n=0;n<i.length;n++)if(void 0!==(e=h(i.get(n)).data("Parsley"))){this.$element.data("FieldMultiple")||e.addElement(this.$element);break}return this.bind("parsleyField",!0),e||this.bind("parsleyFieldMultiple")},bind:function(t,e){var i;switch(t){case"parsleyForm":i=h.extend(new y(this.element,this.domOptions,this.options),new r,window.ParsleyExtend)._bindFields();break;case"parsleyField":i=h.extend(new w(this.element,this.domOptions,this.options,this.parent),new r,window.ParsleyExtend);break;case"parsleyFieldMultiple":i=h.extend(new w(this.element,this.domOptions,this.options,this.parent),new C,new r,window.ParsleyExtend)._init();break;default:throw new Error(t+"is not a supported Parsley type")}return this.options.multiple&&d.setAttr(this.element,this.options.namespace,"multiple",this.options.multiple),void 0!==e?this.$element.data("FieldMultiple",i):(this.$element.data("Parsley",i),i._actualizeTriggers(),i._trigger("init")),i}};var E=h.fn.jquery.split(".");if(parseInt(E[0])<=1&&parseInt(E[1])<8)throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";E.forEach||d.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var x=l(new r,{element:document,$element:h(document),actualizeOptions:null,_resetOptions:null,Factory:A,version:"2.9.2"});l(w.prototype,v.Field,r.prototype),l(y.prototype,v.Form,r.prototype),l(A.prototype,r.prototype),h.fn.parsley=h.fn.psly=function(t){if(1<this.length){var e=[];return this.each(function(){e.push(h(this).parsley(t))}),e}if(0!=this.length)return new A(this[0],t)},void 0===window.ParsleyExtend&&(window.ParsleyExtend={}),x.options=l(d.objectCreate(s),window.ParsleyConfig),window.ParsleyConfig=x.options,window.Parsley=window.psly=x,x.Utils=d,window.ParsleyUtils={},h.each(d,function(t,e){"function"==typeof e&&(window.ParsleyUtils[t]=function(){return d.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."),d[t].apply(d,arguments)})});var $=window.Parsley._validatorRegistry=new a(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);window.ParsleyValidator={},h.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "),function(t,e){window.Parsley[e]=function(){return $[e].apply($,arguments)},window.ParsleyValidator[e]=function(){var t;return d.warnOnce("Accessing the method '".concat(e,"' through Validator is deprecated. Simply call 'window.Parsley.").concat(e,"(...)'")),(t=window.Parsley)[e].apply(t,arguments)}}),window.Parsley.UI=v,window.ParsleyUI={removeError:function(t,e,i){var r=!0!==i;return d.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),t.removeError(e,{updateClass:r})},getErrorsMessages:function(t){return d.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."),t.getErrorsMessages()}},h.each("addError updateError".split(" "),function(t,a){window.ParsleyUI[a]=function(t,e,i,r,n){var s=!0!==n;return d.warnOnce("Accessing UI is deprecated. Call '".concat(a,"' on the instance directly. Please comment in issue 1073 as to your need to call this method.")),t[a](e,{message:i,assert:r,updateClass:s})}}),!1!==window.ParsleyConfig.autoBind&&h(function(){h("[data-parsley-validate]").length&&h("[data-parsley-validate]").parsley()});function V(){d.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")}var P=h({});function O(e,i){return e.parsleyAdaptedCallback||(e.parsleyAdaptedCallback=function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(this),e.apply(i||P,t)}),e.parsleyAdaptedCallback}var T="parsley:";function M(t){return 0===t.lastIndexOf(T,0)?t.substr(T.length):t}return h.listen=function(t,e){var i;if(V(),"object"===n(arguments[1])&&"function"==typeof arguments[2]&&(i=arguments[1],e=arguments[2]),"function"!=typeof e)throw new Error("Wrong parameters");window.Parsley.on(M(t),O(e,i))},h.listenTo=function(t,e,i){if(V(),!(t instanceof w||t instanceof y))throw new Error("Must give Parsley instance");if("string"!=typeof e||"function"!=typeof i)throw new Error("Wrong parameters");t.on(M(e),O(i))},h.unsubscribe=function(t,e){if(V(),"string"!=typeof t||"function"!=typeof e)throw new Error("Wrong arguments");window.Parsley.off(M(t),e.parsleyAdaptedCallback)},h.unsubscribeTo=function(t,e){if(V(),!(t instanceof w||t instanceof y))throw new Error("Must give Parsley instance");t.off(M(e))},h.unsubscribeAll=function(e){V(),window.Parsley.off(M(e)),h("form,input,textarea,select").each(function(){var t=h(this).data("Parsley");t&&t.off(M(e))})},h.emit=function(t,e){V();var i=e instanceof w||e instanceof y,r=Array.prototype.slice.call(arguments,i?2:1);r.unshift(M(t)),i||(e=window.Parsley),e.trigger.apply(e,u(r))},h.extend(!0,x,{asyncValidators:{default:{fn:function(t){return 200<=t.status&&t.status<300},url:!1},reverse:{fn:function(t){return t.status<200||300<=t.status},url:!1}},addAsyncValidator:function(t,e,i,r){return x.asyncValidators[t]={fn:e,url:i||!1,options:r||{}},this}}),x.addValidator("remote",{requirementType:{"":"string",validator:"string",reverse:"boolean",options:"object"},validateString:function(t,e,i,r){var n,s,a={},o=i.validator||(!0===i.reverse?"reverse":"default");if(void 0===x.asyncValidators[o])throw new Error("Calling an undefined async validator: `"+o+"`");-1<(e=x.asyncValidators[o].url||e).indexOf("{value}")?e=e.replace("{value}",encodeURIComponent(t)):a[r.element.getAttribute("name")||r.element.getAttribute("id")]=t;var l=h.extend(!0,i.options||{},x.asyncValidators[o].options);n=h.extend(!0,{},{url:e,data:a,type:"GET"},l),r.trigger("field:ajaxoptions",r,n),s=h.param(n),void 0===x._remoteCache&&(x._remoteCache={});function u(){var t=x.asyncValidators[o].fn.call(r,d,e,i);return t=t||h.Deferred().reject(),h.when(t)}var d=x._remoteCache[s]=x._remoteCache[s]||h.ajax(n);return d.then(u,u)},priority:-1}),x.on("form:submit",function(){x._remoteCache={}}),r.prototype.addAsyncValidator=function(){return d.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),x.addAsyncValidator.apply(x,arguments)},x.addMessages("en",{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same.",euvatin:"It's not a valid VAT Identification Number."}),x.setLocale("en"),(new function(){var r=this,n=window||global;l(this,{isNativeEvent:function(t){return t.originalEvent&&!1!==t.originalEvent.isTrusted},fakeInputEvent:function(t){r.isNativeEvent(t)&&h(t.target).trigger("input")},misbehaves:function(t){r.isNativeEvent(t)&&(r.behavesOk(t),h(document).on("change.inputevent",t.data.selector,r.fakeInputEvent),r.fakeInputEvent(t))},behavesOk:function(t){r.isNativeEvent(t)&&h(document).off("input.inputevent",t.data.selector,r.behavesOk).off("change.inputevent",t.data.selector,r.misbehaves)},install:function(){if(!n.inputEventPatched){n.inputEventPatched="0.0.3";for(var t=0,e=["select",'input[type="checkbox"]','input[type="radio"]','input[type="file"]'];t<e.length;t++){var i=e[t];h(document).on("input.inputevent",i,{selector:i},r.behavesOk).on("change.inputevent",i,{selector:i},r.misbehaves)}}},uninstall:function(){delete n.inputEventPatched,h(document).off(".inputevent")}})}).install(),x});

/* module iscroll */
// function on
jQuery(document).ready(function() {
	iscrollInit();
});
// function init
// more option see https://github.com/cubiq/iscroll
function iscrollInit() {
	var myScroll = new IScroll('#wrapper-iscroll-js', {
		scrollX: false,
		mouseWheel: true,
		scrollbars: 'custom'
	});
	console.dir(myScroll.options);
}

/*! iScroll v5.2.0-snapshot ~ (c) 2008-2017 Matteo Spinelli ~ http://cubiq.org/license */
(function(window, document, Math) {
	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };
	var utils = (function() {
		var me = {};
		var _elementStyle = document.createElement('div').style;
		var _vendor = (function() {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
			}
			return false;
		})();

		function _prefixStyle(style) {
			if (_vendor === false) return false;
			if (_vendor === '') return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}
		me.getTime = Date.now || function getTime() { return new Date().getTime(); };
		me.extend = function(target, obj) {
			for (var i in obj) {
				target[i] = obj[i];
			}
		};
		me.addEvent = function(el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};
		me.removeEvent = function(el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};
		me.prefixPointerEvent = function(pointerEvent) {
			return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent;
		};
		me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;
			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}
			return {
				destination: Math.round(destination),
				duration: duration
			};
		};
		var _transform = _prefixStyle('transform');
		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
			hasTransition: _prefixStyle('transition') in _elementStyle
		});
		/*
	This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	- galaxy S2 is ok
    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
   - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
  */
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		})();
		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin'),
			touchAction: _prefixStyle('touchAction')
		});
		me.hasClass = function(e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};
		me.addClass = function(e, c) {
			if (me.hasClass(e, c)) {
				return;
			}
			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};
		me.removeClass = function(e, c) {
			if (!me.hasClass(e, c)) {
				return;
			}
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};
		me.offset = function(el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084
			return {
				left: left,
				top: top
			};
		};
		me.preventDefaultException = function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		};
		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});
		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function(k) {
					return k * (2 - k);
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function(k) {
					return Math.sqrt(1 - (--k * k));
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function(k) {
					var b = 4;
					return (k = k - 1) * k * ((b + 1) * k + b) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function(k) {
					if ((k /= 1) < (1 / 2.75)) {
						return 7.5625 * k * k;
					} else if (k < (2 / 2.75)) {
						return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
					} else if (k < (2.5 / 2.75)) {
						return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
					} else {
						return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function(k) {
					var f = 0.22,
						e = 0.4;
					if (k === 0) { return 0; }
					if (k == 1) { return 1; }
					return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
				}
			}
		});
		me.tap = function(e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};
		me.click = function(e) {
			var target = e.target,
				ev;
			if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
				// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
				// initMouseEvent is deprecated.
				ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
				ev.initEvent('click', true, true);
				ev.view = e.view || window;
				ev.detail = 1;
				ev.screenX = target.screenX || 0;
				ev.screenY = target.screenY || 0;
				ev.clientX = target.clientX || 0;
				ev.clientY = target.clientY || 0;
				ev.ctrlKey = !!e.ctrlKey;
				ev.altKey = !!e.altKey;
				ev.shiftKey = !!e.shiftKey;
				ev.metaKey = !!e.metaKey;
				ev.button = 0;
				ev.relatedTarget = null;
				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};
		me.getTouchAction = function(eventPassthrough, addPinch) {
			var touchAction = 'none';
			if (eventPassthrough === 'vertical') {
				touchAction = 'pan-y';
			} else if (eventPassthrough === 'horizontal') {
				touchAction = 'pan-x';
			}
			if (addPinch && touchAction != 'none') {
				// add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
				touchAction += ' pinch-zoom';
			}
			return touchAction;
		};
		me.getRect = function(el) {
			if (el instanceof SVGElement) {
				var rect = el.getBoundingClientRect();
				return {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height
				};
			} else {
				return {
					top: el.offsetTop,
					left: el.offsetLeft,
					width: el.offsetWidth,
					height: el.offsetHeight
				};
			}
		};
		return me;
	})();

	function IScroll(el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style; // cache style for better performance
		this.options = {
			resizeScrollbars: true,
			mouseWheelSpeed: 20,
			snapThreshold: 0.334,
			// INSERT POINT: OPTIONS
			disablePointer: !utils.hasPointer,
			disableTouch: utils.hasPointer || !utils.hasTouch,
			disableMouse: utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,
			bounce: true,
			bounceTime: 600,
			bounceEasing: '',
			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};
		for (var i in options) {
			this.options[i] = options[i];
		}
		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;
		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
		if (this.options.tap === true) {
			this.options.tap = 'tap';
		}
		// https://github.com/cubiq/iscroll/issues/1029
		if (!this.options.useTransition && !this.options.useTransform) {
			if (!(/relative|absolute/i).test(this.scrollerStyle.position)) {
				this.scrollerStyle.position = "relative";
			}
		}
		if (this.options.shrinkScrollbars == 'scale') {
			this.options.useTransition = false;
		}
		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
		// INSERT POINT: NORMALIZATION
		// Some defaults
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};
		// INSERT POINT: DEFAULTS
		this._init();
		this.refresh();
		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}
	IScroll.prototype = {
		version: '5.2.0-snapshot',
		_init: function() {
			this._initEvents();
			if (this.options.scrollbars || this.options.indicators) {
				this._initIndicators();
			}
			if (this.options.mouseWheel) {
				this._initWheel();
			}
			if (this.options.snap) {
				this._initSnap();
			}
			if (this.options.keyBindings) {
				this._initKeys();
			}
			// INSERT POINT: _init
		},
		destroy: function() {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
			this._execEvent('destroy');
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},
		_start: function(e) {
			// React to left mouse button only
			if (utils.eventType[e.type] != 1) {
				// for button property
				// http://unixpapa.com/js/mouse.html
				var button;
				if (!e.which) {
					/* IE case */
					button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2);
				} else {
					/* All others */
					button = e.button;
				}
				if (button !== 0) {
					return;
				}
			}
			if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
				return;
			}
			if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault();
			}
			var point = e.touches ? e.touches[0] : e,
				pos;
			this.initiated = utils.eventType[e.type];
			this.moved = false;
			this.distX = 0;
			this.distY = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;
			this.startTime = utils.getTime();
			if (this.options.useTransition && this.isInTransition) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if (!this.options.useTransition && this.isAnimating) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}
			this.startX = this.x;
			this.startY = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX = point.pageX;
			this.pointY = point.pageY;
			this._execEvent('beforeScrollStart');
		},
		_move: function(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return;
			}
			if (this.options.preventDefault) { // increases performance on Android? TODO: check!
				e.preventDefault();
			}
			var point = e.touches ? e.touches[0] : e,
				deltaX = point.pageX - this.pointX,
				deltaY = point.pageY - this.pointY,
				timestamp = utils.getTime(),
				newX, newY,
				absDistX, absDistY;
			this.pointX = point.pageX;
			this.pointY = point.pageY;
			this.distX += deltaX;
			this.distY += deltaY;
			absDistX = Math.abs(this.distX);
			absDistY = Math.abs(this.distY);
			// We need to move at least 10 pixels for the scrolling to initiate
			if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
				return;
			}
			// If you are scrolling in one direction lock the other
			if (!this.directionLocked && !this.options.freeScroll) {
				if (absDistX > absDistY + this.options.directionLockThreshold) {
					this.directionLocked = 'h'; // lock horizontally
				} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
					this.directionLocked = 'v'; // lock vertically
				} else {
					this.directionLocked = 'n'; // no lock
				}
			}
			if (this.directionLocked == 'h') {
				if (this.options.eventPassthrough == 'vertical') {
					e.preventDefault();
				} else if (this.options.eventPassthrough == 'horizontal') {
					this.initiated = false;
					return;
				}
				deltaY = 0;
			} else if (this.directionLocked == 'v') {
				if (this.options.eventPassthrough == 'horizontal') {
					e.preventDefault();
				} else if (this.options.eventPassthrough == 'vertical') {
					this.initiated = false;
					return;
				}
				deltaX = 0;
			}
			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			newX = this.x + deltaX;
			newY = this.y + deltaY;
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}
			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
			if (!this.moved) {
				this._execEvent('scrollStart');
			}
			this.moved = true;
			this._translate(newX, newY);
			/* REPLACE START: _move */
			if (timestamp - this.startTime > 300) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;
			}
			/* REPLACE END: _move */
		},
		_end: function(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return;
			}
			if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault();
			}
			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX,
				momentumY,
				duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';
			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();
			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}
			this.scrollTo(newX, newY); // ensures that the last position is rounded
			// we scrolled less than 10 pixels
			if (!this.moved) {
				if (this.options.tap) {
					utils.tap(e, this.options.tap);
				}
				if (this.options.click) {
					utils.click(e);
				}
				this._execEvent('scrollCancel');
				return;
			}
			if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
				this._execEvent('flick');
				return;
			}
			// start momentum animation if needed
			if (this.options.momentum && duration < 300) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}
			if (this.options.snap) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
				newX = snap.x;
				newY = snap.y;
				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing;
			}
			// INSERT POINT: _end
			if (newX != this.x || newY != this.y) {
				// change easing function when scroller goes out of the boundaries
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = utils.ease.quadratic;
				}
				this.scrollTo(newX, newY, time, easing);
				return;
			}
			this._execEvent('scrollEnd');
		},
		_resize: function() {
			var that = this;
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(function() {
				that.refresh();
			}, this.options.resizePolling);
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;
			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}
			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}
			if (x == this.x && y == this.y) {
				return false;
			}
			this.scrollTo(x, y, time, this.options.bounceEasing);
			return true;
		},
		disable: function() {
			this.enabled = false;
		},
		enable: function() {
			this.enabled = true;
		},
		refresh: function() {
			utils.getRect(this.wrapper); // Force reflow
			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;
			var rect = utils.getRect(this.scroller);
			/* REPLACE START: refresh */
			this.scrollerWidth = rect.width;
			this.scrollerHeight = rect.height;
			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
			/* REPLACE END: refresh */
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}
			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}
			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;
			if (utils.hasPointer && !this.options.disablePointer) {
				// The wrapper should have `touchAction` property for using pointerEvent.
				this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, true);
				// case. not support 'pinch-zoom'
				// https://github.com/cubiq/iscroll/issues/1118#issuecomment-270057583
				if (!this.wrapper.style[utils.style.touchAction]) {
					this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, false);
				}
			}
			this.wrapperOffset = utils.offset(this.wrapper);
			this._execEvent('refresh');
			this.resetPosition();
			// INSERT POINT: _refresh
		},
		on: function(type, fn) {
			if (!this._events[type]) {
				this._events[type] = [];
			}
			this._events[type].push(fn);
		},
		off: function(type, fn) {
			if (!this._events[type]) {
				return;
			}
			var index = this._events[type].indexOf(fn);
			if (index > -1) {
				this._events[type].splice(index, 1);
			}
		},
		_execEvent: function(type) {
			if (!this._events[type]) {
				return;
			}
			var i = 0,
				l = this._events[type].length;
			if (!l) {
				return;
			}
			for (; i < l; i++) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},
		scrollBy: function(x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;
			this.scrollTo(x, y, time, easing);
		},
		scrollTo: function(x, y, time, easing) {
			easing = easing || utils.ease.circular;
			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if (!time || transitionType) {
				if (transitionType) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
				}
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},
		scrollToElement: function(el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);
			if (!el) {
				return;
			}
			var pos = utils.offset(el);
			pos.left -= this.wrapperOffset.left;
			pos.top -= this.wrapperOffset.top;
			// if offsetX/Y are true we center the element to the screen
			var elRect = utils.getRect(el);
			var wrapperRect = utils.getRect(this.wrapper);
			if (offsetX === true) {
				offsetX = Math.round(elRect.width / 2 - wrapperRect.width / 2);
			}
			if (offsetY === true) {
				offsetY = Math.round(elRect.height / 2 - wrapperRect.height / 2);
			}
			pos.left -= offsetX || 0;
			pos.top -= offsetY || 0;
			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
			this.scrollTo(pos.left, pos.top, time, easing);
		},
		_transitionTime: function(time) {
			if (!this.options.useTransition) {
				return;
			}
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}
			this.scrollerStyle[durationProp] = time + 'ms';
			if (!time && utils.isBadAndroid) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if (self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s';
					}
				});
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}
			// INSERT POINT: _transitionTime
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
			// INSERT POINT: _transitionTimingFunction
		},
		_translate: function(x, y) {
			if (this.options.useTransform) {
				/* REPLACE START: _translate */
				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
				/* REPLACE END: _translate */
			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}
			this.x = x;
			this.y = y;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}
			// INSERT POINT: _translate
		},
		_initEvents: function(remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;
			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);
			if (this.options.click) {
				eventType(this.wrapper, 'click', this, true);
			}
			if (!this.options.disableMouse) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}
			if (utils.hasPointer && !this.options.disablePointer) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this);
			}
			if (utils.hasTouch && !this.options.disableTouch) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}
			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},
		getComputedPosition: function() {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;
			if (this.options.useTransform) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}
			return { x: x, y: y };
		},
		_initIndicators: function() {
			var interactive = this.options.interactiveScrollbars,
				customStyle = typeof this.options.scrollbars != 'string',
				indicators = [],
				indicator;
			var that = this;
			this.indicators = [];
			if (this.options.scrollbars) {
				// Vertical scrollbar
				if (this.options.scrollY) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
				// Horizontal scrollbar
				if (this.options.scrollX) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
			}
			if (this.options.indicators) {
				// TODO: check concat compatibility
				indicators = indicators.concat(this.options.indicators);
			}
			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}
			// TODO: check if we can use array.map (wide compatibility and performance issues)
			function _indicatorsMap(fn) {
				if (that.indicators) {
					for (var i = that.indicators.length; i--;) {
						fn.call(that.indicators[i]);
					}
				}
			}
			if (this.options.fadeScrollbars) {
				this.on('scrollEnd', function() {
					_indicatorsMap(function() {
						this.fade();
					});
				});
				this.on('scrollCancel', function() {
					_indicatorsMap(function() {
						this.fade();
					});
				});
				this.on('scrollStart', function() {
					_indicatorsMap(function() {
						this.fade(1);
					});
				});
				this.on('beforeScrollStart', function() {
					_indicatorsMap(function() {
						this.fade(1, true);
					});
				});
			}
			this.on('refresh', function() {
				_indicatorsMap(function() {
					this.refresh();
				});
			});
			this.on('destroy', function() {
				_indicatorsMap(function() {
					this.destroy();
				});
				delete this.indicators;
			});
		},
		_initWheel: function() {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
			this.on('destroy', function() {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
			});
		},
		_wheel: function(e) {
			if (!this.enabled) {
				return;
			}
			e.preventDefault();
			var wheelDeltaX, wheelDeltaY,
				newX, newY,
				that = this;
			if (this.wheelTimeout === undefined) {
				that._execEvent('scrollStart');
			}
			// Execute the scrollEnd event after 400ms the wheel stopped scrolling
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function() {
				if (!that.options.snap) {
					that._execEvent('scrollEnd');
				}
				that.wheelTimeout = undefined;
			}, 400);
			if ('deltaX' in e) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				}
			} else if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
			} else if ('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
			} else {
				return;
			}
			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;
			if (!this.hasVerticalScroll) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0;
			}
			if (this.options.snap) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;
				if (wheelDeltaX > 0) {
					newX--;
				} else if (wheelDeltaX < 0) {
					newX++;
				}
				if (wheelDeltaY > 0) {
					newY--;
				} else if (wheelDeltaY < 0) {
					newY++;
				}
				this.goToPage(newX, newY);
				return;
			}
			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;
			if (newX > 0) {
				newX = 0;
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX;
			}
			if (newY > 0) {
				newY = 0;
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY;
			}
			this.scrollTo(newX, newY, 0);
			// INSERT POINT: _wheel
		},
		_initSnap: function() {
			this.currentPage = {};
			if (typeof this.options.snap == 'string') {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap);
			}
			this.on('refresh', function() {
				var i = 0,
					l,
					m = 0,
					n,
					cx, cy,
					x = 0,
					y,
					stepX = this.options.snapStepX || this.wrapperWidth,
					stepY = this.options.snapStepY || this.wrapperHeight,
					el,
					rect;
				this.pages = [];
				if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
					return;
				}
				if (this.options.snap === true) {
					cx = Math.round(stepX / 2);
					cy = Math.round(stepY / 2);
					while (x > -this.scrollerWidth) {
						this.pages[i] = [];
						l = 0;
						y = 0;
						while (y > -this.scrollerHeight) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};
							y -= stepY;
							l++;
						}
						x -= stepX;
						i++;
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;
					for (; i < l; i++) {
						rect = utils.getRect(el[i]);
						if (i === 0 || rect.left <= utils.getRect(el[i - 1]).left) {
							m = 0;
							n++;
						}
						if (!this.pages[m]) {
							this.pages[m] = [];
						}
						x = Math.max(-rect.left, this.maxScrollX);
						y = Math.max(-rect.top, this.maxScrollY);
						cx = x - Math.round(rect.width / 2);
						cy = y - Math.round(rect.height / 2);
						this.pages[m][n] = {
							x: x,
							y: y,
							width: rect.width,
							height: rect.height,
							cx: cx,
							cy: cy
						};
						if (x > this.maxScrollX) {
							m++;
						}
					}
				}
				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
				// Update snap threshold if needed
				if (this.options.snapThreshold % 1 === 0) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold;
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
				}
			});
			this.on('flick', function() {
				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);
				this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
			});
		},
		_nearestSnap: function(x, y) {
			if (!this.pages.length) {
				return { x: 0, y: 0, pageX: 0, pageY: 0 };
			}
			var i = 0,
				l = this.pages.length,
				m = 0;
			// Check if we exceeded the snap threshold
			if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
				return this.currentPage;
			}
			if (x > 0) {
				x = 0;
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX;
			}
			if (y > 0) {
				y = 0;
			} else if (y < this.maxScrollY) {
				y = this.maxScrollY;
			}
			for (; i < l; i++) {
				if (x >= this.pages[i][0].cx) {
					x = this.pages[i][0].x;
					break;
				}
			}
			l = this.pages[i].length;
			for (; m < l; m++) {
				if (y >= this.pages[0][m].cy) {
					y = this.pages[0][m].y;
					break;
				}
			}
			if (i == this.currentPage.pageX) {
				i += this.directionX;
				if (i < 0) {
					i = 0;
				} else if (i >= this.pages.length) {
					i = this.pages.length - 1;
				}
				x = this.pages[i][0].x;
			}
			if (m == this.currentPage.pageY) {
				m += this.directionY;
				if (m < 0) {
					m = 0;
				} else if (m >= this.pages[0].length) {
					m = this.pages[0].length - 1;
				}
				y = this.pages[0][m].y;
			}
			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			};
		},
		goToPage: function(x, y, time, easing) {
			easing = easing || this.options.bounceEasing;
			if (x >= this.pages.length) {
				x = this.pages.length - 1;
			} else if (x < 0) {
				x = 0;
			}
			if (y >= this.pages[x].length) {
				y = this.pages[x].length - 1;
			} else if (y < 0) {
				y = 0;
			}
			var posX = this.pages[x][y].x,
				posY = this.pages[x][y].y;
			time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};
			this.scrollTo(posX, posY, time, easing);
		},
		next: function(time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
			x++;
			if (x >= this.pages.length && this.hasVerticalScroll) {
				x = 0;
				y++;
			}
			this.goToPage(x, y, time, easing);
		},
		prev: function(time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
			x--;
			if (x < 0 && this.hasVerticalScroll) {
				x = 0;
				y--;
			}
			this.goToPage(x, y, time, easing);
		},
		_initKeys: function(e) {
			// default key bindings
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;
			// if you give me characters I give you keycode
			if (typeof this.options.keyBindings == 'object') {
				for (i in this.options.keyBindings) {
					if (typeof this.options.keyBindings[i] == 'string') {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
					}
				}
			} else {
				this.options.keyBindings = {};
			}
			for (i in keys) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
			}
			utils.addEvent(window, 'keydown', this);
			this.on('destroy', function() {
				utils.removeEvent(window, 'keydown', this);
			});
		},
		_key: function(e) {
			if (!this.enabled) {
				return;
			}
			var snap = this.options.snap, // we are using this alot, better to cache it
				newX = snap ? this.currentPage.pageX : this.x,
				newY = snap ? this.currentPage.pageY : this.y,
				now = utils.getTime(),
				prevTime = this.keyTime || 0,
				acceleration = 0.250,
				pos;
			if (this.options.useTransition && this.isInTransition) {
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false;
			}
			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
			switch (e.keyCode) {
				case this.options.keyBindings.pageUp:
					if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
						newX += snap ? 1 : this.wrapperWidth;
					} else {
						newY += snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.pageDown:
					if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
						newX -= snap ? 1 : this.wrapperWidth;
					} else {
						newY -= snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.end:
					newX = snap ? this.pages.length - 1 : this.maxScrollX;
					newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
					break;
				case this.options.keyBindings.home:
					newX = 0;
					newY = 0;
					break;
				case this.options.keyBindings.left:
					newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.up:
					newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.right:
					newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.down:
					newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
					break;
				default:
					return;
			}
			if (snap) {
				this.goToPage(newX, newY);
				return;
			}
			if (newX > 0) {
				newX = 0;
				this.keyAcceleration = 0;
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0;
			}
			if (newY > 0) {
				newY = 0;
				this.keyAcceleration = 0;
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0;
			}
			this.scrollTo(newX, newY, 0);
			this.keyTime = now;
		},
		_animate: function(destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;

			function step() {
				var now = utils.getTime(),
					newX, newY,
					easing;
				if (now >= destTime) {
					that.isAnimating = false;
					that._translate(destX, destY);
					if (!that.resetPosition(that.options.bounceTime)) {
						that._execEvent('scrollEnd');
					}
					return;
				}
				now = (now - startTime) / duration;
				easing = easingFn(now);
				newX = (destX - startX) * easing + startX;
				newY = (destY - startY) * easing + startY;
				that._translate(newX, newY);
				if (that.isAnimating) {
					rAF(step);
				}
			}
			this.isAnimating = true;
			step();
		},
		handleEvent: function(e) {
			switch (e.type) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if (this.enabled && !e._constructed) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};

	function createDefaultScrollbar(direction, interactive, type) {
		var scrollbar = document.createElement('div'),
			indicator = document.createElement('div');
		if (type === true) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
		}
		indicator.className = 'iScrollIndicator';
		if (direction == 'h') {
			if (type === true) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%';
			}
			scrollbar.className = 'iScrollHorizontalScrollbar';
		} else {
			if (type === true) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%';
			}
			scrollbar.className = 'iScrollVerticalScrollbar';
		}
		scrollbar.style.cssText += ';overflow:hidden';
		if (!interactive) {
			scrollbar.style.pointerEvents = 'none';
		}
		scrollbar.appendChild(indicator);
		return scrollbar;
	}

	function Indicator(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;
		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};
		for (var i in options) {
			this.options[i] = options[i];
		}
		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;
		if (this.options.interactive) {
			if (!this.options.disableTouch) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this);
			}
			if (!this.options.disablePointer) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
			}
			if (!this.options.disableMouse) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this);
			}
		}
		if (this.options.fade) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			// remove 0.0001ms
			var self = this;
			if (utils.isBadAndroid) {
				rAF(function() {
					if (self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s';
					}
				});
			}
			this.wrapperStyle.opacity = '0';
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {
			switch (e.type) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
			}
		},
		destroy: function() {
			if (this.options.fadeScrollbars) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;
			}
			if (this.options.interactive) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);
				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);
				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this);
			}
			if (this.options.defaultScrollbars && this.wrapper.parentNode) {
				this.wrapper.parentNode.removeChild(this.wrapper);
			}
		},
		_start: function(e) {
			var point = e.touches ? e.touches[0] : e;
			e.preventDefault();
			e.stopPropagation();
			this.transitionTime();
			this.initiated = true;
			this.moved = false;
			this.lastPointX = point.pageX;
			this.lastPointY = point.pageY;
			this.startTime = utils.getTime();
			if (!this.options.disableTouch) {
				utils.addEvent(window, 'touchmove', this);
			}
			if (!this.options.disablePointer) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
			}
			if (!this.options.disableMouse) {
				utils.addEvent(window, 'mousemove', this);
			}
			this.scroller._execEvent('beforeScrollStart');
		},
		_move: function(e) {
			var point = e.touches ? e.touches[0] : e,
				deltaX, deltaY,
				newX, newY,
				timestamp = utils.getTime();
			if (!this.moved) {
				this.scroller._execEvent('scrollStart');
			}
			this.moved = true;
			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;
			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;
			newX = this.x + deltaX;
			newY = this.y + deltaY;
			this._pos(newX, newY);
			// INSERT POINT: indicator._move
			e.preventDefault();
			e.stopPropagation();
		},
		_end: function(e) {
			if (!this.initiated) {
				return;
			}
			this.initiated = false;
			e.preventDefault();
			e.stopPropagation();
			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);
			if (this.scroller.options.snap) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);
				if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
				}
			}
			if (this.moved) {
				this.scroller._execEvent('scrollEnd');
			}
		},
		transitionTime: function(time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}
			this.indicatorStyle[durationProp] = time + 'ms';
			if (!time && utils.isBadAndroid) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if (self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s';
					}
				});
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
		},
		refresh: function() {
			this.transitionTime();
			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}
			if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '8px';
					} else {
						this.wrapper.style.bottom = '8px';
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '2px';
					} else {
						this.wrapper.style.bottom = '2px';
					}
				}
			}
			utils.getRect(this.wrapper); // force refresh
			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if (this.options.resize) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px';
				} else {
					this.indicatorWidth = this.indicator.clientWidth;
				}
				this.maxPosX = this.wrapperWidth - this.indicatorWidth;
				if (this.options.shrink == 'clip') {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8;
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX;
				}
				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}
			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if (this.options.resize) {
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px';
				} else {
					this.indicatorHeight = this.indicator.clientHeight;
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				if (this.options.shrink == 'clip') {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8;
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY;
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}
			this.updatePosition();
		},
		updatePosition: function() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
			if (!this.options.ignoreBoundaries) {
				if (x < this.minBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px';
					}
					x = this.minBoundaryX;
				} else if (x > this.maxBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width;
					} else {
						x = this.maxBoundaryX;
					}
				} else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px';
				}
				if (y < this.minBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
					}
					y = this.minBoundaryY;
				} else if (y > this.maxBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height;
					} else {
						y = this.maxBoundaryY;
					}
				} else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px';
				}
			}
			this.x = x;
			this.y = y;
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px';
			}
		},
		_pos: function(x, y) {
			if (x < 0) {
				x = 0;
			} else if (x > this.maxPosX) {
				x = this.maxPosX;
			}
			if (y < 0) {
				y = 0;
			} else if (y > this.maxPosY) {
				y = this.maxPosY;
			}
			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
			this.scroller.scrollTo(x, y);
		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return;
			}
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
			var time = val ? 250 : 500,
				delay = val ? 0 : 300;
			val = val ? '1' : '0';
			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};
	IScroll.utils = utils;
	if (typeof module != 'undefined' && module.exports) {
		module.exports = IScroll;
	} else if (typeof define == 'function' && define.amd) {
		define(function() { return IScroll; });
	} else {
		window.IScroll = IScroll;
	}
})(window, document, Math);
/* module spritespin */
// function on
jQuery(document).ready(function() {
	spritespinInit();
});

// function init
// more option see http://spritespin.ginie.eu/howto/
function spritespinInit() {
	var spritespinElms = jQuery(".mySpriteSpin");
	spritespinElms.each(function(ind, el) {
		jQuery(this).spritespin({
			// path to the source images.
			source: [
			"assets/img/spritespin/rad_zoom_001.jpg",
			"assets/img/spritespin/rad_zoom_004.jpg",
			"assets/img/spritespin/rad_zoom_008.jpg",
			"assets/img/spritespin/rad_zoom_012.jpg",
			"assets/img/spritespin/rad_zoom_016.jpg",
			"assets/img/spritespin/rad_zoom_020.jpg",
			"assets/img/spritespin/rad_zoom_024.jpg",
			"assets/img/spritespin/rad_zoom_028.jpg",
			"assets/img/spritespin/rad_zoom_032.jpg",
			],
			width: 480, // width in pixels of the window/frame
			height: 327, // height in pixels of the window/frame
			frameTime: 160
		});
	});
}

// plugin spritespin 4.1.0
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (factory((global.SpriteSpin = {})));
}(this, (function(exports) {
	'use strict';
	/**
	 * @internal
	 */
	var Api = /** @class */ (function() {
		function Api(data) {
			this.data = data;
		}
		return Api;
	}());
	/**
	 * Adds methods to the SpriteSpin api
	 *
	 * @public
	 */
	function extendApi(methods) {
		var api = Api.prototype;
		for (var key in methods) {
			if (methods.hasOwnProperty(key)) {
				if (api[key]) {
					throw new Error('API method is already defined: ' + key);
				} else {
					api[key] = methods[key];
				}
			}
		}
		return api;
	}
	var $$1 = window.jQuery || window.$;

	function getCursorPosition(event) {
		var touches = event.touches;
		var source = event;
		// jQuery Event normalization does not preserve the 'event.touches'
		// try to grab touches from the original event
		if (event.touches === undefined && event.originalEvent !== undefined) {
			touches = event.originalEvent.touches;
		}
		// get current touch or mouse position
		if (touches !== undefined && touches.length > 0) {
			source = touches[0];
		}
		return {
			x: source.clientX || 0,
			y: source.clientY || 0
		};
	}
	var canvas;
	var context;

	function detectionContext() {
		if (context) {
			return context;
		}
		if (!canvas) {
			canvas = document.createElement('canvas');
		}
		if (!canvas || !canvas.getContext) {
			return null;
		}
		context = canvas.getContext('2d');
		return context;
	}
	/**
	 * Idea taken from https://github.com/stomita/ios-imagefile-megapixel
	 * Detects whether the image has been sub sampled by the browser and does not have its original dimensions.
	 * This method unfortunately does not work for images that have transparent background.
	 */
	function detectSubsampling(img, width, height) {
		if (!detectionContext()) {
			return false;
		}
		// sub sampling happens on images above 1 megapixel
		if (width * height <= 1024 * 1024) {
			return false;
		}
		// set canvas to 1x1 pixel size and fill it with magenta color
		canvas.width = canvas.height = 1;
		context.fillStyle = '#FF00FF';
		context.fillRect(0, 0, 1, 1);
		// render the image with a negative offset to the left so that it would
		// fill the canvas pixel with the top right pixel of the image.
		context.drawImage(img, -width + 1, 0);
		// check color value to confirm image is covering edge pixel or not.
		// if color still magenta, the image is assumed to be sub sampled.
		try {
			var dat = context.getImageData(0, 0, 1, 1).data;
			return (dat[0] === 255) && (dat[1] === 0) && (dat[2] === 255);
		} catch (err) {
			// avoids cross origin exception for chrome when code runs without a server
			return false;
		}
	}
	/**
	 *
	 */
	function getOuterSize(data) {
		var width = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
		var height = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
		return {
			aspect: width / height,
			height: height,
			width: width
		};
	}

	function getComputedSize(data) {
		var size = getOuterSize(data);
		if (typeof window.getComputedStyle !== 'function') {
			return size;
		}
		var style = window.getComputedStyle(data.target[0]);
		if (!style.width) {
			return size;
		}
		size.width = Math.floor(Number(style.width.replace('px', '')));
		size.height = Math.floor(size.width / size.aspect);
		return size;
	}
	/**
	 *
	 */
	function getInnerSize(data) {
		var width = Math.floor(data.frameWidth || data.width || data.target.innerWidth());
		var height = Math.floor(data.frameHeight || data.height || data.target.innerHeight());
		return {
			aspect: width / height,
			height: height,
			width: width
		};
	}
	/**
	 *
	 */
	function getInnerLayout(mode, inner, outer) {
		// get mode
		var isFit = mode === 'fit';
		var isFill = mode === 'fill';
		var isMatch = mode === 'stretch';
		// resulting layout
		var layout = {
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			position: 'absolute',
			overflow: 'hidden'
		};
		// no calculation here
		if (!mode || isMatch) {
			return layout;
		}
		// get size and aspect
		var aspectIsGreater = inner.aspect >= outer.aspect;
		// mode == original
		var width = inner.width;
		var height = inner.height;
		// keep aspect ratio but fit/fill into container
		if (isFit && aspectIsGreater || isFill && !aspectIsGreater) {
			width = outer.width;
			height = outer.width / inner.aspect;
		}
		if (isFill && aspectIsGreater || isFit && !aspectIsGreater) {
			height = outer.height;
			width = outer.height * inner.aspect;
		}
		// floor the numbers
		width = Math.floor(width);
		height = Math.floor(height);
		// position in center
		layout.width = width;
		layout.height = height;
		layout.top = Math.floor((outer.height - height) / 2);
		layout.left = Math.floor((outer.width - width) / 2);
		layout.right = layout.left;
		layout.bottom = layout.top;
		return layout;
	}
	var img;
	/**
	 * gets the original width and height of an image element
	 */
	function naturalSize(image) {
		// for browsers that support naturalWidth and naturalHeight properties
		if (image.naturalWidth) {
			return {
				height: image.naturalHeight,
				width: image.naturalWidth
			};
		}
		// browsers that do not support naturalWidth and naturalHeight properties have to fall back to the width and
		// height properties. However, the image might have a css style applied so width and height would return the
		// css size. To avoid that create a new Image object that is free of css rules and grab width and height
		// properties
		//
		// assume that the src has already been downloaded, so no onload callback is needed.
		img = img || new Image();
		img.crossOrigin = image.crossOrigin;
		img.src = image.src;
		return {
			height: img.height,
			width: img.width
		};
	}
	/**
	 * Measures the image frames that are used in the given data object
	 */
	function measure(images, options) {
		if (images.length === 1) {
			return [measureSheet(images[0], options)];
		} else if (options.framesX && options.framesY) {
			return measureMutipleSheets(images, options);
		} else {
			return measureFrames(images, options);
		}
	}

	function measureSheet(image, options) {
		var result = { id: 0, sprites: [] };
		measureImage(image, options, result);
		var frames = options.frames;
		var framesX = Number(options.framesX) || frames;
		var framesY = Math.ceil(frames / framesX);
		var frameWidth = Math.floor(result.width / framesX);
		var frameHeight = Math.floor(result.height / framesY);
		var divisor = result.isSubsampled ? 2 : 1;
		for (var i = 0; i < frames; i++) {
			var x = (i % framesX) * frameWidth;
			var y = Math.floor(i / framesX) * frameHeight;
			result.sprites.push({
				id: i,
				x: x,
				y: y,
				width: frameWidth,
				height: frameHeight,
				sampledX: x / divisor,
				sampledY: y / divisor,
				sampledWidth: frameWidth / divisor,
				sampledHeight: frameHeight / divisor
			});
		}
		return result;
	}

	function measureFrames(images, options) {
		var result = [];
		for (var id = 0; id < images.length; id++) {
			// TODO: optimize
			// don't measure images with same size twice
			var sheet = measureSheet(images[id], { frames: 1, framesX: 1, detectSubsampling: options.detectSubsampling });
			sheet.id = id;
			result.push(sheet);
		}
		return result;
	}

	function measureMutipleSheets(images, options) {
		var result = [];
		for (var id = 0; id < images.length; id++) {
			// TODO: optimize
			// don't measure images with same size twice
			var sheet = measureSheet(images[id], {
				frames: undefined,
				framesX: options.framesX,
				framesY: options.framesY,
				detectSubsampling: options.detectSubsampling
			});
			sheet.id = id;
			result.push(sheet);
		}
		return result;
	}

	function measureImage(image, options, result) {
		var size = naturalSize(image);
		result.isSubsampled = options.detectSubsampling && detectSubsampling(image, size.width, size.height);
		result.width = size.width;
		result.height = size.height;
		result.sampledWidth = size.width / (result.isSubsampled ? 2 : 1);
		result.sampledHeight = size.height / (result.isSubsampled ? 2 : 1);
		return result;
	}

	function findSpecs(metrics, frames, frame, lane) {
		var spriteId = lane * frames + frame;
		var sheetId = 0;
		var sprite = null;
		var sheet = null;
		while (true) {
			sheet = metrics[sheetId];
			if (!sheet) {
				break;
			}
			if (spriteId >= sheet.sprites.length) {
				spriteId -= sheet.sprites.length;
				sheetId++;
				continue;
			}
			sprite = sheet.sprites[spriteId];
			break;
		}
		return { sprite: sprite, sheet: sheet };
	}

	function indexOf(element, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === element) {
				return i;
			}
		}
	}

	function noop() {
		//
	}

	function preload(opts) {
		var src;
		var input = opts.source;
		src = typeof input === 'string' ? [input] : input;
		// const src: string[] =  ? [opts.source] : opts.source
		var images = [];
		var targetCount = (opts.preloadCount || src.length);
		var onInitiated = opts.initiated || noop;
		var onProgress = opts.progress || noop;
		var onComplete = opts.complete || noop;
		var count = 0;
		var completed = false;
		var firstLoaded = false;
		var tick = function() {
			count += 1;
			onProgress({
				index: indexOf(this, images),
				loaded: count,
				total: src.length,
				percent: Math.round((count / src.length) * 100)
			});
			firstLoaded = firstLoaded || (this === images[0]);
			if (firstLoaded && !completed && (count >= targetCount)) {
				completed = true;
				onComplete(images);
			}
		};
		for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
			var url = src_1[_i];
			var img = new Image();
			// push result
			images.push(img);
			// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
			img.crossOrigin = opts.crossOrigin;
			// bind logic, don't care about abort/errors
			img.onload = img.onabort = img.onerror = tick;
			// begin load
			img.src = url;
		}
		onInitiated(images);
	}

	function padNumber(num, length, pad) {
		var result = String(num);
		while (result.length < length) {
			result = String(pad) + result;
		}
		return result;
	}
	/**
	 * Generates an array of source strings
	 *
	 * @remarks
	 * Takes a template string and generates an array of strings by interpolating {lane} and {frame} placeholders.
	 *
	 * ```
	 * sourceArray('http://example.com/image_{frame}.jpg, { frame: [1, 3], digits: 2 })
	 * // gives:
	 * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
	 *
	 * sourceArray('http://example.com/image_FRAME.jpg, { frame: [1, 3], digits: 2, framePlacer: 'FRAME' })
	 * // gives:
	 * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
	 * ```
	 *
	 * @param template - The template string
	 * @param opts - Interpolation options
	 *
	 * @public
	 */
	function sourceArray(template, opts) {
		var digits = opts.digits || 2;
		var lPlacer = opts.lanePlacer || '{lane}';
		var fPlacer = opts.framePlacer || '{frame}';
		var fStart = 0;
		var fEnd = 0;
		if (opts.frame) {
			fStart = opts.frame[0];
			fEnd = opts.frame[1];
		}
		var lStart = 0;
		var lEnd = 0;
		if (opts.lane) {
			lStart = opts.lane[0];
			lEnd = opts.lane[1];
		}
		var result = [];
		for (var lane = lStart; lane <= lEnd; lane += 1) {
			for (var frame = fStart; frame <= fEnd; frame += 1) {
				result.push(template.replace(lPlacer, padNumber(lane, digits, '0')).replace(fPlacer, padNumber(frame, digits, '0')));
			}
		}
		return result;
	}
	/**
	 * The namespace that is used to bind functions to DOM events and store the data object
	 */
	var namespace = 'spritespin';
	/**
	 * Event names that are recognized by SpriteSpin. A module can implement any of these and they will be bound
	 * to the target element on which the plugin is called.
	 */
	var eventNames = ['mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseover', 'mouseleave', 'mousewheel', 'wheel', 'click', 'dblclick', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'selectstart', 'gesturestart', 'gesturechange', 'gestureend'];
	/**
	 *
	 */
	var callbackNames = ['onInit', 'onProgress', 'onLoad', 'onFrameChanged', 'onFrame', 'onDraw', 'onComplete', 'onDestroy'];
	/**
	 * Names of events for that the default behavior should be prevented.
	 */
	var eventsToPrevent = ['dragstart'];
	/**
	 * Default set of SpriteSpin options. This also represents the majority of data attributes that are used during the
	 * lifetime of a SpriteSpin instance. The data is stored inside the target DOM element on which the plugin is called.
	 */
	var defaults = {
		source: undefined,
		width: undefined,
		height: undefined,
		frames: undefined,
		framesX: undefined,
		lanes: 1,
		sizeMode: undefined,
		renderer: 'canvas',
		lane: 0,
		frame: 0,
		frameTime: 40,
		animate: true,
		retainAnimate: false,
		reverse: false,
		loop: true,
		stopFrame: 0,
		wrap: true,
		wrapLane: false,
		sense: 1,
		senseLane: undefined,
		orientation: 'horizontal',
		detectSubsampling: true,
		preloadCount: undefined,
		touchScrollTimer: [200, 1500],
		responsive: undefined,
		plugins: undefined
	};

	function noop$1() {
		// noop
	}

	function wrapConsole(type) {
		return console && console[type] ? function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) {
				args[_i] = arguments[_i];
			}
			return console.log.apply(console, args);
		} : noop$1;
	}
	var log = wrapConsole('log');
	var warn = wrapConsole('warn');
	var error = wrapConsole('error');

	function toArray(value) {
		return Array.isArray(value) ? value : [value];
	}
	/**
	 * clamps the given value by the given min and max values
	 */
	function clamp(value, min, max) {
		return (value > max ? max : (value < min ? min : value));
	}
	/**
	 *
	 */
	function wrap(value, min, max, size) {
		while (value > max) {
			value -= size;
		}
		while (value < min) {
			value += size;
		}
		return value;
	}
	/**
	 * prevents default action on the given event
	 */
	function prevent(e) {
		e.preventDefault();
		return false;
	}
	/**
	 * Binds on the given target and event the given function.
	 * The SpriteSpin namespace is attached to the event name
	 */
	function bind(target, event, func) {
		if (func) {
			target.bind(event + '.' + namespace, function(e) {
				func.apply(target, [e, target.spritespin('data')]);
			});
		}
	}
	/**
	 * Unbinds all SpriteSpin events from given target element
	 */
	function unbind(target) {
		target.unbind('.' + namespace);
	}
	/**
	 * Checks if given object is a function
	 */
	function isFunction(fn) {
		return typeof fn === 'function';
	}

	function pixelRatio(context) {
		var devicePixelRatio = window.devicePixelRatio || 1;
		var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
		return devicePixelRatio / backingStoreRatio;
	}
	/**
	 * Applies css attributes to layout the SpriteSpin containers.
	 *
	 * @internal
	 */
	function applyLayout(data) {
		// disable selection
		data.target.attr('unselectable', 'on').css({
			width: '',
			height: '',
			'-ms-user-select': 'none',
			'-moz-user-select': 'none',
			'-khtml-user-select': 'none',
			'-webkit-user-select': 'none',
			'user-select': 'none'
		});
		var size = data.responsive ? getComputedSize(data) : getOuterSize(data);
		var layout = getInnerLayout(data.sizeMode, getInnerSize(data), size);
		// apply layout on target
		data.target.css({
			width: size.width,
			height: size.height,
			position: 'relative',
			overflow: 'hidden'
		});
		// apply layout on stage
		data.stage.css(layout).hide();
		if (!data.canvas) {
			return;
		}
		// apply layout on canvas
		data.canvas.css(layout).hide();
		// apply pixel ratio on canvas
		data.canvasRatio = data.canvasRatio || pixelRatio(data.context);
		if (typeof layout.width === 'number' && typeof layout.height === 'number') {
			data.canvas[0].width = (layout.width * data.canvasRatio) || size.width;
			data.canvas[0].height = (layout.height * data.canvasRatio) || size.height;
		} else {
			data.canvas[0].width = (size.width * data.canvasRatio);
			data.canvas[0].height = (size.height * data.canvasRatio);
		}
		// width and height must be set before calling scale
		data.context.scale(data.canvasRatio, data.canvasRatio);
	}
	/**
	 * Gets a state object by name.
	 * @internal
	 * @param data - The SpriteSpin instance data
	 * @param name - The name of the state object
	 */
	function getState(data, name) {
		data.state = data.state || {};
		data.state[name] = data.state[name] || {};
		return data.state[name];
	}
	/**
	 * Gets a plugin state object by name.
	 *
	 * @remarks
	 * Plugins should use this method to get or create a state object where they can
	 * store any instance variables.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 * @param name - The name of the plugin
	 */
	function getPluginState(data, name) {
		var state = getState(data, 'plugin');
		state[name] = state[name] || {};
		return state[name];
	}
	/**
	 * Checks whether a flag is set. See {@link flag}.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 * @param key - The name of the flag
	 */
	function is(data, key) {
		return !!getState(data, 'flags')[key];
	}
	/**
	 * Sets a flag value. See {@link is}.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 * @param key - The name of the flag
	 * @param value - The value to set
	 */
	function flag(data, key, value) {
		getState(data, 'flags')[key] = !!value;
	}
	/**
	 * Gets the playback state
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 */
	function getPlaybackState(data) {
		return getState(data, 'playback');
	}

	function updateLane(data, lane) {
		data.lane = data.wrapLane ? wrap(lane, 0, data.lanes - 1, data.lanes) : clamp(lane, 0, data.lanes - 1);
	}

	function updateAnimationFrame(data) {
		data.frame += (data.reverse ? -1 : 1);
		// wrap the frame value to fit in range [0, data.frames)
		data.frame = wrap(data.frame, 0, data.frames - 1, data.frames);
		// stop animation if loop is disabled and the stopFrame is reached
		if (!data.loop && (data.frame === data.stopFrame)) {
			stopAnimation(data);
		}
	}

	function updateInputFrame(data, frame) {
		data.frame = Number(frame);
		data.frame = data.wrap ? wrap(data.frame, 0, data.frames - 1, data.frames) : clamp(data.frame, 0, data.frames - 1);
	}

	function updateAnimation(data) {
		var state = getPlaybackState(data);
		if (state.handler) {
			updateBefore(data);
			updateAnimationFrame(data);
			updateAfter(data);
		}
	}

	function updateBefore(data) {
		var state = getPlaybackState(data);
		state.lastFrame = data.frame;
		state.lastLane = data.lane;
	}

	function updateAfter(data) {
		var state = getPlaybackState(data);
		if (state.lastFrame !== data.frame || state.lastLane !== data.lane) {
			data.target.trigger('onFrameChanged.' + namespace, data);
		}
		data.target.trigger('onFrame.' + namespace, data);
		data.target.trigger('onDraw.' + namespace, data);
	}
	/**
	 * Updates the frame or lane number of the SpriteSpin data.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 * @param frame - The frame number to set
	 * @param lane - The lane number to set
	 */
	function updateFrame(data, frame, lane) {
		updateBefore(data);
		if (frame != null) {
			updateInputFrame(data, frame);
		}
		if (lane != null) {
			updateLane(data, lane);
		}
		updateAfter(data);
	}
	/**
	 * Stops the running animation.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 */
	function stopAnimation(data) {
		data.animate = false;
		var state = getPlaybackState(data);
		if (state.handler != null) {
			window.clearInterval(state.handler);
			state.handler = null;
		}
	}
	/**
	 * Starts animation playback if needed.
	 *
	 * @remarks
	 * Starts animation playback if `animate` property is `true` and the animation is not yet running.
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 */
	function applyAnimation(data) {
		var state = getPlaybackState(data);
		if (state.handler && (!data.animate || state.frameTime !== data.frameTime)) {
			stopAnimation(data);
		}
		if (data.animate && !state.handler) {
			state.frameTime = data.frameTime;
			state.handler = window.setInterval(function() { return updateAnimation(data); }, state.frameTime);
		}
	}
	/**
	 * Starts the animation playback
	 *
	 * @remarks
	 * Starts the animation playback and also sets the `animate` property to `true`
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 */
	function startAnimation(data) {
		data.animate = true;
		applyAnimation(data);
	}
	var plugins = {};
	/**
	 * Registers a plugin.
	 *
	 * @remarks
	 * Use this to add custom Rendering or Updating modules that can be addressed with the 'module' option.
	 *
	 * @public
	 * @param name - The name of the plugin
	 * @param plugin - The plugin implementation
	 */
	function registerPlugin(name, plugin) {
		if (plugins[name]) {
			error("Plugin name \"" + name + "\" is already taken");
			return;
		}
		plugin = plugin || {};
		plugins[name] = plugin;
		return plugin;
	}
	/**
	 * Registers a plugin.
	 *
	 * @public
	 * @deprecated Use {@link registerPlugin} instead
	 * @param name - The name of the plugin
	 * @param plugin - The plugin implementation
	 */
	function registerModule(name, plugin) {
		warn('"registerModule" is deprecated, use "registerPlugin" instead');
		registerPlugin(name, plugin);
	}
	/**
	 * Gets an active plugin by name
	 *
	 * @internal
	 * @param name - The name of the plugin
	 */
	function getPlugin(name) {
		return plugins[name];
	}
	/**
	 * Replaces module names on given SpriteSpin data and replaces them with actual implementations.
	 * @internal
	 */
	function applyPlugins(data) {
		fixPlugins(data);
		for (var i = 0; i < data.plugins.length; i += 1) {
			var name_1 = data.plugins[i];
			if (typeof name_1 !== 'string') {
				continue;
			}
			var plugin = getPlugin(name_1);
			if (!plugin) {
				error('No plugin found with name ' + name_1);
				continue;
			}
			data.plugins[i] = plugin;
		}
	}

	function fixPlugins(data) {
		// tslint:disable no-string-literal
		if (data['mods']) {
			warn('"mods" option is deprecated, use "plugins" instead');
			data.plugins = data['mods'];
			delete data['mods'];
		}
		if (data['behavior']) {
			warn('"behavior" option is deprecated, use "plugins" instead');
			data.plugins.push(data['behavior']);
			delete data['behavior'];
		}
		if (data['module']) {
			warn('"module" option is deprecated, use "plugins" instead');
			data.plugins.push(data['module']);
			delete data['module'];
		}
	}
	var $$2 = $$1;
	var counter = 0;
	/**
	 * Collection of all SpriteSpin instances
	 */
	var instances = {};

	function pushInstance(data) {
		counter += 1;
		data.id = String(counter);
		instances[data.id] = data;
	}

	function popInstance(data) {
		delete instances[data.id];
	}

	function eachInstance(cb) {
		for (var id in instances) {
			if (instances.hasOwnProperty(id)) {
				cb(instances[id]);
			}
		}
	}
	var lazyinit = function() {
		// replace function with a noop
		// this logic must run only once
		lazyinit = function() {};

		function onEvent(eventName, e) {
			eachInstance(function(data) {
				for (var _i = 0, _a = data.plugins; _i < _a.length; _i++) {
					var module_1 = _a[_i];
					if (typeof module_1[eventName] === 'function') {
						module_1[eventName].apply(data.target, [e, data]);
					}
				}
			});
		}

		function onResize() {
			eachInstance(function(data) {
				if (data.responsive) {
					boot(data);
				}
			});
		}
		var _loop_1 = function(eventName) {
			$$2(window.document).bind(eventName + '.' + namespace, function(e) {
				onEvent('document' + eventName, e);
			});
		};
		for (var _i = 0, eventNames_1 = eventNames; _i < eventNames_1.length; _i++) {
			var eventName = eventNames_1[_i];
			_loop_1(eventName);
		}
		var resizeTimeout = null;
		$$2(window).on('resize', function() {
			window.clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(onResize, 100);
		});
	};
	/**
	 * (re)binds all spritespin events on the target element
	 *
	 * @internal
	 */
	function applyEvents(data) {
		var target = data.target;
		// Clear all SpriteSpin events on the target element
		unbind(target);
		// disable all default browser behavior on the following events
		// mainly prevents image drag operation
		for (var _i = 0, eventsToPrevent_1 = eventsToPrevent; _i < eventsToPrevent_1.length; _i++) {
			var eName = eventsToPrevent_1[_i];
			bind(target, eName, prevent);
		}
		// Bind module functions to SpriteSpin events
		for (var _a = 0, _b = data.plugins; _a < _b.length; _a++) {
			var plugin = _b[_a];
			for (var _c = 0, eventNames_2 = eventNames; _c < eventNames_2.length; _c++) {
				var eName = eventNames_2[_c];
				bind(target, eName, plugin[eName]);
			}
			for (var _d = 0, callbackNames_1 = callbackNames; _d < callbackNames_1.length; _d++) {
				var eName = callbackNames_1[_d];
				bind(target, eName, plugin[eName]);
			}
		}
		// bind auto start function to load event.
		bind(target, 'onLoad', function(e, d) {
			applyAnimation(d);
		});
		// bind all user events that have been passed on initialization
		for (var _e = 0, callbackNames_2 = callbackNames; _e < callbackNames_2.length; _e++) {
			var eName = callbackNames_2[_e];
			bind(target, eName, data[eName]);
		}
	}

	function applyMetrics(data) {
		if (!data.images) {
			data.metrics = [];
		}
		data.metrics = measure(data.images, data);
		var spec = findSpecs(data.metrics, data.frames, 0, 0);
		if (spec.sprite) {
			// TODO: try to remove frameWidth/frameHeight
			data.frameWidth = spec.sprite.width;
			data.frameHeight = spec.sprite.height;
		}
	}
	/**
	 * Runs the boot process.
	 *
	 * @remarks
	 * (re)initializes plugins, (re)initializes the layout, (re)binds events and loads source images.
	 *
	 * @internal
	 */
	function boot(data) {
		applyPlugins(data);
		applyEvents(data);
		applyLayout(data);
		data.source = toArray(data.source);
		data.loading = true;
		data.target.addClass('loading').trigger('onInit.' + namespace, data);
		preload({
			source: data.source,
			crossOrigin: data.crossOrigin,
			preloadCount: data.preloadCount,
			progress: function(progress) {
				data.progress = progress;
				data.target.trigger('onProgress.' + namespace, data);
			},
			complete: function(images) {
				data.images = images;
				data.loading = false;
				data.frames = data.frames || images.length;
				applyMetrics(data);
				applyLayout(data);
				data.stage.show();
				data.target.removeClass('loading').trigger('onLoad.' + namespace, data).trigger('onFrame.' + namespace, data).trigger('onDraw.' + namespace, data).trigger('onComplete.' + namespace, data);
			}
		});
	}
	/**
	 * Creates a new SpriteSpin instance
	 *
	 * @public
	 */
	function create(options) {
		var _this = this;
		var target = options.target;
		// SpriteSpin is not initialized
		// Create default settings object and extend with given options
		var data = $$2.extend(true, {}, defaults, options);
		// ensure source is set
		data.source = data.source || [];
		// ensure plugins are set
		data.plugins = data.plugins || ['360', 'drag'];
		// if image tags are contained inside this DOM element
		// use these images as the source files
		target.find('img').each(function() {
			if (!Array.isArray(data.source)) {
				data.source = [];
			}
			data.source.push($$2(_this).attr('src'));
		});
		// build inner html
		// <div>
		//   <div class='spritespin-stage'></div>
		//   <canvas class='spritespin-canvas'></canvas>
		// </div>
		target.empty().addClass('spritespin-instance').append("<div class='spritespin-stage'></div>");
		// add the canvas element if canvas rendering is enabled and supported
		if (data.renderer === 'canvas') {
			var canvas = document.createElement('canvas');
			if (!!(canvas.getContext && canvas.getContext('2d'))) {
				data.canvas = $$2(canvas).addClass('spritespin-canvas');
				data.context = canvas.getContext('2d');
				target.append(data.canvas);
				target.addClass('with-canvas');
			} else {
				// fallback to image rendering mode
				data.renderer = 'image';
			}
		}
		// setup references to DOM elements
		data.target = target;
		data.stage = target.find('.spritespin-stage');
		// store the data
		target.data(namespace, data);
		pushInstance(data);
		return data;
	}
	/**
	 * Creates a new SpriteSpin instance, or updates an existing one
	 *
	 * @public
	 */
	function createOrUpdate(options) {
		lazyinit();
		var data = options.target.data(namespace);
		if (!data) {
			data = create(options);
		} else {
			$$2.extend(data, options);
		}
		boot(data);
		return data;
	}
	/**
	 * Destroys the SpriteSpin instance
	 *
	 * @remarks
	 * - stops running animation
	 * - unbinds all events
	 * - deletes the data on the target element
	 *
	 * @public
	 */
	function destroy(data) {
		popInstance(data);
		stopAnimation(data);
		data.target.trigger('onDestroy', data).html(null).attr('style', null).attr('unselectable', null).removeClass(['spritespin-instance', 'with-canvas']);
		unbind(data.target);
		data.target.removeData(namespace);
	}
	/**
	 * Gets the current input state
	 *
	 * @public
	 * @param data - The SpriteSpin instance data
	 */
	function getInputState(data) {
		return getState(data, 'input');
	}
	/**
	 * Updates the input state using a mouse or touch event.
	 *
	 * @public
	 * @param e - The input event
	 * @param data - The SpriteSpin instance data
	 */
	function updateInput(e, data) {
		var cursor = getCursorPosition(e);
		var state = getInputState(data);
		// cache positions from previous frame
		state.oldX = state.currentX;
		state.oldY = state.currentY;
		state.currentX = cursor.x;
		state.currentY = cursor.y;
		// Fix old position.
		if (state.oldX === undefined || state.oldY === undefined) {
			state.oldX = state.currentX;
			state.oldY = state.currentY;
		}
		// Cache the initial click/touch position and store the frame number at which the click happened.
		// Useful for different behavior implementations. This must be restored when the click/touch is released.
		if (state.startX === undefined || state.startY === undefined) {
			state.startX = state.currentX;
			state.startY = state.currentY;
			state.clickframe = data.frame;
			state.clicklane = data.lane;
		}
		// Calculate the vector from start position to current pointer position.
		state.dX = state.currentX - state.startX;
		state.dY = state.currentY - state.startY;
		// Calculate the vector from last frame position to current pointer position.
		state.ddX = state.currentX - state.oldX;
		state.ddY = state.currentY - state.oldY;
		// Normalize vectors to range [-1:+1]
		state.ndX = state.dX / data.target.innerWidth();
		state.ndY = state.dY / data.target.innerHeight();
		state.nddX = state.ddX / data.target.innerWidth();
		state.nddY = state.ddY / data.target.innerHeight();
	}
	/**
	 * Resets the input state.
	 *
	 * @public
	 */
	function resetInput(data) {
		var input = getInputState(data);
		input.startX = input.startY = undefined;
		input.currentX = input.currentY = undefined;
		input.oldX = input.oldY = undefined;
		input.dX = input.dY = 0;
		input.ddX = input.ddY = 0;
		input.ndX = input.ndY = 0;
		input.nddX = input.nddY = 0;
	}

	function extension(option, value) {
		var $target = $$1(this);
		if (option === 'data') {
			return $target.data(namespace);
		}
		if (option === 'api') {
			var data = $target.data(namespace);
			data.api = data.api || new Api(data);
			return data.api;
		}
		if (option === 'destroy') {
			return $target.each(function() {
				var data = $target.data(namespace);
				if (data) {
					destroy(data);
				}
			});
		}
		if (arguments.length === 2 && typeof option === 'string') {
			option = (_a = {}, _a[option] = value, _a);
		}
		if (typeof option === 'object') {
			return createOrUpdate($$1.extend(true, { target: $target }, option)).target;
		}
		throw new Error('Invalid call to spritespin');
		var _a;
	}
	$$1.fn[namespace] = extension;
	// tslint:disable:object-literal-shorthand
	// tslint:disable:only-arrow-functions
	extendApi({
		// Gets a value indicating whether the animation is currently running.
		isPlaying: function() {
			return getPlaybackState(this.data).handler != null;
		},
		// Gets a value indicating whether the animation looping is enabled.
		isLooping: function() {
			return this.data.loop;
		},
		// Starts/Stops the animation playback
		toggleAnimation: function() {
			if (this.isPlaying()) {
				this.stopAnimation();
			} else {
				this.startAnimation();
			}
		},
		// Stops animation playback
		stopAnimation: function() {
			this.data.animate = false;
			stopAnimation(this.data);
		},
		// Starts animation playback
		startAnimation: function() {
			this.data.animate = true;
			applyAnimation(this.data);
		},
		// Sets a value indicating whether the animation should be looped or not.
		// This might start the animation (if the 'animate' data attribute is set to true)
		loop: function(value) {
			this.data.loop = value;
			applyAnimation(this.data);
			return this;
		},
		// Gets the current frame number
		currentFrame: function() {
			return this.data.frame;
		},
		// Updates SpriteSpin to the specified frame.
		updateFrame: function(frame) {
			updateFrame(this.data, frame);
			return this;
		},
		// Skips the given number of frames
		skipFrames: function(step) {
			var data = this.data;
			updateFrame(data, data.frame + (data.reverse ? -step : +step));
			return this;
		},
		// Updates SpriteSpin so that the next frame is shown
		nextFrame: function() {
			return this.skipFrames(1);
		},
		// Updates SpriteSpin so that the previous frame is shown
		prevFrame: function() {
			return this.skipFrames(-1);
		},
		// Starts the animations that will play until the given frame number is reached
		// options:
		//   force [boolean] starts the animation, even if current frame is the target frame
		//   nearest [boolean] animates to the direction with minimum distance to the target frame
		playTo: function(frame, options) {
			var data = this.data;
			options = options || {};
			if (!options.force && data.frame === frame) {
				return;
			}
			if (options.nearest) {
				// distance to the target frame
				var a = frame - data.frame;
				// distance to last frame and the to target frame
				var b = frame > data.frame ? a - data.frames : a + data.frames;
				// minimum distance
				var c = Math.abs(a) < Math.abs(b) ? a : b;
				data.reverse = c < 0;
			}
			data.animate = true;
			data.loop = false;
			data.stopFrame = frame;
			applyAnimation(data);
			return this;
		}
	});

	function pick(target, names) {
		for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
			var name_1 = names_1[_i];
			if (target[name_1] || name_1 in target) {
				return name_1;
			}
		}
		return names[0];
	}
	var browser = {
		requestFullscreen: pick(document.documentElement, ['requestFullscreen', 'webkitRequestFullScreen', 'mozRequestFullScreen', 'msRequestFullscreen']),
		exitFullscreen: pick(document, ['exitFullscreen', 'webkitExitFullscreen', 'webkitCancelFullScreen', 'mozCancelFullScreen', 'msExitFullscreen']),
		fullscreenElement: pick(document, ['fullscreenElement', 'webkitFullscreenElement', 'webkitCurrentFullScreenElement', 'mozFullScreenElement', 'msFullscreenElement']),
		fullscreenEnabled: pick(document, ['fullscreenEnabled', 'webkitFullscreenEnabled', 'mozFullScreenEnabled', 'msFullscreenEnabled']),
		fullscreenchange: pick(document, ['onfullscreenchange', 'onwebkitfullscreenchange', 'onmozfullscreenchange', 'onMSFullscreenChange']).replace(/^on/, ''),
		fullscreenerror: pick(document, ['onfullscreenerror', 'onwebkitfullscreenerror', 'onmozfullscreenerror', 'onMSFullscreenError']).replace(/^on/, '')
	};
	var changeEvent = browser.fullscreenchange + '.' + namespace + '-fullscreen';

	function unbindChangeEvent() {
		$$1(document).unbind(changeEvent);
	}

	function bindChangeEvent(callback) {
		unbindChangeEvent();
		$$1(document).bind(changeEvent, callback);
	}
	var orientationEvent = 'orientationchange.' + namespace + '-fullscreen';

	function unbindOrientationEvent() {
		$$1(window).unbind(orientationEvent);
	}

	function bindOrientationEvent(callback) {
		unbindOrientationEvent();
		$$1(window).bind(orientationEvent, callback);
	}

	function requestFullscreenNative(e) {
		e = e || document.documentElement;
		e[browser.requestFullscreen]();
	}

	function exitFullscreen() {
		return document[browser.exitFullscreen]();
	}

	function fullscreenEnabled() {
		return document[browser.fullscreenEnabled];
	}

	function fullscreenElement() {
		return document[browser.fullscreenElement];
	}

	function isFullscreen() {
		return !!fullscreenElement();
	}

	function toggleFullscreen(data, opts) {
		if (isFullscreen()) {
			this.apiRequestFullscreen(opts);
		} else {
			this.exitFullscreen();
		}
	}

	function requestFullscreen(data, opts) {
		opts = opts || {};
		var oWidth = data.width;
		var oHeight = data.height;
		var oSource = data.source;
		var oSize = data.sizeMode;
		var oResponsive = data.responsive;
		var enter = function() {
			data.width = window.screen.width;
			data.height = window.screen.height;
			data.source = (opts.source || oSource);
			data.sizeMode = opts.sizeMode || 'fit';
			data.responsive = false;
			boot(data);
		};
		var exit = function() {
			data.width = oWidth;
			data.height = oHeight;
			data.source = oSource;
			data.sizeMode = oSize;
			data.responsive = oResponsive;
			boot(data);
		};
		bindChangeEvent(function() {
			if (isFullscreen()) {
				enter();
				bindOrientationEvent(enter);
			} else {
				unbindChangeEvent();
				unbindOrientationEvent();
				exit();
			}
		});
		requestFullscreenNative(data.target[0]);
	}
	extendApi({
		fullscreenEnabled: fullscreenEnabled,
		fullscreenElement: fullscreenElement,
		exitFullscreen: exitFullscreen,
		toggleFullscreen: function(opts) {
			toggleFullscreen(this.data, opts);
		},
		requestFullscreen: function(opts) {
			requestFullscreen(this.data, opts);
		}
	});
	(function() {
		var NAME = 'click';

		function click(e, data) {
			if (data.loading || !data.stage.is(':visible')) {
				return;
			}
			updateInput(e, data);
			var input = getInputState(data);
			var half, pos;
			var target = data.target,
				offset = target.offset();
			if (data.orientation === 'horizontal') {
				half = target.innerWidth() / 2;
				pos = input.currentX - offset.left;
			} else {
				half = target.innerHeight() / 2;
				pos = input.currentY - offset.top;
			}
			updateFrame(data, data.frame + (pos > half ? 1 : -1));
		}
		registerPlugin(NAME, {
			name: NAME,
			mouseup: click,
			touchend: click
		});
	})();
	(function() {
		var NAME = 'drag';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getAxis(data) {
			if (typeof data.orientation === 'number') {
				return data.orientation * Math.PI / 180;
			}
			if (data.orientation === 'horizontal') {
				return 0;
			}
			return Math.PI / 2;
		}

		function onInit(e, data) {
			var state = getState$$1(data);
			var d = [200, 1500];
			var t = data.touchScrollTimer || d;
			state.minTime = t[0] || d[0];
			state.maxTime = t[1] || d[1];
		}

		function dragStart(e, data) {
			var state = getState$$1(data);
			if (data.loading || is(data, 'dragging') || data['zoomPinFrame'] && !data.stage.is(':visible')) {
				return;
			}
			// Touch scroll can only be disabled by cancelling the 'touchstart' event.
			// If we would try to cancel the 'touchmove' event during a scroll
			// chrome browser raises an error
			//
			// When a user interacts with sprite spin, we don't know whether the intention
			// is to scroll the page or to roll the spin.
			//
			// On first interaction with SpriteSpin the scroll is not disabled
			// On double tap within 200ms the scroll is not disabled
			// Scroll is only disabled if there was an interaction with SpriteSpin in the past 1500ms
			var now = new Date().getTime();
			if (state.endAt && (now - state.endAt > state.maxTime)) {
				// reset timer if the user has no interaction with spritespin within 1500ms
				state.startAt = null;
				state.endAt = null;
			}
			if (state.startAt && (now - state.startAt > state.minTime)) {
				// disable scroll only if there was already an interaction with spritespin
				// however, allow scrolling on double tab within 200ms
				e.preventDefault();
			}
			state.startAt = now;
			state.wasPlaying = !!getPlaybackState(data).handler;
			state.frame = data.frame || 0;
			state.lane = data.lane || 0;
			flag(data, 'dragging', true);
			updateInput(e, data);
		}

		function dragEnd(e, data) {
			if (is(data, 'dragging')) {
				getState$$1(data).endAt = new Date().getTime();
				flag(data, 'dragging', false);
				resetInput(data);
				if (data.retainAnimate && getState$$1(data).wasPlaying) {
					startAnimation(data);
				}
			}
		}

		function drag(e, data) {
			var state = getState$$1(data);
			var input = getInputState(data);
			if (!is(data, 'dragging')) {
				return;
			}
			updateInput(e, data);
			var rad = getAxis(data);
			var sn = Math.sin(rad);
			var cs = Math.cos(rad);
			var x = ((input.nddX * cs - input.nddY * sn) * data.sense) || 0;
			var y = ((input.nddX * sn + input.nddY * cs) * (data.senseLane || data.sense)) || 0;
			// accumulate
			state.frame += data.frames * x;
			state.lane += data.lanes * y;
			// update spritespin
			var oldFrame = data.frame;
			var oldLane = data.lane;
			updateFrame(data, Math.floor(state.frame), Math.floor(state.lane));
			stopAnimation(data);
		}

		function mousemove(e, data) {
			dragStart(e, data);
			drag(e, data);
		}
		registerPlugin('drag', {
			name: 'drag',
			onInit: onInit,
			mousedown: dragStart,
			mousemove: drag,
			mouseup: dragEnd,
			documentmousemove: drag,
			documentmouseup: dragEnd,
			touchstart: dragStart,
			touchmove: drag,
			touchend: dragEnd,
			touchcancel: dragEnd
		});
		registerPlugin('move', {
			name: 'move',
			onInit: onInit,
			mousemove: mousemove,
			mouseleave: dragEnd,
			touchstart: dragStart,
			touchmove: drag,
			touchend: dragEnd,
			touchcancel: dragEnd
		});
	})();
	(function() {
		var NAME = 'hold';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function rememberOptions(data) {
			var state = getState$$1(data);
			state.frameTime = data.frameTime;
			state.animate = data.animate;
			state.reverse = data.reverse;
		}

		function restoreOptions(data) {
			var state = getState$$1(data);
			data.frameTime = state.frameTime;
			data.animate = state.animate;
			data.reverse = state.reverse;
		}

		function start(e, data) {
			if (is(data, 'loading') || is(data, 'dragging') || !data.stage.is(':visible')) {
				return;
			}
			rememberOptions(data);
			updateInput(e, data);
			flag(data, 'dragging', true);
			data.animate = true;
			applyAnimation(data);
		}

		function stop(e, data) {
			flag(data, 'dragging', false);
			resetInput(data);
			stopAnimation(data);
			restoreOptions(data);
			applyAnimation(data);
		}

		function update(e, data) {
			if (!is(data, 'dragging')) {
				return;
			}
			updateInput(e, data);
			var input = getInputState(data);
			var half, delta;
			var target = data.target,
				offset = target.offset();
			if (data.orientation === 'horizontal') {
				half = target.innerWidth() / 2;
				delta = (input.currentX - offset.left - half) / half;
			} else {
				half = (data.height / 2);
				delta = (input.currentY - offset.top - half) / half;
			}
			data.reverse = delta < 0;
			delta = delta < 0 ? -delta : delta;
			data.frameTime = 80 * (1 - delta) + 20;
			if (((data.orientation === 'horizontal') && (input.dX < input.dY)) || ((data.orientation === 'vertical') && (input.dX < input.dY))) {
				e.preventDefault();
			}
		}

		function onFrame(e, data) {
			data.animate = true;
			applyAnimation(data);
		}
		registerPlugin(NAME, {
			name: NAME,
			mousedown: start,
			mousemove: update,
			mouseup: stop,
			mouseleave: stop,
			touchstart: start,
			touchmove: update,
			touchend: stop,
			touchcancel: stop,
			onFrame: onFrame
		});
	})();
	(function() {
		var NAME = 'swipe';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getOption(data, name, fallback) {
			return data[name] || fallback;
		}

		function init(e, data) {
			var state = getState$$1(data);
			state.fling = getOption(data, 'swipeFling', 10);
			state.snap = getOption(data, 'swipeSnap', 0.50);
		}

		function start(e, data) {
			if (!data.loading && !is(data, 'dragging')) {
				updateInput(e, data);
				flag(data, 'dragging', true);
			}
		}

		function update(e, data) {
			if (!is(data, 'dragging')) {
				return;
			}
			updateInput(e, data);
			var frame = data.frame;
			var lane = data.lane;
			updateFrame(data, frame, lane);
		}

		function end(e, data) {
			if (!is(data, 'dragging')) {
				return;
			}
			flag(data, 'dragging', false);
			var state = getState$$1(data);
			var input = getInputState(data);
			var frame = data.frame;
			var lane = data.lane;
			var snap = state.snap;
			var fling = state.fling;
			var dS, dF;
			if (data.orientation === 'horizontal') {
				dS = input.ndX;
				dF = input.ddX;
			} else {
				dS = input.ndY;
				dF = input.ddY;
			}
			if (dS >= snap || dF >= fling) {
				frame = data.frame - 1;
			} else if (dS <= -snap || dF <= -fling) {
				frame = data.frame + 1;
			}
			resetInput(data);
			updateFrame(data, frame, lane);
			stopAnimation(data);
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: init,
			mousedown: start,
			mousemove: update,
			mouseup: end,
			mouseleave: end,
			touchstart: start,
			touchmove: update,
			touchend: end,
			touchcancel: end
		});
	})();
	(function() {
		var NAME = 'wheel';

		function wheel(e, data) {
			if (!data.loading && data.stage.is(':visible')) {
				e.preventDefault();
				var we = e.originalEvent;
				var signX = we.deltaX === 0 ? 0 : we.deltaX > 0 ? 1 : -1;
				var signY = we.deltaY === 0 ? 0 : we.deltaY > 0 ? 1 : -1;
				updateFrame(data, data.frame + signY, data.lane + signX);
			}
		}
		registerPlugin(NAME, {
			name: NAME,
			wheel: wheel
		});
	})();
	(function() {
		var template = "\n<div class='spritespin-progress'>\n  <div class='spritespin-progress-label'></div>\n  <div class='spritespin-progress-bar'></div>\n</div>\n";

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}
		var NAME = 'progress';

		function onInit(e, data) {
			var state = getState$$1(data);
			if (!state.stage) {
				state.stage = $$1(template);
				state.stage.appendTo(data.target);
			}
			state.stage.find('.spritespin-progress-label').text("0%").css({ 'text-align': 'center' });
			state.stage.find('.spritespin-progress-bar').css({
				width: "0%"
			});
			state.stage.hide().fadeIn();
		}

		function onProgress(e, data) {
			var state = getState$$1(data);
			state.stage.find('.spritespin-progress-label').text(data.progress.percent + "%").css({ 'text-align': 'center' });
			state.stage.find('.spritespin-progress-bar').css({
				width: data.progress.percent + "%"
			});
		}

		function onLoad(e, data) {
			$$1(getState$$1(data).stage).fadeOut();
		}

		function onDestroy(e, data) {
			$$1(getState$$1(data).stage).remove();
		}
		registerPlugin(NAME, {
			name: NAME,
			onInit: onInit,
			onProgress: onProgress,
			onLoad: onLoad,
			onDestroy: onDestroy
		});
	})();
	(function() {
		var NAME = '360';

		function onLoad(e, data) {
			data.stage.find('.spritespin-frames').detach();
			if (data.renderer === 'image') {
				$(data.images).addClass('spritespin-frames').appendTo(data.stage);
			}
		}

		function onDraw(e, data) {
			var specs = findSpecs(data.metrics, data.frames, data.frame, data.lane);
			var sheet = specs.sheet;
			var sprite = specs.sprite;
			if (!sheet || !sprite) {
				return;
			}
			var src = data.source[sheet.id];
			var image = data.images[sheet.id];
			if (data.renderer === 'canvas') {
				data.canvas.show();
				var w = data.canvas[0].width / data.canvasRatio;
				var h = data.canvas[0].height / data.canvasRatio;
				data.context.clearRect(0, 0, w, h);
				data.context.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
				return;
			}
			var scaleX = data.stage.innerWidth() / sprite.sampledWidth;
			var scaleY = data.stage.innerHeight() / sprite.sampledHeight;
			var top = Math.floor(-sprite.sampledY * scaleY);
			var left = Math.floor(-sprite.sampledX * scaleX);
			var width = Math.floor(sheet.sampledWidth * scaleX);
			var height = Math.floor(sheet.sampledHeight * scaleY);
			if (data.renderer === 'background') {
				data.stage.css({
					'background-image': "url('" + src + "')",
					'background-position': left + "px " + top + "px",
					'background-repeat': 'no-repeat',
					// set custom background size to enable responsive rendering
					'-webkit-background-size': width + "px " + height + "px",
					'-moz-background-size': width + "px " + height + "px",
					'-o-background-size': width + "px " + height + "px",
					'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
				});
				return;
			}
			$(data.images).hide();
			$(image).show().css({
				position: 'absolute',
				top: top,
				left: left,
				'max-width': 'initial',
				width: width,
				height: height
			});
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: onLoad,
			onDraw: onDraw
		});
	})();
	(function() {
		var NAME = 'blur';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getOption(data, name, fallback) {
			return data[name] || fallback;
		}

		function init(e, data) {
			var state = getState$$1(data);
			state.canvas = state.canvas || $$1("<canvas class='blur-layer'></canvas>");
			state.context = state.context || state.canvas[0].getContext('2d');
			state.steps = state.steps || [];
			state.fadeTime = Math.max(getOption(data, 'blurFadeTime', 200), 1);
			state.frameTime = Math.max(getOption(data, 'blurFrameTime', data.frameTime), 16);
			state.trackTime = null;
			state.cssBlur = !!getOption(data, 'blurCss', false);
			var inner = getInnerSize(data);
			var outer = data.responsive ? getComputedSize(data) : getOuterSize(data);
			var css = getInnerLayout(data.sizeMode, inner, outer);
			state.canvas[0].width = data.width * data.canvasRatio;
			state.canvas[0].height = data.height * data.canvasRatio;
			state.canvas.css(css).show();
			state.context.scale(data.canvasRatio, data.canvasRatio);
			data.target.append(state.canvas);
		}

		function onFrame(e, data) {
			var state = getState$$1(data);
			trackFrame(data);
			if (state.timeout == null) {
				loop(data);
			}
		}

		function trackFrame(data) {
			var state = getState$$1(data);
			var ani = getPlaybackState(data);
			// distance between frames
			var d = Math.abs(data.frame - ani.lastFrame);
			// shortest distance
			d = d >= data.frames / 2 ? data.frames - d : d;
			state.steps.unshift({
				frame: data.frame,
				lane: data.lane,
				live: 1,
				step: state.frameTime / state.fadeTime,
				d: d,
				alpha: 0
			});
		}
		var toRemove = [];

		function removeOldFrames(frames) {
			toRemove.length = 0;
			for (var i = 0; i < frames.length; i += 1) {
				if (frames[i].alpha <= 0) {
					toRemove.push(i);
				}
			}
			for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {
				var item = toRemove_1[_i];
				frames.splice(item, 1);
			}
		}

		function loop(data) {
			var state = getState$$1(data);
			state.timeout = window.setTimeout(function() { tick(data); }, state.frameTime);
		}

		function killLoop(data) {
			var state = getState$$1(data);
			window.clearTimeout(state.timeout);
			state.timeout = null;
		}

		function applyCssBlur(canvas, d) {
			var amount = Math.min(Math.max((d / 2) - 4, 0), 2.5);
			var blur = "blur(" + amount + "px)";
			canvas.css({
				'-webkit-filter': blur,
				filter: blur
			});
		}

		function clearFrame(data, state) {
			state.canvas.show();
			var w = state.canvas[0].width / data.canvasRatio;
			var h = state.canvas[0].height / data.canvasRatio;
			// state.context.clearRect(0, 0, w, h)
		}

		function drawFrame(data, state, step) {
			if (step.alpha <= 0) {
				return;
			}
			var specs = findSpecs(data.metrics, data.frames, step.frame, step.lane);
			var sheet = specs.sheet;
			var sprite = specs.sprite;
			if (!sheet || !sprite) {
				return;
			}
			var src = data.source[sheet.id];
			var image = data.images[sheet.id];
			if (image.complete === false) {
				return;
			}
			state.canvas.show();
			var w = state.canvas[0].width / data.canvasRatio;
			var h = state.canvas[0].height / data.canvasRatio;
			state.context.globalAlpha = step.alpha;
			state.context.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
		}

		function tick(data) {
			var state = getState$$1(data);
			killLoop(data);
			if (!state.context) {
				return;
			}
			var d = 0;
			clearFrame(data, state);
			state.context.clearRect(0, 0, data.width, data.height);
			for (var _i = 0, _a = state.steps; _i < _a.length; _i++) {
				var step = _a[_i];
				step.live = Math.max(step.live - step.step, 0);
				step.alpha = Math.max(step.live - 0.25, 0);
				drawFrame(data, state, step);
				d += step.alpha + step.d;
			}
			if (state.cssBlur) {
				applyCssBlur(state.canvas, d);
			}
			removeOldFrames(state.steps);
			if (state.steps.length) {
				loop(data);
			}
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: init,
			onFrameChanged: onFrame
		});
	})();
	(function() {
		var max = Math.max;
		var min = Math.min;
		var NAME = 'ease';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getOption(data, name, fallback) {
			return data[name] || fallback;
		}

		function init(e, data) {
			var state = getState$$1(data);
			state.maxSamples = max(getOption(data, 'easeMaxSamples', 5), 0);
			state.damping = max(min(getOption(data, 'easeDamping', 0.9), 0.999), 0);
			state.abortTime = max(getOption(data, 'easeAbortTime', 250), 16);
			state.updateTime = max(getOption(data, 'easeUpdateTime', data.frameTime), 16);
			state.samples = [];
			state.steps = [];
		}

		function update(e, data) {
			if (is(data, 'dragging')) {
				killLoop(data);
				sampleInput(data);
			}
		}

		function end(e, data) {
			var state = getState$$1(data);
			var samples = state.samples;
			var last;
			var lanes = 0;
			var frames = 0;
			var time = 0;
			for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
				var sample = samples_1[_i];
				if (!last) {
					last = sample;
					continue;
				}
				var dt = sample.time - last.time;
				if (dt > state.abortTime) {
					lanes = frames = time = 0;
					return killLoop(data);
				}
				frames += sample.frame - last.frame;
				lanes += sample.lane - last.lane;
				time += dt;
				last = sample;
			}
			samples.length = 0;
			if (!time) {
				return;
			}
			state.lane = data.lane;
			state.lanes = 0;
			state.laneStep = lanes / time * state.updateTime;
			state.frame = data.frame;
			state.frames = 0;
			state.frameStep = frames / time * state.updateTime;
			loop(data);
		}

		function sampleInput(data) {
			var state = getState$$1(data);
			// add a new sample
			state.samples.push({
				time: new Date().getTime(),
				frame: data.frame,
				lane: data.lane
			});
			// drop old samples
			while (state.samples.length > state.maxSamples) {
				state.samples.shift();
			}
		}

		function killLoop(data) {
			var state = getState$$1(data);
			if (state.handler != null) {
				window.clearTimeout(state.handler);
				state.handler = null;
			}
		}

		function loop(data) {
			var state = getState$$1(data);
			state.handler = window.setTimeout(function() { tick(data); }, state.updateTime);
		}

		function tick(data) {
			var state = getState$$1(data);
			state.lanes += state.laneStep;
			state.frames += state.frameStep;
			state.laneStep *= state.damping;
			state.frameStep *= state.damping;
			var frame = Math.floor(state.frame + state.frames);
			var lane = Math.floor(state.lane + state.lanes);
			updateFrame(data, frame, lane);
			if (is(data, 'dragging')) {
				killLoop(data);
			} else if (Math.abs(state.frameStep) > 0.005 || Math.abs(state.laneStep) > 0.005) {
				loop(data);
			} else {
				killLoop(data);
			}
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: init,
			mousemove: update,
			mouseup: end,
			mouseleave: end,
			touchmove: update,
			touchend: end,
			touchcancel: end
		});
	})();
	(function() {
		var NAME = 'gallery';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getOption(data, name, fallback) {
			return data[name] || fallback;
		}

		function load(e, data) {
			var state = getState$$1(data);
			state.images = [];
			state.offsets = [];
			state.frame = data.frame;
			state.speed = getOption(data, 'gallerySpeed', 500);
			state.opacity = getOption(data, 'galleryOpacity', 0.25);
			state.stage = getOption(data, 'galleryStage', $$1('<div></div>'));
			state.stage.empty().addClass('gallery-stage').prependTo(data.stage);
			var size = 0;
			for (var _i = 0, _a = data.images; _i < _a.length; _i++) {
				var image = _a[_i];
				var naturalSize$$1 = naturalSize(image);
				var scale = data.height / naturalSize$$1.height;
				var img = $$1(image);
				state.stage.append(img);
				state.images.push(img);
				state.offsets.push(-size + (data.width - image.width * scale) / 2);
				size += data.width;
				img.css({
					'max-width': 'initial',
					opacity: state.opacity,
					width: data.width,
					height: data.height
				});
			}
			var innerSize = getInnerSize(data);
			var outerSize = data.responsive ? getComputedSize(data) : getOuterSize(data);
			var layout = getInnerLayout(data.sizeMode, innerSize, outerSize);
			state.stage.css(layout).css({ width: size, left: state.offsets[state.frame] });
			state.images[state.frame].animate({ opacity: 1 }, { duration: state.speed });
		}

		function draw(e, data) {
			var state = getState$$1(data);
			var input = getInputState(data);
			var isDragging = is(data, 'dragging');
			if (state.frame !== data.frame && !isDragging) {
				state.stage.stop(true, false).animate({ left: state.offsets[data.frame] }, { duration: state.speed });
				state.images[state.frame].animate({ opacity: state.opacity }, { duration: state.speed });
				state.frame = data.frame;
				state.images[state.frame].animate({ opacity: 1 }, { duration: state.speed });
				state.stage.animate({ left: state.offsets[state.frame] });
			} else if (isDragging || state.dX !== input.dX) {
				state.dX = input.dX;
				state.ddX = input.ddX;
				state.stage.stop(true, true).css({ left: state.offsets[state.frame] + state.dX });
			}
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: load,
			onDraw: draw
		});
	})();
	(function() {
		var NAME = 'panorama';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function onLoad(e, data) {
			var state = getState$$1(data);
			var sprite = data.metrics[0];
			if (!sprite) {
				return;
			}
			if (data.orientation === 'horizontal') {
				state.scale = data.target.innerHeight() / sprite.sampledHeight;
				data.frames = sprite.sampledWidth;
			} else {
				state.scale = data.target.innerWidth() / sprite.sampledWidth;
				data.frames = sprite.sampledHeight;
			}
			var width = Math.floor(sprite.sampledWidth * state.scale);
			var height = Math.floor(sprite.sampledHeight * state.scale);
			data.stage.css({
				'background-image': "url(" + data.source[sprite.id] + ")",
				'background-repeat': 'repeat-both',
				// set custom background size to enable responsive rendering
				'-webkit-background-size': width + "px " + height + "px",
				'-moz-background-size': width + "px " + height + "px",
				'-o-background-size': width + "px " + height + "px",
				'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
			});
		}

		function onDraw(e, data) {
			var state = getState$$1(data);
			var px = data.orientation === 'horizontal' ? 1 : 0;
			var py = px ? 0 : 1;
			var offset = data.frame % data.frames;
			var left = Math.round(px * offset * state.scale);
			var top = Math.round(py * offset * state.scale);
			data.stage.css({ 'background-position': left + "px " + top + "px" });
		}
		registerPlugin(NAME, {
			name: NAME,
			onLoad: onLoad,
			onDraw: onDraw
		});
	})();
	(function() {
		var NAME = 'zoom';

		function getState$$1(data) {
			return getPluginState(data, NAME);
		}

		function getOption(data, name, fallback) {
			return name in data ? data[name] : fallback;
		}

		function onInit(e, data) {
			var state = getState$$1(data);
			state.source = getOption(data, 'zoomSource', data.source);
			state.useWheel = getOption(data, 'zoomUseWheel', false);
			state.useClick = getOption(data, 'zoomUseClick', true);
			state.pinFrame = getOption(data, 'zoomPinFrame', true);
			state.doubleClickTime = getOption(data, 'zoomDoubleClickTime', 500);
			state.stage = state.stage || $$1("<div class='zoom-stage'></div>");
			state.stage.css({
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				position: 'absolute'
			}).appendTo(data.target).hide();
		}

		function onDestroy(e, data) {
			var state = getState$$1(data);
			if (state.stage) {
				state.stage.remove();
				delete state.stage;
			}
		}

		function updateInput$$1(e, data) {
			var state = getState$$1(data);
			if (!state.stage.is(':visible')) {
				return;
			}
			e.preventDefault();
			if (state.pinFrame) {
				// hack into drag/move module and disable dragging
				// prevents frame change during zoom mode
				flag(data, 'dragging', false);
			}
			// grab touch/cursor position
			var cursor = getCursorPosition(e);
			// normalize cursor position into [0:1] range
			var x = cursor.x / data.width;
			var y = cursor.y / data.height;
			if (state.oldX == null) {
				state.oldX = x;
				state.oldY = y;
			}
			if (state.currentX == null) {
				state.currentX = x;
				state.currentY = y;
			}
			// calculate move delta since last frame and remember current position
			var dx = x - state.oldX;
			var dy = y - state.oldY;
			state.oldX = x;
			state.oldY = y;
			// invert drag direction for touch events to enable 'natural' scrolling
			if (e.type.match(/touch/)) {
				dx = -dx;
				dy = -dy;
			}
			// accumulate display coordinates
			state.currentX = clamp(state.currentX + dx, 0, 1);
			state.currentY = clamp(state.currentY + dy, 0, 1);
			updateFrame(data, data.frame, data.lane);
		}

		function onClick(e, data) {
			var state = getState$$1(data);
			if (!state.useClick) {
				return;
			}
			e.preventDefault();
			// simulate double click
			var clickTime = new Date().getTime();
			if (!state.clickTime) {
				// on first click
				state.clickTime = clickTime;
				return;
			}
			// on second click
			var timeDelta = clickTime - state.clickTime;
			if (timeDelta > state.doubleClickTime) {
				// took too long, back to first click
				state.clickTime = clickTime;
				return;
			}
			// on valid double click
			state.clickTime = undefined;
			if (toggleZoom(data)) {
				updateInput$$1(e, data);
			}
		}

		function onMove(e, data) {
			var state = getState$$1(data);
			if (state.stage.is(':visible')) {
				updateInput$$1(e, data);
			}
		}

		function onDraw(e, data) {
			var state = getState$$1(data);
			// calculate the frame index
			var index = data.lane * data.frames + data.frame;
			// get the zoom image. Use original frames as fallback. This won't work for sprite sheets
			var source = state.source[index];
			var spec = findSpecs(data.metrics, data.frames, data.frame, data.lane);
			// get display position
			var x = state.currentX;
			var y = state.currentY;
			// fallback to centered position
			if (x == null) {
				x = state.currentX = 0.5;
				y = state.currentY = 0.5;
			}
			if (source) {
				// scale up from [0:1] to [0:100] range
				x = Math.floor(x * 100);
				y = Math.floor(y * 100);
				// update background image and position
				state.stage.css({
					'background-repeat': 'no-repeat',
					'background-image': "url('" + source + "')",
					'background-position': x + "% " + y + "%"
				});
			} else if (spec.sheet && spec.sprite) {
				var sprite = spec.sprite;
				var sheet = spec.sheet;
				var src = data.source[sheet.id];
				var left = -Math.floor(sprite.sampledX + x * (sprite.sampledWidth - data.width));
				var top_1 = -Math.floor(sprite.sampledY + y * (sprite.sampledHeight - data.height));
				var width = sheet.sampledWidth;
				var height = sheet.sampledHeight;
				state.stage.css({
					'background-image': "url('" + src + "')",
					'background-position': left + "px " + top_1 + "px",
					'background-repeat': 'no-repeat',
					// set custom background size to enable responsive rendering
					'-webkit-background-size': width + "px " + height + "px",
					'-moz-background-size': width + "px " + height + "px",
					'-o-background-size': width + "px " + height + "px",
					'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
				});
			}
		}

		function toggleZoom(data) {
			var state = getState$$1(data);
			if (!state.stage) {
				throw new Error('zoom module is not initialized or is not available.');
			}
			if (state.stage.is(':visible')) {
				showZoom(data);
			} else {
				hideZoom(data);
				return true;
			}
			return false;
		}

		function showZoom(data) {
			var state = getState$$1(data);
			state.stage.fadeOut();
			data.stage.fadeIn();
		}

		function hideZoom(data) {
			var state = getState$$1(data);
			state.stage.fadeIn();
			data.stage.fadeOut();
		}

		function wheel(e, data) {
			var state = getState$$1(data);
			if (!data.loading && state.useWheel) {
				var we = e.originalEvent;
				var signY = we.deltaY === 0 ? 0 : we.deltaY > 0 ? 1 : -1;
				if (typeof state.useWheel === 'number') {
					signY *= state.useWheel;
				}
				if (state.stage.is(':visible') && signY > 0) {
					e.preventDefault();
					showZoom(data);
				}
				if (!state.stage.is(':visible') && signY < 0) {
					e.preventDefault();
					hideZoom(data);
				}
			}
		}
		registerPlugin(NAME, {
			name: NAME,
			mousedown: onClick,
			touchstart: onClick,
			mousemove: onMove,
			touchmove: onMove,
			wheel: wheel,
			onInit: onInit,
			onDestroy: onDestroy,
			onDraw: onDraw
		});
		extendApi({
			toggleZoom: function() { toggleZoom(this.data); } // tslint:disable-line
		});
	})();
	var Utils = {
		$: $$1,
		bind: bind,
		clamp: clamp,
		detectSubsampling: detectSubsampling,
		error: error,
		findSpecs: findSpecs,
		getComputedSize: getComputedSize,
		getCursorPosition: getCursorPosition,
		getInnerLayout: getInnerLayout,
		getInnerSize: getInnerSize,
		getOuterSize: getOuterSize,
		isFunction: isFunction,
		log: log,
		measure: measure,
		naturalSize: naturalSize,
		noop: noop$1,
		pixelRatio: pixelRatio,
		preload: preload,
		prevent: prevent,
		sourceArray: sourceArray,
		toArray: toArray,
		unbind: unbind,
		warn: warn,
		wrap: wrap
	};
	exports.Utils = Utils;
	exports.sourceArray = sourceArray;
	exports.Api = Api;
	exports.extendApi = extendApi;
	exports.instances = instances;
	exports.applyEvents = applyEvents;
	exports.boot = boot;
	exports.create = create;
	exports.createOrUpdate = createOrUpdate;
	exports.destroy = destroy;
	exports.namespace = namespace;
	exports.eventNames = eventNames;
	exports.callbackNames = callbackNames;
	exports.eventsToPrevent = eventsToPrevent;
	exports.defaults = defaults;
	exports.getInputState = getInputState;
	exports.updateInput = updateInput;
	exports.resetInput = resetInput;
	exports.applyLayout = applyLayout;
	exports.getPlaybackState = getPlaybackState;
	exports.updateFrame = updateFrame;
	exports.stopAnimation = stopAnimation;
	exports.applyAnimation = applyAnimation;
	exports.startAnimation = startAnimation;
	exports.registerPlugin = registerPlugin;
	exports.registerModule = registerModule;
	exports.getPlugin = getPlugin;
	exports.applyPlugins = applyPlugins;
	exports.getState = getState;
	exports.getPluginState = getPluginState;
	exports.is = is;
	exports.flag = flag;
	Object.defineProperty(exports, '__esModule', { value: true });
})));

/* module turntable */
// function on
$(document).ready(function() {
	turntableInit();
});
// function init
// more options https://polarnotion.github.io/turntable/
function turntableInit() {
	jQuery('#myTurntable').turntable({
		axis: 'x',
		reverse: true
	});

	jQuery('#myTurntable2').turntable({
		axis: 'scroll', // x, y, or scroll
		reverse: false, // true or false, will reverse the array of images
		scrollStart: 'top', // only necessary if axis = 'scroll'
	});
}

/*
 * TurntableSlider
 * v 1.1.1
 *
 * Copyright (c) 2016 Polar Notion
 * Licensed under the MIT license.
 */
!function e(i,t,o){function a(r,s){if(!t[r]){if(!i[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(n)return n(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var m=t[r]={exports:{}};i[r][0].call(m.exports,function(e){var t=i[r][1][e];return a(t?t:e)},m,m.exports,e,i,t,o)}return t[r].exports}for(var n="function"==typeof require&&require,r=0;r<o.length;r++)a(o[r]);return a}({1:[function(e,i,t){"use strict";!function(e){e.fn.turntable=function(i){function t(i){var t,o=i.length;t="scroll"===n.axis?e(window).height():"y"===n.axis?r.height():r.width();for(var a=t/o,c=0;c<i.length;c++)s[c]={min:a*c,max:a+a*c,index:c};n.reverse===!0&&(s.reverse(),e.each(s,function(e,i){i.index=e}))}var o=function(){var e=!1;return function(i){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e},a=e("ul",this).children(),n=e.extend({},e.fn.turntable.defaults,i),r=e(this),s=[];!function(i){a.each(function(){e(this).html('<img src="'+e(this).data("imgSrc")+'">')})}(),e("li:first-child>img",r).ready(function(){e(this).parent().addClass("active"),t(a)}),e(window).resize(function(){t(a)});var c=function(i,t){e.each(i,function(){t>=this.min&&t<=this.max&&(a.removeClass("active"),a.eq(this.index).addClass("active"))})};return"scroll"===n.axis?e(window).scroll(function(){var i;i="bottom"===n.scrollStart?r.height():"top"===n.scrollStart?0:r.height()/2;var t=r.offset(),o=t.top-(e(window).scrollTop()-i);c(s,o)}):o()?r.on("touchmove",function(i){i.preventDefault();var t,o=e(this).offset(),a=i.originalEvent.touches[0]||i.originalEvent.changedTouches[0];t="y"===n.axis?a.pageY-o.top:a.pageX-o.left,c(s,t)}):r.on("mousemove",function(i){var t,o=e(this).offset();t="y"===n.axis?i.pageY-o.top:i.pageX-o.left,c(s,t)})},e.fn.turntable.defaults={axis:"x",reverse:!1,scrollStart:"middle"}}(jQuery)},{}]},{},[1]);