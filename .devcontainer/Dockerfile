# Newer Node LTS
FROM node:22

################################
# Install Essential Tools
################################
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
      git zsh zip curl wget unzip ca-certificates gnupg lsb-release && \
    rm -rf /var/lib/apt/lists/*

# oh-my-zsh (non-interactive)
RUN CHSH=no RUNZSH=no KEEP_ZSHRC=yes \
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

################################
# Install Terraform (version via build arg)
################################
ARG TERRAFORM_VERSION=1.9.5
ENV TERRAFORM_VERSION=${TERRAFORM_VERSION}

RUN wget -q https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    mv terraform /usr/local/bin/ && \
    rm -f terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    terraform -version

################################
# Install Azure CLI
################################
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

