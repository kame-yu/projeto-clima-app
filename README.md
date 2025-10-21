🌦️ Clima Agora

Um aplicativo web simples e elegante para consultar o clima atual de cidades ao redor do mundo, utilizando a API gratuita e de código aberto Open-Meteo.

📖 Sobre o Projeto

Clima Agora é uma aplicação de página única (SPA) criada com HTML, CSS e JavaScript puros ("Vanilla JS"). O objetivo é fornecer uma forma rápida e visualmente agradável de obter informações meteorológicas, consumindo diretamente as APIs do Open-Meteo sem a necessidade de chaves ou bibliotecas externas.

O design foi pensado para ser limpo e intuitivo, com um tema noturno que se adapta bem a diferentes dispositivos, desde desktops a smartphones.

✨ Funcionalidades

Busca por Cidade: Encontre facilmente a previsão do tempo para qualquer cidade.

Design Moderno: Interface com tema noturno "céu estrelado", com foco na legibilidade e experiência do usuário.

Responsivo: Funciona perfeitamente em desktops, tablets e smartphones.

Informações Detalhadas: Exibe a temperatura atual, máxima e mínima, uma descrição do tempo com ícone e o código WMO correspondente.

Busca via URL: Carregue o clima de uma cidade diretamente através de um link, usando o parâmetro ?city=.

🚀 Começando

Este projeto é um único arquivo auto-contido. Para executá-lo, você só precisa de um navegador web.

Faça o download do arquivo weather_app.html.

Abra o arquivo em seu navegador de preferência (Google Chrome, Firefox, etc.).

Pronto! O aplicativo estará funcionando.

💡 Como Usar

No campo "Digite uma cidade", insira o nome da localidade que deseja consultar.

Clique no botão "Buscar" ou pressione Enter.

As informações do clima aparecerão em um card de resultado.

Dica Pro: Você pode compartilhar a previsão do tempo de uma cidade específica adicionando ?city=NOME_DA_CIDADE ao final da URL.

Exemplo: .../weather_app.html?city=Fortaleza

🛠️ Tecnologias Utilizadas

HTML5

CSS3 (com Variáveis CSS para fácil customização do tema)

JavaScript (ES6+) (Vanilla JS, sem frameworks)

Fetch API (para realizar as chamadas às APIs externas)

APIs do Open-Meteo:

Geocoding API (para converter nomes de cidades em coordenadas)

Weather Forecast API (para obter os dados do clima)
