# 🔗 Encurtador de URL - Funcionalidades e Regras

Este projeto tem como objetivo oferecer um sistema completo de encurtamento de URLs com diversas funcionalidades avançadas, incluindo exportação de dados e controle de acessos.

---

## ✅ Funcionalidades Implementadas

### 📌 Criação de Links
- [x] Criar um novo link encurtado
  - [x] Validação de formato da URL encurtada
  - [x] Prevenção de duplicidade de URLs encurtadas

### ❌ Exclusão de Links
- [x] Deletar um link existente

### 🔍 Consulta e Acesso
- [x] Obter a URL original através de uma URL encurtada
- [x] Listar todas as URLs cadastradas
- [x] Incrementar automaticamente a contagem de acessos ao visitar um link

### 📤 Exportação em CSV
- [x] Exportar todos os links em um arquivo CSV
  - [x] Acesso ao CSV via CDN (ex: Amazon S3, Cloudflare R2)
  - [x] Geração de nome único e aleatório para o arquivo
  - [x] Listagem performática de dados
  - [x] Estrutura do CSV: URL original, URL encurtada, total de acessos, data de criação

---

## Docker

- [x] Construção de um `Dockerfile` seguindo boas práticas
- [x] Geração da imagem da aplicação via Docker

---

## 🛠️ Dicas Importantes

- ✅ Lembre-se de habilitar o **CORS** na aplicação.
---

## 📂 Exemplo de CSV
https://pub-f777ab9ac6c54f97bef8cc8cbba1fc69.r2.dev/downloads/19618a1a-95eb-4cd3-a137-a720405eae60-20250425T172717933Zlinksscsv.csv


## 🚀 Pronto para uso!
Todas as funcionalidades descritas acima já estão 100% implementadas ✅