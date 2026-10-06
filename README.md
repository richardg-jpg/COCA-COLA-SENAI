# 🥤 Rodízio da Coca

Aplicação web simples para organizar o rodízio de quem paga a Coca-Cola do almoço nos dias de aula (terças e quintas) no SENAI.

Surgiu de um problema real da turma: 6 pessoas, 2 dias por semana, e ninguém lembrava de quem era a vez.

## Funcionalidades

- Mostra **quem paga hoje**, com nome, foto e data da vez
- Botão **"Já pagou"**: passa a vez e pula automaticamente para a próxima terça ou quinta
- Botão **"Desfazer"** para corrigir um clique errado
- Lista dos **próximos 12 dias de aula** e histórico de quem pagou por último
- **Foto de perfil** fixa de cada pessoa, carregada da pasta `assets/fotos/` (sempre as mesmas ao abrir)
- Opção para **ajustar a ordem** do rodízio
- Visual de Coca-Cola gelada com bolhas animadas, gotas de condensação e efeito de vidro fosco
- Os dados ficam salvos no navegador (`localStorage`), sem servidor e sem cadastro

## Tecnologias

HTML, CSS e JavaScript puro, sem frameworks e sem dependências.

## Como usar

Basta abrir o `index.html` no navegador.

## Publicar no GitHub Pages

1. Envie o repositório para o GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`
4. Aguarde alguns minutos: o site fica em `https://SEU-USUARIO.github.io/rodizio-coca/`

## Personalizar

No arquivo `script.js`, edite no começo:

- `ALL`: lista de nomes na ordem do rodízio (o primeiro é quem paga na data inicial)
- `PHOTOS`: caminho da foto de cada pessoa (para trocar, substitua o arquivo em `assets/fotos/`, de preferência quadrado, uns 240 px)
- `COLORS`: cor usada quando a pessoa não tem foto
- `fresh()`: a data inicial do rodízio (`slot`, no formato `AAAA-MM-DD`; precisa ser uma terça ou quinta)

Para trocar os dias de aula, altere a verificação `getDay() !== 2 && getDay() !== 4` na função `nextDay` (0 = domingo, 2 = terça, 4 = quinta).

## Estrutura

```
rodizio-coca/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── garrafa.png
│   └── fotos/        (uma foto quadrada por pessoa)
├── LICENSE
└── README.md
```

## Limitações

Como tudo é salvo no navegador, os dados **não sincronizam entre aparelhos**. Cada celular mantém o seu próprio estado, então vale combinar uma pessoa só para marcar quem pagou.

## Ideias para o futuro

- Sincronizar entre aparelhos com um backend simples (por exemplo Firebase ou Supabase)
- Registrar o valor gasto por pessoa
- Pular automaticamente feriados e dias sem aula

## Licença

MIT, veja o arquivo [LICENSE](LICENSE).
