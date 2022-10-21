const body = document.querySelector('body');
const rotaMidias = './Midias/';
let corPrincipal = '';

function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readJsonFile("options.json", function (text) {
    const data = JSON.parse(text);
    corPrincipal = data.cor_principal;

    changePageTitle(data.nome);
    changePageIcon(data.icone);
    changePageLogo(data.logo);

    createBotaoFlutuante(data.botao_flutuante);
    createMenuItem(data.menu);
    createSecao1(data.secao1);
    createSecao2(data.secao2);
    createSecao3(data.secao3);
    createSecao4(data.secao4);
    createSecao5(data.secao5);
    createRodape(data.menu);

    document.addEventListener('scroll', scrollAnimations);
    createHoverEffects();
});

function changePageTitle(data) {
    let title = document.querySelector('title');
    title.innerHTML = data;
}

function changePageIcon(data) {
    let icon = document.querySelector('#page-icon');
    icon.href = rotaMidias + data
}

function changePageLogo(data) {
    let logo = document.getElementById('logo-img');
    logo.src = rotaMidias + data;
}

function createBotaoFlutuante(data) {
    let botao_flutuante = document.createElement('a');
    botao_flutuante.id = 'botao-flutuante';
    botao_flutuante.href = data.link;
    botao_flutuante.style.backgroundColor = corPrincipal;
    if (data.exibir == false) {
        botao_flutuante.classList.add('hide');
    }

    let icon = document.createElement('i');
    icon.classList.add(data.icone.tipo);
    icon.classList.add(data.icone.nome);

    let text = document.createElement('p');
    text.innerHTML = data.texto;

    botao_flutuante.append(icon);
    botao_flutuante.append(text);
    body.appendChild(botao_flutuante);
}

function createMenuItem(data) {
    let menuUl = document.getElementById('menu-ul');
    data.forEach(el => {
        let menuLi = document.createElement('li');
        let menuLink = document.createElement('a');
        menuLink.classList.add('header-link');
        if (el.tem_destaque == true) {
            menuLi.classList.add('header-link-destaque');
            menuLi.style.borderColor = corPrincipal;
            menuLink.style.color = corPrincipal;
        }
        menuLink.href = el.link;
        menuLink.text = el.texto;

        menuLi.appendChild(menuLink);
        menuUl.appendChild(menuLi);
    });
}

function createSecao1(data) {
    let section = document.createElement('section');
    section.id = 'secao1';

    let div = document.createElement('div');

    let title = document.createElement('h1');
    title.innerHTML = data.texto;

    let link = document.createElement('a');
    link.href = data.link_botao;
    link.text = data.texto_botao;
    link.id = 'secao1-button';

    let video = document.getElementById('secao1-video');
    let img = document.getElementById('secao1-img');

    div.appendChild(title);
    div.appendChild(link);
    div.appendChild(img);
    section.appendChild(video);
    section.appendChild(div);
    body.appendChild(section);
}

function createSecao2(data) {
    let section = document.createElement('section');
    section.id = 'secao2';

    let divLeft = document.createElement('div');
    divLeft.classList.add('flex');
    divLeft.classList.add('column');

    let title = document.createElement('h2');
    title.innerHTML = data.titulo;
    title.style.color = corPrincipal

    let description = document.createElement('p');
    description.innerHTML = data.texto;

    let imagem = document.createElement('img');
    imagem.src = rotaMidias + data.imagem;

    divLeft.appendChild(title);
    divLeft.appendChild(description);
    section.appendChild(divLeft);
    section.appendChild(imagem);
    body.appendChild(section);
}

function createSecao3(data) {
    let section = document.createElement('section');
    section.id = 'secao3';
    let subtitle = document.createElement('h2');
    subtitle.innerHTML = data.titulo;
    subtitle.style.color = corPrincipal;

    let divFlex = document.createElement('div');
    divFlex.classList.add('flex');
    divFlex.classList.add('wrap');
    divFlex.style.justifyContent = "center";

    data.itens.forEach(el => {
        let div = document.createElement('div');
        div.classList.add('flex');
        div.classList.add('column');
        div.id = 'div-card';

        let divBackground = document.createElement('div');
        divBackground.id = 'background-div-i';

        let icon = document.createElement('i');
        icon.classList.add(el.icone.tipo);
        icon.classList.add(el.icone.nome);

        let title = document.createElement('h3');
        title.innerHTML = el.titulo

        let description = document.createElement('p');
        description.innerHTML = el.texto;

        divBackground.appendChild(icon);
        div.appendChild(divBackground);
        div.appendChild(title);
        div.appendChild(description);
        divFlex.appendChild(div);
    });

    section.appendChild(subtitle);
    section.appendChild(divFlex);
    body.appendChild(section);
}

function createSecao4(data) {
    let section = document.createElement('section');
    section.id = 'secao4';

    let title = document.createElement('h2');
    title.innerHTML = data.titulo;
    title.style.color = corPrincipal

    let description = document.createElement('p');
    description.innerHTML = data.subtitulo;

    let form = document.getElementById('secao4-formulario');

    let formButton = document.getElementById('secao4-button');
    formButton.style.background = corPrincipal;

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(form);
    body.appendChild(section);
}

function createSecao5(data) {
    let section = document.createElement('section');
    section.id = 'secao5';
    section.classList.add('flex');
    section.classList.add('column');
    section.style.backgroundColor = corPrincipal;

    let nomeSecao = document.createElement('h2');
    nomeSecao.innerHTML = 'LOCALIZAÇÃO'
    section.appendChild(nomeSecao);

    let div = document.createElement('div');
    div.classList.add('flex');
    div.id = 'secao5-div-contato';

    let contato = document.createElement('div');
    contato.id = 'secao5-contato';
    contato.classList.add('flex');
    contato.classList.add('column');

    let contatoNome = document.createElement('p');
    contatoNome.innerHTML = data.nome;
    contatoNome.id = 'secao5-contato-nome';
    contatoNome.style.color = '#ffffffe5';
    contato.appendChild(contatoNome);

    let contatoEndereco = document.createElement('p');
    contatoEndereco.innerHTML = data.endereco;
    contatoEndereco.id = 'secao5-contato-endereco';
    contatoEndereco.style.color = '#ffffffe5';
    contato.appendChild(contatoEndereco);

    let contatoTelefones = document.createElement('p');
    contatoTelefones.innerHTML = data.telefones;
    contatoTelefones.id = 'secao5-contato-telefones';
    contatoTelefones.style.color = '#ffffffe5';
    contato.appendChild(contatoTelefones);

    let contatoEmails = document.createElement('p');
    contatoEmails.innerHTML = data.emails;
    contatoEmails.id = 'secao5-contato-emails';
    contatoEmails.style.color = '#ffffffe5';
    contato.appendChild(contatoEmails);

    let contatoHorario = document.createElement('p');
    contatoHorario.innerHTML = data.horario_atendimento;
    contatoHorario.id = 'secao5-contato-horario';
    contatoHorario.style.color = corPrincipal;
    contato.appendChild(contatoHorario);

    let divSocial = document.createElement('div');
    divSocial.classList.add('flex');

    let instagramLink = document.createElement('a');
    instagramLink.href = data.instagram;
    instagramLink.id = 'link-instagram';
    instagramLink.classList.add('rede-social');

    let instagramImg = document.createElement('img');
    instagramImg.src = rotaMidias + "icon-instagram.png";
    instagramLink.appendChild(instagramImg);
    divSocial.appendChild(instagramLink);

    let facebookLink = document.createElement('a');
    facebookLink.href = data.facebook;
    facebookLink.id = 'link-facebook';
    facebookLink.classList.add('rede-social');

    let facebookImg = document.createElement('img');
    facebookImg.src = rotaMidias + "icon-facebook.png";
    facebookLink.appendChild(facebookImg);
    divSocial.appendChild(facebookLink);

    let whatsappLink = document.createElement('a');
    whatsappLink.href = data.whatsapp;
    whatsappLink.id = 'link-whatsapp';
    whatsappLink.classList.add('rede-social');

    let whatsappImg = document.createElement('img');
    whatsappImg.src = rotaMidias + "icon-whatsapp.png";
    whatsappLink.appendChild(whatsappImg);
    divSocial.appendChild(whatsappLink);

    let localizacao = document.createElement('div');
    localizacao.id = 'secao5-localizacao';

    let mapa = document.querySelector('#mapa');
    mapa.src = data.localizacao;
    localizacao.appendChild(mapa);

    contato.appendChild(divSocial);
    div.appendChild(contato);
    div.appendChild(localizacao);
    section.appendChild(div);
    body.appendChild(section);
}

function createRodape(data) {
    let rodape = document.createElement('footer');
    rodape.classList.add('flex');
    rodape.style.backgroundColor = corPrincipal;

    let menu = document.createElement('div');
    data.forEach(el => {
        let menuLink = document.createElement('a');
        menuLink.href = el.link;
        menuLink.text = el.texto;
        menu.appendChild(menuLink);
    });
    rodape.appendChild(menu);

    let div = document.createElement('div');
    div.classList.add('flex');

    let powered = document.createElement('small');
    powered.innerHTML = 'Powered by ';

    let destacar = document.createElement('small');
    destacar.innerHTML = " Superlógica Condomínios - Sistema para Condomínios";

    
    div.appendChild(powered);
    div.appendChild(destacar);
    rodape.appendChild(div)
    body.appendChild(rodape);
}

// Animações de scroll
function scrollAnimations() {
    let position = window.pageYOffset;
    // Animação do menu
    const menu = document.querySelector('header');
    const menuLogo = menu.children[0];
    const menuLinks = menu.children[1];

    if (position > 395) {
        menu.classList.add('hide-menu');
        menuLogo.classList.add('hide-menu-content');
        menuLinks.classList.add('hide-menu-content');

    }
    if (position < 100) {
        menu.classList.remove('hide-menu');
        menuLogo.classList.remove('hide-menu-content');
        menuLinks.classList.remove('hide-menu-content');
    }
}

// Animações de hover
function createHoverEffects() {
    // Botão com destaque do menu
    const headerLinkDestaque = document.querySelector('.header-link-destaque');
    headerLinkDestaque.addEventListener('mouseenter', () => {
        headerLinkDestaque.style.backgroundColor = corPrincipal;
        headerLinkDestaque.children[0].style.color = 'white';
    })
    headerLinkDestaque.addEventListener('mouseleave', () => {
        headerLinkDestaque.style.backgroundColor = 'white';
        headerLinkDestaque.children[0].style.color = corPrincipal;
    });

    // Botões sem destaque do menu
    const headerLink = document.querySelectorAll('.header-link');
    headerLink.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.borderColor = 'gray';
        })
        el.addEventListener('mouseleave', () => {
            el.style.borderColor = 'transparent';
        });
    });

    //Botão secao1
    const secao1Button = document.getElementById('secao1-button');

    secao1Button.addEventListener('mouseenter', () => {
        secao1Button.style.border = '1px solid ' + corPrincipal;
        secao1Button.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        secao1Button.style.color = corPrincipal;
    })
    secao1Button.addEventListener('mouseleave', () => {
        secao1Button.style.border = '1px solid white';
        secao1Button.style.backgroundColor = 'transparent';
        secao1Button.style.color = 'white';
    });

    //Botão secao4
    const secao4Button = document.getElementById('secao4-button');

    secao4Button.addEventListener('mouseenter', () => {
        secao4Button.style.background = corPrincipal + 'ce';
    })
    secao4Button.addEventListener('mouseleave', () => {
        secao4Button.style.background = corPrincipal;
    });
}

