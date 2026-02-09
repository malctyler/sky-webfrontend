#!/usr/bin/env powershell

param(
    [Parameter()]
    [ValidateSet("dev", "prod", "local")]
    [string]$Environment = "dev",
    
    [Parameter()]
    [switch]$Help,
    
    [Parameter()]
    [switch]$Status,

    [Parameter()]
    [switch]$Install
)

function Show-Help {
    Write-Host ""
    Write-Host "=== Sky Frontend Development Launcher ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\run-frontend.ps1 -Environment <env>     # Start development server"
    Write-Host "  .\run-frontend.ps1 -Install              # Install dependencies" 
    Write-Host "  .\run-frontend.ps1 -Status               # Show current configuration"
    Write-Host "  .\run-frontend.ps1 -Help                 # Show this help"
    Write-Host ""
    Write-Host "Environments:" -ForegroundColor Yellow
    Write-Host "  dev     # Development mode (points to sky-webapi-dev)"
    Write-Host "  prod    # Production mode (points to sky-webapi production)"
    Write-Host "  local   # Local development (proxy to localhost:5207)"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\run-frontend.ps1 -Environment dev      # Start with development API"
    Write-Host "  .\run-frontend.ps1 -Environment prod     # Start with production API" 
    Write-Host "  .\run-frontend.ps1 -Install              # Install node modules"
    Write-Host ""
}

function Show-Status {
    Write-Host ""
    Write-Host "=== Current Frontend Configuration ===" -ForegroundColor Green
    Write-Host ""
    
    if (Test-Path ".env.development") {
        Write-Host "📝 .env.development:" -ForegroundColor Cyan
        Get-Content ".env.development" | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
        Write-Host ""
    }
    
    if (Test-Path ".env.production") {
        Write-Host "📝 .env.production:" -ForegroundColor Cyan
        Get-Content ".env.production" | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
        Write-Host ""
    }
    
    Write-Host "📦 Available Scripts:" -ForegroundColor Cyan
    Write-Host "    npm run dev         # Default development"
    Write-Host "    npm run dev:local   # Local development mode"
    Write-Host "    npm run dev:prod    # Production mode"
    Write-Host ""
}

if ($Help) {
    Show-Help
    exit 0
}

if ($Status) {
    Show-Status
    exit 0
}

if ($Install) {
    Write-Host ""
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "=== Sky Frontend Development Server ===" -ForegroundColor Green
Write-Host ""

switch ($Environment.ToLower()) {
    "dev" {
        Write-Host "🚀 Starting DEVELOPMENT frontend..." -ForegroundColor Yellow
        Write-Host "   API Target: sky-webapi-dev.azurewebsites.net" -ForegroundColor Cyan
        Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
        npm run dev:local
    }
    "prod" {
        Write-Host "🚀 Starting PRODUCTION frontend..." -ForegroundColor Yellow
        Write-Host "   API Target: sky-webapi (production)" -ForegroundColor Cyan
        Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
        npm run dev:prod
    }
    "local" {
        Write-Host "🚀 Starting LOCAL frontend..." -ForegroundColor Yellow
        Write-Host "   API Target: http://localhost:5207" -ForegroundColor Cyan
        Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "   ⚠️  Make sure local API is running!" -ForegroundColor Red
        Write-Host ""
        Write-Host "   📝 Using localhost:5207 proxy..." -ForegroundColor Gray
        npm run dev
    }
    default {
        Write-Host "❌ Invalid environment: $Environment" -ForegroundColor Red
        Write-Host "   Valid options: dev, prod, local" -ForegroundColor Yellow
        Show-Help
        exit 1
    }
}