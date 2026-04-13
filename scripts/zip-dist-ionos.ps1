# ZIP du dossier dist pour upload IONOS (lancez apres npm run build ou npm run build:ionos)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..
if (-not (Test-Path "dist\index.html")) {
  Write-Host "ERREUR: dist/ absent. Lancez d'abord: npm run build"
  exit 1
}
$zip = Join-Path (Split-Path $PSScriptRoot -Parent) "kyrio-dist-ionos.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path "dist\*" -DestinationPath $zip -Force
Write-Host ""
Write-Host "OK: $zip"
Write-Host "Decompressez puis uploadez le CONTENU dans httpdocs (racine du site)."
