/**
 * Scroll-Incr
 *
 * https://e200.github.io/
 *
 * Developers: Eleandro Duzentos, Arun David, Boobalan
 * Copyright (c) 2018
 */
(function ($) {
  /**
   * Represents each incrementable
   * element and its respective data.
   */
  var incrBag          = [],
      w                = $(window),
      incrElementsLeft = 0

  /**
   * Once the page is loaded,
   * we initialize the plugin.
   */
  w.on('load', function() {
    $('.scroll-incr').initIncrEl()
  })

  function scrollIncrHandler () {
    $('.scroll-incr').visibleOnViewport({
      /**
       * This function will be trigged when
       * the element become visible on the viewport.
       */
      showFunction: function () {
        /**
         * Lets take the id of the current
         * element, because `number`, because
         * `incrementor` needs it.
         */
        var incrElementId = $(this).attr('data-incr-id')

        incrementor(incrElementId)
      }
    })
  }

  w.on('load scroll resize', scrollIncrHandler)

  $.fn.initIncrEl = function () {
    var incrElements = $(this)

    incrElementsLeft = incrElements.length

    incrElements.each(function (index, incrEl) {
      var incrEl = $(incrEl)

      /**
       * Adding an identifier for
       * the current element.
       *
       * Will use it later to identy
       * it, and start the incrementation
       * process.
       */
      incrEl.attr('data-incr-id', index)

      /**
       * Here we're getting each
       * data needed to perform the
       * incrementation.
       *
       * SOme of them are provided
       * using data-attributes.
       *
       * They have default values,
       * except the `data-max` attribute
       * that must be present on the `incrEl`.
       */
      var min       = Number(incrEl.attr('data-min')) || 0,
          max       = Number(incrEl.attr('data-max')),
          timediff  = Number(incrEl.attr('data-delay')) || 4,
          increment = Number(incrEl.attr('data-increment')) || 1,
          numdiff   = max - min

      var incrData = {
        el:        incrEl,
        min:       min,
        max:       max,
        timediff:  timediff,
        increment: increment,
        numdiff:   numdiff,
        timeout:   (timediff * 1000) / numdiff
      }

      // Lets put the data on the bag.
      incrBag.push(incrData)
    })
  }


  /**
   * Checks if the `incrElement`
   * is visible on the viewport
   */
  function isVisible(incrElement) {
    return w.scrollTop() > ($(incrElement).offset().top - window.innerHeight)
  }

  /**
   * Checks if the `incrElement`
   * was touched (incremented)
   */
  function isTouched(i) {
    return incrBag[i].touched
  }

  $.fn.visibleOnViewport = function (options) {
    if (incrElementsLeft > 0) {
      this.each(function (i, incrElement) {
        /**
         * If the element wasn't touched
         * and is visible, lets mark it as
         * touched and call `showFunction`.
         */
        if (!isTouched(i) && isVisible(incrElement)) {
          incrElementsLeft--
          incrBag[i].touched = true

          options.showFunction.call(this)
        }
      })
    }

    return this
  }

  function incrementor(incrId) {
    var currentIncrBag = incrBag[incrId],

    el        = currentIncrBag.el,
    min       = currentIncrBag.min,
    max       = currentIncrBag.max,
    increment = currentIncrBag.increment,
    timeout   = currentIncrBag.timeout

    realIncrementor(el, min, max, increment, timeout)
  }

  function realIncrementor(el, min, max, increment, timeout) {
    if (min <= max) {
      el.html(min)

      setTimeout(function () {
        min = min + increment

        realIncrement(el, min, max, increment, timeout)
      }, timeout)
    } else {
      el.html(max)
    }
  }
})(jQuery)
