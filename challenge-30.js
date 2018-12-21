(function() {
    (function(win, doc, $) {
    
        'use strict';

    var app = (function() {
        return {
        init: function() {
            this.loadCompany();
            this.initEvents();
        },
        initEvents: function() {
            $('[data-js="formSubmit"]').on('submit', this.handleSubmit);
        },
        handleSubmit: function(e) {
            e.preventDefault();
            var $tableCarros = $('[data-js="tableCarros"]').get();
            $tableCarros.appendChild(app.createNewCar());
        },
        createNewCar: function() {
            var $fragment = doc.createDocumentFragment();
            var $tr = doc.createElement('tr');
            var $tdImg = document.createElement('td');
            var $image = document.createElement('img');
            var $tdMarcaModelo = document.createElement('td');
            var $tdAno = document.createElement('td');
            var $tdPlaca = document.createElement('td');
            var $tdCor = document.createElement('td');

            $image.src = $('[data-js="formUrl"]').get().value;
            $tdImg.appendChild($image);

            $tdMarcaModelo.textContent = $('[data-js="formMarcaModelo"]').get().value;
            $tdAno.textContent = $('[data-js="formAno"]').get().value;
            $tdPlaca.textContent = $('[data-js="formPlaca"]').get().value;
            $tdCor.textContent = $('[data-js="formCor"]').get().value;

            $tr.appendChild($tdImg);
            $tr.appendChild($tdMarcaModelo);
            $tr.appendChild($tdAno);
            $tr.appendChild($tdPlaca);
            $tr.appendChild($tdCor);

            return $fragment.appendChild($tr);
        },
        loadCompany: function() {
            var ajax = new XMLHttpRequest();
            ajax.open('GET', './company.json', true);
            ajax.send();
            ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
        },
        getCompanyInfo: function() {
            if (app.isReady.call(this)) {
            var companyData = JSON.parse(this.responseText);
            var $companyNome = $('[data-js="companyNome"]').get();
            var $companyTelefone = $('[data-js="companyTelefone"]').get();
            $companyNome.textContent = companyData.name;
            $companyTelefone.textContent = companyData.phone;
            }
        },
        isReady: function() {
            return this.status === 200 && this.readyState === 4;
        }
        }
    })();

    app.init();
    })(window, document, window.DOM);


})();