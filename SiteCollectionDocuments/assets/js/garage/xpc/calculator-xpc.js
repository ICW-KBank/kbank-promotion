/* ============= :: XPC CALCULATOR :: ============ */
// Create by AKARATE PONGSAWANG
// contact Aware.be.Late@gmail.com
// Version 0.8.0 on 27/02/2020

// Application detail
console.log("Load -> cal.js");

// Cash loan detail
$(function() {
    $("#cash-loan-detail-toggle").on("click", function() {
        $("#cash-loan-detail").slideToggle();
        $(this).toggleClass("show");

        $("#cash-loan-detail-01-toggle").click();
    });
});

// Fixed Andriod //
if(navigator.userAgent.match(/Android/i)){
    document.getElementById("cal_salary").type = "tel";
}

// Fixed iPad
if((window.screen.width == 768) && (window.screen.height == 1024)){
    document.body.classList.add("device-ipad");
}


/* VUE Directive */
Vue.directive('select2', {
    bind: function () {
        console.log("vs")
        var _loc = $(this.el);
        _loc.find(".select2").select2({
            closeOnSelect: true,
            width: '100%',
            minimumResultsForSearch: -1,
            dropdownParent: _loc,
            templateResult: function (item) {
                if (item.loading) {
                    return item.text;
                }

                var term = query.term || '';
                var $result = markMatch(item.text, term);

                return $result;
            }
        })
        .on('change', function () {
            self.set(this.value)
        })
        function markMatch (text, term) {
            var match = text.toUpperCase().indexOf(term.toUpperCase());
            
            var $result = $('<span></span>');

            if (match < 0) {
                return $result.text(text);
            }

            $result.text(text.substring(0, match));

            var $match = $('<span class="select2-rendered__match"></span>');
            $match.text(text.substring(match, match + term.length));

            $result.append($match);

            $result.append(text.substring(match + term.length));

            return $result;
        }
    },
    inserted: function (el) {
        el.focus()
    },
    update: function (value) {
        $(this.el).val(value).trigger('change')
    },
    unbind: function () {
        $(this.el).off().select2('destroy')
    }
})


/* App */

var cal_xpcResults = null,
    cal_xpcTable = null;


$(function () {
    var appCal = {
        career: "",
        salary: 0,
        pv: 0,
        term: 0,
        pmt: 0,
        int_amt: 0,
        pay_amt: 0
    }
    
    // Results
    cal_xpcResults = new Vue({
        el: '#pxCalResults',
        data: {
            pv: 0,
            np: 30,
            pmt: 0,
            pmtx: 0,
            total_interest: 0,
            total_pay: 0
        },
        mounted: function(){
            
        },
        watch: {
            pmt: function(val){
                var _loc = this;
                jQuery({
                    Counter: _loc.pmtx
                }).animate({
                    Counter: val
                }, {
                    duration: 240,
                    easing: 'swing',
                    step: function () {
                        _loc.pmtx = Math.ceil(this.Counter);
                    },
                    complete: function(){
                        _loc.pmtx = val;
                    }
                });
            }
        },
        computed: function(){
            
        },
        methods: {
            init: function(){
                
            },
            cal: function(){
                
            }
        },
        filters: {
            currency: function (value) {
                var val = (value).toFixed(2);
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
    });
    
    // Tables
    cal_xpcTable = new Vue({
        el: '#pxCalResultsTable',
        data: {
            cate: "NonPayroll",
            max: 0,
            pv: 0,
            term: 60,
            intRate: {
                Payroll: {
                    prog_0: [26],
                    prog_1: [22],
                    prog_2: [18]
                },
                NonPayroll: {
                    prog_0: [27],
                    prog_1: [24],
                    prog_2: [20]
                },
                BusinessOwner: {
                    prog_0: [27],
                    prog_1: [24],
                    prog_2: [20]
                },
                SelfEmployed: {
                    prog_0: [27],
                    prog_1: [24],
                    prog_2: [20]
                }
            },
            animPlay: false
        },
        mounted: function () {
            this.$nextTick(function(){
                
            })
        },
        updated: function () {
            // Update
            this.$refs.i.forEach(function(obj, i){
                $(obj).stop().css('opacity',0).delay(140*i).fadeTo(320,1);
            })
        },
        computed: {
            prog_Level: function(){
                //if(this.pv < 0) return -1;
                if(this.max < 80001) return 0;
                if(this.max < 240001) return 1;
                return 2;
            },
            prog_NP: function(){
                return [1,7,15,30];
            },
            prog_INT: function(){
                if(this.prog_Level == -1){
                    return [null];
                }
                return this.intRate[this.cate]["prog_"+this.prog_Level][0];
            }
        },
        methods: {
            generateTable: function(ca, pv, max){
                this.cate = ca;
                this.pv = pv;
                this.max = max;
                //$(this.$refs.i).removeClass("active");
                //$(this.$refs.i[this.isActive(_TERM)]).addClass("active");
                
            },
            calINT: function(np, pv, i){
                var s0 = pv*0.01*i*(np/365);
                return (s0).fixed(2,1);
            },
            getMaximumCredit: function(){
                if(n<1.5e4){
                    return (0.8*n).fixed(-3);
                }
                if(n<3e4){
                    return (1.5*n).fixed(-3);
                }
                var mm = (3*n).fixed(-3);
                if(mm > 1.5e6){
                    return 1.5e6;
                }
                return mm;
            },
            isActive: function(n){
                return n/12-1;
            }
        },
        filters: {
            currency: function (value) {
                var val = (value).toFixed(2);
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
    })
    
    
    var _CATE = "NonPayroll",
        _SALARY = 0,
        _PV = 0,
        _MAX = 0,
        _TERM = 30,
        _RATE = 0,
        _INT = 0,
        _PMT = 0,
        _firstrun = true;
    
    var max_2Year = false;
    var showMessage = $("#fx-showAlert"),
        alert = $("#fx-alertMessageBox"),
        alert_Message = alert.find(".fx-alertPopupText-message"),
        alert_close = alert.find(".fx-close");
    
    
    alert_close.click(function(e){
        $.magnificPopup.close();
    })
    $(".fx-number").click(function(){
        console.log("ck :: "+this.value)
        this.value = convertToNumber(this.value);
        $(this).select();
    }).forceDecNumber();
    
    
    // CAREER
    var _MINIMUM = 7500,
        show_miniMum = $("#fx-textMin");
    $("#cal_career").change(function(e){
        _CATE = this.value;
        switch(_CATE){
            case "NonPayroll": 
            case "Payroll":
                _MINIMUM = 7.5e3;
                break;
            case "BusinessOwner":
            case "SelfEmployed":
                _MINIMUM = 2e4;
                break;
        }
        if(!_firstrun){
            if(_SALARY < _MINIMUM){
                console.log(_MINIMUM)
                $("#cal_salary")[0].value = _MINIMUM;
                $("#cal_salary").trigger("blur");
                alert_Message.html('ธุรกิจส่วนตัวและอาชีพอิสระต้องมีรายได้ขั้นต่ำ <span class="c-theme">20,000</span> บาท');
                showMessage.trigger('click');
            }
        }
        show_miniMum.text(formatNumber(_MINIMUM));
        console.log(">> career");
        calRender();
    }).one("change",function(e){
        $(".fx-step01").removeClass("inactive");
    })
    // SALARY
    $("#cal_salary").blur(function(e){
        console.log("blur salary -> "+this.value);
        if(isNaN(this.value)){
            this.value = convertToNumber(this.value);
        }
        if((this.value).length == 0){
            alert_Message.html('กรุณากรอกรายได้ต่อเดือน');
            showMessage.trigger('click');
            this.value = _MINIMUM;
        }
        if(this.value < _MINIMUM){
            alert_Message.html('ต้องมีรายได้ตั้งแต่ <span class="c-theme">'+formatNumber(_MINIMUM)+'</span> บาท ขึ้นไป');
            showMessage.trigger('click');
            this.value = _MINIMUM;
        }
        if(_SALARY == this.value){
            this.value = formatNumber(_SALARY);
            return false;
        }
        var _loc = this;
        _SALARY = this.value;
        _MAX = getMaximumLoan(_SALARY);
        _PV = _MAX;
        var _st = 1e3;
        if(_MAX<4e4){
            _st = 1e2;
        }else if(_MAX<55e4){
            _st = 5e2;
        }
        sl_pv.update({
            max: _MAX,
            step: _st,
            from: _MAX
        });
        console.log("jj -> "+_PV+" , "+_MAX);
        cal_maximum[0].value = formatNumber(_MAX);
        this.value = formatNumber(_SALARY);
        calRender();
    }).keypress(function(evt){
        if(evt.which == 13){
            $(this).trigger('blur')
        }
    })
    
    // PV
    var cal_maximum = $("#cal_maximum"),
        cal_pv = $("#cal_pv"),
        sl_pv = null;
    
    $.HSCore.components.HSRangeSlider.init('#cal_pv_slider',{
        onChange: function (elm) {
            cal_pv[0].value = formatNumber(elm.from);
        },
        onFinish: function (elm) {
            _PV = elm.from;
            cal_pv[0].value = formatNumber(_PV);
            
            /*
            if(_PV <20001){
                fx_term.addClass("lock");
                max_term.text(24)
                cal_term[0].value = 24;
            }else{
                fx_term.removeClass("lock");
                max_term.text(60);
            }
            */
            console.log(">> pv finish");
            calRender();
        },
        onUpdate: function (elm) {
            _PV = elm.from;
            //cal_pv[0].value = formatNumber(_PV);
            /*
            if(_PV <20001){
                fx_term.addClass("lock");
                max_term.text(24)
                cal_term[0].value = 24;
            }else{
                fx_term.removeClass("lock");
                max_term.text(60)
            }
            */
            console.log(">> pv update");
            //renderGrid(_PV);
        },
        prettify: function(n){
            return (n).fixed(-3);
        }
    });
    
    sl_pv = $("#cal_pv_slider").data("ionRangeSlider");
    cal_pv.blur(function(){
        if(isNaN(this.value)){
            this.value = _MAX;
        }
        if((this.value).length == 0){
            alert_Message.html('กรุณาระบุวงเงินที่ต้องการกด');
            showMessage.trigger('click');
            this.value = _MAX;
        }
        if((this.value > _MAX)){
            alert_Message.html('วงเงินที่กดได้สูงสุดไม่เกิน '+formatNumber(_MAX)+' บาท');
            showMessage.trigger('click');
            this.value = _MAX;
        }
        if(_PV == this.value){
            this.value = formatNumber(_TERM);
            return false;
        }
        _PV = this.value;
        sl_pv.update({
            from: _PV
        });
        this.value = formatNumber(_PV);
        console.log(">> pv blur");
        calRender();
    }).keypress(function(evt){
        if(evt.which == 13){
            console.log("enter")
            $(this).trigger('blur')
        }
    });
    
    function renderGrid(n){
        var dx = n - 0;
        var _loc = $(".fx-pv");
        var aa = formatNumber((0+0.25*dx).fixed(-2));
        _loc.find(".js-grid-text-1").text(aa);
        var aa = formatNumber((0+0.50*dx).fixed(-2));
        _loc.find(".js-grid-text-2").text(aa);
        var aa = formatNumber((0+0.75*dx).fixed(-2));
        _loc.find(".js-grid-text-3").text(aa);
    }
    
    // TERM
    var cal_term = $("#cal_term"),
        sl_term = null;
    
    cal_term.blur(function(e){
        if(isNaN(this.value)){
            this.value = 30;
        }
        if((this.value).length == 0){
            alert_Message.html('กรุณาระบุจำนวนวัน (สูงสุด 365 วัน)');
            showMessage.trigger('click');
            this.value = 30;
        }
        if((this.value < 1)||(this.value > 365)){
            alert_Message.html('จำนวนวันได้ตั้งแต่ 1 ถึง 365 วัน');
            showMessage.trigger('click');
            this.value = 30;
        }
        if(_TERM == this.value){
            this.value = formatNumber(_TERM);
            return false;
        }
        _TERM = this.value;
        calRender();
    }).keypress(function(evt){
        if(evt.which == 13){
            $(this).trigger('blur')
        }
    })
    
    // Calculator Submit
    $("#form-calculator").submit(function(e){
        e.preventDefault();
        $("#cal_salary").trigger("blur");
    });
    //
    function getMaximumLoan(n){
        var _sx = 0;
        if(n<1.5e4){
            _sx = 0.8*n;
        }else if(n<3e4){
            _sx = 1.5*n;
        }else {
            _sx = 3*n;
        }
        if(_sx > 1.5e6){
            return 1.5e6;
        }
        return _sx.fixed(-2,1);
    }
    function check_ProgLevel(n){
        //if(n < 0) return -1;
        if(n < 80001) return 0;
        if(n < 240001) return 1;
        return 2;
    }
    function cal_intMatrix(ca, pv, max){
        var intMatrix = {
            Payroll: {
                prog_0: [26],
                prog_1: [22],
                prog_2: [18]
            },
            NonPayroll: {
                prog_0: [27],
                prog_1: [24],
                prog_2: [20]
            },
            BusinessOwner: {
                prog_0: [27],
                prog_1: [24],
                prog_2: [20]
            },
            SelfEmployed: {
                prog_0: [27],
                prog_1: [24],
                prog_2: [20]
            }
        }
        var prog_lv = check_ProgLevel(max);
        console.log(">>>x "+prog_lv)
        return intMatrix[ca]["prog_"+prog_lv][0];
    }
    function cal_INT(pv, np, i){
        var s0 = pv*0.01*i*(np/365);
        return (s0).fixed(2,1);
    }
    function calRender(){
        console.log("- Render -");
        if(_firstrun){
            console.log("-- First run --");
            if(_CATE == ""){
                return false;
            }
            if(_SALARY < _MINIMUM){
                return false;
            }
            _firstrun = false;
            _PV = _MAX;
            cal_pv[0].value = formatNumber(_PV);
            renderGrid(_PV);
            $(".fx-step02").removeClass("inactive");
            
            try {
                dataLayer;
            }catch(err){
                dataLayer = [];
            }finally{
                console.log("## Calculator >> push dataLayer");
                dataLayer.push({
                    "event": "submitCalculator",
                    "eventCategory": "Calculators",
                    "eventAction": "First-Time Success",
                    "eventLabel": "XPC2020,"+$("#cal_career")[0].value+","+convertToNumber($("#cal_salary")[0].value)
                });
            }
            
        }
        console.log(":: Allow")
        _RATE = cal_intMatrix(_CATE, _PV, _MAX);
        console.log(_PV+" , "+_TERM+" , "+_RATE);
        _INT = cal_INT(_PV, _TERM, _RATE);
        cal_xpcResults.pv = _PV;
        cal_xpcResults.np = _TERM;
        cal_xpcResults.pmt = _INT;
        cal_xpcTable.generateTable(_CATE, _PV, _MAX);
    }

    
});


//
$(function() {
    $('.search-form').on('submit', function(){ return false; });

    $('#calltoaction').click(function() {
        $('#popup-search').addClass('results-show');
    });

    $('#search').keypress(function(e){
        if(e.which == 13) {
            $("#calltoaction").click();
        }
    });
    
    // Goal dataLayer
    
    $(".service.pxtm-click-linkClick").click(function(e){
        // Check if Bangkok
        if($("#Province")[0].value == 10){
            if(typeof dataLayer != "undifined"){
                dataLayer.push({
                    "event": "gtm.linkClick",
                    "eventCategory": "Goal Conversion",
                    "eventAction": "trigger_clickBranch",
                    "eventLabel": "XPC2020_conversion_goal06"
                });
            }
        }
    })
    
});

// Scroll Section
function getActiveSection(){
    var d = document.documentElement,
        h = Math.max(d.clientHeight, window.innerHeight || 0)/2;
    
    var _active = null;
    $(".fx-section").each(function(obj){
        var _elem = this.getBoundingClientRect();
        var r_t = _elem.top - h < 0,
            r_b = _elem.bottom - h > 0;
        if(r_t && r_b){
            _active = this;
            return false;
        }
    });
    if(_active == null){
        return null;
    }
    return _active.dataset.dlSection || _active.getAttribute('id');
}
function scrollActiveSection(){
    document.getElementById("px-thresholdLine-text").innerHTML = getActiveSection();
}
function showActivateSection(){
    var elm = document.createElement("div");
    elm.id = "px-thresholdLine";
    elm.innerHTML = '<div id="px-thresholdLine-text">'+getActiveSection()+'</div>';
    document.body.appendChild(elm);
    window.addEventListener("scroll", scrollActiveSection);
}

// Fixed for Scroll
document.onreadystatechange = function (evt) {
    console.log("--state--", this.readyState);
    if(document.readyState == "complete"){
        if(window.location.hash){
        var _hash = (window.location.hash).toLocaleLowerCase(),
            _headH = (window.outerWidth > 820) ? 90 : 60;
        console.log("Hash Landing >>>> ", _hash);
        var _offsetPoint = 0,
            _offestRef = "";
        switch(_hash){
            case "#rate-table":
                $("#general-interest-rate").parent().addClass("change");
                $("#general-interest-rate").addClass("show");
                $("#rate-table").show()

                let width = $(".table-responsive").width() * $(".table-responsive").width() / $(".table-responsive > .table").width();
                $(".responsive-scroll > .scroll").css("width", width + "px");
                
                _offestRef = "#rate-table-area";
                break;
            case "#qualifications":
            case "#documents":
                _offestRef = "#application-details";
                if(_headH == 60){
                    // mobiles
                    $(window.location.hash).ready(function() {
                        $(window.location.hash).trigger("click");
                    });
                    // $(window.location.hash).trigger("click");
                }
                break;
            case "#credit-limit":
                $("#cash-loan-detail-toggle").addClass("show");
                $("#cash-loan-detail").css("display","block");
                _offestRef = "#product-details";
                break;
            case "#how-to-use":
                $("#cash-loan-detail-toggle").addClass("show");
                $("#cash-loan-detail").css("display","block");
                $("#cash-loan-detail").find(".control").find('.pxtm-click-navTab[href="#product-details-02"]').delay(5).trigger("click");
                _offestRef = "#product-details";
                break;
            case "#payment":
                console.log("roll -> payment")
                $("#cash-loan-detail-toggle").addClass("show");
                $("#cash-loan-detail").css("display","block");
                $("#cash-loan-detail").find(".control").find('.pxtm-click-navTab[href="#product-details-03"]').delay(5).trigger("click");
                _offestRef = "#product-details";
                break;
            default:
                _offestRef = _hash;
        }
        setTimeout(function(){
           var _top = $(_offestRef).offset().top;
            window.scrollTo(0, (_top - _headH));
        }, 500);
        
    }
    }
}