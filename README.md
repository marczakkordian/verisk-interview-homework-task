# Verisk recruitment task

A simple playwright test project for purpose of recruitment process

## Description

### Simple shopping

Please create new account on https://magento.softwaretestingboard.com/. Alternatively, you may use any other online shop.
Please automate the below scenario using Playwright or Cypress.
· login
· find watch “Luma Analog Watch”
· add it to your cart
· go to the cart change no of pieces to 2
· remove it from the cart
· logout
The test code place on some public repository like GitHub and send us link to it.
Please make sure it also contains the test results.

## Getting Started

### Requirements

Node.js 16+
Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
MacOS 12 Monterey or MacOS 13 Ventura.
Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04.

### Installing

npm i -D @playwright/test

### Test execution

Headless mode

```
npx playwright test example.spec.ts
```

UI mode

```
npx playwright test --ui
```
