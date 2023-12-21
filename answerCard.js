/**
 * CSS3 答题卡翻页效果 jQuery Transit 
 * @authors Candice <286556658@qq.com>
 * @date    2016-9-27 15:30:18
 * @version 1.0.8
 */
$.fn.answerSheet = function(options) {
    var defaults = { mold: 'card', };
    var opts = $.extend({}, defaults, options); //值被合并到这个空对象上，保护了默认值-传进来的option是空{}，所以opts=defaults
    return $(this).each(function() {
        var obj = $(this).find('.card_cont'); //图片div标签数据集合
        var _length = obj.length, //9
            _b = _length - 1, //8
            _len = _length - 1, //8
            _cont = '.card_cont'; //类选择器

        for (var a = 1; a <= _length; a++) {
            obj.eq(_b).css({ 'z-index': a });
            _b -= 1;
        }; //给每个图片进行重叠排序（最后一个在最下面Z-index）

        $(this).show();

        if (opts.mold == 'card') {
            obj.find('.card').click(function() {
                var _idx = $(this).parents(_cont).index(), //parents()获取所有祖父元素 index()如果没有指定参数object，则返回当前元素在其所有同辈元素中的索引位置。如果object为String类型，则将其视作选择器，返回当前元素在选择器所匹配的元素中的索引位置。如果该选择器不匹配任何元素或者当前元素不在匹配到的元素内，则返回-1。
                    //获取单击图片的索引值
                    _cards = obj, //图片div集合
                    _cardcont = $(this).parents(_cont); //parents()获取所有祖父元素
                if (_idx == _len) { return; } else {
                    setTimeout(function() {
                        _cardcont.addClass('cardn');
                        setTimeout(function() {
                            _cards.eq(_idx + 3).addClass('card3');
                            _cards.eq(_idx + 2).removeClass('card3').addClass('card2');
                            _cards.eq(_idx + 1).removeClass('card2').addClass('card1');
                            _cardcont.removeClass('card1');
                        }, 200);
                    }, 100);
                }
            });
            $('.card_bottom_left').find('.prev').click(function(e) {
                var _idx = $(this).parents(_cont).index(),
                    _cardcont = $(this).parents(_cont);
                obj.eq(_idx + 2).removeClass('card3').removeClass('cardn');
                obj.eq(_idx + 1).removeClass('card2').removeClass('cardn').addClass('card3');
                obj.eq(_idx).removeClass('card1').removeClass('cardn').addClass('card2');
                setTimeout(function() { obj.eq(_idx - 1).addClass('card1').removeClass('cardn'); }, 200);
                e.stopPropagation();
                e.preventDefault();
            })
        }
    });
};