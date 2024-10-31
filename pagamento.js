function mostrarFormaPagamento(metodo) {
    document.getElementById("form-pix").style.display = metodo === 'pix' ? 'block' : 'none';
    document.getElementById("form-cartao").style.display = metodo === 'cartao' ? 'block' : 'none';
}

document.querySelectorAll('#form-pix input, #form-cartao input').forEach(input => {
    input.required = false;
});

function logSubmit(event) {
    log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
    event.preventDefault();
}

const form = document.getElementById("form-pix");
form.addEventListener("submit", logSubmit);

function funçãoQueSeráExecutada() {
    confirm('10% de desconto ');
}

function validarCartao() {
    const numeroCartao = document.getElementById("numero").value;
    const erroSpan = document.getElementById("erro");

    if (numeroCartao.startsWith("1234") || numeroCartao.startsWith("4321")) {
        erroSpan.style.display = 'block';
        return false;
    } else {
        erroSpan.style.display = 'none';
        return true;
    }
}

function calcularDesconto() {
    const valorInput = document.getElementById("valor").value;
    const valor = parseFloat(valorInput);
    const totalPixSpan = document.getElementById("total-pix");
    const totalCartaoSpan = document.getElementById("total-cartao");

    if (!isNaN(valor) && valor > 0) {
        totalCartaoSpan.innerText = `R$ ${valor.toFixed(2).replace('.', ',')}`;
        
        const desconto = valor * 0.10;
        const total = valor - desconto;
        totalPixSpan.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    } else {
        totalPixSpan.innerText = "";
        totalCartaoSpan.innerText = "";
    }
}

function calcularParcelas() {
    const valorInput = document.getElementById("valor").value;
    const valor = parseFloat(valorInput);
    const totalCartaoSpan = document.getElementById("total-cartao");

    if (!isNaN(valor) && valor > 0) {
        const parcelas = parseInt(document.getElementById("valor-parcela").value);
        jurosCredito();

        for (let i = 1; i <= 5; i++) {
            const totalComParcelas = valor / i;
            document.getElementById(`total-${i}x`).innerText = `R$ ${totalComParcelas.toFixed(2).replace('.', ',')}`;
        }
    } else {
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`total-${i}x`).innerText = `R$ 0,00`;
        }
        totalCartaoSpan.innerText = `R$ 0,00`;
    }
}

function jurosCredito() {
    const valorTotal = document.getElementById("valor").value;
    const valor = parseFloat(valorTotal);
    const parcela = parseInt(document.getElementById("valor-parcela").value);
    const totalCartaoSpan = document.getElementById("total-cartao");

    if (!isNaN(valor) && valor > 0) {
        let juros = 0;

        if (parcela >= 4) {
            juros = 0.05;
        } else if (parcela >= 5) {
            juros = 0.10;
        }

        const valorComJuros = valor * (1 + juros);
        totalCartaoSpan.innerText = `R$ ${valorComJuros.toFixed(2).replace('.', ',')}`;
    } else {
        totalCartaoSpan.innerText = `R$ 0,00`;
    }
}

document.querySelector("form").addEventListener("submit", function(event) {
    if (!validarCartao() || !event.target.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios e verifique o número do cartão.");
        event.preventDefault();
    } else {
        alert("Pagamento efetuado com sucesso ✅!!");
    }
});

function identificarBandeira() {
    const numeroCartao = document.getElementById("numero").value.replace(/\s+/g, '');
    const bandeiraCartao = document.getElementById("bandeira-cartao");

    const bandeiras = {
        'visa': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
        'mastercard': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
        'amex': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
        'hiper': 'https://upload.wikimedia.org/wikipedia/commons/8/89/Hipercard_logo.svg',
        'elo': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Elo_logo.png'
    };

    if (/^4/.test(numeroCartao)) {
        bandeiraCartao.src = bandeiras.visa;
        bandeiraCartao.style.display = "inline";
    } else if (/^5[1-5]/.test(numeroCartao)) {
        bandeiraCartao.src = bandeiras.mastercard;
        bandeiraCartao.style.display = "inline";
    } else if (/^3[47]/.test(numeroCartao)) {
        bandeiraCartao.src = bandeiras.amex;
        bandeiraCartao.style.display = "inline";
    } else if (/^(4011|5067|509|636368|636297)/.test(numeroCartao)) {
        bandeiraCartao.src = bandeiras.elo;
        bandeiraCartao.style.display = "inline";
    } else if (/^6/.test(numeroCartao)) {
        bandeiraCartao.src = bandeiras.discover;
        bandeiraCartao.style.display = "inline";
    } else {
        bandeiraCartao.style.display = "none";
    }
}
