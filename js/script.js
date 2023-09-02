'use strict';

$(document).ready(() => {

    /* Inicio: Acá se declaran las CONSTANTES y las variables */
    const WHATSAPP_CARACTERES_MAX = 8;
    const NAME_AND_LASTNAME_CARACTERES_MAX = 3;
    const MAX_STEP = 3;
    const MAX_ANIMATION_TIME = 1500;
    const KEY_CODE_ENTER = 13;
    const MAX_RELOAD_TIME = 5000;
    const MAX_LOADING = 2000;
    const MAX_MESSAGE = 2000;
    const REG_EXP_TEXT = new RegExp(/^[ A-ZÑÁÉÍÓÚ]+$/i);
    const REG_EXP_NUMBER = new RegExp(/^[0-9]+$/);

    let processCounter = 0;

    let buttonSubmit = $('#dataValidation');
    let fieldsetQuestionnaire = $('.fieldset.questionnaire');

    let fieldName = $('.field.name.required');
    let fieldLastName = $('.field.lastname.required');
    let fieldWhatsappNumber = $('.field.whatsapp.required');

    let inputName = $('#whatsappName');
    let inputLastName = $('#whatsappLastname');
    let inputWhatsappNumber = $('#whatsappNumber');

    let divCounter = $('.counter-whatsapp-form');
    let messages = $('.messages-whatsapp-form');
    let input = $('.input-text');
    let messagesLoading = $('.messages-whatsapp-form-loading');
    /* Fin: Acá se declaran las CONSTANTES y las variables */

    /* Inicio: Funciones */
    /**
     * @param {*} dataEntered
     * @returns
     */
    let isValidData = (dataEntered) => {
        let data = true;

        if (!dataEntered || dataEntered.value === "") {
            data = false;
            return data;
        }
        return data;
    }

    let counter = () => {
        processCounter++;
        $(divCounter).text(`${processCounter}/${MAX_STEP}`);
    }

    let isValidInput = (element, maxCaracteres, expReg) => {
        return isValidData(element.val()) &&
            (element.val()).length >= maxCaracteres &&
            expReg.test(element.val());
    }

    /**
     * @param {*} element: Elemento de DOM, se valida si tiene la clase error.
     */
    let hasClassError = (element) => {
        if (!element.hasClass('error')) {
            element.toggleClass('error');

            setTimeout(function () {
                element.toggleClass('error');
            }, MAX_ANIMATION_TIME);

        } else {
            element.removeClass('error');
        }
    }

    /**
     * @param message the message to be display
     * @param error if it is an error message or not
     */
    /* let showMessage = (message,error) => {
        if (!message.length) {
            return;
        }

        let styleBackground = error ? '#fbcbcb' : '#d0fbcb';
        let styleColor = error ? '#bb0000' : '#025614';

        $(messages)
            .addClass('block')
            .css('text-align','center')
            .html(
                $("<strong>")
                    .text(message)
                    .css('background',styleBackground)
                    .css('color',styleColor)
            );
    } */
    /* Fin: Funciones */

    counter();

    let callback = function (e) {
        event.preventDefault();
        event.stopPropagation()
        event.stopImmediatePropagation();

        switch (processCounter) {
            case 1:
                if (isValidInput(inputName, NAME_AND_LASTNAME_CARACTERES_MAX, REG_EXP_TEXT) && isNaN(inputName.val())) {
                    $(fieldName).addClass('valid');
                    $(fieldLastName).addClass('block');
                    inputLastName.focus();
                    counter();
                } else {
                    hasClassError($(inputName));
                }
                break;

            case 2:
                if (isValidInput(inputLastName, NAME_AND_LASTNAME_CARACTERES_MAX, REG_EXP_TEXT) && isNaN(inputLastName.val())) {
                    $(fieldLastName).addClass('valid');
                    $(fieldWhatsappNumber).addClass('block');
                    inputWhatsappNumber.focus();
                    counter();
                } else {
                    hasClassError($(inputLastName));
                }
                break;

            case 3:
                if (isValidInput(inputWhatsappNumber, WHATSAPP_CARACTERES_MAX, REG_EXP_NUMBER) && !(isNaN(inputWhatsappNumber.val()))) {

                    /*  let url = window.BASE_URL + 'improntus_whatsappform/contact/create'; */
                    /* 
                                            $.ajax({
                                                url: url,
                                                type: "POST",
                                                data: $('#whatsapp-form').serialize(),
                                                success: function(response) {
                                                    console.log(response); */

                    /* if (response.ok) { */
                    $(fieldsetQuestionnaire).hide();
                    $(divCounter).hide();
                    $(messagesLoading).append(`<div class="image-loading"></div>`);

                    setTimeout(function () {
                        $(messagesLoading).hide();
                    }, MAX_LOADING);

                    setTimeout(function () {
                        location.reload();
                    }, MAX_RELOAD_TIME);
                    /*  } */

                    /* setTimeout(function () {
                        showMessage(response.message,!response.ok);
                    }, MAX_MESSAGE); */
                    /*      }
                     }); */
                } else {
                    hasClassError($(inputWhatsappNumber));
                }
                break;

            default:
                break;
        }
    }

    $(input).keypress(function () {
        if (event.which === KEY_CODE_ENTER)
            callback();
    });

    $(buttonSubmit).on("click", callback);
});