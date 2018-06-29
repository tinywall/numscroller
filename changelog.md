# CHANGELOG

## 2.0.0

* Changed package name from `numscroll` to `scroll-incr`
* Changed default trigger class from `numscroller` to `scroll-incr`
* Removed `scrollZip()` initialization code
* Removed all properties from `scrollZip()`, except the `showFunction`
* Renamed `scrollZip()` to `visibleOnViewport()`
* Now we don't prepend `<div id="scrollzipPoint"></div>` to the `body` to check element visiblity on view port
* Now we're using the `body` element to check element visibility on viewport instead of prepending #scrollzipPoint for that
* Added default values for data-props: `data-min: 0, data-delay: 4, data-increment: 1`
* Now once all `.scroll-incr` are incremented, `scroll-incr` removes its listeners from the `$(window)`
* Some other code and performance improvements

## 1.0.0

* First release