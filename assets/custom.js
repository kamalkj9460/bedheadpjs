var bedhad = {
  slider_funciton: function(){ 
    
    $('.slider_slick').flickity({
      // options
      wrapAround: true,
      pageDots: false
       
    });
    
     $('.clhd_slider').flickity({
      // options
      wrapAround: true,
      pageDots: false,
      groupCells: false       
    }).addClass('active');
    
    $('.pdacd_heading .pdacd_heading_txt').on('click', function(e){
      e.preventDefault();
      show_prodcut_toggle($(this));  
      
    }).on('keydown', function(ev){
      if (ev.which ==13)  {
        //show_prodcut_toggle($(this));
      }
    });
    
    function show_prodcut_toggle(that){
      if(that.hasClass('size_chart_sidebtn')){
         $('.side_chart').css('right', 0);
         $('.side_chart_bg').addClass('active');
      }else{
        //$('.pdacd_heading').removeClass('active');
        that.closest('.pdacd_heading').toggleClass('active');
        that.closest('.pdacd_heading').next('.pdacd_description').slideToggle();
      }
    }
    
    
    $('.pdacd_heading .pdacd_heading_sign').on('click', function(){
        sign_accoundin($(this));
    }).on('keydown', function(ev){
      if (ev.which ==13)  {
       // sign_accoundin($(this));
      }
    });
    function sign_accoundin(that){
        that.closest('.pdacd_heading').toggleClass('active');
        that.closest('.pdacd_heading').next('.pdacd_description').slideToggle();
    }
     
    
    $('.nav_sizeChart li').on('click', function(){
      $('.nav_sizeChart li').removeClass('active');
      $('.data_table_size').removeClass('active');   
      
      var val = $(this).data('id');
      
       $(this).addClass('active');
       $('.data_table_size[data-id="'+val+'"]').addClass('active');   
       
    });
    
    
    $('.size_btn_chart').on('click', function(){
      $('.side_chart').css('right', 0);
      $('.side_chart_bg').addClass('active');
      
    });
    
     $('.close_side, .side_chart_bg').on('click', function(){
        $('.side_chart').css('right', '-200vw');
        $('.side_chart_bg').removeClass('active');
     });
    
    
    $('.retch_nav li').on('click', function(){
      var value = $(this).data('id');
      
      $('html, body').animate({
        scrollTop: $('.retch_item[data-id="'+value+'"]').offset().top - 100
      }, 500);
    });
  
    setTimeout(function(){
      // addCollectionUrl();
    }, 2000);
    
    function addCollectionUrl(){
      $('.boost-pfs-filter-products .product__grid-item').each(function(){
        var url = $(this).find('a').attr('href');
        var title =  $(this).find('.product-thumbnail__title').html();
        $(this).find('.product-thumbnail').append('<a class="link_add" href="'+url+'">'+title+'</a>');
      });
      
    }
    
    /*
    $('body').on('keypress', ".boost-pfs-filter-button ", function(e){
       console.log(e.keyCode);
    	if(e.keyCode == 13){
            var enter_position = $(this).index();
             var add_class = $(this).closest('.boost-pfs-filter-option').find('.boost-pfs-filter-option-item-list .boost-pfs-filter-option-item').eq(0).find('.boost-pfs-filter-button');
            add_class.addClass('active');
           // add_class.focus();
          // $(this).focus();
            //$("#form input , select , textarea").eq(enter_position+1).focus();
         // foucs_fildter($(this));
        }
    });
    
      $('body').on('click', ".boost-pfs-filter-button ", function(e){
        foucs_fildter($(this));
      });
    
    function foucs_fildter(that){
      setTimeout(function(){
       that.blur().addClass('active');;
      }, 100);
    }
    
    */
    
  
    
  },
  size_map: function(){
    
             $('.unit-controls .unit-control').on('keydown', function(ev){
              
      if (ev.which ==13)  { 
          
          let ussizeconvert = true;
        if($('.size-chart h3').text().includes("Women's")){
          ussizeconvert = false;
        }
          
          if(!$(this).hasClass('selected')){
            var unit = $(this).attr('data-unit');

            //Handles Button State
            if(unit =='metric'){
              $('.unit-controls .imperial').removeClass('selected');
            }else{
              $('.unit-controls .metric').removeClass('selected');
            }
            $(this).addClass('selected');

            //Conversion Functions
              function cmToIn(cm){
                if(isNaN(cm)) {
                  return 'NA';
                }else{
                    return Math.round(cm*0.39370);
                }
              }
              function inToCm(inches){
               if(isNaN(inches)) {
                  return 'NA';
                }else{
                 return Math.round(inches/0.39370);
                }
              }
      

            function lbToKg(lb){
              if(isNaN(lb)) {
                  return 'NA';
                }else{
             	 return Math.round(10*(lb/2.2046))/10;
                }
            }

            function kgToLb(kg){
               if(isNaN(kg)) {
                  return 'NA';
                }else{
              		return Math.round(10*kg*2.2046)/10;
                }
            }

            var weightAttrArray = ['weight'];
            var blacklistAttrArray = ['size','dog size','examples of breed'];
            var lengthColumnPositions = [];
            var weightColumnsPositions = [];

            //Gets the column position of the column we need to convert the length and appends to the array
            $('.size-chart tr:first-child td').each(function(index){
              var currentAttribute = $(this).text().toLowerCase();
              if(weightAttrArray.indexOf(currentAttribute) == -1 && blacklistAttrArray.indexOf(currentAttribute) == -1){
                lengthColumnPositions.push(index+1);
              }
              if(weightAttrArray.indexOf(currentAttribute) > -1){
                weightColumnsPositions.push(index+1);
              }
            });

             
            //Goes through each column and converts each value except for the headings
            lengthColumnPositions.forEach(function(position){
              if(ussizeconvert){
                $('.size-chart tr:not(:first-child) td:nth-child('+position+')').each(function(){
                var currentUnitValue = $(this).text().toLowerCase();
                if(currentUnitValue.indexOf('-') > -1){
                  currentUnitValue = currentUnitValue.split('-');
                  currentUnitValue = currentUnitValue.map(function(value){
                    console.log(value, parseInt(value));
                    return parseInt(value);
                  });
                  if(unit =='metric'){
                    $(this).attr("inch", $(this).text().toLowerCase());
                    $(this).text(inToCm(currentUnitValue[0])+'-'+inToCm(currentUnitValue[1]));
                  } else {
                    // $(this).text(cmToIn(currentUnitValue[0])+'-'+cmToIn(currentUnitValue[1]));
                    $(this).text($(this).attr("inch"));
                  }
                } else {
                  currentUnitValue = parseInt(currentUnitValue);
                  if(unit =='metric'){
                    $(this).attr("inch", $(this).text().toLowerCase());
                    $(this).text(inToCm(currentUnitValue));
                  }else{
                    // $(this).text(cmToIn(currentUnitValue));
                    $(this).text($(this).attr("inch"));
                  }
                }
              });
              }else{
                if(unit=="metric"){
                   womenchartset(cmTable);
                    
                  }else{
                   womenchartset(cmTable);

                  }    
              }      
            });
            
           
            //If there is a second table we know it is the womens chart so we will manually target the general inseam column
            var tables = $('table');
            if(tables.length > 1){
              if(ussizeconvert){
                $('.size-chart table:last-child tr:not(:first-child) td:nth-child(2)').each(function(){
                var currentUnitValue = $(this).text();
                currentUnitValue = currentUnitValue.split('-');
                currentUnitValue = currentUnitValue.map(function(value){
                  return parseInt(value);
                });
                if(unit =='metric'){
                  $(this).text(inToCm(currentUnitValue[0])+'-'+inToCm(currentUnitValue[1]));
                }else{
                  $(this).text(cmToIn(currentUnitValue[0])+'-'+cmToIn(currentUnitValue[1]));
                }
              });
              }else{
                if(unit=="metric"){
                    womenchartset(cmTable);          
                  }else{
                    womenchartset(cmTable);   
                  } 
              }      
            }
            

            weightColumnsPositions.forEach(function(position){
              $('.size-chart tr:not(:first-child) td:nth-child('+position+')').each(function(){
                var currentUnitValue = $(this).text();
                if(currentUnitValue.indexOf('-') > -1){
                  currentUnitValue = currentUnitValue.split('-');
                  currentUnitValue = currentUnitValue.map(function(value){
                    return parseInt(value);
                  });
                  if(unit =='metric'){
                    $(this).text(lbToKg(currentUnitValue[0])+'-'+lbToKg(currentUnitValue[1]));
                  }else{
                    $(this).text(kgToLb(currentUnitValue[0])+'-'+kgToLb(currentUnitValue[1]));
                  }
                }else{
                  currentUnitValue = parseInt(currentUnitValue);
                  if(unit =='metric'){
                    $(this).text(lbToKg(currentUnitValue));
                  }else{
                    $(this).text(kgToLb(currentUnitValue));
                  }
                }
              });
            });
          }
      }
        });

        function womenchartset(tb){
             $('.section_chart table ').replaceWith(tb);
          }
          const cmTable='<table width="100%">'+
        '<tbody>'+
        '<tr>'+
        '<td>Size</td>'+
        '<td>US Size</td>'+
        '<td>Bust</td>'+
        '<td>Waist</td>'+
        '<td>Hips</td>'+
        '</tr>'+
        '<tr>'+
        '<td>XS</td>'+
        '<td><span>2</span></td>'+
        '<td>83 5/6</td>'+
        '<td>63 1/2</td>'+
        '<td>90 1/6</td>'+
        '</tr>'+
        '<tr>'+
        '<td>S</td>'+
        '<td>4-6</td>'+
        '<td>87 5/8</td>'+
        '<td>67 1/3</td>'+
        '<td>94 </td>'+
        '</tr>'+
        '<tr>'+
        '<td>M</td>'+
        '<td>8-10</td>'+
        '<td>95 1/4</td>'+
        '<td>75</td>'+
        '<td>101 3/5</td>'+
        '</tr>'+
        '<tr>'+
        '<td>L</td>'+
        '<td>12-14</td>'+
        '<td>102 7/8</td>'+
        '<td>82 5/9</td>'+
        '<td>109 2/9</td>'+
        '</tr>'+
        '<tr>'+
        '<td>XL</td>'+
        '<td>16-18</td>'+
        '<td>110 1/2</td>'+
        '<td>90 1/6</td>'+
        '<td>116 5/6</td>'+
        '</tr>'+
        '<tr>'+
        '<td>1X</td>'+
        '<td>16-18W</td>'+
        '<td>113</td>'+
        '<td>92 5/7</td>'+
        '<td>119 3/8</td>'+
        '</tr>'+
        '<tr>'+
        '<td>2X</td>'+
        '<td>20-22W</td>'+
        '<td>120 2/3</td>'+
        '<td>100 1/3</td>'+
        '<td>127</td>'+
        '</tr>'+
        '<tr>'+
        '<td>3X</td>'+
        '<td>24-26W</td>'+
        '<td>128 1/4</td>'+
        '<td>108</td>'+
        '<td>134 5/8</td>'+
        '</tr>'+
        '</tbody>'+
        '</table>';
  },
  new_size_map: function(){
    
        $('.unit-controls .unit-control').click(function(){
          
          let ussizeconvert = true;
        if($('.size-chart h3').text().includes("Women's")){
          ussizeconvert = false;
        }
          
          if(!$(this).hasClass('selected')){
            var unit = $(this).attr('data-unit');

            //Handles Button State
            if(unit =='metric'){
              $('.unit-controls .imperial').removeClass('selected');
            }else{
              $('.unit-controls .metric').removeClass('selected');
            }
            $(this).addClass('selected');

            //Conversion Functions
              function cmToIn(cm){
                if(isNaN(cm)) {
                  return 'NA';
                }else{
                    return Math.round(cm*0.39370);
                }
              }
              function inToCm(inches){
               if(isNaN(inches)) {
                  return 'NA';
                }else{
                 return Math.round(inches/0.39370);
                }
              }
      

            function lbToKg(lb){
              if(isNaN(lb)) {
                  return 'NA';
                }else{
             	 return Math.round(10*(lb/2.2046))/10;
                }
            }

            function kgToLb(kg){
               if(isNaN(kg)) {
                  return 'NA';
                }else{
              		return Math.round(10*kg*2.2046)/10;
                }
            }

            var weightAttrArray = ['weight'];
            var blacklistAttrArray = ['size','dog size','examples of breed'];
            var lengthColumnPositions = [];
            var weightColumnsPositions = [];

            //Gets the column position of the column we need to convert the length and appends to the array
            $('.size-chart tr:first-child td').each(function(index){
              var currentAttribute = $(this).text().toLowerCase();
              if(weightAttrArray.indexOf(currentAttribute) == -1 && blacklistAttrArray.indexOf(currentAttribute) == -1){
                lengthColumnPositions.push(index+1);
              }
              if(weightAttrArray.indexOf(currentAttribute) > -1){
                weightColumnsPositions.push(index+1);
              }
            });

             
            //Goes through each column and converts each value except for the headings
            lengthColumnPositions.forEach(function(position){
              if(ussizeconvert){
                $('.size-chart tr:not(:first-child) td:nth-child('+position+')').each(function(){
                var currentUnitValue = $(this).text().toLowerCase();
                if(currentUnitValue.indexOf('-') > -1){
                  currentUnitValue = currentUnitValue.split('-');
                  currentUnitValue = currentUnitValue.map(function(value){
                    console.log(value, parseInt(value));
                    return parseInt(value);
                  });
                  if(unit =='metric'){
                    $(this).attr("inch", $(this).text().toLowerCase());
                    $(this).text(inToCm(currentUnitValue[0])+'-'+inToCm(currentUnitValue[1]));
                  } else {
                    // $(this).text(cmToIn(currentUnitValue[0])+'-'+cmToIn(currentUnitValue[1]));
                    $(this).text($(this).attr("inch"));
                  }
                } else {
                  currentUnitValue = parseInt(currentUnitValue);
                  if(unit =='metric'){
                    $(this).attr("inch", $(this).text().toLowerCase());
                    $(this).text(inToCm(currentUnitValue));
                  }else{
                    // $(this).text(cmToIn(currentUnitValue));
                    $(this).text($(this).attr("inch"));
                  }
                }
              });
              }else{
                if(unit=="metric"){
                   womenchartset(cmTable);
                    
                  }else{
                   womenchartset(cmTable);
                  }    
              }      
            });
            
           
            //If there is a second table we know it is the womens chart so we will manually target the general inseam column
            var tables = $('table');
            if(tables.length > 1){
              if(ussizeconvert){
                $('.size-chart table:last-child tr:not(:first-child) td:nth-child(2)').each(function(){
                var currentUnitValue = $(this).text();
                currentUnitValue = currentUnitValue.split('-');
                currentUnitValue = currentUnitValue.map(function(value){
                  return parseInt(value);
                });
                if(unit =='metric'){
                  $(this).text(inToCm(currentUnitValue[0])+'-'+inToCm(currentUnitValue[1]));
                }else{
                  $(this).text(cmToIn(currentUnitValue[0])+'-'+cmToIn(currentUnitValue[1]));
                }
              });
              }else{
                if(unit=="metric"){
                    womenchartset(cmTable);          
                  }else{
                    womenchartset(cmTable);
                  } 
              }      
            }
            

            weightColumnsPositions.forEach(function(position){
              $('.size-chart tr:not(:first-child) td:nth-child('+position+')').each(function(){
                var currentUnitValue = $(this).text();
                if(currentUnitValue.indexOf('-') > -1){
                  currentUnitValue = currentUnitValue.split('-');
                  currentUnitValue = currentUnitValue.map(function(value){
                    return parseInt(value);
                  });
                  if(unit =='metric'){
                    $(this).text(lbToKg(currentUnitValue[0])+'-'+lbToKg(currentUnitValue[1]));
                  }else{
                    $(this).text(kgToLb(currentUnitValue[0])+'-'+kgToLb(currentUnitValue[1]));
                  }
                }else{
                  currentUnitValue = parseInt(currentUnitValue);
                  if(unit =='metric'){
                    $(this).text(lbToKg(currentUnitValue));
                  }else{
                    $(this).text(kgToLb(currentUnitValue));
                  }
                }
              });
            });
          }
        });

        function womenchartset(tb){
             $('.section_chart table ').replaceWith(tb);
          }
          const cmTable='<table width="100%">'+
        '<tbody>'+
        '<tr>'+
        '<td>Size</td>'+
        '<td>US Size</td>'+
        '<td>Bust</td>'+
        '<td>Waist</td>'+
        '<td>Hips</td>'+
        '</tr>'+
        '<tr>'+
        '<td>XS</td>'+
        '<td><span>2</span></td>'+
        '<td>83 5/6</td>'+
        '<td>63 1/2</td>'+
        '<td>90 1/6</td>'+
        '</tr>'+
        '<tr>'+
        '<td>S</td>'+
        '<td>4-6</td>'+
        '<td>87 5/8</td>'+
        '<td>67 1/3</td>'+
        '<td>94 </td>'+
        '</tr>'+
        '<tr>'+
        '<td>M</td>'+
        '<td>8-10</td>'+
        '<td>95 1/4</td>'+
        '<td>75</td>'+
        '<td>101 3/5</td>'+
        '</tr>'+
        '<tr>'+
        '<td>L</td>'+
        '<td>12-14</td>'+
        '<td>102 7/8</td>'+
        '<td>82 5/9</td>'+
        '<td>109 2/9</td>'+
        '</tr>'+
        '<tr>'+
        '<td>XL</td>'+
        '<td>16-18</td>'+
        '<td>110 1/2</td>'+
        '<td>90 1/6</td>'+
        '<td>116 5/6</td>'+
        '</tr>'+
        '<tr>'+
        '<td>1X</td>'+
        '<td>16-18W</td>'+
        '<td>113</td>'+
        '<td>92 5/7</td>'+
        '<td>119 3/8</td>'+
        '</tr>'+
        '<tr>'+
        '<td>2X</td>'+
        '<td>20-22W</td>'+
        '<td>120 2/3</td>'+
        '<td>100 1/3</td>'+
        '<td>127</td>'+
        '</tr>'+
        '<tr>'+
        '<td>3X</td>'+
        '<td>24-26W</td>'+
        '<td>128 1/4</td>'+
        '<td>108</td>'+
        '<td>134 5/8</td>'+
        '</tr>'+
        '</tbody>'+
        '</table>';
  },
  product_option: function(){
    
     $('body').on('click', '.quick-shop__lightbox .ajax-submit', function(){
      console.log('gaurav');
      setTimeout(function(){
     	 $.fancybox.close();
         $('.header-cart').addClass('show-mini-cart');
      }, 1200);
    });
    
    
    $('.swatch__option').on('click', function(){
     var sw_img = $(this).data('url');

      if(selected_variant != sw_img)
        if( $('.product_scroll[data-url="'+sw_img+'"]').length > 0){
           var top = $('.product_scroll[data-url="'+sw_img+'"]').offset().top;
          
           $('html, body').animate({
             scrollTop:top
           }, 800); 
          selected_variant = sw_img;
        }
      
      change_buy_it();
      
    }).on('keydown', function(ev){
      if (ev.which ==13)  {
        
         $(this).find('input').trigger( "click" );
         change_buy_it();
      }
    });
    
    
    function change_buy_it(){
      setTimeout(function(){ 
          var id = $('body.product [name="id"]').val();
          var url = $('.direct_url').data('href');
         url = url+id+':1';
          $('.direct_url').attr('href', url);
      }, 60);
    }
    
    
  
    
    
    // tab click 
    
    $('body').on('keydown', '.cart__form  .is-inverse', function(ev){
      /*
      console.log(ev.which);
      
      if (ev.which ==13)  {
        var value_box = $(this).closest('.quantity-wrapper').find('[name="quantity"]');
        var qty = parseInt(value_box.val());
        if($(this).hasClass('quantity-plus')){
          qty +=1;
        }else{
          qty -=1;
        }
        console.log(qty);
        
         value_box.val(qty);
         //$(this).trigger( "click" );
      }
      */
    });
    
    
   
        // option list
    $('body').on('click', '.option_value', function(){ 
      	option_list($(this));
    }).on('keydown', function(ev){
      if (ev.which ==13) {
        option_list($(this));
      }
    });
    
    
    function option_list(that){
        var val = that.data('val');
      	var index = that.closest('.option_list').data('index');
        that.closest('.option_list').find('.option_value').removeClass('selected');
      	that.addClass('selected');
      	$('.swatch__options[data-variant-option-index="'+index+'"] .swatch-element[data-value="'+val+'"] label').trigger('click').addClass('active');      	
    }
    
    setTimeout(function(){
    	sold_out_function();
    }, 400);
    
    function sold_out_function(){
      var size = $('.product__form_option').data('size');
      
      for(var i = 0; size > i; i +=1){
        var ind = 0;
        $('.swatch__options[data-variant-option-index="'+i+'"] .swatch__option').each(function(){
            
            var soild = $(this).find('[type="radio"]').data('variant-option-available'); 
            if(soild == false){ 
              var sold_label = $('.option_list[data-index="'+i+'"] .option_value:eq('+ind+')').attr('aria-label');
              sold_label +='Sold Out';
              $('.option_list[data-index="'+i+'"] .option_value:eq('+ind+')').addClass('sold_outs').attr('aria-label', sold_label);
            }
          	ind +=1;
          
        });
        
      }
      
    }
     
    
  },
  error_remove: function(){
    // action-area__link
    $('.action-area__link').on('click', function(){
      $('.onclick_hide_value').val('');
    });
    
  },
  update_cart: function(){
    
    $('.qty_inverse').on('click', function(){
      update_cart_value($(this));
    }).on('keydown', function(ev){
        // ev.preventDefault();
      if (ev.which ==13)  {
          update_cart_value($(this));
      }
    });
    
    $('.cart_quantity').on('change', function(){
      var qty = $(this).val();
       var id = $(this).data('id');
       console.log(qty);
       console.log(id);
      
       change_qty(qty, id);
    }).on('keydown', function(ev){
        // ev.preventDefault();
      if (ev.which ==13)  {
        var qty = $(this).val();
        var id = $(this).data('id');
           change_qty(qty, id);
      }
    });
    
    
    function update_cart_value(that){
       var value_box = that.closest('.cart_item_flx').find('[name="quantity"]');
        var qty = parseInt(value_box.val());
        if(that.hasClass('qty_plus')){
          qty +=1;
        }else{
          qty -=1;
        }
      var id = value_box.data('id');
      change_qty(qty, id);
    }
    
    function change_qty(qty, id){ 
       jQuery.post('/cart/change.js', 
                   { quantity: qty, id: id }).done(function() { 
         			window.location.href = '/cart';
                
              });
    }
     
    
  },
  gift_cart: function(){
    
    var GIFTWRAP_PRODUCT_TYPE = 'Gift Box';
  	var GIFTWRAP_VARIANT_ID = 7259307802652; //39325627547744;
    var gift_attr = {};
    
    $('body').on('submit', 'form[action="/cart"]', function(e){
        console.log('guarav');
      var qty = 0;
       
       $(this).addClass('active');
      
      e.preventDefault();
       
      
      if($(this).hasClass('cart_page')){
        
        $(this).find('.cart__item-list').children('.cart__card').each(function(){
          if($(this).find('.giftwrap_btn').hasClass('active')){
            qty = qty + 1;
            var key =  $(this).find('#gift-note').data('val');
            var value = $(this).find('#gift-note').val();
            gift_attr[key] = value;
          }
          
        });
        
      }else{
        $(this).find('.mmc_item_box').children('.mmc_items').each(function(){
          if($(this).find('.giftwrap_btn').hasClass('active')){
            qty = qty + 1;
            
            var key =  $(this).find('#gift-note').data('val');
            var value = $(this).find('#gift-note').val();
            gift_attr[key] = value;
          }
          
        });  
      } 
       
        
       get_cart(qty, $(this));
      
       e.preventDefault(); 
      
      
      /*
      setTimeout(function(){
         
          $(this).submit();
         
        console.log('gaurav');
      }, 4800);
     
       */
      
      
    });
    
     
    
    // remove all attr 
    $('.remove_attr').on('click', function(){
         $.ajax({
          type: "GET",
          url: '/cart.js',
          dataType: 'json',
          success: function(resp) { 
              var nullHash = {};
              for ([key, value] of Object.entries(resp.attributes)) {    
                  nullHash[key] = '';
              }
              $.ajax({
                  type: "POST",
                  url: '/cart/update.js',
                  data: {attributes:nullHash},
                  dataType: 'json'
              });
          }
      });
    });
     
    
    // mincart;
      $('body').on('click', '.js-giftwrap', function(){ 
         var gift_val = $(this).data('val');
       if ($(this).is(':checked') == true) {
           $(this).closest('.giftwrap-option').addClass('active');
             $(this).closest('.giftwrap-option').next('.gift-note-field').show();
             var val =  $(this).closest('.giftwrap-option').next('.gift-note-field').find('textarea').data('val');
        	 $(this).closest('.giftwrap-option').next('.gift-note-field').find('textarea').attr('name', 'attributes['+val+']').val('note');
         
         //get_cart(1, gift_val);
       }else{
         $(this).closest('.giftwrap-option').removeClass('active');
         $(this).closest('.giftwrap-option').next('.gift-note-field').hide();
          $(this).closest('.giftwrap-option').next('.gift-note-field').find('textarea').removeAttr('name');
         //get_cart(0, gift_val);
       }
    });
    
    // cart
    
      $('body').on('click', '.giftwrap_btn', function(ev){
      ev.preventDefault();
       tab_gift($(this));
    }).on('keydown', function(ev){
        // ev.preventDefault();
      if (ev.which ==13)  {
          tab_gift($(this));
      }
    });
    
    function tab_gift(that){
      var gift_val = that.data('val');
      var gift_qty = that.data('qty');
      
      that.toggleClass('active');
        
      if (that.hasClass('active')) { 
             that.closest('.giftwrap-option').next('.gift-note-field').show();
             var val = that.closest('.giftwrap-option').next('.gift-note-field').find('textarea').data('val');
        	 that.closest('.giftwrap-option').next('.gift-note-field').find('textarea').attr('name', 'attributes['+val+']').val('note');
        	// get_cart(1, gift_val, gift_qty);
        	 
       }else{
         that.closest('.giftwrap-option').next('.gift-note-field').hide();
         that.closest('.giftwrap-option').next('.gift-note-field').find('textarea').removeAttr('name');
        // get_cart(0, gift_val, gift_qty);
       }
    }
    
    
    // remove cart item
    $('.cart__remove-btn').on('click', function(){
      var gift_val = $(this).closest('.cart__card').find('.cart__info').find('.giftwrap_btn.active').data('val');
      
       
    });
    
    // remove min cart item
    $('body').on('click', '.ajax-cart__delete', function(){
      var gift_val = $(this).closest('.ajax-cart__product').find('.giftwrap-option.active').find('.js-giftwrap').data('val');
      console.log(gift_val);
      
       
    });
    
    // updtae cart attr
    
    $('body').on('change', '.gift-note', function(){
      var note = $(this).val();
      var gift_val = $(this).data('val');
      // only_updata_attr(gift_val, note);
    });
    
    
    function only_updata_attr(gift_val, note){
      console.log(note + gift_val);
       $.ajax({
                type: 'POST',
                url: '/cart/update.js',
                  data: 'attributes['+gift_val+': '+note+']'
        });
    }
    
    
    function add_gift(qty, that){ 
      console.log(qty);
      
        var data = 'id='+ GIFTWRAP_VARIANT_ID + '&quantity='+qty;
	    $.ajax({
	      type: 'POST',
          url: '/cart/add.js',
	      dataType: 'json',
	      data: data,
	      success: function(res){
         	  window.location.href = '/checkout';
	      },
          error: function(error){
            console.log(error);
          } 
        }); 
      
    }
    
    function remove_gift(qty, gift_qty, that){
      
      console.log(qty);
       
        $.ajax({
          type: "POST",
          url: "/cart/change.js",
          dataType: "json",
          data: {
            id: GIFTWRAP_VARIANT_ID,
            quantity: qty,
          },
	      success: function(res){
	            window.location.href = '/checkout'
	      },
          error: function(error){
            console.log(error);
          }          
        });
      
    }
     
    
    function get_cart(qty, that){
      
    
      $.ajax({
        dataType: "json", 
        url: "/cart.js",
        success: function (cart) {
          
          var nullHash = {};
              for ([key, value] of Object.entries(cart.attributes)) {    
                  nullHash[key] = '';
              }
           
           
           $.ajax({
                  type: "POST",
                  url: '/cart/update.js',
                  data: {attributes:nullHash},
                  dataType: 'json',
                  success: function(res){
                    
                     $.ajax({
                        type: "POST",
                        url: '/cart/update.js',
                        data: {attributes:gift_attr},
                        dataType: 'json'
                     });
                    
                    	 
                     setTimeout(function(){ 
                      var gift_qty = 0;
                      $.each(cart.items, function(index, item){
                        if(item.id == GIFTWRAP_VARIANT_ID){
                           gift_qty = item.quantity;
                        } 
                      });

                      if(gift_qty == 0 && qty != 0){
                        add_gift(qty, that);
                      }else{
                        remove_gift(qty , gift_qty, that);
                      }
                    }, 300);
                    
                  }
              });
              
        }
      }); 
    }
    
    
  },
  tab_app: function(){
    
    $('.cart__remove-btn').on('keydown', function(ev){
      if(ev.which ==13)  {
        var url = $('.cart__remove-btn').attr('href');
        window.location.href = url;
      }
    });
    
    
    $('form#cart_form [type="submit"]').on('keydown', function(ev){
      if (ev.which ==13)  {
       window.location.href = '/checkout';
      }
    });
    
    $('.quick-shop__buttons').on('click', function(){
       setTimeout(function(){ 
         console.log('gaurav');
          $('.product_name').attr('tabindex', 0);
         // $('.quick_shop').attr({'tabindex': '0', 'aria-label': 'quick view is open'});
       }, 2000);
    });
    
    setTimeout(function(){ 
     // $('.quick_shop').attr('aria-label', 'quick view is open');
    }, 600);
    
     setTimeout(function(){ 
       tab_txt(); 
       
       $('.boost-pfs-filter-option-range-amount-min, .boost-pfs-filter-option-range-amount-max').attr('tabindex', '0');
       
       var min = $('.boost-pfs-filter-option-range-amount-min').val();
       var max = $('.boost-pfs-filter-option-range-amount-max').val();
       $('.boost-pfs-filter-option-range-amount-split').prepend('<div class="hide_label_filter" tabindex="0" aria-label="input field minimum value '+min+' dollars">'+min+'</div>')
       													.append('<div class="hide_label_filter" tabindex="0" aria-label="input field maximum value '+max+' dollars">'+max+'</div>');
       
        //$('.boost-pfs-filter-option-range-amount-min, .boost-pfs-filter-option-range-amount-max').attr('tabindex','-1');
       
       
       // size  
        $('.boost-pfs-filter-option-size .boost-pfs-filter-option-item-list .boost-pfs-filter-option-item').each(function(){
          var txt = $(this).find('.boost-pfs-filter-option-value').html(); 
          $(this).find('button.boost-pfs-filter-button').attr('aria-label', 'size '+txt);
        });
         
       
       // cart page
       $('.shopify-cleanslate ul li:eq(2) iframe').attr('tabindex', '-1');
       $('.shopify-cleanslate ul li:eq(2)').prepend('<div class="Paypal_aria" aria-label="Paypal" tabindex="0">Paypal</div>');
      
     }, 5000);
    
    function tab_txt(){  
      $('.starapps-accordion .starapps-panel').each(function(){
        var li_heading = $(this).find('.starapps-title').html();
        $(this).find('.starapps-title').html('');
         
        $(this).prepend('<div class="panel_heading" tabindex="0">'+li_heading+'</div>');
        
        var heade_txt = $(this).find('.starapps-body').text().trim();
        $(this).append('<div class="starapps-body hide_txt" tabindex="0">'+heade_txt+'</div>');
      }); 
      
      
      
      $('.panel_heading .pull-right').attr('aria-label', 'drop down icon');
    }
    
    $('body').on('click', '.panel_heading', function(){
      $(this).toggleClass('active');
      $(this).closest('.starapps-panel').find('.starapps-body').toggleClass('active');
    });
    
    $('.jsRecommendedProducts, .jsProduct').attr('tabindex', '0');
    
  },
  speed: function(){
    
    setTimeout(function(){
      var video_url = $('.index_video').data('id'); 
      
      if(typeof video_url !== undefined ){
       var html = '<video class="video_box" autoplay loop muted playsinline preload="none">'+
                        '<source src="'+video_url+'" type="video/mp4" />'+
                   '</video>';
         $('.index_video').append(html);
      }
      
      var video_u = $('.index_video_left_right').data('id'); 
        if(typeof video_u !== undefined ){
       var html = '<video autoplay loop muted playsinline preload="none">'+
                        '<source src="'+video_u+'" type="video/mp4" />'+
                   '</video>';
         $('.index_video_left_right').append(html);
      }
      
       
    }, 8000);
    
    
  },
  collection_product_url: function(){ 
   
      if(typeof product_detail !== 'undefined'){
        $('.collection__content .boost-pfs-filter-products .product__thumbnail').each(function(){
          	var id = $(this).data('id');
          	var that = $(this);
          
          $(product_detail).each(function(index, item){
            if(item.id == id && item.url != null){
              that.find('a').attr('href', item.url);
              that.find('.product-thumbnail__price, .quick_shop, .sale-sticker').hide();
            }            
          });
          
        });
        
      } 
    
  },
   mincart: function(){

    $('body').on('click', '.action_button', function() {
       setTimeout(function(){
        // $('[data-fancybox-close]').trigger("click");
       }, 800);
    });
    
    $('.SideCart__item a').on('click', function(){
      var href = $(this).attr('href');
      window.location.href = href;  
    });
    
    $('.cart__remove').on('click', function(){
      console.log('remove');
      setTimeout(function(){
        location.reload();
      }, 500); 
    });
    
    $('.header-cart a, .header-cart__icon').on('click', function(e){
      e.preventDefault();
      $('.min_cart').addClass('active');
      $('body').addClass('active_mincart');
    });
    $('.min_bg, .min_cart_close').on('click', function(){
       $('.min_cart').removeClass('active');
       $('body').removeClass('active_mincart');
    });

    $('body').on('click', '.mmc_title a', function(){
        var url = $(this).attr('href');
        window.location.href = url;
    });
    
    $('body').on('click', '.remove_item', function(e){
       e.preventDefault();
      var line = $(this).data('line');
      update_line(line, 0);
    });
    
    $('body').on('click', '.mmc_sign', function(){
      var qty = parseInt($(this).closest('.mmc_qty').find('.quantity-input').val());
      var line = $(this).closest('.mmc_qty').data('line-item-key');
      var id = $(this).closest('.mmc_qty').find('.quantity-input').data('id');
      if($(this).hasClass('mmc_min')){
        qty = qty - 1;
      }else{
        qty = qty + 1;
      }
      
       update_qty(qty, id)
       
       // update_line(line, qty);
      
    });
    
    $('body').on('change', '.quantity-input', function(){
       var qty = parseInt($(this).val());
       var line = $(this).data('line-id');
       var id = $(this).data('id');
      
       //update_line(line, qty);
      update_qty(qty, id)
    });
    
    
    $('body').on('submit','form[action="/cart/add"]', function(e){
       e.preventDefault();
      addItem($(this));
    });
    
    function addItem(that) {
       $.ajax({
          type: 'POST', 
          url: '/cart/add.js',
          dataType: 'json', 
          data: that.serialize(),
           success: function(cart) {
             get_cart();  
           },
           error: function(response) {
             //alert(response);
           }
       });
    }
    
    
    function update_line(line, qty){
      var url = '/cart/change?line='+line+'&quantity='+qty;
      
           $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    success: function(cart) {
                       get_cart();  
                    },
                    error: function(response) {
                         location.reload();
                    }
                }); 
    }
    
    function update_qty(qty, id){
       $.ajax({
          type: "POST" ,
          url: "/cart/change.js",
          dataType: "json",
          data: {
            id: id,
            quantity: qty,
          },
          success: function(resp) { 
            	//location.reload();
                get_cart();
          }
      });
    }
    
    
    function get_cart(){
      
      /*
        $.ajax({ 
          url:'/cart', 
          success: function(cart) { 
            var html = $(cart).find('.min_cart_inner').html();
             
            $('.min_cart_inner').html(html);
            $('.min_cart').addClass('active');
          }
       });
       */
      
      
      jQuery.getJSON('/cart.js', function(cart) {
         console.log(cart);
         var html = '', count = 0;
          for(var i=0; i<cart.items.length; i++){
            
            var item = cart.items[i];
           
            var forloop = i + 1; 
            
            if(item.product_title != 'Gift Box'){
              count += item.quantity; 
             html += '<div class="mmc_items">'+
                      '<div class="mmc_img">'+
                         '<a href="'+item.url+'" class="cart_page_image">'+
                            '<img src="'+item.image+'"/>'+
                          '</a>'+
                      '</div>'+
            '<div class="mmc_detail">'+
              '<div class="mmc_title"><a href="'+ item.url+'">'+item.title+'</a> </div>'+
               
              '<div class="mmc_price" tabindex="0">'+Shopify.formatMoney(item.line_price)+' </div>'+
              
               '<div class="mmc_qty" data-line-item-key='+forloop+'>'+
                 '<div aria-label="Cart quantity minus" class="mmc_sign mmc_min"><span class="icon "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="minus"><rect x="5" y="46" width="90" height="8"/></g></svg></span></div>'+
                  '<input class="quantity-input" data-id="'+item.id+'"  type="text" name="quantity" value="'+item.quantity +'" data-line-id="'+ forloop +'">'+
                 '<div aria-label="Cart quantity plus" class="mmc_sign mmc_plus"><spna class="icon "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="plus"><polygon points="95 46 54 46 54 5 46 5 46 46 5 46 5 54 46 54 46 95 54 95 54 54 95 54 95 46"/></g></svg></span></div>'+
               '</div> '; 
              
              var  g_name = 'Gift Note for '+item.title;
              var gift = false , gift_txt = '',  class_active = '', style_show = '', name_att = '';
                  
              $(cart.attributes).each(function(index, attribute){
                 var name = 'Gift Note for '+item.title;
                 var first_title =  attribute[name];
                
                if(typeof first_title !== "undefined"){
                      var gift = true;
                      class_active = 'active';
                  	  style_show = 'style="display:block"';
                      gift_txt = attribute[name];
                      name_att = 'name="attributes['+name+']"';
                }
              });
                  	 
               
            html +=  '<div class="giftwrap-option" data-va="'+ gift+'"> '+
                       '<button class="giftwrap_btn '+class_active+'" data-qty="'+ item.quantity +'"  data-val="Gift Note for '+ item.title +'"   aria-label="Complimentary Gift Box">'+
                         '<span class="giftwrap_check"></span>'+
                         '<span class="giftwrap_txt" >Complimentary Gift Box</span>'+
                       '</button>'+
                                               
                       '</div> '+
                       '<div class="gift-note-field" '+style_show+'> '+
                         '<label for="gift-note">Gift Note (Optional)</label> '+
                         '<textarea id="gift-note" '+name_att+' data-val="Gift Note for '+item.title+'"  placeholder="For my dearest...">'+ gift_txt +'</textarea> '+
                       '</div>' +
                         
            '</div>'+
            
            '<div class="mmc_close" >'+
               '<button class="close remove_item" tabindex="0" aria-label="Remove item" data-line="'+ forloop +'"><span class="icon "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="x"><polygon points="97.83 7.83 92.17 2.17 50 44.34 7.83 2.17 2.17 7.83 44.34 50 2.17 92.17 7.83 97.83 50 55.66 92.17 97.83 97.83 92.17 55.66 50 97.83 7.83"/></g></svg></span></button>'+
            '</div>'+
            
          '</div>';
            }
            
            $('.mmc_item_box').html(html);
            $('.mmc_total_price').html(Shopify.formatMoney(cart.total_price));
            
            $('.min_cart').addClass('active');
            $('.header-cart__count').html(count).show();
            $('body').addClass('active_mincart');
             
          }
       });
      
    }
    
  }
}


$(function(){
  bedhad.slider_funciton();
  bedhad.new_size_map();
  bedhad.product_option();
  bedhad.error_remove(); 
  bedhad.update_cart();
  bedhad.gift_cart();
  bedhad.mincart();   
  bedhad.tab_app();
  bedhad.collection_product_url();
  
   setTimeout(function(){
       bedhad.collection_product_url();
    },1800);
  setTimeout(function(){
       bedhad.collection_product_url();
    },2800);
     setTimeout(function(){
       bedhad.collection_product_url();
    },4800);
});

$(window).scroll(function(){
  var top = $(window).scrollTop();
  if(top > 100){
    $('#header').addClass('active_subhead');
  }else{
    $('#header').removeClass('active_subhead');
  }
  
});









var ReviewHtml = '<div class="feefo-review-item">' +
        '<div class="feefo-review-header">' +
        '<div class="feefo-rating-wrapper">' +
        '<div class="empty-stars">' +
        '<i class="fa fa-star-o"></i>' +
        '<i class="fa fa-star-o"></i>' +
        '<i class="fa fa-star-o"></i>' +
        '<i class="fa fa-star-o"></i>' +
        '<i class="fa fa-star-o"></i>' +
        '</div>' +
        '<div class="filled-stars" style="width: 100%">' +
        '<i class="fa fa-star"></i>' +
        '<i class="fa fa-star"></i>' +
        '<i class="fa fa-star"></i>' +
        '<i class="fa fa-star"></i>' +
        '<i class="fa fa-star"></i>' +
        '</div>' +
        '</div>' +
        '<div class="feefo-author"></div>' +
        '<div class="feefo-time-ago"></div>' +
        '</div>' +
        '<div class="feefo-reviews">' +
        '<div class="feefo-review-content">' +
        '</div>' +
        '</div>' +
        '<div class="feefo-review-footer">' +
        '<span class="feefo-review-thumbs-count"></span>' +
        '<i class="fa fa-thumbs-up"></i>' +
        '</div>' +
        '</div>';

setTimeout(function() {	
  let el = $(".feefo-product-review-aggregated");
  if (el.length === 0) return;

  el.click(function() {
    if ($("#feefo-product-review").length > 0 && $(this).attr('data-scroll') === 'true') {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#feefo-product-review").offset().top - 120
      }, 1000);
    }
  });

  el.each(function(elIdx) {
    loadAggRating($(this));
  });
});

function loadAggRating(elm) {

  const sku = elm.attr('data-product-sku');
  const merchant_identifier = "bedhead-pajamaskomar-sleepwear";
  const origin = "bedheadpjs.com";
  const url = 'https://api.feefo.com/api/10/reviews/summary/product?since_period=all&unanswered_feedback=include&source=on_page_product_integration&merchant_identifier='+merchant_identifier+'&origin='+origin+'&parent_product_sku='+sku;
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    const percent = 100 / data.rating.max * data.rating.rating;
    elm.find('.filled-stars').css('width', percent + '%');
    const count = data.meta.count;
   
    if (count > 0 && percent > 60) {
      elm.find('.agg-count').text(count.toString());
      elm.find('.collection-page-agg').text('( '+count.toString()+' )');
      if (count === 1) elm.find('.plural-number').hide();
      elm.show();
      $(elm).find('.ratingReviews').show();
    }
  });
}

setTimeout(function() {	
  let el = $("#feefo-product-review");
  if (el.length === 0) return;

  const sku = el.attr('data-product-sku');
  const merchant_identifier = "bedhead-pajamaskomar-sleepwear";
  const origin = "bedheadpjs.com";

  //loadMore(sku, merchant_identifier, origin, 1);

  $(document).on('click', 'button.feefo-load-more', function() {
    const page = $(this).attr('data-page');
    $('button.feefo-load-more').remove();
    loadMore(sku, merchant_identifier, origin, page);
  })
});





