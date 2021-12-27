let body_text = document.body.innerText.split('\n');
let posicao = 0;

console.log("Conteudo do Body ", body_text)

const artyom = new Artyom();
window.onload = function startContinuousArtyom() {
    artyom.initialize({
        lang: "pt-BR",
        continuous: true,
        executionKeyword: "Tina",
        debug: true,
        mode: "normal",
        soundex: true,
        listen: true
    }).then(function () {
        artyom.say("Carregando arquivos.");
        artyom.say("TINA Inicializada com sucesso", artyom.getVoices());

        var currentTime = new Date();
        var hours = currentTime.getHours();
        if ((hours >= 0 && hours < 4) || (hours >= 18 && hours <= 23)) {
            artyom.say("Boa noite Senhor! Em que posso ajudar?");
        } else if (hours >= 4 && hours < 12) {
            artyom.say("Bom dia Senhor! Em que posso ajudar?");
        } else if (hours >= 12 && hours < 18) {
            artyom.say("Boa tarde Senhor! Em que posso ajudar?");
        }

    });


    artyom.on(['reiniciar *'], true).then(function (i, wildcard) {
        if (wildcard == "sistema") {
            artyom.say("Reiniciando sistema.", {
                onStart: function (i) {
                    window.location.reload();
                }
            });
        }
        if (wildcard == "memória") {
            artyom.say("Reiniciando Memória.", {
                onStart: function (i) {
                    artyom.restart();
                }
            });
        }
    });
    artyom.on(['iniciar *'], true).then(function (i, wildcard) {
        artyom.say("Tudo bem!");
        console.log("Iniciando");
        if (wildcard == "sistema") {
            artyom.say("Iniciar sistema.", {
                onStart: function (i) {
                    window.location.reload();
                }
            });
        }
        if (wildcard == "memória") {
            artyom.say("Iniciar Memória.", {
                onStart: function (i) {
                    artyom.restart();
                }
            });
        }
    });


    artyom.addCommands([
        {
            indexes: ["em silêncio"],
            action: function (i) {
                artyom.say("Desculpe!", {
                    onStart: function (i) {
                        artyom.shutUp();
                    }
                });
            }
        },
        {
            indexes: ["calada", "silêncio", "cale", "silencio", "stop"],
            action: function (i) {
                artyom.shutUp();
            }
        },
        {
            indexes: ["Obrigado"],
            action: function (i) {
                artyom.say("De Nada!");
            }
        },
        {
            indexes: ["Tudo bem"],
            action: function (i) {
                artyom.say("Estou muito bem e voce!");
            }
        }
    ]);

    //Comando para subir e descer, ir a esquerda e a direita
    artyom.addCommands([
        {
            indexes: ["Descer", "Para baixo", "Ir para baixo"],
            action: function (i) {
                console.log(document.body.offsetHeight, document.body.scrollHeight, document.documentElement.scrollHeight);
                artyom.say("Descendo", {
                    onStart: function (i) {
                        // artyom.shutUp();

                        window.scrollBy(0, 400)
                    }
                });
            }
        },
        {
            indexes: ["Subir", "Pra cima", "Para cima"],
            action: function (i) {
                console.log(document.body.offsetHeight, document.body.scrollHeight);
                artyom.say("Subindo", {
                    onStart: function (i) {
                        window.scrollBy(0, -400)
                    }
                });
            }
        },
        {
            indexes: ["Esquerda", "Pra esquerda", "Para esquerda"],
            action: function (i) {
                console.log(document.body.offsetHeight, document.body.scrollHeight);
                artyom.say("Indo para esquerda", {
                    onStart: function (i) {
                        window.scrollBy(0, -100)
                    }
                });
            }
        },
        {
            indexes: ["Direita", "Pra direita", "Para direita"],
            action: function (i) {
                console.log(document.body.offsetHeight, document.body.scrollHeight);
                artyom.say("Indo para direita", {
                    onStart: function (i) {
                        window.scrollBy(0, 100)
                    }
                });
            }
        },

    ]);



    // Comandos Saudação
    artyom.addCommands([
        {
            indexes: ["Bom dia", "Boa tarde", "Boa noite", "TINA está aí", "está aí TINA", "você me ouve", "bom dia TINA", "TINA dom dia", "boa tarde TINA", "TINA boa tarde", "boa noite TINA", "TINA boa noite"],
            action: function (i) {
                var currentTime = new Date();
                var hours = currentTime.getHours();
                if ((hours >= 0 && hours < 4) || (hours >= 18 && hours <= 23)) {
                    artyom.say("Boa noite Senhor! Em que posso ajudar?");
                } else if (hours >= 4 && hours < 12) {
                    artyom.say("Bom dia Senhor! Em que posso ajudar?");
                } else if (hours >= 12 && hours < 18) {
                    artyom.say("Boa tarde Senhor! Em que posso ajudar?");
                }
            }
        }
    ]);

    //Comandon para ler conteudon da pagina
    artyom.addCommands([
        {
            indexes: ["ler", "ler conteudo", "ler conteúdo"],
            action: function (i) {
                console.log(body_text)
                console.log(body_text.length);

                lerConteudo(0)



            }
        }
    ]);

    //Comandon ler o ultimo conteudo
    artyom.addCommands([
        {
            indexes: ["continue a leitura", "leia de novo", "ler d novo", "ler novamente", "repetir a leitura"],
            action: function (i) {
                artyom.repeatLastSay();
            }
        }
    ]);

    // Comandos Abrir Janelas


    artyom.on(['abrir *'], true).then(function (i, wildcard) {
        if (wildcard == "facebook") {
            abrirExterno = window.open("https://www.facebook.com", "popup");
        }
        if (wildcard == "e-mail") {
            abrirExterno = window.open("https://www.gmail.com", "popup");
        }
        if (wildcard == "gmail") {
            abrirExterno = window.open("https://www.gmail.com", "popup");
        }
        if (wildcard == "menu") {
            document.getElementById("menu-open").checked = true;
            $(".menu").css("display", "block");
        }
        if (wildcard == "opções") {
            document.getElementById("menu-open").checked = true;
            $(".menu").css("display", "block");
        }
        if (wildcard == "clima") {
            document.getElementById("contentModal_Clima").checked = true;
            $("#contentModal_Clima").trigger("click");
            $("#button_clima").click();
        }
    });

    artyom.on(['executar *'], true).then(function (i, wildcard) {
        if (wildcard == "teste 1") {
            document.getElementById("contentModal_Clima").checked = true;
            $("#contentModal_Clima").trigger("click");
        }
        if (wildcard == "teste 2") {
            document.getElementById("button_navegacao").checked = true;
            $("#button_navegacao").trigger("click");

        }
    });




    // Comandos Fechar Janelas
    artyom.on(['fechar *'], true).then(function (i, wildcard) {
        if (wildcard == "tudo") {
            document.getElementById("menu-open").checked = false;
            $(".menu").css("display", "none");
            $("#button_fechar_modal").trigger("click");
            abrirExterno.close();
        }
        if (wildcard == "janela") {
            $("#button_fechar_modal").click();
            abrirExterno.close();
        }
        if (wildcard == "facebook") {
            abrirExterno.close();
        }
        if (wildcard == "e-mail") {
            abrirExterno.close();
        }
        if (wildcard == "gmail") {
            abrirExterno.close();
        }
        if (wildcard == "menu") {
            document.getElementById("menu-open").checked = false;
            $(".menu").css("display", "none");
            $("#button_fechar_modal").click();
        }
        if (wildcard == "opções") {
            document.getElementById("menu-open").checked = false;
            $(".menu").css("display", "none");
        }
        if (wildcard == "teste") {
            $("#button_fechar_modal").trigger("click");
        }

    });



    //Comandos Horario (gerar um comando Abrir Calendario aqui)
    artyom.addCommands([
        {
            indexes: ["que horas são"],
            action: function (i) {
                date = new Date();
                horas = date.getHours();
                minutos = date.getMinutes();
                artyom.say("Agora são" + horas + " horas e " + minutos + " minutos ");
            }
        },
        {
            indexes: ["qual a data", "me informe a data"],
            action: function (i) {
                date = new Date();
                data = date.getDate();
                mes = date.getMonth();
                ano = date.getFullYear();
                artyom.say("Dia" + data + '/' + mes + '/' + ano);
            }
        },
        {
            indexes: ["qual o dia", "que dia é hoje"],
            action: function (i) {
                date = new Date();
                data = date.getDate();
                artyom.say("Dia" + data);
            }
        },
        {
            indexes: ["qual o ano", "qual ano", "que ano estamos"],
            action: function (i) {
                date = new Date();
                ano = date.getFullYear();
                artyom.say("Estamos no ano de " + ano);
            }
        },
        {
            indexes: ["qual o dia da semana", "qual dia da semana", "que dia da semana"],
            action: function (i) {
                date = new Date();
                semana = new Array('domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado');
                artyom.say("Hoje é " + semana[date.getDay()]);
            }
        }
    ]);
    //Repetir Comandos
    artyom.on(['Repita comigo *'], true).then(function (i, wildcard) {
        artyom.say("Você disse : " + wildcard);
    });


    //Comando protocolos inteligente
    artyom.on(['protocolo *'], true).then(function (i, wildcard) {
        if (wildcard == "11") {
            artyom.say("Executando protocolo 11");
            artyom.say("Reiniciando sistema.", {
                onStart: function (i) {
                    window.location.reload();
                }
            });
        } else if (wildcard == "13") {
            artyom.say("Executando protocolo 13");
        } else if (wildcard == "2508") {
            artyom.say("Executando protocolo 2 5 0 8");
        }

    });
};


function lerConteudo(posicao) {
    if (body_text[posicao].trim() != "") {
        artyom.say(body_text[posicao],
            {
                onStart: function () {
                    setTimeout(function () {
                        // Allow to process commands again
                        console.log("On Start reeding");
                        artyom.obey();
                        // artyom.shutUp();
                    }, 2000);// wait 2 seconds
                },
                onEnd: function () {
                    posicao = posicao + 1
                    if (posicao <= body_text.length) {
                        lerConteudo(posicao)
                    }
                }
            });
    }
    else {
        posicao = posicao + 1
        if (posicao <= body_text.length) {
            lerConteudo(posicao)
        }
    }

}

