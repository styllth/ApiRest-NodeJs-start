# ApiRest-NodeJs-start
Criando uma base para uma API REST com NodeJS, Express, Nodemailer e MongoDB.

# Funcionalidades
- Autentificação
- Recuperação de senha com NodeMailer
- CRUD e relacionamentos com MongoDB

# API
O acrônimo API que provém do inglês Application Programming Interface (Em português, significa Interface de Programação de Aplicações), 
trata-se de um conjunto de rotinas e padrões estabelecidos e documentados por uma aplicação A, para que outras aplicações consigam utilizar 
as funcionalidades desta aplicação A, sem precisar conhecer detalhes da implementação do software. 
Desta forma, entende-se que as APIs permitem uma interoperabilidade entre aplicações. Em outras palavras, a comunicação entre aplicações e 
entre os usuários.

# NODEJS
Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis. Node.js usa um modelo de I/O direcionada a evento não bloqueante que o torna leve e eficiente, ideal para aplicações em tempo real com troca intensa de dados através de dispositivos distribuídos.

# REST & RESTFUL
**REST:** conjunto de princípios de arquitetura, sua sigla significa Representational State Transfer. Em português, Transferência de Estado 
Representacional. Trata-se de uma abstração da arquitetura da Web. Resumidamente, o REST consiste em princípios/regras/constraints que, 
quando seguidas, permitem a criação de um projeto com interfaces bem definidas. Desta forma, permitindo, por exemplo, que aplicações 
se comuniquem.

**RESTful:** a diferença das duas é apenas gramatical, em outras palavras, sistemas que utilizam os princípios REST são chamados de RESTful.
Resumindo, RESTful é a capacidade de determinado sistema aplicar os princípios de REST.

# Install

- $ yarn
- $ cp src/config/mail.json.example src/config/mail.json
- $ php artisan key:generate
- $ php artisan migrate
- $ php artisan passport:install

