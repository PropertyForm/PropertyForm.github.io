$(document).ready(function(){

    /*** Select2 Initialization ***/
    $(".standard-dropdown").select2({
        minimumResultsForSearch: Infinity
    });

    /*** Numeric Inputs Initialization ***/

    var type_number = $("input[data-type='number']");
    type_number.numeric();

    $(".tip-icon, .tip-message").on("mouseover",function(){
       $(".tip-message").show();
    });

    $(".tip-icon, .tip-message").on("mouseout",function(){
        $(".tip-message").hide();
    });

    /*********** Checker ************/

    var item = $(".type-of"),
        active_item = "active-type";

    item.on("click",function(){
        $(this).parent().find(".type-of").each(function(){
            $(this).removeAttr("data-req").removeClass("not-valid");
        });
        $(this).parent().find("."+active_item).removeClass(active_item);
        $(this).addClass(active_item).attr("data-req","true");
    });

    /******* Select type *********/

    var type_selector = $(".global-step .type-of"),
        global_step = $(".global-step"),
        btn_next = $(".btn-next"),
        btn_back = $(".btn-back"),
        transition_time = 500,
        btn_menu = $(".btn-menu"),
        global_data = [],
        active_type_data = [],
        active_step_data = [],
        type;

    type_selector.on("click",function(){

        type = $(this).data("type");

        switch(type) {
            case "type-1":
                global_step.hide('slide',{direction:'left'},transition_time);
                $(".selected-type-1").show('slide',{direction:'right'},transition_time).find(".step-1").attr("data-status","1");
                $(".selected-type-1 .menu-item[data-step='step-1']").attr("data-status","1").removeClass("item-disabled");
                break;
            case "type-2":
                global_step.hide('slide',{direction:'left'},transition_time);
                $(".selected-type-2").show('slide',{direction:'right'},transition_time).find(".step-1").attr("data-status","1");
                $(".selected-type-2 .menu-item[data-step='step-1']").attr("data-status","1").removeClass("item-disabled");
                break;
            case "type-3":
                global_step.hide('slide',{direction:'left'},transition_time);
                $(".selected-type-3").show('slide',{direction:'right'},transition_time).find(".step-1").attr("data-status","1");
                $(".selected-type-3 .menu-item[data-step='step-1']").attr("data-status","1").removeClass("item-disabled");
                break;
        }

    });

    /******* Required *******/

    var req_input = $("input[data-req]"), // Inputs
        req_select = $('select'), // Select boxes
        req_email = $("input[data-type='email']"), // Input email
        req_phone = $("input[data-type='phone']"), // Input phone
        req_checkbox = $("input[data-type='checkbox']"), // Checkbox
        req_state, // Variable for global step validation
        get_checkbox = $("input[type='checkbox']"),
        get_textarea = $("textarea");

    req_input.on("keyup keydown change",function(){
        if($(this).val().length <= 0) {
            $(this).attr("data-req","false");
        } else {
            $(this).attr("data-req","true").removeClass("not-valid");
        }
    });

    req_select.on('select2:select', function (evt) {
        $(this).attr("data-req","true").removeClass("not-valid");
        $(this).next().removeClass("not-valid");
    });

    function required(this_) {

        var val_counter = 0,
            step_name = this_.parents(".step-area").attr("class").split(" ").pop(),
            global_data = [],
            active_step_data = [];

        /**** Validate Inputs *****/

        this_.parents(".step-area").find(req_input).each(function(){

            if($(this).attr("data-req") == "false") {
                val_counter++;
                $(this).addClass("not-valid");
            } else {
                $(this).removeClass("not-valid");

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                    active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                /*****************************/

            }

        });

        /**** Validate Selects ****/

        this_.parents(".step-area").find(req_select).each(function(){

            if($(this).attr("data-req") == "false") {
                val_counter++;
                $(this).next().addClass("not-valid");
            } else {
                $(this).next().removeClass("not-valid");

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("data-name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                /*****************************/

            }

        });

        /****** Validate Type ******/

        this_.parents(".step-area").find(".type-of").each(function(){
           if($(this).attr("data-req") == "false") {
               val_counter++;
               $(this).addClass("not-valid");
           } else {
               $(this).removeClass("not-valid");

               if ($(this).hasClass("active-type")) {
                   /*** Adding dates to array ***/
                   var inp_name = $(this).attr("data-name"), // Attribute name
                       inp_val = $(this).attr("data-value"); // Attribute value

                   active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                   /*****************************/
               }

           }
        });

        /****** Validate Email ******/

        this_.parents(".step-area").find(req_email).each(function(){
            function isValidEmailAddress(emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            }

            if( !isValidEmailAddress($(this).val()) ) {
                val_counter++;
                $(this).addClass("not-valid");
            } else {
                $(this).removeClass("not-valid");

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                /*****************************/
            }
        });

        /****** Validate Phone ******/

        this_.parents(".step-area").find(req_phone).each(function(){
            function isValidPhoneNumber(phoneNumber) {
                var pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                return pattern.test(phoneNumber);
            }

            if( !isValidPhoneNumber($(this).val()) ) {
                val_counter++;
                $(this).addClass("not-valid");
            } else {
                $(this).removeClass("not-valid");

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                /*****************************/
            }
        });

        /****** Validate Checkbox ******/

        this_.parents(".step-area").find(req_checkbox).each(function(){
            if(!$(this).is(":checked")) {
                val_counter++;
                $(this).addClass("not-valid");
            } else {
                $(this).removeClass("not-valid");
                /*** Adding dates to array ***/
                var inp_name = $(this).attr("data-name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_val] = [1]; // Push value in array with attribute name
                /*****************************/
            }
        });

        /****** Get dates from Checkbox ******/

        this_.parents(".step-area").find(get_checkbox).each(function(){
            if($(this).is(":checked")) {

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("data-name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_val] = [1]; // Push value in array with attribute name
                /*****************************/
            }
        });

        /****** Get dates from Textarea ******/

        this_.parents(".step-area").find(get_textarea).each(function(){
            if($(this).val().length > 1) {

                /*** Adding dates to array ***/
                var inp_name = $(this).attr("data-name"), // Attribute name
                    inp_val = $(this).val(); // Attribute value

                active_step_data[inp_name] = [inp_val]; // Push value in array with attribute name
                /*****************************/
            }
        });

        /***** Global Variable of Step Validation *****/

        if(val_counter > 0) {
            req_state = false;
            this_.parents(".step-area").find(".invalid-message").remove();
            this_.parents(".step-area").append("<p class='invalid-message'><img src='img/warning.png'> Wert erforderlich</p>")
        } else {
            req_state = true;
            this_.parents(".step-area").find(".invalid-message").remove();

            /* ---------------- Array with all dates -------------- */

            active_type_data[step_name] = active_step_data;
            global_data[type] = active_type_data; // Push all step dates in array with global type name

            console.log(global_data);

            /* ---------------------------------------------------- */

        }

    }

    /************************/

    btn_next.on("click",function(){

        required($(this));

        if (req_state == true) {

            if ($(this).parents(".step-area").next().hasClass("loading")) {
                $(this).parents(".step-area").next().show('slide', {direction: 'right'}, transition_time);
                var this_ = $(this).parents(".type-area");
                setTimeout(function () {
                    this_.find(".loading").next().show('slide', {direction: 'right'}, transition_time).attr("data-status", "1");
                    this_.find(".loading").hide('slide', {direction: 'left'}, transition_time);
                }, 2000);
            } else {
                $(this).parents(".step-area").next().show('slide', {direction: 'right'}, transition_time).attr("data-status", "1");
            }

            $(this).parents(".step-area").hide('slide', {direction: 'left'}, transition_time);

            /*** Change Menu Item - Step status ***/
            var this_step = $(this).parents(".step-area").data("step");

            $(this).parents(".type-area").find(".menu-item").each(function () {
                if ($(this).data("step") == this_step) {
                    $(this).next().attr("data-status", "1");
                    $(this).next().removeClass("item-disabled");
                }
            });

        }

    });

    btn_back.on("click",function() {

        if(!$(this).parents(".step-area").prev().hasClass("step-area")){
            $(this).parents(".type-area").hide('slide', {direction: 'right'}, transition_time);
            global_step.show('slide', {direction: 'left'}, transition_time);
        } else {
            $(this).parents(".step-area").prev().show('slide', {direction: 'left'}, transition_time);
            $(this).parents(".step-area").hide('slide', {direction: 'right'}, transition_time);
        }

    });

    var active_step;

    btn_menu.on("click",function(){

        /****** Check Access for Menu Items if this is valid or not-valid ******/
        if (!$(this).parents(".step-area").hasClass("menu")) {

            required($(this));

            if (req_state == true) {

                $(this).parents(".type-area").find(".step-area").each(function () {
                    if ($(this).attr("data-status") == "1") {

                        var this_step = $(this).data("step");

                        $(this).parents(".type-area").find(".menu-item[data-step='" + this_step + "']").removeClass("item-disabled").attr("data-status", "1");

                    }
                });

            } else {

                /**** Hide standard validation classes and message ****/
                $(this).parents(".step-area").find(".not-valid").removeClass("not-valid");
                $(this).parents(".step-area").find(".invalid-message").remove();

                /**** Detect this step ****/
                var this_step = $(this).parents(".step-area").data("step");

                /**** Compare this step with all valid steps and block access to steps after this not-valid step ****/
                $(this).parents(".type-area").find(".menu-item").each(function () {
                    if ($(this).data("step").split("-").pop() > this_step.split("-").pop()) {
                        $(this).attr("data-status", "0");
                        $(this).addClass("item-disabled");
                    }
                });

            }

        }

        $(this).parents(".type-area").find(".menu").slideToggle(transition_time);
        active_step = $(this).parents(".step-area").data("step");

    });

    /******* Menu Item *********/

    var menu_item = $(".menu-item");

    menu_item.on("click",function(){
        if(!$(this).hasClass("item-disabled")) {
            var this_step = $(this).data("step"),
                this_ = $(this);
            $(this).parents(".type-area").find(".step-area").each(function () {
                if ($(this).data("step") == this_step) {
                    if ($(this).data("step") != active_step) {
                        $(this).show('slide', {direction: 'down'}, transition_time);
                        this_.parents(".type-area").find(".step-area[data-step='" + active_step + "']").hide('slide', {direction: 'up'}, transition_time);
                    }
                    this_.parents(".menu").slideToggle(transition_time);
                }
            });
        }
    });

    /******* Send Form *********/

    var btn_send = $(".btn-finish");

    btn_send.on("click",function(){

        required($(this));

        if (req_state == true) {
            console.log("Send Form");
        }

    });

});
