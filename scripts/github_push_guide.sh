#!/bin/bash
# Push پروژه به GitHub ریپوی GeekNeuron/ZenDNS

REPO_URL="git@github.com:GeekNeuron/ZenDNS.git"

read -p "Git name: " gitname
read -p "Git email: " gitemail

git config --global user.name "$gitname"
git config --global user.email "$gitemail"

git init
git remote add origin $REPO_URL
git add .
git commit -m "Initial commit: ZenDNS full stack"
git branch -M main
git push -u origin main
