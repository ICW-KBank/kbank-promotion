/* ============= :: XPL CALCULATOR :: ============ */
// Create by AKARATE PONGSAWANG
// contact Aware.be.Late@gmail.com
// Version 1.0 on 24/12/2019

// Fixed Andriod //
if(navigator.userAgent.match(/Android/i)){
    document.getElementById("cal_salary").type = "tel";
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

var cal_xplResults = null,
    cal_xplTable = null;


$(function () {
    var appCal = {
        career: "",
        salary: 0,
        pv: 0,
        term: 0,
        pmt: 0
    }
    
    // Results
    cal_xplResults = new Vue({
        el: '#pxCalResults',
        data: {
            np: 60,
            pmt: 0,
            pmtx: 0
        },
        mounted: function(){
            
        },
        watch: {
            pmt: function(val){
                console.log(val)
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
                var val = Math.ceil(value).toFixed(0);
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
    });
    
    // Tables
    cal_xplTable = new Vue({
        el: '#pxCalResultsTable',
        data: {
            cate: "NonPayroll",
            pv: 0,
            term: 60,
            intRate: {
                Payroll: {
                    prog_0: [25, 25, null, null, null],
                    prog_1: [25, 25, 25, 25, 25],
                    prog_2: [21, 21, 21, 21, 21],
                    prog_3: [15, 16, 16, 16, 16]
                },
                NonPayroll: {
                    prog_0: [26, 26, null, null, null],
                    prog_1: [26, 26, 26, 26, 26],
                    prog_2: [22, 22, 22, 22, 22],
                    prog_3: [17, 18, 18, 18, 18]
                },
                BusinessOwner: {
                    prog_0: [26, 26, null, null, null],
                    prog_1: [26, 26, 26, 26, 26],
                    prog_2: [24, 24, 24, 24, 24],
                    prog_3: [20, 20, 20, 20, 20]
                },
                SelfEmployed: {
                    prog_0: [26, 26, null, null, null],
                    prog_1: [26, 26, 26, 26, 26],
                    prog_2: [24, 24, 24, 24, 24],
                    prog_3: [20, 20, 20, 20, 20]
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
                if(this.pv < 6e3) return -1;
                if(this.pv < 20001) return 0;
                if(this.pv < 80001) return 1;
                if(this.pv < 240001) return 2;
                return 3;
            },
            prog_INT: function(){
                if(this.prog_Level == -1){
                    return [null,null,null,null,null];
                }
                return this.intRate[this.cate]["prog_"+this.prog_Level];
            }
        },
        methods: {
            generateTable: function(ca, pv){
                this.cate = ca;
                this.pv = pv;
                $(this.$refs.i).removeClass("active");
                $(this.$refs.i[this.isActive(_TERM)]).addClass("active");
                
            },
            calPMT: function(np, pv, i){
                var s0 = -fn_BA(np, i/12, pv, null, 0);
                if(s0>=1e3){
                    return (s0).fixed(-2,1);
                }
                return (s0).fixed(-1,1);
            },
            isActive: function(n){
                return n/12-1;
            }
        },
        filters: {
            currency: function (value) {
                var val = Math.ceil(value).toFixed(0);
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
    })
    
    
    var _CATE = "NonPayroll",
        _SALARY = 0,
        _PV = 0,
        _MAX = 0,
        _TERM = 0,
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
        var _st = (_MAX < 1e5) ? 1e2 : 1e3;
        sl_pv.update({
            max: _MAX,
            step: _st,
            from: _MAX
        });
        if(_MAX <20001){
            fx_term.addClass("lock");
            sl_term.update({
                from: 24,
                from_max: 24
            });
            max_term.text(24)
            cal_term[0].value = 24;
        }else{
            fx_term.removeClass("lock");
            sl_term.update({
                from: 60,
                from_max: 60
            });
            max_term.text(60)
            cal_term[0].value = 60;
        }
        console.log("jj -> "+_PV+" , "+_MAX)
        this.value = formatNumber(_SALARY);
    }).keypress(function(evt){
        if(evt.which == 13){
            $(this).trigger('blur')
        }
    })
    
    // PV
    var cal_pv = $("#cal_pv"),
        sl_pv = null,
        fx_term = $(".fx-term"),
        max_term = $("#maxTerm");
    $.HSCore.components.HSRangeSlider.init('#cal_pv_slider',{
        onChange: function (elm) {
            cal_pv[0].value = formatNumber(elm.from);
        },
        onFinish: function (elm) {
            _PV = elm.from;
            cal_pv[0].value = formatNumber(_PV);
            
            if(_PV <20001){
                fx_term.addClass("lock");
                max_term.text(24)
                cal_term[0].value = 24;
                sl_term.update({
                    from: 24,
                    from_max: 24
                });
            }else{
                fx_term.removeClass("lock");
                max_term.text(60);
                sl_term.update({
                    from_max: 60
                });
            }
            console.log(">> pv finish");
        },
        onUpdate: function (elm) {
            _PV = elm.from;
            cal_pv[0].value = formatNumber(_PV);
            if(_PV <20001){
                fx_term.addClass("lock");
                max_term.text(24)
                cal_term[0].value = 24;
                sl_term.update({
                    from: 24,
                    from_max: 24
                });
            }else{
                fx_term.removeClass("lock");
                max_term.text(60)
                sl_term.update({
                    from_max: 60
                });
            }
            console.log(">> pv update");
            renderGrid(_PV);
        },
        prettify: function(n){
            return (n).fixed(-3);
        }
    });
    sl_pv = $("#cal_pv_slider").data("ionRangeSlider");
    cal_pv.blur(function(){
        _PV = this.value;
        this.value = formatNumber(_PV);
        console.log(">> pv blur")
        calRender();
    });
    function renderGrid(n){
        var dx = n - 6e3;
        var _loc = $(".fx-pv");
        var aa = formatNumber((6e3+0.25*dx).fixed(-2));
        _loc.find(".js-grid-text-1").text(aa);
        var aa = formatNumber((6e3+0.50*dx).fixed(-2));
        _loc.find(".js-grid-text-2").text(aa);
        var aa = formatNumber((6e3+0.75*dx).fixed(-2));
        _loc.find(".js-grid-text-3").text(aa);
    }
    
    // TERM
    var cal_term = $("#cal_term"),
        sl_term = null;
    $.HSCore.components.HSRangeSlider.init('#cal_term_slider',{
        onFinish: function (elm) {
            
//            if(_PV < 20001){
//                if(elm.from > 24){
//                    sl_term.update({
//                        from: 24
//                    });
//                    cal_term[0].value = 24;
//                }
//            }
            
            _TERM = elm.from;
            console.log(">> term finish")
            calRender();
        },
        onUpdate: function (elm) {
            _TERM = elm.from;
            console.log(">> term update")
            calRender();
        }
    });
    sl_term = $("#cal_term_slider").data("ionRangeSlider");
    
    // Calculator Submit
    $("#form-calculator").submit(function(e){
        e.preventDefault();
        $("#cal_salary").trigger("blur");
    });
    //
    function getMaximumLoan(n){
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
    }
    function check_ProgLevel(n){
        if(n < 6e3) return -1;
        if(n < 20001) return 0;
        if(n < 80001) return 1;
        if(n < 240001) return 2;
        return 3;
    }
    function cal_intMatrix(ca, pv, np){
        var intMatrix = {
            Payroll: {
                prog_0: [25,25,null,null,null],
                prog_1: [25,25,25,25,25],
                prog_2: [21,21,21,21,21],
                prog_3: [15,16,16,16,16]
            },
            NonPayroll: {
                prog_0: [26,26,null,null,null],
                prog_1: [26,26,26,26,26],
                prog_2: [22,22,22,22,22],
                prog_3: [17,18,18,18,18]
            },
            BusinessOwner: {
                prog_0: [26,26,null,null,null],
                prog_1: [26,26,26,26,26],
                prog_2: [24,24,24,24,24],
                prog_3: [20,20,20,20,20]
            },
            SelfEmployed: {
                prog_0: [26,26,null,null,null],
                prog_1: [26,26,26,26,26],
                prog_2: [24,24,24,24,24],
                prog_3: [20,20,20,20,20]
            }
        }
        var prog_lv = check_ProgLevel(pv);
        var tx = Math.ceil((np-12)/12);
        return intMatrix[ca]["prog_"+prog_lv][tx];
    }
    function cal_PMT(pv, np, i){
        var s0 = -fn_BA(np, i/12, pv, null, 0);
        if(s0>=1e3){
            return (s0).fixed(-2,1);
        }
        return (s0).fixed(-1,1);
    }
    function calRender(){
        console.log("- Render -");
        if(_firstrun){
            if(_CATE == ""){
                return false;
            }
            if(_SALARY < _MINIMUM){
                return false;
            }
            _firstrun = false;
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
                    "eventLabel": "XPL2020,"+$("#cal_career")[0].value+","+convertToNumber($("#cal_salary")[0].value)
                });
            }
        }
        console.log(":: Allow")
        _INT = cal_intMatrix(_CATE, _PV, _TERM);
        console.log(_PV+" , "+_TERM+" , "+_INT);
        _PMT = cal_PMT(_PV, _TERM, _INT);
        cal_xplResults.np = _TERM;
        cal_xplResults.pmt = _PMT;
        cal_xplTable.generateTable(_CATE, _PV);
    }
    
    // Fixed for Scroll
    setTimeout(function(){
        if(window.location.hash){
            console.log("--- #hash ---");
            var _hash = (window.location.hash).toLocaleLowerCase(),
                _headH = (window.outerWidth > 820) ? 90 : 54;

            var _offsetPoint = $(_hash).offset().top;
            switch(_hash){
                case "#rate-01":
                case "#rate-02":
                    $("#general-interest-rate").parent().addClass("change");
                    $("#rate-table").css("display","block");
                    if(_hash == "#rate-02"){
                        $("#rate-table").find(".control>a:nth-child(2)").trigger("click");
                    }
                    _offsetPoint = $("#rate-table").offset().top;
                    break;
                case "#qualifications":
                case "#documents":
                    _offsetPoint = $("#application-details").offset().top;
                    if(_headH == 54){
                        // mobiles
                        $(window.location.hash).trigger("click");
                    }
                    break;
            }
            $('html, body').animate({
                scrollTop: _offsetPoint - _headH
            }, 0);
        }
    }, 500)
    
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
    /*
    $(".service.pxtm-click-linkClick").click(function(e){
        // Check if Bangkok
        if($("#Province")[0].value == 10){
            if(typeof dataLayer != "undifined"){
                dataLayer.push({
                    "event": "gtm.linkClick",
                    "eventCategory": "Goal Conversion",
                    "eventAction": "trigger_clickBranch",
                    "eventLabel": "XPL2020_conversion_goal06"
                });
            }
        }
    })
    */
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
