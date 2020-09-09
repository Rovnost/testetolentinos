# Considerações:

Cheguei a atualizar algumas dependências do angular pra melhor funcionamento, então se mesmo você dando npm i não funcionar eu compartilho minha tela pra mostrar tudo.

Não fiz uso de componente detalhe pois usei modal (dialog), portanto usei o callback do dialogRef para a passagem de parametros entre os componentes. Só deixando claro que eu também sei fazer com componente detalhe usando o @Input e @Outuput, mas optei pelo modal.

A maioria dos objetos que já estavam no db.json podem bugar nas horas das ações pois eles não haviam todos os atributos. Portanto, recomendo criar novas coisas pra fazer os testes.

BUGS: não é sempre que está rolando mudança dos valores de forma reativa, tem hora que dá e hora que não, creio que tem haver com o json-server , não cheguei a fazer tratamentos. O carrinho tá com um bug no somatório do valor, ao adicionar mais de um produto no carrinho só é acrescentado o valor do último na conta final.

## Tela gestão usuários

Tudo foi feito: Listar usuários, cadastrar usuários, alterar usuários e excluir usuários.

## Tela gestão categorias

Tudo foi feito: Listar categorias, cadastrar categorias, alterar categorias e excluir categorias.

## Tela gestão produtos

Tudo foi feito: Listar produtos, cadastrar produtos, alterar produtos, excluir produtos e permitir incluir os produtos no carrinho de compras.

## Tela de carrinho de compras

Foi feito: Permitir pesquisar e incluir um produto no carrinho de compras via id ou nome no mesmo campo, Permitir alterar quantidade de um produto, Exibir valor unitário do produto, Exibir valor total do produto. (Produto * quantidade), Exibir valor total da compra.

Não foi feito: permitir realizar compras.

## Tela de carrinho de compras

Não foi feito nada.

## Home page

Foi feito: Incluir um Card que informe a quantidade total de Usuários cadastrados.

Não foi feito: Incluir um Card que informe o valor total das vendas realizadas no dia atual, Incluir um Gráfico que informe o valor total das vendas diárias do mês no mês atual.

## Validação usuários

Tudo foi feito: Realizar a validação dos campos obrigatórios, Realizar a validação do CPF do usuário, Não permitir a inclusão de e-mails iguais. 

## Validação categorias

Tudo foi feito: Realizar a validação dos campos obrigatórios, Não permitir categorias de nome repetido.

## Validação produtos

Tudo foi feito: Realizar a validação dos campos obrigatórios, O valor do produto deve ser maior que 0, Não permitir produtos de nome repetido, Deve ser gerado um código de barras para cada produto de acordo com o seu Id, Deve selecionar a categoria primeiro para poder listar os produtos.

## Tarefas extras

Não foi feito nada.
