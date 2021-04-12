dataLayer.push({

    "event": "registrationComplete",
    "eventCategory": "form_submit",
    "eventAction": "success",
    "eventLabel": "XPL2020_register_success",
    "dimension1": "{{ Ref_Code_c }}", //เลขบัตรประชาชน
    "dimension2": "{{ email }}", //encrypt**email 
    "dimension3": "{{ phone_number }}", //encrypt**เบอร์โทร
    "dimension4": "{{ user_type }}", //ลูกค้าเก่า, ลูกค้าใหม่
    "dimension5": "{{ monthly_income }}", //รายได้ต่อเดือนของ User
    "dimension6": "{{ ability_request_loan }}", //ความสามารถในการกู้
    "dimension7": "{{ search_location }}", //สาขาที่ค้นหา
    "dimension8": "{{ product_type }}", // ชนิดของบัตร credit_card, debit_card, personal_loan
    "dimension9": "{{ firstname }}", //ชื่อ
    "dimension10": "{{ business_type }}", //ประเภทธุรกิจ
    "dimension11": "{{ business_income }}", //รายรับ
    "dimension12": "{{ lastname }}", //นามสกุล
    "dimension13": "{{ ga_client_id }}", //ไอดีผู้เยี่ยมชมเว็บไซต์
    "dimension14": "{{ cid }}" //Customer ID
    //อาชีพ Career
    //อายุงาน (ปี)
    //อายุงาน (เดือน)
    //จังหวัด
    //อำเภอ
    //สาขาที่สะดวก
    //ช่วงเวลาที่สะดวกให้ติดต่อกลับ
});

// XPL STEP 01 (**กรณีต้องการเก็บข้อมูล Pre-Qualified)
dataLayer.push({

    "event": "registrationComplete",
    "eventCategory": "form_submit",
    "eventAction": "success",
    "eventLabel": "XPL2020_register_prefill",
    "dimension1": "{{ Ref_Code_c }}", // Ref Code
    "dimension2": "{{ email }}", //encrypt reccomended SHA256 + Salt 
    "dimension3": "{{ phone_number }}" //encrypt reccomended SHA256 + Salt

});

// XPL STEP 02
dataLayer.push({

    "event": "registrationComplete",
    "eventCategory": "form_submit",
    "eventAction": "success",
    "eventLabel": "XPL2020_register_complete",
    "dimension1": "{{ Ref_Code_c }}", // Ref Code
    "dimension2": "{{ email }}", //encrypt reccomended SHA256 + Salt 
    "dimension3": "{{ phone_number }}", //encrypt reccomended SHA256 + Salt 
    "dimension5": "{{ monthly_income }}", //รายได้ต่อเดือนของ User
    "dimension15": "{{ user_career }}", //อาชีพ
    "dimension18": "{{ user_province }}",//จังหวัด
    "dimension19": "{{ user_district }}",//อำเภอ
    "eventCallback" : function() {
        // URL Redirect
        window.location.href = "{{ target URL }}";
    },
    "eventTimeout" : 1200

});


// Calculator - Calculated Success
dataLayer.push({

    "event": "submitCalculator",
    "eventCategory": "Calculators",
    "eventAction": "First-Time Success",
    "eventLabel": "XPL2020,{{career}},{{income}}"

});


// Goal Conversion - Goal06
dataLayer.push({
    "event": "gtm.linkClick",
    "eventCategory": "Goal Conversion",
    "eventAction": "trigger_clickBranch",
    "eventLabel": "XPL2020_conversion_goal06"
});