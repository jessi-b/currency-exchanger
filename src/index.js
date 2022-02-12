import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-exchange';

function clearFields() {
  $('.showResult').text("");
  $('.showError').text("");
}

function getCurrency(response) {
  if (response) {
    $('.showResult').text(`${response.conversion_result}`);
    $('.showError').text("");
  } else {
    $('.showError').text(`There was an error: ${response}`);
    $('.showResult').text("");
  }
}

async function makeApiCall(currency, USD) {
  const response = await CurrencyExchange.getExchange(currency, USD);
  getCurrency(response);
}


$(document).ready(function() {
  $("form#currency-exchanger").submit(function(event) {
    event.preventDefault();
    let USD = parseInt($('#inputUSD').val());
    let currency = $("input:radio[name=newCurrency]:checked").val();
    if (!USD) {
      return $('.showError').text("Enter an amount to convert.");
    }
    if (!currency === "checked") {
      return $('.showError').text("Choose a currency to convert to.");
    }
    clearFields();
    makeApiCall(currency, USD);
  });
});

// gbp £
// euo €
// mxn $
// cad $
// aud $
// "unsupported-code" "Choose a currency"
// currency === undeifined  Choose a currency to convert to
// !USD Enter an amount to convert