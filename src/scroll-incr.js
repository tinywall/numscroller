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
   * el and its respective data.
   */
  var elsPos  = [],
      w       = $(window),
      elsLeft = 0

  /**
   * Once the page is loaded,
   * we initialize the plugin.
   */
  w.on('load', function() {
    $('.scroll-incr').initScrollIncr()
  })

  function scrollIncrHandler () {
    $('.scroll-incr').onViewPort({
      /**
       * This function will be trigged when
       * the el become visible on the viewport.
       */
      showFunc: function () {
        /**
         * Lets take the id of the current
         * el, because `number`, because
         * `incrementor` needs it.
         */
        var elId = $(this).attr('data-incr-id')

        incrementor(elId)
      }
    })
  }

  w.on('load scroll resize', scrollIncrHandler)

  $.fn.initScrollIncr = function () {
    var els = $(this)

    elsLeft = els.length

    els.each(function (index, el) {
      var el = $(el)

      /**
       * Adding an identifier for
       * the current el.
       *
       * Will use it later to identy
       * it, and start the incrementation
       * process.
       */
      el.attr('data-incr-id', index)

      elsPos.push({ touched: false })
    })
  }

  /**
   * Checks if the `el`
   * is visible on the viewport
   */
  function isVisible(el) {
    return w.scrollTop() > ($(el).offset().top - window.innerHeight)
  }

  /**
   * Checks if the `el`
   * was touched (incremented)
   */
  function isTouched(i) {
    return elsPos[i].touched
  }

  function getAttrAsNumberOrDefault(el, attr, defaultValue) {
    return Number(el.attr(attr)) || defaultValue
  }

  $.fn.onViewPort = function (options) {
    if (elsLeft > 0) {
      this.each(function (i, el) {
        /**
         * If the el wasn't touched
         * and is visible, lets mark it as
         * touched and call `showFunc`.
         */
        if (!isTouched(i) && isVisible(el)) {
          elsLeft--

          elsPos[i].touched = true

          options.showFunc.call(el)
        }
      })
    }

    return this
  }

  function incrementor(elId) {
    var el = $('[data-incr-id=' + elId + ']')

    /**
     * Here we're getting each
     * data needed to perform the
     * incrementation.
     *
     * Some of them are provided
     * using data-attributes.
     *
     * They have default values,
     * except the `data-max` attribute
     * that must be present on the `el`.
     */
    var min        = getAttrAsNumberOrDefault(el, 'data-min', 0),
        max        = getAttrAsNumberOrDefault(el, 'data-max', 4),
        duration   = getAttrAsNumberOrDefault(el, 'data-duration', 4),
        numdiff    = (max - min),
        durationMs = (duration * 1000),
        steps      = getAttrAsNumberOrDefault(el, 'data-steps', (numdiff / (duration * 100)))

    realIncrementor(el, min, max, steps)
  }

  function realIncrementor(el, min, max, steps) {
    if (min <= max) {
      el.html(min)

      setTimeout(function () {
        min += parseInt(steps)

        realIncrementor(el, min, max, steps)
      }, 10)
    } else {
      el.html(max)
    }
  }
})(jQuery)
