// ===== ESCAPE ROOM JS: GERADOR DE SENHAS =====

// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS INICIAIS
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.parametro-senha__checkbox');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');

// 2. CONTROLE DE TAMANHO DA SENHA
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// 3. GERAÇÃO DA SENHA
function geraSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto += numeros;
    }

    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    // Impede erro caso nenhum tipo de caractere esteja selecionado
    if (alfabeto.length === 0) {
        campoSenha.value = '';
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        return;
    }

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(
            Math.random() * alfabeto.length
        );

        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;

    classificaSenha(alfabeto.length);
}

// 4. CLASSIFICAÇÃO DA FORÇA DA SENHA
function classificaSenha(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
}

// 5. ATUALIZA A SENHA QUANDO OS CHECKBOXES MUDAM
checkbox.forEach((item) => {
    item.addEventListener('change', geraSenha);
});

// 6. GERA A PRIMEIRA SENHA
geraSenha();
