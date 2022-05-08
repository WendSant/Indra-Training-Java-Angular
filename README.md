# **SOBRE O QUE É O PROJETO?**

O objetivo do projeto é servir de base para o treinamento de "Formação Java/Angular para Jovens Profissionais", da Indra, unidade de João Pessoa

**Conteúdo do Treinamento**

- Java
- Git
- Api (Rest)
- Web service SOAP
- Conceitos de View (JSP/JSF)

<div align="center">
    
    
    
<h2>Tela inicial</h2>
 
![telaInicial](https://user-images.githubusercontent.com/79418546/167302133-6a2bcac4-72da-4890-92ca-3638acccfe28.png)

</div>

# **COMO CONSTRUIR O AMBIENTE**

Baixar e instalar o Lombok na sua IDE em https://projectlombok.org/download.
Acessar o diretório onde o lombok.jar foi baixado e executar no terminal: java -jar lombok.jar.
Na janela de instalação, especificar o caminho onde se encontra sua IDE e concluir a instalação.

Caso não consiga instalar através da interface, copiar o lombok.jar para o diretório do eclipse e editar o arquivo eclipse.ini e incluir a linha abaixo no final do arquivo:

-javaagent:/DIRETÓRIO_QUE_VOCE_COPIOU_O_LOMBOK.JAR/lombok.jar

**Back-End**

    Primeiramente deve-se clonar o repositório no endereço:

    https://github.com/WendSant/Indra-Training-Java-Angular



    Após o projeto ser clonado, abra o terminal no diretório clonado **treinamento**
    e utilize os seguintes comandos:


    mvn install
    Acesse o diretorio /treinamento/controller/target
    E rode esse comando: java -jar treinamento.war(Caso este não funciona, execute o treinamento-spring-boot.war)

**É de suma importância aguardar a execução dos comandos acima citados.**

Para acesso à sua API desenvolvida, utilize o endereço: http://localhost:8080/treinamento

**Front-End**


    Após o projeto ser clonado, abra o terminal no diretório **treinamento/agencia-angular**
    e utilize os seguintes comandos:


    npm install
    ng build
    ng s
========================================================================
Para acesso o projeto angular utilize o seguinte endereço: http://localhost:4200

# Voce pode desenvolver utilizando os recursos abaixo:

- Java 11
- Maven

# Banco de dados

    Como acessar o client do MySQL: Configure um banco local nas configurações da aplicação
    Procure pelo arquivo application.yml, nele procure o trecho de endereço do banco de dados
    Exemplo utilizando Vertrigo:
    primary:
        datasource:
            driverClassName: com.mysql.cj.jdbc.Driver
            jdbcUrl: jdbc:mysql://127.0.0.1/treinamentoindra?useTimezone=true&serverTimezone=UTC
            username: root
            password: vertrigo
