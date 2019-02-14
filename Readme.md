# TwoStep

This is a JavaScript library for scrollytelling, which is dynamically changing charts (or triggering whatever) as text scrolls into view. It implements best practices for scrollytelling, which means built-in keyboard shortcuts, no scrolljacking and reliable "sticky" behaviour.

TwoStep was developed at _The Wall Street Journal_ and has been used in stories such as:

* [How This Tech Rally Is Different From 1999](https://www.wsj.com/graphics/how-this-tech-rally-is-different-from-1999/)
* [Then and Now: The Big Shift at Work](http://www.wsj.com/graphics/american-workplace-then-and-now/)

## Demos

TwoStep is highly flexible, and can be used in range of designs.

- [Basic working example](https://wsj.github.io/two-step/)
- [One-column layout, with text scrolling over the top](https://wsj.github.io/two-step/examples/one-column/)
- [Two instances on the same page](https://wsj.github.io/two-step/examples/two-instances/)
- [With swipe carousel on mobile](https://wsj.github.io/two-step/examples/mobile-swipe/)
- [With static charts on mobile](https://wsj.github.io/two-step/examples/mobile-scroll/)

These demos are also meant as starting points for new projects.

## Setup

1. Include jQuery, [Waypoints](http://imakewebthings.com/waypoints/), [FixTo](https://github.com/bbarakaci/fixto) and [TwoStep](dist/two-step.js) on the page.

2. Set up HTML and CSS as best fits your project. See source code from the demos above for inspiration.

3. In your JavaScript:

```js
var ts = new TwoStep({
    elements: document.querySelectorAll('.slide-item'),
    onChange: function(event) {
        console.log(event.index);
    }
});
```

## Options

Only `elements` is required. All others are optional.

- `elements`: Array/NodeList of DOM nodes (i.e. your narrative text).
- `narrative`: Array of functions corresponding to elements. Each called with [event object](#event-object) as argument.
- `onChange`: Called when any/every element is activated. Called with [event object](#event-object) as argument.
- `stick`: DOM node to stick in right rail (i.e. your sticky chart).
- `offset`: Object to manually set the offset for both directions. Must include both an up and down key and both values should be strings (i.e. `{up:"50%",down:"0"}`)
- `goToOffset`: Offset in px for scrolling to Elements using goTo. If you have a fixed Navigation 200px high, set it to `-200`. Default is `-100` for compatibility reasons.

## Event object

Whenever a `narrative` function or `onChange` is called, it’s passed an event object as an argument.

```js
var ts = new TwoStep({
    elements: document.querySelectorAll('.item'),
    onChange: function(event) {
        console.log(event);
    }
});
```

Here’s what you can find in a typical event object:

```js
{
    index: 0,
    direction: 'up',     // or 'down', or null
    element: < element > // DOM node corresponding to index
}
```

### How to get scroll direction

Check `event.direction`:

```js
var ts = new TwoStep({
    elements: document.querySelectorAll('.item'),
    onChange: function(event) {
        if (event.direction === 'up') {
            // do something
        } else if (event.direction === 'down') {
            // do something else
        }
    }
});
```

## Public methods

- `.goTo(index, scroll)`: Activate item at `index`. If `scroll` is true, will animate to position. Returns a promise which resolves when scrolling is complete.
- `.disable()`: Prevent waypoints from firing and unstick stuck element, if present
- `.enable()`: Return to standard behaviour

## Compiling from scratch

Make sure you have [Node.js](https://nodejs.org/en/) installed. Then run:

    npm install
    npm run start

## Running tests

To run tests, open [`tests.html`](http://github.com/wsj/two-step/tests.html) in your browser and wait a couple of seconds.

## Alternatives to TwoStep

* [Graph Scroll](https://github.com/1wheel/graph-scroll)
* [Scrollama](https://github.com/russellgoldenberg/scrollama/)
* The Pudding’s article _[How to implement scrollytelling with six different libraries](https://pudding.cool/process/how-to-implement-scrollytelling/)_

For something a bit different, see [scrollWatcher](https://github.com/WSJ/scroll-watcher), also made by WSJ.

## Version history

**v1.0.0** (November 27, 2017)

- Initial public release

## License

[ISC](/LICENSE)
