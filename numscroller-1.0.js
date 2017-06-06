/**
* jQuery scroroller Plugin 1.x
*
* http://www.tinywall.net/
* 
* Developers: Arun David, Boobalan
* Copyright (c) 2014
* Heavily modified by Skid Vis
*/
(function($){
    $(window).on("load",function(){
        $(document).rollerInit();
    });
    $.fn.rollerInit=function(){
        var i=0;
        $('.numscroller').each(function() {
            i++;
           $(this).attr('data-slno',i); 
           $(this).addClass("roller-title-number-"+i);
           numberRoller($(this).attr('data-slno'));
        });        
    };
    function numberRoller(slno){
            var el = {
                id : slno,
                minAmount : 0,
                maxAmount : $('.roller-title-number-' + slno).attr('data-max') *1,
                differenceAmount : 0,                                
                incrementAmount : 0,
                tickCount : 0,
                thousandsSeparator : $('.roller-title-number-'+slno).attr('data-separator'),
                secondsToComplete : $('.roller-title-number-'+slno).attr('data-delay') * 1,
                speed : 30,
                totalMilliseconds : 0         
            };

            el.thousandsSeparator = (el.thousandsSeparator === undefined) ? '' : el.thousandsSeparator;
            el.totalMilliseconds = el.secondsToComplete * 1000;
            el.tickCount = el.totalMilliseconds / el.speed;
            el.minAmount = el.maxAmount - (el.maxAmount * .10);            
            el.differenceAmount = el.maxAmount - el.minAmount;
            el.incrementAmount = el.differenceAmount / el.tickCount;            

            numberRoll(el);
    }
    function numberRoll(el){
        if(el.minAmount<=el.maxAmount){
            var value = addSeparator(el.minAmount, el.thousandsSeparator);
            $('.roller-title-number-'+el.id).html(value);
            el.minAmount=parseInt(el.minAmount)+parseInt(el.incrementAmount);
            setTimeout(function(){numberRoll(el)},el.speed);
        }else{
            var value = addSeparator(el.maxAmount, el.thousandsSeparator);
            $('.roller-title-number-'+el.id).html(value);
        }
    }
    function addSeparator(nStr, separator) {
        nStr += '';
        var rgx = /(\d+)(\d{3})/;
        while (separator != '' && rgx.test(nStr)) {
                nStr = nStr.replace(rgx, '$1' + separator + '$2');
        }
        return nStr;
    }
})(jQuery);