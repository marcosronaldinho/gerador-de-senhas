// ==========================================
// GERADOR DE SENHAS
// ==========================================


// ==========================================
// 1. ELEMENTOS DA PÁGINA
// ==========================================

const campoSenha = document.querySelector('#campo-senha');

const numeroSenha = document.querySelector('#numero-senha');

const botaoDiminui = document.querySelector('#botao-diminui');
const botaoAumenta = document.querySelector('#botao-aumenta');

const botaoGerar = document.querySelector('#botao-gerar');
const botaoCopiar = document.querySelector('#botao-copiar');

const checkMaiusculas = document.querySelector('#maiusculas');
const checkMinusculas = document.querySelector('#minusculas');
const checkNumeros = document.querySelector('#numeros');
const checkSimbolos = document.querySelector('#simbolos');

const checkCarinha = document.querySelector('#check-carinha');
const checkAnimais = document.querySelector('#check-animais');
const checkUnicode = document.querySelector('#check-unicode');
const checkCidade = document.querySelector('#check-cidade');
const checkSemRepeticao = document.querySelector('#check-sem-repeticao');

const forcaSenha = document.querySelector('.forca');
const textoForca = document.querySelector('#texto-forca');

const contadorCaracteres = document.querySelector(
    '#contador-caracteres'
);

const mensagemErro = document.querySelector('#mensagem-erro');

const mensagemCopia = document.querySelector('#mensagem-copia');


// ==========================================
// 2. CONFIGURAÇÕES
// ==========================================

let tamanhoSenha = 12;

const tamanhoMinimo = 4;
const tamanhoMaximo = 32;


// ==========================================
// 3. CARACTERES DISPONÍVEIS
// ==========================================

const letrasMaiusculas =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas =
    'abcdefghijklmnopqrstuvwxyz';

const numeros =
    '0123456789';

const simbolos =
    '!@#$%&*?+-_=<>';


// Emojis precisam ser tratados como elementos de array.
// Isso evita problemas com caracteres Unicode compostos
// por dois valores internos do JavaScript.

const emojisCarinhas = [
    '😀',
    '😎',
    '🤖',
    '👾',
    '🥳',
    '😈',
    '🤩',
    '😺'
];

const emojisAnimais = [
    '🦁',
    '🦊',
    '🐼',
    '🦅',
    '🐯',
    '🐺',
    '🐸',
    '🐵'
];

const unicodeEspecial = [
    '©',
    '®',
    '™',
    '✓',
    '✿',
    '⚡',
    '🚀',
    '💎',
    '★',
    '☆',
    '♠',
    '♣',
    '♥',
    '♦'
];

const cidades = [
    'Curitiba',
    'Cascavel',
    'Toledo',
    'Londrina',
    'Maringá',
    'PontaGrossa'
];


// ==========================================
// 4. ATUALIZA O NÚMERO NA TELA
// ==========================================

numeroSenha.textContent = tamanhoSenha;


// ==========================================
// 5. DIMINUIR TAMANHO
// ==========================================

botaoDiminui.addEventListener('click', () => {

    if (tamanhoSenha > tamanhoMinimo) {

        tamanhoSenha--;

        numeroSenha.textContent = tamanhoSenha;

        geraSenha();
    }

});


// ==========================================
// 6. AUMENTAR TAMANHO
// ==========================================

botaoAumenta.addEventListener('click', () => {

    if (tamanhoSenha < tamanhoMaximo) {

        tamanhoSenha++;

        numeroSenha.textContent = tamanhoSenha;

        geraSenha();
    }

});


// ==========================================
// 7. CRIAR ALFABETO
// ==========================================

function criaAlfabeto() {

    let alfabeto = [];

    if (checkMaiusculas.checked) {

        alfabeto.push(
            ...[...letrasMaiusculas]
        );
    }


    if (checkMinusculas.checked) {

        alfabeto.push(
            ...[...letrasMinusculas]
        );
    }


    if (checkNumeros.checked) {

        alfabeto.push(
            ...[...numeros]
        );
    }


    if (checkSimbolos.checked) {

        alfabeto.push(
            ...[...simbolos]
        );
    }


    if (checkCarinha.checked) {

        alfabeto.push(
            ...emojisCarinhas
        );
    }


    if (checkAnimais.checked) {

        alfabeto.push(
            ...emojisAnimais
        );
    }


    if (checkUnicode.checked) {

        alfabeto.push(
            ...unicodeEspecial
        );
    }


    return alfabeto;
}


// ==========================================
// 8. ESCOLHER ELEMENTO ALEATÓRIO
// ==========================================

function elementoAleatorio(array) {

    const indice = Math.floor(
        Math.random() * array.length
    );

    return array[indice];
}


// ==========================================
// 9. ESCOLHER CIDADE
// ==========================================

function cidadeAleatoria() {

    return elementoAleatorio(cidades);
}


// ==========================================
// 10. GERAR SENHA
// ==========================================

function geraSenha() {

    mensagemErro.textContent = '';
    mensagemCopia.textContent = '';

    let alfabeto = criaAlfabeto();


    // ======================================
    // NENHUM CARACTERE SELECIONADO
    // ======================================

    if (alfabeto.length === 0) {

        campoSenha.value = '';

        contadorCaracteres.textContent = '0';

        forcaSenha.className = 'forca vazia';

        textoForca.textContent = 'Sem senha';

        textoForca.className = '';

        mensagemErro.textContent =
            'Selecione pelo menos um tipo de caractere.';

        return;
    }


    // ======================================
    // NÃO REPETIR CARACTERES
    // ======================================

    if (
        checkSemRepeticao.checked &&
        tamanhoSenha > alfabeto.length
    ) {

        campoSenha.value = '';

        mensagemErro.textContent =
            `Não é possível gerar uma senha de ${tamanhoSenha} caracteres ` +
            `sem repetição. Existem apenas ${alfabeto.length} opções disponíveis.`;

        contadorCaracteres.textContent = '0';

        forcaSenha.className = 'forca vazia';

        textoForca.textContent = 'Erro';

        return;
    }


    // ======================================
    // GERAR CARACTERES
    // ======================================

    let senhaArray = [];

    let alfabetoDisponivel = [
        ...alfabeto
    ];


    for (
        let i = 0;
        i < tamanhoSenha;
        i++
    ) {

        const indice = Math.floor(
            Math.random() *
            alfabetoDisponivel.length
        );

        senhaArray.push(
            alfabetoDisponivel[indice]
        );


        // Remove o caractere escolhido
        // quando não pode haver repetição.

        if (checkSemRepeticao.checked) {

            alfabetoDisponivel.splice(
                indice,
                1
            );
        }
    }


    let senha = senhaArray.join('');


    // ======================================
    // ADICIONAR CIDADE
    // ======================================

    if (checkCidade.checked) {

        const cidade = cidadeAleatoria();

        senha = cidade + '-' + senha;
    }


    // ======================================
    // MOSTRAR SENHA
    // ======================================

    campoSenha.value = senha;

    contadorCaracteres.textContent =
        [...senha].length;


    // ======================================
    // CLASSIFICAR FORÇA
    // ======================================

    classificaSenha(
        alfabeto.length,
        senha
    );
}


// ==========================================
// 11. CLASSIFICAR FORÇA DA SENHA
// ==========================================

function classificaSenha(
    tamanhoAlfabeto,
    senha
) {

    forcaSenha.classList.remove(
        'fraca',
        'media',
        'forte',
        'vazia'
    );

    textoForca.classList.remove(
        'texto-fraca',
        'texto-media',
        'texto-forte'
    );


    // ======================================
    // ENTROPIA
    // ======================================

    const quantidadeCaracteres =
        [...senha].length;

    const entropia =
        quantidadeCaracteres *
        Math.log2(tamanhoAlfabeto);


    // ======================================
    // SENHA FRACA
    // ======================================

    if (entropia < 35) {

        forcaSenha.classList.add(
            'fraca'
        );

        textoForca.textContent =
            'Fraca';

        textoForca.classList.add(
            'texto-fraca'
        );
    }


    // ======================================
    // SENHA MÉDIA
    // ======================================

    else if (entropia < 57) {

        forcaSenha.classList.add(
            'media'
        );

        textoForca.textContent =
            'Média';

        textoForca.classList.add(
            'texto-media'
        );
    }


    // ======================================
    // SENHA FORTE
    // ======================================

    else {

        forcaSenha.classList.add(
            'forte'
        );

        textoForca.textContent =
            'Forte';

        textoForca.classList.add(
            'texto-forte'
        );
    }
}


// ==========================================
// 12. CHECKBOXES
// ==========================================

const checkboxes = document.querySelectorAll(
    '.parametro-senha__checkbox, .opcoes-extras .checkbox'
);

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        'change',
        geraSenha
    );

});


// ==========================================
// 13. BOTÃO GERAR
// ==========================================

botaoGerar.addEventListener(
    'click',
    geraSenha
);


// ==========================================
// 14. COPIAR SENHA
// ==========================================

botaoCopiar.addEventListener(
    'click',
    async () => {

        const senha = campoSenha.value;


        if (!senha) {

            mensagemCopia.textContent =
                'Não existe uma senha para copiar.';

            return;
        }


        try {

            await navigator.clipboard.writeText(
                senha
            );

            mensagemCopia.textContent =
                'Senha copiada para a área de transferência!';

        } catch (erro) {

            // Alternativa para navegadores
            // que bloqueiam Clipboard API.

            campoSenha.select();

            document.execCommand(
                'copy'
            );

            mensagemCopia.textContent =
                'Senha copiada!';
        }


        setTimeout(() => {

            mensagemCopia.textContent = '';

        }, 2500);

    }
);


// ==========================================
// 15. PRIMEIRA SENHA
// ==========================================

geraSenha();
