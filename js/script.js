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
    let showMessageError = (processCounter) => {
        
        let messageNameError = "<p>Por favor, ingresar un nombre con más de 3 caracteres.</p>";
        let messageLastNameError = "<p>Por favor, ingresar un apellido con más de 3 caracteres.</p>";
        let messagePhoneError = "<p>Por favor, ingresar un número valido. <br />(Un número valido corresponde a un max de 9 caracteres.).</p>";
        
        switch (processCounter) {
            case 1:
                $(messages).show();
                $(messages).append( $(messageNameError) );
                setTimeout(function() {
                    $(messages).hide();
                    $(messages).empty();
                }, MAX_MESSAGE);
            break;

            case 2:
                $(messages).show();
                $(messages).append($(messageLastNameError) );
                setTimeout(function() {
                    $(messages).hide();
                    $(messages).empty();
                }, MAX_MESSAGE);
            break;

            case 3:
                $(messages).show();
                $(messages).append( $(messagePhoneError) );
                setTimeout(function() {
                    $(messages).hide();
                    $(messages).empty();
                }, MAX_MESSAGE);
            break;
            default:
            break;
        }

    }
    /* Fin: Funciones */

    counter();

    let callback = function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        switch (processCounter) {
            case 1:
                if (isValidInput(inputName, NAME_AND_LASTNAME_CARACTERES_MAX, REG_EXP_TEXT) && isNaN(inputName.val())) {
                    $(fieldName).addClass('valid');
                    $(fieldLastName).addClass('block');
                    inputLastName.focus();
                    counter();
                } else {
                    hasClassError($(inputName));
                    showMessageError(processCounter);
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
                    showMessageError(processCounter);
                }
                break;

            case 3:
                if (isValidInput(inputWhatsappNumber, WHATSAPP_CARACTERES_MAX, REG_EXP_NUMBER) && !(isNaN(inputWhatsappNumber.val()))) {
                    $(fieldsetQuestionnaire).hide();
                    $(divCounter).hide();
                    $(messages).append("<p class='success'>Muchas gracias por registrarte.</p>");
                    $(messages).show();
                    $(messagesLoading).append(`<div class="image-loading"></div>`);

                    setTimeout(function () {
                        $(messagesLoading).hide();
                        $(messages).hide();
                    }, MAX_LOADING);

                    setTimeout(function () {
                        location.reload();
                    }, MAX_RELOAD_TIME);

                } else {
                    hasClassError($(inputWhatsappNumber));
                    showMessageError(processCounter);
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