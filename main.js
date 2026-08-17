// ==========================================
// GERADOR DE SENHAS
// ==========================================


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const campoSenha =
    document.querySelector('#campo-senha');

const numeroSenha =
    document.querySelector('#numero-senha');

const botaoDiminui =
    document.querySelector('#botao-diminui');

const botaoAumenta =
    document.querySelector('#botao-aumenta');

const botaoGerar =
    document.querySelector('#botao-gerar');

const botaoCopiar =
    document.querySelector('#botao-copiar');


// CHECKBOXES

const checkMaiusculas =
    document.querySelector('#maiusculas');

const checkMinusculas =
    document.querySelector('#minusculas');

const checkNumeros =
    document.querySelector('#numeros');

const checkSimbolos =
    document.querySelector('#simbolos');

const checkCarinha =
    document.querySelector('#check-carinha');

const checkAnimais =
    document.querySelector('#check-animais');

const checkUnicode =
    document.querySelector('#check-unicode');

const checkCidade =
    document.querySelector('#check-cidade');

const checkSemRepeticao =
    document.querySelector('#check-sem-repeticao');


// FORÇA

const barraForca =
    document.querySelector('#barra-forca');

const textoForca =
    document.querySelector('#texto-forca');


// OUTROS

const contadorCaracteres =
    document.querySelector('#contador-caracteres');

const mensagemErro =
    document.querySelector('#mensagem-erro');

const mensagemCopia =
    document.querySelector('#mensagem-copia');


// ==========================================
// CONFIGURAÇÕES
// ==========================================

let tamanhoSenha = 12;

const tamanhoMinimo = 4;
const tamanhoMaximo = 32;


// ==========================================
// CARACTERES
// ==========================================

const letrasMaiusculas =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas =
    'abcdefghijklmnopqrstuvwxyz';

const numeros =
    '0123456789';

const simbolos =
    '!@#$%&*?+-_=<>';


// ==========================================
// EMOJIS
// ==========================================

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


// ==========================================
// UNICODE
// ==========================================

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


// ==========================================
// CIDADES
// ==========================================

const cidades = [
    'Curitiba',
    'Cascavel',
    'Toledo',
    'Londrina',
    'Maringa',
    'Paranagua',
    'Pinhais',
    'Colombo'
];


// ==========================================
// MOSTRA O TAMANHO INICIAL
// ==========================================

numeroSenha.textContent =
    tamanhoSenha;


// ==========================================
// FUNÇÃO PARA ESCOLHER ALEATORIAMENTE
// ==========================================

function aleatorio(array) {

    const indice =
        Math.floor(
            Math.random() * array.length
        );

    return array[indice];
}


// ==========================================
// CRIA O ALFABETO
// ==========================================

function criarAlfabeto() {

    let alfabeto = [];


    // MAIÚSCULAS

    if (checkMaiusculas.checked) {

        alfabeto.push(
            ...letrasMaiusculas.split('')
        );
    }


    // MINÚSCULAS

    if (checkMinusculas.checked) {

        alfabeto.push(
            ...letrasMinusculas.split('')
        );
    }


    // NÚMEROS

    if (checkNumeros.checked) {

        alfabeto.push(
            ...numeros.split('')
        );
    }


    // SÍMBOLOS

    if (checkSimbolos.checked) {

        alfabeto.push(
            ...simbolos.split('')
        );
    }


    // CARINHAS

    if (checkCarinha.checked) {

        alfabeto.push(
            ...emojisCarinhas
        );
    }


    // ANIMAIS

    if (checkAnimais.checked) {

        alfabeto.push(
            ...emojisAnimais
        );
    }


    // UNICODE

    if (checkUnicode.checked) {

        alfabeto.push(
            ...unicodeEspecial
        );
    }


    return alfabeto;
}


// ==========================================
// GERAR SENHA
// ==========================================

function geraSenha() {

    mensagemErro.textContent = '';
    mensagemCopia.textContent = '';


    // Cria o alfabeto com as opções
    // selecionadas.

    let alfabeto =
        criarAlfabeto();


    // ======================================
    // NADA SELECIONADO
    // ======================================

    if (alfabeto.length === 0) {

        campoSenha.value = '';

        contadorCaracteres.textContent = '0';

        barraForca.className =
            'forca';

        textoForca.textContent =
            'Nenhum caractere selecionado';

        mensagemErro.textContent =
            'Selecione pelo menos uma opção.';

        return;
    }


    // ======================================
    // VERIFICA REPETIÇÃO
    // ======================================

    if (
        checkSemRepeticao.checked &&
        tamanhoSenha > alfabeto.length
    ) {

        campoSenha.value = '';

        contadorCaracteres.textContent = '0';

        barraForca.className =
            'forca';

        textoForca.textContent =
            'Não foi possível gerar';

        mensagemErro.textContent =
            'Você escolheu não repetir caracteres, mas o conjunto selecionado não possui caracteres suficientes.';

        return;
    }


    // ======================================
    // GERAÇÃO
    // ======================================

    let senhaArray = [];

    let caracteresDisponiveis = [
        ...alfabeto
    ];


    while (
        senhaArray.length < tamanhoSenha
    ) {

        const indice =
            Math.floor(
                Math.random() *
                caracteresDisponiveis.length
            );


        const caractere =
            caracteresDisponiveis[indice];


        senhaArray.push(
            caractere
        );


        // Se a opção "não repetir" estiver
        // marcada, remove o caractere.

        if (checkSemRepeticao.checked) {

            caracteresDisponiveis.splice(
                indice,
                1
            );
        }
    }


    // ======================================
    // TRANSFORMA ARRAY EM STRING
    // ======================================

    let senha =
        senhaArray.join('');


    // ======================================
    // CIDADE
    // ======================================

    if (checkCidade.checked) {

        const cidade =
            aleatorio(cidades);


        /*
         * A cidade entra na senha sem
         * ultrapassar o tamanho escolhido.
         */

        const cidadeDisponivel =
            cidade.substring(
                0,
                tamanhoSenha
            );


        const restante =
            tamanhoSenha -
            cidadeDisponivel.length;


        if (restante > 0) {

            let complemento =
                '';

            let alfabetoCidade =
                criarAlfabeto();


            while (
                complemento.length < restante
            ) {

                const indice =
                    Math.floor(
                        Math.random() *
                        alfabetoCidade.length
                    );


                const caractere =
                    alfabetoCidade[indice];


                if (
                    checkSemRepeticao.checked &&
                    cidadeDisponivel.includes(caractere)
                ) {
                    continue;
                }


                complemento +=
                    caractere;


                if (
                    checkSemRepeticao.checked
                ) {

                    alfabetoCidade.splice(
                        indice,
                        1
                    );
                }
            }


            senha =
                cidadeDisponivel +
                complemento;

        } else {

            senha =
                cidadeDisponivel;
        }
    }


    // ======================================
    // MOSTRA A SENHA
    // ======================================

    campoSenha.value =
        senha;


    // ======================================
    // CONTADOR
    // ======================================

    contadorCaracteres.textContent =
        [...senha].length;


    // ======================================
    // FORÇA
    // ======================================

    classificarForca(
        senha,
        alfabeto.length
    );
}


// ==========================================
// CLASSIFICAR FORÇA
// ==========================================

function classificarForca(
    senha,
    tamanhoAlfabeto
) {

    const quantidade =
        [...senha].length;


    let entropia =
        quantidade *
        Math.log2(
            tamanhoAlfabeto
        );


    // Remove classes antigas

    barraForca.className =
        'forca';


    // ======================================
    // FRACA
    // ======================================

    if (entropia < 35) {

        barraForca.classList.add(
            'fraca'
        );

        textoForca.textContent =
            'Senha fraca';
    }


    // ======================================
    // MÉDIA
    // ======================================

    else if (entropia < 57) {

        barraForca.classList.add(
            'media'
        );

        textoForca.textContent =
            'Senha média';
    }


    // ======================================
    // FORTE
    // ======================================

    else {

        barraForca.classList.add(
            'forte'
        );

        textoForca.textContent =
            'Senha forte';
    }
}


// ==========================================
// DIMINUIR TAMANHO
// ==========================================

botaoDiminui.addEventListener(
    'click',
    function () {

        if (
            tamanhoSenha >
            tamanhoMinimo
        ) {

            tamanhoSenha--;

            numeroSenha.textContent =
                tamanhoSenha;

            geraSenha();
        }

    }
);


// ==========================================
// AUMENTAR TAMANHO
// ==========================================

botaoAumenta.addEventListener(
    'click',
    function () {

        if (
            tamanhoSenha <
            tamanhoMaximo
        ) {

            tamanhoSenha++;

            numeroSenha.textContent =
                tamanhoSenha;

            geraSenha();
        }

    }
);


// ==========================================
// BOTÃO GERAR
// ==========================================

botaoGerar.addEventListener(
    'click',
    function () {

        geraSenha();

    }
);


// ==========================================
// CHECKBOXES
// ==========================================

const todosCheckboxes =
    document.querySelectorAll(
        '.checkbox'
    );


todosCheckboxes.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            'change',
            function () {

                geraSenha();

            }
        );

    }
);


// ==========================================
// COPIAR SENHA
// ==========================================

botaoCopiar.addEventListener(
    'click',
    async function () {

        const senha =
            campoSenha.value;


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
                '✓ Senha copiada!';

        } catch (erro) {

            campoSenha.select();

            document.execCommand(
                'copy'
            );

            mensagemCopia.textContent =
                '✓ Senha copiada!';
        }


        setTimeout(
            function () {

                mensagemCopia.textContent =
                    '';

            },
            2000
        );

    }
);


// ==========================================
// GERA A PRIMEIRA SENHA
// ==========================================

geraSenha();
