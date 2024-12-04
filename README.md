# Next.js + Supabase Starter

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faloshy-ai%2Fstarter&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

Next.js starter template with Supabase integration and one-click Vercel deployment.

## Features

- Next.js 14+ with App Router
- Supabase Authentication
- TypeScript
- Nix Development Environment
- One-click Vercel Deployment

## Prerequisites

### 1. Install Nix

```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```

### 2. Enable Flakes and Nix-Direnv

Add to your `~/.config/nix/nix.conf`:

```bash
experimental-features = nix-command flakes
```

### 3. Setup Direnv

Install direnv and nix-direnv:

```bash
nix-env -i direnv nix-direnv
```

Add to your shell RC file (~/.bashrc, ~/.zshrc, etc):

```bash
eval "$(direnv hook zsh)"  # or bash
source $HOME/.nix-profile/share/nix-direnv/direnvrc
```

### 4. Install Docker Desktop

Download and install from [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 5. IDE Setup (Optional)

For VS Code:

- Install [Direnv extension](https://marketplace.visualstudio.com/items?itemName=cab404.vscode-direnv)
- Reload VS Code after installation

For other IDEs:

1. Open a terminal inside the IDE
2. Run `direnv allow`
3. Restart the IDE to ensure environment variables are loaded

## Development

### 1. Clone Repository

```bash
git clone https://github.com/aloshy-ai/starter.git
cd starter
```

### 2. Setup Environment

```bash
direnv allow
```

The environment will automatically load when:

- Entering the directory in terminal
- Opening VS Code with the Direnv extension
- Opening terminals inside supported IDEs with direnv integration

If the environment doesn't load automatically:

```bash
direnv reload
```

Or if didn't work, you can manually load the environment:

```bash
nix develop
```

## Contributing

We follow the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow):

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Maintenance tasks

## License

MIT License - see [LICENSE](./LICENSE) for details.
