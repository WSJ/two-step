import keycodeToDirection from './keycode-to-direction';
import Manager from './manager';

// keep track of twostep instances on page
const tsManager = new Manager();


export default class {
    
    constructor(opts) {

        if (opts.elements.length === 0) {
            throw ('Elements array is empty');
        }

        if (opts.narrative) {
            if (opts.elements.length !== opts.narrative.length) {
                throw ('Elements and narrative are different lengths');
            }
    
            const narrationIsAllFunctions = !opts.narrative.filter(narr => {
                return (typeof narr !== 'function');
            }).length;
            if (narrationIsAllFunctions === false) {
                throw ('Narrative contains non-functions');
            }
    
            this.narrative = opts.narrative;
        }
        this.onChange = opts.onChange;
        this.elements = Array.prototype.slice.call(opts.elements);
        this.enabled = true;

        this.offset = opts.hasOwnProperty('offset') ? opts.offset : {'down':"50%",'up':"0"};
        this.goToOffset = opts.hasOwnProperty('goToOffset') ? opts.goToOffset : -100;
    
        const waypointsDown = this.setWaypoints(this.elements, waypointHandlerDown, opts.continuous, this.offset.down);
        const waypointsUp = this.setWaypoints(this.elements, waypointHandlerUp, opts.continuous, this.offset.up);

        this.waypoints = [waypointsDown,waypointsUp]
    
        if (opts.stick) {
            if ($().fixTo === undefined) {
                throw('fixTo is not present on the page, or may have been loaded in before jQuery.');
            }
            $(opts.stick).wrapInner('<div class="two-step-sticky-wrapper"></div>');
            this.sticky = $(opts.stick).find('.two-step-sticky-wrapper').fixTo($(opts.stick));
        }
    
        this.setKeyboard();
        this.index = -1;
        
        tsManager.register(this);
    
        setInterval(() => {
            Waypoint.refreshAll();
        }, 1000);
    
        const _this = this;
        function waypointHandlerUp(direction) {
            if (direction == "up") {
                let index = _this.elements.indexOf(this.element);
                if (index !== this.index) {
                    _this.goTo(index, false, direction);
                }
            };
        }

        function waypointHandlerDown(direction) {
            if (direction == "down") {
                let index = _this.elements.indexOf(this.element);
                if (index !== this.index) {
                    _this.goTo(index, false, direction);
                }
            };
        }
    }
    
    goTo(index, scrollThere, direction) {
        if (this.isValidIndex(index) === false) {
            throw(`${index} is not a valid index. Must be between 0 and ${this.elements.length - 1} (inclusive).`);
        }
        if (this.narrative) {
            this.narrative[index]({
                element: this.elements[index],
                index,
                direction
            });
        }
        if (this.onChange) {
            this.onChange({
                element: this.elements[index],
                index,
                direction
            });
        }
        this.index = index;
    
        const $target = $(this.elements).eq(index);
        $(this.elements).removeClass('active');
        $target.addClass('active');
        if (scrollThere === true) {
            this.disableWaypoints();
            return $('html, body').animate({
                scrollTop: $target.offset().top + this.goToOffset
            }, 500).promise().then(() => {
                this.enableWaypoints();
            });
        }
        return $.Deferred().resolve();
    }

    setWaypoints(elements, handler, continuous = true, offset) {
        return elements.map(element => {
            return new Waypoint({
                element, handler, continuous, offset
            });
        });
    }
    
    setKeyboard() {
        $(window).keydown(e => {
            if (this.disabled) {
                return true;
            }
            const direction = keycodeToDirection(e.keyCode);
            const activeInstances = tsManager.getActiveInstances();
            if (
                (direction !== 0) &&
                (e.target === document.body) &&
                (e.metaKey === false) &&
                (activeInstances.length === 1)
            ) {
                const newIndex = this.index + direction;
                if (this.isValidIndex(newIndex)) {
                    this.goTo(newIndex, true);
                    e.preventDefault();
                    return false;
                }
                // don't override normal keyboard event
                return true;
            }
        });
    }

    isValidIndex(index) {
        return ((index < this.elements.length) && index > -1);
    }

    disableWaypoints() {
        let flatWaypoints = [].concat.apply([], this.waypoints);
        flatWaypoints.forEach(w =>  w.disable());
    }

    enableWaypoints() {
        let flatWaypoints = [].concat.apply([], this.waypoints);
        flatWaypoints.forEach(w => w.enable());
    }

    disable() {
        this.disabled = true;
        this.enabled = false;
        this.disableWaypoints();
        if (this.sticky) {
            this.sticky.fixTo('stop');
        }
    }

    enable() {
        this.disabled = false;
        this.enabled = true;
        this.enableWaypoints();
        if (this.sticky) {
            this.sticky.fixTo('start');
        }
    }
}