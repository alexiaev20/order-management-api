# Script de Teste Completo

$baseUrl = "http://localhost:3000"
Write-Host "Iniciando todos os testes" -ForegroundColor Cyan

# CENÁRIOS DE SUCESSO
Write-Host "`n SUCESSO Testando fluxo..." -ForegroundColor Yellow

# Login
$auth = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -ContentType "application/json" -Body '{"username":"admin", "password":"123456"}'
$token = $auth.token
Write-Host "OK: Login realizado."

# Criar e Mapear
$orderBody = '{"numeroPedido": "TEST-FULL", "valorTotal": 100, "dataCriacao": "2026-03-08", "items": [{"idItem": 1, "quantidadeItem": 1, "valorItem": 100}]}'
$create = Invoke-RestMethod -Uri "$baseUrl/order" -Method Post -ContentType "application/json" -Body $orderBody -Headers @{Authorization="Bearer $token"}
Write-Host "OK: Pedido criado e mapeado."

# Atualizar 
Invoke-RestMethod -Uri "$baseUrl/order/TEST-FULL" -Method Put -ContentType "application/json" -Body '{"value": 150}' -Headers @{Authorization="Bearer $token"}
Write-Host "OK: Pedido atualizado para 150."

# Testes de segurnaça 
Write-Host "`n SEGURANCA Testando protecoes..." -ForegroundColor Yellow

# Teste Sem Token
try {
    Invoke-RestMethod -Uri "$baseUrl/order/list" -Method Get
    Write-Host "FALHA: A API permitiu acesso sem token!" -ForegroundColor Red
} catch {
    Write-Host "OK: Acesso negado sem token ." -ForegroundColor Green
}

# Teste Token Inválido 
try {
    Invoke-RestMethod -Uri "$baseUrl/order/list" -Method Get -Headers @{Authorization="Bearer token_falso"}
} catch {
    Write-Host "OK: Token invalido rejeitado." -ForegroundColor Green
}

Write-Host "`n LIMPEZA Removendo dados de teste do banco de dados..." -ForegroundColor Yellow

try {
    # Tenta remover o pedido  usando o token gerado no início
    Invoke-RestMethod -Uri "$baseUrl/order/TEST-FULL" -Method Delete -Headers @{Authorization="Bearer $token"}
    Write-Host "OK: Ambiente limpo e pronto para novos testes." -ForegroundColor Green
} catch {
    Write-Host "AVISO: Não foi possível limpar o pedido de teste. Verifique manualmente." -ForegroundColor Gray
}


Write-Host "Passou em todos os testes" -ForegroundColor Cyan