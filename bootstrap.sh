#!/usr/bin/env bash

sudo locale-gen en_US.UTF-8
sudo update-locale LANG=en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8

sudo apt-get update
sudo apt-get install -y build-essential git curl libxslt1-dev libxml2-dev libssl-dev

# node
su - vagrant -c 'curl https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | sh'
su - vagrant -c 'nvm install 6'
su - vagrant -c 'nvm alias default 6'
su - vagrant -c 'npm run typings install'

echo "All done installing!
Next steps: type 'vagrant ssh' to log into the machine."
